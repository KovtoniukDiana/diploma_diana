"use client";

import { signIn } from "next-auth/react";


function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48">
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.7 1.22 9.2 3.6l6.9-6.9C35.9 2.4 30.3 0 24 0 14.6 0 6.4 5.4 2.5 13.2l8 6.2C12.5 13.2 17.8 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.1 24.5c0-1.6-.1-2.8-.4-4H24v7.6h12.7c-.3 2-1.7 5-4.7 7l7.2 5.6c4.2-3.9 6.9-9.6 6.9-16.2z"
      />
      <path
        fill="#FBBC05"
        d="M10.5 28.4c-.5-1.5-.8-3.1-.8-4.8s.3-3.3.8-4.8l-8-6.2C.9 16.3 0 20 0 24c0 4 1 7.7 2.5 11.2l8-6.2z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.3 0 11.6-2.1 15.5-5.7l-7.2-5.6c-2 1.4-4.6 2.3-8.3 2.3-6.2 0-11.5-3.7-13.5-9l-8 6.2C6.4 42.6 14.6 48 24 48z"
      />
    </svg>
  );
}


export default function GoogleSignInButton() {
  return (
    <button
      type="button"
      onClick={() => signIn("google", { callbackUrl: "/" })}
      className="
        flex w-full items-center justify-center gap-3
        rounded-md border border-gray-300
        bg-white px-4 py-2
        text-sm font-medium text-gray-700
        shadow-sm
        hover:bg-gray-50
        active:bg-gray-100
        transition mt-[15px]
      "
    >
      <GoogleIcon />
      <span>Продовжити з Google</span>
    </button>
  );
}
