import "./globals.css";

export const metadata = {
  title: "Cynet",
  description: "Biggest IT Fest of GGSIPU.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
