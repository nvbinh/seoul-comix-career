import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { createContext } from '@/server/trpc/context';
import { appRouter } from '@/server/trpc/router';

export const runtime = 'nodejs'; // Enable Edge runtime for better performance

const handler = (req: Request) => {
  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: () => createContext(req),
    responseMeta: () => ({
      headers: {
        'Content-Type': 'application/json',
      },
    }),
  });
}

export { handler as GET, handler as POST };