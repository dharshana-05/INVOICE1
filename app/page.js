// File Location: app/page.js

"use client"; 

import { useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css"; 
import Header from "@/components/Header";
import LoginModal from '@/components/LoginModal';

export default function HomePage() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  return (
    <div className={styles.pageWrapper}>
      <Header onLoginClick={() => setIsLoginModalOpen(true)} />

      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroText}>
            <h1>The best free invoice app for small businesses</h1>
            <p>
              Use our free invoice maker app to create and send professional
              invoices in seconds – from anywhere. Get paid on time by clients.
            </p>
            <Link href="/invoices" className={styles.ctaButton}>
              Get Started For Free
            </Link>
          </div>
          <div className={styles.heroImage}>
            <Image
              src="/images/homepage.jpg"
              alt="Person riding a bike on a mountain trail"
              width={500}
              height={350}
              priority
              style={{ objectFit: 'cover', borderRadius: '12px' }}
            />
          </div>
        </section>
      </main>

      {isLoginModalOpen && <LoginModal onClose={() => setIsLoginModalOpen(false)} />}
    </div>
  );
}