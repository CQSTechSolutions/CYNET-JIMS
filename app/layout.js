import "./globals.css";

export const metadata = {
  title: "Cynet - IT Fest of JIMS VK",
  description: "Biggest IT Fest of GGSIPU.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`antialiased overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
