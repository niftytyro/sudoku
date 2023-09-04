import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import SudokuContainer from "@/components/SudokuContainer";
import SideBar from "@/components/SideBar";

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });
  const { data: puzzle } = await supabase.rpc("get_random_puzzle");

  return (
    <main className="h-full py-4">
      <h1 className="text-center font-semibold text-4xl mb-8">Sudoku</h1>
      <section className="flex justify-center h-full">
        <div className="flex-1" />
        <SudokuContainer grid={puzzle} />
        <SideBar />
      </section>
    </main>
  );
}
