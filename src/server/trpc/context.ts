import { inferAsyncReturnType } from '@trpc/server';

export function createContext() {
  return {}; // Add authentication, database connection, etc., here if needed
}

export type Context = inferAsyncReturnType<typeof createContext>;
