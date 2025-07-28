// app/(dashboard)/invoices/create/page.js
import InvoiceForm from "@/components/InvoiceForm";
import styles from "./page.module.css";

export default function CreateInvoicePage() {
  return (
    <div className={styles.container}>
      <h1>Create New Invoice</h1>
      <InvoiceForm />
    </div>
  );
}