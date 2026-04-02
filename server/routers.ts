import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import { createBriefing, getBriefings, getBriefingById, updateBriefing, deleteBriefing, createCustomForm, getCustomForms, getCustomFormByLink, deleteCustomForm, createCustomFormSubmission, getCustomFormSubmissions } from "./db";
import { sendBriefingNotification, sendCustomFormNotification } from "./_core/email";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => {
      const u = opts.ctx.user;
      if (!u) return null;
      return { id: u.id, name: u.name, email: u.email, role: u.role };
    }),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  briefing: router({
    submit: publicProcedure
      .input(
        z.object({
          clientName: z.string().min(1),
          clientEmail: z.string().email(),
          briefingType: z.string(),
          formData: z.any(),
        })
      )
      .mutation(async ({ input }) => {
        const result = await createBriefing({
          clientName: input.clientName,
          clientEmail: input.clientEmail,
          briefingType: input.briefingType,
          formData: JSON.stringify(input.formData),
          status: "novo",
        } as any);

        if (result) {
          // Send email notification (non-blocking)
          sendBriefingNotification(
            input.clientName,
            input.clientEmail,
            input.briefingType,
            input.formData
          ).catch((err) => console.error('[Email] Failed to send briefing notification:', err));
        }

        return result ? { success: true, id: result.id } : { success: false };
      }),

    list: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user?.role !== "admin") {
        throw new Error("Unauthorized");
      }
      return await getBriefings();
    }),

    getById: protectedProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input, ctx }) => {
        if (ctx.user?.role !== "admin") {
          throw new Error("Unauthorized");
        }
        return await getBriefingById(input.id);
      }),

    update: protectedProcedure
      .input(
        z.object({
          id: z.number(),
          status: z.string().optional(),
          notes: z.string().optional(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== "admin") {
          throw new Error("Unauthorized");
        }
        const result = await updateBriefing(input.id, {
          status: input.status as any,
          notes: input.notes,
        });
        return result ? { success: true } : { success: false };
      }),

    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== "admin") {
          throw new Error("Unauthorized");
        }
        const success = await deleteBriefing(input.id);
        return { success };
      }),
  }),

  customForm: router({
    create: protectedProcedure
      .input(
        z.object({
          clientName: z.string().min(1),
          clientEmail: z.string().email(),
          formTitle: z.string().min(1),
          htmlContent: z.string().min(1),
          cssContent: z.string().optional(),
          uniqueLink: z.string().min(1),
        })
      )
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== "admin") {
          throw new Error("Unauthorized");
        }
        const result = await createCustomForm({
          clientName: input.clientName,
          clientEmail: input.clientEmail,
          formTitle: input.formTitle,
          htmlContent: input.htmlContent,
          cssContent: input.cssContent,
          uniqueLink: input.uniqueLink,
          isActive: 1,
        } as any);
        return result ? { success: true, id: result.id } : { success: false };
      }),

    list: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user?.role !== "admin") {
        throw new Error("Unauthorized");
      }
      return await getCustomForms();
    }),

    getByLink: publicProcedure
      .input(z.object({ uniqueLink: z.string() }))
      .query(async ({ input }) => {
        return await getCustomFormByLink(input.uniqueLink);
      }),

    submit: publicProcedure
      .input(
        z.object({
          uniqueLink: z.string(),
          clientName: z.string().min(1),
          clientEmail: z.string().email(),
          formData: z.any(),
        })
      )
      .mutation(async ({ input }) => {
        const form = await getCustomFormByLink(input.uniqueLink);
        if (!form) {
          return { success: false, error: "Formulário não encontrado" };
        }

        const result = await createCustomFormSubmission({
          formId: form.id,
          clientName: input.clientName,
          clientEmail: input.clientEmail,
          formData: JSON.stringify(input.formData),
        } as any);

        if (result) {
          await sendCustomFormNotification(
            input.clientName,
            input.clientEmail,
            form.formTitle,
            input.formData
          );
        }

        return result ? { success: true, id: result.id } : { success: false };
      }),

    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== "admin") {
          throw new Error("Unauthorized");
        }
        const success = await deleteCustomForm(input.id);
        return { success };
      }),

    submissions: protectedProcedure
      .input(z.object({ formId: z.number() }))
      .query(async ({ input, ctx }) => {
        if (ctx.user?.role !== "admin") {
          throw new Error("Unauthorized");
        }
        return await getCustomFormSubmissions(input.formId);
      }),
  }),
});

export type AppRouter = typeof appRouter;
