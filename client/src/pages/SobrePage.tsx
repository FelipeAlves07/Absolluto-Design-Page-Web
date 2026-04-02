import Navigation from '@/components/Navigation';
import Sobre from '@/components/Sobre';
import Footer from '@/components/Footer';

export default function SobrePage() {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navigation />
      <main className="flex-1 pt-20 page-enter">
        <Sobre />
      </main>
      <Footer />
    </div>
  );
}
