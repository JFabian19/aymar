import React, { useState, useMemo } from 'react';
import { ShoppingBag, Heart, Plus, Minus, Search, Menu as MenuIcon, Flame, ChevronRight, Share2, X, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const WHATSAPP_NUMBER = "51965424835";

const data = {
  "restaurante": "Aymar",
  "slogan": "PESCADOS & PARRILLAS",
  "menu": [
    {
      "categoria": "PLATOS PERSONALES",
      "items": [
        { "nombre": "Ceviche clásico", "descripcion": "Con Papa rellena, Tortita choclo o Papa a la huancaína", "precio": "S/ 10" },
        { "nombre": "Ceviche de tollo", "descripcion": "Con Papa rellena, Tortita de choclo o Papa a la huancaína", "precio": "S/ 20" },
        { "nombre": "Ceviche mixto", "descripcion": "Con Papa rellena, Tortita de choclo o Papa a la huancaína", "precio": "S/ 25" },
        { "nombre": "Leche de tigre", "descripcion": "Con Papa rellena o Tortita de choclo", "precio": "S/ 15" },
        { "nombre": "Ceviche clásico + Chicharrón", "precio": "S/ 25" },
        { "nombre": "Ceviche clásico + Arroz/Chaufa", "descripcion": "A escoger: Arroz con mariscos o Chaufa mariscos", "precio": "S/ 25" },
        { "nombre": "Ceviche Tollo + Arroz/Chaufa", "descripcion": "A escoger: Arroz con mariscos o Chaufa mariscos", "precio": "S/ 27" },
        { "nombre": "Ceviche mixto + Arroz/Chaufa", "descripcion": "A escoger: Arroz con mariscos o Chaufa mariscos", "precio": "S/ 30" },
        { "nombre": "Ceviche de conchas negras", "precio": "S/ 25" },
        { "nombre": "Trío Aymar", "descripcion": "Ceviche clásico, Chicharrón, Arroz o Chaufa", "precio": "S/ 35" },
        { "nombre": "Ronda marina", "descripcion": "Ceviche, Chicharrón, Leche de tigre, Arroz o Chaufa y Tortita", "precio": "S/ 45" },
        { "nombre": "Sudado Parihuela", "precio": "S/ 25" },
        { "nombre": "Chicharrón de pescado", "precio": "S/ 25" },
        { "nombre": "Chicharrón mixto", "precio": "S/ 25" },
        { "nombre": "Pellejito acevichado", "precio": "S/ 25" },
        { "nombre": "Arroz con mariscos", "precio": "S/ 25" },
        { "nombre": "Chaufa de mariscos", "precio": "S/ 25" },
        { "nombre": "Chaufa amazónico", "precio": "S/ 25" }
      ]
    },
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
  ]
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

interface CartItem {
  nombre: string;
  precio: string;
  cantidad: number;
}

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showSummary, setShowSummary] = useState(false);

  const cartCount = useMemo(() => cart.reduce((acc, item) => acc + item.cantidad, 0), [cart]);

  const addToCart = (item: any) => {
    setCart(prev => {
      const existing = prev.find(i => i.nombre === item.nombre);
      if (existing) {
        return prev.map(i => i.nombre === item.nombre ? { ...i, cantidad: i.cantidad + 1 } : i);
      }
      return [...prev, { nombre: item.nombre, precio: item.precio || item.precio_medio_litro, cantidad: 1 }];
    });
  };

  const updateQuantity = (nombre: string, delta: number) => {
    setCart(prev => prev.map(i => {
      if (i.nombre === nombre) {
        const newQty = i.cantidad + delta;
        return newQty > 0 ? { ...i, cantidad: newQty } : null;
      }
      return i;
    }).filter(Boolean) as CartItem[]);
  };

  const calculateTotal = () => {
    return cart.reduce((acc, item) => {
      const precioStr = item.precio.replace(/[^\d.]/g, '');
      const precio = parseFloat(precioStr) || 0;
      return acc + (precio * item.cantidad);
    }, 0);
  };

  const sendToWhatsApp = () => {
    const total = calculateTotal();
    let message = `*Hola Aymar, deseo realizar un pedido:*\n\n`;
    cart.forEach(item => {
      message += `• ${item.cantidad} x ${item.nombre} (${item.precio})\n`;
    });
    message += `\n*TOTAL: S/ ${total.toFixed(2)}*`;
    
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen relative shadow-2xl overflow-hidden flex flex-col font-sans">
      
      <header className="sticky top-0 bg-white z-50 px-4 py-3 flex justify-between items-center bg-white/90 backdrop-blur-md">
        <motion.div whileTap={{ scale: 0.95 }} className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center">
          <MenuIcon size={24} className="text-gray-600" />
        </motion.div>
        
        <div className="flex flex-col items-center">
            <h1 className="font-logo italic text-3xl text-aymar-cyan leading-none font-bold tracking-tight">Aymar</h1>
            <span className="text-[10px] font-sans text-gray-500 tracking-[0.2em] font-medium mt-1 uppercase">{data.slogan}</span>
        </div>

        <motion.div 
          onClick={() => cartCount > 0 && setShowSummary(true)}
          whileTap={{ scale: 0.95 }} 
          className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center relative cursor-pointer"
        >
          <ShoppingBag size={24} className="text-gray-600" />
          {cartCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-aymar-red rounded-full border-2 border-white"></span>
          )}
        </motion.div>
      </header>

      <div className="w-full bg-aymar-cyan py-1.5 overflow-hidden flex items-center">
        <div className="animate-marquee flex gap-4 text-white font-bold text-[11px] tracking-widest uppercase whitespace-nowrap">
          {[...Array(8)].map((_, i) => (
            <span key={i}>EL VERDADERO SABOR A MAR • </span>
          ))}
        </div>
      </div>

      <main className="flex-1 overflow-y-auto pb-32">
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

        <div className="px-4 mb-8">
           <div className="bg-gray-50 rounded-2xl flex items-center px-4 py-4 border border-gray-100 shadow-sm">
             <Search size={20} className="text-gray-400 mr-3" />
             <input 
               type="text" 
               placeholder="Buscar ceviche..." 
               className="bg-transparent border-none outline-none text-[15px] font-sans w-full text-gray-700 placeholder:text-gray-400"
             />
           </div>
        </div>

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
                        className="bg-white rounded-[2rem] overflow-hidden flex flex-col shadow-md border border-gray-50"
                      >
                         <div className="relative aspect-square bg-gray-100">
                            <img src={getImageForDish(item.nombre)} alt={item.nombre} className="w-full h-full object-cover" />
                            <button className="absolute top-3 right-3 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center text-gray-400">
                               <Heart size={16} />
                            </button>
                         </div>
                         <div className="p-4 flex flex-col flex-grow">
                            <h4 className="font-bold text-aymar-dark text-[14px] leading-snug mb-2 flex-grow">{item.nombre}</h4>
                            <div className="flex justify-between items-center mt-2">
                               <span className="font-bold text-aymar-dark text-lg">
                                  {item.precio || item.precio_medio_litro}
                               </span>
                               <motion.button 
                                 whileTap={{ scale: 0.8 }}
                                 onClick={() => addToCart(item)}
                                 className="w-8 h-8 bg-aymar-cyan/10 rounded-full flex items-center justify-center text-aymar-cyan"
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

      <AnimatePresence>
        {cartCount > 0 && !showSummary && (
          <motion.div 
            initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }}
            className="fixed bottom-0 w-full max-w-md p-6 z-40"
          >
            <div className="glass rounded-[2rem] p-4 flex items-center justify-between border border-white/50 shadow-2xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-aymar-dark rounded-2xl flex items-center justify-center relative overflow-hidden">
                   <div className="shimmer absolute inset-0 opacity-20"></div>
                   <ShoppingBag size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Tu Pedido</p>
                  <p className="font-bold text-aymar-dark text-lg">{cartCount} Artículos</p>
                </div>
              </div>
              <button 
                onClick={() => setShowSummary(true)}
                className="bg-aymar-cyan text-white px-6 py-3 rounded-2xl flex items-center gap-3 shadow-lg shadow-aymar-cyan/30"
              >
                <span className="font-bold text-sm">Ver Pedido</span>
                <ChevronRight size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSummary && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-end justify-center p-4 lg:p-0"
          >
             <motion.div 
               initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
               className="bg-white w-full max-w-md rounded-t-[3rem] p-6 max-h-[85vh] overflow-y-auto"
             >
                <div className="flex justify-between items-center mb-6">
                   <h2 className="font-title text-2xl font-bold text-aymar-dark">Mi Pedido</h2>
                   <button onClick={() => setShowSummary(false)} className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center">
                      <X size={20} className="text-gray-400" />
                   </button>
                </div>
                
                <div className="space-y-4 mb-8">
                   {cart.map(item => (
                      <div key={item.nombre} className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl">
                         <div className="flex-1">
                            <h4 className="font-bold text-aymar-dark text-sm">{item.nombre}</h4>
                            <p className="text-xs text-aymar-cyan font-bold">{item.precio}</p>
                         </div>
                         <div className="flex items-center gap-3 bg-white px-3 py-1.5 rounded-xl border border-gray-100">
                            <button onClick={() => updateQuantity(item.nombre, -1)} className="text-gray-400"><Minus size={16} /></button>
                            <span className="font-bold text-sm w-4 text-center">{item.cantidad}</span>
                            <button onClick={() => updateQuantity(item.nombre, 1)} className="text-aymar-cyan"><Plus size={16} /></button>
                         </div>
                         <button onClick={() => updateQuantity(item.nombre, -item.cantidad)} className="text-red-300 ml-1">
                            <Trash2 size={18} />
                         </button>
                      </div>
                   ))}
                </div>

                <div className="border-t border-dashed border-gray-200 pt-6 mb-8">
                   <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-400 font-medium">Subtotal</span>
                      <span className="font-bold text-aymar-dark">S/ {calculateTotal().toFixed(2)}</span>
                   </div>
                   <div className="flex justify-between items-center">
                      <h3 className="text-xl font-bold text-aymar-dark">Total a pagar</h3>
                      <h3 className="text-xl font-bold text-aymar-cyan">S/ {calculateTotal().toFixed(2)}</h3>
                   </div>
                </div>

                <button 
                  onClick={sendToWhatsApp}
                  className="w-full bg-[#25D366] text-white py-4 rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-green-100 hover:scale-[1.02] transition-transform"
                >
                   <span className="font-bold">Enviar Pedido a WhatsApp</span>
                   <ChevronRight size={20} />
                </button>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
