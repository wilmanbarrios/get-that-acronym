import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import supabase from "~/utils/supabase.server";

type Acronym = {
  id: number;
  short: string;
  description: string;
};
type LoaderData = {
  acronyms: Array<Acronym> | null;
};

export const loader: LoaderFunction = async ({ request }) => {
  let url = new URL(request.url);
  let { data: acronyms, error } = await supabase
    .from("acronyms")
    .select("id,short,description")
    .range(0, 10)
    .ilike("short", (url.searchParams.get("q") as string) + "%");

  if (error) {
    console.error(error);
  }

  return json<LoaderData>({
    acronyms,
  });
};

export default function Index() {
  let { acronyms } = useLoaderData<LoaderData>();
  return (
    <main>
      <h1>Get That Acronym</h1>

      <Form method="get" action="./">
        <input type="text" name="q" placeholder="Search for an acronym" />
        <button type="submit">Search</button>
      </Form>

      <ul>
        {acronyms?.map((acronym) => (
          <li key={acronym.id}>
            <div>
              <h2>{acronym.short}</h2>
              <p>{acronym.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
