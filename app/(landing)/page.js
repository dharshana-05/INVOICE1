// app/(landing)/page.js
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";
import Header from "@/components/Header";

// Mock component for feature cards
const FeatureCard = ({ title, description }) => (
  <div className={styles.featureCard}>
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

export default function HomePage() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroText}>
            <h1>The best free invoice app for small businesses</h1>
            <p>
              Use our free invoice maker app to create and send professional
              invoices in seconds – from anywhere.
            </p>
            <Link href="/invoices" className={styles.ctaButton}>
              Get Started
            </Link>
          </div>
          <div className={styles.heroImage}>
            {/* Placeholder for video/image */}
            <Image
              src="/images/mountain-biker.jpg" // Make sure to add this image to your public/images folder
              alt="Man on a mountain bike"
              width={500}
              height={350}
              style={{ objectFit: 'cover', borderRadius: '8px' }}
            />
          </div>
        </section>

        {/* Features Section */}
        <section className={styles.features}>
          <h2>The easiest invoice maker & manager in one app</h2>
          <div className={styles.featuresGrid}>
            <FeatureCard
              title="Invoice on the go"
              description="Create an invoice in under a minute wherever you are."
            />
            <FeatureCard
              title="Get paid on time"
              description="Accept online card payments or in-person via contactless payments."
            />
            <FeatureCard
              title="Invoice manager app"
              description="Keep your invoices organized and track income."
            />
          </div>
        </section>
      </main>
    </>
  );
}