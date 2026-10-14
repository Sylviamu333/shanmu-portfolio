import { orderedProjects } from "@/data/projects";
import { HomeIntro } from "@/components/home/HomeIntro";
import { HomeWork } from "@/components/home/HomeWork";
import { HomeFooter } from "@/components/home/HomeFooter";
import { HomeMotion } from "@/components/home/HomeMotion";
export default function Home() {
  return (
    <HomeMotion>
      <HomeIntro />
      <HomeWork projects={orderedProjects} />
      <HomeFooter />
    </HomeMotion>
  );
}
