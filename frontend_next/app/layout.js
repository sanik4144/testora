import "./globals.css";

export const metadata = {
  title: "Testora",
  description: "Create your Testora account",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
