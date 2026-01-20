"use client";

import { Spinner } from "@heroui/react";

export default function Loading() {
  return (
    <div className="absolute w-full top-[50%] flex justify-center items-center z-20" >
      <div className="flex items-end gap-2 h-8">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-3 h-3 rounded-full bg-pink-500 animate-wave"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  );
}
