"use client";

import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function NgnDisplay({ rate }: { rate: number }) {
  const [showNgn, setShowNgn] = useState(true);

  return (
    <div className="flex items-center gap-3">
      {showNgn && rate && (
        <div className="bg-primary/10 border-2 border-primary px-4 py-2 rounded-lg">
          <div className="flex flex-col items-end">
            <span className="text-xs text-gray-600 font-medium">NTA Rate</span>
            <span className="text-lg font-bold text-primary">
              ₦{rate.toLocaleString()}
            </span>
          </div>
        </div>
      )}

      <button
        onClick={() => setShowNgn(!showNgn)}
        className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
        aria-label={showNgn ? "Hide NTA rate" : "Show NTA rate"}
        title={showNgn ? "Hide NTA rate" : "Show NTA rate"}>
        {showNgn ? (
          <FiEye className="w-5 h-5 text-gray-600" />
        ) : (
          <FiEyeOff className="w-5 h-5 text-gray-600" />
        )}
      </button>
    </div>
  );
}
