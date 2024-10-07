import type { Metadata } from "next";
// import localFont from "next/font/local";
import "./globals.css";
import styles from './styles/ImageGrid.module.css';

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });


export const metadata: Metadata = {
  title: 'Image Editor',
  description: 'A small content creation tool',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className={styles.mainHeader}>
          <h1>Image Editor Tool</h1>
        </header>

        <main className={`mainContainer`}>
          {children}
        </main>

      </body>
    </html>
  );
}
