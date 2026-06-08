export const brandAssets = {
  logoMain: "/assets/brand/hyper-galaxy-logo-main-transparent.webp",
  logoCompact: "/assets/brand/hyper-galaxy-logo-compact-transparent.webp",
  appIcon: "/assets/brand/hyper-galaxy-app-icon.webp",
  symbol: "/assets/brand/hyper-galaxy-symbol-square.webp",
  sheet: "/assets/brand/hyper-galaxy-brand-sheet.png",
  nova: {
    mascot: "/assets/brand/nova-mascot-main.webp",
    avatar: "/assets/brand/nova-interface-avatar.webp",
    interfaceCard: "/assets/brand/nova-interface-card.webp",
    iconColor: "/assets/brand/nova-app-icon-color.webp",
    iconPurple: "/assets/brand/nova-app-icon-purple.webp",
    iconLight: "/assets/brand/nova-app-icon-light.webp",
    iconLine: "/assets/brand/nova-app-icon-line.webp",
    loading: "/assets/brand/nova-state-loading.webp",
    thinking: "/assets/brand/nova-state-thinking.webp",
    success: "/assets/brand/nova-state-success.webp",
    wave: "/assets/brand/nova-state-wave.webp"
  }
} as const;

export const agentBrandVisuals = [
  brandAssets.nova.success,
  brandAssets.nova.thinking,
  brandAssets.nova.loading,
  brandAssets.nova.wave,
  brandAssets.nova.iconPurple,
  brandAssets.nova.avatar,
  brandAssets.nova.iconLine
] as const;
