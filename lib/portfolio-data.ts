import config from "./portfolio-config.json"

export const profile = config.profile
export const about = (config as any).about ?? { bio: "", focus: "", coreStack: "" }
export const technicalSkills = config.technicalSkills
export const certifications = config.certifications
export const education: Education[] = (config as any).education ?? []

export type Education = {
  qualification: string
  institution: string
  status: "In Progress" | "Completed"
  year?: string
}
export const workExperience: WorkExperience[] = (config as any).workExperience ?? []

export type WorkExperience = {
  title: string
  company: string
  location: string
  duration: string
  type: string
  responsibilities: string[]
}

export type CodeSection = {
  title: string
  description: string
  snippet: string
  image?: string
}

export type DashboardSlide = {
  title: string
  description: string | string[]
  bullets?: string[]
  image: string
}

export type Dashboard = {
  title: string
  description: string
  slides: DashboardSlide[]
}

export type CustomContentItem =
  | { type: "text"; title: string; content: string; image?: string }
  | { type: "code"; title: string; description: string; snippet: string; image?: string }
  | { type: "dashboard"; title: string; description: string; slides: DashboardSlide[] }

export type Project = {
  slug: string
  projectMode?: "template" | "custom"
  title: string
  company?: string
  industry?: string
  role?: string
  duration?: string
  summary: string
  tools: string[]
  preview: string
  challenge: string[]
  requirements?: string[]
  customSections?: { title: string; content: string; image?: string }[]
  whatIBuilt: string[]
  whatIBuiltBullets?: string[]
  sqlSnippet?: string
  sqlDescription?: string
  buildImage?: string
  outcomeImage?: string
  dashboardTitle?: string
  dashboardDescription?: string
  dashboardSlides?: DashboardSlide[]
  codeSections?: CodeSection[]
  dashboards?: Dashboard[]
  customContent?: CustomContentItem[]
  outcome: string[]
  keyDeliverables?: string[]
  kpiTargets?: string[]
  impact?: string[]
  githubUrl?: string | null
  liveUrl?: string | null
  gallery: { src: string; caption: string }[]
}

export const projects: Project[] = config.projects as Project[]
