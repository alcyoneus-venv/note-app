import About from '@/app/about/page';
import Contact from '@/app/contact/page';
import Experience from '@/app/experience/page';
import Portfolio from '@/app/portfolio/page';

export default function Home() {
  return (
<div className="min-h-screen pl-48 bg-slate-50 text-slate-950">
      
      {/* Container to give your sections some breathing room from the screen edges */}
      <div className="max-w-4xl mx-auto px-8 py-12 space-y-24">
        
        <section id="about">
          <About />
        </section>

        <section id="portfolio">
          <Portfolio />
        </section>

        <section id="experience">
          <Experience />
        </section>

        <section id="contact">
          <Contact />
        </section>

      </div>
    </div>
  );
}
