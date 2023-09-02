import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Button from "@/components/Button";
import SudokuGrid from "@/components/SudokuGrid";

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });
  const { data: puzzle } = await supabase.rpc("get_random_puzzle");

  return (
    <main className="h-full py-4">
      <h1 className="text-center font-semibold text-4xl mb-8">Sudoku</h1>
      <section className="flex justify-center h-full">
        <div className="flex-[2] flex justify-end">
          <SudokuGrid grid={puzzle} />
        </div>
        <div className="flex-1 flex flex-col justify-center items-center pb-48">
          <p className="text-3xl mb-5">00:27</p>
          <Button>
            <span className="text-2xl leading-none mr-2">+</span> New Game
          </Button>
        </div>
      </section>
    </main>
  );
}
