import { Link, Navigate } from "react-router-dom";

import {
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  CloudLightning,
} from "lucide-react";
import Button from "../../../shared/components/Button";
import FormField from "../../../shared/components/FormField";
import CopyRight from "../../../shared/components/CopyRight";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useSelector } from "react-redux";

export default function Login() {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const { handleLogin } = useAuth();
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);
  if (!loading && user) {
    return <Navigate to={"/"} replace />;
  }
  const formSubmitHandler = async (data) => {
    reset();
    const { email, password } = data;

    await handleLogin({ email, password });
    navigate("/");
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
              Welcome back
            </h1>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              Sign in to continue to your workspace.
            </p>
          </div>

          <form
            className="space-y-5"
            onSubmit={handleSubmit(formSubmitHandler)}
          >
            <FormField
              label="Email"
              icon={Mail}
              id="email"
              name="email"
              type="email"
              placeholder="Enter your Email"
              autoComplete="enter your email id"
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

            <label className="flex items-center gap-3 text-sm text-slate-400">
              <input type="checkbox" className="accent-blue-500" />
              Remember me
            </label>

            <Button type="submit" text="Sign-In" icon={ArrowRight} />
          </form>

          <p className="mt-7 border-t border-white/10 pt-6 text-center text-sm text-slate-400">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-blue-400 hover:text-cyan-300"
            >
              Create account
            </Link>
          </p>
        </div>

        <CopyRight />
      </div>
    </main>
  );
}
