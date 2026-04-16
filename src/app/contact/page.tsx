'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/AnimatedSection';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Redirect to WhatsApp with form data
    const message = encodeURIComponent(
      `*New Enquiry from Swara Website*\n\n*Name:* ${form.name}\n*Phone:* ${form.phone}\n*Email:* ${form.email}\n*Subject:* ${form.subject}\n*Message:* ${form.message}`
    );
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      window.open(`https://wa.me/919876543210?text=${message}`, '_blank');
    }, 1000);
  };

  const contactInfo = [
    {
      icon: Phone,
      label: 'Phone / WhatsApp',
      value: '+91 98765 43210',
      href: 'tel:+919876543210',
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'hello@swara.fashion',
      href: 'mailto:hello@swara.fashion',
    },
    {
      icon: MapPin,
      label: 'Store Address',
      value: 'Swara Ethnic Wear\nYour Street, Your City\nIndia — 400001',
      href: 'https://maps.google.com',
    },
    {
      icon: Clock,
      label: 'Store Hours',
      value: 'Mon – Sat: 10:00 AM – 8:00 PM\nSunday: 11:00 AM – 6:00 PM',
      href: null,
    },
  ];

  return (
    <div className="page-enter">

      {/* Hero */}
      <section className="relative h-64 md:h-80 overflow-hidden bg-brand-900">
        <Image
          src="/images/Shop Images/Shop front pic.webp"
          alt="Contact Swara"
          fill
          className="object-cover opacity-30"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-950/50 to-brand-950/85" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <p className="section-label text-gold-400 mb-3">Get In Touch</p>
          <h1 className="font-cormorant text-5xl md:text-6xl text-cream font-light">Contact Us</h1>
          <div className="ornament-divider max-w-xs mx-auto mt-4">
            <span className="font-cormorant text-gold-500 text-xl">✦</span>
          </div>
          <div className="flex items-center gap-2 mt-5 font-jost text-xs text-brand-400">
            <Link href="/" className="hover:text-gold-400">Home</Link>
            <span>/</span>
            <span className="text-cream">Contact</span>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section-padding bg-cream">
        <div className="container-xl grid md:grid-cols-2 gap-12">

          {/* ── Contact Info ── */}
          <AnimatedSection direction="left">
            <div className="space-y-8">
              <div>
                <p className="section-label mb-3">Reach Out</p>
                <h2 className="font-cormorant text-4xl text-brand-900 font-light leading-tight">
                  We'd Love to<br />
                  <span className="italic text-brand-600">Hear From You</span>
                </h2>
                <div className="flex items-center gap-3 mt-4">
                  <span className="block w-10 h-0.5 bg-gold-500" />
                  <span className="text-gold-500">✦</span>
                </div>
                <p className="font-jost text-brand-500 text-sm mt-5 leading-relaxed">
                  Whether you're looking for your dream bridal outfit, need help with sizing, or simply want to know more about our collections — we're here for you. Chat with us, call us, or walk into our store!
                </p>
              </div>

              {/* Contact details */}
              <StaggerContainer className="space-y-5">
                {contactInfo.map((info) => {
                  const Icon = info.icon;
                  const content = (
                    <div className="flex items-start gap-4 p-5 bg-white rounded-xl border border-brand-50 hover:shadow-glass transition-shadow duration-300">
                      <div className="w-10 h-10 bg-brand-50 rounded-full flex items-center justify-center shrink-0">
                        <Icon size={18} className="text-brand-600" />
                      </div>
                      <div>
                        <p className="font-jost text-[10px] text-brand-400 tracking-widest uppercase mb-1">{info.label}</p>
                        <p className="font-cormorant text-lg text-brand-800 whitespace-pre-line">{info.value}</p>
                      </div>
                    </div>
                  );
                  return (
                    <StaggerItem key={info.label}>
                      {info.href ? (
                        <a href={info.href} target={info.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
                          {content}
                        </a>
                      ) : (
                        content
                      )}
                    </StaggerItem>
                  );
                })}
              </StaggerContainer>

              {/* WhatsApp direct */}
              <a
                href="https://wa.me/919876543210?text=Hi%20Swara!%20I%27d%20love%20to%20know%20more%20about%20your%20collections."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 w-full bg-[#25D366] text-white font-jost font-medium text-sm tracking-widest uppercase py-4 px-6 justify-center hover:bg-[#1ebe5d] transition-colors duration-200 shadow-[0_4px_20px_rgba(37,211,102,0.25)]"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Chat Directly on WhatsApp
              </a>
            </div>
          </AnimatedSection>

          {/* ── Contact Form ── */}
          <AnimatedSection direction="right" delay={0.2}>
            <div className="bg-white rounded-2xl shadow-glass p-8">
              <h3 className="font-cormorant text-3xl text-brand-900 font-light mb-2">Send Us a Message</h3>
              <p className="font-jost text-xs text-brand-400 mb-7">We'll get back to you within 24 hours.</p>

              {submitted ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-12"
                >
                  <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
                  <h4 className="font-cormorant text-2xl text-brand-900 mb-2">Message Sent!</h4>
                  <p className="font-jost text-sm text-brand-500">
                    We've received your message and will get back to you very soon. Check your WhatsApp too!
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: '', phone: '', email: '', subject: '', message: '' }); }}
                    className="mt-6 btn-outline text-xs"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="font-jost text-[10px] text-brand-500 tracking-widest uppercase block mb-1.5">Name *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="w-full font-jost text-sm text-brand-800 border border-brand-200 px-4 py-3 rounded-lg bg-brand-50/30 focus:border-brand-500 focus:bg-white focus:outline-none transition-all placeholder-brand-300"
                      />
                    </div>
                    <div>
                      <label className="font-jost text-[10px] text-brand-500 tracking-widest uppercase block mb-1.5">Phone *</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+91 XXXXX XXXXX"
                        className="w-full font-jost text-sm text-brand-800 border border-brand-200 px-4 py-3 rounded-lg bg-brand-50/30 focus:border-brand-500 focus:bg-white focus:outline-none transition-all placeholder-brand-300"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="font-jost text-[10px] text-brand-500 tracking-widest uppercase block mb-1.5">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="w-full font-jost text-sm text-brand-800 border border-brand-200 px-4 py-3 rounded-lg bg-brand-50/30 focus:border-brand-500 focus:bg-white focus:outline-none transition-all placeholder-brand-300"
                    />
                  </div>
                  <div>
                    <label className="font-jost text-[10px] text-brand-500 tracking-widest uppercase block mb-1.5">Subject *</label>
                    <select
                      name="subject"
                      required
                      value={form.subject}
                      onChange={handleChange}
                      className="w-full font-jost text-sm text-brand-800 border border-brand-200 px-4 py-3 rounded-lg bg-brand-50/30 focus:border-brand-500 focus:bg-white focus:outline-none transition-all"
                    >
                      <option value="">Select a subject</option>
                      <option>Bridal Enquiry</option>
                      <option>Custom Stitching</option>
                      <option>Product Enquiry</option>
                      <option>Sizing Help</option>
                      <option>Order Status</option>
                      <option>General Question</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-jost text-[10px] text-brand-500 tracking-widest uppercase block mb-1.5">Message *</label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us about your requirements…"
                      className="w-full font-jost text-sm text-brand-800 border border-brand-200 px-4 py-3 rounded-lg bg-brand-50/30 focus:border-brand-500 focus:bg-white focus:outline-none transition-all placeholder-brand-300 resize-none"
                    />
                  </div>
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full btn-primary justify-center py-4 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-cream/30 border-t-cream rounded-full animate-spin" />
                        Sending…
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send size={14} />
                        Send Message via WhatsApp
                      </span>
                    )}
                  </motion.button>
                  <p className="font-jost text-[10px] text-brand-400 text-center">
                    By submitting, you'll be redirected to WhatsApp to send your message.
                  </p>
                </form>
              )}
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
