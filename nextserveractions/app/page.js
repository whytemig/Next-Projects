import { sql } from "@vercel/postgres";
import { addGrudge } from "./actions/creategrdudge";
import SubmitForm from "./components/SubmitForm";

export default async function Home() {
  const { rows } = await sql`SELECT * from Grudges`;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-[500px] w-full">
        <form action={addGrudge} className="space-y-4">
          <label
            htmlFor="Gname"
            className="block text-lg font-bold text-center text-slate-900"
          >
            Name of Grudge
          </label>
          <input
            type="text"
            id="Gname"
            placeholder="Type in a Grudge"
            name="name"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700"
          />
          <SubmitForm />
        </form>
        <div className="w-full h-1 bg-slate-700 my-4"></div>
        <div className="mt-4 p-4">
          {rows?.reverse().map((grudge) => (
            <div
              className="grid grid-cols-1 gap-3 text-slate-900 mt-2"
              key={grudge.name}
            >
              <div className="shadow-md py-5 my-2 hover:translate-x-1 text-start px-2 cursor-pointer">
                {grudge.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
