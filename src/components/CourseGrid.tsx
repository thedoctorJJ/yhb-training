import React, { useRef } from 'react';
import { Clock, Star, ChevronLeft, ChevronRight } from 'lucide-react';

const modules = [
  {
    id: 1,
    title: 'Module 1: Foundational AI Knowledge',
    instructor: 'Dr. Sarah Chen',
    rating: 4.9,
    duration: '2h',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3',
    progress: 65,
    category: 'Foundation',
  },
  {
    id: 2,
    title: 'Module 2: CAAS & Tax',
    instructor: 'James Wilson, CPA',
    rating: 4.8,
    duration: '2h',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3',
    progress: 30,
    category: 'CAAS',
  },
  {
    id: 3,
    title: 'Module 3: Assurance & Corporate',
    instructor: 'Michael Roberts, CIA',
    rating: 4.7,
    duration: '2h',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3',
    progress: 0,
    category: 'Audit',
  },
  {
    id: 4,
    title: 'Module 4: Advanced CAAS & Tax',
    instructor: 'Emily Thompson, CPA',
    rating: 4.9,
    duration: '2h',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3',
    progress: 0,
    category: 'CAAS',
  },
  {
    id: 5,
    title: 'Module 5: Advanced Assurance & Corporate',
    instructor: 'David Chen, CISA',
    rating: 4.8,
    duration: '2h',
    image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?ixlib=rb-4.0.3',
    progress: 0,
    category: 'Audit',
  },
  {
    id: 6,
    title: 'Module 6: Process Automation',
    instructor: 'Lisa Anderson, CPA',
    rating: 4.7,
    duration: '2h',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3',
    progress: 0,
    category: 'Tech',
  },
  {
    id: 7,
    title: 'Module 7: Client Communication',
    instructor: 'Robert Martinez, MBA',
    rating: 4.8,
    duration: '2h',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3',
    progress: 0,
    category: 'Soft Skills',
  },
  {
    id: 8,
    title: 'Module 8: Risk Management',
    instructor: 'Jennifer Lee, CRM',
    rating: 4.9,
    duration: '2h',
    image: 'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?ixlib=rb-4.0.3',
    progress: 0,
    category: 'Risk',
  },
  {
    id: 9,
    title: 'Module 9: Future Trends',
    instructor: 'Dr. Alex Johnson',
    rating: 4.8,
    duration: '2h',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3',
    progress: 0,
    category: 'Innovation',
  },
  {
    id: 10,
    title: 'Module 10: Implementation Strategy',
    instructor: 'Maria Garcia, PMP',
    rating: 4.7,
    duration: '2h',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3',
    progress: 0,
    category: 'Strategy',
  },
];

export default function CourseGrid() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      const newScrollLeft = direction === 'left' 
        ? scrollContainerRef.current.scrollLeft - scrollAmount
        : scrollContainerRef.current.scrollLeft + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-yhb-navy">
          Continue Learning
        </h2>
        <div className="flex items-center gap-4">
          <button
            onClick={() => scroll('left')}
            className="p-2 rounded-full bg-white shadow-sm hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-yhb-navy" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-2 rounded-full bg-white shadow-sm hover:bg-gray-50 transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-yhb-navy" />
          </button>
        </div>
      </div>

      <div 
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto pb-6 scroll-smooth hide-scrollbar"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {modules.map((module) => (
          <div
            key={module.id}
            className="flex-none w-[350px] bg-white rounded-lg shadow-sm overflow-hidden transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-md"
          >
            <div className="relative h-48">
              <img
                src={module.image}
                alt={module.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-yhb-navy text-white px-3 py-1 rounded-full text-sm font-medium">
                {module.category}
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-yhb-medium-gray">
                <div
                  className="h-full bg-yhb-green"
                  style={{ width: `${module.progress}%` }}
                />
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-yhb-navy mb-2 line-clamp-2">
                {module.title}
              </h3>
              <p className="text-sm text-yhb-gray mb-4">
                {module.instructor}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yhb-orange fill-current" />
                  <span className="text-sm font-medium text-yhb-navy">
                    {module.rating}
                  </span>
                </div>
                <div className="flex items-center space-x-1 text-yhb-gray">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{module.duration}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}