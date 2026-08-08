import Link from "next/link";

export default function Navbar() {
  const links = [
    { name: "Social", path: "/pages/social" },
    { name: "Experience", path: "/pages/experience" },
    { name: "Portfolio", path: "/pages/portfolio" },
    { name: "Games", path: "/pages/games" },
  ];

  return (
    <div className="bg-blue-500 p-4 w-24 h-screen flex flex-col justify-center">
      <nav className="flex flex-col items-center">
        <Link href="/" className="py-6">
          Home
        </Link>
        {links.map((link) => (
          <Link className="py-6" href={link.path} key={link.path}>
            {link.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
