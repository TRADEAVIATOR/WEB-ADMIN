"use client";

export default function CardDetailsTab() {
  const details = [
    { label: "Card Number", value: "4539 9876 1024 5817" },
    { label: "Expiry", value: "12/28" },
    { label: "CVV", value: "123" },
    { label: "Card Type", value: "Mastercard" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
      {details.map((item) => (
        <div key={item.label}>
          <p className="text-gray-500">{item.label}</p>
          <p className="font-medium text-gray-900">{item.value}</p>
        </div>
      ))}
    </div>
  );
}
