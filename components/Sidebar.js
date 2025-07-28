// File Location: components/Sidebar.js

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from 'react'; // Import hooks
import styles from "./Sidebar.module.css";

const navItems = [
  { href: "/invoices", label: "Invoice" },
  // You can add more links here in the future if needed
];

export default function Sidebar() {
  const pathname = usePathname();
  // State to safely check if we are on the client-side
  const [isClient, setIsClient] = useState(false);

  // This effect will only run on the client, after the initial render
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>Bookipi</div>
      <nav className={styles.nav}>
        {navItems.map((item) => {
          // Only determine if the link is active if we are on the client
          const isActive = isClient && pathname.startsWith(item.href);
          
          return (
            <Link
              key={item.href}
              href={item.href}
              // Use the isActive flag to apply the correct style
              className={isActive ? styles.active : styles.link}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
