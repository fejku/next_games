"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  items: PageItem[];
};

const PageList = ({ items }: Props) => {
  const pathname = usePathname();

  return (
    <main>
      <div className="flex flex-wrap p-1">
        {items.map((item) => (
          <Link
            key={item.url}
            href={`${pathname === "/" ? "" : pathname}${item.url}`}
            className="basis-1/2 p-1 aspect-square sm:basis-1/3 md:basis-1/4 lg:basis-1/6"
          >
            {item.imagePath ? (
              <div className="relative h-full border">
                <Image src={item.imagePath} alt="" fill />
                <span className="w-full p-2 absolute bottom-0 bg-white/90 text-center first-letter:capitalize">
                  {item.name}
                </span>
              </div>
            ) : (
              <div className="h-full flex justify-center items-center border uppercase">
                {item.name}
              </div>
            )}
          </Link>
        ))}
      </div>
    </main>
  );
};

export default PageList;
