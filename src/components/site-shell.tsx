import { AmbientBackground } from "@/components/ambient-background";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/sections/footer";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-black">
      <AmbientBackground />
      <div className="relative z-10">
        <Navbar />
        {children}
        <Footer />
      </div>
    </div>
  );
}
