import { orderedProjects } from "@/data/projects";
import { HomeIntro } from "@/components/home/HomeIntro";
import { HomeWork } from "@/components/home/HomeWork";
import { HomeAbout } from "@/components/home/HomeAbout";
import { HomeFooter } from "@/components/home/HomeFooter";
export default function Home() {
  return (
    <main id="main" className="homepage">
      <div className="home-container">
        <HomeIntro />
        <HomeWork projects={orderedProjects} />
        <HomeAbout />
        <HomeFooter />
      </div>
    </main>
  );
}
