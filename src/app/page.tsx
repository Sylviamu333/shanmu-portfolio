import { orderedProjects } from "@/data/projects";
import { HomeIntro } from "@/components/home/HomeIntro";
import { HomeWork } from "@/components/home/HomeWork";
import { HomeFooter } from "@/components/home/HomeFooter";
export default function Home() {
  return (
    <main id="main" className="homepage">
      <HomeIntro />
      <HomeWork projects={orderedProjects} />
      <HomeFooter />
    </main>
  );
}
