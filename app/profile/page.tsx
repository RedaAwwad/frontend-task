"use client";

import { useSession, signOut } from "next-auth/react";
import { User, LogOut } from "lucide-react";
import Image from "next/image";

export default function ProfilePage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-pulse bg-gray-200 dark:bg-gray-800 h-32 w-32 rounded-full" />
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <p className="text-gray-500">Access Denied. Please log in.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="bg-blue-600 h-32 w-full object-cover"></div>

          <div className="px-6 sm:px-8 pb-8">
            <div className="relative -mt-16 sm:-mt-20 mb-6 flex justify-between items-end">
              <div className="h-32 w-32 sm:h-40 sm:w-40 rounded-full border-4 border-white dark:border-gray-800 bg-white dark:bg-gray-700 overflow-hidden flex items-center justify-center">
                {session?.user?.image ? (
                  <img
                    src={session.user.image}
                    alt="Profile avatar"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <User className="h-16 w-16 text-gray-400" />
                )}
              </div>
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="mb-4 flex items-center gap-2 py-2 px-4 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 dark:text-red-400 transition-colors text-sm font-medium"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </div>

            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {session?.user?.name || "Anonymous User"}
              </h1>
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                {session?.user?.email || "No email provided"}
              </p>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Account Details
              </h2>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    User ID
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white font-mono bg-gray-50 dark:bg-gray-800/50 p-2 rounded">
                    {(session?.user as any)?.id || "N/A"}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Session Strategy
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white font-mono bg-gray-50 dark:bg-gray-800/50 p-2 rounded">
                    JWT
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
