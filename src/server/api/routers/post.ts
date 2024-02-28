import { date, z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  //CREATE
  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const item = await ctx.db.shoppingItem.create({
        data: {
          name: input.name,
          checked: true,
        },
      });
      return item;
    }),

  //DELETE
  deleteItem: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const item = await ctx.db.shoppingItem.delete({
        where: {
          id: input.id,
        },
      });
      return item;
    }),

  //READ
  getAll: publicProcedure.query(({ ctx }) => {
    const items = ctx.db.shoppingItem.findMany();
    return items;
  }),

  //UPDATE
  updateItem: publicProcedure
    .input(z.object({ id: z.string(), checked: z.boolean() }))
    .mutation(async ({ input, ctx }) => {
      const item = await ctx.db.shoppingItem.update({
        where: {
          id: input.id,
        },
        data: {
          checked: input.checked,
        },
      });
      return item;
    }),
});
