import { SectionHeading } from "@/components/section-heading"
import { FadeIn } from "@/components/motion-wrapper"
import { about, profile } from "@/lib/portfolio-data"

export function AboutSection() {
  const statusLabel = profile.openToWork
    ? profile.availability || "Open to opportunities"
    : "Not currently available"

  return (
    <section id="about" className="scroll-mt-16 border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <FadeIn>
          <div className="grid gap-6 md:grid-cols-3 md:items-start">
            <div className="md:col-span-2 space-y-4">
              <SectionHeading title="About Me" />
              <p className="text-pretty leading-relaxed text-muted-foreground">
                {about.bio}
              </p>
            </div>
            <aside className="rounded-xl border border-border bg-card p-6">
              <dl className="space-y-4 text-sm">
                {about.focus && (
                  <div>
                    <dt className="text-muted-foreground">Focus</dt>
                    <dd className="text-foreground">{about.focus}</dd>
                  </div>
                )}
                {about.coreStack && (
                  <div>
                    <dt className="text-muted-foreground">Core stack</dt>
                    <dd className="text-foreground">{about.coreStack}</dd>
                  </div>
                )}
                <div>
                  <dt className="text-muted-foreground">Status</dt>
                  <dd className={profile.openToWork ? "text-white" : "text-muted-foreground"}>
                    {statusLabel}
                  </dd>
                </div>
              </dl>
            </aside>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
