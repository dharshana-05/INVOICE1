// app/(dashboard)/layout.js
import Sidebar from "@/components/Sidebar";
import styles from "./layout.module.css";

export default function DashboardLayout({ children }) {
  return (
    <div className={styles.dashboardContainer}>
      <Sidebar />
      <main className={styles.mainContent}>{children}</main>
    </div>
  );
}