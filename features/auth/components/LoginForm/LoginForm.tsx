"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LogIn } from "lucide-react";
import { Button } from "@/shared/components/ui/Button/Button";
import { Input } from "@/shared/components/ui/form/Input/Input";

export function LoginForm() {
  const [username, setUsername] = useState("emilys");
  const [password, setPassword] = useState("emilyspass");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });

    if (res?.error) {
      setError("Invalid username or password");
      setLoading(false);
    } else {
      router.push("/profile");
      router.refresh(); // Refresh layout to grab new session
    }
  };

  return (
    <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mt-4">
          Welcome Back
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Please sign in to your account
        </p>
      </div>

      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        {error && (
          <div className="p-3 text-sm text-red-600 bg-red-50 dark:bg-red-900/30 dark:text-red-400 rounded-lg text-center font-medium">
            {error}
          </div>
        )}

        <div className="space-y-4 rounded-md shadow-sm">
          <div>
            <Input
              id="username"
              name="username"
              type="text"
              label="Username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            />
          </div>
          <div>
            <Input
              id="password"
              name="password"
              type="password"
              label="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
        </div>

        <div>
          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={loading}
            title="Sign In"
            className="w-full"
          >
            <LogIn className="h-5 w-5 me-2 text-blue-500 group-hover:text-blue-400 transition-colors" />
            Sign In
          </Button>
        </div>
      </form>

      <div className="text-center text-xs text-gray-500 mt-4 border-t pt-4 dark:border-gray-700">
        Demo credentials: <strong>emilys</strong> / <strong>emilyspass</strong>
      </div>
    </div>
  );
}
