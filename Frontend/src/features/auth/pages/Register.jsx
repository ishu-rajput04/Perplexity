import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  UserRound,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
} from "lucide-react";

import FormField from "../../../shared/components/FormField";
import Button from "../../../shared/components/Button";

export default function Register() {
  const { register, handleSubmit, reset } = useForm();

  const formSubmitHandler = (data) => {
    reset()
    console.log(data)
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050B18] px-5 py-12 text-white">
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-600/20 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-cyan-500/20 blur-[120px]" />

      <div className="relative w-full max-w-md">
        <Link to="/" className="mb-8 flex items-center justify-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-400 to-blue-700 shadow-lg shadow-blue-500/30">
            <Sparkles size={22} />
          </span>
          <span className="text-2xl font-bold tracking-tight">
            Nova<span className="text-blue-400">Flow</span>
          </span>
        </Link>

        <div className="rounded-3xl border border-white/10 bg-[#0C1526]/90 p-7 shadow-2xl shadow-blue-950/40 backdrop-blur-2xl sm:p-9">
          <div className="mb-8">
            <h1 className="text-3xl font-semibold tracking-tight">
              Create your account
            </h1>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              Start building something great with us.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(formSubmitHandler)}
            className="space-y-5"
          >
            <FormField
              label="Full name"
              icon={UserRound}
              id="name"
              name="name"
              type="text"
              placeholder="John Doe"
              autoComplete="name"
              register={register}
            />

            <FormField
              label="Email address"
              icon={Mail}
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              register={register}
            />

            <FormField
              label="Password"
              icon={LockKeyhole}
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              autoComplete="new-password"
              register={register}
            />

            <label className="flex items-start gap-3 text-sm leading-5 text-slate-400">
              <input
                type="checkbox"
                required
                className="mt-1 accent-blue-500 h-4 w-4"
              />
              <span>
                I agree to the{" "}
                <Link to="/terms" className="text-blue-400 hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-blue-400 hover:underline">
                  Privacy Policy
                </Link>
                .
              </span>
            </label>

            <Button text="Create account" type="submit" icon={ArrowRight} />
          </form>

          <p className="mt-7 border-t border-white/10 pt-6 text-center text-sm text-slate-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-blue-400 hover:text-cyan-300"
            >
              Sign in
            </Link>
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-slate-600">
          © {new Date().getFullYear()} NovaFlow. All rights reserved.
        </p>
      </div>
    </main>
  );
}
