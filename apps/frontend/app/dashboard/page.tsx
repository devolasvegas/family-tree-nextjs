"use client";

import { Button } from "@components/ui/button";

import { gql } from "@apollo/client";

export default function DashboardPage() {
  const CREATE_FAMILY_TREE_MUTATION = gql`
    mutation CreateFamilyTree {
      createFamilyTree {
        id
        name
      }
    }
  `;

  const handleCreateFamilyTree = () => {
    // Logic to create a new family tree can be added here
    console.log("Create Family Tree button clicked");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="min-h-screen w-full max-w-3xl py-32 px-16 bg-white dark:bg-black">
        <h1 className="text-4xl font-bold text-black dark:text-zinc-50">
          Dashboard
        </h1>
        <p className="mt-10 text-lg text-zinc-700 dark:text-zinc-300">
          Welcome to your dashboard! Here you can manage your settings and view
          your data.
        </p>
        <div className="py-8">
          <hr />
        </div>
        <h2 className="text-2xl mb-8">Family Trees</h2>
        <p className="text-zinc-700 dark:text-zinc-300 mb-8">
          You currently have no family trees to display.
        </p>
        <Button className="mt-4" onClick={handleCreateFamilyTree}>
          Create Family Tree
        </Button>
      </main>
    </div>
  );
}
