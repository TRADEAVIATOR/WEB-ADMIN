"use client";

import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { Activity } from "@/types/models";

interface ActivityDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  activity: Activity | null;
}

export default function ActivityDetailsModal({
  isOpen,
  onClose,
  activity,
}: ActivityDetailsModalProps) {
  if (!activity) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Activity Details">
      <div className="flex flex-col gap-3 text-sm text-gray-700">
        <div>
          <p className="text-xs text-gray-400 mb-1">Description</p>
          <p className="font-medium">{activity.description}</p>
        </div>

        <div>
          <p className="text-xs text-gray-400 mb-1">Type & Amount</p>
          <p>
            {activity.type} - {activity.amount}{" "}
            {activity.currency.toUpperCase()}
          </p>
        </div>

        <div>
          <p className="text-xs text-gray-400 mb-1">Status</p>
          <p>{activity.status}</p>
        </div>

        <div>
          <p className="text-xs text-gray-400 mb-1">User</p>
          <p>
            {activity.user.name} ({activity.user.username}) -{" "}
            {activity.user.email}
          </p>
        </div>

        <div>
          <p className="text-xs text-gray-400 mb-1">Created At</p>
          <p>{activity.createdAt}</p>
        </div>

        <div>
          <p className="text-xs text-gray-400 mb-1">Time Ago</p>
          <p>{activity.timeAgo}</p>
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <Button onClick={onClose}>Close</Button>
      </div>
    </Modal>
  );
}
