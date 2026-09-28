import { LogInspectorWrapper } from '@/components/log-inspector';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        {/* The LogInspector is mounted globally here */}
        <LogInspectorWrapper />
      </body>
    </html>
  )
}
