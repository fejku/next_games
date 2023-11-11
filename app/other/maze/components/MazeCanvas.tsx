import { RefObject } from "react";

interface Props {
  canvasRef: RefObject<HTMLCanvasElement>;
  hideMaze: boolean;
}

export default function MazeCanvas({ canvasRef, hideMaze }: Props) {
  return (
    <div className="flex-1 flex justify-center items-center">
      <canvas ref={canvasRef} className={hideMaze ? "hidden" : ""} />
    </div>
  );
}
