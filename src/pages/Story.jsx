import React from 'react';

const Story = () => {
    return (
        <div className="bg-primary min-h-screen">
            {/* Hero for Story */}
            <div className="relative h-[60vh] flex items-center justify-center bg-stone-900 overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1608226487820-22123d242963?q=80&w=1470&auto=format&fit=crop"
                    alt="Candle making"
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                />
                <div className="relative z-10 text-center text-white px-4">
                    <h1 className="font-serif text-5xl md:text-7xl mb-4">Our Story</h1>
                    <p className="text-lg md:text-xl font-light tracking-wide">Crafting moments of peace in a busy world.</p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-20 sm:px-6 lg:px-8 space-y-20">

                <section className="text-center">
                    <h2 className="font-serif text-3xl text-charcoal mb-8">The Beginning</h2>
                    <p className="text-text/80 leading-loose text-lg">
                        It started with a simple desire: to slow down. In a world that constantly demands our attention, we wanted to create something that invites you to pause, breathe, and just be.
                        Our candles are born from this philosophy of "slow living" — taking the time to appreciate the small, quiet moments that make life beautiful.
                    </p>
                </section>

                <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="aspect-auto">
                        <img src="https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=1287&auto=format&fit=crop" alt="Ingredients" className="w-full h-full object-cover shadow-lg" />
                    </div>
                    <div className="space-y-6">
                        <h3 className="font-serif text-2xl text-charcoal">Intentionally Crafted</h3>
                        <p className="text-text/80 leading-relaxed">
                            We believe that what you bring into your home matters. That's why we use only simple, high-quality ingredients.
                            Our wax is a sustainable soy blend, our wicks are lead-free cotton-core, and our fragrances are free from phthalates and harsh chemicals.
                        </p>
                        <p className="text-text/80 leading-relaxed">
                            Each candle is hand-poured in small batches in our studio, ensuring that every single one meets our standards of excellence.
                        </p>
                    </div>
                </section>

                <section className="text-center bg-secondary/30 p-12 rounded-sm">
                    <h3 className="font-serif text-2xl text-charcoal mb-4">The "Lagom" Philosophy</h3>
                    <p className="text-text/80 leading-relaxed italic">
                        "Not too little, not too much. Just right."
                    </p>
                    <p className="text-text/80 leading-relaxed mt-4">
                        We draw inspiration from the Swedish concept of Lagom. We strive for balance in everything we do — from the strength of our scents to the simplicity of our design.
                    </p>
                </section>

            </div>
        </div>
    );
};

export default Story;
