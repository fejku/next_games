import Back from "@/components/Back";
import Canvas from "./components/Canvas";

export default function Home() {
  return (
    <div className="h-full flex justify-center items-center">
      <Back />
      <Canvas />
    </div>
  );
}
