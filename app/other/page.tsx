import PageList from "@/components/PageList";

const items: PageItem[] = [
  {
    url: "/maze",
    name: "Maze",
    imagePath: "/img/maze.svg",
  },
];

export default function Home() {
  return <PageList items={items} />;
}
