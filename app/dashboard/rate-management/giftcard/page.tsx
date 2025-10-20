import DataTable from "@/components/ui/Table";
import PageHeader from "@/components/ui/PageHeader";
import { FiPlus } from "react-icons/fi";

export default function GiftcardRatesPage() {
  const columns = [
    { key: "id", label: "ID" },
    { key: "user", label: "User" },
    { key: "status", label: "KYC Status" },
    { key: "type", label: "Type" },
    { key: "email", label: "Email" },
    { key: "amount", label: "Amount" },
    { key: "phone", label: "Phone Number" },
    { key: "date", label: "Date Joined" },
  ];

  const data = [
    {
      id: "#TA-231001",
      user: "Imran Rosheed",
      status: "Successful",
      type: "Crypto",
      email: "imramrosheed2019@mail.com",
      amount: "$12,000",
      phone: "+2348104452286",
      date: "Sep 7, 2025 - 12:24PM",
    },
    {
      id: "#TA-231002",
      user: "Seiyefa Amakiri",
      status: "Pending",
      type: "Giftcard",
      email: "seiyefa@mail.com",
      amount: "$8,500",
      phone: "+2348101111111",
      date: "Sep 8, 2025 - 10:00AM",
    },
  ];

  return (
    <>
      <PageHeader
        buttonIcon={<FiPlus size={16} />}
        buttonText="Add new card rate"
        modalTypeToOpen="add-giftcard-rate"
      />
      <DataTable columns={columns} data={data} />
    </>
  );
}
