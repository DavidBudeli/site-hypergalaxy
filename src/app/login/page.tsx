import type { Metadata } from "next";
import { LoginScreen } from "@/components/auth/login-screen";

export const metadata: Metadata = {
  title: "Login",
  description:
    "Acesse o Hyper Galaxy OS para gerenciar agentes de IA, automacoes, tickets e billing."
};

export default function LoginPage() {
  return <LoginScreen />;
}
