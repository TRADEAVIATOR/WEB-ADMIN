"use client";

import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import Button from "@/components/ui/Button";
import EmojiPicker from "emoji-picker-react";
import {
  Paperclip,
  Smile,
  X,
  Download,
  Eye,
  FileText,
  File,
} from "lucide-react";
import { io, Socket } from "socket.io-client";
import { sendAdminReply, updateConversation } from "@/lib/api/support";
import { SupportConversation, SupportMessage } from "@/types/models";
import { formatDateTime } from "@/lib/utils/format";
import { useSession } from "next-auth/react";

type ReplyAttachment = {
  file: File;
  fileName: string;
  fileType: string;
  fileSize: number;
};

type ConversationClientProps = {
  conversation: SupportConversation;
};

const MAX_FILES = 10;
const MAX_SIZE = 25 * 1024 * 1024;
const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/svg+xml",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "text/plain",
  "text/csv",
  "application/zip",
  "application/vnd.rar",
  "video/mp4",
  "video/webm",
  "video/quicktime",
  "audio/mpeg",
  "audio/wav",
  "audio/ogg",
];

export default function ConversationClient({
  conversation,
}: ConversationClientProps) {
  const [messages, setMessages] = useState<SupportMessage[]>(
    conversation.messages
  );
  const [reply, setReply] = useState("");
  const [sending, setSending] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [attachments, setAttachments] = useState<ReplyAttachment[]>([]);
  const [userTyping, setUserTyping] = useState(false);
  const [previewAttachment, setPreviewAttachment] = useState<{
    url: string;
    fileName: string;
    fileType: string;
  } | null>(null);

  const socketRef = useRef<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { data: session, status } = useSession();

  interface MessageAttachment {
    fileName: string;
    fileSize: number;
    fileType: string;
    url: string;
  }

  useEffect(() => {
    if (status !== "authenticated") return;
    if (!session?.accessToken) {
      console.error("No access token found in session");
      return;
    }

    const socket = io("https://tradeaviatorbackend-8n6i.onrender.com", {
      transports: ["websocket"],
      auth: {
        token: session.accessToken,
      },
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("✅ Socket connected:", socket.id);

      socket.emit("support:join-conversation", {
        conversationId: conversation.id,
      });
    });

    socket.on("connect_error", (err) => {
      console.error("❌ Socket connect error:", err.message);
    });

    socket.on("support:new-message", (data: { message: SupportMessage }) => {
      setMessages((prev) => [...prev, data.message]);
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [status, session?.accessToken, conversation.id]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!reply.trim() && attachments.length === 0) return;

    setSending(true);
    const toastId = toast.loading("Sending reply...");

    try {
      const formData = new FormData();
      formData.append("message", reply);

      attachments.forEach((file) => {
        formData.append("images", file.file, file.fileName);
      });

      await sendAdminReply(conversation.id, formData);

      setReply("");
      setAttachments([]);
      toast.success("Reply sent!", { id: toastId });
    } catch {
      toast.error("Failed to send reply", { id: toastId });
    } finally {
      setSending(false);
    }
  };

  const handleStatusChange = async (value: string) => {
    const toastId = toast.loading("Updating status...");
    try {
      await updateConversation(conversation.id, { status: value });
      toast.success("Status updated", { id: toastId });
    } catch {
      toast.error("Failed to update status", { id: toastId });
    }
  };

  const handleEmojiClick = (emoji: any) => {
    setReply((prev) => prev + emoji.emoji);
  };

  const handleFiles = (files: FileList | null) => {
    if (!files) return;

    if (files.length + attachments.length > MAX_FILES) {
      return toast.error("Maximum of 10 files allowed");
    }

    const valid: ReplyAttachment[] = [];

    for (const file of Array.from(files)) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        toast.error(`Unsupported file type: ${file.name}`);
        continue;
      }

      if (file.size > MAX_SIZE) {
        toast.error(`${file.name} exceeds 25MB`);
        continue;
      }

      valid.push({
        file,
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size,
      });
    }

    setAttachments((prev) => [...prev, ...valid]);
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith("image/")) return <Eye size={14} />;
    if (fileType === "application/pdf") return <FileText size={14} />;
    return <File size={14} />;
  };

  const isImageFile = (fileType: string) => {
    return fileType.startsWith("image/");
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const handleTyping = () => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    socketRef.current?.emit("support:admin-typing", {
      conversationId: conversation.id,
      isTyping: true,
    });

    typingTimeoutRef.current = setTimeout(() => {
      socketRef.current?.emit("support:admin-typing", {
        conversationId: conversation.id,
        isTyping: false,
      });
    }, 1000);
  };

  return (
    <div className="bg-white rounded-2xl p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-b-gray-100 pb-4">
        <div className="flex items-center gap-4">
          <Image
            src={conversation.user.profilePicture || "/avatar.png"}
            alt={conversation.user.fullname}
            width={48}
            height={48}
            className="rounded-full object-cover"
          />

          <div className="flex flex-col">
            <p className="text-base font-semibold text-gray-900">
              {conversation.subject}
            </p>
            <p className="text-sm text-gray-500">
              {conversation.user.fullname}
              <span className="mx-1">•</span>
              {conversation.user.email}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Status</span>
          <select
            defaultValue={conversation.status}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary">
            <option value="OPEN">Open</option>
            <option value="CLOSED">Closed</option>
          </select>
        </div>
      </div>

      <div className="max-h-[480px] overflow-y-auto space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`rounded-lg p-3 text-sm max-w-[70%] ${
              msg.senderType === "ADMIN"
                ? "ml-auto bg-[#fe9b63] text-white"
                : "bg-[#2a2f3d] text-white"
            }`}>
            <p className="whitespace-pre-wrap">{msg.message}</p>

            {msg.attachments.length > 0 && (
              <div className="mt-3 space-y-2">
                {msg.attachments.map((attachment, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 bg-white/10 rounded-lg p-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate">
                        {attachment.fileName}
                      </p>
                      <p className="text-[10px] opacity-75">
                        {formatFileSize(attachment.fileSize)}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      {isImageFile(attachment.fileType) && (
                        <button
                          onClick={() => setPreviewAttachment(attachment)}
                          className="p-1.5 hover:bg-white/20 rounded transition-colors"
                          title="Preview">
                          <Eye size={14} />
                        </button>
                      )}
                      <a
                        href={attachment.url}
                        download={attachment.fileName}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 hover:bg-white/20 rounded transition-colors"
                        title="Download">
                        <Download size={14} />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <p className="text-[10px] text-gray-200 mt-1">
              {formatDateTime(msg.createdAt)}
            </p>
          </div>
        ))}

        {userTyping && (
          <div className="text-xs text-gray-500 italic">
            {conversation.user.fullname} is typing...
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="border border-gray-200 rounded-xl p-3 sm:p-4 flex flex-col gap-3 bg-gray-50">
        {attachments.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {attachments.map((file, i) => (
              <div
                key={i}
                className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-1 text-xs">
                {getFileIcon(file.fileType)}
                <span className="truncate max-w-[120px]">{file.fileName}</span>
                <button
                  onClick={() =>
                    setAttachments((prev) => prev.filter((_, idx) => idx !== i))
                  }>
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-end gap-2">
          <div className="flex-1 relative">
            <textarea
              value={reply}
              rows={3}
              placeholder="Type your reply..."
              onChange={(e) => {
                setReply(e.target.value);
                handleTyping();
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              className="w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            />

            {showEmoji && (
              <div className="absolute bottom-12 left-0 z-10">
                <EmojiPicker onEmojiClick={handleEmojiClick} />
              </div>
            )}
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setShowEmoji((p) => !p)}
              className="p-2 rounded-lg hover:bg-gray-100">
              <Smile size={18} />
            </button>

            <label className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
              <Paperclip size={18} />
              <input
                type="file"
                multiple
                hidden
                onChange={(e) => handleFiles(e.target.files)}
              />
            </label>

            <Button
              variant="success"
              isLoading={sending}
              disabled={(!reply.trim() && attachments.length === 0) || sending}
              onClick={handleSend}
              className="whitespace-nowrap">
              {sending ? "Sending..." : "Send Reply"}
            </Button>
          </div>
        </div>
        <p className="text-[11px] text-gray-400 px-1">
          Press Enter to send, Shift+Enter for new line
        </p>
      </div>

      {previewAttachment && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setPreviewAttachment(null)}>
          <div
            className="relative max-w-4xl max-h-[90vh] bg-white rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="font-semibold text-gray-900 truncate">
                {previewAttachment.fileName}
              </h3>
              <button
                onClick={() => setPreviewAttachment(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="p-4">
              <img
                src={previewAttachment.url}
                alt={previewAttachment.fileName}
                className="max-w-full max-h-[70vh] object-contain mx-auto"
              />
            </div>
            <div className="p-4 border-t flex justify-end">
              <a
                href={previewAttachment.url}
                download={previewAttachment.fileName}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#fe9b63] text-white rounded-lg hover:bg-[#fe8a4d] transition-colors">
                <Download size={16} />
                Download
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
