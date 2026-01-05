import { useState } from "react";
import { MapPin, CircleDot, DollarSign, Calendar, Clock, Users, Target, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import heroImage from "@assets/IMG_20231105_183541_1767634965755.jpg";

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "How is my registration confirmed?",
    answer: "Your spot is officially locked in once Stripe confirms your payment. Tip: Save your Stripe receipt email as proof of entry."
  },
  {
    question: "What is \"Par for the Course – Tournament\"?",
    answer: "It's a course-style competition inspired by golf, played on the pool table. Players score 18 holes on a single scorecard. Lowest total score wins."
  },
  {
    question: "How many tables will be used / how many holes per table?",
    answer: "Final table assignments and hole distribution will be determined once turnout is confirmed and table availability is locked. We'll optimize the layout to keep play moving and competitive."
  },
  {
    question: "What about check-in and start time?",
    answer: "Check-in and start times are TBD for now and will be clearly communicated by the organizer ahead of the event. Expect plenty of notice so you can show up ready to play."
  }
];

function FAQAccordion({ item, index }: { item: FAQItem; index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div 
      className="border border-border/50 bg-card/30 rounded-lg overflow-hidden"
      data-testid={`faq-item-${index}`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-4 p-4 text-left font-semibold text-foreground hover-elevate"
        data-testid={`button-faq-toggle-${index}`}
        aria-expanded={isOpen}
      >
        <span>{item.question}</span>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 shrink-0 text-muted-foreground" />
        ) : (
          <ChevronDown className="w-4 h-4 shrink-0 text-muted-foreground" />
        )}
      </button>
      {isOpen && (
        <div className="px-4 pb-4">
          <p className="text-muted-foreground leading-relaxed">{item.answer}</p>
        </div>
      )}
    </div>
  );
}

function QuickFactRow({ label, value, testId }: { label: string; value: string; testId: string }) {
  return (
    <div 
      className="flex items-center justify-between gap-4 px-3 py-2.5 rounded-lg bg-background/40 border border-border/30"
      data-testid={`stat-row-${testId}`}
    >
      <span className="text-sm text-muted-foreground" data-testid={`text-label-${testId}`}>{label}</span>
      <span className="text-sm font-bold text-foreground" data-testid={`text-value-${testId}`}>{value}</span>
    </div>
  );
}

export default function Tournament() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    notes: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      setToast("Please enter your name");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const res = await fetch("/.netlify/functions/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          note: formData.notes
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Checkout creation failed.");
      
      window.location.href = data.url;
    } catch (err) {
      setToast("Error: " + ((err as Error)?.message || "Unable to start payment."));
      setIsSubmitting(false);
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-[18%] w-[900px] h-[500px] bg-primary/15 rounded-full blur-[120px]" />
        <div className="absolute top-0 right-[10%] w-[700px] h-[400px] bg-cyan-500/8 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-3">
          <a 
            href="#top" 
            className="flex items-center gap-3 text-decoration-none"
            data-testid="link-brand"
            onClick={(e) => { e.preventDefault(); scrollToSection("top"); }}
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-b from-white/10 to-white/2 border border-border flex items-center justify-center relative overflow-hidden shadow-xl">
              <div className="absolute inset-[-40%] bg-[radial-gradient(circle_at_30%_30%,rgba(209,17,17,0.55),transparent_55%)] rotate-[25deg]" />
              <span className="relative font-black text-lg tracking-wide">P</span>
            </div>
            <div>
              <strong className="block text-sm tracking-wide">Par for the Course</strong>
              <small className="block text-xs text-muted-foreground mt-0.5 uppercase tracking-wider">Tournament - Betsy's Billiards</small>
            </div>
          </a>

          <nav className="flex flex-wrap items-center gap-2 sm:gap-3" aria-label="Page navigation">
            <button 
              onClick={() => scrollToSection("format")}
              className="text-sm text-muted-foreground px-3 py-2 rounded-full border border-transparent hover:text-foreground hover:border-border/50 hover:bg-white/3 transition-colors"
              data-testid="link-format"
            >
              Format
            </button>
            <button 
              onClick={() => scrollToSection("schedule")}
              className="text-sm text-muted-foreground px-3 py-2 rounded-full border border-transparent hover:text-foreground hover:border-border/50 hover:bg-white/3 transition-colors"
              data-testid="link-schedule"
            >
              Schedule
            </button>
            <button 
              onClick={() => scrollToSection("faq")}
              className="text-sm text-muted-foreground px-3 py-2 rounded-full border border-transparent hover:text-foreground hover:border-border/50 hover:bg-white/3 transition-colors"
              data-testid="link-faq"
            >
              FAQ
            </button>
            <Button 
              onClick={() => scrollToSection("register")}
              data-testid="button-nav-register"
            >
              Pay & Register
            </Button>
          </nav>
        </header>

        <main id="top" className="mt-4">
          <section 
            className="relative rounded-2xl border border-border/50 overflow-hidden shadow-2xl"
            aria-label="Event hero"
          >
            <div className="absolute inset-0">
              <img 
                src={heroImage} 
                alt="Pool table at Betsy's Billiards"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
            </div>
            
            <div className="relative z-10 p-6 sm:p-8 lg:p-10">
              <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-6 lg:gap-8">
                <div className="space-y-5">
                  <div className="inline-flex flex-wrap items-center gap-2 sm:gap-3 px-4 py-2.5 rounded-full border border-white/15 bg-black/40 backdrop-blur-sm text-sm">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-primary" />
                      <span className="text-white/70">
                        <b className="text-white font-semibold">Betsy's Billiards</b> - Austin, TX
                      </span>
                    </span>
                    <span className="text-white/30">|</span>
                    <span className="flex items-center gap-1.5">
                      <CircleDot className="w-3.5 h-3.5 text-cyan-400" />
                      <span className="text-white/70">
                        <b className="text-white font-semibold">8-foot Diamond</b> tables
                      </span>
                    </span>
                    <span className="text-white/30">|</span>
                    <span className="flex items-center gap-1.5">
                      <DollarSign className="w-3.5 h-3.5 text-good" />
                      <b className="text-white font-semibold">$10</b>
                      <span className="text-white/70">entry</span>
                    </span>
                  </div>

                  <h1 
                    className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.05] text-white drop-shadow-lg"
                    data-testid="text-tournament-title"
                  >
                    Par for the Course<br />Tournament
                  </h1>
                  
                  <p className="text-base sm:text-lg text-white/75 leading-relaxed max-w-2xl">
                    A course-style pool tournament in the <b className="text-white font-semibold">Par for the Course – Tournament</b> format: <b className="text-white font-semibold">18 holes</b> designed to reward smart patterns, cue-ball control, and clean execution.
                  </p>

                  <div className="flex flex-wrap items-center gap-3">
                    <Button 
                      size="lg"
                      onClick={() => scrollToSection("register")}
                      className="shadow-lg shadow-primary/30"
                      data-testid="button-hero-register"
                    >
                      Pay & Register
                    </Button>
                    <Button 
                      variant="outline"
                      size="lg"
                      onClick={() => scrollToSection("format")}
                      className="bg-black/30 backdrop-blur-sm border-white/20 text-white hover:bg-white/10"
                      data-testid="button-hero-format"
                    >
                      See Format
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1" data-testid="hero-highlights">
                    <Badge variant="outline" className="bg-good/15 border-good/40 text-white" data-testid="badge-holes">
                      18 holes
                    </Badge>
                    <Badge variant="outline" className="bg-primary/15 border-primary/40 text-white" data-testid="badge-format">
                      Par for the Course – Tournament
                    </Badge>
                    <Badge variant="outline" className="bg-white/5 border-white/20 text-white/90" data-testid="badge-tables">
                      8' Diamond tables
                    </Badge>
                    <Badge variant="outline" className="bg-warn/15 border-warn/40 text-white" data-testid="badge-start-time">
                      Start time: TBD
                    </Badge>
                  </div>

                  <div 
                    className="flex items-start gap-3 p-3.5 rounded-xl border border-white/10 bg-black/40 backdrop-blur-sm"
                    data-testid="banner-tbd-notice"
                  >
                    <div className="w-2.5 h-2.5 rounded-full bg-warn/80 shadow-[0_0_0_4px] shadow-warn/20 mt-1 shrink-0 animate-pulse" />
                    <p className="text-sm text-white/75 leading-relaxed">
                      Some event details (table count, pacing, payouts) are <b className="text-white font-semibold">TBD</b> based on turnout and table availability.
                    </p>
                  </div>
                </div>

                <Card className="bg-black/50 backdrop-blur-md border-white/15 shadow-2xl">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl text-white">Quick Facts</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2.5">
                    <QuickFactRow label="Entry" value="$10" testId="entry" />
                    <QuickFactRow label="Location" value="Betsy's Billiards (Austin, TX)" testId="location" />
                    <QuickFactRow label="Tables" value="8-foot Diamond" testId="tables" />
                    <QuickFactRow label="Format" value="18 holes - rotation" testId="format" />
                    <QuickFactRow label="Date" value="Sunday, January 18th, 2026" testId="date" />
                    <QuickFactRow label="Check-in" value="TBD" testId="checkin" />
                    <QuickFactRow label="Start" value="TBD" testId="start" />
                    
                    <p className="text-xs text-white/50 pt-2 leading-relaxed">
                      Registration is confirmed when Stripe reports your payment completed.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-6" aria-label="Event details">
            <Card className="lg:col-span-7">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  What you're walking into
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Competitive without getting messy. The scoring rewards fundamentals: position, shot selection, and staying out of trouble.
                </p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <span><b className="text-foreground font-semibold">Skill-forward scoring:</b> your decisions show up on the card.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <span><b className="text-foreground font-semibold">Efficient flow:</b> groups rotate across tables to complete all 18 holes.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <span><b className="text-foreground font-semibold">Clean entry control:</b> Stripe-confirmed payment = confirmed registration.</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="lg:col-span-5" id="format">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Format
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <span><b className="text-foreground font-semibold">Total:</b> 18 holes</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <span><b className="text-foreground font-semibold">Tables:</b> 8-foot Diamond</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <span><b className="text-foreground font-semibold">Flow:</b> players split into groups and rotate until all 18 holes are complete</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <span><b className="text-foreground font-semibold">Winner:</b> lowest total score</span>
                  </li>
                </ul>
                <div className="flex flex-wrap gap-2 pt-2">
                  <Badge variant="secondary" size="sm">18-hole scorecard</Badge>
                  <Badge variant="secondary" size="sm">Rotation-based pace</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-12" id="schedule">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Schedule
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                  {[
                    { label: "Doors", value: "TBD", id: "doors" },
                    { label: "Check-in", value: "TBD", id: "checkin" },
                    { label: "Player meeting", value: "TBD", id: "meeting" },
                    { label: "Start", value: "TBD", id: "start" },
                    { label: "Awards", value: "TBD", id: "awards" }
                  ].map((item) => (
                    <div 
                      key={item.label} 
                      className="text-center p-4 rounded-lg bg-muted/30 border border-border/30"
                      data-testid={`schedule-item-${item.id}`}
                    >
                      <Clock className="w-4 h-4 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                      <p className="font-bold text-foreground" data-testid={`text-schedule-${item.id}`}>{item.value}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-7">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  <b className="text-foreground font-semibold">Betsy's Billiards</b>
                </p>
                <a 
                  href="https://maps.app.goo.gl/VaVJEA8ceJGWoAQk6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline text-sm mt-1 inline-block"
                  data-testid="link-location"
                >
                  1901 W. William Cannon Dr. Ste. 147, Austin, TX 78745
                </a>
              </CardContent>
            </Card>

            <Card className="lg:col-span-5" id="register">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-primary" />
                  Pay & Register
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Enter your info, then complete Stripe Checkout. Once payment completes, your entry is confirmed.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Player name</Label>
                      <Input
                        id="name"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        data-testid="input-name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Mobile (optional)</Label>
                      <Input
                        id="phone"
                        placeholder="(###) ###-####"
                        inputMode="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        data-testid="input-phone"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes (optional)</Label>
                    <Textarea
                      id="notes"
                      placeholder="Skill level, questions, or anything helpful."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="min-h-[80px]"
                      data-testid="input-notes"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full shadow-lg shadow-primary/20"
                    disabled={isSubmitting}
                    data-testid="button-submit-register"
                  >
                    {isSubmitting ? "Creating Stripe Checkout..." : "Pay $10 & Register (Stripe)"}
                  </Button>

                  {toast && (
                    <div 
                      className="p-3 rounded-lg border border-warn/40 bg-warn/15 text-sm text-foreground"
                      role="status"
                      data-testid="text-toast"
                    >
                      {toast}
                    </div>
                  )}

                  <p className="text-xs text-muted-foreground">
                    After payment you'll be redirected to a confirmation page.
                  </p>
                </form>
              </CardContent>
            </Card>

            <Card className="lg:col-span-12" id="faq">
              <CardHeader>
                <CardTitle>FAQ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {faqItems.map((item, index) => (
                  <FAQAccordion key={index} item={item} index={index} />
                ))}
              </CardContent>
            </Card>
          </section>

          <footer className="mt-8 pt-5 border-t border-border/30 text-xs text-muted-foreground/60 flex flex-col sm:flex-row justify-between gap-4">
            <span data-testid="text-copyright">
              © {new Date().getFullYear()} Promethean Games - Par for the Course
            </span>
            <span>
              Betsy's Billiards - Austin, TX - $10 entry - 18 holes - 8' Diamond
            </span>
          </footer>
        </main>
      </div>
    </div>
  );
}
