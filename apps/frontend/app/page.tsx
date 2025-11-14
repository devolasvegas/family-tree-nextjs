import Image from "next/image";
import { gql } from "@apollo/client";

import { query } from "@lib/apolloClient";

// import { } from "@shared/";

// Using force-dynamic so that our GraqhQL query doesn't run at build time
// We want to use Railway private networking which is not available at build time
export const dynamic = "force-dynamic";

interface Person {
  id: string;
  firstName: string;
  lastName: string;
}

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
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        {persons.length > 0 ? (
          <div className="mt-10 w-full">
            <h2 className="mb-4 text-2xl font-semibold text-black dark:text-zinc-50">
              Persons:
            </h2>
            <ul className="list-disc pl-5">
              {persons.map((person: Person) => (
                <li
                  key={person.id}
                  className="mb-2 text-lg text-zinc-700 dark:text-zinc-300"
                >
                  {person.firstName} {person.lastName}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="mt-10 text-lg text-zinc-700 dark:text-zinc-300">
            No persons found.
          </p>
        )}
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            To get started, edit the page.tsx file.
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Looking for a starting point or more instructions? Head over to{" "}
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Templates
            </a>{" "}
            or the{" "}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Learning
            </a>{" "}
            center.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            Deploy Now
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/8 px-5 transition-colors hover:border-transparent hover:bg-black/4 dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  );
}
