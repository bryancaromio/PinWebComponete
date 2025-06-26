import ImageSlideshow from '@/components/ImageSlideshow';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main className="mt-16"> {/* mt-16 para compensar el header fijo */}
        <div className="container mx-auto px-4">
          <ImageSlideshow />
          <div className="min-h-screen"></div> {/* Espacio para demostrar el scroll */}
        </div>
      </main>
      <Footer />
    </>
  );
}
