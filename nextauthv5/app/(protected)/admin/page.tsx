"use client";
import { admin } from "@/actions/admin-actions";
import FormSuccess from "@/app/_components/FormSuccess";
import RoleGate from "@/app/_components/RoleGate";
import { Button } from "@/components/ui/button";
// import { useCurrentRole } from "@/hooks/useRole";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserRole } from "@prisma/client";
import React from "react";
import { toast } from "sonner";

// User&rsquo;s role: {role}

const AdminPage = () => {
  //   const role = useCurrentRole();

  const serverActionClick = () => {
    admin().then((data) => {
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success(data.success);
      }
    });
  };

  const clickAPI = () => {
    fetch("/api/admin").then((resp) => {
      if (resp.ok) {
        toast.success("OK!");
      } else {
        toast.error("Error!");
      }
    });
  };
  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">🔑 Admin</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <RoleGate allowRole={UserRole.ADMIN}>
          <FormSuccess message="Access Granted!!" />
        </RoleGate>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">Admin-only API Route</p>
          <Button onClick={clickAPI}>Click Me</Button>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">Admin-only Server-action</p>
          <Button onClick={serverActionClick}>Click Me</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminPage;
