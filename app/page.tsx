import Image from "next/image";
import LoginForm from "../components/forms/LoginForm";
import Logo from "@/assets/brand-logo.svg";

export default function Page() {
  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #5C3D2E 0%, #6B4423 20%, #8B5A3C 40%, #A0522D 60%, #CD7F32 80%, #E89B5A 100%)",
      }}>
      <div
        className="absolute rounded-full"
        style={{
          top: "-5%",
          left: "5%",
          width: "280px",
          height: "500px",
          background: "rgba(139, 90, 60, 0.4)",
          transform: "rotate(-15deg)",
          borderRadius: "140px",
        }}></div>

      <div
        className="absolute rounded-full"
        style={{
          bottom: "-8%",
          right: "8%",
          width: "280px",
          height: "500px",
          background: "rgba(139, 90, 60, 0.4)",
          transform: "rotate(15deg)",
          borderRadius: "140px",
        }}></div>

      <div
        className="absolute rounded-full"
        style={{
          top: "10%",
          right: "-5%",
          width: "200px",
          height: "350px",
          background: "rgba(107, 68, 35, 0.3)",
          transform: "rotate(20deg)",
          borderRadius: "100px",
        }}></div>

      <div
        className="absolute rounded-full"
        style={{
          bottom: "5%",
          left: "-3%",
          width: "200px",
          height: "350px",
          background: "rgba(107, 68, 35, 0.3)",
          transform: "rotate(-20deg)",
          borderRadius: "100px",
        }}></div>

      <div className="absolute top-16 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex items-center gap-3 text-white">
          <Image
            src={Logo}
            alt="Logo"
            className="object-contain"
            width={200}
            height={200}
          />
        </div>
      </div>

      <main className="min-h-screen flex items-center justify-center px-4 sm:px-6 pt-32">
        <div className="w-full max-w-md bg-white p-8 sm:p-10 rounded-3xl shadow-2xl space-y-6 relative z-10">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-gray-900 leading-tight">
              Welcome to the Command Center Authorized Personnel Only
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed pt-1">
              Please enter your credentials to access the TradeAviator
              management console and oversee system operation
            </p>
          </div>
          <LoginForm />
        </div>
      </main>
    </div>
  );
}
