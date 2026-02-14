"use client";

import { useState, useRef, useEffect } from "react";
import Button from "@/components/ui/Button";
import { handleApiError } from "@/lib/utils/errorHandler";
import { NotificationType } from "@/types/enums";
import FormField from "@/components/ui/FormField";
import { useRouter } from "next/navigation";
import SelectField from "../ui/SelectField";
import { X, Plus, Code } from "lucide-react";
import EmojiPicker from "emoji-picker-react";
import { Smile } from "lucide-react";

export interface NotificationTemplateFormProps {
  initialData?: {
    name: string;
    title: string;
    message: string;
    type: NotificationType;
    variables?: string[];
  };
  onSubmit: (data: {
    name: string;
    title: string;
    message: string;
    type: NotificationType;
    variables: string[];
  }) => Promise<void>;
}

export default function NotificationTemplateForm({
  initialData,
  onSubmit,
}: NotificationTemplateFormProps) {
  const router = useRouter();
  const [variables, setVariables] = useState<string[]>(
    initialData?.variables || [],
  );
  const [newVariable, setNewVariable] = useState("");
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    title: initialData?.title || "",
    message: initialData?.message || "",
    type: initialData?.type || NotificationType.SYSTEM,
  });
  const [isLoading, setIsLoading] = useState(false);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const messageInputRef = useRef<HTMLTextAreaElement>(null);

  const [showEmojiPicker, setShowEmojiPicker] = useState<
    "title" | "message" | null
  >(null);
  const emojiPickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target as Node)
      ) {
        setShowEmojiPicker(null);
      }
    };

    if (showEmojiPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showEmojiPicker]);

  const handleEmojiClick = (emoji: any) => {
    const placeholder = emoji.emoji;
    if (showEmojiPicker === "title" && titleInputRef.current) {
      const input = titleInputRef.current;
      const cursorPos = input.selectionStart || formData.title.length;
      const newTitle =
        formData.title.slice(0, cursorPos) +
        placeholder +
        formData.title.slice(cursorPos);
      setFormData({ ...formData, title: newTitle });
      setTimeout(() => {
        input.focus();
        input.setSelectionRange(
          cursorPos + placeholder.length,
          cursorPos + placeholder.length,
        );
      }, 0);
    } else if (showEmojiPicker === "message" && messageInputRef.current) {
      const textarea = messageInputRef.current;
      const cursorPos = textarea.selectionStart || formData.message.length;
      const newMessage =
        formData.message.slice(0, cursorPos) +
        placeholder +
        formData.message.slice(cursorPos);
      setFormData({ ...formData, message: newMessage });
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(
          cursorPos + placeholder.length,
          cursorPos + placeholder.length,
        );
      }, 0);
    }
    setShowEmojiPicker(null);
  };

  const addVariable = () => {
    const trimmedVar = newVariable.trim();
    if (trimmedVar && !variables.includes(trimmedVar)) {
      setVariables([...variables, trimmedVar]);
      setNewVariable("");
    }
  };

  const removeVariable = (varToRemove: string) => {
    setVariables(variables.filter((v) => v !== varToRemove));
  };

  const insertVariableAtCursor = (
    varName: string,
    field: "title" | "message",
  ) => {
    const placeholder = `{{${varName}}}`;

    if (field === "title") {
      const input = titleInputRef.current;
      if (input) {
        const cursorPos = input.selectionStart || formData.title.length;
        const newTitle =
          formData.title.slice(0, cursorPos) +
          placeholder +
          formData.title.slice(cursorPos);
        setFormData({ ...formData, title: newTitle });
        setTimeout(() => {
          input.focus();
          input.setSelectionRange(
            cursorPos + placeholder.length,
            cursorPos + placeholder.length,
          );
        }, 0);
      }
    } else {
      const textarea = messageInputRef.current;
      if (textarea) {
        const cursorPos = textarea.selectionStart || formData.message.length;
        const newMessage =
          formData.message.slice(0, cursorPos) +
          placeholder +
          formData.message.slice(cursorPos);
        setFormData({ ...formData, message: newMessage });
        setTimeout(() => {
          textarea.focus();
          textarea.setSelectionRange(
            cursorPos + placeholder.length,
            cursorPos + placeholder.length,
          );
        }, 0);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await onSubmit({
        ...formData,
        variables,
      });
      router.back();
    } catch (error: any) {
      handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormField
        label="Template Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        placeholder="e.g., Welcome Email Template"
        required
      />

      <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">Variables</label>
          <span className="text-xs text-gray-500">
            Click variable tags to insert into title/message
          </span>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={newVariable}
            onChange={(e) => setNewVariable(e.target.value)}
            onKeyPress={(e) =>
              e.key === "Enter" && (e.preventDefault(), addVariable())
            }
            placeholder="e.g., userName, amount, date"
            className="flex-1 rounded-lg bg-white py-2 px-3 text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Button
            type="button"
            onClick={addVariable}
            variant="outline"
            className="px-4">
            <Plus size={16} />
          </Button>
        </div>

        {variables.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {variables.map((variable) => (
              <div
                key={variable}
                className="group flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-3 py-1.5 hover:border-primary transition-colors">
                <Code size={14} className="text-gray-400" />
                <span className="text-sm font-mono text-gray-700">
                  {variable}
                </span>
                <button
                  type="button"
                  onClick={() => removeVariable(variable)}
                  className="text-gray-400 hover:text-red-500 transition-colors">
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <div className="relative">
          <FormField
            label="Title"
            value={formData.title}
            ref={titleInputRef}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            placeholder="Enter notification title"
            required
          />
          <button
            type="button"
            onClick={() =>
              setShowEmojiPicker(showEmojiPicker === "title" ? null : "title")
            }
            className="absolute right-3 top-9 p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-700">
            <Smile size={18} />
          </button>
          {showEmojiPicker === "title" && (
            <div
              ref={emojiPickerRef}
              className="absolute right-0 top-full mt-2 z-50 shadow-xl">
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}
        </div>

        {variables.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <span className="text-xs text-gray-600 self-center">
              Insert variable:
            </span>
            {variables.map((variable) => (
              <button
                key={variable}
                type="button"
                onClick={() => insertVariableAtCursor(variable, "title")}
                className="text-xs px-2 py-1 bg-primary/10 text-primary rounded hover:bg-primary/20 transition-colors font-mono">
                {`{{${variable}}}`}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          ref={messageInputRef}
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          placeholder="Enter notification message"
          required
          rows={4}
          className="w-full rounded-2xl bg-[#F5F5F5] py-3 px-4 pr-12 text-base focus:outline-none focus:ring-2 focus:ring-primary resize-none"
        />
        <button
          type="button"
          onClick={() =>
            setShowEmojiPicker(showEmojiPicker === "message" ? null : "message")
          }
          className="absolute right-3 top-3 p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-700">
          <Smile size={18} />
        </button>
        {showEmojiPicker === "message" && (
          <div
            ref={emojiPickerRef}
            className="absolute right-0 top-full mt-2 z-50 shadow-xl">
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}
      </div>

      <SelectField
        id="notification-type"
        label="Notification Type"
        value={{ label: formData.type, value: formData.type }}
        onChange={(option) =>
          setFormData({
            ...formData,
            type: (option as { label: string; value: string })
              .value as NotificationType,
          })
        }
        options={Object.values(NotificationType).map((type) => ({
          label: type,
          value: type,
        }))}
        required
      />

      <div className="flex flex-col md:flex-row gap-4 pt-4">
        <Button
          variant="outline"
          type="button"
          onClick={() => router.back()}
          className="w-full">
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isLoading}
          isLoading={isLoading}
          className="w-full">
          Save Template
        </Button>
      </div>
    </form>
  );
}
