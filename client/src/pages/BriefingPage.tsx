import Navigation from '@/components/Navigation';
import Briefing from '@/components/Briefing';
import Footer from '@/components/Footer';

export default function BriefingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navigation />
      <main className="flex-1 pt-20 page-enter">
        <Briefing />
      </main>
      <Footer />
    </div>
  );
}
