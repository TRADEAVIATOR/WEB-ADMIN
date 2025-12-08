import Tabs from "@/components/ui/Tabs";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Tabs
        tabs={[
          { label: "Overview", href: "/dashboard/giftcards/buy/sales" },
          {
            label: "Available Giftcards",
            href: "/dashboard/giftcards/buy/accepted",
          },
        ]}
      />
      <div className="mt-6">{children}</div>
    </>
  );
}
