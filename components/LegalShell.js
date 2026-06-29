// components/LegalShell.js
export default function LegalShell({ title, children }) {
  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="font-display font-bold text-3xl text-ink mb-10">{title}</h1>
      <div className="prose-legal text-sm text-ink/80 leading-relaxed [&>h2]:font-display [&>h2]:font-semibold [&>h2]:text-lg [&>h2]:text-ink [&>h2]:mt-8 [&>h2]:mb-3 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-1 [&>p]:mb-3">
        {children}
      </div>
    </section>
  );
}
