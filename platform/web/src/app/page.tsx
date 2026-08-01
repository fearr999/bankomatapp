"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser, isContractor } from "@/lib/api";
import { PageLoader } from "@/components/ui/spinner";

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
  return (
    <div className="flex min-h-screen items-center justify-center">
      <PageLoader />
    </div>
  );
}
