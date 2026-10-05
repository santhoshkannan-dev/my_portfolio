import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Send, Github, Linkedin, Mail, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";

export const ContactSection: React.FC = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [sending, setSending] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      toast.error("Please fill in all required fields.");
      setSending(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      toast.error("Please enter a valid email address.");
      setSending(false);
      return;
    }

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setSending(false);
      toast.error("Contact service is currently unconfigured. Please contact me directly via email.");
      return;
    }

    const templateParams = {
      name: trimmedName,
      email: trimmedEmail,
      message: trimmedMessage,
      title: "Contact Form Submission",
      from_name: trimmedName,
      from_email: trimmedEmail,
    };

    try {
      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      setSending(false);
      toast.success("Message sent successfully! I will get back to you shortly.");
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      setSending(false);
      console.error("EmailJS submission failed:", error);
      toast.error("Unable to send your message right now. Please try again or contact me directly.");
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-background border-b border-border/60 relative overflow-hidden" ref={ref}>
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-64 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column - Headline & Contact Info */}
          <div className="lg:col-span-5">
            <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-emerald-400 font-semibold mb-3 block">
              GET IN TOUCH
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground tracking-tight leading-[1.1] mb-6">
              Let's Build Something
            </h2>

            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8">
              Have an idea, project, software development opportunity, or collaboration in mind? I'm always open to discussing new technical products and engineering roles.
            </p>

            {/* Direct Contact Cards */}
            <div className="space-y-4 mb-8">
              <a
                href="mailto:santhoshkannan.dev@gmail.com"
                className="flex items-center justify-between p-4 rounded-xl glass border border-border/60 hover:border-emerald-500/50 bg-white/[0.01] hover:bg-white/[0.03] transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-muted-foreground block">Email Me</span>
                    <span className="text-xs md:text-sm font-bold text-foreground group-hover:text-emerald-400 transition-colors">
                      santhoshkannan.dev@gmail.com
                    </span>
                  </div>
                </div>
                <ArrowUpRight size={16} className="text-muted-foreground group-hover:text-emerald-400 transition-colors" />
              </a>

              <a
                href="https://github.com/santhoshkannan-dev"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-xl glass border border-border/60 hover:border-emerald-500/50 bg-white/[0.01] hover:bg-white/[0.03] transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                    <Github size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-muted-foreground block">GitHub Profile</span>
                    <span className="text-xs md:text-sm font-bold text-foreground group-hover:text-emerald-400 transition-colors">
                      github.com/santhoshkannan-dev
                    </span>
                  </div>
                </div>
                <ArrowUpRight size={16} className="text-muted-foreground group-hover:text-emerald-400 transition-colors" />
              </a>

              <a
                href="https://www.linkedin.com/in/santhosh-kannan-r/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-xl glass border border-border/60 hover:border-emerald-500/50 bg-white/[0.01] hover:bg-white/[0.03] transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                    <Linkedin size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-muted-foreground block">LinkedIn</span>
                    <span className="text-xs md:text-sm font-bold text-foreground group-hover:text-emerald-400 transition-colors">
                      linkedin.com/in/santhosh-kannan-r
                    </span>
                  </div>
                </div>
                <ArrowUpRight size={16} className="text-muted-foreground group-hover:text-emerald-400 transition-colors" />
              </a>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="lg:col-span-7">
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-6 sm:p-10 rounded-3xl glass border border-border/80 bg-zinc-950/90 shadow-2xl space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-zinc-300 mb-2 block">
                    Your Name <span className="text-emerald-400">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Santhosh Kannan"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-zinc-600 focus:outline-none focus:border-emerald-400/80 focus:ring-1 focus:ring-emerald-400/30 transition-all"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-zinc-300 mb-2 block">
                    Your Email <span className="text-emerald-400">*</span>
                  </label>
                  <input
                    required
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="visitor@example.com"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-zinc-600 focus:outline-none focus:border-emerald-400/80 focus:ring-1 focus:ring-emerald-400/30 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-zinc-300 mb-2 block">
                  Your Message <span className="text-emerald-400">*</span>
                </label>
                <textarea
                  required
                  rows={5}
                  name="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell me about your project, timeline, or engineering opportunity..."
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-zinc-600 focus:outline-none focus:border-emerald-400/80 focus:ring-1 focus:ring-emerald-400/30 transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="w-full py-4 rounded-xl bg-emerald-500 hover:bg-white text-black font-bold text-xs md:text-sm uppercase tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.3)] disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
              >
                {sending ? (
                  <span className="animate-pulse">Sending Message...</span>
                ) : (
                  <>
                    <Send size={16} /> Send Message
                  </>
                )}
              </button>
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
