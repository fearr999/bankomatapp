"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/lib/api";

export default function RootPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace(getCurrentUser() ? "/orders" : "/login");
  }, [router]);
  return null;
}
