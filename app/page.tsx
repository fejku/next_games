import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="underline">
        <Link href="/games">Games</Link>
      </div>
    </main>
  );
}
