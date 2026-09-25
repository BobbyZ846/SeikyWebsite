import { Container } from "@/components/ui/Container";
import { FileText } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";

export function LegalPage({
  title,
  updated,
  sections,
}: {
  title: string;
  updated: string;
  sections: { heading: string; body: string[] }[];
}) {
  return (
    <>
      <PageHero icon={FileText} title={title} description={`Last updated: ${updated}`} />
      <section className="py-10">
        <Container className="max-w-3xl">
          <div className="flex flex-col gap-8">
            {sections.map((section) => (
              <div key={section.heading}>
                <h2 className="font-display text-lg font-bold">{section.heading}</h2>
                <div className="mt-2.5 flex flex-col gap-2.5">
                  {section.body.map((p, i) => (
                    <p key={i} className="text-sm leading-relaxed text-muted">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
