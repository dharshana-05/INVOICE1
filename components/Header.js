// File Location: components/Header.js

import Link from "next/link";
import styles from "./Header.module.css";
import Button from "./Button";

// We now accept an `onLoginClick` function as a prop
export default function Header({ onLoginClick }) {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          Bookipi
        </Link>
        <nav className={styles.nav}>
          <Link href="#">Invoice app</Link>
          <Link href="#">Templates</Link>
          <Link href="#">Products</Link>
          <Link href="#">Resources</Link>
          <Link href="#">Pricing</Link>
          <Link href="#">Support</Link>
        </nav>
        <div className={styles.actions}>
          {/* This is no longer a Link, but a button that triggers the function */}
          <button onClick={onLoginClick} className={styles.loginLink}>
            Log in
          </button>
          <Link href="/invoices">
            <Button>Get started</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
