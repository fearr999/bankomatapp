"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/lib/api";
import { PageLoader } from "@/components/ui/spinner";

export default function RootPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace(getCurrentUser() ? "/orders" : "/login");
  }, [router]);
  return (
    <div className="flex min-h-screen items-center justify-center">
      <PageLoader />
    </div>
  );
}
