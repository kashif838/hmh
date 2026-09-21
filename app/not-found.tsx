import Link from "next/link";

// Fallback for requests that never reach a locale (the proxy normally prevents this).
export default function NotFound() {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "system-ui, sans-serif", background: "#0a0b0c", color: "#eae6dc" }}>
        <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24, textAlign: "center" }}>
          <div>
            <h1 style={{ fontSize: 40, margin: 0 }}>Page not found</h1>
            <p><Link href="/" style={{ color: "#c79a4b" }}>Return to HMH General Trading</Link></p>
          </div>
        </main>
      </body>
    </html>
  );
}
