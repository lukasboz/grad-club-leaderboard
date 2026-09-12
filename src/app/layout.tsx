import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Grad Club Leaderboard",
  description: "Track your spending at the Grad Club and compete with friends",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>{children}</AuthProvider>
        <div
          className="fixed top-4 right-4 flex items-center gap-2"
          style={{ zIndex: 50 }}
        >
          <button
            onClick={() => {
              document.documentElement.classList.toggle('dark');
            }}
            className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
            aria-label="Toggle dark mode"
          >
            {document.documentElement.classList.contains('dark')
              ? <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    className="stroke-current"
                    d="M20.394 10.948A9.96 9.96 0 0 1 12 19.995a9.96 9.96 0 0 1-7.394-3.898a.75.75 0 0 0-.294.152A7.487 7.487 0 0 0 2.75 12a7.487 7.487 0 0 0 1.534 5.618.75.75 0 0 0 .382-.075 9.96 9.96 0 0 1 5.038-1.897z"
                  />
                </svg>
              : <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    className="stroke-current"
                    d="M20.394 10.948A9.96 9.96 0 0 1 12 19.995a9.96 9.96 0 0 1-7.394-3.898a.75.75 0 0 0-.294.152A7.487 7.487 0 0 0 2.75 12a7.487 7.487 0 0 0 1.534 5.618.75.75 0 0 0 .382-.075 9.96 9.96 0 0 1 5.038-1.897z"
                  />
                </svg>}
          </button>
        </div>
      </body>
    </html>
  );
}
