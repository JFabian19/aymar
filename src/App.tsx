import React, { useState } from 'react';
import { ShoppingBag, Plus, Flame, Package, Bike, Search, Menu as MenuIcon, ChevronLeft } from 'lucide-react';

const data = {
  "restaurante": "Aymar Pescados & Parrillas",
  "costos_adicionales": {
    "descartables": "S/ 2",
    "delivery": "S/ 4"
  },
  "opciones_papa_rellena": [
    "Carne",
    "Pollo",
    "Mariscos",
    "Selvática"
  ]
};

const categories = [
  {
    id: 'ceviches',
    name: 'Ceviches',
    items: [
      { nombre: "Ceviche clásico", acompañamientos: ["Papa rellena", "Tortita choclo", "Papa a la huancaína"], precio: "S/ 10" },
      { nombre: "Ceviche de tollo", acompañamientos: ["Papa rellena", "Tortita de choclo", "Papa a la huancaína"], precio: "S/ 20" },
      { nombre: "Ceviche mixto", acompañamientos: ["Papa rellena", "Tortita de choclo", "Papa a la huancaína"], precio: "S/ 25" },
      { nombre: "Leche de tigre", acompañamientos: ["Papa rellena", "Tortita de choclo"], precio: "S/ 15" },
      { nombre: "Ceviche de conchas negras", acompañamientos: [], precio: "S/ 25" }
    ]
  },
  {
    id: 'combos',
    name: 'Especiales y Combos',
    items: [
      { nombre: "Ceviche clásico / Chicharrón", acompañamientos: [], precio: "S/ 25" },
      { nombre: "Ceviche / Arroz Mariscos", acompañamientos: [], precio: "S/ 25" },
      { nombre: "Ceviche Tollo / Arroz", acompañamientos: [], precio: "S/ 27" },
      { nombre: "Ceviche Mixto / Arroz", acompañamientos: [], precio: "S/ 30" },
      { nombre: "Trío Aymar", acompañamientos: ["Ceviche clásico", "Chicharrón", "Arroz con mariscos", "Chaufa mariscos"], precio: "S/ 35" },
      { nombre: "Ronda marina", acompañamientos: ["Ceviche clásico", "Chicharrón", "Leche de tigre", "Arroz con mariscos", "Tortita de choclo"], precio: "S/ 45" },
      { nombre: "Sudado Parihuela", acompañamientos: [], precio: "S/ 25" }
    ]
  },
  {
    id: 'chicharrones',
    name: 'Chicharrones',
    items: [
      { nombre: "Chicharrón de pescado", acompañamientos: [], precio: "S/ 25" },
      { nombre: "Chicharrón mixto", acompañamientos: [], precio: "S/ 25" },
      { nombre: "Pellejito acevichado", acompañamientos: [], precio: "S/ 25" }
    ]
  },
  {
    id: 'arroces',
    name: 'Arroces',
    items: [
      { nombre: "Arroz con mariscos", acompañamientos: [], precio: "S/ 25" },
      { nombre: "Chaufa de mariscos", acompañamientos: [], precio: "S/ 25" },
      { nombre: "Chaufa amazónico", acompañamientos: [], precio: "S/ 25" }
    ]
  }
];

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const activeCategory = categories.find(c => c.id === selectedCategory);

  return (
    <div className="max-w-5xl mx-auto bg-white min-h-screen relative shadow-2xl overflow-hidden flex flex-col font-sans text-aymar-dark">
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-white sticky top-0 z-20 shadow-sm md:hidden">
        <div className="flex items-center gap-3">
          <button className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center">
            <MenuIcon size={20} className="text-aymar-dark" />
          </button>
          <div className="flex flex-col">
            <h1 className="font-logo italic text-3xl text-aymar-cyan leading-none font-bold">Aymar</h1>
            <span className="text-[9px] font-title text-aymar-dark tracking-[0.2em] uppercase mt-1">Pescados & Parrillas</span>
          </div>
        </div>
        <button className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center relative">
          <ShoppingBag size={20} className="text-aymar-dark" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-aymar-red rounded-full"></span>
        </button>
      </header>

      {/* Infinity Marquee */}
      <div className="bg-aymar-cyan text-white py-2 overflow-hidden flex items-center border-y-2 border-aymar-red relative w-full z-10">
        <div className="animate-marquee whitespace-nowrap font-title text-sm tracking-widest uppercase flex">
          {[...Array(10)].map((_, i) => (
            <React.Fragment key={i}>
              <span className="mx-4">El verdadero sabor a mar</span>
              <span className="mx-4 text-aymar-red">✦</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      <main className="flex-1 overflow-y-auto pb-0">
        {!selectedCategory ? (
          <>
            {/* Hero Banner */}
            <div className="relative w-full h-[220px]">
              <img 
                src="https://images.unsplash.com/photo-1551248429-40975aa4de74?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                alt="Ceviche Hero" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/30 flex flex-col justify-center items-center p-5 text-center">
                <span className="bg-aymar-cyan text-white text-[10px] font-bold px-2 py-1 rounded-md w-fit mb-2 uppercase tracking-wider md:hidden">Especialidad</span>
                <h2 className="font-logo italic text-6xl md:text-[80px] text-white font-bold drop-shadow-[2px_2px_10px_rgba(0,0,0,0.5)] leading-none">Aymar</h2>
                <p className="text-white font-title text-xl md:text-2xl leading-tight drop-shadow-md mt-2">Pescados & Parrillas</p>
              </div>
              {/* Wave Divider */}
              <div 
                className="absolute bottom-[-1px] left-0 w-full h-[60px] bg-white border-t-[6px] border-aymar-cyan"
                style={{ clipPath: 'polygon(0 40%, 15% 30%, 30% 40%, 45% 30%, 60% 40%, 75% 30%, 90% 40%, 100% 30%, 100% 100%, 0 100%)' }}
              ></div>
            </div>

            {/* Search Bar */}
            <div className="px-6 md:px-10 py-3 mt-4">
              <div className="bg-gray-50 rounded-xl flex items-center px-4 py-3 border border-gray-100">
                <Search size={18} className="text-gray-400 mr-3" />
                <input 
                  type="text" 
                  placeholder="Buscar ceviche, chaufa..." 
                  className="bg-transparent border-none outline-none text-sm font-sans w-full text-aymar-dark placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Section Title */}
            <div className="px-6 md:px-10 py-4 flex items-center gap-4 mt-2">
              <Flame className="text-aymar-red" size={36} fill="currentColor" />
              <h2 className="font-title text-[32px] md:text-[42px] text-aymar-cyan uppercase tracking-wide m-0 leading-none">Categorías</h2>
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-6 md:px-10 mb-8">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className="relative aspect-square rounded-2xl overflow-hidden shadow-md group border-2 border-transparent hover:border-aymar-cyan transition-all"
                >
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400 text-xs font-sans italic">aca va imagen</span>
                  </div>
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center p-4">
                    <span className="font-title text-white text-xl md:text-2xl text-center drop-shadow-md uppercase tracking-wide">{cat.name}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Extra Info Section */}
            <div className="px-6 md:px-10 py-8 flex flex-col md:flex-row items-center justify-between relative mt-8">
              {/* Papa Rellena Section */}
              <div className="relative flex flex-col items-center justify-center mb-12 md:mb-0 w-full md:w-auto md:absolute md:right-10 md:bottom-10 z-20">
                {/* Curved Text SVG */}
                <svg viewBox="0 0 200 100" className="w-64 h-32 absolute -top-12 z-20 overflow-visible md:hidden">
                  <path id="curve" d="M 20 80 Q 100 10 180 80" fill="transparent" />
                  <text className="font-title text-aymar-red text-[14px] font-bold tracking-widest" fill="currentColor">
                    <textPath href="#curve" startOffset="50%" textAnchor="middle">PAPA RELLENA</textPath>
                  </text>
                </svg>
                
                <div className="w-[160px] h-[160px] bg-aymar-cyan rounded-full flex flex-col items-center justify-center shadow-[0_4px_15px_rgba(0,0,0,0.1)] border-4 border-white outline outline-2 outline-aymar-cyan relative z-10 mt-8 md:mt-0">
                  <div className="font-title text-aymar-red text-[14px] bg-white px-3 py-0.5 rounded-full -rotate-5 mb-2 font-bold shadow-sm hidden md:block">PAPA RELLENA</div>
                  <ul className="text-white font-sans font-bold text-[14px] text-center list-none p-0 m-0">
                    {data.opciones_papa_rellena.map((op, idx) => (
                      <li key={idx} className="my-0.5">{op}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 pb-10">
            {/* Category Header */}
            <div className="relative w-full h-48 md:h-64">
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400 text-sm font-sans italic">aca va imagen</span>
              </div>
              <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center p-5 text-center">
                <h2 className="font-title text-3xl md:text-5xl text-white uppercase tracking-widest drop-shadow-lg">{activeCategory?.name}</h2>
              </div>
              <button
                onClick={() => setSelectedCategory(null)}
                className="absolute top-4 left-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-colors border border-white/30"
              >
                <ChevronLeft size={24} />
              </button>
            </div>

            {/* Dish List */}
            <div className="px-6 md:px-10 py-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[40px] gap-y-[20px]">
                {activeCategory?.items.map((item, index) => (
                  <div key={index} className="flex flex-col border-b border-dotted border-[#ccc] pb-3">
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-sans font-bold text-[17px] uppercase text-aymar-dark">{item.nombre}</h3>
                      <span className="font-sans font-bold text-aymar-red text-[18px] whitespace-nowrap ml-2">{item.precio}</span>
                    </div>
                    <div className="flex justify-between items-end mt-1 flex-grow">
                      <p className="font-sans text-[13px] text-[#666] leading-[1.2]">
                        {item.acompañamientos.length > 0 ? `• ${item.acompañamientos.join(' • ')}` : 'Solo'}
                      </p>
                      <button className="w-8 h-8 bg-aymar-cyan/10 rounded-full flex items-center justify-center shrink-0 ml-2 hover:bg-aymar-cyan/20 transition-colors">
                        <Plus size={16} className="text-aymar-cyan" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Costos Adicionales / Footer */}
        <div className="w-full bg-aymar-cyan p-4 md:px-10 md:py-0 md:h-[60px] flex flex-col md:flex-row items-center justify-between text-white font-title mt-auto z-30 relative">
          <div className="flex flex-col md:flex-row gap-4 md:gap-10 items-center w-full">
            <h3 className="text-aymar-red text-[18px] mb-2 md:mb-0 bg-white px-3 py-1 rounded-full shadow-sm">Costo Adicional:</h3>
            <div className="flex flex-col md:flex-row gap-4 md:gap-10 w-full md:w-auto">
              <div className="flex justify-between md:justify-start items-center text-[16px]">
                <span className="flex items-center gap-2">
                  <Package size={18} />
                  Descartables
                </span>
                <span className="ml-2 font-bold">{data.costos_adicionales.descartables}</span>
              </div>
              <div className="flex justify-between md:justify-start items-center text-[16px]">
                <span className="flex items-center gap-2">
                  <Bike size={18} />
                  Delivery
                </span>
                <span className="ml-2 font-bold">{data.costos_adicionales.delivery}</span>
              </div>
            </div>
            <div className="text-[14px] mt-4 md:mt-0 md:ml-auto text-center md:text-right hidden md:block">
              Pescados & Parrillas Frescura en tu Mesa
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Navigation (Floating Action Button style for WhatsApp) */}
      <div className="fixed bottom-6 right-6 z-40 md:bottom-20 md:right-10">
        <button className="w-14 h-14 bg-[#25D366] rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-transform">
          <svg viewBox="0 0 24 24" width="28" height="28" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
