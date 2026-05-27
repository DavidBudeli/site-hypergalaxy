export const workspaceUsers = [
  {
    name: "Marina Costa",
    initials: "MC",
    role: "Operations Lead",
    status: "Approving workflow"
  },
  {
    name: "Ethan Brooks",
    initials: "EB",
    role: "AI Engineer",
    status: "Tuning support agent"
  },
  {
    name: "Priya Shah",
    initials: "PS",
    role: "Finance Ops",
    status: "Reviewing invoice"
  },
  {
    name: "Lucas Martins",
    initials: "LM",
    role: "Customer Success",
    status: "Escalating ticket"
  }
];

export const operationalMetrics = [
  { label: "ARR managed", value: "$14.8M", trend: "+12.4%" },
  { label: "AI spend", value: "$8,421", trend: "-6.2%" },
  { label: "Tickets SLA", value: "97.3%", trend: "+4.8%" },
  { label: "Workflow runs", value: "284k", trend: "+31%" }
];

export const activeProjects = [
  {
    name: "Nebula CRM",
    owner: "Marina Costa",
    status: "Deploying",
    progress: 82,
    budget: "$42.8k",
    agents: 9
  },
  {
    name: "Orion Support Hub",
    owner: "Lucas Martins",
    status: "QA review",
    progress: 64,
    budget: "$18.2k",
    agents: 6
  },
  {
    name: "Atlas Billing Core",
    owner: "Priya Shah",
    status: "In production",
    progress: 96,
    budget: "$73.4k",
    agents: 4
  }
];

export const ticketQueue = [
  {
    id: "HG-2189",
    title: "WhatsApp agent failing payment handoff",
    customer: "VectorPay",
    priority: "P1",
    sla: "14m",
    assignee: "Lucas"
  },
  {
    id: "HG-2188",
    title: "Billing forecast webhook mismatch",
    customer: "Northstar Labs",
    priority: "P2",
    sla: "46m",
    assignee: "Priya"
  },
  {
    id: "HG-2187",
    title: "Support agent needs new escalation policy",
    customer: "Nova Retail",
    priority: "P2",
    sla: "1h 22m",
    assignee: "Marina"
  }
];

export const aiAgents = [
  {
    name: "Support Resolution Agent",
    model: "GPT-4.1 routing",
    channel: "Zendesk + Email",
    tokens: "2.84M",
    cost: "$1,284",
    accuracy: 97,
    status: "Online"
  },
  {
    name: "Revenue SDR Agent",
    model: "Lead scoring",
    channel: "HubSpot",
    tokens: "918k",
    cost: "$418",
    accuracy: 91,
    status: "Online"
  },
  {
    name: "Finance Reconcile Agent",
    model: "Invoice audit",
    channel: "Stripe + ERP",
    tokens: "642k",
    cost: "$286",
    accuracy: 96,
    status: "Online"
  },
  {
    name: "Dev Delivery Agent",
    model: "PR analysis",
    channel: "GitHub + Linear",
    tokens: "1.12M",
    cost: "$574",
    accuracy: 94,
    status: "Standby"
  }
];

export const workflowRuns = [
  { name: "Classify support inbox", runs: "18,420", success: 99.1 },
  { name: "Sync billing events", runs: "12,804", success: 98.4 },
  { name: "Generate executive brief", runs: "7,218", success: 96.8 },
  { name: "Score inbound leads", runs: "21,903", success: 94.6 }
];

export const aiUsageByDay = [48, 64, 58, 79, 71, 88, 83, 96, 74, 89, 92, 81];

export const activityFeed = [
  "Support Resolution Agent closed ticket HG-2182",
  "Nebula CRM deploy promoted to staging",
  "Finance Reconcile Agent flagged invoice drift",
  "Workflow router reduced AI spend by 6.2%",
  "Priya Shah approved Atlas Billing Core rollout"
];
