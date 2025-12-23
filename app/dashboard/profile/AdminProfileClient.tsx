"use client";

import { AdminProfile } from "@/types/models";
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

export default function AdminProfileClient({ admin }: { admin: AdminProfile }) {
  const router = useRouter();
  const isActive = admin.status === "Active";
  const { data: session } = useSession();
  const token = session?.accessToken;

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [loading, setLoading] = useState(false);

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

    setLoading(true);

    try {
      await changeAdminPasswordClient(passwordForm);
      toast.success("Password changed successfully!");
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to change password"
      );
    } finally {
      setLoading(false);
    }
  };

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
            />
            <FormField
              label="New Password"
              name="newPassword"
              type="password"
              value={passwordForm.newPassword}
              onChange={handlePasswordChange}
              placeholder="Enter new password"
            />
            <FormField
              label="Confirm New Password"
              name="confirmNewPassword"
              type="password"
              value={passwordForm.confirmNewPassword}
              onChange={handlePasswordChange}
              placeholder="Confirm new password"
            />
            <Button type="submit" className="ml-auto block" disabled={loading}>
              {loading ? "Updating..." : "Update Password"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
