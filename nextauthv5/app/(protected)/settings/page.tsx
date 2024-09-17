import { auth, signOut } from "@/auth";
const ProtectedSettings = async () => {
  const session = await auth();
  return (
    <div>
      ProtectedSettings
      <h2>
        {JSON.stringify(session)}
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <button type="submit">Logout</button>
        </form>
      </h2>
    </div>
  );
};

export default ProtectedSettings;
