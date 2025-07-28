// File Location: components/InvoiceForm.js

"use client";

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import styles from "./InvoiceForm.module.css";
import Button from "./Button";

const blankItem = { description: '', rate: 0, qty: 1 };

export default function InvoiceForm({ mode = 'create', initialData = null }) {
  const router = useRouter();
  
  // States for all fields
  const [fromName, setFromName] = useState('Your Company');
  const [fromAddress, setFromAddress] = useState('123 Your Street, Your City');
  const [toName, setToName] = useState('');
  const [toAddress, setToAddress] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState(`INV-${Date.now().toString().slice(-4)}`);
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split('T')[0]);
  const [dueDate, setDueDate] = useState(''); // New state for Due Date
  const [notes, setNotes] = useState(''); // New state for Notes
  const [bankName, setBankName] = useState('Your Bank Name'); // New state for Payment Info
  const [bankAccount, setBankAccount] = useState('123-456-7890'); // New state for Payment Info
  const [items, setItems] = useState([blankItem]);

  // Pre-fill the form in "edit" mode
  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setFromName(initialData.fromName || '');
      setFromAddress(initialData.fromAddress || '');
      setToName(initialData.toName || '');
      setToAddress(initialData.toAddress || '');
      setInvoiceNumber(initialData.invoiceNumber || '');
      setInvoiceDate(initialData.invoiceDate ? new Date(initialData.invoiceDate).toISOString().split('T')[0] : '');
      setDueDate(initialData.dueDate ? new Date(initialData.dueDate).toISOString().split('T')[0] : '');
      setNotes(initialData.notes || '');
      setBankName(initialData.bankName || '');
      setBankAccount(initialData.bankAccount || '');
      setItems(initialData.items && initialData.items.length > 0 ? initialData.items : [blankItem]);
    }
  }, [mode, initialData]);

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const addItem = () => setItems([...items, { ...blankItem }]);
  const removeItem = (index) => setItems(items.filter((_, i) => i !== index));
  
  const subtotal = items.reduce((acc, item) => acc + (Number(item.rate) * Number(item.qty)), 0);
  const total = subtotal;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const invoiceData = {
      fromName, fromAddress,
      toName, toAddress,
      invoiceNumber, invoiceDate, dueDate,
      notes, bankName, bankAccount,
      items, total, status: 'Draft',
    };

    const storedInvoices = JSON.parse(localStorage.getItem('invoices')) || [];
    let updatedInvoices = [];
    let newInvoiceId = null;

    if (mode === 'edit') {
      updatedInvoices = storedInvoices.map(inv => 
        inv.id === initialData.id ? { ...inv, ...invoiceData } : inv
      );
      newInvoiceId = initialData.id;
    } else {
      newInvoiceId = `INV-${Date.now()}`;
      invoiceData.id = newInvoiceId;
      updatedInvoices = [...storedInvoices, invoiceData];
    }
    
    localStorage.setItem('invoices', JSON.stringify(updatedInvoices));
    router.push(`/invoices/${newInvoiceId}`); // Redirect to the preview page
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formWrapper}>
      <section className={styles.topSection}>
        <div className={styles.addressBox}>
          <h3 className={styles.boxTitle}>From</h3>
          <input placeholder="Your Name / Company" value={fromName} onChange={e => setFromName(e.target.value)} required />
          <textarea placeholder="Your Address" value={fromAddress} onChange={e => setFromAddress(e.target.value)} required />
        </div>
        <div className={styles.addressBox}>
          <h3 className={styles.boxTitle}>Bill To</h3>
          <input placeholder="Client Name / Company" value={toName} onChange={e => setToName(e.target.value)} required/>
          <textarea placeholder="Client Address" value={toAddress} onChange={e => setToAddress(e.target.value)} required/>
        </div>
      </section>

      <section className={styles.detailsSection}>
        <div><label>Invoice Number</label><input value={invoiceNumber} onChange={e => setInvoiceNumber(e.target.value)} /></div>
        <div><label>Date</label><input type="date" value={invoiceDate} onChange={e => setInvoiceDate(e.target.value)} required/></div>
        <div><label>Due Date</label><input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} required/></div>
      </section>

      <section className={styles.itemsSection}>
        <div className={`${styles.itemRow} ${styles.itemsHeader}`}>
          <span>Description</span><span>Qty</span><span>Price</span><span>Total</span>
        </div>
        {items.map((item, index) => (
          <div key={index} className={styles.itemRow}>
            <input placeholder="Item Description" value={item.description} onChange={e => handleItemChange(index, 'description', e.target.value)} />
            <input type="number" value={item.qty} onChange={e => handleItemChange(index, 'qty', e.target.value)} />
            <input type="number" placeholder="0.00" value={item.rate} onChange={e => handleItemChange(index, 'rate', e.target.value)} />
            <span className={styles.amount}>₹{(item.rate * item.qty).toFixed(2)}</span>
            <button type="button" className={styles.deleteItemButton} onClick={() => removeItem(index)}>&times;</button>
          </div>
        ))}
        <Button type="button" onClick={addItem} variant="secondary">+ Add Line Item</Button>
      </section>
      
      <section className={styles.bottomSection}>
        <div className={styles.notesAndPayment}>
          <div className={styles.notesBox}>
            <h3 className={styles.boxTitle}>Notes</h3>
            <textarea placeholder="Any additional notes..." value={notes} onChange={e => setNotes(e.target.value)} />
          </div>
          <div className={styles.paymentBox}>
            <h3 className={styles.boxTitle}>Payment Information</h3>
            <input placeholder="Bank Name" value={bankName} onChange={e => setBankName(e.target.value)} />
            <input placeholder="Account Number" value={bankAccount} onChange={e => setBankAccount(e.target.value)} />
          </div>
        </div>
        <div className={styles.summary}>
          <div className={styles.totals}>
            <div><span>Subtotal</span><span>₹{subtotal.toFixed(2)}</span></div>
            <div><strong>Total</strong><strong>₹{total.toFixed(2)}</strong></div>
          </div>
          <div className={styles.actions}>
            <Button type="submit">{mode === 'edit' ? 'Update Invoice' : 'Save & Preview'}</Button>
          </div>
        </div>
      </section>
    </form>
  );
}
