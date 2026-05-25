import type { Metadata } from "next";
import { DashboardApp } from "@/components/dashboard/dashboard-app";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Painel SaaS da Hyper Galaxy para agentes de IA, automacoes, tickets, analytics e billing."
};

export default function DashboardPage() {
  return <DashboardApp />;
}
