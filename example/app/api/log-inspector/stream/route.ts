import { streamHandler } from '@djarin/next-inspect/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const GET = streamHandler();
