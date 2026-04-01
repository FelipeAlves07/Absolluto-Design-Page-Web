import { useState } from 'react';
import { ChevronRight } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Nexus Innovations',
    category: 'Identidade Visual',
    description: 'Rebranding completo para startup de tecnologia. Logo moderno, identidade visual coerente e aplicações em diversos materiais.',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663491387966/3JAMfz4jpnhENi5HNSfqU8/portfolio-01-tech-startup-FmpvLtQRoqskrnxfYyVBt8.webp',
    tags: ['Logo', 'Branding', 'Tech']
  },
  {
    id: 2,
    title: 'Aura Botânica',
    category: 'Design Gráfico',
    description: 'Identidade visual para marca de cosméticos orgânicos. Design elegante com elementos naturais e paleta de cores harmoniosa.',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663491387966/3JAMfz4jpnhENi5HNSfqU8/portfolio-02-organic-brand-GjadrsNWZWWjd6gtTX5FBN.webp',
    tags: ['Packaging', 'Branding', 'Eco-friendly']
  },
  {
    id: 3,
    title: 'Elysian Living',
    category: 'Social Media',
    description: 'Estratégia completa de redes sociais com conteúdo visual coerente, paleta de cores consistente e identidade de marca forte.',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663491387966/3JAMfz4jpnhENi5HNSfqU8/portfolio-03-social-media-3osfWrTLJhijTThPv2rXFQ.webp',
    tags: ['Instagram', 'Content', 'Lifestyle']
  },
  {
    id: 4,
    title: 'Apex Solutions',
    category: 'Apresentações',
    description: 'Deck de apresentação executiva com design profissional, gráficos de dados e layout moderno para consultoria tech.',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663491387966/3JAMfz4jpnhENi5HNSfqU8/portfolio-04-presentation-8K7bL8WmNhUQYaPooT5H5n.webp',
    tags: ['Presentation', 'Corporate', 'Data Viz']
  },
  {
    id: 5,
    title: 'Neon Horizons Festival',
    category: 'Design Gráfico',
    description: 'Identidade visual completa para festival de tech e arte. Materiais de marketing, pôsteres, flyers e colaterais com design vibrante.',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663491387966/3JAMfz4jpnhENi5HNSfqU8/portfolio-05-graphic-design-bDJh6SHQmkqhijBvZ4beKS.webp',
    tags: ['Event', 'Marketing', 'Vibrant']
  }
];

const categories = ['Todos', 'Identidade Visual', 'Social Media', 'Design Gráfico', 'Apresentações'];

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const filteredProjects = selectedCategory === 'Todos'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-dark pt-24 pb-20">
      {/* Header */}
      <div className="container mx-auto px-4 mb-16">
        <div className="text-center mb-12">
          <h1 className="font-bebas text-5xl md:text-6xl tracking-widest mb-4">
            NOSSO <span className="text-orange">PORTFÓLIO</span>
          </h1>
          <p className="text-text-gray text-lg md:text-xl max-w-2xl mx-auto">
            Projetos que elevaram marcas ao quadrado. Conheça alguns dos trabalhos que transformaram empresas em referências.
          </p>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2 rounded-full font-syne font-semibold text-sm uppercase tracking-widest transition-all duration-300 ${
                selectedCategory === cat
                  ? 'bg-orange text-black'
                  : 'bg-border text-text-gray hover:text-white hover:bg-border/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de Projetos */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group cursor-pointer"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Imagem */}
              <div className="relative overflow-hidden rounded-lg mb-5 aspect-video bg-border">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-orange font-syne font-bold text-sm mb-2 uppercase tracking-widest">
                      {project.category}
                    </p>
                    <h3 className="text-white font-bebas text-2xl tracking-widest mb-4">
                      {project.title}
                    </h3>
                    <button className="inline-flex items-center gap-2 bg-orange text-black px-6 py-2 rounded-full font-syne font-bold text-sm uppercase tracking-widest hover:bg-orange/90 transition-colors">
                      Ver Projeto
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div>
                <p className="text-orange font-syne font-bold text-xs uppercase tracking-widest mb-2">
                  {project.category}
                </p>
                <h3 className="font-bebas text-2xl tracking-widest text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-text-gray text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-border rounded-full text-xs text-text-gray font-syne font-semibold uppercase tracking-widest"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 mt-20">
        <div className="bg-gradient-to-r from-blue to-orange/20 rounded-lg p-12 text-center border border-orange/30">
          <h2 className="font-bebas text-4xl md:text-5xl tracking-widest text-white mb-4">
            PRONTO PARA ELEVAR SUA MARCA?
          </h2>
          <p className="text-text-gray text-lg mb-8 max-w-2xl mx-auto">
            Vamos transformar sua visão em uma identidade visual que deixará sua marca em destaque no mercado.
          </p>
          <a href="#briefing" className="inline-block bg-orange text-black px-8 py-3 rounded-full font-bebas font-bold text-lg uppercase tracking-widest hover:bg-orange/90 transition-colors">
            Iniciar Projeto
          </a>
        </div>
      </div>
    </div>
  );
}
