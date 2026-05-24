export type HyperGalaxyUser = {
  email: string;
  name: string;
  role: string;
  company: string;
};

export type HyperGalaxySession = {
  token: string;
  user: HyperGalaxyUser;
  createdAt: string;
  expiresAt: string;
};

export const demoCredentials = {
  email: "demo@hypergalaxy.ai",
  password: "Hyper@2026"
};

export const sessionStorageKey = "hyper-galaxy-session";

export function authenticate(email: string, password: string): HyperGalaxyUser | null {
  const normalizedEmail = email.trim().toLowerCase();

  if (
    normalizedEmail === demoCredentials.email &&
    password === demoCredentials.password
  ) {
    return {
      email: demoCredentials.email,
      name: "David Hyper",
      role: "Workspace Owner",
      company: "Hyper Galaxy"
    };
  }

  return null;
}

export function createSession(user: HyperGalaxyUser, remember: boolean) {
  const now = Date.now();
  const maxAge = remember ? 1000 * 60 * 60 * 24 * 30 : 1000 * 60 * 60 * 8;

  return {
    token: `hg_${crypto.randomUUID()}`,
    user,
    createdAt: new Date(now).toISOString(),
    expiresAt: new Date(now + maxAge).toISOString()
  } satisfies HyperGalaxySession;
}

export function saveSession(session: HyperGalaxySession) {
  window.localStorage.setItem(sessionStorageKey, JSON.stringify(session));
}

export function readSession(): HyperGalaxySession | null {
  const stored = window.localStorage.getItem(sessionStorageKey);
  if (!stored) return null;

  try {
    const session = JSON.parse(stored) as HyperGalaxySession;

    if (!session.expiresAt || new Date(session.expiresAt).getTime() < Date.now()) {
      clearSession();
      return null;
    }

    return session;
  } catch {
    clearSession();
    return null;
  }
}

export function clearSession() {
  window.localStorage.removeItem(sessionStorageKey);
}
