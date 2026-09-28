import { installServerCapture } from '@djarin/next-inspect/server';

export async function register() {
  installServerCapture({});
}
