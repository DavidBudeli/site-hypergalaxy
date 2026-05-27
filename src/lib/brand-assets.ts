export const brandAssets = {
  logoMain: "/brand/hyper-galaxy-logo-main-transparent.png",
  logoCompact: "/brand/hyper-galaxy-logo-compact-transparent.png",
  appIcon: "/brand/hyper-galaxy-app-icon.png",
  symbol: "/brand/hyper-galaxy-symbol-square.png",
  sheet: "/brand/hyper-galaxy-brand-sheet.png",
  nova: {
    mascot: "/brand/nova-mascot-main.png",
    avatar: "/brand/nova-interface-avatar.png",
    interfaceCard: "/brand/nova-interface-card.png",
    iconColor: "/brand/nova-app-icon-color.png",
    iconPurple: "/brand/nova-app-icon-purple.png",
    iconLight: "/brand/nova-app-icon-light.png",
    iconLine: "/brand/nova-app-icon-line.png",
    loading: "/brand/nova-state-loading.png",
    thinking: "/brand/nova-state-thinking.png",
    success: "/brand/nova-state-success.png",
    wave: "/brand/nova-state-wave.png"
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
