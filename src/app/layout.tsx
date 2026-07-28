import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "أكاديمية بريلينت | Brilliant Academy",
  description: "منصة تعليمية أونلاين لطلاب مناهج دول الخليج - حصص فردية مع مدرسين متخصصين",
  icons: {
    icon: "https://assets.cdn.filesafe.space/lTNn7BkMGcm52L4pwJS0/media/69afadb7c509a0bfb75719bb.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
