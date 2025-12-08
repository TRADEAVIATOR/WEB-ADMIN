import Tabs from "@/components/ui/Tabs";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Tabs
        tabs={[
          { label: "Overview", href: "/dashboard/giftcards/sell/orders" },
          {
            label: "Available Giftcards",
            href: "/dashboard/giftcards/sell/available",
          },
        ]}
      />
      <div className="mt-6">{children}</div>
    </>
  );
}
