export function SecurityVisual() {
  const nodes = [
    ["Application", "Validated"],
    ["API", "Testing"],
    ["Cloud", "Exposure"],
    ["Endpoint", "Signal"],
    ["Identity", "Review"],
    ["Network", "Telemetry"],
  ];

  return (
    <div className="security-visual" aria-label="Security operations visual">
      <div className="visual-core">
        <span>Risk</span>
        <strong>Analysis</strong>
      </div>
      {nodes.map(([label, detail], index) => (
        <div className={`visual-node visual-node-${index + 1}`} key={label}>
          <span>{label}</span>
          <small>{detail}</small>
        </div>
      ))}
      <div className="visual-line visual-line-a" />
      <div className="visual-line visual-line-b" />
      <div className="visual-line visual-line-c" />
    </div>
  );
}
