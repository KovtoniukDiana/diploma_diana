'use client';
import Image from "next/image";
import { Button } from "@heroui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24 bg-amber-600">
      Main page

      <div className="w-[300px] h-[300px] bg-amber-950">lkm

      </div>

      <div className="flex flex-wrap gap-4 items-center">
      <Button color="default">Default</Button>
      <Button color="primary">Primary</Button>
      <Button color="secondary">Secondary</Button>
      <Button color="success">Success</Button>
      <Button color="warning">Warning</Button>
      <Button color="danger">Danger</Button>
    </div>
    </div>
  );
}
