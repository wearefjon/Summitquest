"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Suspense, useState } from "react";
import { supabase } from "@/lib/supabase";
import { APP_NAME } from "@/lib/constants";

const registerSchema = z
  .object({
    full_name: z.string().min(2, "Name is required"),
    email: z.string().email("Enter a valid email"),
    phone: z.string().optional(),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirm_password: z.string(),
    role: z.enum(["customer", "operator"]),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords don't match",
    path: ["confirm_password"],
  });

type RegisterForm = z.infer<typeof registerSchema>;

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [googleLoading, setGoogleLoading] = useState(false);
  
  const defaultRole = searchParams.get("role") === "operator" ? "operator" : "customer";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: { role: defaultRole },
  });

  async function onSubmit(data: RegisterForm) {
    try {
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.full_name,
            phone: data.phone || undefined,
            role: data.role,
          }
        }
      });
      
      if (error) throw error;
      
      router.push(data.role === "operator" ? "/operator" : "/");
    } catch (err: any) {
      const message = err.message || "Registration failed";
      setError("root", { message });
    }
  }

  async function signInWithGoogle() {
    try {
      setGoogleLoading(true);
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });
      if (error) throw error;
    } catch (err: any) {
      setError("root", { message: err.message });
      setGoogleLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
      <Link href="/" className="text-sm font-semibold text-primary">
        ← {APP_NAME}
      </Link>
      <h1 className="mt-6 text-2xl font-bold">Create your account</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Join as a traveller or list your adventures as an operator
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
        <div>
          <label className="text-sm font-medium">I am a</label>
          <div className="mt-2 flex gap-3">
            <label className="flex flex-1 cursor-pointer items-center justify-center rounded-xl border border-border px-3 py-2 text-sm has-[:checked]:border-primary has-[:checked]:bg-primary/5">
              <input type="radio" value="customer" className="sr-only" {...register("role")} />
              Traveller
            </label>
            <label className="flex flex-1 cursor-pointer items-center justify-center rounded-xl border border-border px-3 py-2 text-sm has-[:checked]:border-primary has-[:checked]:bg-primary/5">
              <input type="radio" value="operator" className="sr-only" {...register("role")} />
              Operator
            </label>
          </div>
        </div>

        <div>
          <label htmlFor="full_name" className="text-sm font-medium">
            Full name
          </label>
          <input
            id="full_name"
            className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            {...register("full_name")}
          />
          {errors.full_name && (
            <p className="mt-1 text-xs text-red-600">{errors.full_name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            {...register("email")}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="text-sm font-medium">
            Phone (optional)
          </label>
          <input
            id="phone"
            type="tel"
            className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            {...register("phone")}
          />
        </div>

        <div>
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete="new-password"
            className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            {...register("password")}
          />
          {errors.password && (
            <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="confirm_password" className="text-sm font-medium">
            Confirm password
          </label>
          <input
            id="confirm_password"
            type="password"
            autoComplete="new-password"
            className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            {...register("confirm_password")}
          />
          {errors.confirm_password && (
            <p className="mt-1 text-xs text-red-600">{errors.confirm_password.message}</p>
          )}
        </div>

        {errors.root && (
          <p className="text-sm text-red-600">{errors.root.message}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting || googleLoading}
          className="w-full rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:opacity-50"
        >
          {isSubmitting ? "Creating account..." : "Create account"}
        </button>
      </form>

      <div className="mt-6 flex items-center justify-between">
        <span className="w-1/5 border-b border-border lg:w-1/4"></span>
        <span className="text-xs text-center text-muted-foreground uppercase">or continue with</span>
        <span className="w-1/5 border-b border-border lg:w-1/4"></span>
      </div>

      <button
        onClick={signInWithGoogle}
        disabled={isSubmitting || googleLoading}
        className="mt-6 w-full flex items-center justify-center gap-3 rounded-xl border border-border bg-card py-2.5 text-sm font-semibold text-foreground transition hover:bg-muted disabled:opacity-50"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
        {googleLoading ? "Redirecting..." : "Google"}
      </button>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="text-center text-sm text-muted-foreground">Loading...</div>}>
      <RegisterForm />
    </Suspense>
  );
}
