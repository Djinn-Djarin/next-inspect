"use client";

import dynamic from 'next/dynamic';
import '@djarin/next-inspect/inspector-theme.css';

const LogInspector = dynamic(
  () => import('@djarin/next-inspect/components').then((mod) => mod.LogInspector),
  { ssr: false }
);

export function LogInspectorWrapper() {
  return <LogInspector options={{ logExternal: true }} />;
}
