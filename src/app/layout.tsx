import "./styles/globals.css";

export const metadata = {
  title: "Nook Music by Geraldine Ragsac",
  description: "Listen to your favorite tunes from the Animal Crossing video game series.",
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
