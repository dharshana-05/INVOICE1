// File Location: app/(dashboard)/invoices/[invoiceId]/page.js

"use client";

import { useState, useEffect } from 'react';
import { useRouter, useParams } from "next/navigation";
import styles from "./page.module.css";
import Button from "@/components/Button";

export default function InvoicePreviewPage() {
  const router = useRouter();
  const params = useParams();
  const { invoiceId } = params;

  const [invoice, setInvoice] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (invoiceId) {
      try {
        const storedInvoices = JSON.parse(localStorage.getItem('invoices')) || [];
        const currentInvoice = storedInvoices.find(inv => inv && inv.id === invoiceId);
        
        if (currentInvoice) {
          setInvoice(currentInvoice);
        } else {
          setError("Invoice not found. It may have been deleted.");
        }
      } catch (e) {
        setError("There was a problem loading the invoice data.");
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }
  }, [invoiceId]);

  // Helper function to format dates safely
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-GB', {
        day: 'numeric', month: 'long', year: 'numeric'
      });
    } catch (e) {
      return 'Invalid Date';
    }
  };

  if (isLoading) {
    return <div className={styles.centeredMessage}>Loading invoice...</div>;
  }
  
  if (error) {
    return (
        <div className={`${styles.container} ${styles.centeredMessage}`}>
            <h1>Error</h1>
            <p>{error}</p>
            <Button onClick={() => router.push('/invoices')}>Back to Invoices</Button>
        </div>
    );
  }

  const subtotal = invoice.items?.reduce((acc, item) => acc + (Number(item.rate) || 0) * (Number(item.qty) || 0), 0) || 0;

  return (
    <>
      <div className={styles.actionsBar}>
          <Button variant="secondary" onClick={() => router.back()}>
            ← Back to Invoices
          </Button>
          <div>
            <Button variant="secondary" onClick={() => window.print()}>
              Download / Print
            </Button>
            <Button>Save Invoice</Button>
          </div>
      </div>
      <div className={styles.invoiceWrapper}>
        <header className={styles.invoiceHeader}>
          <div className={styles.headerText}>
            <h1>INVOICE</h1>
            <span>NO: {invoice.invoiceNumber || invoice.id}</span>
          </div>
        </header>

        <main className={styles.invoiceBody}>
          <section className={styles.partyInfo}>
            <div className={styles.billTo}>
              <h2>Bill To:</h2>
              <p>{invoice.toName || 'N/A'}</p>
              <p>{invoice.toAddress || 'N/A'}</p>
            </div>
            <div className={styles.from}>
              <h2>From:</h2>
              <p>{invoice.fromName || 'N/A'}</p>
              <p>{invoice.fromAddress || 'N/A'}</p>
            </div>
          </section>

          <section className={styles.dateInfo}>
            <p><strong>Date:</strong> {formatDate(invoice.invoiceDate)}</p>
            <p><strong>Due Date:</strong> {formatDate(invoice.dueDate)}</p>
          </section>

          <table className={styles.itemsTable}>
            <thead>
              <tr>
                <th>Description</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items?.map((item, index) => {
                const rate = Number(item.rate) || 0;
                const qty = Number(item.qty) || 0;
                const amount = rate * qty;
                return (
                  <tr key={index}>
                    <td>{item.description || 'N/A'}</td>
                    <td>{qty}</td>
                    <td>₹{rate.toFixed(2)}</td>
                    <td>₹{amount.toFixed(2)}</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3" className={styles.subtotalLabel}>Sub Total</td>
                <td className={styles.subtotalValue}>₹{subtotal.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>

          <section className={styles.footerInfo}>
            <div className={styles.notes}>
              <h3>Note:</h3>
              <p>{invoice.notes || 'No additional notes.'}</p>
            </div>
            <div className={styles.payment}>
              <h3>Payment Information:</h3>
              <p><strong>Bank:</strong> {invoice.bankName || 'N/A'}</p>
              <p><strong>No:</strong> {invoice.bankAccount || 'N/A'}</p>
            </div>
            <div className={styles.thankYou}>
              <h2>Thank You!</h2>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
