// Referência de página ao estilo "fls." de um processo — vocabulário real do
// autos jurídico brasileiro, não um marcador numérico decorativo.
export default function Folio({ n, label }: { n: string; label: string }) {
  return (
    <p className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-td-gold">
      <span className="font-mono text-[11px] font-normal normal-case tracking-normal text-td-muted">
        fls. {n}
      </span>
      {label}
    </p>
  );
}
