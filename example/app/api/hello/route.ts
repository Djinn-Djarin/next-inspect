import { NextResponse } from 'next/server';

export async function GET() {
  console.log("Server console log triggered from /api/hello!");
  return NextResponse.json({ message: "Hello from Next.js API!" });
}

export async function POST(req: Request) {
  const body = await req.json();
  return NextResponse.json({ received: body, status: 'success' }, { status: 201 });
}
