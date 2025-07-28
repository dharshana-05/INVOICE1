// File Location: app/(dashboard)/invoices/page.js

"use client"; 

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import Button from "@/components/Button";

export default function InvoicesPage() {
  const [allInvoices, setAllInvoices] = useState([]); // Holds all invoices
  const [filteredInvoices, setFilteredInvoices] = useState([]); // Holds invoices to display
  const [searchTerm, setSearchTerm] = useState(""); // Holds the search input

  // Load all invoices from localStorage once when the page loads
  useEffect(() => {
    const storedInvoices = JSON.parse(localStorage.getItem('invoices')) || [];
    setAllInvoices(storedInvoices);
    setFilteredInvoices(storedInvoices); // Initially, show all invoices
  }, []);

  // This effect runs whenever the user types in the search bar
  useEffect(() => {
    const results = allInvoices.filter(invoice =>
      (invoice.toName || invoice.clientName || '').toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredInvoices(results);
  }, [searchTerm, allInvoices]);

  const handleDelete = (idToDelete) => {
    const updatedInvoices = allInvoices.filter(inv => inv.id !== idToDelete);
    setAllInvoices(updatedInvoices);
    localStorage.setItem('invoices', JSON.stringify(updatedInvoices));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Invoices</h1>
        <Link href="/invoices/create">
          <Button>+ Create Invoice</Button>
        </Link>
      </div>

    
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Filter by client name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      {allInvoices.length === 0 ? (
        <div className={styles.emptyState}>
          <h2>Create your first Invoice</h2>
          <p>You have no invoices yet. Click the button to get started.</p>
          <Link href="/invoices/create">
            <Button>+ Create</Button>
          </Link>
        </div>
      ) : (
        <div className={styles.invoiceList}>
          <div className={`${styles.invoiceRow} ${styles.listHeader}`}>
            <span>Invoice ID</span>
            <span>Client</span>
            <span>Amount</span>
            <span>Status</span>
            <span>Actions</span>
          </div>
          {filteredInvoices
            .filter(invoice => invoice && invoice.id)
            .map((invoice) => (
            <div key={invoice.id} className={styles.invoiceRow}>
              <Link href={`/invoices/${invoice.id}`} className={styles.linkRow}>
                <span>{invoice.invoiceNumber || invoice.id}</span>
                <span>{invoice.toName || invoice.clientName || 'N/A'}</span>
                <span>₹{(invoice.total || 0).toFixed(2)}</span>
                <span className={styles.statusDraft}>{invoice.status || 'N/A'}</span>
              </Link>
              <div className={styles.actions}>
                <Link href={`/invoices/${invoice.id}/edit`}>Edit</Link>
                <button onClick={() => handleDelete(invoice.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
