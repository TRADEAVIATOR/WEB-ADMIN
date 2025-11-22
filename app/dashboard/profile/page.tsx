import { ChevronLeft, MoreVertical } from "lucide-react";
import Image from "next/image";

export default function Page() {
  const admin = {
    name: "Imran Rasheed",
    username: "@imran",
    email: "imran@example.com",
    role: "Super Admin",
    joined: "Aug 12, 2023",
    status: "Active",
    permissions: [
      "Manage Users",
      "Approve Transactions",
      "Access Wallet Management",
      "View Dashboard Analytics",
      "Manage Giftcard Requests",
    ],
  };

  const isActive = admin.status === "Active";

  return (
    <div className="bg-white rounded-2xl p-6 w-full">
      <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 font-medium mb-6 transition">
        <ChevronLeft size={18} />
        Back
      </button>

      <div className="max-w-5xl mx-auto space-y-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 w-full">
          <div className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto">
            <div className="relative flex-shrink-0">
              <Image
                src="/icons/avatar.svg"
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
              <p className="text-gray-500 text-sm">{admin.username}</p>
              <p className="text-gray-700 text-sm font-medium">{admin.role}</p>

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
            <div className="space-y-1">
              <p className="text-gray-500">Username</p>
              <p className="font-semibold text-gray-800">{admin.username}</p>
            </div>
            <div className="space-y-1">
              <p className="text-gray-500">Email Address</p>
              <p className="font-semibold text-gray-800">{admin.email}</p>
            </div>
            <div className="space-y-1">
              <p className="text-gray-500">Date Joined</p>
              <p className="font-semibold text-gray-800">{admin.joined}</p>
            </div>
            <div className="space-y-1">
              <p className="text-gray-500">Role</p>
              <p className="font-semibold text-gray-800">{admin.role}</p>
            </div>
            <div className="space-y-1">
              <p className="text-gray-500">Status</p>
              <p
                className={`font-semibold ${
                  isActive ? "text-green-700" : "text-gray-500"
                }`}>
                {admin.status}
              </p>
            </div>
          </div>
        </div>

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
      </div>
    </div>
  );
}
