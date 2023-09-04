import Body from "@/components/Body";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });
  const { data: puzzle } = await supabase.rpc("get_random_puzzle");

  return (
    <>
      <main className="h-full py-4">
        <h1 className="text-center font-semibold text-4xl mb-8">Sudoku</h1>
        <Body grid={puzzle} />
      </main>
    </>
  );
}
