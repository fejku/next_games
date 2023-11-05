export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-[calc(100dvh-41px)] bg-[url('/games/adding-to-20/background.jpg')] bg-cover">
      {children}
    </div>
  );
}
