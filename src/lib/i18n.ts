import {
  Bot,
  Boxes,
  BrainCircuit,
  ChartNoAxesCombined,
  CircleDollarSign,
  Code2,
  Cpu,
  Headphones,
  MessageCircle,
  Rocket,
  ServerCog,
  ShieldCheck,
  Sparkles,
  TicketCheck,
  Workflow,
  Zap
} from "lucide-react";

export type Locale = "pt" | "en";

export const localeLabels: Record<Locale, string> = {
  pt: "PT-BR",
  en: "EN-US"
};

export const techLogos = [
  "OpenAI",
  "Python",
  "Docker",
  "PostgreSQL",
  "Redis",
  "Kubernetes",
  "Next.js",
  "Linux",
  "FastAPI",
  "LangChain"
];

export const iconMap = {
  brain: BrainCircuit,
  workflow: Workflow,
  server: ServerCog,
  code: Code2,
  bot: Bot,
  support: Headphones,
  rocket: Rocket,
  shield: ShieldCheck,
  ticket: TicketCheck,
  chart: ChartNoAxesCombined,
  boxes: Boxes,
  money: CircleDollarSign,
  message: MessageCircle,
  cpu: Cpu,
  sparkles: Sparkles,
  zap: Zap
};

export const dictionaries = {
  pt: {
    nav: {
      platform: "Nebulosa",
      agents: "Estação Orbital",
      dashboard: "Command Nexus",
      tickets: "Infraestrutura",
      impact: "Hyper Core",
      login: "Entrar",
      start: "Acessar Plataforma"
    },
    hero: {
      eyebrow: "Local 01 · Portal Hyper Galaxy",
      title: "Entre em um universo vivo de inteligência artificial.",
      subtitle:
        "Uma infraestrutura galáctica para descobrir, conectar e operar IA, automações e cloud em escala enterprise.",
      primary: "Acessar Plataforma",
      secondary: "Explorar Ecossistema",
      typingPrefix: "Hyper Galaxy OS",
      typingPhrases: [
        "127 AI agents online",
        "284k workflow runs this month",
        "$8,421 AI spend optimized",
        "97.3% ticket SLA performance"
      ],
      stats: [
        { label: "Clientes em operação", value: "42" },
        { label: "Agentes ativos", value: "127" },
        { label: "Execuções mensais", value: "284k" }
      ],
      orbitLabels: ["Agents", "Billing", "Tickets", "Automations"],
      visual: {
        fabric: "Malha global de IA",
        cloudStatus: "Cloud online",
        coreLabel: "Núcleo de inteligência",
        coreTitle: "Órbita operacional",
        workflows: "Fluxos",
        secureMesh: "Malha segura",
        throughput: "Capacidade IA",
        orchestration: "Orquestração ao vivo",
        workflowTitle: "Workflow autônomo",
        live: "Ao vivo",
        workflowNodes: ["Dados", "IA", "Fluxos", "Ops"],
        agent: "Agente Nova",
        agentStatus: "Online e orquestrando",
        region: "Região enterprise: us-east-1"
      }
    },
    journey: {
      entry: {
        scroll: "Atravessar o portal"
      },
      firstContact: {
        location: "Local 02",
        eyebrow: "Nebulosa da Inteligência",
        title: "A primeira região revela o propósito do ecossistema.",
        subtitle:
          "IA, automação, cloud e dados aparecem como uma malha viva, não como uma lista de recursos. A Hyper Galaxy começa a se revelar como infraestrutura operacional.",
        signals: ["IA aplicada", "Automação operacional", "Cloud infrastructure"]
      },
      marketplace: {
        location: "Local 03",
        eyebrow: "Estação Orbital de Agentes",
        title: "Uma estação surge no caminho, cheia de módulos inteligentes.",
        subtitle:
          "Os agentes aparecem gradualmente, como unidades operacionais descobertas dentro de uma estação espacial de IA.",
        station: "Estação orbital",
        stationTitle: "Módulos inteligentes entram em órbita conforme a exploração avança.",
        stationText:
          "Cada agente conecta canais, dados e decisões. O marketplace deixa de ser vitrine e passa a ser um local dentro do universo Hyper Galaxy."
      },
      command: {
        location: "Local 04",
        eyebrow: "Command Nexus",
        title: "Só aqui a plataforma se revela como centro operacional.",
        subtitle:
          "Depois da descoberta, o dashboard aparece como um núcleo real para equipes, clientes, agentes, tickets, projetos e billing.",
        live: "Operação ao vivo",
        workspace: "Clientes, agentes, custos e entregas sincronizados em tempo real.",
        projectsTitle: "Projetos em execução",
        projectsText: "Workspaces, owners, budgets e deploys conectados à operação.",
        usageTitle: "Consumo de IA",
        ticketTitle: "Tickets em rota"
      },
      infrastructure: {
        location: "Local 05",
        eyebrow: "Infraestrutura Galáctica",
        title: "A região onde tickets, billing, projetos e APIs viram uma malha operacional.",
        subtitle:
          "A infraestrutura não aparece como lista de features. Ela entra como sistemas conectados que sustentam a operação por trás do universo.",
        statusLabel: "Estado",
        systems: [
          {
            title: "Tickets inteligentes",
            description:
              "Solicitações viram contexto operacional, com prioridade, histórico, responsável e notificação automática.",
            status: "Roteando"
          },
          {
            title: "Projetos conectados",
            description:
              "Cada entrega se conecta a agentes, arquivos, clientes, deploys, tarefas e sinais de risco.",
            status: "Sincronizado"
          },
          {
            title: "Billing e consumo",
            description:
              "Custos de IA, invoices, assinaturas e limites de uso ficam visíveis em tempo real.",
            status: "Monitorado"
          },
          {
            title: "Automações vivas",
            description:
              "Workflows atravessam ferramentas, validam dados, disparam ações e reduzem trabalho manual.",
            status: "Executando"
          },
          {
            title: "Analytics operacional",
            description:
              "Sinais de performance, SLA, uso de IA e atividade dos agentes formam uma visão contínua.",
            status: "Analisando"
          }
        ]
      },
      ecosystem: {
        location: "Local 06",
        eyebrow: "Hyper Core",
        title: "Tudo parece separado até o núcleo revelar que tudo está conectado.",
        subtitle:
          "Marketplace, cloud, agentes, automações, APIs, dados e integrações funcionam como um único organismo tecnológico.",
        nodes: ["Marketplace", "Cloud", "Agentes", "APIs", "Dados", "Integrações"]
      },
      invite: {
        location: "Local 07",
        eyebrow: "Portal de Entrada",
        title: "Acesse o universo operacional da Hyper Galaxy.",
        subtitle:
          "A próxima etapa é entrar na plataforma e fazer parte de uma infraestrutura inteligente criada para operar o futuro."
      }
    },
    logos: {
      eyebrow: "Stack operacional",
      title: "Tecnologias que alimentam a infraestrutura Hyper Galaxy.",
      subtitle:
        "Uma malha moderna para IA, automação, dados, microsserviços e produtos SaaS globais."
    },
    about: {
      eyebrow: "Sobre a Hyper Galaxy",
      title: "Não somos uma agência. Somos uma central de tecnologia para empresas que querem operar no futuro.",
      subtitle:
        "A Hyper Galaxy combina engenharia de software, inteligência artificial e infraestrutura escalável para transformar processos complexos em sistemas vivos, mensuráveis e automatizados.",
      cards: [
        {
          icon: "code",
          title: "Engenharia de Software",
          description:
            "Aplicações SaaS, APIs e plataformas sob medida com arquitetura limpa, observabilidade e foco em escala."
        },
        {
          icon: "brain",
          title: "Inteligência Artificial",
          description:
            "Agentes, copilotos, RAG, análise preditiva e modelos conectados aos dados reais da operação."
        },
        {
          icon: "workflow",
          title: "Automação",
          description:
            "Workflows autônomos para vendas, suporte, financeiro, atendimento e backoffice."
        },
        {
          icon: "server",
          title: "Infraestrutura Escalável",
          description:
            "Ambientes cloud, filas, containers, bancos e monitoramento para produtos resilientes."
        }
      ]
    },
    marketplace: {
      eyebrow: "Marketplace de Agentes IA",
      title: "Implante agentes inteligentes como módulos de uma plataforma enterprise.",
      subtitle:
        "Cada agente nasce pronto para integrar canais, consumir dados, executar automações e entregar telemetria operacional em tempo real.",
      filters: ["All Systems", "Revenue", "Support", "Operations"],
      agents: [
        {
          icon: "support",
          name: "AI Support Agent",
          description:
            "Resolve dúvidas, classifica tickets e aciona especialistas quando a conversa pede contexto humano.",
          consumption: "2.4M tokens",
          integrations: ["Zendesk", "Email", "Docs"],
          signal: "97%"
        },
        {
          icon: "rocket",
          name: "AI SDR Agent",
          description:
            "Qualifica leads, personaliza abordagens e sincroniza oportunidades com o CRM.",
          consumption: "18k leads",
          integrations: ["HubSpot", "Apollo", "Slack"],
          signal: "91%"
        },
        {
          icon: "workflow",
          name: "AI Automation Agent",
          description:
            "Orquestra tarefas recorrentes, valida dados e dispara fluxos entre ferramentas críticas.",
          consumption: "43k runs",
          integrations: ["n8n", "Zapier", "APIs"],
          signal: "99%"
        },
        {
          icon: "code",
          name: "AI Dev Assistant",
          description:
            "Apoia squads com specs, análise de PRs, testes, documentação e rotinas de entrega.",
          consumption: "720 PRs",
          integrations: ["GitHub", "Linear", "CI"],
          signal: "94%"
        },
        {
          icon: "money",
          name: "AI Financial Agent",
          description:
            "Monitora cobranças, faturas, inadimplência e relatórios financeiros com alertas precisos.",
          consumption: "R$ 8.7M",
          integrations: ["Stripe", "ERP", "Sheets"],
          signal: "96%"
        },
        {
          icon: "message",
          name: "AI WhatsApp Agent",
          description:
            "Atende, vende e acompanha clientes em fluxos conversacionais conectados ao negócio.",
          consumption: "31k chats",
          integrations: ["WhatsApp", "CRM", "Pix"],
          signal: "93%"
        },
        {
          icon: "bot",
          name: "AI Telegram Agent",
          description:
            "Opera comunidades, suporte técnico, alertas e comandos internos com segurança.",
          consumption: "14k events",
          integrations: ["Telegram", "Webhooks", "DB"],
          signal: "89%"
        }
      ],
      online: "Online",
      consumption: "Consumo",
      integrations: "Integrações",
      accuracy: "Sinal"
    },
    dashboard: {
      eyebrow: "Dashboard Preview",
      title: "Um painel SaaS real para operar clientes, agentes, tickets, projetos e billing.",
      subtitle:
        "Acompanhe usuários, SLAs, custos de IA, workflows, filas de suporte, projetos e eventos de sistema em uma interface de produto enterprise.",
      sidebar: ["Command", "Agents", "Projects", "Billing", "Tickets"],
      cards: [
        { icon: "boxes", label: "Projetos ativos", value: "24", trend: "+18%" },
        { icon: "ticket", label: "Tickets abertos", value: "132", trend: "-12%" },
        { icon: "money", label: "Próxima fatura", value: "R$ 18.420", trend: "Jun 02" },
        { icon: "cpu", label: "Uso de IA", value: "74%", trend: "+9%" }
      ],
      projectTitle: "Project Nebula CRM",
      projectStatus: "Deploy em progresso",
      automations: [
        "Classificação de tickets",
        "Resumo executivo diário",
        "Sincronização de billing",
        "Qualificação de leads"
      ],
      analytics: "Analytics de agentes",
      activeAgents: "Agentes ativos",
      nextInvoice: "Próxima fatura",
      tickets: "Gestão de tickets"
    },
    tickets: {
      eyebrow: "Sistema de Tickets",
      title: "Suporte, projetos e notificações conectados à operação.",
      subtitle:
        "Centralize solicitações, acompanhe SLA, transforme emails em tickets e mantenha clientes atualizados com automações inteligentes.",
      items: [
        {
          icon: "ticket",
          title: "Abertura de tickets",
          description:
            "Solicitações categorizadas por IA com prioridade, projeto, responsável e contexto histórico."
        },
        {
          icon: "message",
          title: "Notificações inteligentes",
          description:
            "Atualizações por email, Slack ou WhatsApp sempre que um status muda ou exige decisão."
        },
        {
          icon: "workflow",
          title: "Gestão de projetos",
          description:
            "Cada ticket se conecta a entregas, automações, arquivos, deploys e indicadores."
        }
      ]
    },
    impact: {
      eyebrow: "Impacto",
      title: "Métricas de uma infraestrutura criada para performance.",
      metrics: [
        { label: "Uptime operacional", value: 99.99, suffix: "%", decimals: 2 },
        { label: "Automações implantadas", value: 420, suffix: "+", decimals: 0 },
        { label: "Execuções mensais", value: 8.7, suffix: "M", decimals: 1 },
        { label: "Ganho médio de performance", value: 63, suffix: "%", decimals: 0 },
        { label: "Clientes e operações atendidas", value: 58, suffix: "+", decimals: 0 }
      ]
    },
    cta: {
      eyebrow: "Próximo salto",
      title: "Construa o futuro com inteligência artificial.",
      subtitle:
        "Transforme processos, dados e canais em uma plataforma inteligente que trabalha com sua equipe.",
      button: "Iniciar Agora"
    },
    footer: {
      description:
        "Hyper Galaxy cria sistemas, agentes e automações para empresas que querem operar com inteligência artificial em escala.",
      quickLinks: "Links rápidos",
      social: "Redes sociais",
      contact: "Contato",
      rights: "Todos os direitos reservados."
    }
  },
  en: {
    nav: {
      platform: "Nebula",
      agents: "Orbital Station",
      dashboard: "Command Nexus",
      tickets: "Infrastructure",
      impact: "Hyper Core",
      login: "Sign in",
      start: "Open Platform"
    },
    hero: {
      eyebrow: "Location 01 · Hyper Galaxy Portal",
      title: "Enter a living universe of artificial intelligence.",
      subtitle:
        "A galactic infrastructure for discovering, connecting and operating AI, automations and cloud at enterprise scale.",
      primary: "Open Platform",
      secondary: "Explore Ecosystem",
      typingPrefix: "Hyper Galaxy OS",
      typingPhrases: [
        "127 AI agents online",
        "284k workflow runs this month",
        "$8,421 AI spend optimized",
        "97.3% ticket SLA performance"
      ],
      stats: [
        { label: "Live customers", value: "42" },
        { label: "Active agents", value: "127" },
        { label: "Monthly executions", value: "284k" }
      ],
      orbitLabels: ["Agents", "Billing", "Tickets", "Automations"],
      visual: {
        fabric: "Global AI fabric",
        cloudStatus: "Cloud online",
        coreLabel: "Intelligence core",
        coreTitle: "Operations orbit",
        workflows: "Workflows",
        secureMesh: "Secure mesh",
        throughput: "AI throughput",
        orchestration: "Live orchestration",
        workflowTitle: "Autonomous workflow",
        live: "Live",
        workflowNodes: ["Data", "AI", "Flows", "Ops"],
        agent: "Nova Agent",
        agentStatus: "Online and orchestrating",
        region: "Enterprise region: us-east-1"
      }
    },
    journey: {
      entry: {
        scroll: "Cross the portal"
      },
      firstContact: {
        location: "Location 02",
        eyebrow: "Intelligence Nebula",
        title: "The first region reveals the purpose of the ecosystem.",
        subtitle:
          "AI, automation, cloud and data appear as a living mesh, not a feature list. Hyper Galaxy starts revealing itself as operational infrastructure.",
        signals: ["Applied AI", "Operational automation", "Cloud infrastructure"]
      },
      marketplace: {
        location: "Location 03",
        eyebrow: "Orbital Agent Station",
        title: "A station appears on the route, filled with intelligent modules.",
        subtitle:
          "Agents appear gradually, as operational units discovered inside an AI space station.",
        station: "Orbital station",
        stationTitle: "Intelligent modules enter orbit as the exploration advances.",
        stationText:
          "Each agent connects channels, data and decisions. The marketplace stops feeling like a showcase and becomes a place inside the Hyper Galaxy universe."
      },
      command: {
        location: "Location 04",
        eyebrow: "Command Nexus",
        title: "Only here does the platform reveal itself as an operational center.",
        subtitle:
          "After discovery, the dashboard appears as a real nucleus for teams, clients, agents, tickets, projects and billing.",
        live: "Live operation",
        workspace: "Customers, agents, costs and delivery synchronized in real time.",
        projectsTitle: "Projects in motion",
        projectsText: "Workspaces, owners, budgets and deploys connected to operations.",
        usageTitle: "AI consumption",
        ticketTitle: "Tickets in route"
      },
      infrastructure: {
        location: "Location 05",
        eyebrow: "Galactic Infrastructure",
        title: "The region where tickets, billing, projects and APIs become an operational mesh.",
        subtitle:
          "Infrastructure does not appear as a list of features. It enters as connected systems sustaining the operation behind the universe.",
        statusLabel: "State",
        systems: [
          {
            title: "Intelligent tickets",
            description:
              "Requests become operational context with priority, history, owner and automatic notification.",
            status: "Routing"
          },
          {
            title: "Connected projects",
            description:
              "Every delivery connects to agents, files, customers, deploys, tasks and risk signals.",
            status: "Synced"
          },
          {
            title: "Billing and usage",
            description:
              "AI costs, invoices, subscriptions and usage limits stay visible in real time.",
            status: "Monitored"
          },
          {
            title: "Living automations",
            description:
              "Workflows move across tools, validate data, trigger actions and reduce manual work.",
            status: "Running"
          },
          {
            title: "Operational analytics",
            description:
              "Performance, SLA, AI usage and agent activity signals become a continuous view.",
            status: "Analyzing"
          }
        ]
      },
      ecosystem: {
        location: "Location 06",
        eyebrow: "Hyper Core",
        title: "Everything seems separate until the core reveals everything is connected.",
        subtitle:
          "Marketplace, cloud, agents, automations, APIs, data and integrations operate as one technological organism.",
        nodes: ["Marketplace", "Cloud", "Agents", "APIs", "Data", "Integrations"]
      },
      invite: {
        location: "Location 07",
        eyebrow: "Entry Portal",
        title: "Access the operational universe of Hyper Galaxy.",
        subtitle:
          "The next step is entering the platform and becoming part of intelligent infrastructure built to operate the future."
      }
    },
    logos: {
      eyebrow: "Operational stack",
      title: "Technologies powering Hyper Galaxy infrastructure.",
      subtitle:
        "A modern mesh for AI, automation, data, microservices and global SaaS products."
    },
    about: {
      eyebrow: "About Hyper Galaxy",
      title: "We are not a typical agency. We are a technology command center for companies operating in the future.",
      subtitle:
        "Hyper Galaxy combines software engineering, artificial intelligence and scalable infrastructure to turn complex processes into living, measurable and automated systems.",
      cards: [
        {
          icon: "code",
          title: "Software Engineering",
          description:
            "SaaS applications, APIs and custom platforms with clean architecture, observability and scale."
        },
        {
          icon: "brain",
          title: "Artificial Intelligence",
          description:
            "Agents, copilots, RAG, predictive analysis and models connected to real operational data."
        },
        {
          icon: "workflow",
          title: "Automation",
          description:
            "Autonomous workflows for sales, support, finance, customer care and back office."
        },
        {
          icon: "server",
          title: "Scalable Infrastructure",
          description:
            "Cloud environments, queues, containers, databases and monitoring for resilient products."
        }
      ]
    },
    marketplace: {
      eyebrow: "AI Agent Marketplace",
      title: "Deploy intelligent agents as modules of an enterprise platform.",
      subtitle:
        "Each agent is ready to integrate channels, consume data, run automations and deliver real-time operational telemetry.",
      filters: ["All Systems", "Revenue", "Support", "Operations"],
      agents: [
        {
          icon: "support",
          name: "AI Support Agent",
          description:
            "Solves questions, classifies tickets and escalates to specialists when a conversation needs human context.",
          consumption: "2.4M tokens",
          integrations: ["Zendesk", "Email", "Docs"],
          signal: "97%"
        },
        {
          icon: "rocket",
          name: "AI SDR Agent",
          description:
            "Qualifies leads, personalizes outreach and syncs opportunities with the CRM.",
          consumption: "18k leads",
          integrations: ["HubSpot", "Apollo", "Slack"],
          signal: "91%"
        },
        {
          icon: "workflow",
          name: "AI Automation Agent",
          description:
            "Orchestrates recurring tasks, validates data and triggers flows across critical tools.",
          consumption: "43k runs",
          integrations: ["n8n", "Zapier", "APIs"],
          signal: "99%"
        },
        {
          icon: "code",
          name: "AI Dev Assistant",
          description:
            "Supports teams with specs, PR analysis, tests, documentation and delivery routines.",
          consumption: "720 PRs",
          integrations: ["GitHub", "Linear", "CI"],
          signal: "94%"
        },
        {
          icon: "money",
          name: "AI Financial Agent",
          description:
            "Monitors charges, invoices, delinquency and financial reports with accurate alerts.",
          consumption: "$1.7M",
          integrations: ["Stripe", "ERP", "Sheets"],
          signal: "96%"
        },
        {
          icon: "message",
          name: "AI WhatsApp Agent",
          description:
            "Serves, sells and follows up with customers in conversational flows connected to the business.",
          consumption: "31k chats",
          integrations: ["WhatsApp", "CRM", "Pay"],
          signal: "93%"
        },
        {
          icon: "bot",
          name: "AI Telegram Agent",
          description:
            "Operates communities, technical support, alerts and internal commands with security.",
          consumption: "14k events",
          integrations: ["Telegram", "Webhooks", "DB"],
          signal: "89%"
        }
      ],
      online: "Online",
      consumption: "Consumption",
      integrations: "Integrations",
      accuracy: "Signal"
    },
    dashboard: {
      eyebrow: "Dashboard Preview",
      title: "A real SaaS dashboard for customers, agents, tickets, projects and billing.",
      subtitle:
        "Track users, SLAs, AI costs, workflows, support queues, projects and system events in an enterprise product interface.",
      sidebar: ["Command", "Agents", "Projects", "Billing", "Tickets"],
      cards: [
        { icon: "boxes", label: "Active projects", value: "24", trend: "+18%" },
        { icon: "ticket", label: "Open tickets", value: "132", trend: "-12%" },
        { icon: "money", label: "Next invoice", value: "$3,680", trend: "Jun 02" },
        { icon: "cpu", label: "AI usage", value: "74%", trend: "+9%" }
      ],
      projectTitle: "Project Nebula CRM",
      projectStatus: "Deployment in progress",
      automations: [
        "Ticket classification",
        "Daily executive summary",
        "Billing synchronization",
        "Lead qualification"
      ],
      analytics: "Agent analytics",
      activeAgents: "Active agents",
      nextInvoice: "Next invoice",
      tickets: "Ticket management"
    },
    tickets: {
      eyebrow: "Ticket System",
      title: "Support, projects and notifications connected to operations.",
      subtitle:
        "Centralize requests, track SLA, turn emails into tickets and keep clients updated with intelligent automations.",
      items: [
        {
          icon: "ticket",
          title: "Ticket intake",
          description:
            "AI-categorized requests with priority, project, owner and historical context."
        },
        {
          icon: "message",
          title: "Smart notifications",
          description:
            "Updates via email, Slack or WhatsApp whenever a status changes or requires a decision."
        },
        {
          icon: "workflow",
          title: "Project management",
          description:
            "Every ticket connects to deliveries, automations, files, deploys and indicators."
        }
      ]
    },
    impact: {
      eyebrow: "Impact",
      title: "Metrics from infrastructure built for performance.",
      metrics: [
        { label: "Operational uptime", value: 99.99, suffix: "%", decimals: 2 },
        { label: "Automations deployed", value: 420, suffix: "+", decimals: 0 },
        { label: "Monthly executions", value: 8.7, suffix: "M", decimals: 1 },
        { label: "Average performance gain", value: 63, suffix: "%", decimals: 0 },
        { label: "Clients and operations served", value: 58, suffix: "+", decimals: 0 }
      ]
    },
    cta: {
      eyebrow: "Next leap",
      title: "Build the future with artificial intelligence.",
      subtitle:
        "Turn processes, data and channels into an intelligent platform that works with your team.",
      button: "Start Now"
    },
    footer: {
      description:
        "Hyper Galaxy creates systems, agents and automations for companies operating with AI at scale.",
      quickLinks: "Quick links",
      social: "Social",
      contact: "Contact",
      rights: "All rights reserved."
    }
  }
} as const;

export type Dictionary = (typeof dictionaries)[Locale];
export type IconKey = keyof typeof iconMap;
