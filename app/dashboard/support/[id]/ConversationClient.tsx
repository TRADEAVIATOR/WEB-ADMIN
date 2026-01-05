"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import Button from "@/components/ui/Button";
import FormField from "@/components/ui/FormField";
import {
  getConversationMessages,
  sendAdminReply,
  updateConversation,
} from "@/lib/api/support";
import { SupportConversation, SupportMessage } from "@/types/models";

export default function ConversationClient({
  conversation,
}: {
  conversation: SupportConversation;
}) {
  const [messages, setMessages] = useState<SupportMessage[]>(
    conversation.messages
  );
  const [reply, setReply] = useState("");
  const [sending, setSending] = useState(false);

  const refreshMessages = async () => {
    const res = await getConversationMessages(conversation.id);
    if (res?.results) setMessages(res.results);
  };

  const handleSend = async () => {
    if (!reply.trim()) return;

    setSending(true);
    try {
      await sendAdminReply(conversation.id, reply);
      setReply("");
      await refreshMessages();
      toast.success("Reply sent");
    } catch {
      toast.error("Failed to send reply");
    } finally {
      setSending(false);
    }
  };

  const handleStatusChange = async (value: string) => {
    await updateConversation(conversation.id, { status: value });
    toast.success("Status updated");
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

      <div className="flex gap-2">
        <FormField
          value={reply}
          placeholder="Type your reply…"
          onChange={(e) => setReply(e.target.value)}
          className="flex-1"
        />
        <Button variant="success" isLoading={sending} onClick={handleSend}>
          Send
        </Button>
      </div>
    </div>
  );
}
