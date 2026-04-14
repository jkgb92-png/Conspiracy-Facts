import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
  title: "ConspiracyFacts — Authentic Stories, Verified Truths",
  description:
    "A platform dedicated to authentic storytelling and verified truths. Submit videos and stories. Every claim checked by Truth Guard AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900">
        <Navigation />
        <main className="flex-1">{children}</main>
        <footer className="bg-white border-t border-slate-200 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid md:grid-cols-4 gap-8">
              <div className="md:col-span-2">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 bg-blue-900 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xs">CF</span>
                  </div>
                  <span className="font-bold text-blue-900">ConspiracyFacts</span>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed">
                  A platform dedicated to authentic storytelling and independently verified truths.
                  Every piece of content is scanned by our Truth Guard AI.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-700 mb-3 text-sm">Platform</h4>
                <ul className="space-y-2 text-sm text-slate-500">
                  <li><a href="/feed" className="hover:text-blue-900 transition-colors">Story Feed</a></li>
                  <li><a href="/videos" className="hover:text-blue-900 transition-colors">Video Library</a></li>
                  <li><a href="/truth-guard" className="hover:text-blue-900 transition-colors">Truth Guard AI</a></li>
                  <li><a href="/profile" className="hover:text-blue-900 transition-colors">My Profile</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-slate-700 mb-3 text-sm">About</h4>
                <ul className="space-y-2 text-sm text-slate-500">
                  <li><a href="#" className="hover:text-blue-900 transition-colors">Our Mission</a></li>
                  <li><a href="#" className="hover:text-blue-900 transition-colors">Verification Standards</a></li>
                  <li><a href="#" className="hover:text-blue-900 transition-colors">Tech Stack</a></li>
                  <li><a href="#" className="hover:text-blue-900 transition-colors">Contact</a></li>
                </ul>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-slate-100 text-xs text-slate-400 text-center">
              © {new Date().getFullYear()} ConspiracyFacts. Built with Next.js · AWS S3 · Truth Guard AI
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
