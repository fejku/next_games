export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-[calc(100dvh-41px)] bg-[url('/games/most-balls/most-balls.webp')] bg-cover bg-bottom grid place-items-center">
      {children}
    </div>
  );
}
