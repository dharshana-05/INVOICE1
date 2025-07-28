// app/layout.js
import "./globals.css";

export const metadata = {
  title: "Invoice App",
  description: "The best free invoice app for small businesses",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}