"use client";

import { useSession, signOut, signIn } from "next-auth/react";
import { useDispatch } from "react-redux";
import { logout } from "@/features/auth/store/authSlice";
import { LogOut, Store, LogIn, Package } from "lucide-react";
import Link from "next/link";

export function AppHeader() {
  const { data: session } = useSession();
  const dispatch = useDispatch();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md dark:border-gray-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between h-auto sm:h-20 py-4 sm:py-0 gap-4 sm:gap-0">
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="flex items-center gap-2 text-blue-600 dark:text-blue-400 cursor-pointer"
            >
              <Store className="h-8 w-8" />
              <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                Shop
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="hidden sm:flex items-center gap-1.5 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white font-medium transition-colors"
            >
              <Package className="h-4 w-4" />
              Products
            </Link>

            {session && (
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                {/* User Profile */}
                <div className="flex items-center gap-3 pt-4 sm:pt-0 w-full sm:w-auto justify-end">
                  <div className="flex items-center gap-2">
                    {session.user?.image ? (
                      <img
                        src={session.user.image}
                        alt="Avatar"
                        className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-700"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">
                        {session.user?.name?.[0] || "U"}
                      </div>
                    )}
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden md:block">
                      {session.user?.name}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      dispatch(logout());
                      signOut();
                    }}
                    className="flex items-center gap-2 p-2 px-3 text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    title="Sign out"
                  >
                    <LogOut className="h-5 w-5" />
                    <span className="hidden sm:inline font-medium text-sm">
                      Logout
                    </span>
                  </button>
                </div>
              </div>
            )}

            {!session && (
              <div className="flex items-center gap-4">
                <button
                  onClick={() => signIn()}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  Login
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
