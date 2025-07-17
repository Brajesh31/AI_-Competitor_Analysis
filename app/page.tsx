import Image from "next/image";
import { Header } from "./components/Header";
import {HeroSection} from "./components/HeroSection";
import { HowItWorks } from "./components/HowItWorks";
import { CompetitorFindings } from "./components/CompetitorFindings";
import { CallToAction } from "./components/CallToAction";
import { Footer } from "./components/Footer";
export default function Home() {
  return (
    <div className="w-full min-h-screen bg-slate-50">
      {/* <Header /> */}
      <main>
        <HeroSection />
        <HowItWorks />
        {/* <CompetitorFindings /> */}
        {/* <CallToAction /> */}
      </main>
      {/* <Footer /> */}
    </div>
  );
}
