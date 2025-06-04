import { z } from 'zod';

export const ENUMS = {
  SCOPES: ['ADMIN', 'USER'],
};

export const create = {
  body: z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
    scope: z.enum(ENUMS.SCOPES).optional(),
  }),
};

export const signin = {
  body: z.object({
    email: z.string(),
    password: z.string(),
  }),
};
