"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Eye,
  EyeOff,
  KeyRound,
  Languages,
  LockKeyhole,
  Mail,
  Rocket,
  ShieldCheck,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  authenticate,
  createSession,
  demoCredentials,
  readSession,
  saveSession
} from "@/lib/auth";
import { dictionaries, localeLabels, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const loginCopy = {
  pt: {
    eyebrow: "Acesso Hyper Galaxy OS",
    title: "Entre no centro de comando da sua operação de IA.",
    subtitle:
      "Gerencie agentes inteligentes, tickets, automações, billing e analytics em uma interface SaaS premium.",
    email: "Email corporativo",
    password: "Senha",
    remember: "Manter conectado",
    forgot: "Recuperar acesso",
    submit: "Entrar no Dashboard",
    demo: "Usar credenciais demo",
    invalid: "Credenciais inválidas. Use o acesso demo para entrar agora.",
    security: "Sessão protegida por armazenamento local demo",
    sso: "Entrar com SSO Enterprise",
    hint: "Demo",
    features: [
      "Autenticação preparada para Auth.js, Supabase ou OAuth",
      "Sessão persistente com expiração",
      "Redirecionamento para dashboard protegido"
    ]
  },
  en: {
    eyebrow: "Hyper Galaxy OS Access",
    title: "Enter the command center for your AI operation.",
    subtitle:
      "Manage intelligent agents, tickets, automations, billing and analytics in a premium SaaS interface.",
    email: "Work email",
    password: "Password",
    remember: "Keep me signed in",
    forgot: "Recover access",
    submit: "Enter Dashboard",
    demo: "Use demo credentials",
    invalid: "Invalid credentials. Use the demo access to sign in now.",
    security: "Session protected by demo local storage",
    sso: "Continue with Enterprise SSO",
    hint: "Demo",
    features: [
      "Authentication-ready for Auth.js, Supabase or OAuth",
      "Persistent session with expiration",
      "Redirects to a protected dashboard"
    ]
  }
} as const;

export function LoginScreen() {
  const router = useRouter();
  const [locale, setLocale] = useState<Locale>("pt");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dictionary = useMemo(() => dictionaries[locale], [locale]);
  const copy = loginCopy[locale];

  useEffect(() => {
    document.documentElement.lang = locale === "pt" ? "pt-BR" : "en-US";
  }, [locale]);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const storedLocale = window.localStorage.getItem("hyper-galaxy-locale");
      if (storedLocale === "pt" || storedLocale === "en") {
        setLocale(storedLocale);
      }

      const activeSession = readSession();
      if (activeSession) {
        router.replace("/dashboard");
      }
    }, 0);

    return () => window.clearTimeout(timeout);
  }, [router]);

  function updateLocale(nextLocale: Locale) {
    setLocale(nextLocale);
    window.localStorage.setItem("hyper-galaxy-locale", nextLocale);
  }

  function fillDemoCredentials() {
    setEmail(demoCredentials.email);
    setPassword(demoCredentials.password);
    setError("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const user = authenticate(email, password);

    window.setTimeout(() => {
      if (!user) {
        setLoading(false);
        setError(copy.invalid);
        return;
      }

      saveSession(createSession(user, remember));
      router.push("/dashboard");
    }, 360);
  }

  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-6 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-galaxy-radial opacity-80" />
      <div className="absolute inset-0 bg-holo-grid bg-[size:76px_76px] opacity-[0.08]" />
      <div className="absolute left-[8%] top-20 h-80 w-80 rounded-full bg-cyan-300/10 blur-3xl" />
      <div className="absolute bottom-0 right-[10%] h-96 w-96 rounded-full bg-violet-500/12 blur-3xl" />

      <header className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
          aria-label="Hyper Galaxy"
        >
          <span className="grid h-11 w-11 place-items-center rounded-full border border-cyan-200/20 bg-cyan-300/10 shadow-cyan-glow">
            <Rocket className="h-5 w-5 text-cyan-100" />
          </span>
          <span className="hidden text-sm font-bold text-white sm:block">
            Hyper Galaxy
          </span>
        </Link>

        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] p-1 backdrop-blur-xl">
          <Languages className="ml-2 hidden h-3.5 w-3.5 text-cyan-200 sm:block" />
          {(["pt", "en"] as Locale[]).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => updateLocale(item)}
              className={cn(
                "rounded-full px-3 py-1.5 text-[0.68rem] font-bold text-slate-400 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300",
                locale === item &&
                  "bg-white text-slate-950 shadow-[0_0_22px_rgba(34,211,238,0.24)]"
              )}
              aria-pressed={locale === item}
            >
              <span className="hidden sm:inline">{localeLabels[item]}</span>
              <span className="sm:hidden">{item.toUpperCase()}</span>
            </button>
          ))}
        </div>
      </header>

      <section className="relative z-10 mx-auto grid min-h-[calc(100vh-6rem)] w-full max-w-7xl items-center gap-10 py-12 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="max-w-2xl">
          <Badge className="gap-2">
            <Sparkles className="h-3.5 w-3.5" />
            {copy.eyebrow}
          </Badge>
          <h1 className="mt-6 text-balance text-4xl font-semibold leading-tight text-white sm:text-6xl">
            {copy.title}
          </h1>
          <p className="mt-5 text-base leading-8 text-slate-300 sm:text-lg">
            {copy.subtitle}
          </p>

          <div className="mt-8 grid gap-3">
            {copy.features.map((feature) => (
              <div
                key={feature}
                className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 backdrop-blur-xl"
              >
                <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-200" />
                <span className="text-sm font-medium text-slate-300">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="holo-border rounded-lg">
          <div className="glass-panel relative overflow-hidden rounded-lg p-5 sm:p-7">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/70 to-transparent" />
            <div className="absolute -right-24 -top-24 h-56 w-56 rounded-full bg-cyan-300/10 blur-3xl" />

            <div className="relative flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-100">
                  {dictionary.nav.login}
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-white">
                  Hyper Galaxy OS
                </h2>
              </div>
              <Badge variant="success" className="gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                Secure
              </Badge>
            </div>

            <button
              type="button"
              onClick={fillDemoCredentials}
              className="relative mt-6 flex w-full items-center justify-between rounded-lg border border-cyan-200/20 bg-cyan-300/10 px-4 py-3 text-left transition-colors hover:border-cyan-200/40"
            >
              <span>
                <span className="block text-xs font-bold uppercase tracking-[0.16em] text-cyan-100">
                  {copy.hint}
                </span>
                <span className="mt-1 block text-sm text-slate-300">
                  {demoCredentials.email} / {demoCredentials.password}
                </span>
              </span>
              <KeyRound className="h-4 w-4 text-cyan-100" />
            </button>

            <form className="relative mt-6 space-y-4" onSubmit={handleSubmit}>
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-300">
                  {copy.email}
                </span>
                <span className="relative block">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                    autoComplete="email"
                    className="h-12 w-full rounded-lg border border-white/10 bg-slate-950/70 pl-10 pr-4 text-sm text-white outline-none transition-colors placeholder:text-slate-600 focus:border-cyan-200/50 focus:ring-2 focus:ring-cyan-300/20"
                    placeholder="demo@hypergalaxy.ai"
                  />
                </span>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-300">
                  {copy.password}
                </span>
                <span className="relative block">
                  <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                    autoComplete="current-password"
                    className="h-12 w-full rounded-lg border border-white/10 bg-slate-950/70 pl-10 pr-12 text-sm text-white outline-none transition-colors placeholder:text-slate-600 focus:border-cyan-200/50 focus:ring-2 focus:ring-cyan-300/20"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    className="absolute right-3 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full text-slate-400 transition-colors hover:bg-white/8 hover:text-white"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </span>
              </label>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <label className="flex items-center gap-2 text-sm text-slate-300">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(event) => setRemember(event.target.checked)}
                    className="h-4 w-4 rounded border-white/20 bg-slate-950 accent-cyan-300"
                  />
                  {copy.remember}
                </label>
                <button
                  type="button"
                  className="text-sm font-semibold text-cyan-100 hover:text-white"
                >
                  {copy.forgot}
                </button>
              </div>

              {error ? (
                <p
                  className="rounded-lg border border-red-300/20 bg-red-400/10 px-4 py-3 text-sm text-red-100"
                  role="alert"
                  aria-live="polite"
                >
                  {error}
                </p>
              ) : null}

              <Button type="submit" size="lg" className="w-full" disabled={loading}>
                {loading ? "..." : copy.submit}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <Button
                type="button"
                variant="outline"
                size="lg"
                className="w-full"
                onClick={fillDemoCredentials}
              >
                {copy.demo}
              </Button>
            </form>

            <div className="relative mt-5 rounded-lg border border-white/10 bg-white/[0.035] px-4 py-3 text-sm text-slate-400">
              <ShieldCheck className="mr-2 inline h-4 w-4 text-cyan-100" />
              {copy.security}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
