import React, { useState } from 'react';
import { ShoppingBag, Heart, Plus, Search, Menu as MenuIcon, Flame, ChevronRight, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const data = {
  "restaurante": "Aymar",
  "slogan": "PESCADOS & PARRILLAS",
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
  const [cartCount, setCartCount] = useState(0);

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen relative shadow-2xl overflow-hidden flex flex-col font-sans">
      
      {/* Header precisely matching screenshot */}
      <header className="sticky top-0 bg-white z-50 px-4 py-3 flex justify-between items-center bg-white/90 backdrop-blur-md">
        <motion.div whileTap={{ scale: 0.95 }} className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center">
          <MenuIcon size={24} className="text-gray-600" />
        </motion.div>
        
        <div className="flex flex-col items-center">
            <h1 className="font-logo italic text-3xl text-aymar-cyan leading-none font-bold tracking-tight">Aymar</h1>
            <span className="text-[10px] font-sans text-gray-500 tracking-[0.2em] font-medium mt-1 uppercase">{data.slogan}</span>
        </div>

        <motion.div whileTap={{ scale: 0.95 }} className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center relative">
          <ShoppingBag size={24} className="text-gray-600" />
          {cartCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-aymar-red rounded-full border-2 border-white"></span>
          )}
        </motion.div>
      </header>

      {/* Marquee matching screenshot */}
      <div className="w-full bg-aymar-cyan py-1.5 overflow-hidden flex items-center">
        <div className="animate-marquee flex gap-4 text-white font-bold text-[11px] tracking-widest uppercase whitespace-nowrap">
          {[...Array(8)].map((_, i) => (
            <span key={i}>EL VERDADERO SABOR A MAR • </span>
          ))}
        </div>
      </div>

      <main className="flex-1 overflow-y-auto pb-32">
        
        {/* Hero Section matching screenshot */}
        <div className="p-4">
          <div className="relative w-full h-64 rounded-3xl overflow-hidden shadow-xl">
            <img 
              src="https://images.unsplash.com/photo-1551248429-40975aa4de74?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
              alt="Ceviche Hero" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute inset-0 flex flex-col justify-end p-6">
               <div className="bg-aymar-cyan text-white text-[10px] font-bold px-3 py-1.5 rounded-lg w-fit mb-3 uppercase tracking-wider">
                  {data.slogan}
               </div>
               <h2 className="text-white font-logo italic text-6xl leading-[0.85] drop-shadow-2xl">Aymar</h2>
            </div>
          </div>
        </div>

        {/* Search Bar matching screenshot */}
        <div className="px-4 mb-8">
           <div className="bg-gray-50 rounded-2xl flex items-center px-4 py-4 border border-gray-100 shadow-sm">
             <Search size={20} className="text-gray-400 mr-3" />
             <input 
               type="text" 
               placeholder="Buscar ceviche, chaufa..." 
               className="bg-transparent border-none outline-none text-[15px] font-sans w-full text-gray-700 placeholder:text-gray-400"
             />
           </div>
        </div>

        {/* Menu Categories Grid matching screenshot */}
        <div className="px-4">
          {data.menu.map((categoria, catIdx) => (
             <div key={catIdx} className="mb-10">
                <div className="flex items-center gap-3 mb-6">
                   <Flame className="text-aymar-red" size={28} fill="currentColor" />
                   <h3 className="font-bold text-aymar-cyan text-2xl tracking-tight uppercase">{categoria.categoria}</h3>
                </div>

                <div className="grid grid-cols-2 gap-4">
                   {categoria.items.map((item: any, idx: number) => (
                      <motion.div 
                        key={idx}
                        whileHover={{ y: -5 }}
                        className="bg-white rounded-[2rem] overflow-hidden flex flex-col shadow-md border border-gray-50 mb-2"
                      >
                         <div className="relative aspect-square bg-gray-50 overflow-hidden">
                            <img 
                              src={getImageForDish(item.nombre)} 
                              alt={item.nombre}
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                            <button className="absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-sm text-gray-400">
                               <Heart size={16} />
                            </button>
                         </div>
                         <div className="p-4 flex flex-col flex-grow">
                            <h4 className="font-bold text-aymar-dark text-[14px] leading-snug mb-2 flex-grow">{item.nombre}</h4>
                            <div className="flex justify-between items-center mt-2">
                               <span className="font-bold text-aymar-dark text-lg leading-none">
                                  {item.precio || (item.precio_medio_litro ? `${item.precio_medio_litro}` : '')}
                               </span>
                               <motion.button 
                                 whileTap={{ scale: 0.8 }}
                                 onClick={() => setCartCount(prev => prev + 1)}
                                 className="w-8 h-8 bg-aymar-cyan/10 rounded-full flex items-center justify-center text-aymar-cyan hover:bg-aymar-cyan hover:text-white transition-colors"
                               >
                                 <Plus size={18} />
                               </motion.button>
                            </div>
                         </div>
                      </motion.div>
                   ))}
                </div>
             </div>
          ))}
        </div>
      </main>

      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-40 pointer-events-auto">
        <button className="w-14 h-14 bg-[#25D366] rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-transform">
           <svg viewBox="0 0 24 24" width="28" height="28" fill="white">
             <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
           </svg>
        </button>
      </div>

      {/* Floating Order Bar - Only visible when cartCount > 0 */}
      <AnimatePresence>
        {cartCount > 0 && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 w-full max-w-md p-6 pointer-events-none z-50"
          >
            <div className="glass rounded-[2rem] p-4 flex items-center justify-between pointer-events-auto border border-white/50 shadow-2xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-aymar-dark rounded-2xl flex items-center justify-center relative shadow-inner overflow-hidden">
                   <div className="shimmer absolute inset-0 opacity-20"></div>
                   <ShoppingBag size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Tu Pedido</p>
                  <p className="font-bold text-aymar-dark text-lg">{cartCount} Artículos</p>
                </div>
              </div>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-aymar-cyan text-white px-6 py-3 rounded-2xl flex items-center gap-3 shadow-lg shadow-aymar-cyan/30"
              >
                <span className="font-bold text-sm">Ver Pedido</span>
                <ChevronRight size={18} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
