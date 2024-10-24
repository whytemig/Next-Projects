"use client";
import UserInfo from "@/app/_components/UserInfo";
import { useCurrentUser } from "@/hooks/useCurrentFile";

const ClientPage = () => {
  const user = useCurrentUser();
  return (
    <div>
      <UserInfo label="Client Component" user={user} />
    </div>
  );
};

export default ClientPage;
