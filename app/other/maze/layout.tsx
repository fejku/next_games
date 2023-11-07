export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="h-[calc(100dvh-41px)] bg-rose-200">{children}</div>;
}
