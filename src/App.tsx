import React, { useState, useMemo } from 'react';
import { ShoppingBag, Heart, Plus, Minus, Search, Menu as MenuIcon, Flame, ChevronRight, X, Trash2, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const WHATSAPP_NUMBER = "51965424835";

type Language = 'es' | 'en';

const translations = {
  es: {
    slogan: "PESCADOS & PARRILLAS",
    marquee: "EL VERDADERO SABOR A MAR • EL SABOR QUE TE ENCANTA • FRESCO TODOS LOS DÍAS • ",
    searchPlaceholder: "Buscar ceviche...",
    tuPedido: "Tu Pedido",
    articulos: "Artículos",
    verPedido: "Ver Pedido",
    miPedido: "Mi Pedido",
    subtotal: "Subtotal",
    totalPagar: "Total a pagar",
    enviarWhatsApp: "Enviar Pedido a WhatsApp",
    holaAymar: "*Hola Aymar, deseo realizar un pedido:*",
    totalMsg: "TOTAL",
    delivery: "Delivery",
    taper: "Taper",
    descripcion_escolar: "A escoger: Arroz con mariscos o Chaufa mariscos",
    descripcion_acompanamiento: "Con Papa rellena, Tortita choclo o Papa a la huancaína",
    medio_litro: "1/2 Litro",
    un_litro: "1 Litro",
    categorias: {
      "PLATOS PERSONALES": "PLATOS PERSONALES",
      "FUENTES PARA COMPARTIR": "FUENTES PARA COMPARTIR",
      "ADICIONALES": "ADICIONALES",
      "BEBIDAS NATURALES": "BEBIDAS NATURALES",
      "Gaseosas": "Gaseosas",
      "Cerveza": "Cerveza"
    }
  },
  en: {
    slogan: "FISH & GRILLS",
    marquee: "THE TRUE TASTE OF THE SEA • THE TASTE YOU LOVE • FRESH EVERY DAY • ",
    searchPlaceholder: "Search dishes...",
    tuPedido: "Your Order",
    articulos: "Items",
    verPedido: "View Order",
    miPedido: "My Order",
    subtotal: "Subtotal",
    totalPagar: "Total to pay",
    enviarWhatsApp: "Send Order to WhatsApp",
    holaAymar: "*Hello Aymar, I'd like to place an order:*",
    totalMsg: "TOTAL",
    delivery: "Delivery",
    taper: "Container",
    descripcion_escolar: "Choice of: Seafood Rice or Seafood Chaufa",
    descripcion_acompanamiento: "With Stuffed Potato, Corn Tortilla or Huancaína Potato",
    medio_litro: "1/2 Liter",
    un_litro: "1 Liter",
    categorias: {
      "PLATOS PERSONALES": "PERSONAL DISHES",
      "FUENTES PARA COMPARTIR": "SHARING PLATTERS",
      "ADICIONALES": "SIDES",
      "BEBIDAS NATURALES": "NATURAL DRINKS",
      "Gaseosas": "Sodas",
      "Cerveza": "Beer"
    }
  }
};

const DELIVERY_COST = 4;
const TAPER_COST = 2;

const menuData = {
  "PLATOS PERSONALES": [
    { nombre: { es: "Ceviche clásico", en: "Classic Ceviche" }, descripcion: "descripcion_acompanamiento", precio: "S/ 10" },
    { nombre: { es: "Ceviche de tollo", en: "Tollo Ceviche" }, descripcion: "descripcion_acompanamiento", precio: "S/ 20" },
    { nombre: { es: "Ceviche mixto", en: "Mixed Ceviche" }, descripcion: "descripcion_acompanamiento", precio: "S/ 25" },
    { nombre: { es: "Leche de tigre", en: "Tiger's Milk" }, descripcion: "Con Papa rellena o Tortita de choclo", precio: "S/ 15" },
    { nombre: { es: "Ceviche clásico + Chicharrón", en: "Classic Ceviche + Fried Fish" }, precio: "S/ 25" },
    { nombre: { es: "Ceviche clásico + Arroz/Chaufa", en: "Classic Ceviche + Rice/Chaufa" }, descripcion: "descripcion_escolar", precio: "S/ 25" },
    { nombre: { es: "Ceviche Tollo + Arroz/Chaufa", en: "Tollo Ceviche + Rice/Chaufa" }, descripcion: "descripcion_escolar", precio: "S/ 27" },
    { nombre: { es: "Ceviche mixto + Arroz/Chaufa", en: "Mixed Ceviche + Rice/Chaufa" }, descripcion: "descripcion_escolar", precio: "S/ 30" },
    { nombre: { es: "Ceviche de conchas negras", en: "Black Clams Ceviche" }, precio: "S/ 25" },
    { nombre: { es: "Trío Aymar", en: "Aymar Trio" }, descripcion: "Ceviche clásico, Chicharrón, Arroz o Chaufa", precio: "S/ 35" },
    { nombre: { es: "Ronda marina", en: "Marine Platter" }, descripcion: "Ceviche, Chicharrón, Leche de tigre, Arroz o Chaufa y Tortita", precio: "S/ 45" },
    { nombre: { es: "Sudado Parihuela", en: "Parihuela Stew" }, precio: "S/ 25" },
    { nombre: { es: "Chicharrón de pescado", en: "Fried Fish" }, precio: "S/ 25" },
    { nombre: { es: "Chicharrón mixto", en: "Mixed Fried Seafood" }, precio: "S/ 25" },
    { nombre: { es: "Arroz con mariscos", en: "Seafood Rice" }, precio: "S/ 25" },
    { nombre: { es: "Chaufa de mariscos", en: "Seafood Chaufa" }, precio: "S/ 25" },
    { nombre: { es: "Chaufa amazónico", en: "Amazonian Chaufa" }, precio: "S/ 25" }
  ],
  "FUENTES PARA COMPARTIR": [
    { nombre: { es: "Ceviche de pescado", en: "Fish Ceviche" }, precio: "s/40" },
    { nombre: { es: "Ceviche mixto", en: "Mixed Ceviche" }, precio: "s/45" },
    { nombre: { es: "Chicharrón de pescado", en: "Fried Fish" }, precio: "s/40" },
    { nombre: { es: "Chicharrón mixto", en: "Mixed Fried Seafood" }, precio: "s/45" },
    { nombre: { es: "Arroz con mariscos", en: "Seafood Rice" }, precio: "s/40" },
    { nombre: { es: "Chaufa de mariscos", en: "Seafood Chaufa" }, precio: "s/40" },
    { nombre: { es: "Dúo Marino Aymar", en: "Aymar Marine Duo" }, precio: "s/50" },
    { nombre: { es: "Trio Marino Aymar", en: "Aymar Marine Trio" }, precio: "s/60" },
    { nombre: { es: "Sudado Parihuela", en: "Parihuela Stew" }, precio: "s/40" }
  ],
  "ADICIONALES": [
    { nombre: { es: "Papa rellena", en: "Stuffed Potato" }, precio: "s/5" },
    { nombre: { es: "Tortilla de choclo", en: "Corn Tortilla" }, precio: "s/4" },
    { nombre: { es: "Yucas fritas", en: "Fried Cassava" }, precio: "s/5" },
    { nombre: { es: "Camote", en: "Sweet Potato" }, precio: "s/4" },
    { nombre: { es: "Arroz blanco", en: "White Rice" }, precio: "s/4" },
    { nombre: { es: "Palabritas", en: "Small Clams" }, precio: "s/10" },
    { nombre: { es: "Papa a la huancaina", en: "Huancaína Potato" }, precio: "s/8" }
  ],
  "BEBIDAS NATURALES": [
    { nombre: { es: "Chicha Morada", en: "Chicha Morada" }, precio: { es: "s/6 - s/12", en: "s/6 - s/12" }, variants: true },
    { nombre: { es: "Maracuyá", en: "Passion Fruit" }, precio: { es: "s/6 - s/12", en: "s/6 - s/12" }, variants: true },
    { nombre: { es: "Chicha de Jora", en: "Chicha de Jora" }, precio: { es: "s/6 - s/12", en: "s/6 - s/12" }, variants: true }
  ],
  "Gaseosas": [
    { nombre: { es: "Inca Kola Pers.", en: "Pers. Inca Kola" }, precio: "s/3" },
    { nombre: { es: "Inca Kola", en: "Inca Kola" }, precio: "s/5 - s/10" },
    { nombre: { es: "Coca Cola", en: "Coca Cola" }, precio: "s/5 - s/10" },
    { nombre: { es: "Gordita", en: "Gordita Soda" }, precio: "s/6" },
    { nombre: { es: "Agua Mineral", en: "Mineral Water" }, precio: "s/3" }
  ],
  "Cerveza": [
    { nombre: { es: "Pilsen", en: "Pilsen" }, precio: "s/10" },
    { nombre: { es: "Cuzqueña", en: "Cuzqueña" }, precio: "s/11" }
  ]
};

const getImageForDish = (name: string, catId: string = "") => {
  const isFuente = catId === "FUENTES PARA COMPARTIR";
  const images: Record<string, string> = {
    "Ceviche clásico": "/Ceviche clásico.jpg",
    "Ceviche de pescado": "/ceviche de pescado fuente.png",
    "Ceviche de tollo": "/ceviche_de_tollo.jpeg",
    "Ceviche mixto_personal": "/ceviche_mixto_personal.jpeg",
    "Ceviche mixto_fuente": "/Ceviche mixto fuente .png",
    "Leche de tigre": "/Leche de tigre.jpeg",
    "Ceviche clásico + Chicharrón": "/ceviche clasico + chicharron.png",
    "Ceviche clásico + Arroz/Chaufa": "/Ceviche clásico + ArrozChaufa.png",
    "Ceviche Tollo + Arroz/Chaufa": "/Ceviche Tollo + ArrozChaufa.png",
    "Ceviche mixto + Arroz/Chaufa": "/Ceviche mixto + ArrozChaufa.png",
    "Ceviche de conchas negras": "/Ceviche de conchas negras.png",
    "Trío Aymar": "/trio aymar.png",
    "Ronda marina": "/ronda_marina.jpeg",
    "Sudado Parihuela": "/sudado_parihuela.jpeg",
    "Chicharrón de pescado": "/Chicharron de pescado.jpeg",
    "Chicharrón mixto": "/chicharron_mixto.jpeg",
    "Arroz con mariscos": "/arroz_con_mariscos.jpeg",
    "Chaufa de mariscos": "/chaufa_mariscos.jpeg",
    "Chaufa amazónico": "/chaufa_amazonico.jpeg",
    "Dúo Marino Aymar": "/duo_marino.jpeg",
    "Trio Marino Aymar": "/trio marino aymar.png",
    "Papa a la huancaina": "/papa a la huancaina.png",
    "Papa rellena": "/papa rellena.png",
    "Tortilla de choclo": "/Tortilla de choclo.png",
    "Yucas fritas": "/yuca frita.png",
    "Camote": "/camote.png",
    "Arroz blanco": "/arroz blanco.jpg",
    "Palabritas": "/Palabritas.png",
    "Chicha Morada": "/chicha morada.png",
    "Maracuyá": "/Maracuya.jpg",
    "Chicha de Jora": "/chicha de jora.png",
    "Inca Kola Pers.": "/inka cola pers.webp",
    "Inca Kola": "/Inka Cola.webp",
    "Coca Cola": "/cocacola.webp",
    "Gordita": "/gordita.jpeg",
    "Agua Mineral": "/agua mineral.jpg",
    "Pilsen": "/pilsen.jpg",
    "Cuzqueña": "/cuzquena.jpg",
  };

  const key = name === "Ceviche mixto" ? `Ceviche mixto_${isFuente ? 'fuente' : 'personal'}` : name;
  if (images[key]) return images[key];

  const lowerName = name.toLowerCase();
  
  if (lowerName.includes('ceviche') || lowerName.includes('leche') || lowerName.includes('chiringuito') || lowerName.includes('marino') || lowerName.includes('hilo')) return "/Ceviche clasico.jpeg";
  if (lowerName.includes('chicharrón') || lowerName.includes('pellejito')) return "/Chicharron de pescado.jpeg";
  if (lowerName.includes('arroz') || lowerName.includes('chaufa')) return "/arroz_con_mariscos.jpeg";
  if (lowerName.includes('sudado') || lowerName.includes('parihuela')) return "/sudado_parihuela.jpeg";
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
  hasTaper: boolean;
}

export default function App() {
  const [lang, setLang] = useState<Language>('es');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showSummary, setShowSummary] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const t = translations[lang];

  const cartCount = useMemo(() => cart.reduce((acc, item) => acc + item.cantidad, 0), [cart]);

  const addToCart = (item: any, catId: string) => {
    const nombreStr = item.nombre[lang];
    let precioStr = item.precio;
    if (typeof precioStr === 'object') {
      precioStr = precioStr[lang];
    }
    if (!precioStr && item.variants) {
      precioStr = "s/6"; // Default for drinks if not specified
    }
    
    setCart(prev => {
      const existing = prev.find(i => i.nombre === nombreStr && i.precio === precioStr);
      if (existing) {
        return prev.map(i => (i.nombre === nombreStr && i.precio === precioStr) ? { ...i, cantidad: i.cantidad + 1 } : i);
      }
      return [...prev, { 
        nombre: nombreStr, 
        precio: precioStr || "0", 
        cantidad: 1,
        hasTaper: !["BEBIDAS NATURALES", "Gaseosas", "Cerveza"].includes(catId)
      }];
    });
  };

  const updateQuantity = (nombre: string, precio: string, delta: number) => {
    setCart(prev => prev.map(i => {
      if (i.nombre === nombre && i.precio === precio) {
        const newQty = i.cantidad + delta;
        return newQty > 0 ? { ...i, cantidad: newQty } : null;
      }
      return i;
    }).filter(Boolean) as CartItem[]);
  };

  const calculateSubtotal = () => {
    return cart.reduce((acc, item) => {
      const precioStr = item.precio.replace(/[^\d.]/g, '');
      const precio = parseFloat(precioStr) || 0;
      return acc + (precio * item.cantidad);
    }, 0);
  };

  const calculateTaper = () => {
    return cart.reduce((acc, item) => acc + (item.hasTaper ? item.cantidad * TAPER_COST : 0), 0);
  };

  const calculateTotal = () => {
    return calculateSubtotal() + DELIVERY_COST + calculateTaper();
  };

  const sendToWhatsApp = () => {
    const subtotal = calculateSubtotal();
    const taper = calculateTaper();
    const total = calculateTotal();
    let message = `${t.holaAymar}\n\n`;
    cart.forEach(item => {
      message += `• ${item.cantidad} x ${item.nombre} (${item.precio})\n`;
    });
    message += `\n*${t.subtotal}: S/ ${subtotal.toFixed(2)}*`;
    message += `\n*${t.delivery}: S/ ${DELIVERY_COST.toFixed(2)}*`;
    message += `\n*${t.taper}: S/ ${taper.toFixed(2)}*`;
    message += `\n\n*${t.totalMsg}: S/ ${total.toFixed(2)}*`;
    
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const getTranslatedDescription = (desc: string) => {
    if (!desc) return null;
    if (desc === "descripcion_acompanamiento") return t.descripcion_acompanamiento;
    if (desc === "descripcion_escolar") return t.descripcion_escolar;
    // For bespoke descriptions, check if it's a key or just text. 
    // Usually these are strings from the data
    return desc;
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen relative shadow-2xl overflow-hidden flex flex-col font-sans">
      
      <header className="sticky top-0 bg-white z-50 px-4 py-3 flex justify-between items-center bg-white/90 backdrop-blur-md">
        <div className="flex gap-2">
            <motion.button 
              onClick={() => setLang('es')}
              whileTap={{ scale: 0.9 }}
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${lang === 'es' ? 'bg-aymar-cyan text-white' : 'bg-gray-100 text-gray-500'}`}
            >
              ES
            </motion.button>
            <motion.button 
              onClick={() => setLang('en')}
              whileTap={{ scale: 0.9 }}
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${lang === 'en' ? 'bg-aymar-cyan text-white' : 'bg-gray-100 text-gray-500'}`}
            >
              EN
            </motion.button>
        </div>
        
        <div className="flex flex-col items-center">
            <h1 className="font-logo italic text-3xl text-aymar-cyan leading-none font-bold tracking-tight">Aymar</h1>
            <span className="text-[10px] font-sans text-gray-500 tracking-[0.2em] font-medium mt-1 uppercase">{t.slogan}</span>
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
          {[...Array(12)].map((_, i) => (
            <span key={i}>{t.marquee}</span>
          ))}
        </div>
      </div>

      <main className="flex-1 overflow-y-auto pb-32">
        <div className="p-4">
          <div className="relative w-full h-64 rounded-3xl overflow-hidden shadow-xl">
            <img 
              src="/banner.png" 
              alt="Aymar Hero" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute inset-0 flex flex-col justify-end p-6">
               <div className="bg-aymar-cyan text-white text-[10px] font-bold px-3 py-1.5 rounded-lg w-fit mb-3 uppercase tracking-wider">
                  {t.slogan}
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
               placeholder={t.searchPlaceholder}
               className="bg-transparent border-none outline-none text-[15px] font-sans w-full text-gray-700 placeholder:text-gray-400"
             />
           </div>
        </div>

        <div className="px-4">
          {Object.entries(menuData).map(([catId, items], catIdx) => (
             <div key={catIdx} className="mb-10">
                <div className="flex items-center gap-3 mb-6">
                   <Flame className="text-aymar-red" size={28} fill="currentColor" />
                   <h3 className="font-bold text-aymar-cyan text-2xl tracking-tight uppercase">{(t.categorias as any)[catId] || catId}</h3>
                </div>

                <div className="grid grid-cols-2 gap-4">
                   {items.map((item: any, idx: number) => (
                      <motion.div 
                        key={idx}
                        whileHover={{ y: -5 }}
                        className="bg-white rounded-[2rem] overflow-hidden flex flex-col shadow-md border border-gray-50"
                      >
                         <div className="relative aspect-square bg-gray-100 cursor-zoom-in" onClick={() => setSelectedImage(getImageForDish(item.nombre.es, catId))}>
                            <img src={getImageForDish(item.nombre.es, catId)} alt={item.nombre[lang]} className="w-full h-full object-cover" />
                         </div>
                         <div className="p-4 flex flex-col flex-grow">
                            <h4 className="font-bold text-aymar-dark text-[14px] leading-snug mb-1 flex-grow">{item.nombre[lang]}</h4>
                            {item.descripcion && (
                              <p className="text-[10px] text-gray-400 mb-2 leading-tight">
                                {getTranslatedDescription(item.descripcion)}
                              </p>
                            )}
                            <div className="flex justify-between items-center mt-2">
                               <span className="font-bold text-aymar-dark text-lg">
                                  {typeof item.precio === 'object' ? item.precio[lang] : (item.precio || (item.variants ? "S/ 6 - S/ 12" : ""))}
                               </span>
                               <motion.button 
                                 whileTap={{ scale: 0.8 }}
                                 onClick={() => addToCart(item, catId)}
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
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t.tuPedido}</p>
                  <p className="font-bold text-aymar-dark text-lg">{cartCount} {t.articulos}</p>
                </div>
              </div>
              <button 
                onClick={() => setShowSummary(true)}
                className="bg-aymar-cyan text-white px-6 py-3 rounded-2xl flex items-center gap-3 shadow-lg shadow-aymar-cyan/30"
              >
                <span className="font-bold text-sm">{t.verPedido}</span>
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
                   <h2 className="font-title text-2xl font-bold text-aymar-dark">{t.miPedido}</h2>
                   <button onClick={() => setShowSummary(false)} className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center">
                      <X size={20} className="text-gray-400" />
                   </button>
                </div>
                
                <div className="space-y-4 mb-8">
                   {cart.map(item => (
                      <div key={`${item.nombre}-${item.precio}`} className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl">
                         <div className="flex-1">
                            <h4 className="font-bold text-aymar-dark text-sm">{item.nombre}</h4>
                            <p className="text-xs text-aymar-cyan font-bold">{item.precio}</p>
                         </div>
                         <div className="flex items-center gap-3 bg-white px-3 py-1.5 rounded-xl border border-gray-100">
                            <button onClick={() => updateQuantity(item.nombre, item.precio, -1)} className="text-gray-400"><Minus size={16} /></button>
                            <span className="font-bold text-sm w-4 text-center">{item.cantidad}</span>
                            <button onClick={() => updateQuantity(item.nombre, item.precio, 1)} className="text-aymar-cyan"><Plus size={16} /></button>
                         </div>
                         <button onClick={() => updateQuantity(item.nombre, item.precio, -item.cantidad)} className="text-red-300 ml-1">
                            <Trash2 size={18} />
                         </button>
                      </div>
                   ))}
                </div>

                 <div className="border-t border-dashed border-gray-200 pt-6 mb-8">
                    <div className="flex justify-between items-center mb-2">
                       <span className="text-gray-400 font-medium">{t.subtotal}</span>
                       <span className="font-bold text-aymar-dark">S/ {calculateSubtotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                       <span className="text-gray-400 font-medium">{(t as any).delivery}</span>
                       <span className="font-bold text-aymar-dark">S/ {DELIVERY_COST.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                       <span className="text-gray-400 font-medium">{(t as any).taper}</span>
                       <span className="font-bold text-aymar-dark">S/ {calculateTaper().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                       <h3 className="text-xl font-bold text-aymar-dark">{t.totalPagar}</h3>
                       <h3 className="text-xl font-bold text-aymar-cyan">S/ {calculateTotal().toFixed(2)}</h3>
                    </div>
                 </div>

                <button 
                  onClick={sendToWhatsApp}
                  className="w-full bg-[#25D366] text-white py-4 rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-green-100 hover:scale-[1.02] transition-transform"
                >
                   <span className="font-bold">{t.enviarWhatsApp}</span>
                   <ChevronRight size={20} />
                </button>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-full max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedImage} 
                alt="Preview" 
                className="max-w-full max-h-[85vh] rounded-3xl shadow-2xl object-contain border-4 border-white/20" 
              />
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute -top-4 -right-4 w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center shadow-xl hover:bg-red-600 transition-colors border-4 border-white"
              >
                <X size={28} strokeWidth={3} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
