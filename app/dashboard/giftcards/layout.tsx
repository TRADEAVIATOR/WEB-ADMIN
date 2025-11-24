import Tabs from "./Tabs";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Tabs />
      <div className="mt-6">{children}</div>
    </>
  );
}
