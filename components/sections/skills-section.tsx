import { SectionHeading } from "@/components/section-heading"
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/motion-wrapper"
import { technicalSkills } from "@/lib/portfolio-data"

export function SkillsSection() {
  return (
    <section id="skills" className="scroll-mt-16 border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <FadeIn>
          <SectionHeading
            title="Current Technologies"
            description="Proficient in a range of modern data technologies that empower me to transform raw data into meaningful insights — from querying and modelling to visualisation and automation. These are my core tools."
          />
        </FadeIn>

        <FadeInStagger className="mt-10 grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {technicalSkills.map((skill) => (
            <FadeInItem key={skill.name}>
              <div className="rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/50 h-full flex flex-col">
                {skill.logo && (
                  <img
                    src={skill.logo}
                    alt={`${skill.name} logo`}
                    className={skill.logoClass ?? "mb-3 h-8 w-8 object-contain"}
                  />
                )}
                <h4 className="text-sm font-semibold text-foreground">{skill.name}</h4>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {skill.description}
                </p>
              </div>
            </FadeInItem>
          ))}
        </FadeInStagger>
      </div>
    </section>
  )
}
