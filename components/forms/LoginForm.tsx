"use client";

import { toast } from "react-hot-toast";
import { useState, useEffect, FormEvent } from "react";
import { signIn, useSession } from "next-auth/react";
import FormField from "@/components/ui/FormField";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/dashboard");
    }
  }, [status, router]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    const res = await signIn("credentials", {
      redirect: false,
      email: email.trim(),
      password: password.trim(),
    });

    setLoading(false);

    if (res?.error) {
      toast.error("Invalid email or password");
      return;
    }

    if (res?.ok) {
      toast.success("Login successful");
      router.push("/dashboard");
    }
  };

  if (status === "loading") return null;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <FormField
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-full bg-[#F5F5F5] py-3 px-4 text-base"
          required
        />
        <FormField
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="rounded-full bg-[#F5F5F5] py-3 px-4 text-base"
          required
        />
      </div>
      <div className="text-center">
        <button
          type="button"
          className="text-sm text-gray-600 hover:text-orange-600 font-medium">
          Forgot password? <span className="text-orange-500">Reset it</span>
        </button>
      </div>
      <Button
        type="submit"
        isLoading={loading}
        disabled={loading}
        className="w-full py-3 text-base font-semibold rounded-full">
        Log In
      </Button>
    </form>
  );
}
