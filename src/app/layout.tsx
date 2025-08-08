import "./styles/globals.css";

export const metadata = {
  title: "Nook Radio by Geraldine Ragsac",
  description: "Listen to your favorite tunes from the Animal Crossing series.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
