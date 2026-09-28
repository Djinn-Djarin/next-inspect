import { withLogInspector } from '@djarin/next-inspect/plugin';

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@djarin/next-inspect'],
  experimental: {
    instrumentationHook: true,
  },
};

// Wrap the config to auto-generate the inspector routes and instrumentation
export default withLogInspector()(nextConfig);
