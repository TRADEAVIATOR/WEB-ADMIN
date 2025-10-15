import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Image from "next/image";

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white py-6 flex justify-center shadow-sm">
        <Image
          src="/logo.svg"
          alt="Logo"
          width={140}
          height={140}
          className="object-contain"
        />
      </header>

      <main className="flex flex-1 items-center justify-center px-4 sm:px-6">
        <form className="w-full max-w-sm bg-white p-8 sm:p-10 rounded-2xl shadow-md space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-semibold text-[#101928]">
              Admin Login
            </h2>
            <p className="text-sm text-gray-500">
              Enter your credentials to access the admin dashboard
            </p>
          </div>

          <div className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              className="rounded-full bg-[#F5F5F5] py-3 px-4 text-base"
            />
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              className="rounded-full bg-[#F5F5F5] py-3 px-4 text-base"
            />
          </div>

          <Button
            type="submit"
            className="w-full py-3 text-base font-semibold rounded-full">
            Log In
          </Button>
        </form>
      </main>
    </div>
  );
}
