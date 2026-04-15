import React, { useState } from 'react';
import { ShoppingBag, Heart, Plus, Search, Menu as MenuIcon, Flame, ChevronRight, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const data = {
  "restaurante": "Aymar Pescados & Parrillas",
  "menu": [
    {
      "categoria": "FUENTES PARA COMPARTIR",
      "items": [
        { "nombre": "Ceviche de pescado", "precio": "s/40" },
        { "nombre": "Ceviche mixto", "precio": "s/45" },
        { "nombre": "Chicharrón de pescado", "precio": "s/40" },
        { "nombre": "Chicharrón mixto", "precio": "s/45" },
        { "nombre": "Arroz con mariscos", "precio": "s/40" },
        { "nombre": "Chaufa de mariscos", "precio": "s/40" },
        { "nombre": "Dúo Marino Aymar", "precio": "s/50" },
        { "nombre": "Trio Marino Aymar", "precio": "s/60" },
        { "nombre": "Trio 3 al Hilo", "descripcion": ["Ceviche de conchas negras", "Ceviche mixto", "Ceviche de chiringuito"], "precio": "s/60" },
        { "nombre": "Sudado Parihuela", "precio": "s/40" },
        { "nombre": "Chicharrón de pollo", "precio": "s/40" }
      ]
    },
    {
      "categoria": "ADICIONALES",
      "items": [
        { "nombre": "Papa rellena", "precio": "s/5" },
        { "nombre": "Tortilla de choclo", "precio": "s/4" },
        { "nombre": "Yucas fritas", "precio": "s/5" },
        { "nombre": "Camote", "precio": "s/4" },
        { "nombre": "Arroz blanco", "precio": "s/4" },
        { "nombre": "Palabritas", "precio": "s/10" },
        { "nombre": "Papa a la huancaina", "precio": "s/8" }
      ]
    },
    {
      "categoria": "BEBIDAS NATURALES",
      "items": [
        { "nombre": "Chicha Morada", "precio_medio_litro": "s/6", "precio_un_litro": "s/12" },
        { "nombre": "Maracuyá", "precio_medio_litro": "s/6", "precio_un_litro": "s/12" },
        { "nombre": "Chicha de Jora", "precio_medio_litro": "s/6", "precio_un_litro": "s/12" }
      ]
    },
    {
      "categoria": "Gaseosas",
      "items": [
        { "nombre": "Inca Kola Pers.", "precio": "s/3" },
        { "nombre": "Inca Kola", "precio": "s/5 - s/10" },
        { "nombre": "Coca Cola", "precio": "s/5 - s/10" },
        { "nombre": "Gordita", "precio": "s/6" },
        { "nombre": "Agua Mineral", "precio": "s/3" }
      ]
    },
    {
      "categoria": "Cerveza",
      "items": [
        { "nombre": "Pilsen", "precio": "s/10" },
        { "nombre": "Cuzqueña", "precio": "s/11" }
      ]
    }
  ],
  "redes_sociales": {
    "usuario": "@AymarPescados&Parrillas",
    "plataformas": ["Facebook", "Instagram", "TikTok"]
  }
};

const getImageForDish = (name: string) => {
  const lowerName = name.toLowerCase();
  if (lowerName.includes('ceviche') || lowerName.includes('leche') || lowerName.includes('chiringuito') || lowerName.includes('marino') || lowerName.includes('hilo')) return "https://images.unsplash.com/photo-1534604973900-c430e31cd2f1?auto=format&fit=crop&q=80&w=400";
  if (lowerName.includes('chicharrón') || lowerName.includes('pellejito')) return "https://images.unsplash.com/photo-1559742811-822873691df8?auto=format&fit=crop&q=80&w=400";
  if (lowerName.includes('arroz') || lowerName.includes('chaufa')) return "https://images.unsplash.com/photo-1512132411229-c30391241dd8?auto=format&fit=crop&q=80&w=400";
  if (lowerName.includes('sudado') || lowerName.includes('parihuela')) return "https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&q=80&w=400";
  if (lowerName.includes('papa') || lowerName.includes('yuca') || lowerName.includes('camote') || lowerName.includes('tortilla') || lowerName.includes('palabritas')) return "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=400";
  if (lowerName.includes('chicha') || lowerName.includes('maracuyá')) return "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=400";
  if (lowerName.includes('kola') || lowerName.includes('cola') || lowerName.includes('gordita') || lowerName.includes('agua')) return "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=400";
  if (lowerName.includes('pilsen') || lowerName.includes('cuzqueña') || lowerName.includes('cerveza')) return "https://images.unsplash.com/photo-1535958636474-b021ee887b13?auto=format&fit=crop&q=80&w=400";
  return "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=400";
};

export default function App() {
  const [activeCategory, setActiveCategory] = useState(data.menu[0].categoria);
  const [cartCount, setCartCount] = useState(0);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemAnim = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="max-w-md mx-auto bg-aymar-bg min-h-screen relative shadow-2xl overflow-hidden flex flex-col font-sans">
      
      {/* Dynamic Header */}
      <header className="fixed top-0 w-full max-w-md z-50 glass">
        <div className="flex justify-between items-center p-4">
          <div className="flex items-center gap-3">
            <motion.div 
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 bg-white shadow-sm rounded-xl flex items-center justify-center border border-gray-100"
            >
              <MenuIcon size={20} className="text-aymar-dark" />
            </motion.div>
            <div className="flex flex-col">
              <h1 className="font-logo italic text-3xl text-aymar-dark-cyan leading-none font-bold">Aymar</h1>
              <span className="text-[8px] font-sans text-gray-400 tracking-[0.3em] uppercase mt-0.5 font-bold">Pescados & Parrillas</span>
            </div>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 bg-aymar-dark-cyan shadow-lg shadow-aymar-cyan/30 rounded-xl flex items-center justify-center relative text-white"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-5 h-5 bg-aymar-red text-white text-[10px] font-bold rounded-full border-2 border-white flex items-center justify-center"
              >
                {cartCount}
              </motion.span>
            )}
          </motion.button>
        </div>
        
        {/* Category Pill Scroller */}
        <div className="px-4 pb-4 overflow-x-auto scrollbar-hide flex gap-2 no-scrollbar">
          {data.menu.map((cat) => (
            <button 
              key={cat.categoria}
              onClick={() => setActiveCategory(cat.categoria)}
              className={`px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-300 ${
                activeCategory === cat.categoria 
                ? 'bg-aymar-dark-cyan text-white shadow-md shadow-aymar-cyan/20' 
                : 'bg-white/50 text-gray-500 border border-gray-100 hover:bg-white'
              }`}
            >
              {cat.categoria}
            </button>
          ))}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pt-36 pb-32">
        
        {/* Hero Section */}
        <div className="px-5 mb-8">
          <div className="relative w-full h-56 rounded-[32px] overflow-hidden group">
            <img 
              src="https://images.unsplash.com/photo-1551248429-40975aa4de74?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
              alt="Ceviche Hero" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-8 h-[2px] bg-aymar-cyan"></span>
                  <span className="text-aymar-cyan text-[10px] font-bold uppercase tracking-[0.2em]">Exclusividad Marina</span>
                </div>
                <h2 className="text-white font-logo italic text-5xl leading-[0.9] drop-shadow-lg mb-2">Lo mejor del mar</h2>
                <div className="flex justify-between items-center">
                  <p className="text-white/70 text-xs font-sans max-w-[200px] leading-relaxed">
                    Sabor artesanal con ingredientes frescos de la pesca del día.
                  </p>
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20"
                  >
                    <Share2 size={16} />
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Marquee Info */}
        <div className="w-full bg-aymar-dark py-2.5 mb-8 border-y border-aymar-cyan/20">
          <div className="animate-marquee flex gap-12 text-aymar-cyan font-bold text-[10px] tracking-[0.3em] uppercase whitespace-nowrap">
            {[...Array(6)].map((_, i) => (
              <span key={i} className="flex items-center gap-2">
                <Flame size={12} className="text-aymar-red" fill="currentColor" />
                EL VERDADERO SABOR A MAR
              </span>
            ))}
          </div>
        </div>

        {/* Dynamic Menu Items */}
        <div className="px-5">
          <AnimatePresence mode='wait'>
            <motion.div 
              key={activeCategory}
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 gap-4"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-title text-2xl font-bold text-aymar-dark">{activeCategory}</h3>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest bg-gray-100 px-2 py-1 rounded">Del Mar</span>
              </div>

              {data.menu.find(c => c.categoria === activeCategory)?.items.map((item: any, idx: number) => (
                <motion.div 
                  key={idx}
                  variants={itemAnim}
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-3xl overflow-hidden flex shadow-sm border border-gray-100 p-3 gap-3"
                >
                  <div className="relative w-28 h-28 rounded-2xl overflow-hidden flex-shrink-0 bg-gray-50">
                    <img 
                      src={getImageForDish(item.nombre)} 
                      alt={item.nombre}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <button className="absolute top-2 right-2 w-7 h-7 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm text-gray-400 active:text-aymar-red">
                      <Heart size={14} className="hover:scale-110 transition-transform" />
                    </button>
                  </div>
                  
                  <div className="flex flex-col flex-grow py-1">
                    <div className="flex-grow">
                      <h4 className="font-bold text-aymar-dark text-[15px] leading-tight mb-1">{item.nombre}</h4>
                      {item.descripcion && (
                        <p className="text-[11px] text-gray-400 leading-snug line-clamp-2">
                          {Array.isArray(item.descripcion) ? item.descripcion.join(', ') : item.descripcion}
                        </p>
                      )}
                    </div>
                    
                    <div className="flex justify-between items-end mt-2">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-gray-300 font-bold uppercase tracking-tighter">Precio</span>
                        <span className="font-bold text-aymar-dark-cyan text-lg">
                          {item.precio || (item.precio_medio_litro ? `${item.precio_medio_litro}` : '')}
                        </span>
                      </div>
                      <motion.button 
                        whileTap={{ scale: 0.8 }}
                        onClick={() => setCartCount(prev => prev + 1)}
                        className="w-10 h-10 bg-aymar-cyan/10 rounded-2xl flex items-center justify-center text-aymar-dark-cyan hover:bg-aymar-dark-cyan hover:text-white transition-colors"
                      >
                        <Plus size={20} />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Floating Bottom Info */}
      <div className="fixed bottom-0 w-full max-w-md p-6 pointer-events-none">
        <div className="glass rounded-[32px] p-4 flex items-center justify-between pointer-events-auto border border-white/50 shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-aymar-dark rounded-2xl flex items-center justify-center relative overflow-hidden">
               <div className="shimmer absolute inset-0 opacity-20"></div>
               <img src="https://images.unsplash.com/photo-1551248429-40975aa4de74?auto=format&fit=crop&q=10&w=50" className="w-full h-full object-cover blur-[2px] opacity-40" />
               <ShoppingBag size={20} className="text-white relative z-10" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Tu Pedido</p>
              <p className="font-bold text-aymar-dark">{cartCount} Artículos</p>
            </div>
          </div>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-[#25D366] text-white px-6 py-3 rounded-2xl flex items-center gap-3 shadow-lg shadow-green-200"
          >
            <span className="font-bold text-sm">Enviar Pedido</span>
            <ChevronRight size={18} />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
