"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiEye } from "react-icons/fi";
import FormField from "@/components/ui/FormField";
import Button from "@/components/ui/Button";
import { ChevronLeft } from "lucide-react";

export default function NewTemplatePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    message: "",
    type: "",
    priority: "",
    variables: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // TODO: Replace with actual API call
    // const api = await authApi();
    // await tryServer(api.post('/api/v1/admin/notifications/templates', {
    //   ...formData,
    //   variables: formData.variables.split(',').map(v => v.trim())
    // }));
  };

  return (
    <div className="bg-white rounded-2xl p-6 w-full">
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() => window.history.back()}
          className="cursor-pointer flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 font-medium mb-6 transition">
          <ChevronLeft size={18} />
          <span>Back</span>
        </button>

        <button className="flex cursor-pointer items-center gap-2 text-primary text-sm font-medium hover:underline">
          <FiEye className="text-primary text-lg" />
          Preview
        </button>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Create Template</h1>
          <p className="text-sm text-gray-500 mt-1">
            Create a reusable notification template
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            label="Template Name"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g., Welcome Email Template"
            className="rounded-full bg-[#F5F5F5] py-3 px-4 text-base"
            required
          />

          <FormField
            label="Title"
            name="title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            placeholder="Use {{variableName}} for dynamic content"
            className="rounded-full bg-[#F5F5F5] py-3 px-4 text-base"
            required
          />

          <FormField
            label="Message"
            name="message"
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            placeholder="Hello {{userName}}, welcome to our platform!"
            className="rounded-full bg-[#F5F5F5] py-3 px-4 text-base"
            required
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              label="Notification Type"
              name="type"
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
              placeholder="Select type"
              className="rounded-full bg-[#F5F5F5] py-3 px-4 text-base"
              required
            />
            <FormField
              label="Priority"
              name="priority"
              value={formData.priority}
              onChange={(e) =>
                setFormData({ ...formData, priority: e.target.value })
              }
              placeholder="Select priority"
              className="rounded-full bg-[#F5F5F5] py-3 px-4 text-base"
              required
            />
          </div>

          <FormField
            label="Variables"
            name="variables"
            value={formData.variables}
            onChange={(e) =>
              setFormData({ ...formData, variables: e.target.value })
            }
            placeholder="userName, amount, date (comma-separated)"
            className="rounded-full bg-[#F5F5F5] py-3 px-4 text-base"
          />

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Tip:</strong> Use variables like {`{{userName}}`} in your
              title and message. List all variables in the Variables field
              above.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 pt-4">
            <Button
              variant="outline"
              type="button"
              onClick={() => router.back()}
              className="w-full py-3 text-base font-semibold rounded-full">
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 text-base font-semibold rounded-full">
              {isLoading ? "Creating..." : "Create Template"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
