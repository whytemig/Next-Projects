import { sql } from "@vercel/postgres";
import InputRest from "./components/InputRest";

export default async function Home() {
  const { rows } = await sql`SELECT * from Grudges`;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-[600px] w-full ">
        <InputRest />
        <div className="w-full h-1 bg-slate-700 my-4 rounded-md"></div>
        <div className="mt-4 p-4 ">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-900 mt-2">
            {rows?.reverse().map((grudge) => (
              <div
                key={grudge.name}
                className="shadow-md py-5 my-2 hover:translate-x-1 text-center px-2 cursor-pointer"
              >
                {grudge.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
