"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft, MoreVertical } from "lucide-react";
import AvatarImg from "@/assets/icons/avatar.svg";
import Image from "next/image";
import { useState } from "react";
import FormField from "@/components/ui/FormField";
import { changeAdminPasswordClient } from "@/lib/api/auth";
import Button from "@/components/ui/Button";
import { toast } from "react-hot-toast";
import { useSession } from "next-auth/react";
import { updateNotificationPreferences } from "@/lib/api/notifications";
import { handleApiError } from "@/lib/utils/errorHandler";
import SelectField, { SelectOption } from "@/components/ui/SelectField";

interface AdminNotificationPreferencesClientProps {
  admin: any;
  initialPreferences: {
    enableInApp: boolean;
    enablePush: boolean;
    enableEmail: boolean;
    mutedTypes: string[];
    mutedUntil?: string;
  } | null;
}

export default function AdminProfileClient({
  admin,
  initialPreferences,
}: AdminNotificationPreferencesClientProps) {
  const router = useRouter();
  const isActive = admin.status === "Active";
  const { data: session } = useSession();
  const token = session?.accessToken;

  const [passwordLoading, setPasswordLoading] = useState(false);
  const [prefsLoading, setPrefsLoading] = useState(false);

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      toast.error("Authentication error. Please log in again.");
      return;
    }

    if (
      !passwordForm.currentPassword ||
      !passwordForm.newPassword ||
      !passwordForm.confirmNewPassword
    ) {
      toast.error("Please fill in all password fields.");
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmNewPassword) {
      toast.error("New password and confirmation do not match.");
      return;
    }

    setPasswordLoading(true);

    try {
      await changeAdminPasswordClient(passwordForm);
      toast.success("Password changed successfully!");
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
    } catch (error: any) {
      handleApiError(error);
    } finally {
      setPasswordLoading(true);
    }
  };

  const [prefs, setPrefs] = useState({
    enableInApp: initialPreferences?.enableInApp ?? true,
    enablePush: initialPreferences?.enablePush ?? true,
    enableEmail: initialPreferences?.enableEmail ?? true,
    mutedTypes: initialPreferences?.mutedTypes || [],
    mutedUntil: initialPreferences?.mutedUntil || "",
  });

  const handleToggle = (field: keyof typeof prefs) => {
    setPrefs((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = async () => {
    setPrefsLoading(true);
    try {
      await updateNotificationPreferences(admin.id, prefs);
      toast.success("Notification preferences updated!");
    } catch (error: any) {
      handleApiError(error);
    } finally {
      setPrefsLoading(true);
    }
  };

  const notificationOptions: SelectOption[] = [
    { label: "Transaction", value: "TRANSACTION" },
    { label: "Wallet", value: "WALLET" },
    { label: "Giftcard", value: "GIFTCARD" },
    { label: "Dispute", value: "DISPUTE" },
    { label: "Security", value: "SECURITY" },
    { label: "Promo", value: "PROMO" },
    { label: "System", value: "SYSTEM" },
    { label: "Reward", value: "REWARD" },
    { label: "Ticket Purchase", value: "TICKET_PURCHASE" },
    { label: "Marketing", value: "MARKETING" },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 w-full">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 font-medium mb-6 transition">
        <ChevronLeft size={18} />
        Back
      </button>

      <div className="max-w-5xl mx-auto space-y-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 w-full">
          <div className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto">
            <div className="relative flex-shrink-0">
              <Image
                src={admin.profilePicture || AvatarImg}
                alt="Admin Avatar"
                width={80}
                height={80}
                className="rounded-full object-cover w-16 h-16 sm:w-20 sm:h-20"
                priority
              />
            </div>

            <div className="flex-1 min-w-0 space-y-1">
              <h2 className="text-xl font-semibold text-gray-900">
                {admin.name}
              </h2>
              {admin.username && (
                <p className="text-gray-500 text-sm">{admin.username}</p>
              )}
              {admin.role && (
                <p className="text-gray-700 text-sm font-medium">
                  {admin.role}
                </p>
              )}

              {admin.status && (
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    isActive
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-500"
                  }`}>
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isActive ? "bg-green-500" : "bg-gray-400"
                    }`}></span>
                  {admin.status}
                </span>
              )}
            </div>
          </div>

          <button className="flex flex-col items-center gap-1 p-2 rounded-md hover:bg-gray-50 text-gray-500 hover:text-gray-800 transition w-full sm:w-auto sm:flex-none border sm:border-0 border-gray-200">
            <MoreVertical size={22} />
            <span className="text-xs font-medium">More actions</span>
          </button>
        </div>

        <div className="border border-gray-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Profile Information
          </h3>
          <div className="grid sm:grid-cols-2 gap-6 text-sm">
            <div className="space-y-1">
              <p className="text-gray-500">Full Name</p>
              <p className="font-semibold text-gray-800">{admin.name}</p>
            </div>
            {admin.username && (
              <div className="space-y-1">
                <p className="text-gray-500">Username</p>
                <p className="font-semibold text-gray-800">{admin.username}</p>
              </div>
            )}
            {admin.email && (
              <div className="space-y-1">
                <p className="text-gray-500">Email Address</p>
                <p className="font-semibold text-gray-800">{admin.email}</p>
              </div>
            )}
            {admin.joined && (
              <div className="space-y-1">
                <p className="text-gray-500">Date Joined</p>
                <p className="font-semibold text-gray-800">{admin.joined}</p>
              </div>
            )}
            {admin.role && (
              <div className="space-y-1">
                <p className="text-gray-500">Role</p>
                <p className="font-semibold text-gray-800">{admin.role}</p>
              </div>
            )}
            {admin.status && (
              <div className="space-y-1">
                <p className="text-gray-500">Status</p>
                <p
                  className={`font-semibold ${
                    isActive ? "text-green-700" : "text-gray-500"
                  }`}>
                  {admin.status}
                </p>
              </div>
            )}
          </div>
        </div>

        {admin.permissions && admin.permissions.length > 0 && (
          <div className="border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Permissions
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {admin.permissions.map((permission) => (
                <div
                  key={permission}
                  className="flex items-start gap-3 bg-gray-50 border border-gray-100 p-3 rounded-lg">
                  <span className="w-2.5 h-2.5 bg-primary rounded-full mt-1"></span>
                  <p className="text-sm text-gray-700 font-medium">
                    {permission}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="border border-gray-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Change Password
          </h3>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <FormField
              label="Current Password"
              name="currentPassword"
              type="password"
              value={passwordForm.currentPassword}
              onChange={handlePasswordChange}
              placeholder="Enter current password"
              required
            />
            <FormField
              label="New Password"
              name="newPassword"
              type="password"
              value={passwordForm.newPassword}
              onChange={handlePasswordChange}
              placeholder="Enter new password"
              required
            />
            <FormField
              label="Confirm New Password"
              name="confirmNewPassword"
              type="password"
              value={passwordForm.confirmNewPassword}
              onChange={handlePasswordChange}
              placeholder="Confirm new password"
              required
            />
            <Button
              type="submit"
              className="ml-auto block"
              disabled={passwordLoading}>
              {passwordLoading ? "Updating..." : "Update Password"}
            </Button>
          </form>
        </div>

        <div className="border border-gray-200 rounded-xl p-6 space-y-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Notification Preferences
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-700 font-medium">
                In-App Notifications
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={prefs.enableInApp}
                  onChange={() => handleToggle("enableInApp")}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-primary peer-focus:ring-2 peer-focus:ring-primary transition-all"></div>
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transform transition-all peer-checked:translate-x-5"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-700 font-medium">
                Push Notifications
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={prefs.enablePush}
                  onChange={() => handleToggle("enablePush")}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-primary peer-focus:ring-2 peer-focus:ring-primary transition-all"></div>
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transform transition-all peer-checked:translate-x-5"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-700 font-medium">
                Email Notifications
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={prefs.enableEmail}
                  onChange={() => handleToggle("enableEmail")}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-primary peer-focus:ring-2 peer-focus:ring-primary transition-all"></div>
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transform transition-all peer-checked:translate-x-5"></div>
              </label>
            </div>
          </div>
          <SelectField
            id="mutedTypes"
            label="Muted Types"
            placeholder="Select notification types to mute"
            isMulti
            value={notificationOptions.filter((opt) =>
              prefs.mutedTypes.includes(opt.value),
            )}
            onChange={(selectedOptions) =>
              setPrefs((prev) => ({
                ...prev,
                mutedTypes: selectedOptions.map((opt) => opt.value),
              }))
            }
            options={notificationOptions}
          />

          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">
              Muted Until
            </label>
            <p className="text-gray-500 text-sm">
              Optional: Notifications will be muted until this date and time.
            </p>
            <input
              type="datetime-local"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              value={prefs.mutedUntil ? prefs.mutedUntil.slice(0, 16) : ""}
              onChange={(e) =>
                setPrefs((prev) => ({ ...prev, mutedUntil: e.target.value }))
              }
            />
          </div>

          <Button
            onClick={handleSubmit}
            isLoading={prefsLoading}
            className="w-full sm:w-auto"
            variant="primary">
            Save Preferences
          </Button>
        </div>
      </div>
    </div>
  );
}
