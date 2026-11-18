/* ALL editable content lives here. The Admin Panel (built later) will override this via localStorage key "ugc_site_override". */
window.SITE_DEFAULTS = {
  theme: "charcoal-orange",
  brand: { name: "Hassan", title: "UGC Ads Creator", logoText: "Hassan." },
  hero: {
    headline: "UGC ads that look real, so people actually watch them.",
    text: "I create UGC-style video ads that show your product naturally and stop the scroll on TikTok, Instagram Reels and Facebook.",
    image: "",
    cta1: { text: "View My Work", href: "portfolio.html" },
    cta2: { text: "Work With Me", href: "contact.html" },
    badge: "Open for new brand projects"
  },
  stats: [
    { value: 120, suffix: "+", label: "UGC Ads Created" },
    { value: 25, suffix: "+", label: "Brands Worked With" },
    { value: 3, suffix: "+", label: "Years of Experience" },
    { value: 4.9, suffix: "/5", label: "Average Client Rating", decimals: 1 }
  ],
  services: [
    { icon: "video", title: "UGC Video Ads", text: "Natural-looking ads that present your product like a real customer would." },
    { icon: "box", title: "Product Demo Videos", text: "Clear, hands-on demos that show how your product works and why it matters." },
    { icon: "quote", title: "Testimonial-Style Ads", text: "Customer-voice ads that build trust within the first few seconds." },
    { icon: "phone", title: "TikTok & Instagram Reels Ads", text: "Vertical, fast-paced edits made for the way people scroll." },
    { icon: "star", title: "Product Review Videos", text: "Honest-feeling reviews that turn curiosity into clicks." },
    { icon: "spark", title: "AI-Powered UGC Ads", text: "AI-assisted production for faster turnaround and more creative variations." }
  ],
  why: [
    { icon: "heart", title: "Authentic UGC-style content", text: "Ads that feel like real people sharing real products.", big: true },
    { icon: "hook", title: "Strong hooks", text: "The first 3 seconds are built to stop the scroll." },
    { icon: "phone", title: "Made for social", text: "Short-form, vertical, platform-ready." },
    { icon: "box", title: "Product-focused storytelling", text: "Your product stays the hero of every video." },
    { icon: "user", title: "Natural, relatable presentation", text: "Friendly delivery your audience connects with." },
    { icon: "bolt", title: "Fast, professional production", text: "Clear timelines and reliable delivery." },
    { icon: "video", title: "Feels like content, not an ad", text: "Viewers watch because it's worth watching.", big: true }
  ],
  testimonials: [
    { text: "Sample testimonial: the UGC videos felt completely natural and our audience responded right away. Replace this with a real client quote.", name: "Client Name", role: "Brand / Company" },
    { text: "Sample testimonial: great communication, creative ideas and fast delivery. Replace this with a real client quote.", name: "Client Name", role: "Brand / Company" },
    { text: "Sample testimonial: professional, easy to work with and the ads looked authentic. Replace this with a real client quote.", name: "Client Name", role: "Brand / Company" }
  ],
  brands: [
    { name: "Brand One", logo: "" }, { name: "Brand Two", logo: "" }, { name: "Brand Three", logo: "" },
    { name: "Brand Four", logo: "" }, { name: "Brand Five", logo: "" }, { name: "Brand Six", logo: "" },
    { name: "Brand Seven", logo: "" }, { name: "Brand Eight", logo: "" }
  ],
  steps: [
    { title: "Send your product & brief", text: "Tell me about your product, audience and goals." },
    { title: "UGC concept & script", text: "I plan the hook, angle and script for your approval." },
    { title: "Video creation", text: "I shoot and edit the ad in a natural UGC style." },
    { title: "Final ad delivered", text: "You get platform-ready files, ready to run." }
  ],
  cta: { title: "Ready to get UGC ads that feel real?", text: "Send me your product and I'll turn it into scroll-stopping video ads for your brand.", button: "Start Your Project", href: "contact.html" },
  portfolio: {
    title: "UGC ads portfolio",
    intro: "Authentic, scroll-stopping video ads I've created for brands. Pick a category to browse.",
    categories: ["Product UGC Ads","Social Media Video Ads","AI UGC Ads"],
    projects: [
      { id: "project-1", title: "Project Title One", brand: "Brand / Product Name", description: "Placeholder: one line about the UGC ad you created for this project.", category: "Product UGC Ads", platform: "TikTok", tags: ["UGC","Hook","Demo"], featured: true, enabled: true, thumb: "", video: "" },
      { id: "project-2", title: "Project Title Two", brand: "Brand / Product Name", description: "Placeholder: one line about the UGC ad you created for this project.", category: "Social Media Video Ads", platform: "Instagram Reels", tags: ["UGC","Hook","Demo"], featured: true, enabled: true, thumb: "", video: "" },
      { id: "project-3", title: "Project Title Three", brand: "Brand / Product Name", description: "Placeholder: one line about the UGC ad you created for this project.", category: "AI UGC Ads", platform: "TikTok", tags: ["UGC","Hook","Demo"], featured: true, enabled: true, thumb: "", video: "" },
      { id: "project-4", title: "Project Title Four", brand: "Brand / Product Name", description: "Placeholder: one line about the UGC ad you created for this project.", category: "Product UGC Ads", platform: "Instagram Reels", tags: ["UGC","Hook","Demo"], featured: true, enabled: true, thumb: "", video: "" },
      { id: "project-5", title: "Project Title Five", brand: "Brand / Product Name", description: "Placeholder: one line about the UGC ad you created for this project.", category: "Social Media Video Ads", platform: "Facebook", tags: ["UGC","Hook","Demo"], featured: true, enabled: true, thumb: "", video: "" },
      { id: "project-6", title: "Project Title Six", brand: "Brand / Product Name", description: "Placeholder: one line about the UGC ad you created for this project.", category: "AI UGC Ads", platform: "Instagram Reels", tags: ["UGC","Hook","Demo"], featured: true, enabled: true, thumb: "", video: "" },
      { id: "project-7", title: "Project Title Seven", brand: "Brand / Product Name", description: "Placeholder: one line about the UGC ad you created for this project.", category: "Product UGC Ads", platform: "Facebook", tags: ["UGC","Hook","Demo"], featured: false, enabled: true, thumb: "", video: "" },
      { id: "project-8", title: "Project Title Eight", brand: "Brand / Product Name", description: "Placeholder: one line about the UGC ad you created for this project.", category: "Social Media Video Ads", platform: "TikTok", tags: ["UGC","Hook","Demo"], featured: false, enabled: true, thumb: "", video: "" },
      { id: "project-9", title: "Project Title Nine", brand: "Brand / Product Name", description: "Placeholder: one line about the UGC ad you created for this project.", category: "AI UGC Ads", platform: "Facebook", tags: ["UGC","Hook","Demo"], featured: false, enabled: true, thumb: "", video: "" }
    ]
  },
  about: {
    title: "I make AI UGC ads that look and feel real.",
    intro: "I use AI to turn products into natural, engaging UGC-style video ads for brands.",
    image: "",
    story: [
      "I'm currently focused on creating AI-powered UGC ads for brands. I use AI to create UGC-style advertising videos that make products look natural, engaging and suitable for modern social media advertising.",
      "My goal is to help brands turn their products into high-quality UGC advertisements using AI, while keeping the content visually realistic, professional and attention-grabbing."
    ],
    timelineTitle: "My journey",
    timeline: [
      { title: "Started creating AI UGC ads", date: "Add date", text: "Placeholder: add a short note about how this started." },
      { title: "Created first AI UGC projects", date: "Add date", text: "Placeholder: add a short note about your first projects." },
      { title: "Started creating AI ads for brands", date: "Add date", text: "Placeholder: add a short note about working with brands." },
      { title: "Built my AI UGC portfolio", date: "Add date", text: "Placeholder: add a short note about building this portfolio." },
      { title: "Continued expanding AI UGC work", date: "Ongoing", text: "Placeholder: add a short note about what you're building next." }
    ],
    diffTitle: "What makes my AI UGC ads different",
    diff: [
      { icon: "spark", title: "AI-powered UGC ad creation", text: "Ads built with AI from the first concept to the final video." },
      { icon: "user", title: "Realistic UGC-style visuals", text: "Scenes and creators that look like everyday social content." },
      { icon: "box", title: "Product-focused AI video", text: "Your product stays clear, visible and central in every video." },
      { icon: "heart", title: "Natural-looking AI scenes", text: "Settings and moments that feel believable, not artificial." },
      { icon: "star", title: "Professional presentation", text: "Clean, polished ads that look right for your brand." },
      { icon: "phone", title: "Designed as UGC-style ads", text: "Made for social platforms, not for traditional ad formats." }
    ],
    skillsTitle: "AI UGC skills",
    showPercent: false,
    skills: [
      { name: "AI UGC Ad Creation", level: 80 },
      { name: "Realistic AI UGC Video Creation", level: 75 },
      { name: "AI Product Ad Creation", level: 80 },
      { name: "AI Character/Creator Generation", level: 70 },
      { name: "AI Video Production", level: 75 }
    ],
    workflowTitle: "How I create AI UGC ads",
    workflow: [
      { title: "Understand the brand & product", text: "I learn what you sell, who it's for and what you want the ad to do." },
      { title: "Create the AI UGC concept", text: "I plan the idea, hook and script for your AI UGC ad." },
      { title: "Generate the AI UGC video", text: "I produce the video with AI tools in a natural UGC style." },
      { title: "Refine the final ad", text: "I polish the video until it looks realistic and on-brand." },
      { title: "Deliver the completed UGC ad", text: "You receive the finished ad, ready for social media." }
    ],
    cta: { title: "Ready to create your AI UGC ad?", text: "Send me your product and I'll turn it into a realistic, engaging UGC-style ad.", button: "Create Your AI UGC Ad", href: "contact.html" }
  },
  servicePage: {
    title: "AI UGC ads for brands",
    intro: "One focused service: realistic, engaging UGC-style ads for your product, created with AI.",
    items: [{
      icon: "spark",
      image: "",
      label: "My service",
      title: "AI UGC Ads",
      description: "I create realistic, engaging and professional UGC-style advertisements for brands using AI. These ads showcase your product in a natural UGC format and are made for TikTok, Instagram Reels, Facebook and similar platforms.",
      features: [
        "AI-powered UGC video creation",
        "Realistic UGC-style presentation",
        "Product-focused advertising content",
        "Professional visual quality",
        "Content created specifically for brands"
      ],
      platforms: ["TikTok", "Instagram Reels", "Facebook"],
      priceLabel: "Starting at",
      price: "Add price",
      priceNote: "",
      cta: { text: "Create Your AI UGC Ad", href: "contact.html" }
    }],
    cta: { title: "Ready to create your AI UGC ad?", text: "Tell me about your product and I'll get started.", button: "Work With Me", href: "contact.html" }
  },
  awardsPage: {
    title: "Awards & Achievements",
    intro: "Recognition and milestones from my journey creating AI-powered UGC advertisements for brands.",
    emptyText: "Achievements will appear here soon.",
    /* Placeholders only: replace with real, confirmed achievements. Set enabled:false to hide one. */
    items: [
      { title: "Achievement Title", year: "Year", by: "Awarded by", description: "Placeholder: explain what this achievement is and why it matters for your AI UGC ad work.", icon: "trophy", image: "", featured: true, enabled: true },
      { title: "Achievement Title", year: "Year", by: "Awarded by", description: "Placeholder: explain what this achievement is and why it matters for your AI UGC ad work.", icon: "star", image: "", featured: false, enabled: true },
      { title: "Achievement Title", year: "Year", by: "Awarded by", description: "Placeholder: explain what this achievement is and why it matters for your AI UGC ad work.", icon: "spark", image: "", featured: false, enabled: true }
    ],
    cta: { title: "Want an AI UGC ad for your brand?", text: "Create a professional AI-powered UGC advertisement designed around your product and brand.", primary: { text: "Create Your AI UGC Ad", href: "contact.html" }, secondary: { text: "View My UGC Work", href: "portfolio.html" } }
  },
  contactPage: {
    title: "Let's create your AI UGC ad",
    intro: "Have a product or brand that needs a professional AI UGC advertisement? Get in touch and let's discuss your project.",
    emailLabel: "Email",
    whatsapp: { label: "WhatsApp", text: "Available on request", number: "", button: "Request WhatsApp Contact" },
    socialLabel: "Follow my work",
    form: {
      /* Paste a form-service URL (e.g. Formspree) here to enable real submissions. While empty, the form opens the visitor's email app instead. */
      endpoint: "",
      title: "Send your project details",
      labels: { name: "Name", email: "Email", type: "Project type", budget: "Budget", message: "Message" },
      placeholders: { name: "Your name", email: "you@brand.com", message: "Tell me about your product, brand and what you need..." },
      typeChoose: "Select a project type",
      budgetChoose: "Select a budget (optional)",
      types: ["AI UGC Product Ad", "AI UGC Video Ad", "Other AI UGC Project"],
      budgets: ["Under $100", "$100 - $250", "$250 - $500", "$500+", "Custom Budget"],
      submit: "Send Project Request",
      success: "Thank you! Your project request has been received. I'll get back to you soon.",
      mailtoNote: "Your email app should now open with your project details. Press send there to deliver your request.",
      errors: { name: "Please enter your name.", email: "Please enter a valid email address.", type: "Please choose a project type.", message: "Please tell me about your project." }
    },
    cta: { title: "Ready to create your AI UGC ad?", text: "Send your project details and let's turn your product into a professional AI-powered UGC advertisement.", button: "Start Your Project" }
  },
  nav: [
    { text: "Home", href: "index.html" }, { text: "Portfolio", href: "portfolio.html" },
    { text: "Services", href: "services.html" }, { text: "About", href: "about.html" }, { text: "Awards", href: "awards.html" }, { text: "Contact", href: "contact.html" }
  ],
  contact: { email: "ahmed.editz@gmail.com", phone: "" },
  social: { tiktok: "#", instagram: "#", facebook: "#", youtube: "#" },
  footerText: "UGC ads for brands that want authentic, engaging video content on social media."
};
