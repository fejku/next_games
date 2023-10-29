import Image from "next/image";

const CorrectAnswer = () => {
  return (
    <div className="absolute w-1/2 top-0 bottom-0 left-0 right-0 m-auto aspect-square border-4 border-[#4D4D4D] rounded-full bg-zinc-100 p-4 z-10">
      <Image
        src="/games/adding-to-20/checked.svg"
        alt=""
        height={0}
        width={0}
        className="w-full h-full"
      />
    </div>
  );
};

export default CorrectAnswer;
