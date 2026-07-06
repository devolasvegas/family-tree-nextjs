import Image from "next/image";
import { gql } from "@apollo/client";

import { query } from "@lib/apolloClient";

import { type Person } from "@generated/graphql";

// Using force-dynamic so that our GraqhQL query doesn't run at build time
// We want to use Railway private networking which is not available at build time
export const dynamic = "force-dynamic";

interface Data {
  persons: Person[];
}

export default async function Home() {
  const GET_PERSONS = gql`
    query GetPersons {
      persons {
        id
        firstName
        lastName
      }
    }
  `;

  const { data }: { data: Data | undefined } = await query({
    query: GET_PERSONS,
  });
  const persons = data?.persons || [];

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted-background font-sans dark:bg-black">
      <main className="min-h-screen w-full max-w-7xl margin-x-auto bg-background dark:bg-black">
        <div className="relative h-[500px] w-full">
          <Image
            src="/rajiv-perera-_JjYYsQPneE-unsplash.jpg"
            alt="A photo of an extended family posing together in front of a white house."
            fill
            className="object-cover object-center"
          />
        </div>
        <div className="px-5 py-20 md:p-10">
          <h1 className="mb-5 text-4xl font-bold text-muted-foreground">
            Welcome to the Family Tree App
          </h1>
          <p className="mb-5 text-lg text-muted-foreground">
            This is a simple family tree application built with Next.js,
            TypeScript, and GraphQL. You can view and manage your family members
            easily.
          </p>
        </div>
      </main>
    </div>
  );
}
