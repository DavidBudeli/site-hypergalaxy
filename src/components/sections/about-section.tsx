import { SectionHeading } from "@/components/site/section-heading";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { iconMap, type Dictionary, type IconKey } from "@/lib/i18n";

type AboutSectionProps = {
  dictionary: Dictionary;
};

export function AboutSection({ dictionary }: AboutSectionProps) {
  return (
    <section className="section-shell">
      <div className="absolute left-0 top-24 h-80 w-80 rounded-full bg-violet-500/10 blur-3xl" />
      <div className="absolute bottom-10 right-0 h-96 w-96 rounded-full bg-cyan-300/8 blur-3xl" />
      <div className="section-inner">
        <SectionHeading
          eyebrow={dictionary.about.eyebrow}
          title={dictionary.about.title}
          subtitle={dictionary.about.subtitle}
        />

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {dictionary.about.cards.map((card) => {
            const Icon = iconMap[card.icon as IconKey];
            return (
              <Card
                key={card.title}
                className="group relative overflow-hidden p-px transition-transform duration-300 hover:-translate-y-1"
                data-reveal
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-300/12 via-transparent to-violet-500/12 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <CardHeader className="relative">
                  <div className="grid h-12 w-12 place-items-center rounded-lg border border-cyan-200/20 bg-cyan-300/10 text-cyan-100 shadow-cyan-glow">
                    <Icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="mt-4">{card.title}</CardTitle>
                </CardHeader>
                <CardContent className="relative">
                  <CardDescription>{card.description}</CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
