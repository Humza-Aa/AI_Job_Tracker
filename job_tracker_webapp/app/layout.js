import { Providers } from "./provider/Provider";

export default function RootLayout({ children }) {
  return (
    <html lang="en" style={{ width: "100%" }}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
