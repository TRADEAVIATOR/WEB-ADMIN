import Tabs from "@/components/ui/Tabs";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Tabs
        tabs={[
          { label: "Sales Overview", href: "/dashboard/giftcards/sell/sales" },
          {
            label: "Accepted Giftcards",
            href: "/dashboard/giftcards/sell/accepted",
          },
        ]}
      />
      <div className="mt-6">{children}</div>
    </>
  );
}
