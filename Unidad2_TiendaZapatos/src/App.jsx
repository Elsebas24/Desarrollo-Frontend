// src/App.jsx
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ImageGallery from './components/ImageGallery';
import ColorSelector from './components/ColorSelector';
import SizeSelector from './components/SizeSelector';
import TechnicalSpecs from './components/TechnicalSpecs';
import CartDrawer from './components/CartDrawer';
import { PRODUCTS } from './data/shoesData';
import { Truck, RotateCcw, Shield, Star, Check } from 'lucide-react';

const CART_STORAGE_KEY = 'salomon-lab-cart';

// Desafío 1: lee el carrito guardado (si no existe o está corrupto, empieza vacío)
const loadCart = () => {
  try {
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

export default function App() {
  const [activeProduct, setActiveProduct] = useState(PRODUCTS[0]);
  const [activeVariant, setActiveVariant] = useState(PRODUCTS[0].variants[0]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [cart, setCart] = useState(loadCart);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  // Desafío 1: guarda el carrito en localStorage cada vez que cambia
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  // Desafío 3: al cambiar de silueta se reinician color y talla
  const handleSelectProduct = (product) => {
    setActiveProduct(product);
    setActiveVariant(product.variants[0]);
    setSelectedSize(null);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Por favor selecciona una talla antes de añadir a la bolsa.");
      return;
    }

    const newItem = {
      id: activeProduct.id,
      name: activeProduct.name,
      color: activeVariant.colorName,
      size: selectedSize.eur,
      price: activeProduct.price,
      image: activeVariant.thumbnail,
      quantity: 1
    };

    setCart((prev) => [...prev, newItem]);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 2000);
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (index) => {
    const updated = [...cart];
    updated.splice(index, 1);
    setCart(updated);
  };

  return (
    <div className="min-h-screen bg-[#FBFBFB] flex flex-col font-sans">
      <Navbar
        cartCount={cart.length}
        onOpenCart={() => setIsCartOpen(true)}
        products={PRODUCTS}
        activeProductId={activeProduct.id}
        activeCategory={activeProduct.category}
        onSelectProduct={handleSelectProduct}
      />

      {/* Breadcrumb técnico estilo Salomon */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 w-full text-[11px] font-mono text-neutral-500 uppercase tracking-wider flex items-center gap-2">
        <a href="#" className="hover:text-black">Calzado</a>
        <span>/</span>
        <a href="#" className="hover:text-black">{activeProduct.category}</a>
        <span>/</span>
        <span className="text-neutral-900 font-bold">{activeProduct.shortName}</span>
      </div>

      {/* Contenedor Principal: Layout Asimétrico Salomon */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Columna Izquierda: Galería Inmersiva (7 columnas en desktop) */}
          <section className="lg:col-span-7">
            <ImageGallery
              key={activeVariant.id}
              images={activeVariant.images} 
              productName={activeProduct.name} 
            />
          </section>

          {/* Columna Derecha: Panel de Compra y Datos Técnicos (5 columnas) */}
          <section className="lg:col-span-5 flex flex-col justify-start">
            <div className="sticky top-24 space-y-6">
              
              {/* Badge & Título */}
              <div className="space-y-1.5">
                <span className="inline-block bg-neutral-900 text-white text-[9px] font-mono font-bold tracking-widest px-2 py-0.5 uppercase rounded-sm">
                  {activeProduct.badge}
                </span>
                <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-neutral-950 font-mono">
                  {activeProduct.name}
                </h1>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  {activeProduct.subtitle}
                </p>

                {/* Rating & Reviews */}
                <div className="flex items-center gap-2 pt-1">
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs font-mono font-bold">{activeProduct.rating}</span>
                  <span className="text-xs text-neutral-400">({activeProduct.reviewsCount} opiniones verificadas)</span>
                </div>
              </div>

              {/* Precio */}
              <div className="text-2xl font-mono font-bold text-neutral-950">
                {activeProduct.price.toFixed(2)} €
                <span className="text-[11px] font-sans font-normal text-neutral-500 ml-2">IVA incluido</span>
              </div>

              {/* Selector de Variante Cromática */}
              <ColorSelector 
                variants={activeProduct.variants} 
                activeVariant={activeVariant} 
                onSelectVariant={(variant) => {
                  setActiveVariant(variant);
                  setSelectedSize(null); // Reset de talla al cambiar modelo
                }} 
              />

              {/* Selector de Tallas */}
              <SizeSelector 
                sizes={activeProduct.sizes} 
                selectedSize={selectedSize} 
                onSelectSize={setSelectedSize} 
              />

              {/* Botón de Añadir a la Bolsa */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={handleAddToCart}
                  className={`w-full py-4 px-6 rounded font-mono font-bold text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 ${
                    addedAnimation
                      ? 'bg-emerald-600 text-white'
                      : 'bg-neutral-950 hover:bg-red-600 text-white shadow-lg hover:shadow-red-600/20'
                  }`}
                >
                  {addedAnimation ? (
                    <>
                      <Check className="w-4 h-4" /> AÑADIDO A LA BOLSA
                    </>
                  ) : (
                    'AÑADIR A LA BOLSA'
                  )}
                </button>
              </div>

              {/* Garantías Salomon */}
              <div className="grid grid-cols-3 gap-2 py-4 border-y border-neutral-200 text-center font-mono text-[10px] text-neutral-600">
                <div className="flex flex-col items-center gap-1">
                  <Truck className="w-4 h-4 text-neutral-800" />
                  <span>Envío 24/48h</span>
                </div>
                <div className="flex flex-col items-center gap-1 border-x border-neutral-200">
                  <RotateCcw className="w-4 h-4 text-neutral-800" />
                  <span>Devolución 30d</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Shield className="w-4 h-4 text-neutral-800" />
                  <span>Garantía S/LAB</span>
                </div>
              </div>

              {/* Ficha técnica y acordeón */}
              <TechnicalSpecs 
                technologies={activeProduct.technologies} 
                specs={activeProduct.specs} 
              />

            </div>
          </section>

        </div>
      </main>

      {/* Drawer Carrito */}
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cart} 
        onRemoveItem={handleRemoveFromCart} 
      />

      {/* Footer Técnico */}
      <footer className="bg-neutral-950 text-neutral-400 mt-20 border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono">
          <p>© 2026 SALOMON LAB PROJECT — Práctica Académica de Ingeniería Web.</p>
          <div className="flex gap-6 uppercase tracking-wider">
            <span className="hover:text-white cursor-pointer">Privacidad</span>
            <span className="hover:text-white cursor-pointer">Términos</span>
            <span className="hover:text-white cursor-pointer">Soporte Técnico</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
