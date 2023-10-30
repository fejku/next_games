import Image from "next/image";
import Link from "next/link";
import React from "react";

const games = ["adding-to-20", "memory"];

export default function Home() {
  return (
    <div>
      <div className="underline">
        <Link href="/">Back</Link>
      </div>
      <div>Gry</div>
      <ul className="m-2 grid grid-cols-2 gap-2">
        {games.map((game) => (
          <li
            key={game}
            className="border border-gray-500 shadow-md shadow-gray-500 hover:"
          >
            <Link href={`/games/${game}`} className="relative">
              <Image
                src={`/games/${game}.webp`}
                alt=""
                width={1020}
                height={765}
                className="w-full aspect-square object-cover"
              />
              <span className="w-full p-2 absolute bottom-0 bg-white/90 text-center first-letter:capitalize">
                {game.replaceAll("-", " ")}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
