import NavBar from "./Navbar";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-gray-900 h-screen transition-all duration-300 flex flex-col">
      <header>
        <NavBar />
      </header>
      <main className="basis-full">{children}</main>
    </div>
  );
}
