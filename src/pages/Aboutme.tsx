import React from "react";
import { FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const Aboutme = () => {
  const handleBack = () => {
    window.history.back();
  };

  return (
    <section className="hero-section min-h-screen bg-background text-foreground flex items-center justify-center px-4 py-16 relative">
      {/* Back button top-left */}
      <button
        onClick={handleBack}
        className="absolute top-6 left-4 md:left-8 inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-4 py-2 text-sm font-body text-foreground shadow-sm hover:bg-secondary hover:shadow-md transition-all"
      >
        <span className="text-lg leading-none">←</span>
        <span>Back</span>
      </button>

      <div className="max-w-5xl w-full grid md:grid-cols-[1.1fr_0.9fr] gap-10 items-center card-elevated rounded-3xl bg-card/80 p-8 md:p-10">
        {/* Text / story side */}
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground font-display">
            Storyteller · Creator · Human
          </p>

          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-gradient leading-tight">
            Crafting worlds, one story at a time.
          </h1>

          <p className="story-content">
          I am Akshara Rajratnam, a lawyer based in Lucknow, graduated from Dr. Ram Manohar Lohiya National Law University, Lucknow and a writer who finds meaning in words, silences, and in-between spaces. Trained in law and deeply interested in international relations, my thinking is shaped by structure, but my writing is guided by emotion.
Inspired by Kabir and influenced by Vincent van Gogh, I write in Hindi to explore memory, identity, and quiet truths. This blog is a space where thought meets feeling, and words are allowed to simply exist.
          </p>

          <p className="story-content">
            Today, I help brands and individuals bring their ideas to life through immersive
            storytelling, whether it&apos;s long-form narratives, short-form content, or
            rich multimedia experiences. I believe the best stories are honest, a little
            vulnerable, and deeply human.
          </p>

          {/* Key info */}
          <div className="grid sm:grid-cols-3 gap-4 text-sm font-body">
            <div className="rounded-xl bg-secondary/70 p-4">
              <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
                Focus
              </p>
              <p className="font-semibold text-foreground">
                Narrative design, brand stories, world‑building
              </p>
            </div>
            <div className="rounded-xl bg-secondary/70 p-4">
              <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
                What I value
              </p>
              <p className="font-semibold text-foreground">
                Authenticity, emotion, clear arcs
              </p>
            </div>
            <div className="rounded-xl bg-secondary/70 p-4">
              <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
                Currently
              </p>
              <p className="font-semibold text-foreground">
                Building stories for brands & creators
              </p>
            </div>
          </div>

          {/* Social + CTA */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-4">
            {/* <button className="btn-hero">
              Let&apos;s collaborate
            </button> */}

            <div className="flex items-center gap-3 text-muted-foreground">
              <span className="font-body text-sm">Find me on</span>
              <div className="flex items-center gap-3 text-xl">
                <a
                  href="https://x.com/akshara_Rratnam"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-primary transition-transform transform hover:-translate-y-0.5"
                  aria-label="Twitter"
                >
                  <FaTwitter />
                </a>
                <a
                  href="https://www.linkedin.com/in/akshararajtratnam2017/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-primary transition-transform transform hover:-translate-y-0.5"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin />
                </a>
                <a
                  href="https://www.instagram.com/the_rajratnamreview/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-primary transition-transform transform hover:-translate-y-0.5"
                  aria-label="Instagram"
                >
                  <FaInstagram />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Photo / side card */}
        <div className="relative flex justify-center">
          <div className="relative w-56 h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-3xl overflow-hidden card-elevated bg-gradient-to-br from-primary/20 via-background to-accent/10 animate-fade-in">
            <img
              src="https://media.licdn.com/dms/image/v2/D4E03AQGrBmz9xbA1iQ/profile-displayphoto-scale_400_400/B4EZpJc2ERKgAg-/0/1762168891649?e=1769040000&v=beta&t=QDKHy5l3LCDvjlaKoLOEswGqJLgD1vJISUQG8B-vuTE"
              alt="Storyteller portrait"
              className="w-full h-full object-cover"
            />
            {/* Floating tag */}
            <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-background/90 px-4 py-3 shadow-md backdrop-blur">
              <p className="font-display pl-4 text-xs uppercase tracking-[0.25em] text-muted-foreground mb-1">
                Akshara RajRatnam
              </p>
              <p className="font-body text-sm text-foreground" />
            </div>
          </div>

          {/* Decorative orb */}
          <div className="pointer-events-none absolute -z-10 -top-6 -right-6 w-32 h-32 rounded-full bg-primary/20 blur-3xl opacity-80" />
        </div>
      </div>
    </section>
  );
};

export default Aboutme;
