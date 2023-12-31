import PageList from "@/components/PageList";

const items: PageItem[] = [
  {
    url: "/adding-to-20",
    name: "Adding to 20",
    imagePath: "/games/adding-to-20.webp",
  },
  { url: "/memory", name: "Memory", imagePath: "/games/memory.webp" },
];

export default function Home() {
  return <PageList items={items} />;
}
