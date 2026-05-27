function StaticGalaxyBackdrop() {
  return (
    <div className="absolute inset-0 bg-galaxy-radial opacity-70">
      <div className="absolute inset-0 bg-holo-grid bg-[size:64px_64px] opacity-20" />
    </div>
  );
}

export function GalaxyScene() {
  return <StaticGalaxyBackdrop />;
}
