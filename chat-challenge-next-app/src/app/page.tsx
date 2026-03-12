import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex gap-6">
        <Link
          href="/chat/user-a"
          className="flex h-14 w-40 items-center justify-center rounded-full bg-white px-6 text-lg font-semibold text-primary transition-colors hover:bg-white/80"
        >
          User A
        </Link>
        <Link
          href="/chat/user-b"
          className="flex h-14 w-40 items-center justify-center rounded-full bg-white px-6 text-lg font-semibold text-primary transition-colors hover:bg-white/80"
        >
          User B
        </Link>
      </div>
    </div>
  );
}

