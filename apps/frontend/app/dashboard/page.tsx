export default function DashboardPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1 className="text-4xl font-bold text-black dark:text-zinc-50">
          Dashboard
        </h1>
        <p className="mt-10 text-lg text-zinc-700 dark:text-zinc-300">
          Welcome to your dashboard! Here you can manage your settings and view
          your data.
        </p>
      </main>
    </div>
  );
}
