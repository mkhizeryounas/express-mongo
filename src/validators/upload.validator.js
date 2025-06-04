import { z } from 'zod';

export const preSigned = {
  body: z.object({
    fileName: z.string(),
    contentType: z.string(),
  }),
};
