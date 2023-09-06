import Body from "@/components/Body";
import { DEFAULT_PUZZLE } from "@/utils/constants";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

async function getPuzzle() {
  const supabase = createServerComponentClient({ cookies });
  const { data: puzzle, error } = await supabase.rpc("get_random_puzzle");

  if (!!error) {
    return DEFAULT_PUZZLE;
  }

  return puzzle;
}

export default async function Home() {
  const puzzle = await getPuzzle();

  return (
    <>
      <main className="py-8 px-2 md:px-8">
        <h1 className="text-center font-semibold text-4xl mb-8">Sudoku</h1>
        <Body grid={puzzle} />
      </main>
    </>
  );
}

export const dynamic = "force-dynamic";
