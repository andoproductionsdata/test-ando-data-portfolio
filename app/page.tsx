import { HeroSection } from "@/components/sections/hero-section"
import { AboutSection } from "@/components/sections/about-section"
import { SkillsSection } from "@/components/sections/skills-section"
import { CertificationsSection } from "@/components/sections/certifications-section"
import { ProjectsSection } from "@/components/sections/projects-section"
import { WorkExperienceSection } from "@/components/sections/work-experience-section"
import { ContactSection } from "@/components/sections/contact-section"

export default function Page() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <CertificationsSection />
      <WorkExperienceSection />
      <ContactSection />
    </main>
  )
}
