export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-[100dvh] bg-[url('/games/adding-to-20/background.jpg')] bg-cover">
      {children}
    </div>
  );
}
