"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Phone, Mail, MapPin, Globe, ChevronDown, Menu, X,
  Shield, Zap, Award, Users, Lightbulb, HeartHandshake,
  FlaskConical, PackageCheck, Truck, Microscope, Factory,
  CheckCircle2, ArrowRight, Star, Send, Building2, TrendingUp,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════
   ANIMATION VARIANTS
═══════════════════════════════════════════════════════════ */
const FU = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.68, ease: "easeOut" } },
};
const FL = {
  hidden: { opacity: 0, x: -52 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.68, ease: "easeOut" } },
};
const FR = {
  hidden: { opacity: 0, x: 52 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.68, ease: "easeOut" } },
};
const SC = {
  hidden: { opacity: 0, scale: 0.82 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.58, ease: "easeOut" } },
};
const ST = { visible: { transition: { staggerChildren: 0.13 } } };

/* ═══════════════════════════════════════════════════════════
   COUNT-UP HOOK
═══════════════════════════════════════════════════════════ */
function useCountUp(end: number, dur = 2400, go = false) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!go) return;
    let f = 0;
    const frames = Math.round((dur / 1000) * 60);
    const id = setInterval(() => {
      f++;
      const p = f / frames;
      setN(Math.min(Math.round((1 - Math.pow(1 - p, 3)) * end), end));
      if (f >= frames) clearInterval(id);
    }, 1000 / 60);
    return () => clearInterval(id);
  }, [go, end, dur]);
  return n;
}

/* ═══════════════════════════════════════════════════════════
   NAVBAR
═══════════════════════════════════════════════════════════ */
const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Vision", href: "#vision" },
  { label: "Products", href: "#products" },
  { label: "Why Us", href: "#why-us" },
  { label: "Manufacturing", href: "#manufacturing" },
  { label: "Clients", href: "#clients" },
  { label: "Contact", href: "#contact" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 70);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-400 ${scrolled ? "bg-white/96 backdrop-blur-xl shadow-card border-b border-navy-100" : "bg-transparent"
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <button onClick={() => go("#home")} className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-full overflow-hidden flex items-center justify-center shadow-navy group-hover:scale-105 transition-transform border border-navy-100/30">
              <img src="/logo.png" alt="Panchajanya Logo" className="object-cover w-full h-full scale-[1.42] -translate-y-[11%]" />
            </div>
            <div className="text-left">
              <div className={`font-display font-black text-base leading-none transition-colors ${scrolled ? "text-navy-800" : "text-white"}`}>
                PANCHAJANYA
              </div>
              <div className={`text-xs font-medium leading-none mt-0.5 transition-colors ${scrolled ? "text-gold-600" : "text-gold-400"}`}>
                25 Years of Trust &amp; Quality
              </div>
            </div>
          </button>

          {/* Desktop */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {NAV_LINKS.map((l) => (
              <button
                key={l.href}
                onClick={() => go(l.href)}
                className={`px-3 py-2 rounded-lg text-[13px] font-semibold transition-all ${scrolled
                    ? "text-navy-700 hover:text-navy-900 hover:bg-navy-50"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={() => go("#contact")}
              className="ml-3 px-5 py-2.5 gradient-gold text-navy-950 font-bold rounded-xl text-sm hover:opacity-90 transition-all hover:scale-105 shadow-gold"
            >
              Enquire Now
            </button>
          </nav>

          {/* Mobile */}
          <button
            onClick={() => setOpen(!open)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${scrolled ? "text-navy-700 hover:bg-navy-50" : "text-white hover:bg-white/10"}`}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            className="lg:hidden overflow-hidden bg-white border-t border-navy-100"
          >
            <div className="px-4 py-4 space-y-1 max-h-[70vh] overflow-y-auto">
              {NAV_LINKS.map((l) => (
                <button
                  key={l.href}
                  onClick={() => go(l.href)}
                  className="w-full text-left px-4 py-3 rounded-xl text-sm font-semibold text-navy-700 hover:text-navy-900 hover:bg-navy-50 transition-all"
                >
                  {l.label}
                </button>
              ))}
              <button
                onClick={() => go("#contact")}
                className="w-full mt-2 px-4 py-3 gradient-gold text-navy-950 text-sm font-bold rounded-xl hover:opacity-90"
              >
                Enquire Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION 1 — HERO
═══════════════════════════════════════════════════════════ */
function HeroSection() {
  const scroll = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="home" className="relative min-h-screen flex items-center gradient-hero overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 pattern-dots-light opacity-30" />
      <div className="absolute top-20 right-0 w-[500px] h-[500px] rounded-full bg-navy-500/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-gold-500/8 blur-3xl animate-float" />
      <div className="absolute top-40 left-[30%] w-[300px] h-[300px] rounded-full bg-navy-400/8 blur-2xl animate-float-alt" />

      {/* Floating accent cards */}
      <motion.div
        animate={{ y: [0, -14, 0], rotate: [0, 4, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-28 right-[6%] hidden xl:flex items-center gap-3 glass rounded-2xl px-5 py-3.5"
      >
        <div className="w-8 h-8 rounded-lg gradient-gold flex items-center justify-center"><Award size={16} className="text-navy-950" /></div>
        <div>
          <div className="text-white font-bold text-sm">ISO 9001:2015 </div>
          <div className="text-white/50 text-xs">Certified Company</div>
        </div>
      </motion.div>
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-36 right-[8%] hidden xl:flex items-center gap-3 glass rounded-2xl px-5 py-3.5"
      >
        <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
          <TrendingUp size={16} className="text-emerald-400" />
        </div>
        <div>
          <div className="text-white font-bold text-sm">25+ Years</div>
          <div className="text-white/50 text-xs">Of Excellence</div>
        </div>
      </motion.div>
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
        className="absolute top-44 left-[5%] hidden xl:flex items-center gap-3 glass rounded-2xl px-5 py-3.5"
      >
        <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center">
          <Users size={16} className="text-blue-300" />
        </div>
        <div>
          <div className="text-white font-bold text-sm">500+ Clients</div>
          <div className="text-white/50 text-xs">Across India</div>
        </div>
      </motion.div>

      {/* Hero content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <motion.div variants={ST} initial="hidden" animate="visible" className="max-w-4xl mx-auto text-center">

          {/* Badge */}
          <motion.div variants={SC} className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full glass mb-8">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} size={11} fill="#e8b84b" className="text-gold-400" />)}
            </div>
            <span className="text-gold-300 text-sm font-semibold tracking-wide">Established 2002 • Premium Manufacturer</span>
          </motion.div>

          {/* Headline */}
          <motion.h1 variants={FU} className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-black text-white leading-none mb-5">
            25 Years of
            <br />
            <span className="text-gradient-gold">Trust &amp; Quality</span>
          </motion.h1>

          {/* Sub */}
          <motion.p variants={FU} className="text-lg sm:text-xl md:text-2xl text-navy-200/80 leading-relaxed mb-10 max-w-3xl mx-auto font-light">
            Pioneering manufacturer and marketer of{" "}
            <span className="text-white font-medium">animal feed supplements</span>,{" "}
            <span className="text-white font-medium">cleaning products</span>,{" "}
            <span className="text-white font-medium">livestock solutions</span> and{" "}
            <span className="text-white font-medium">human wellness products</span>.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={FU} className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scroll("#contact")}
              className="group px-8 py-4 gradient-gold text-navy-950 font-black rounded-2xl hover:opacity-90 transition-all hover:scale-105 shadow-gold flex items-center justify-center gap-3 text-base"
            >
              <Phone size={18} />
              Contact Us
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => scroll("#about")}
              className="px-8 py-4 glass border border-white/20 text-white font-bold rounded-2xl hover:bg-white/15 transition-all text-base"
            >
              Learn More
            </button>
          </motion.div>

          {/* Stats strip */}
          <motion.div variants={FU} className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { n: "25+", label: "Years Experience" },
              { n: "500+", label: "Clients Served" },
              { n: "10+", label: "Product Categories" },
              { n: "Pan India", label: "Distribution" },
            ].map((s) => (
              <div key={s.label} className="glass rounded-2xl py-5 px-4 text-center hover:bg-white/15 transition-all">
                <div className="text-2xl md:text-3xl font-display font-black text-gold-400">{s.n}</div>
                <div className="text-xs text-navy-300 font-medium mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => scroll("#about")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-navy-400 hover:text-white transition-colors group"
      >
        <span className="text-[10px] font-semibold uppercase tracking-widest opacity-60 group-hover:opacity-100">Scroll</span>
        <ChevronDown size={20} className="animate-scroll" />
      </button>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION 2 — ABOUT
═══════════════════════════════════════════════════════════ */
function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" ref={ref} className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <motion.div variants={FL} initial="hidden" animate={inView ? "visible" : "hidden"}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-navy-50 border border-navy-100 mb-6">
              <Building2 size={12} className="text-navy-600" />
              <span className="text-navy-700 text-xs font-bold uppercase tracking-widest">About Panchajanya</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-navy-900 leading-tight mb-6">
              A Legacy Built on
              <br />
              <span className="text-gradient-navy">Quality &amp; Innovation</span>
            </h2>

            <div className="divider-gold mb-8" />

            <p className="text-navy-600 text-lg leading-relaxed mb-5">
              Founded in 2002, Panchajanya has grown from a passionate startup into one of India&apos;s most trusted
              manufacturing and marketing companies. With over two decades of expertise, we specialise in
              designing, formulating and bringing to market high-performance products across four key sectors.
            </p>
            <p className="text-navy-500 leading-relaxed mb-8">
              Our philosophy is simple — every product we create must deliver real, measurable value to our clients.
              We combine deep technical expertise with a relentless commitment to innovation, quality and customer
              satisfaction to build long-lasting partnerships across India.
            </p>

            {/* Feature highlights */}
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: <FlaskConical size={18} />, title: "Design & Formulation", desc: "In-house R&D for all products" },
                { icon: <Shield size={18} />, title: "Quality Driven", desc: "Rigorous multi-stage testing" },
                { icon: <Lightbulb size={18} />, title: "Innovation First", desc: "Continuously improving solutions" },
                { icon: <Users size={18} />, title: "Customer Focused", desc: "Long-term partnerships" },
              ].map((f) => (
                <div key={f.title} className="flex items-start gap-3 p-4 rounded-2xl bg-navy-50 border border-navy-100 hover:border-navy-200 transition-all group">
                  <div className="w-9 h-9 rounded-xl gradient-navy flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform">
                    {f.icon}
                  </div>
                  <div>
                    <div className="font-bold text-navy-800 text-sm">{f.title}</div>
                    <div className="text-navy-500 text-xs mt-0.5">{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right */}
          <motion.div variants={FR} initial="hidden" animate={inView ? "visible" : "hidden"} className="space-y-5">

            {/* Establishment card */}
            <div className="relative overflow-hidden rounded-3xl gradient-navy-dark p-8 text-white shadow-navy">
              <div className="absolute inset-0 pattern-dots-light opacity-20" />
              <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-gold-500/10 blur-2xl" />
              <div className="relative z-10">
                <div className="text-gold-400 text-sm font-bold uppercase tracking-widest mb-3">Since 2002</div>
                <div className="text-6xl font-display font-black text-white mb-2">25 <span className="text-gold-400">+</span></div>
                <div className="text-navy-200 text-lg font-semibold mb-4">Years of Trust &amp; Quality</div>
                <div className="divider-white mb-5" />
                <p className="text-navy-300 text-sm leading-relaxed">
                  A journey built on technical excellence, innovative formulations, and an unwavering commitment to our customers&apos; success.
                </p>
              </div>
            </div>

            {/* 4 sectors */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: "🧪", title: "Animal Feed Supplements", color: "bg-blue-50 border-blue-100" },
                { icon: "🧹", title: "Cleaning Products", color: "bg-emerald-50 border-emerald-100" },
                { icon: "🐄", title: "Livestock Solutions", color: "bg-amber-50 border-amber-100" },
                { icon: "🌿", title: "Human Wellness", color: "bg-rose-50 border-rose-100" },
              ].map((s) => (
                <div key={s.title} className={`p-5 rounded-2xl border ${s.color} hover:shadow-card transition-all`}>
                  <div className="text-3xl mb-2">{s.icon}</div>
                  <div className="font-bold text-navy-800 text-sm leading-tight">{s.title}</div>
                </div>
              ))}
            </div>

            {/* Technical expertise strip */}
            <div className="p-5 rounded-2xl bg-gold-50 border border-gold-200">
              <div className="flex items-center gap-2 mb-3">
                <Award size={16} className="text-gold-600" />
                <span className="font-bold text-navy-800 text-sm">Technical Expertise</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {["ICAR Certified Products", "Patented Formulations", "Lab Tested", "Vet Approved"].map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full bg-white border border-gold-200 text-xs font-semibold text-navy-700">
                    ✓ {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION 3 — VISION & MISSION
═══════════════════════════════════════════════════════════ */
function VisionMissionSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-70px" });

  return (
    <section id="vision" ref={ref} className="py-24 md:py-32 gradient-section pattern-dots">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div variants={ST} initial="hidden" animate={inView ? "visible" : "hidden"} className="text-center mb-16">
          <motion.div variants={SC} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-navy-50 border border-navy-100 mb-5">
            <Star size={12} className="text-gold-500" fill="currentColor" />
            <span className="text-navy-700 text-xs font-bold uppercase tracking-widest">Our Purpose</span>
          </motion.div>
          <motion.h2 variants={FU} className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-navy-900 mb-4">
            Vision &amp; <span className="text-gradient-navy">Mission</span>
          </motion.h2>
          <motion.div variants={SC} className="divider-gold mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-7">
          {/* Vision */}
          <motion.div
            variants={FL}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            whileHover={{ y: -6 }}
            className="relative overflow-hidden rounded-3xl gradient-navy p-9 text-white shadow-navy"
          >
            <div className="absolute inset-0 pattern-dots-light opacity-20" />
            <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-gold-500/12 blur-2xl" />
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl gradient-gold flex items-center justify-center mb-6 shadow-gold">
                <Star size={26} className="text-navy-950" fill="currentColor" />
              </div>
              <div className="text-gold-400 text-sm font-bold uppercase tracking-widest mb-3">Our Vision</div>
              <h3 className="font-display font-black text-2xl text-white mb-5 leading-snug">
                Become a Leading &amp; Respected Industry Name
              </h3>
              <div className="divider-white mb-5" />
              <p className="text-navy-100 leading-relaxed">
                We aspire to be recognized globally as an industry leader defined by excellence, innovation and
                unwavering trust — a name that our clients, partners and communities can rely on for generations.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["Excellence", "Innovation", "Trust", "Leadership"].map((t) => (
                  <span key={t} className="px-3 py-1.5 rounded-full glass text-xs font-semibold text-gold-300 border border-gold-500/20">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Mission */}
          <motion.div
            variants={FR}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="space-y-4"
          >
            <div className="p-7 rounded-3xl bg-white border border-navy-100 shadow-soft">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl gradient-gold flex items-center justify-center shadow-gold">
                  <Zap size={22} className="text-navy-950" />
                </div>
                <div>
                  <div className="text-gold-600 text-xs font-bold uppercase tracking-widest">Our Mission</div>
                  <h3 className="font-display font-black text-navy-900 text-lg">What Drives Us Every Day</h3>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { icon: <CheckCircle2 size={18} className="text-emerald-600" />, text: "Deliver reliable, high-performance products that create real value for our clients." },
                  { icon: <CheckCircle2 size={18} className="text-emerald-600" />, text: "Ensure timely delivery and consistent product quality with every order." },
                  { icon: <CheckCircle2 size={18} className="text-emerald-600" />, text: "Drive continuous innovation in formulations, processes and packaging." },
                  { icon: <CheckCircle2 size={18} className="text-emerald-600" />, text: "Build long-term, trust-based relationships with every client and partner." },
                ].map((m, i) => (
                  <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl hover:bg-navy-50 transition-all">
                    <div className="shrink-0 mt-0.5">{m.icon}</div>
                    <p className="text-navy-700 text-sm leading-relaxed">{m.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Values */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: "🎯", label: "Precision" },
                { icon: "🤝", label: "Trust" },
                { icon: "💡", label: "Innovation" },
                { icon: "⚡", label: "Efficiency" },
                { icon: "🌿", label: "Quality" },
                { icon: "🏆", label: "Excellence" },
              ].map((v) => (
                <div key={v.label} className="p-4 rounded-2xl bg-white border border-navy-100 text-center hover:border-gold-300 hover:shadow-gold transition-all group">
                  <div className="text-2xl mb-1.5">{v.icon}</div>
                  <div className="text-xs font-bold text-navy-700 group-hover:text-navy-900">{v.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const WHY_CARDS = [
  { icon: <Award size={28} />, title: "25+ Years Experience", desc: "Over two decades of deep expertise in manufacturing, formulation and agricultural product marketing.", accent: "from-blue-50 to-blue-100", iconBg: "bg-blue-600" },
  { icon: <Shield size={28} />, title: "Quality Assurance", desc: "Every product passes stringent multi-stage quality control with lab testing and third-party verification.", accent: "from-emerald-50 to-emerald-100", iconBg: "bg-emerald-600" },
  { icon: <Microscope size={28} />, title: "Technical Expertise", desc: "Our team of scientists and engineers bring cutting-edge formulation and manufacturing knowledge.", accent: "from-gold-50 to-gold-100", iconBg: "bg-gold-600" },
  { icon: <HeartHandshake size={28} />, title: "Trusted Partnerships", desc: "Preferred supplier to industry giants including Cargill, Kemin, Nandini and Bharat Electronics.", accent: "from-rose-50 to-rose-100", iconBg: "bg-rose-600" },
  { icon: <Lightbulb size={28} />, title: "Innovation Driven", desc: "We continuously invest in R&D to bring patented, ICAR-certified and next-generation formulations.", accent: "from-purple-50 to-purple-100", iconBg: "bg-purple-600" },
  { icon: <Users size={28} />, title: "Customer Focus", desc: "Dedicated account support, timely delivery and long-term partnerships are the cornerstone of our service.", accent: "from-navy-50 to-navy-100", iconBg: "bg-navy-700" },
];

function WhyChooseSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="why-us" ref={ref} className="py-24 md:py-32 gradient-section pattern-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div variants={ST} initial="hidden" animate={inView ? "visible" : "hidden"} className="text-center mb-16">
          <motion.div variants={SC} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-navy-100 mb-5">
            <Star size={12} fill="currentColor" className="text-gold-500" />
            <span className="text-navy-700 text-xs font-bold uppercase tracking-widest">Why Choose Panchajanya</span>
          </motion.div>
          <motion.h2 variants={FU} className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-navy-900 mb-4">
            The Panchajanya <span className="text-gradient-gold">Advantage</span>
          </motion.h2>
          <motion.div variants={SC} className="divider-gold mx-auto mb-4" />
          <motion.p variants={FU} className="text-navy-500 text-lg max-w-xl mx-auto">
            Six compelling reasons why India&apos;s leading companies choose us as their trusted manufacturing partner.
          </motion.p>
        </motion.div>

        <motion.div variants={ST} initial="hidden" animate={inView ? "visible" : "hidden"} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_CARDS.map((c) => (
            <motion.div
              key={c.title}
              variants={FU}
              whileHover={{ y: -7, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 280, damping: 18 }}
              className={`relative p-7 rounded-3xl bg-gradient-to-br ${c.accent} border-2 border-transparent hover:border-navy-200 transition-all duration-300 group overflow-hidden cursor-default`}
            >
              <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full bg-white/40 group-hover:scale-150 transition-transform duration-500" />
              <div className={`w-14 h-14 rounded-2xl ${c.iconBg} flex items-center justify-center text-white mb-5 shadow-lg group-hover:scale-110 transition-transform`}>
                {c.icon}
              </div>
              <h3 className="font-display font-black text-navy-900 text-lg mb-3">{c.title}</h3>
              <p className="text-navy-600 text-sm leading-relaxed">{c.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION 6 — MANUFACTURING EXCELLENCE
═══════════════════════════════════════════════════════════ */
const MFG_STEPS = [
  { num: "01", icon: <Microscope size={22} />, title: "Research & Development", desc: "Our scientists study market needs, regulatory requirements and scientific literature to design superior formulations that solve real problems." },
  { num: "02", icon: <FlaskConical size={22} />, title: "Product Design", desc: "From concept to prototype — our team designs product formulas, packaging and delivery systems optimised for efficacy and shelf life." },
  { num: "03", icon: <Shield size={22} />, title: "Quality Testing", desc: "Every batch undergoes 50+ quality checkpoints including NABL lab testing, stability studies and safety validation before production." },
  { num: "04", icon: <Factory size={22} />, title: "Manufacturing", desc: "GMP-certified manufacturing under strict quality standards ensures consistent product integrity and full regulatory compliance." },
  { num: "05", icon: <PackageCheck size={22} />, title: "Packaging", desc: "Premium, tamper-evident, food-grade packaging protects product integrity and delivers professional shelf appeal at every stage." },
  { num: "06", icon: <Truck size={22} />, title: "Delivery", desc: "Reliable, on-time delivery across India — directly to distributors, retailers and institutional clients with full traceability." },
];

function ManufacturingSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="manufacturing" ref={ref} className="py-24 md:py-32 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #1a0010 0%, #040203ff 40%, #090406ff 75%, #13050bff 100%)" }}>
      <div className="absolute inset-0 pattern-dots-light opacity-15" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-gold-500/8 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-navy-400/10 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={ST} initial="hidden" animate={inView ? "visible" : "hidden"} className="text-center mb-16">
          <motion.div variants={SC} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass mb-5">
            <Factory size={13} className="text-gold-400" />
            <span className="text-gold-300 text-xs font-bold uppercase tracking-widest">Manufacturing Process</span>
          </motion.div>
          <motion.h2 variants={FU} className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-white mb-4">
            Manufacturing <span className="text-gradient-gold">Excellence</span>
          </motion.h2>
          <motion.div variants={SC} className="divider-gold mx-auto mb-4" />
          <motion.p variants={FU} className="text-navy-300 text-lg max-w-xl mx-auto">
            Our six-step manufacturing process ensures every product meets the highest standards of quality and reliability.
          </motion.p>
        </motion.div>

        {/* Timeline grid */}
        <motion.div variants={ST} initial="hidden" animate={inView ? "visible" : "hidden"} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
          {MFG_STEPS.map((s) => (
            <motion.div
              key={s.num}
              variants={FU}
              whileHover={{ scale: 1.03, y: -4 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="group p-7 rounded-3xl glass border border-white/10 hover:border-gold-500/30 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="flex-shrink-0 w-13 h-13 w-12 h-12 rounded-xl bg-gold-500/15 border border-gold-500/25 flex items-center justify-center">
                  <span className="text-gold-400 font-display font-black text-lg">{s.num}</span>
                </div>
                <div className="text-gold-400 group-hover:text-gold-300 transition-colors">{s.icon}</div>
              </div>
              <h3 className="font-display font-black text-white text-base mb-3">{s.title}</h3>
              <p className="text-navy-300/80 text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Cert strip */}
        <motion.div variants={FU} initial="hidden" animate={inView ? "visible" : "hidden"} className="flex flex-wrap justify-center gap-4">
          {["🏅 GMP Certified", "✅ ISO 9001:2015", "🔬 NABL Lab Tested", "🌿 ICAR Certified", "📋 FSSAI Licensed", "🏭 WHO-GMP"].map((c) => (
            <div key={c} className="px-5 py-2.5 rounded-full glass border border-gold-500/20 text-sm font-semibold text-gold-300">
              {c}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION 7 — COMPANY STATS
═══════════════════════════════════════════════════════════ */
function StatsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const c1 = useCountUp(25, 2000, inView);
  const c2 = useCountUp(500, 2200, inView);
  const c3 = useCountUp(10, 1800, inView);
  const c4 = useCountUp(11, 2000, inView);

  return (
    <section ref={ref} className="py-20 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #060d19 0%, #0d1f3c 50%, #1a3c5e 100%)" }}>
      <div className="absolute inset-0 pattern-dots opacity-10" />
      <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/10 blur-2xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { count: c1, suffix: "+", label: "Years of Trust", sub: "Since 2005", icon: "🏆" },
            { count: c2, suffix: "+", label: "Clients Served", sub: "Across India", icon: "🤝" },
            { count: c3, suffix: "+", label: "Product Categories", sub: "Growing portfolio", icon: "📦" },
            { count: c4, suffix: "+", label: "Industry Sectors", sub: "Diverse expertise", icon: "🌐" },
          ].map((s) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-center p-7 rounded-3xl bg-white/8 border border-white/10 hover:bg-white/12 transition-all hover:-translate-y-2"
            >
              <div className="text-4xl mb-3">{s.icon}</div>
              <div className="text-4xl md:text-5xl font-display font-black text-gold-400 mb-1">
                {s.count}{s.suffix}
              </div>
              <div className="font-display font-bold text-white text-sm mb-0.5">{s.label}</div>
              <div className="text-navy-300 text-xs">{s.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION 8 — OUR CLIENTS (CAROUSEL)
═══════════════════════════════════════════════════════════ */
const CLIENTS = [
  { name: "Cargill", sector: "Agribusiness", logo: "🌾" },
  { name: "Kemin", sector: "Life Sciences", logo: "🔬" },
  { name: "Nandini", sector: "Dairy", logo: "🥛" },
  { name: "Geltec", sector: "Veterinary", logo: "💊" },
  { name: "QuadraGen", sector: "Biotechnology", logo: "🧬" },
  { name: "Ken", sector: "Agriculture", logo: "🌱" },
  { name: "Multiplex", sector: "Agro-chemicals", logo: "⚗️" },
  { name: "Rufa Vet", sector: "Veterinary", logo: "🐄" },
  { name: "Bharat Electronics", sector: "Defence & Govt", logo: "🏛️" },
  { name: "108 Emergency", sector: "Healthcare", logo: "🚑" },
  { name: "Tropicool", sector: "Consumer Goods", logo: "❄️" },
];

function ClientsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const doubled = [...CLIENTS, ...CLIENTS]; // for seamless loop

  return (
    <section id="clients" ref={ref} className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div variants={ST} initial="hidden" animate={inView ? "visible" : "hidden"} className="text-center mb-14">
          <motion.div variants={SC} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-navy-50 border border-navy-100 mb-5">
            <Users size={12} className="text-navy-600" />
            <span className="text-navy-700 text-xs font-bold uppercase tracking-widest">Our Esteemed Clients</span>
          </motion.div>
          <motion.h2 variants={FU} className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-navy-900 mb-4">
            Trusted by <span className="text-gradient-gold">Industry Leaders</span>
          </motion.h2>
          <motion.div variants={SC} className="divider-gold mx-auto mb-4" />
          <motion.p variants={FU} className="text-navy-500 text-lg max-w-xl mx-auto">
            From global agribusiness giants to national institutions — our clients represent the best of Indian industry.
          </motion.p>
        </motion.div>

        {/* Carousel */}
        <div className="overflow-hidden relative mb-12">
          {/* Left fade */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
          {/* Right fade */}
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />

          <div className="flex animate-carousel" style={{ width: "max-content" }}>
            {doubled.map((c, i) => (
              <div
                key={`${c.name}-${i}`}
                className="flex-shrink-0 mx-3 w-52 p-5 rounded-2xl bg-navy-50 border border-navy-100 hover:border-gold-300 hover:shadow-gold transition-all group"
              >
                <div className="text-4xl mb-3 text-center">{c.logo}</div>
                <div className="font-display font-black text-navy-900 text-sm text-center mb-1">{c.name}</div>
                <div className="text-xs text-navy-400 text-center">{c.sector}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Client grid — static for clarity */}
        <motion.div
          variants={ST}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
        >
          {CLIENTS.slice(0, 6).map((c) => (
            <motion.div
              key={c.name}
              variants={FU}
              whileHover={{ y: -4, scale: 1.04 }}
              className="p-5 rounded-2xl bg-navy-50 border border-navy-100 hover:border-gold-300 hover:shadow-gold transition-all text-center group"
            >
              <div className="text-4xl mb-2">{c.logo}</div>
              <div className="font-bold text-navy-800 text-xs">{c.name}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust strip */}
        <motion.div variants={FU} initial="hidden" animate={inView ? "visible" : "hidden"} className="mt-10 p-6 rounded-2xl bg-navy-900 text-center">
          <p className="text-navy-300 text-sm font-medium">
            <span className="text-gold-400 font-bold">11 marquee brands</span> across Agribusiness, Dairy, Veterinary, Defence, Healthcare and Consumer Goods —
            <span className="text-white font-semibold"> all trust Panchajanya</span>.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION 9 — CONTACT
═══════════════════════════════════════════════════════════ */
function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState<string | null>(null);

  const handleEnquirySelect = (type: string) => {
    setSelectedEnquiry(type);
    setForm((f) => ({ ...f, message: `I'm interested in: ${type}. ` }));
    document.querySelector("#contact-form")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = [
      `🐾 *New Enquiry from Panchajanya Website*`,
      ``,
      `👤 *Name:* ${form.name}`,
      form.company ? `🏢 *Company:* ${form.company}` : null,
      `📧 *Email:* ${form.email}`,
      form.phone ? `📞 *Phone:* ${form.phone}` : null,
      selectedEnquiry ? `📋 *Enquiry Type:* ${selectedEnquiry}` : null,
      ``,
      `💬 *Message:*`,
      form.message,
    ].filter(Boolean).join("\n");
    const url = `https://wa.me/917406365606?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
    setSent(true);
  };

  return (
    <section id="contact" ref={ref} className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div variants={ST} initial="hidden" animate={inView ? "visible" : "hidden"} className="text-center mb-16">
          <motion.div variants={SC} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-navy-50 border border-navy-100 mb-5">
            <Mail size={12} className="text-navy-600" />
            <span className="text-navy-700 text-xs font-bold uppercase tracking-widest">Get In Touch</span>
          </motion.div>
          <motion.h2 variants={FU} className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-navy-900 mb-4">
            Contact <span className="text-gradient-navy">Panchajanya</span>
          </motion.h2>
          <motion.div variants={SC} className="divider-gold mx-auto mb-4" />
          <motion.p variants={FU} className="text-navy-500 text-lg max-w-xl mx-auto">
            Ready to discuss a partnership, product enquiry or distributor arrangement? Our team responds within 24 hours.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* Left — Info */}
          <motion.div variants={FL} initial="hidden" animate={inView ? "visible" : "hidden"} className="space-y-6">

            <div className="relative overflow-hidden rounded-3xl gradient-navy-dark p-9 text-white shadow-navy">
              <div className="absolute inset-0 pattern-dots-light opacity-15" />
              <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-gold-500/10 blur-3xl" />
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl gradient-gold flex items-center justify-center">
                    <Building2 size={26} className="text-navy-950" />
                  </div>
                  <div>
                    <div className="font-display font-black text-xl">PANCHAJANYA</div>
                    <div className="text-gold-400 text-sm">25 Years of Trust &amp; Quality</div>
                  </div>
                </div>
                <div className="divider-white mb-6" />
                <div className="space-y-5">
                  {[
                    { icon: <Phone size={17} />, label: "Phone", val: "+91 74063 65606‬", href: "tel:+9174063 65606‬" },
                    { icon: <Mail size={17} />, label: "Email", val: "info@panchajanyagroup.com", href: "mailto:info@panchajanyagroup.com" },
                    { icon: <Globe size={17} />, label: "Website", val: "www.panchajanyagroup.com", href: "https://www.panchajanyagroup.com" },
                    { icon: <MapPin size={17} />, label: "Office", val: "Bengaluru, Karnataka, India", href: "#" },
                  ].map((i) => (
                    <a key={i.label} href={i.href} className="flex items-start gap-4 group" target={i.label === "Website" ? "_blank" : undefined} rel="noreferrer">
                      <div className="w-9 h-9 rounded-xl bg-white/12 flex items-center justify-center flex-shrink-0 group-hover:bg-white/22 transition-all">
                        {i.icon}
                      </div>
                      <div>
                        <div className="text-navy-400 text-xs font-bold uppercase tracking-wider">{i.label}</div>
                        <div className="text-white text-sm font-medium group-hover:text-gold-300 transition-colors">{i.val}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Enquiry types */}
            <div className="p-6 rounded-2xl bg-navy-900 border border-navy-700">
              <h4 className="font-display font-bold text-white text-sm mb-4">How can we help you?</h4>
              <p className="text-navy-400 text-xs mb-3">Click one to pre-fill your enquiry</p>
              <div className="grid grid-cols-2 gap-2">
                {["Product Enquiry", "Dealer Enquiry", "Private Label", "Bulk Orders", "Partnership", "Technical Support"].map((t) => (
                  <button
                    key={t}
                    onClick={() => handleEnquirySelect(t)}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all text-left ${
                      selectedEnquiry === t
                        ? "bg-gold-500 border-2 border-gold-300 text-navy-950 scale-[1.03] shadow-gold"
                        : "bg-navy-800 border border-navy-600 text-white hover:bg-navy-700 hover:border-gold-500 hover:scale-[1.02]"
                    }`}
                  >
                    <CheckCircle2 size={11} className={selectedEnquiry === t ? "text-navy-900" : "text-gold-400"} /> {t}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div variants={FR} initial="hidden" animate={inView ? "visible" : "hidden"}>
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center p-14 rounded-3xl bg-navy-50 border border-navy-100 h-full"
              >
                <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mb-5">
                  <CheckCircle2 size={40} className="text-emerald-600" />
                </div>
                <h3 className="font-display font-black text-2xl text-navy-900 mb-3">Enquiry Received!</h3>
                <p className="text-navy-500 mb-8">Thank you for reaching out. Our team will respond within 24 business hours.</p>
                <button
                  onClick={() => { setSent(false); setForm({ name: "", company: "", email: "", phone: "", message: "" }); }}
                  className="px-7 py-3 gradient-navy text-white font-bold rounded-xl hover:opacity-90 transition-all"
                >
                  Send Another
                </button>
              </motion.div>
            ) : (
              <form id="contact-form" onSubmit={submit} className="p-8 rounded-3xl bg-gray-50 border border-gray-100 space-y-5">
                <div>
                  <h3 className="font-display font-black text-navy-900 text-xl">Send an Enquiry</h3>
                  <p className="text-navy-400 text-sm mt-1">Fill the form — we&apos;ll get back within 24 hours.</p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { id: "name", label: "Full Name *", ph: "Your name", type: "text", req: true },
                    { id: "company", label: "Company Name", ph: "Your company", type: "text", req: false },
                  ].map((f) => (
                    <div key={f.id}>
                      <label className="block text-xs font-bold text-navy-500 uppercase tracking-wider mb-1.5">{f.label}</label>
                      <input
                        required={f.req}
                        type={f.type}
                        value={(form as Record<string, string>)[f.id]}
                        onChange={(e) => setForm({ ...form, [f.id]: e.target.value })}
                        placeholder={f.ph}
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent transition-all"
                      />
                    </div>
                  ))}
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { id: "email", label: "Email *", ph: "your@email.com", type: "email", req: true },
                    { id: "phone", label: "Phone", ph: "+91 XXXXX XXXXX", type: "tel", req: false },
                  ].map((f) => (
                    <div key={f.id}>
                      <label className="block text-xs font-bold text-navy-500 uppercase tracking-wider mb-1.5">{f.label}</label>
                      <input
                        required={f.req}
                        type={f.type}
                        value={(form as Record<string, string>)[f.id]}
                        onChange={(e) => setForm({ ...form, [f.id]: e.target.value })}
                        placeholder={f.ph}
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent transition-all"
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block text-xs font-bold text-navy-500 uppercase tracking-wider mb-1.5">Message *</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Product enquiry, dealer partnership, bulk orders — tell us your requirement..."
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-3 py-4 gradient-navy text-white font-black rounded-xl hover:opacity-90 transition-all hover:scale-[1.01] shadow-navy"
                >
                  <Send size={17} />
                  Send Enquiry
                </button>
                <p className="text-center text-xs text-navy-400">Opens WhatsApp to submit your enquiry </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════════════════════ */
function Footer() {
  const go = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer className="bg-[#060d19] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="relative w-12 h-12 rounded-full overflow-hidden flex items-center justify-center shadow-navy border border-navy-800/80">
                <img src="/logo.png" alt="Panchajanya Logo" className="object-cover w-full h-full scale-[1.42] -translate-y-[11%]" />
              </div>
              <div>
                <div className="font-display font-black text-xl text-white">PANCHAJANYA</div>
                <div className="text-gold-500 text-xs font-semibold">25 Years of Trust &amp; Quality</div>
              </div>
            </div>
            <p className="text-navy-400 text-sm leading-relaxed max-w-xs mb-5">
              Pioneering manufacturer and marketer of animal feed supplements, cleaning products, livestock solutions and human wellness products since 2002.
            </p>
            <a href="https://www.panchajanyagroup.com" target="_blank" rel="noreferrer" className="text-gold-500 text-sm font-semibold hover:text-gold-400 flex items-center gap-1.5 transition-colors">
              <Globe size={14} /> www.panchajanyagroup.com
            </a>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-display font-bold text-white text-xs uppercase tracking-widest mb-5">Navigation</h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <button
                    onClick={() => go(l.href)}
                    className="text-navy-400 hover:text-gold-400 text-sm transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight size={11} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-white text-xs uppercase tracking-widest mb-5">Contact</h4>
            <ul className="space-y-4">
              <li>
                <a href="tel:+919876543210" className="flex items-start gap-3 text-navy-400 hover:text-gold-400 transition-colors group">
                  <Phone size={14} className="mt-0.5 text-gold-500 shrink-0" />
                  <span className="text-sm">+91 74063 65606</span>
                </a>
              </li>
              <li>
                <a href="mailto:info@panchajanyagroup.com" className="flex items-start gap-3 text-navy-400 hover:text-gold-400 transition-colors">
                  <Mail size={14} className="mt-0.5 text-gold-500 shrink-0" />
                  <span className="text-sm break-all">info@panchajanyagroup.com</span>
                </a>
              </li>
              
              <li>
                <a
                  href="https://www.google.com/maps/place/2nd+Stage,+Kottigepalya,+Bengaluru,+Karnataka+560091/@12.9851334,77.5122157,18z/data=!3m1!4b1!4m6!3m5!1s0x3bae3c358f3d601d:0xdc4e13886c841b75!8m2!3d12.985123!4d77.5124949!16s%2Fg%2F12hk56mhl?entry=ttu&g_ep=EgoyMDI2MDYyMS4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-navy-400 hover:text-gold-400 transition-colors group"
                >
                  <MapPin size={14} className="mt-0.5 text-gold-500 shrink-0 group-hover:text-gold-400 transition-colors" />
                  <span className="text-sm">Bengaluru, Karnataka, India</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-navy-900 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-navy-600 text-xs text-center sm:text-left">
            © {new Date().getFullYear()} Panchajanya Group. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-navy-700 text-xs">
            <span>Premium Manufacturer</span>
            <span className="w-1 h-1 rounded-full bg-navy-700" />
            <span>Made in India 🇮🇳</span>
            <span className="w-1 h-1 rounded-full bg-navy-700" />
            <span>Est. 2005</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════
   FLOATING BUTTONS
═══════════════════════════════════════════════════════════ */
function FloatingButtons() {
  const [vis, setVis] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVis(true), 1200); return () => clearTimeout(t); }, []);
  if (!vis) return null;

  return (
    <>
      {/* WhatsApp — fixed right */}z
      <motion.a
        href="https://wa.me/917406365606"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ x: 80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="fixed right-4 bottom-6 z-50 group"
        title="WhatsApp Panchajanya"
      >
        <div
          className="relative w-14 h-14 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg animate-pulse-wa"
          style={{ backgroundColor: "#25D366" }}
        >
          <svg viewBox="0 0 24 24" className="w-7 h-7 text-white relative z-10" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M11.999 0C5.373 0 0 5.373 0 12c0 2.117.554 4.105 1.523 5.828L.057 23.882l6.25-1.447A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.37l-.36-.213-3.71.859.875-3.607-.234-.371A9.818 9.818 0 012.182 12c0-5.426 4.392-9.818 9.818-9.818 5.425 0 9.818 4.392 9.818 9.818 0 5.425-4.393 9.818-9.819 9.818z" />
          </svg>
        </div>
        <div className="absolute right-16 bottom-3 px-3 py-1.5 bg-[#128C7E] text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg pointer-events-none">
          WhatsApp Us
        </div>
      </motion.a>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN EXPORT
═══════════════════════════════════════════════════════════ */
export default function Home() {
  return (
    <div className="relative">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <VisionMissionSection />

      <WhyChooseSection />
      <ManufacturingSection />
      <StatsSection />
      <ClientsSection />
      <ContactSection />
      <Footer />
      <FloatingButtons />
    </div>
  );
}
