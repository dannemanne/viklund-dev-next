import { Metadata } from "next";
import { Providers } from "./providers";

export const metadata: Metadata = {
  authors: { name: "Daniel Viklund" },
  icons: '/images/favicon.ico',
  title: { absolute: 'Viklund.dev', template: "%s | Viklund.dev" },
  description: 'Hobby game developer and software engineer based in Hong Kong. I am passionate about creating fun and engaging experiences for people to enjoy.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans" />
        <link rel="stylesheet" media="screen" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css" />

        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
};
