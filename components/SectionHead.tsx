export function SectionHead({ title, description }: { title: string; description: string }) {
  return (
    <div className="mb-8 max-w-3xl">
      <p className="text-sm uppercase tracking-[0.24em] text-sky-300/80">Stellar Invoice Protocol</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-100 sm:text-4xl">{title}</h2>
      <p className="mt-4 text-base leading-8 text-slate-300">{description}</p>
    </div>
  );
}
