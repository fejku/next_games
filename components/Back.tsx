"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Back = () => {
  const pathname = usePathname();
  const backPathname = pathname.slice(0, pathname.lastIndexOf("/"));

  return (
    <Link href={backPathname} className="fixed top-12 left-2 rounded-full">
      <Image
        src="/back.svg"
        alt=""
        width={0}
        height={0}
        className="w-12 h-12 p-2 bg-white/90 rounded-full border-2 border-zinc-700/90 transition-all hover:p-[0.375rem]"
      />
    </Link>
  );
};

export default Back;
