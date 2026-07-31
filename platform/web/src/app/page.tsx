"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser, isContractor } from "@/lib/api";

export default function RootPage() {
  const router = useRouter();
  useEffect(() => {
    const user = getCurrentUser();
    if (!user) {
      router.replace("/login");
    } else {
      router.replace(isContractor(user) ? "/work-orders" : "/dashboard");
    }
  }, [router]);
  return null;
}
