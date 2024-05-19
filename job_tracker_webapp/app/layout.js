import { Providers } from "./provider/provider";

export default function RootLayout({ children }) {
  return (
    <html lang="en" style={{ width: "100%" }}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
