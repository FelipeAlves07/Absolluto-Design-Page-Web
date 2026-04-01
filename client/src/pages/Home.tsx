import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Sobre from '@/components/Sobre';
import Servicos from '@/components/Servicos';
import Processo from '@/components/Processo';
import Alcance from '@/components/Alcance';
import Briefing from '@/components/Briefing';
import Contato from '@/components/Contato';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navigation />
      <main className="flex-1">
        <Hero />
        <Sobre />
        <Servicos />
        <Processo />
        <Alcance />
        <Briefing />
        <Contato />
      </main>
      <Footer />
    </div>
  );
}
