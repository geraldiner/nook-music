"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  {
    label: "Home",
    href: "/",
  },
];

function Header() {
  const pathname = usePathname();
  return (
    <header className="w-full bg-yellow-700">
      <nav className="w-full md:max-w-5xl mx-auto flex justify-between items-center p-6">
        <h3><Link href="/">Nook Radio</Link></h3>
        <ul className="flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (<li key={link.label}><Link href={link.href} className={isActive ? "active" : ""}>{link.label}</Link></li>);
          })}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
