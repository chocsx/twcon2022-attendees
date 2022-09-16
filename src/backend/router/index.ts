import * as trpc from "@trpc/server";
import { z } from "zod";
import { prisma } from "@/backend/utils/prisma";

export const appRouter = trpc
  .router()
  .query('hello', {
    input: z
      .object({
        text: z.string().nullish(),
      })
      .nullish(),
    resolve({ input }) {
      return {
        greeting: `hello ${input?.text ?? 'world'}`,
      };
    },
  })
  .query("get-streamer-by-id", {
    input: z.object({ id: z.number() }),
    async resolve({ input }) {
      const streamer = await prisma.streamer.findFirst({
        where: { id: input.id },
      });

      if (!streamer) throw new Error("lol doesnt exists");

      return streamer;
    },
  })
// export type definition of API
export type AppRouter = typeof appRouter;
// export API handler
// export default trpcNext.createNextApiHandler({
//   router: appRouter,
//   createContext: () => null,
// });