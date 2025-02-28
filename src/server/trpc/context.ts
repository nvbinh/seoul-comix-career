import { inferAsyncReturnType } from '@trpc/server';
import { NextRequest } from 'next/server';

export function createContext(req?: NextRequest) {
  return {}; // Add authentication, database connection, etc., here if needed
}

export type Context = inferAsyncReturnType<typeof createContext>;
