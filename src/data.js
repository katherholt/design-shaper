export const F = "'DM Sans', sans-serif";
export const FS = "'Instrument Serif', serif";

export const C = {
  process: {
    label: "Process", sub: "Ambiguity to shipped product",
    accent: "#D4A574", grad: "linear-gradient(135deg, #D4A574 0%, #8B6C5C 100%)",
    items: [
      { name: "Define Problem", q: "How confident are you reframing vague briefs into clear problem statements?" },
      { name: "Prioritize & Scope", q: "How well do you cut scope ruthlessly while preserving core value?" },
      { name: "Research & Understand", q: "How often do you run primary research vs. relying on assumptions?" },
      { name: "Identify Constraints", q: "How naturally do you map technical, business, and time constraints before designing?" },
      { name: "Explore Solutions", q: "Do you explore many directions before converging, or jump to the first good idea?" },
      { name: "Align Stakeholders", q: "How comfortable are you presenting to skeptical execs and resolving conflicting feedback?" },
      { name: "Refine & Validate", q: "How rigorously do you test with real users before shipping?" },
      { name: "Ship & QA", q: "How obsessive are you about implementation fidelity and edge cases?" },
      { name: "Measure & Iterate", q: "After launch, how consistently do you close the loop with data?" },
    ],
  },
  skills: {
    label: "Skills", sub: "Your craft toolkit",
    accent: "#7FA3C9", grad: "linear-gradient(135deg, #7FA3C9 0%, #5C6B7A 100%)",
    items: [
      { name: "Interaction Design", q: "How fluently do you think in states, transitions, and edge cases?" },
      { name: "Visual Design", q: "How strong is your eye for typography, color, and spatial composition?" },
      { name: "Information Architecture", q: "How well do you organize complex information into intuitive structures?" },
      { name: "Design Systems", q: "Could you build or maintain a production design system from scratch?" },
      { name: "Research", q: "How comfortable are you planning and running studies end-to-end?" },
      { name: "Prototyping & Motion", q: "How quickly can you make a believable interactive prototype?" },
      { name: "Data Literacy", q: "How confident are you interpreting analytics and designing experiments?" },
      { name: "Content Design", q: "How much do you sweat the words in your interfaces?" },
      { name: "Brand & Marketing", q: "Can you extend a brand identity into campaign work?" },
      { name: "Front-end Fluency", q: "How well do you understand what's easy vs. hard to build?" },
    ],
  },
  areas: {
    label: "Product Areas", sub: "Surfaces you've designed for",
    accent: "#A37FC9", grad: "linear-gradient(135deg, #A37FC9 0%, #6B5C7A 100%)",
    items: [
      { name: "Onboarding", q: "Have you designed flows that measurably improved activation?" },
      { name: "Core Task", q: "How deep is your experience with the primary value-delivery surface?" },
      { name: "Navigation & IA", q: "Have you designed nav systems for complex, multi-level products?" },
      { name: "Search & Discovery", q: "How experienced are you with search UX, filters, and discovery?" },
      { name: "Messaging & Comms", q: "Have you designed real-time messaging or notification systems?" },
      { name: "Settings & Permissions", q: "How much experience with settings, roles, and access control?" },
      { name: "Payments & Billing", q: "Have you designed payment flows or upgrade paths?" },
      { name: "Data & Dashboards", q: "How confident designing data-dense interfaces?" },
      { name: "Collaboration", q: "Have you designed multi-user or sharing experiences?" },
      { name: "Edge Cases", q: "How thoroughly do you design for empty, error, and loading states?" },
      { name: "Admin & Internal", q: "Have you designed internal tools or admin interfaces?" },
      { name: "Retention & Growth", q: "How experienced with growth loops and retention mechanics?" },
    ],
  },
  deliverables: {
    label: "Deliverables", sub: "What you produce and hand off",
    accent: "#7FC9A3", grad: "linear-gradient(135deg, #7FC9A3 0%, #5C7A6B 100%)",
    items: [
      { name: "User Flows", q: "How polished and comprehensive is your flow documentation?" },
      { name: "Wireframes", q: "Do you wireframe to think, or jump straight to high-fidelity?" },
      { name: "Hi-Fi Mocks", q: "How production-ready are your high-fidelity designs?" },
      { name: "Prototypes", q: "How often do you build interactive prototypes vs. static screens?" },
      { name: "System Components", q: "How documented and reusable are your component designs?" },
      { name: "Specs & Handoff", q: "How smooth is your dev handoff process?" },
      { name: "Research Artifacts", q: "How compelling are your research presentations?" },
      { name: "Competitive Audits", q: "How thorough are your competitive analyses?" },
    ],
  },
  collaboration: {
    label: "Collaboration", sub: "How you work through others",
    accent: "#C9A37F", grad: "linear-gradient(135deg, #C9A37F 0%, #7A6B5C 100%)",
    items: [
      { name: "Solo IC", q: "How productive in long, uninterrupted design sprints?" },
      { name: "Squad Embedded", q: "How naturally do you operate cross-functionally?" },
      { name: "Facilitation", q: "How confident leading workshops and critique sessions?" },
      { name: "Stakeholder Mgmt", q: "How skilled at managing up and building exec narratives?" },
      { name: "Mentorship", q: "How much experience mentoring other designers?" },
    ],
  },
  craft: {
    label: "Craft Sensibility", sub: "The eye behind the work",
    accent: "#C97F8A", grad: "linear-gradient(135deg, #C97F8A 0%, #7A5C62 100%)",
    link: "https://www.interfacecraft.dev/",
    items: [
      { name: "Noticing", q: "How naturally do you spot the subtle details that elevate or undermine an interface?" },
      { name: "Conceptual Range", q: "How wide do you explore before committing to a direction?" },
      { name: "Conceptual Depth", q: "How many intentional iterations deep do you go on a single solution?" },
      { name: "Live Tuning", q: "How often do you create an immediate feedback loop with what you're designing?" },
      { name: "Uncommon Care", q: "How consistently do you push past 'good enough' to make people feel something?" },
      { name: "Separation of Concerns", q: "How disciplined are you at isolating and resolving one design problem at a time?" },
      { name: "Facets of Quality", q: "How clearly can you define and measure the specific quality attributes that matter to you?" },
      { name: "Less, but Better", q: "How ruthlessly do you strip away the unnecessary?" },
      { name: "Recreate Everything", q: "How often do you reverse-engineer great work to learn from it?" },
      { name: "Industry Standards", q: "How well do you understand the invisible bar users expect from modern software?" },
    ],
  },
};

export const CK = Object.keys(C);

export const SHAPES = [
  {
    name: "The Craftsperson",
    desc: "Precision in pixels. Depth over breadth.",
    color: "#C4A882",
    r: { process:{0:3,1:2,2:2,3:3,4:5,5:2,6:4,7:5,8:2}, skills:{0:4,1:5,2:3,3:5,4:2,5:5,6:2,7:3,8:4,9:3}, areas:{0:4,1:5,2:3,3:3,4:3,5:2,6:3,7:2,8:2,9:5,10:2,11:2}, deliverables:{0:3,1:3,2:5,3:5,4:5,5:4,6:2,7:2}, collaboration:{0:5,1:3,2:3,3:2,4:2}, craft:{0:5,1:3,2:5,3:4,4:5,5:4,6:5,7:4,8:4,9:4} },
    craftProfile: { natural: ["Noticing", "Uncommon Care", "Facets of Quality", "Conceptual Depth"], stretch: ["Conceptual Range", "Less, but Better"] },
    ai: {
      risk: "Visual production is AI's fastest-improving capability. Prompt-to-UI tools already generate polished mockups and component variants in seconds. Hi-fi execution alone is no longer a moat.",
      edge: "Taste, aesthetic judgment, and the ability to make a product feel intentional rather than generated. AI can produce — you curate, refine, and elevate. Design systems built for AI consumption (machine-readable tokens, structured documentation) become your new craft.",
      adapt: "Shift from producing pixels to governing quality. Learn to direct AI outputs with precision. Your eye is the filter."
    },
  },
  {
    name: "The Architect",
    desc: "Scales design through structure.",
    color: "#82A8C4",
    r: { process:{0:4,1:4,2:3,3:5,4:3,5:3,6:3,7:4,8:3}, skills:{0:5,1:4,2:5,3:5,4:3,5:3,6:3,7:4,8:2,9:5}, areas:{0:3,1:4,2:5,3:4,4:3,5:4,6:3,7:4,8:3,9:5,10:4,11:2}, deliverables:{0:4,1:4,2:4,3:3,4:5,5:5,6:3,7:3}, collaboration:{0:4,1:5,2:4,3:3,4:4}, craft:{0:4,1:3,2:4,3:3,4:3,5:5,6:4,7:5,8:3,9:5} },
    craftProfile: { natural: ["Separation of Concerns", "Less, but Better", "Industry Standards"], stretch: ["Uncommon Care", "Live Tuning"] },
    ai: {
      risk: "AI agents now enforce design systems automatically, scanning for drift and generating components from tokens. The maintenance layer of systems work gets automated.",
      edge: "The thinking behind the system — token architecture, governance models, when to break patterns. AI enforces rules; you decide which rules matter. Systems that serve both humans and AI audiences are the new high ground.",
      adapt: "Build systems AI can consume. DTCG-standard tokens, machine-readable docs, structured APIs. Your system becomes the intelligence layer."
    },
  },
  {
    name: "The Optimizer",
    desc: "Moves metrics. Designs for outcomes.",
    color: "#A882C4",
    r: { process:{0:4,1:5,2:4,3:4,4:3,5:3,6:5,7:3,8:5}, skills:{0:4,1:3,2:3,3:2,4:4,5:3,6:5,7:4,8:3,9:3}, areas:{0:5,1:3,2:3,3:4,4:2,5:3,6:5,7:4,8:2,9:3,10:2,11:5}, deliverables:{0:4,1:3,2:3,3:4,4:2,5:3,6:4,7:5}, collaboration:{0:3,1:5,2:3,3:4,4:2}, craft:{0:3,1:4,2:3,3:5,4:2,5:3,6:4,7:3,8:4,9:5} },
    craftProfile: { natural: ["Live Tuning", "Industry Standards", "Recreate Everything"], stretch: ["Uncommon Care", "Conceptual Depth"] },
    ai: {
      risk: "AI excels at running experiments at scale — generating variants, analyzing results, and optimizing funnels autonomously. The execution layer of growth design is highly automatable.",
      edge: "Knowing which experiments to run and why. Framing the right hypotheses, understanding behavioral psychology, and connecting metric movement to business strategy. AI optimizes — you decide what's worth optimizing.",
      adapt: "Move upstream from execution to experimentation strategy. Learn to orchestrate AI-run experiments and focus on the judgment calls AI can't make."
    },
  },
  {
    name: "The Listener",
    desc: "Evidence over intuition. Users first.",
    color: "#82C4A8",
    r: { process:{0:5,1:3,2:5,3:4,4:4,5:3,6:5,7:2,8:4}, skills:{0:3,1:3,2:4,3:2,4:5,5:2,6:4,7:4,8:2,9:2}, areas:{0:4,1:4,2:4,3:3,4:3,5:3,6:2,7:3,8:3,9:4,10:2,11:3}, deliverables:{0:5,1:4,2:3,3:3,4:2,5:2,6:5,7:5}, collaboration:{0:3,1:4,2:5,3:3,4:3}, craft:{0:5,1:4,2:3,3:2,4:4,5:3,6:3,7:3,8:3,9:4} },
    craftProfile: { natural: ["Noticing", "Conceptual Range", "Uncommon Care"], stretch: ["Live Tuning", "Recreate Everything"] },
    ai: {
      risk: "AI can now synthesize qualitative research, auto-generate journey maps, and summarize interview transcripts. The processing layer of research is increasingly automated.",
      edge: "The questions you ask, not the answers you process. Reading between the lines of what users say, sensing emotional subtext, and reframing problems humans didn't know they had. AI summarizes — you interpret.",
      adapt: "Use AI to compress analysis time and scale your reach. Reinvest that time in deeper, harder-to-automate methods: contextual inquiry, participatory design, longitudinal relationships."
    },
  },
  {
    name: "The Builder",
    desc: "Ships fast. Wears every hat.",
    color: "#C4B882",
    r: { process:{0:5,1:5,2:3,3:5,4:4,5:4,6:3,7:4,8:4}, skills:{0:4,1:4,2:3,3:3,4:3,5:4,6:4,7:3,8:4,9:5}, areas:{0:5,1:5,2:4,3:3,4:3,5:4,6:5,7:3,8:3,9:4,10:3,11:5}, deliverables:{0:3,1:2,2:4,3:5,4:2,5:2,6:2,7:3}, collaboration:{0:5,1:4,2:3,3:5,4:3}, craft:{0:3,1:4,2:2,3:5,4:3,5:2,6:3,7:4,8:5,9:4} },
    craftProfile: { natural: ["Live Tuning", "Recreate Everything", "Less, but Better"], stretch: ["Conceptual Depth", "Separation of Concerns"] },
    ai: {
      risk: "AI coding tools now let anyone go from concept to deployed product in hours. The scrappy generalist's speed advantage is shrinking as non-designers build passable products with AI.",
      edge: "Taste applied at velocity, plus the strategic judgment of what to build and why. AI can build — you can build the right thing. Product sense, founder intuition, and the ability to navigate ambiguity with conviction.",
      adapt: "Leverage AI as your design team. Use prompt-to-prototype to move even faster, but double down on product strategy and market sense — the things that make what you ship matter."
    },
  },
  {
    name: "The Conductor",
    desc: "Multiplies through people and clarity.",
    color: "#C49882",
    r: { process:{0:5,1:5,2:4,3:4,4:3,5:5,6:4,7:3,8:4}, skills:{0:4,1:3,2:4,3:4,4:3,5:2,6:4,7:3,8:3,9:4}, areas:{0:3,1:4,2:4,3:3,4:3,5:3,6:3,7:4,8:4,9:3,10:3,11:3}, deliverables:{0:4,1:3,2:3,3:2,4:4,5:3,6:4,7:4}, collaboration:{0:2,1:5,2:5,3:5,4:5}, craft:{0:4,1:3,2:3,3:2,4:4,5:4,6:5,7:3,8:2,9:4} },
    craftProfile: { natural: ["Facets of Quality", "Noticing", "Separation of Concerns"], stretch: ["Conceptual Range", "Recreate Everything"] },
    ai: {
      risk: "AI reduces team size needed for execution, so management layers face pressure. Some coordination and review work gets absorbed by AI-powered design QA and automated crits.",
      edge: "Human judgment in ambiguity, building trust, navigating politics, and making trade-offs that require emotional intelligence. AI can review — it can't inspire a team or hold a room.",
      adapt: "Become the person who connects AI capabilities to business outcomes. Orchestrate human-AI teams. The future design leader isn't managing more designers — they're conducting a system of humans and agents."
    },
  },
];

export const LEVELS = [
  { v: 1, l: "Aware", d: "I understand it conceptually" },
  { v: 2, l: "Learning", d: "Building this muscle" },
  { v: 3, l: "Competent", d: "I do this independently" },
  { v: 4, l: "Strong", d: "A real strength" },
  { v: 5, l: "Expert", d: "I could teach this" },
];
