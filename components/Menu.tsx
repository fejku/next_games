import Link from "next/link";

const links = [
  { href: "/games", name: "Games" },
  { href: "/other", name: "Other" },
];

const Menu = () => {
  return (
    <nav className="flex justify-between border-b shadow-sm">
      <div className="px-3 py-2 uppercase font-bold">
        <Link href="/">Logo</Link>
      </div>
      <ul className="flex">
        {links.map((link) => (
          <li key={link.href} className="px-3 py-2">
            <Link href={link.href} className="uppercase">
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Menu;
