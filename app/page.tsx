import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });
  const { data: puzzle } = await supabase.rpc("get_random_puzzle");
  console.log(puzzle);

  return (
    <main>
      <h1>Hello World!</h1>
    </main>
  );
}
