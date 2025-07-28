// File Location: app/(dashboard)/invoices/[invoiceId]/edit/page.js

"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import InvoiceForm from '@/components/InvoiceForm';
import styles from './page.module.css';
import Button from '@/components/Button';

export default function EditInvoicePage() {
  const params = useParams();
  const router = useRouter();
  const { invoiceId } = params;
  
  const [invoiceData, setInvoiceData] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Start in a loading state
  const [error, setError] = useState(null); // State to hold any errors

  // Load the specific invoice data from localStorage
  useEffect(() => {
    // This logic runs on the client after the page loads
    if (invoiceId) {
      try {
        const storedInvoices = JSON.parse(localStorage.getItem('invoices')) || [];
        const dataToEdit = storedInvoices.find(inv => inv && inv.id === invoiceId);
        
        if (dataToEdit) {
          setInvoiceData(dataToEdit); // If found, set the data
        } else {
          setError('Invoice not found. It may have been deleted.'); // If not found, set an error
        }
      } catch (e) {
        console.error("Failed to load invoice data:", e);
        setError("An error occurred while loading the invoice.");
      } finally {
        setIsLoading(false); // Stop loading, whether we succeeded or failed
      }
    }
  }, [invoiceId]);

  // Show a loading message while we check for the data
  if (isLoading) {
    return <div>Loading invoice for editing...</div>;
  }

  // If we finished loading but there was an error, show the error message
  if (error) {
    return (
      <div className={styles.container}>
        <h1>Error</h1>
        <p>{error}</p>
        <Button onClick={() => router.push('/invoices')}>Back to Invoices</Button>
      </div>
    );
  }

  // If data is found successfully, show the form
  return (
    <div className={styles.container}>
      <h1>Edit Invoice {invoiceId}</h1>
      {/* Pass the loaded data and the mode to the form */}
      <InvoiceForm mode="edit" initialData={invoiceData} />
    </div>
  );
}
