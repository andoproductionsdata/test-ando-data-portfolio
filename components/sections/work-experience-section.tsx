import { MapPin, Calendar } from "lucide-react"
import { SectionHeading } from "@/components/section-heading"
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/motion-wrapper"
import { workExperience } from "@/lib/portfolio-data"

export function WorkExperienceSection() {
  return (
    <section
      id="experience"
      className="scroll-mt-16 border-b border-border bg-card/40"
    >
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <FadeIn>
          <SectionHeading
            title="Work Experience"
          />
        </FadeIn>

        <FadeInStagger className="mt-8 flex flex-col gap-4">
          {workExperience.map((job, i) => (
            <FadeInItem key={i}>
              <div className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/50">
                <div className="flex items-start">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                      <h3 className="font-semibold text-foreground">{job.title}</h3>
                      <span className="text-muted-foreground/50">·</span>
                      <p className="text-sm font-medium text-primary">{job.company}</p>
                    </div>
                    <div className="mt-1 flex flex-wrap gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="size-3" aria-hidden="true" />
                        {job.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="size-3" aria-hidden="true" />
                        {job.location}
                      </span>
                    </div>

                    <ul className="mt-3 space-y-1.5 border-t border-border pt-3">
                      {job.responsibilities.map((item, j) => (
                        <li key={j} className="flex gap-2 text-sm text-muted-foreground">
                          <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary/60" aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </FadeInItem>
          ))}
        </FadeInStagger>
      </div>
    </section>
  )
}
