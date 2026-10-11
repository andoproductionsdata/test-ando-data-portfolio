import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { ArrowLeft, Download, ExternalLink, Building2, Briefcase, Clock, BarChart3 } from "lucide-react"
import { GitHubIcon } from "@/components/brand-icons"
import { Button } from "@/components/ui/button"
import { FadeIn } from "@/components/motion-wrapper"
import { SqlCodeBlock } from "@/components/sql-code-block"
import { DashboardCarousel } from "@/components/dashboard-carousel"
import { projects, profile, type CodeSection, type Dashboard, type CustomContentItem } from "@/lib/portfolio-data"
import { RichText } from "@/components/rich-text"

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) return { title: "Project not found" }
  return {
    title: `${project.title} — ${profile.name}`,
    description: project.summary,
  }
}

function NarrativeSection({
  number,
  title,
  paragraphs,
  bullets,
  accentBullets,
  accentBulletsLabel,
  delay = 0,
}: {
  number: string
  title: string
  paragraphs: string[]
  bullets?: string[]
  accentBullets?: string[]
  accentBulletsLabel?: string
  delay?: number
}) {
  return (
    <FadeIn delay={delay}>
      <section className="relative pl-5 border-l-2 border-primary/30">
        {number && (
          <p className="font-mono text-xs text-primary mb-1 tracking-widest uppercase">
            {number}
          </p>
        )}
        <h2 className="text-2xl font-bold text-foreground mb-5">{title}</h2>
        <div className="space-y-4 text-pretty leading-relaxed text-muted-foreground">
          {paragraphs.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
        {bullets && bullets.length > 0 && (
          <ul className="mt-5 space-y-2">
            {bullets.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-muted-foreground">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary/60" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        )}
        {accentBullets && accentBullets.length > 0 && (
          <>
            {accentBulletsLabel && (
              <p className="mt-6 mb-3 text-2xl font-bold text-foreground">{accentBulletsLabel}</p>
            )}
          <ul className="mt-2 space-y-2">
            {accentBullets.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-3 rounded-lg border border-primary/20 bg-primary/5 px-4 py-2.5 text-foreground"
              >
                <BarChart3 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
          </>
        )}
      </section>
    </FadeIn>
  )
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) notFound()

  const isCustomMode = project.projectMode === "custom"

  const metaItems = [
    project.company && { icon: Building2, label: project.company },
    project.industry && { icon: Briefcase, label: project.industry },
  ].filter(Boolean) as { icon: typeof Building2; label: string }[]

  const [firstImage, ...remainingImages] = project.gallery

  return (
    <main className="pt-16">
      <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">

        {/* Back link */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to portfolio
        </Link>


        {/* Cover image */}
        {project.preview && project.preview !== "/placeholder.svg" && (
          <FadeIn delay={0.1}>
            <div className="mt-8 overflow-hidden rounded-2xl border border-border">
              <Image
                src={project.preview}
                alt={`${project.title} cover`}
                width={1730}
                height={909}
                className="w-full object-cover"
                priority
              />
            </div>
          </FadeIn>
        )}

        {/* Narrative sections */}
        <div className="mt-14 space-y-14">

          {/* Summary — always shown */}
          <NarrativeSection
            number=""
            title="Project Summary"
            paragraphs={project.challenge}
            delay={0.1}
          />

          {/* ── TEMPLATE MODE ─────────────────────────────────────────── */}
          {!isCustomMode && (
            <>
              <FadeIn delay={0.2}>
                <section className="relative pl-5 border-l-2 border-primary/30">
                  <h2 className="text-2xl font-bold text-foreground mb-5">Build</h2>
                  <div className="mb-6 flex items-start gap-4 rounded-xl border border-border bg-card px-5 py-4">
                    <GitHubIcon className="mt-0.5 size-5 shrink-0 text-foreground" aria-hidden="true" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-muted-foreground">
                        All project files, including scripts, data sources, and reports, are available in the GitHub repository.
                      </p>
                    </div>
                    <a
                      href={project.githubUrl ?? "#"}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex shrink-0 items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90"
                    >
                      <GitHubIcon className="size-3.5" aria-hidden="true" />
                      View Repository
                    </a>
                  </div>

                  {project.whatIBuilt.length > 0 && (
                    <div className="space-y-4 text-pretty leading-relaxed text-muted-foreground">
                      {project.whatIBuilt.map((para, i) => <p key={i}>{para}</p>)}
                    </div>
                  )}
                  {project.whatIBuiltBullets && project.whatIBuiltBullets.length > 0 && (
                    <ul className="mt-3 space-y-2">
                      {project.whatIBuiltBullets.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-muted-foreground">
                          <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary/60" aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                  {project.buildImage && (
                    <div className="mt-6 overflow-hidden rounded-xl border border-border">
                      <Image
                        src={project.buildImage}
                        alt="Build diagram"
                        width={1200}
                        height={675}
                        className="w-full object-cover"
                      />
                    </div>
                  )}

                  {/* Code sections */}
                  {(project.codeSections ?? []).map((section: CodeSection, i: number) => (
                    <div key={i} className="mt-8">
                      {section.title && (
                        <h3 className="text-lg font-semibold text-foreground mb-3">{section.title}</h3>
                      )}
                      {section.description && (
                        <RichText text={section.description} className="mb-4" />
                      )}
                      {section.snippet && <SqlCodeBlock code={section.snippet} />}
                      {section.image && (
                        <div className="mt-4 overflow-hidden rounded-xl border border-border">
                          <Image
                            src={section.image}
                            alt={section.title || "Code section image"}
                            width={1200}
                            height={675}
                            className="w-full h-auto object-contain"
                          />
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Backwards compat: old single sqlSnippet field */}
                  {!project.codeSections?.length && project.sqlSnippet !== undefined && (
                    <div className="mt-8">
                      <h3 className="text-lg font-semibold text-foreground mb-3">SQL Script</h3>
                      {project.sqlDescription && (
                        <p className="mb-4 text-pretty leading-relaxed text-muted-foreground">{project.sqlDescription}</p>
                      )}
                      {project.sqlSnippet && <SqlCodeBlock code={project.sqlSnippet} />}
                    </div>
                  )}

                  {/* Custom sections (template mode) */}
                  {(project.customSections ?? []).map((section, i: number) => (
                    <div key={i} className="mt-8">
                      {section.title && (
                        <h3 className="text-lg font-semibold text-foreground mb-3">{section.title}</h3>
                      )}
                      {section.content && (
                        <RichText text={section.content} />
                      )}
                      {section.image && (
                        <div className="mt-4 overflow-hidden rounded-xl border border-border">
                          <Image
                            src={section.image}
                            alt={section.title || "Section image"}
                            width={1200}
                            height={675}
                            className="w-full h-auto object-contain"
                          />
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Dashboard sections */}
                  {(project.dashboards ?? []).filter((d: Dashboard) => d.slides?.length > 0).map((dashboard: Dashboard, i: number) => (
                    <DashboardCarousel
                      key={i}
                      title={dashboard.title}
                      description={dashboard.description}
                      slides={dashboard.slides}
                    />
                  ))}

                  {/* Backwards compat: old single dashboardTitle/dashboardSlides fields */}
                  {!project.dashboards?.length && project.dashboardSlides && project.dashboardSlides.length > 0 && (
                    <DashboardCarousel
                      title={project.dashboardTitle}
                      description={project.dashboardDescription}
                      slides={project.dashboardSlides}
                    />
                  )}
                </section>
              </FadeIn>

              <FadeIn delay={0.25}>
                <section className="relative pl-5 border-l-2 border-primary/30">
                  <h2 className="text-2xl font-bold text-foreground mb-5">Project Outcome</h2>
                  {project.outcome.length > 0 && (
                    <div className="space-y-4 text-pretty leading-relaxed text-muted-foreground">
                      {project.outcome.map((para, i) => <p key={i}>{para}</p>)}
                    </div>
                  )}
                  {project.impact && project.impact.length > 0 && (
                    <ul className="mt-5 space-y-2">
                      {project.impact.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 rounded-lg border border-primary/20 bg-primary/5 px-4 py-2.5 text-sm text-foreground">
                          <BarChart3 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                  {project.outcomeImage && (
                    <div className="mt-6 overflow-hidden rounded-xl border border-border">
                      <Image
                        src={project.outcomeImage}
                        alt="Project outcome"
                        width={1200}
                        height={675}
                        className="w-full h-auto object-contain"
                      />
                    </div>
                  )}
                </section>
              </FadeIn>
            </>
          )}

          {/* ── CUSTOM MODE ───────────────────────────────────────────── */}
          {isCustomMode && (project.customContent ?? []).map((item: CustomContentItem, i: number) => {
            const delay = 0.15 + i * 0.05

            if (item.type === "text") {
              return (
                <FadeIn key={i} delay={delay}>
                  <section className="relative pl-5 border-l-2 border-primary/30">
                    {item.title && (
                      <h2 className="text-2xl font-bold text-foreground mb-5">{item.title}</h2>
                    )}
                    {item.content && (
                      <RichText text={item.content} />
                    )}
                    {item.image && (
                      <div className="mt-6 overflow-hidden rounded-xl border border-border">
                        <Image
                          src={item.image}
                          alt={item.title || "Section image"}
                          width={1200}
                          height={675}
                          className="w-full h-auto object-contain"
                        />
                      </div>
                    )}
                  </section>
                </FadeIn>
              )
            }

            if (item.type === "code") {
              return (
                <FadeIn key={i} delay={delay}>
                  <section className="relative pl-5 border-l-2 border-primary/30">
                    {item.title && (
                      <h2 className="text-2xl font-bold text-foreground mb-5">{item.title}</h2>
                    )}
                    {item.description && (
                      <RichText text={item.description} className="mb-4" />
                    )}
                    {item.snippet && <SqlCodeBlock code={item.snippet} />}
                    {item.image && (
                      <div className="mt-6 overflow-hidden rounded-xl border border-border">
                        <Image
                          src={item.image}
                          alt={item.title || "Code section image"}
                          width={1200}
                          height={675}
                          className="w-full h-auto object-contain"
                        />
                      </div>
                    )}
                  </section>
                </FadeIn>
              )
            }

            if (item.type === "dashboard") {
              return (
                <FadeIn key={i} delay={delay}>
                  <section className="relative pl-5 border-l-2 border-primary/30">
                    <DashboardCarousel
                      title={item.title}
                      description={item.description}
                      slides={item.slides ?? []}
                    />
                  </section>
                </FadeIn>
              )
            }

            return null
          })}

        </div>

        {/* Gallery */}
        {project.gallery.length > 0 && (
          <FadeIn delay={0.1} className="mt-14">
            <section>
              <p className="font-mono text-xs text-primary mb-1 tracking-widest uppercase pl-5 border-l-2 border-primary/30">
                04 — Visuals
              </p>
              <h2 className="text-2xl font-bold text-foreground mb-6 pl-5">
                Dashboard Gallery
              </h2>

              {/* First image — full width */}
              {firstImage && (
                <figure className="overflow-hidden rounded-xl border border-border bg-card">
                  <div className="relative aspect-[16/9] w-full">
                    <Image
                      src={firstImage.src}
                      alt={firstImage.caption || `${project.title} dashboard`}
                      fill
                      sizes="(max-width: 896px) 100vw, 896px"
                      className="object-cover"
                      priority
                    />
                  </div>
                  {firstImage.caption && (
                    <figcaption className="border-t border-border px-4 py-3 text-sm text-muted-foreground">
                      {firstImage.caption}
                    </figcaption>
                  )}
                </figure>
              )}

              {/* Remaining images — 2-col grid */}
              {remainingImages.length > 0 && (
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {remainingImages.map((img) => (
                    <figure key={img.src} className="overflow-hidden rounded-xl border border-border bg-card">
                      <div className="relative aspect-[4/3] w-full">
                        <Image
                          src={img.src}
                          alt={img.caption || `${project.title} screenshot`}
                          fill
                          sizes="(max-width: 896px) 100vw, 448px"
                          className="object-cover"
                        />
                      </div>
                      {img.caption && (
                        <figcaption className="border-t border-border px-4 py-3 text-sm text-muted-foreground">
                          {img.caption}
                        </figcaption>
                      )}
                    </figure>
                  ))}
                </div>
              )}

              {/* Empty slot placeholder if no additional images */}
              {remainingImages.length === 0 && (
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {[1, 2].map((i) => (
                    <div
                      key={i}
                      className="flex aspect-[4/3] items-center justify-center rounded-xl border border-dashed border-border bg-card/50 text-center text-sm text-muted-foreground/60 p-4"
                    >
                      Add a supporting screenshot to <br />
                      <code className="mt-1 font-mono text-xs">project.gallery</code>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </FadeIn>
        )}

        {/* Footer actions */}
        <FadeIn delay={0.1}>
          {project.githubUrl && (
            <div className="mt-14 flex items-start gap-4 rounded-xl border border-border bg-card px-5 py-4">
              <GitHubIcon className="mt-0.5 size-5 shrink-0 text-foreground" aria-hidden="true" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-muted-foreground">
                  All project files, including scripts, data sources, dashboards, analysis files, and supporting documentation, are available in the GitHub repository.
                </p>
              </div>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex shrink-0 items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                <GitHubIcon className="size-3.5" aria-hidden="true" />
                View Repository
              </a>
            </div>
          )}
          <div className={`${project.githubUrl ? "mt-4" : "mt-14"} flex flex-wrap items-center gap-3 border-t border-border pt-8`}>
            <Button
              nativeButton={false}
              render={
                <Link href="/#projects">
                  <ArrowLeft className="size-4" aria-hidden="true" />
                  Back to portfolio
                </Link>
              }
            />
            {project.liveUrl && (
              <Button
                variant="outline"
                nativeButton={false}
                render={
                  <a href={project.liveUrl} target="_blank" rel="noreferrer">
                    <ExternalLink className="size-4" aria-hidden="true" />
                    Live Demo
                  </a>
                }
              />
            )}
            <Button
              variant="outline"
              nativeButton={false}
              render={
                <a href={profile.resumeUrl} download>
                  <Download className="size-4" aria-hidden="true" />
                  Download Resume
                </a>
              }
            />
          </div>
        </FadeIn>

      </article>
    </main>
  )
}
