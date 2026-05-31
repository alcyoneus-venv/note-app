export function NavigationBar() {
  return (
    <nav className="flex flex-col gap-10 left-0 top-0 h-screen w-45 p-4 justify-center bg-gray-800">
      <a href="/">Home</a>
      <a href="/about">About</a>
      <a href="/portfolio">Portfolio</a>
      <a href="/experience">Experience</a>
      <a href="/contact">Contact</a>
    </nav>
  );
}