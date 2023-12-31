import PageList from "@/components/PageList";

const items: PageItem[] = [
  { url: "/games", name: "Games", imagePath: "/img/games.svg" },
  { url: "/other", name: "Other", imagePath: "/img/other.svg" },
];

export default function Home() {
  return <PageList items={items} />;
}
