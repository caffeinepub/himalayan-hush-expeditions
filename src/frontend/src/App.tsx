import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  FlameKindling,
  Leaf,
  Loader2,
  MapPin,
  Menu,
  Mountain,
  PhoneCall,
  Radio,
  Recycle,
  ShieldCheck,
  Snowflake,
  Star,
  Sun,
  TrendingUp,
  Wind,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useSubmitInquiry } from "./hooks/useQueries";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Itinerary", href: "#itinerary" },
  { label: "Sustainability", href: "#sustainability" },
  { label: "Safety", href: "#safety" },
  { label: "Pricing", href: "#pricing" },
];

const ITINERARY = [
  {
    day: 1,
    location: "Shimla",
    altitude: "2,276m",
    title: "The Colonial Prelude",
    desc: "Arrival & orientation briefing on Regenerative Travel Protocols. Heritage Walk through Shimla Ridge. Meet your educator-guides and fellow expedition members.",
    hush: false,
  },
  {
    day: 2,
    location: "Sarahan",
    altitude: "2,313m",
    title: "The Gateway to Kinnaur",
    desc: "Study the apple economy and climate change's impact on shifting crop lines. Visit Bhimakali Temple — a masterclass in Kath-Kuni earthquake-resistant architecture.",
    hush: false,
  },
  {
    day: 3,
    location: "Kalpa",
    altitude: "2,960m",
    title: "The Acclimatization Halt",
    desc: "Gradual ascent. Panoramic views of Kinner Kailash. Session on Mountain Deities and Local Governance. First night in a traditional homestay.",
    hush: false,
  },
  {
    day: 4,
    location: "Tabo",
    altitude: "3,280m",
    title: "The Ajanta of the Himalayas",
    desc: "Cross the tree line into cold desert terrain. Visit Tabo Monastery (founded 996 AD). Study mud-preservation techniques. Inner Line Permit check at Sumdo.",
    hush: false,
  },
  {
    day: 5,
    location: "Kaza",
    altitude: "3,650m",
    title: "The Innovation Hub",
    desc: "Visit Spiti Ecosphere office. Hands-on workshop on Solar Passive Housing. Students participate in greenhouse construction or solar cooker demonstration. 2.5 tons CO2 saved per household.",
    hush: false,
  },
  {
    day: 6,
    location: "Langza",
    altitude: "4,400m",
    title: "THE HUSH PROTOCOL",
    desc: "Fossil hunting in Tethys Sea sediment layers (ammonites at 4,400m). At 12:00 PM all devices surrendered. 24 hours of digital silence begins. Silent walk to the Buddha statue. World-class stargazing in a natural dark sky sanctuary.",
    hush: true,
  },
  {
    day: 7,
    location: "Key / Kibber",
    altitude: "4,200m",
    title: "Monastic Life & Release",
    desc: "Silent participation in morning prayers at Key Monastery. Digital devices returned at noon. Debrief the silence experience with a resident monk. Visit Kibber Wildlife Sanctuary — Snow Leopard habitat.",
    hush: false,
    image: "/assets/generated/key-monastery.dim_800x600.jpg",
  },
  {
    day: 8,
    location: "Chandratal",
    altitude: "4,300m",
    title: "The Glacial Barometer",
    desc: "Drive across Kunzum Pass (4,590m). Trek to Chandratal Lake. Water quality testing workshop: pH and turbidity to assess glacial health. Leave No Trace cleanup drive around the campsite.",
    hush: false,
    image: "/assets/generated/chandratal-lake.dim_800x600.jpg",
  },
  {
    day: 9,
    location: "Manali",
    altitude: "2,050m",
    title: "The Tunnel to Civilization",
    desc: "Dramatic descent via Atal Tunnel. Farewell dinner and distribution of Carbon Neutral expedition certificates. Reflect on 9 transformative days.",
    hush: false,
  },
  {
    day: 10,
    location: "Departure",
    altitude: "Chandigarh/Delhi",
    title: "Until the Mountains Call Again",
    desc: "Transfer to Chandigarh or Delhi. Students depart carrying geological specimens of knowledge, cultural empathy, and personal resilience built at altitude.",
    hush: false,
  },
];

const PRICING_ROWS = [
  {
    component: "Transport",
    basis: "Tempo Traveller, 1,300 km loop",
    cost: 4600,
  },
  {
    component: "Accommodation",
    basis: "9 nights, avg Rs.1,200 incl. meals",
    cost: 10800,
  },
  { component: "Food (Lunch)", basis: "Rs.400/day x 10 days", cost: 4000 },
  {
    component: "Activities & Guide",
    basis: "Ecosphere workshop, local guide",
    cost: 2500,
  },
  {
    component: "Permits & Taxes",
    basis: "Green Tax, Rohtang Permit, entry fees",
    cost: 800,
  },
  {
    component: "Insurance",
    basis: "High altitude evacuation cover",
    cost: 1500,
  },
  {
    component: "Contingency",
    basis: "Oxygen refills, unexpected halts (5%)",
    cost: 1200,
  },
];

const FAQS = [
  {
    q: "Who is this tour designed for?",
    a: "Grades 11-12 and university students, specifically aligned with IB CAS (Creativity, Activity, Service) requirements and CBSE/ICSE EVS (Environmental Studies) projects. The curriculum-based itinerary counts directly towards academic mandates.",
  },
  {
    q: "Is prior trekking experience needed?",
    a: "No prior trekking experience is required. The itinerary is strictly designed for gradual acclimatization, ascending from Shimla (2,276m) to Langza (4,400m) over six days. Our educator-guides are trained Wilderness First Responders who monitor pulse oximetry twice daily.",
  },
  {
    q: "What exactly is the Hush Protocol?",
    a: "On Day 6 at Langza, at 12:00 PM, all digital devices are surrendered to the lead guide for 24 hours of complete digital silence. Students participate in silent walks, fossil observation, and stargazing. Devices are returned the following afternoon at Key Monastery after a debrief with a resident monk.",
  },
  {
    q: "What safety measures are in place?",
    a: "Every tour carries a Gamow Bag (portable hyperbaric chamber), supplementary oxygen cylinders, and a full high-altitude medical kit (Diamox, Dexamethasone). Pulse oximeter checks are mandatory twice daily. All guides hold Wilderness First Responder (WFR) certification. Satellite communication ensures no group is truly off-grid.",
  },
  {
    q: "Is this truly carbon neutral?",
    a: "Yes. Every expedition's footprint is calculated using the ICAO Carbon Emissions Calculator. The carbon cost is then invested directly into Spiti Ecosphere's renewable energy projects: solar passive rooms and greenhouses that reduce the region's future carbon dependency by 2.5 tons per household per year.",
  },
  {
    q: "How many students per group?",
    a: "We accept a minimum of 10 and a maximum of 30 students per expedition group. Groups above 20 are split across multiple homestays in the same village to reduce resource strain and ensure a quality experience. One teacher chaperone accompanies the group free of charge.",
  },
];

function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-3" data-ocid="nav.link">
          <div className="w-9 h-9 bg-primary rounded flex items-center justify-center shadow-glow">
            <span className="font-display font-bold text-xs text-primary-foreground">
              HHE
            </span>
          </div>
          <div className="hidden sm:block">
            <p className="font-display font-semibold text-foreground text-sm leading-none">
              Himalayan Hush
            </p>
            <p className="text-muted-foreground text-xs">Expeditions</p>
          </div>
        </a>
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-ocid="nav.link"
              className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-muted"
            >
              {link.label}
            </a>
          ))}
          <a href="#booking">
            <Button
              size="sm"
              className="ml-2 bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow"
              data-ocid="nav.primary_button"
            >
              Book Now
            </Button>
          </a>
        </nav>
        <button
          type="button"
          className="md:hidden p-2 text-muted-foreground hover:text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border bg-background"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  data-ocid="nav.link"
                  onClick={() => setOpen(false)}
                  className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-muted"
                >
                  {link.label}
                </a>
              ))}
              <Button
                size="sm"
                className="w-full bg-primary"
                data-ocid="nav.primary_button"
                onClick={() => {
                  setOpen(false);
                  document.getElementById("booking")?.scrollIntoView();
                }}
              >
                Book Now
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/assets/generated/hero-spiti.dim_1600x900.jpg')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-hhe-dark/75 via-hhe-dark/55 to-hhe-dark/88" />
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Badge className="mb-6 bg-hhe-ochre/20 text-hhe-ochre border border-hhe-ochre/40 hover:bg-hhe-ochre/20 px-4 py-1.5 text-xs tracking-widest uppercase">
            Carbon Neutral Certified
          </Badge>
        </motion.div>
        <motion.h1
          className="font-display font-bold text-5xl md:text-7xl lg:text-8xl text-hhe-cream leading-[0.95] mb-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
        >
          Where Silence
          <br />
          <em className="text-hhe-ochre not-italic">Becomes</em>
          <br />
          the Lesson
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          India's premier regenerative expedition for students — 10
          transformative days in the Spiti Valley cold desert at the edge of the
          sky.
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
        >
          <a href="#itinerary">
            <Button
              size="lg"
              className="bg-hhe-ochre text-hhe-dark font-semibold hover:bg-hhe-ochre/90 shadow-glow-ochre px-8"
              data-ocid="hero.primary_button"
            >
              Explore the Journey
            </Button>
          </a>
          <a href="#booking">
            <Button
              size="lg"
              variant="outline"
              className="border-foreground/30 text-foreground hover:bg-foreground/10 px-8"
              data-ocid="hero.secondary_button"
            >
              Book for Your School
            </Button>
          </a>
        </motion.div>
        <motion.div
          className="mt-16 flex flex-col items-center gap-2 text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <span className="text-xs tracking-widest uppercase">
            Scroll to discover
          </span>
          <ChevronDown size={18} className="animate-bounce" />
        </motion.div>
      </div>
      <div className="absolute bottom-8 right-8 text-right hidden md:block">
        <p className="text-hhe-sky text-xs tracking-widest uppercase">
          Spiti Valley
        </p>
        <p className="font-display text-2xl text-foreground/50">4,400m</p>
        <p className="text-muted-foreground text-xs">above sea level</p>
      </div>
    </section>
  );
}

function AboutSection() {
  const pillars = [
    {
      icon: <Mountain size={28} className="text-hhe-ochre" />,
      title: "Geological Deep Time",
      desc: "Fossil hunting in the Tethys Sea bed at 4,400m. Students identify 400-million-year-old ammonites, understanding plate tectonics through direct evidence in their hands.",
    },
    {
      icon: <Sun size={28} className="text-hhe-ochre" />,
      title: "Climate Resilience",
      desc: "Hands-on workshops with Spiti Ecosphere on solar passive housing. See how Himalayan communities reduce carbon usage by 2.5 tons per household annually through indigenous innovation.",
    },
    {
      icon: <Wind size={28} className="text-hhe-ochre" />,
      title: "Spiritual Neuroscience",
      desc: "Guided exploration of the cognitive benefits of silence and meditation in 1,000-year-old monastic settings. The 24-hour Hush Protocol is the experiential centerpiece of the expedition.",
    },
  ];
  return (
    <section id="about" className="py-24 lg:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-3xl mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <Badge className="mb-4 bg-primary/20 text-primary border-primary/30 hover:bg-primary/20 text-xs tracking-widest uppercase">
            About HHE
          </Badge>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-6 leading-tight">
            Regenerative Tourism
            <br />
            <em className="text-hhe-ochre not-italic">
              for the Next Generation
            </em>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-4">
            <strong className="text-foreground">Vision:</strong> India's premier
            regenerative tourism operator for youth, transforming how students
            interact with high-altitude ecosystems by 2030.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Mission:</strong> To deliver
            carbon-neutral, curriculum-aligned expeditions that foster
            environmental stewardship, cultural empathy, and personal resilience
            through the power of silence and experiential learning.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              className="bg-card border border-border rounded-lg p-7 hover:border-hhe-ochre/40 transition-colors"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <div className="mb-4">{p.icon}</div>
              <h3 className="font-display font-semibold text-xl text-foreground mb-3">
                {p.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>
        <motion.div
          className="bg-card border border-primary/30 rounded-lg p-8 relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent" />
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="text-5xl">&#x1F507;</div>
            <div>
              <h3 className="font-display font-bold text-2xl text-foreground mb-2">
                The Hush Protocol &mdash; Day 6, Langza
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                At 12:00 PM on Day 6, all digital devices are surrendered to the
                lead guide. For 24 hours, students experience{" "}
                <strong className="text-foreground">auditory detox</strong> and
                inner alchemy in one of Earth's most profound silences &mdash; a
                4,400m cold desert under an unobstructed Milky Way. This is not
                a rule. It is a revelation.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ItinerarySection() {
  const [expanded, setExpanded] = useState<number | null>(null);
  return (
    <section id="itinerary" className="py-24 lg:py-32 bg-muted/10">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <Badge className="mb-4 bg-accent/20 text-accent border-accent/30 hover:bg-accent/20 text-xs tracking-widest uppercase">
            10-Day Expedition
          </Badge>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-4">
            Spiti: The Silent{" "}
            <em className="text-hhe-ochre not-italic">Time Capsule</em>
          </h2>
          <p className="text-muted-foreground">
            A carefully acclimatized ascent from Shimla through Kinnaur Valley
            into the heart of the cold desert, and back via Manali.
          </p>
        </motion.div>
        <div className="relative">
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent hidden md:block" />
          <div className="space-y-3">
            {ITINERARY.map((day, i) => (
              <motion.div
                key={day.day}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
                data-ocid={`itinerary.item.${day.day}`}
              >
                <div className="relative md:pl-20">
                  <div
                    className={`absolute left-4 md:left-5 top-6 w-4 h-4 rounded-full border-2 hidden md:block ${day.hush ? "bg-primary border-primary shadow-glow" : "bg-muted border-border"}`}
                  />
                  <button
                    type="button"
                    className={`w-full text-left rounded-lg p-5 cursor-pointer transition-all ${day.hush ? "bg-primary/10 border border-primary/40" : "bg-card border border-border hover:border-muted-foreground/30"}`}
                    onClick={() =>
                      setExpanded(expanded === day.day ? null : day.day)
                    }
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1 min-w-0">
                        <div
                          className={`shrink-0 font-display font-bold text-3xl ${day.hush ? "text-primary" : "text-muted-foreground/30"}`}
                        >
                          {String(day.day).padStart(2, "0")}
                        </div>
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <span className="font-display font-semibold text-lg text-foreground">
                              {day.location}
                            </span>
                            <span className="text-xs text-hhe-sky bg-accent/10 border border-accent/20 rounded px-2 py-0.5">
                              <MapPin size={10} className="inline mr-1" />
                              {day.altitude}
                            </span>
                            {day.hush && (
                              <Badge className="bg-primary text-primary-foreground text-[10px] tracking-wider uppercase hover:bg-primary">
                                Hush Protocol
                              </Badge>
                            )}
                          </div>
                          <p
                            className={`text-sm font-medium ${day.hush ? "text-primary" : "text-muted-foreground"}`}
                          >
                            {day.title}
                          </p>
                        </div>
                      </div>
                      <ChevronDown
                        size={16}
                        className={`shrink-0 mt-1.5 text-muted-foreground transition-transform ${expanded === day.day ? "rotate-180" : ""}`}
                      />
                    </div>
                    <AnimatePresence>
                      {expanded === day.day && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-4 pt-4 border-t border-border/50 md:pl-14">
                            <p className="text-muted-foreground text-sm leading-relaxed">
                              {day.desc}
                            </p>
                            {"image" in day && day.image && (
                              <div className="mt-4 rounded-md overflow-hidden max-w-md">
                                <img
                                  src={day.image as string}
                                  alt={`${day.location} - Day ${day.day}`}
                                  className="w-full h-40 object-cover"
                                  loading="lazy"
                                />
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SustainabilitySection() {
  const pillars = [
    {
      icon: <Recycle size={32} className="text-hhe-ochre" />,
      title: "Zero Waste Philosophy",
      points: [
        '"Pack it in, Pack it out" policy. All non-biodegradable waste transported back to Chandigarh/Delhi recycling facilities.',
        "Strict ban on single-use plastic bottles. Students carry 2L hydration bladders.",
        "Water refilled at homestays via traditional boiled water or large 20L dispensers.",
        "Zero dark snow effect on Spiti glaciers.",
      ],
    },
    {
      icon: <Leaf size={32} className="text-hhe-ochre" />,
      title: "Carbon Neutrality",
      points: [
        "Carbon footprint calculated per expedition using the ICAO Carbon Emissions Calculator.",
        "Carbon Plus model: offset cost invested directly into Spiti Ecosphere solar projects.",
        "Not purchasing a credit, but building infrastructure that reduces future emissions permanently.",
        "2.5 tons CO2 reduced per household per year through solar passive homes.",
      ],
    },
    {
      icon: <BookOpen size={32} className="text-hhe-ochre" />,
      title: "Cultural Ethics",
      points: [
        "Pre-trip Cultural Code of Conduct dossier: dress codes, photography ethics, social norms.",
        "No distributing candy or money to children, prevents dependency and begging culture.",
        'Fossil Ethics: "Look but don\'t take." Removing fossils is illegal and unethical.',
        "Found fossils recorded in a digital citizen science database with photographs.",
      ],
    },
  ];
  return (
    <section id="sustainability" className="py-24 lg:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <Badge className="mb-4 bg-green-900/30 text-green-400 border-green-700/40 hover:bg-green-900/30 text-xs tracking-widest uppercase">
            Ethical Foundation
          </Badge>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-4">
            Sustainability &amp;{" "}
            <em className="text-hhe-ochre not-italic">Ethical Practice</em>
          </h2>
          <p className="text-muted-foreground">
            We don&apos;t just minimize harm. We actively restore and rejuvenate
            Spiti&apos;s ecological and social fabric.
          </p>
        </motion.div>
        <motion.div
          className="bg-card border border-border rounded-lg p-8 mb-12 flex flex-col md:flex-row gap-6 items-center"
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center w-20 h-20 rounded-full bg-green-900/20 border border-green-700/30 shrink-0">
            <TrendingUp size={36} className="text-green-400" />
          </div>
          <div>
            <p className="font-display font-bold text-3xl md:text-4xl text-foreground mb-1">
              2.5 tons CO&#8322;
            </p>
            <p className="text-muted-foreground">
              reduced per household per year through solar passive homes built
              by Spiti Ecosphere&apos;s community projects &mdash; directly
              funded by your HHE expedition&apos;s Carbon Plus offset.
            </p>
          </div>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              className="bg-card border border-border rounded-lg p-7"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <div className="mb-5">{p.icon}</div>
              <h3 className="font-display font-semibold text-xl text-foreground mb-4">
                {p.title}
              </h3>
              <ul className="space-y-3">
                {p.points.map((pt) => (
                  <li
                    key={pt.slice(0, 25)}
                    className="flex gap-3 text-sm text-muted-foreground"
                  >
                    <span className="text-hhe-ochre mt-0.5 shrink-0">
                      &#9670;
                    </span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SafetySection() {
  const cards = [
    {
      icon: <FlameKindling size={28} className="text-primary" />,
      title: "Medical Emergencies",
      subtitle: "AMS / HAPE / HACE Protocol",
      points: [
        "Gamow Bag (portable hyperbaric chamber) on every expedition.",
        "Supplementary oxygen cylinders; pulse oximeter checks twice daily, mandatory.",
        "High-altitude medical kit: Diamox, Dexamethasone, Nifedipine.",
        "Strict acclimatization itinerary: Shimla to Kalpa to Tabo to Kaza to Langza.",
        "Itinerary exits via Manali (rapid descent) for better physiological adaptation.",
      ],
    },
    {
      icon: <PhoneCall size={28} className="text-primary" />,
      title: "Emergency Evacuation",
      subtitle: "Insurance & Helicopter Rescue",
      points: [
        "Adventure Travel Insurance mandatory for every participant (ASC360 / Global Rescue).",
        "Helicopter air ambulance retainer with Himalayan Heli Services; cost Rs.3.5-6 Lakh per sortie, covered by insurance.",
        "Insurance must explicitly cover Air Evacuation; HHE verifies all policies.",
        "Wilderness First Responder (WFR) certified guides on all expeditions.",
      ],
    },
    {
      icon: <Radio size={28} className="text-primary" />,
      title: "Communication",
      subtitle: "Never Truly Off-Grid",
      points: [
        "Satellite phones and/or high-frequency radio sets for all vehicles.",
        "Constant communication between guides, vehicles, and Kaza/Manali base.",
        "ATOAI (Adventure Tour Operators Association of India) certified protocols.",
        "IMF (Indian Mountaineering Foundation) guidelines compliance.",
        "Child Protection Policy training for all staff working with minors.",
      ],
    },
  ];
  return (
    <section id="safety" className="py-24 lg:py-32 bg-muted/10">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <Badge className="mb-4 bg-primary/20 text-primary border-primary/30 hover:bg-primary/20 text-xs tracking-widest uppercase">
            ATOAI &amp; IMF Certified
          </Badge>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-4">
            Safety &amp;{" "}
            <em className="text-hhe-ochre not-italic">Risk Management</em>
          </h2>
          <p className="text-muted-foreground">
            Operating at 4,400m with students requires military-grade safety
            protocols. We've built ours with former mountaineers and
            WFR-certified educator-guides.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((c, i) => (
            <motion.div
              key={c.title}
              className="bg-card border border-border rounded-lg p-7"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              data-ocid="safety.card"
            >
              <div className="mb-3">{c.icon}</div>
              <h3 className="font-display font-semibold text-xl text-foreground mb-1">
                {c.title}
              </h3>
              <p className="text-xs text-muted-foreground mb-4 uppercase tracking-wider">
                {c.subtitle}
              </p>
              <ul className="space-y-3">
                {c.points.map((pt) => (
                  <li
                    key={pt.slice(0, 25)}
                    className="flex gap-3 text-sm text-muted-foreground"
                  >
                    <ShieldCheck
                      size={14}
                      className="text-primary mt-0.5 shrink-0"
                    />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        <motion.div
          className="mt-8 flex flex-wrap gap-3 justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {[
            "ATOAI Certified",
            "IMF Compliant",
            "WFR Certified Guides",
            "Gamow Bag Equipped",
            "Satellite Communication",
          ].map((b) => (
            <span
              key={b}
              className="px-4 py-1.5 bg-muted border border-border rounded-full text-xs text-muted-foreground"
            >
              {b}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function PricingSection() {
  const [groupSize, setGroupSize] = useState([20]);
  const [offsetEnabled, setOffsetEnabled] = useState(false);
  const CO2_PER_STUDENT = 45;
  const OFFSET_PER_STUDENT = 150;
  const carbonKg = groupSize[0] * CO2_PER_STUDENT;
  const offsetCost = groupSize[0] * OFFSET_PER_STUDENT;
  const operationalTotal = PRICING_ROWS.reduce((sum, r) => sum + r.cost, 0);
  const markup = 6350;
  const subTotal = operationalTotal + markup;
  const gst = 1588;
  const finalPrice = subTotal + gst;
  return (
    <section id="pricing" className="py-24 lg:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <Badge className="mb-4 bg-secondary/20 text-secondary border-secondary/30 hover:bg-secondary/20 text-xs tracking-widest uppercase">
            Transparent Pricing
          </Badge>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-4">
            The Silent Time Capsule
          </h2>
          <p className="text-muted-foreground">
            Per-student cost. 15 students + 1 teacher (FOC). 10 Days / 9 Nights.
          </p>
        </motion.div>
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <motion.div
            className="bg-card border border-border rounded-lg overflow-hidden"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <Table data-ocid="pricing.table">
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-foreground font-semibold">
                    Component
                  </TableHead>
                  <TableHead className="text-foreground font-semibold hidden sm:table-cell">
                    Basis
                  </TableHead>
                  <TableHead className="text-foreground font-semibold text-right">
                    Cost (Rs.)
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {PRICING_ROWS.map((row, i) => (
                  <TableRow
                    key={row.component}
                    className="border-border hover:bg-muted/30"
                    data-ocid={`pricing.row.${i + 1}`}
                  >
                    <TableCell className="font-medium text-foreground text-sm">
                      {row.component}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-xs hidden sm:table-cell">
                      {row.basis}
                    </TableCell>
                    <TableCell className="text-right text-sm">
                      {row.cost.toLocaleString("en-IN")}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow
                  className="border-border bg-muted/20 font-semibold"
                  data-ocid="pricing.row"
                >
                  <TableCell className="text-foreground">
                    Total Operational Cost
                  </TableCell>
                  <TableCell className="hidden sm:table-cell" />
                  <TableCell className="text-right text-foreground">
                    {operationalTotal.toLocaleString("en-IN")}
                  </TableCell>
                </TableRow>
                <TableRow className="border-border hover:bg-muted/30">
                  <TableCell className="text-muted-foreground text-sm">
                    Markup (25%)
                  </TableCell>
                  <TableCell className="text-muted-foreground text-xs hidden sm:table-cell">
                    Industry standard for specialized tours
                  </TableCell>
                  <TableCell className="text-right text-sm">
                    {markup.toLocaleString("en-IN")}
                  </TableCell>
                </TableRow>
                <TableRow className="border-border hover:bg-muted/30">
                  <TableCell className="text-muted-foreground text-sm">
                    Sub-Total
                  </TableCell>
                  <TableCell className="hidden sm:table-cell" />
                  <TableCell className="text-right text-sm">
                    {subTotal.toLocaleString("en-IN")}
                  </TableCell>
                </TableRow>
                <TableRow className="border-border hover:bg-muted/30">
                  <TableCell className="text-muted-foreground text-sm">
                    GST (5%) SAC 9985
                  </TableCell>
                  <TableCell className="text-muted-foreground text-xs hidden sm:table-cell">
                    Tour Operator service, no ITC
                  </TableCell>
                  <TableCell className="text-right text-sm">
                    {gst.toLocaleString("en-IN")}
                  </TableCell>
                </TableRow>
                <TableRow className="border-t-2 border-hhe-ochre/50 bg-hhe-ochre/5">
                  <TableCell className="font-display font-bold text-lg text-hhe-ochre">
                    Final Price Per Student
                  </TableCell>
                  <TableCell className="hidden sm:table-cell" />
                  <TableCell className="text-right font-display font-bold text-lg text-hhe-ochre">
                    Rs.{finalPrice.toLocaleString("en-IN")}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </motion.div>
          <motion.div
            className="bg-card border border-border rounded-lg p-7"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            data-ocid="pricing.panel"
          >
            <div className="flex items-center gap-3 mb-6">
              <Snowflake size={20} className="text-hhe-sky" />
              <h3 className="font-display font-semibold text-xl text-foreground">
                Carbon Footprint Calculator
              </h3>
            </div>
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <Label className="text-sm text-muted-foreground">
                  Group Size
                </Label>
                <span className="font-display font-bold text-2xl text-foreground">
                  {groupSize[0]} students
                </span>
              </div>
              <Slider
                min={10}
                max={50}
                step={1}
                value={groupSize}
                onValueChange={setGroupSize}
                className="my-2"
                data-ocid="pricing.toggle"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>10 min</span>
                <span>50 max</span>
              </div>
            </div>
            <Separator className="my-5 bg-border" />
            <div className="space-y-2 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Estimated Carbon Footprint
                </span>
                <span className="font-display font-semibold text-foreground">
                  {carbonKg.toLocaleString()} kg CO&#8322;
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">
                  ({CO2_PER_STUDENT} kg CO&#8322; x {groupSize[0]} students)
                </span>
                <span className="text-xs text-muted-foreground">
                  {(carbonKg / 1000).toFixed(2)} tons
                </span>
              </div>
            </div>
            <div className="bg-muted/40 rounded-lg p-4 mb-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Offset with Carbon Plus
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Invest in Spiti Ecosphere solar projects
                  </p>
                </div>
                <Switch
                  checked={offsetEnabled}
                  onCheckedChange={setOffsetEnabled}
                  data-ocid="pricing.switch"
                />
              </div>
              <AnimatePresence>
                {offsetEnabled && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 pt-4 border-t border-border">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          Offset Cost (Rs.{OFFSET_PER_STUDENT}/student)
                        </span>
                        <span className="font-semibold text-green-400">
                          Rs.{offsetCost.toLocaleString("en-IN")}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        This amount funds solar passive rooms in Spiti villages,
                        reducing 2.5 tons CO&#8322; per household per year.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="flex justify-between items-center p-4 bg-primary/10 border border-primary/20 rounded-lg">
              <span className="text-sm font-medium text-foreground">
                Total Group Cost
              </span>
              <span className="font-display font-bold text-xl text-hhe-ochre">
                Rs.
                {(
                  finalPrice * groupSize[0] +
                  (offsetEnabled ? offsetCost : 0)
                ).toLocaleString("en-IN")}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function BookingSection() {
  const submitInquiry = useSubmitInquiry();
  const [form, setForm] = useState({
    schoolName: "",
    contactPerson: "",
    email: "",
    phone: "",
    preferredDates: "",
    groupSize: 20,
    curriculumBoard: "",
    message: "",
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.curriculumBoard) return;
    await submitInquiry.mutateAsync(form);
  };
  const field = (name: keyof typeof form, value: string | number) =>
    setForm((prev) => ({ ...prev, [name]: value }));
  if (submitInquiry.isSuccess) {
    return (
      <section id="booking" className="py-24 lg:py-32 bg-muted/10">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-lg mx-auto text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            data-ocid="booking.success_state"
          >
            <div className="w-16 h-16 bg-green-900/20 border border-green-700/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={32} className="text-green-400" />
            </div>
            <h3 className="font-display font-bold text-3xl text-foreground mb-3">
              Inquiry Received!
            </h3>
            <p className="text-muted-foreground">
              Your inquiry has been received! We&apos;ll contact you within 48
              hours.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }
  return (
    <section id="booking" className="py-24 lg:py-32 bg-muted/10">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <Badge className="mb-4 bg-accent/20 text-accent border-accent/30 hover:bg-accent/20 text-xs tracking-widest uppercase">
              Inquire Now
            </Badge>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-3">
              Book an Expedition
              <br />
              <em className="text-hhe-ochre not-italic">for Your School</em>
            </h2>
            <p className="text-muted-foreground">
              IB CAS, CBSE EVS, ICSE &mdash; we align the curriculum to your
              board. Minimum 10 students.
            </p>
          </motion.div>
          <motion.form
            onSubmit={handleSubmit}
            className="bg-card border border-border rounded-lg p-8 space-y-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="schoolName" className="text-sm">
                  School Name *
                </Label>
                <Input
                  id="schoolName"
                  value={form.schoolName}
                  onChange={(e) => field("schoolName", e.target.value)}
                  placeholder="The International School, Bangalore"
                  required
                  className="bg-input border-border"
                  data-ocid="booking.input"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactPerson" className="text-sm">
                  Contact Person *
                </Label>
                <Input
                  id="contactPerson"
                  value={form.contactPerson}
                  onChange={(e) => field("contactPerson", e.target.value)}
                  placeholder="Dr. Priya Sharma"
                  required
                  className="bg-input border-border"
                  data-ocid="booking.input"
                />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm">
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => field("email", e.target.value)}
                  placeholder="coordinator@school.edu.in"
                  required
                  className="bg-input border-border"
                  data-ocid="booking.input"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm">
                  Phone *
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => field("phone", e.target.value)}
                  placeholder="+91 98765 43210"
                  required
                  className="bg-input border-border"
                  data-ocid="booking.input"
                />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="preferredDates" className="text-sm">
                  Preferred Travel Dates
                </Label>
                <Input
                  id="preferredDates"
                  value={form.preferredDates}
                  onChange={(e) => field("preferredDates", e.target.value)}
                  placeholder="June-July 2026"
                  className="bg-input border-border"
                  data-ocid="booking.input"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="groupSize" className="text-sm">
                  Group Size (10-50)
                </Label>
                <Input
                  id="groupSize"
                  type="number"
                  min={10}
                  max={50}
                  value={form.groupSize}
                  onChange={(e) =>
                    field("groupSize", Number.parseInt(e.target.value) || 10)
                  }
                  className="bg-input border-border"
                  data-ocid="booking.input"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="curriculumBoard" className="text-sm">
                Curriculum Board *
              </Label>
              <Select
                value={form.curriculumBoard}
                onValueChange={(v) => field("curriculumBoard", v)}
                required
              >
                <SelectTrigger
                  id="curriculumBoard"
                  className="bg-input border-border"
                  data-ocid="booking.select"
                >
                  <SelectValue placeholder="Select your curriculum board" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="IB">
                    IB - International Baccalaureate
                  </SelectItem>
                  <SelectItem value="CBSE">CBSE - Central Board</SelectItem>
                  <SelectItem value="ICSE">
                    ICSE - Indian Certificate
                  </SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message" className="text-sm">
                Message / Notes
              </Label>
              <Textarea
                id="message"
                value={form.message}
                onChange={(e) => field("message", e.target.value)}
                placeholder="Tell us about your group, specific learning objectives, or any accessibility requirements..."
                rows={4}
                className="bg-input border-border resize-none"
                data-ocid="booking.textarea"
              />
            </div>
            {submitInquiry.isError && (
              <div
                className="flex gap-3 items-start bg-destructive/10 border border-destructive/30 rounded-lg p-4 text-sm text-destructive"
                data-ocid="booking.error_state"
              >
                <AlertTriangle size={16} className="mt-0.5 shrink-0" />
                <span>
                  Something went wrong. Please try again or email us directly.
                </span>
              </div>
            )}
            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow h-12 text-base"
              disabled={submitInquiry.isPending || !form.curriculumBoard}
              data-ocid="booking.submit_button"
            >
              {submitInquiry.isPending ? (
                <>
                  <Loader2 size={18} className="mr-2 animate-spin" />
                  Submitting Inquiry...
                </>
              ) : (
                "Submit Inquiry"
              )}
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <section className="py-24 lg:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-3">
            Frequently Asked{" "}
            <em className="text-hhe-ochre not-italic">Questions</em>
          </h2>
          <p className="text-muted-foreground">
            Everything schools need to know before committing to the expedition.
          </p>
        </motion.div>
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {FAQS.map((faq, i) => (
              <AccordionItem
                key={faq.q}
                value={`faq-${i}`}
                className="bg-card border border-border rounded-lg px-5 data-[state=open]:border-hhe-ochre/40"
                data-ocid={`faq.item.${i + 1}`}
              >
                <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;
  return (
    <footer className="border-t border-border bg-card py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary rounded flex items-center justify-center shadow-glow">
                <span className="font-display font-bold text-sm text-primary-foreground">
                  HHE
                </span>
              </div>
              <div>
                <p className="font-display font-bold text-foreground">
                  Himalayan Hush Expeditions
                </p>
                <p className="text-muted-foreground text-xs">Pvt. Ltd.</p>
              </div>
            </div>
            <p className="text-muted-foreground text-sm italic font-display mb-4">
              "Silence. Learn. Regenerate."
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              <MapPin size={12} className="inline mr-1" />
              HQ: Shimla, Himachal Pradesh
              <br />
              <span className="ml-4">Corporate: New Delhi</span>
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">
              Navigate
            </h4>
            <ul className="space-y-2">
              {[...NAV_LINKS, { label: "Book Now", href: "#booking" }].map(
                (link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      data-ocid="footer.link"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">
              Certifications
            </h4>
            <div className="space-y-2">
              {[
                "Approved Tour Operator",
                "MoT Recognized",
                "ATOAI Certified",
                "IMF Guidelines Compliant",
              ].map((cert) => (
                <div key={cert} className="flex items-center gap-2">
                  <Star size={12} className="text-hhe-ochre shrink-0" />
                  <span className="text-xs text-muted-foreground">{cert}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Separator className="bg-border mb-6" />
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-muted-foreground">
          <p>
            &copy; {year} Himalayan Hush Expeditions Pvt. Ltd. All rights
            reserved.
          </p>
          <p>
            Built with &#9829; using{" "}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-hhe-ochre transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ItinerarySection />
        <SustainabilitySection />
        <SafetySection />
        <PricingSection />
        <BookingSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}
