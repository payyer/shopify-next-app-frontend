import Providers from "@/app/providers/providers";
import "./globals.css";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta shopify-api-key={process.env.SHOPIFY_API_KEY} />
        <meta shopify-app-origins={process.env.API_HOST} />
        <meta name="shopify-api-key" content={process.env.SHOPIFY_API_KEY} />
        <meta name="shopify-app-origins" content={process.env.API_HOST} />
        <script src="https://cdn.shopify.com/shopifycloud/app-bridge.js" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
