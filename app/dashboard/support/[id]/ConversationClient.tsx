"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import Button from "@/components/ui/Button";
import EmojiPicker from "emoji-picker-react";
import { Paperclip, Smile, X } from "lucide-react";
import {
  getConversationMessages,
  sendAdminReply,
  updateConversation,
} from "@/lib/api/support";
import { SupportConversation, SupportMessage } from "@/types/models";

type ReplyAttachment = {
  url: string;
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

  const refreshMessages = async () => {
    const res = await getConversationMessages(conversation.id);
    if (res?.results) setMessages(res.results);
  };

  const handleSend = async () => {
    if (!reply.trim() && attachments.length === 0) return;

    setSending(true);
    try {
      await sendAdminReply(conversation.id, reply);

      setReply("");
      setAttachments([]);
      await refreshMessages();
      toast.success("Reply sent");
    } catch {
      toast.error("Failed to send reply");
    } finally {
      setSending(false);
    }
  };

  const handleStatusChange = async (value: string) => {
    try {
      await updateConversation(conversation.id, { status: value });
      toast.success("Status updated");
    } catch {
      toast.error("Failed to update status");
    }
  };

  const handleEmojiClick = (emoji: any) => {
    setReply((prev) => prev + emoji.emoji);
  };

  const handleFiles = async (files: FileList | null) => {
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

      const uploadedUrl = await uploadFile(file);

      valid.push({
        url: uploadedUrl,
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size,
      });
    }

    setAttachments((prev) => [...prev, ...valid]);
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
              msg.senderType === "ADMIN" ? "ml-auto bg-green-50" : "bg-gray-100"
            }`}>
            <p>{msg.message}</p>

            {msg.attachments.length > 0 && (
              <div className="mt-2 flex gap-2 flex-wrap">
                {msg.attachments.map((url, i) => (
                  <a
                    key={i}
                    href={url}
                    target="_blank"
                    className="text-xs text-primary underline">
                    Attachment {i + 1}
                  </a>
                ))}
              </div>
            )}

            <p className="text-[10px] text-gray-400 mt-1">
              {new Date(msg.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      <div className="border border-gray-200 rounded-xl p-3 sm:p-4 flex flex-col gap-3 bg-gray-50">
        {attachments.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {attachments.map((file, i) => (
              <div
                key={i}
                className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-1 text-xs">
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
              onChange={(e) => setReply(e.target.value)}
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
    </div>
  );
}

async function uploadFile(file: File): Promise<string> {
  return Promise.resolve("https://via.placeholder.com/150");
}
