'use client'
import { useTheme } from "next-themes";
import Hearts from "./bg_hearts";
import Stars from "./bg_stars";

export default function Background() {
  const { theme } = useTheme();

  if (theme === "dark") return <Stars />;
  return <Hearts />;
}
