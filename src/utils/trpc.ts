import { createTRPCReact } from '@trpc/react-query';
import { httpBatchLink } from '@trpc/client';
import superjson from 'superjson';
import type { AppRouter } from '@/server/trpc/router';

export const trpc = createTRPCReact<AppRouter>();

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: 'https://seoul-comix-career.vercel.app/api/trpc', // Ensure correct URL
      async headers() {
        return {};
      },
    }),
  ],
  transformer: superjson, // Ensures SuperJSON is used in the client
});
