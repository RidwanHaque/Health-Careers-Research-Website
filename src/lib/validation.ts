import { z } from "zod";
import { careerIds } from "./careers";

export const MAX_QUESTION_LENGTH = 1000;
export const MAX_NAME_LENGTH = 80;
export const MAX_EMAIL_LENGTH = 254;

const careerIdSchema = z.enum(careerIds as [string, ...string[]]);

export const pollVoteSchema = z.object({
  careerId: careerIdSchema,
});

export const questionSchema = z
  .object({
    displayName: z
      .string()
      .trim()
      .max(MAX_NAME_LENGTH, "Please keep names under 80 characters.")
      .optional()
      .or(z.literal("")),
    ageBand: z.enum(["under13", "teen", "adult"]),
    email: z
      .string()
      .trim()
      .max(MAX_EMAIL_LENGTH)
      .email("Enter a valid email address.")
      .optional()
      .or(z.literal("")),
    parentEmail: z
      .string()
      .trim()
      .max(MAX_EMAIL_LENGTH)
      .email("Enter a valid parent or guardian email.")
      .optional()
      .or(z.literal("")),
    careerId: careerIdSchema.or(z.literal("general")),
    question: z
      .string()
      .trim()
      .min(10, "Please write a little more so the question is clear.")
      .max(MAX_QUESTION_LENGTH, "Please keep questions under 1,000 characters."),
    consent: z.literal(true, {
      errorMap: () => ({ message: "Please confirm you understand how this question will be used." }),
    }),
  })
  .superRefine((value, ctx) => {
    if (value.ageBand === "under13") {
      if (!value.parentEmail) {
        ctx.addIssue({
          code: "custom",
          path: ["parentEmail"],
          message: "Questions from children under 13 need a parent or guardian email.",
        });
      }
    } else if (!value.email) {
      ctx.addIssue({
        code: "custom",
        path: ["email"],
        message: "Enter an email so the site author can reply.",
      });
    }
  });

export const subscribeSchema = z.object({
  email: z.string().trim().max(MAX_EMAIL_LENGTH).email("Enter a valid email address."),
  role: z.enum(["parent", "teacher", "student"]),
  ageConfirmed: z.literal(true, {
    errorMap: () => ({ message: "Confirm that you are 13 or older, or a parent or teacher." }),
  }),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Please agree to the privacy notice before signing up." }),
  }),
});

export const adminLoginSchema = z.object({
  password: z.string().min(1, "Enter the admin password."),
});

export function firstError(error: z.ZodError): string {
  return error.issues[0]?.message ?? "Please check the form and try again.";
}
