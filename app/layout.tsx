import './globals.css';
import React from 'react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" type="image/svg+xml" href="/images/favicon.svg"></link>
      <meta charSet="utf-8" name="description" content='This is Monthly take home salary calculator as per new Tax regime in India' />
      <title>Income Tax Calculator</title>
      <body className="">{children}</body>
    </html>
  );
}
