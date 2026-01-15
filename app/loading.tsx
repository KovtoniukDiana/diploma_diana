"use client";

import { Spinner } from "@heroui/react";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <Spinner 
      className="text-pink-600"
        classNames={{label: "text-foreground mt-4"}}
        size="lg"
        variant="spinner"
        color="primary"
        label="Loading..." 
      />
    </div>
  );
}
