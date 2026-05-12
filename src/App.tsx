/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Mail, 
  Globe, 
  MapPin, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  ExternalLink
} from 'lucide-react';

export default function App() {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');
    setErrorMessage('');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      offer: formData.get('offer'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send inquiry');
      }

      setFormStatus('success');
    } catch (err) {
      console.error('Form Submission Error:', err);
      setFormStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-sage-200 selection:text-sage-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-sage-50/80 backdrop-blur-md border-b border-sage-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-sage-600 rounded-full flex items-center justify-center">
              <Sparkles className="text-white w-5 h-5" />
            </div>
            <span className="font-serif text-2xl font-semibold tracking-tight">yogasorrento.it</span>
          </div>
          <a 
            href="#contact" 
            className="hidden sm:inline-flex items-center gap-2 bg-sage-900 text-white px-6 py-2.5 rounded-full hover:bg-sage-800 transition-colors font-medium text-sm"
          >
            Make an Offer
          </a>
        </div>
      </nav>

      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-24 lg:py-32">
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sage-100 text-sage-700 text-xs font-bold uppercase tracking-widest mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sage-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-sage-500"></span>
                </span>
                Premium Domain For Sale
              </div>
              <h1 className="text-6xl lg:text-8xl font-serif leading-[0.9] mb-8">
                Own the Digital Heart of <span className="italic text-sage-600">Sorrento Yoga</span>
              </h1>
              <p className="text-xl text-sage-600 max-w-lg mb-10 leading-relaxed">
                A rare opportunity to acquire <span className="font-semibold text-sage-900">yogasorrento.it</span>. 
                The perfect digital address for a wellness retreat, studio, or luxury travel brand in Italy's most iconic coastal destination.
              </p>
              <div className="flex flex-wrap gap-4">
                <a 
                  href="#contact" 
                  className="bg-sage-900 text-white px-8 py-4 rounded-full hover:bg-sage-800 transition-all flex items-center gap-2 group shadow-lg shadow-sage-900/10"
                >
                  Inquire Now
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a 
                  href="#value" 
                  className="bg-white border border-sage-200 text-sage-900 px-8 py-4 rounded-full hover:bg-sage-50 transition-all"
                >
                  Why this domain?
                </a>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1920&auto=format&fit=crop" 
                  alt="Yoga at sunset" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-sage-950/40 to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8 p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/60 text-xs uppercase tracking-widest font-bold mb-1">Domain Status</p>
                      <p className="text-white text-xl font-serif italic">Available for Transfer</p>
                    </div>
                    <Globe className="text-white w-8 h-8 opacity-50" />
                  </div>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-sage-200 rounded-full blur-3xl opacity-50 -z-10"></div>
              <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-sage-300 rounded-full blur-3xl opacity-30 -z-10"></div>
            </motion.div>
          </div>
        </section>

        {/* Value Props */}
        <section id="value" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-20">
              <h2 className="text-4xl lg:text-5xl font-serif mb-6">Why yogasorrento.it?</h2>
              <p className="text-sage-600">A premium domain is more than just an address—it's the foundation of your brand's authority and search engine visibility.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              {[
                {
                  icon: <MapPin className="w-6 h-6" />,
                  title: "Location Authority",
                  desc: "Sorrento is a world-renowned destination. Owning this domain positions you as the primary authority for yoga in the region."
                },
                {
                  icon: <Globe className="w-6 h-6" />,
                  title: "SEO Advantage",
                  desc: "The .it extension is essential for targeting the Italian market and ranks higher in local search results for wellness tourism."
                },
                {
                  icon: <CheckCircle2 className="w-6 h-6" />,
                  title: "Brand Clarity",
                  desc: "Short, memorable, and descriptive. It tells your customers exactly who you are and where you are before they even click."
                }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-8 rounded-3xl bg-sage-50 border border-sage-100 hover:border-sage-300 transition-all"
                >
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 text-sage-600">
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-serif mb-4">{item.title}</h3>
                  <p className="text-sage-600 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 lg:py-32 bg-sage-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-white rounded-[48px] overflow-hidden shadow-xl border border-sage-200 grid lg:grid-cols-2">
              <div className="p-12 lg:p-20 bg-sage-900 text-white flex flex-col justify-between">
                <div>
                  <h2 className="text-4xl lg:text-5xl font-serif mb-8">Ready to elevate your brand?</h2>
                  <p className="text-sage-300 text-lg mb-12 leading-relaxed">
                    Serious inquiries only. We are open to offers and can facilitate a secure transfer via recognized domain escrow services.
                  </p>
                  
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                        <Mail className="w-5 h-5 text-sage-300" />
                      </div>
                      <div>
                        <p className="text-xs text-sage-400 uppercase tracking-widest font-bold">Email Us</p>
                        <p className="text-lg">info@yogasorrento.it</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                        <ExternalLink className="w-5 h-5 text-sage-300" />
                      </div>
                      <div>
                        <p className="text-xs text-sage-400 uppercase tracking-widest font-bold">Transfer Method</p>
                        <p className="text-lg">Escrow.com</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-12 lg:p-20">
                {formStatus === 'success' ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="h-full flex flex-col items-center justify-center text-center"
                  >
                    <div className="w-20 h-20 bg-sage-100 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle2 className="w-10 h-10 text-sage-600" />
                    </div>
                    <h3 className="text-3xl font-serif mb-4">Inquiry Received</h3>
                    <p className="text-sage-600 mb-8">Thank you for your interest. We will get back to you within 24-48 hours.</p>
                    <button 
                      onClick={() => setFormStatus('idle')}
                      className="text-sage-900 font-semibold underline underline-offset-4"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {formStatus === 'error' && (
                      <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm">
                        {errorMessage}
                      </div>
                    )}
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-sage-700">Full Name</label>
                        <input 
                          required
                          name="name"
                          type="text" 
                          placeholder="John Doe"
                          className="w-full px-4 py-3 rounded-xl border border-sage-200 focus:outline-none focus:ring-2 focus:ring-sage-500/20 focus:border-sage-500 transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-sage-700">Email Address</label>
                        <input 
                          required
                          name="email"
                          type="email" 
                          placeholder="john@example.com"
                          className="w-full px-4 py-3 rounded-xl border border-sage-200 focus:outline-none focus:ring-2 focus:ring-sage-500/20 focus:border-sage-500 transition-all"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-sage-700">Your Offer (Optional)</label>
                      <input 
                        name="offer"
                        type="text" 
                        placeholder="e.g. €2,500"
                        className="w-full px-4 py-3 rounded-xl border border-sage-200 focus:outline-none focus:ring-2 focus:ring-sage-500/20 focus:border-sage-500 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-sage-700">Message</label>
                      <textarea 
                        required
                        name="message"
                        rows={4}
                        placeholder="Tell us about your project or ask a question..."
                        className="w-full px-4 py-3 rounded-xl border border-sage-200 focus:outline-none focus:ring-2 focus:ring-sage-500/20 focus:border-sage-500 transition-all resize-none"
                      ></textarea>
                    </div>
                    <button 
                      disabled={formStatus === 'submitting'}
                      className="w-full bg-sage-900 text-white py-4 rounded-xl font-semibold hover:bg-sage-800 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {formStatus === 'submitting' ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Sending...
                        </>
                      ) : 'Submit Inquiry'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-sage-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Sparkles className="text-sage-600 w-5 h-5" />
            <span className="font-serif text-xl font-semibold">yogasorrento.it</span>
          </div>
          <p className="text-sage-500 text-sm">
            © {new Date().getFullYear()} YogaSorrento. All rights reserved.
          </p>
          <p className="text-sage-400 text-xs">
            Site created by <a href="https://soiposerivices.com" target="_blank" rel="noopener noreferrer" className="hover:text-sage-600 underline underline-offset-2">SoipoServices</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
