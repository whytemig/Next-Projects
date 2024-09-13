import { auth } from "@/auth";
const ProtectedSettings = async () => {
  const session = await auth();
  return (
    <div>
      ProtectedSettings<h2>{JSON.stringify(session)}</h2>
    </div>
  );
};

export default ProtectedSettings;
