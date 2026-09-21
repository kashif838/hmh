// The real root layout is app/[locale]/layout.tsx; this one only passes through.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
