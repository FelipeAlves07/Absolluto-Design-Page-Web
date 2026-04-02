import Navigation from '@/components/Navigation';
import Processo from '@/components/Processo';
import Footer from '@/components/Footer';

export default function ProcessoPage() {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navigation />
      <main className="flex-1 pt-20 page-enter">
        <Processo />
      </main>
      <Footer />
    </div>
  );
}
