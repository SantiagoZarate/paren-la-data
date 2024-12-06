import { Footer } from "@/components/common/footer/footer";
import { Header } from "@/components/common/header/header";
import { Layout, Main } from "@/components/ui/craft";
import { ThemeProvider } from "@/provider/ThemeProvider";
import { NextUIProvider } from "@nextui-org/react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Paren la data",
  description: "Estadisticas acerca de los invitados de Paren La Mano",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Layout>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NuqsAdapter>
            <NextUIProvider>
              <Header />
              <Main>{children}</Main>
              <Footer />
            </NextUIProvider>
          </NuqsAdapter>
        </ThemeProvider>
      </body>
    </Layout>
  );
}
