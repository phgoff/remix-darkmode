export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="basis-full">
      <main className="">{children}</main>
    </div>
  );
}
