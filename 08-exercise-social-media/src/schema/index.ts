import { z } from "zod";

export const RegisterSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(50, "50 character maximum is required"),
  email: z.string().email(),
  password: z.string().min(6, "Password with 6 character is required"),
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const PostSchema = z.object({
  content: z.string().min(1, "Content is required"),
  image: z.string().optional(),
});
