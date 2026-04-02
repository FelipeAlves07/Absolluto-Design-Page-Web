import Navigation from '@/components/Navigation';
import Contato from '@/components/Contato';
import Footer from '@/components/Footer';

export default function ContatoPage() {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navigation />
      <main className="flex-1 pt-20 page-enter">
        <Contato />
      </main>
      <Footer />
    </div>
  );
}
