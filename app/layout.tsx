import "./globals.css";

export const metadata = {
  title: "In-Hand Salary Calculator India | Calculate Take-Home Salary",
  description:
    "Use our In-Hand Salary Calculator India to estimate your monthly take-home salary after tax, PF, and other deductions. Fast, accurate, and easy-to-use!",
  openGraph: {
    title: "In-Hand Salary Calculator India | Take-Home Salary Estimator",
    description:
      "Instantly calculate your in-hand salary after tax and deductions. Find out how much you will take home from your CTC in India.",
    url: "https://yourdomain.com",
    type: "website",
    images: [
      {
        url: "https://yourdomain.com/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "In-Hand Salary Calculator India",
      },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content="in hand salary calculator, take home salary India, salary after tax, CTC to in hand salary" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={metadata.openGraph.title} />
        <meta property="og:description" content={metadata.openGraph.description} />
        <meta property="og:url" content={metadata.openGraph.url} />
        <meta property="og:image" content={metadata.openGraph.images[0].url} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.openGraph.title} />
        <meta name="twitter:description" content={metadata.openGraph.description} />
        <meta name="twitter:image" content={metadata.openGraph.images[0].url} />
        <link rel="canonical" href="https://yourdomain.com" />
        <link rel="icon" type="image/svg+xml" href="/images/favicon.svg" />
        <title>{metadata.title}</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
