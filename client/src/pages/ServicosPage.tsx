import Navigation from '@/components/Navigation';
import Servicos from '@/components/Servicos';
import Footer from '@/components/Footer';

export default function ServicosPage() {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navigation />
      <main className="flex-1 pt-20 page-enter">
        <Servicos />
      </main>
      <Footer />
    </div>
  );
}
