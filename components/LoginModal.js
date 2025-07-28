// File Location: components/LoginModal.js

"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './LoginModal.module.css';
import Button from './Button';

export default function LoginModal({ onClose }) {
  const [mode, setMode] = useState('login'); 
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === 'login') {
      router.push('/invoices');
    } else {
      alert('Sign up successful! Please log in to continue.');
      setMode('login');
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>&times;</button>
        
        <h2>{mode === 'login' ? 'Log In' : 'Sign Up'}</h2>
        <p>Welcome to Bookipi, please enter your details.</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" required />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" required />
          </div>

          {mode === 'signup' && (
            <div className={styles.inputGroup}>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input type="password" id="confirmPassword" required />
            </div>
          )}

          <Button type="submit">
            {mode === 'login' ? 'Log In' : 'Create Account'}
          </Button>
        </form>

        <div className={styles.toggleMode}>
          {mode === 'login' ? (
            <p>
              {/* THE FIX IS HERE: Replaced ' with &apos; */}
              Don&apos;t have an account?{' '}
              <button onClick={() => setMode('signup')}>Sign Up</button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button onClick={() => setMode('login')}>Log In</button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
