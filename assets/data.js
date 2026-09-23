/* ==========================================================================
   Site content that drives the Activities reel, the activity pages, the
   certificates wall and the gallery.

   Adding photos or videos to an activity: put the file in assets/media/ and
   add an entry to that activity's `media` list:
     { src: 'assets/media/file.webp', w: 1600, h: 1200, caption: '...' }
   Videos also take `video: 'assets/media/file.mp4'` (src is the poster).
   Screenshots take `shot: true` (kept out of the photo gallery).
   Every photo in an activity also appears in the Gallery automatically.
   ========================================================================== */
window.SITE_DATA = (function () {
  var M = 'assets/media/', I = 'assets/img/', S = 'assets/shots/', D = 'assets/docs/';

  var ACTIVITIES = [
    {
      id: 'af-ventures', title: 'A&F Ventures', kind: 'Venture', group: 'ventures',
      role: 'Co-founder · Business strategy and technical delivery', when: '2025 – present', where: 'Mombasa · Kenya and the DRC',
      status: ['live', 'Active'], glyph: 'mark', tone: 'paper',
      cover: I + 'af-team.webp',
      lead: 'A digital consultancy helping local small businesses adopt technology that fits their everyday needs.',
      body: [
        'Through A&F Ventures, I help local small businesses adopt technology that fits their everyday needs. Our work includes custom restaurant ordering websites, marketing landing pages, AI content and digital tools.',
        'A restaurant client reported that its new ordering system simplified its workflow and reduced reliance on third-party platforms, while giving it a direct customer channel and access to its own customer information.'
      ],
      did: ['Client discovery, proposals and solution reports', 'Designing and building ordering websites and landing pages', 'Setting up digital tools, content and ongoing support'],
      done: ['Two recurring client relationships, alongside one-time projects', 'A custom ordering website and backend delivered for Qaffee Point', 'About USD 500 of earnings directed to learning resources for YEC'],
      links: [['Visit A&F Ventures', 'https://digital-growth-partner-azure.vercel.app/'], ['Company profile (PDF)', D + 'af-ventures-company-profile.pdf'], ['Pitch deck (PDF)', D + 'af-ventures-building-africas-digital-infrastructure.pdf']],
      media: [
        { src: I + 'af-team.webp', w: 768, h: 1024, caption: 'Working through a client build with the A&F team' },
        { src: M + 'qaffee-demo.webp', video: M + 'qaffee-demo.mp4', w: 675, h: 1200, caption: 'Qaffee Point: a walkthrough of the ordering site we built' },
        { src: I + 'qaffee.webp', w: 1200, h: 750, caption: 'Qaffee Point: ordering website and backend', shot: true },
        { src: S + 'afventures.webp', w: 1200, h: 750, caption: 'The A&F Ventures website', shot: true },
        { src: S + 'massai.webp', w: 1200, h: 750, caption: 'Massai Group: one site for three restaurants', shot: true },
        { src: S + 'ntv.webp', w: 1200, h: 750, caption: 'Noortaaj Village, Kinshasa: ordering, catering and rewards', shot: true }
      ]
    },
    {
      id: 'fuel2save', title: 'Fuel2Save', kind: 'Startup', group: 'ventures',
      role: 'Co-founder', when: 'In development', where: 'Kenya',
      status: ['dev', 'In development'], glyph: 'fuel', tone: 'ink',
      cover: S + 'fuel2save.webp',
      lead: 'Helping drivers find participating stations, access fuel deals and rewards, and track what they spend.',
      body: [
        'Fuel2Save is a startup being developed to help drivers find participating fuel stations and access fuel deals and rewards. Its intended beneficiaries include boda boda and matatu riders, for whom fuel is a recurring operating expense.',
        'I want to explore how a practical business model can support people whose livelihoods depend on transport. The project connects my interests in finance and technology with the everyday cost pressures drivers face.'
      ],
      did: ['Shaping the product and business model', 'Building the marketing website', 'Preparing for a pilot with participating stations'],
      intended: ['A pilot with participating stations', 'Deals, rewards and spending tracking for drivers'],
      links: [['Visit Fuel2Save', 'https://fuelsave-website.vercel.app/']],
      media: [
        { src: S + 'fuel2save.webp', w: 1200, h: 750, caption: 'The Fuel2Save website', shot: true }
      ]
    },
    {
      id: 'earthpulse', title: 'EarthPulse', kind: 'Environment', group: 'community',
      role: 'Managing Director', when: '2025 – present', where: 'Mombasa, Kenya',
      status: ['live', 'Active'], glyph: 'leaf', tone: 'moss',
      cover: M + 'ep-team.webp',
      lead: 'A student team of about 20 turning concern about food waste into things people can do locally.',
      body: [
        'As Managing Director of EarthPulse, I help coordinate a team of around 20 students working on organic waste education and composting. We combined awareness sessions with a practical activity involving approximately 30 children, helping them understand how separating food waste can turn discarded material into a useful resource.',
        'Our work with St. Augustine Secondary, Port Reitz School and Regen Organics connects school learning with community participation and recycling expertise. We installed an Aerobin at school and began diverting organic food waste into it for composting.'
      ],
      did: ['Managing resources and coordinating tasks across the team', 'Reporting progress so the work continues beyond one event', 'Supporting awareness sessions and the school composting set-up'],
      done: ['USD 2,500 IB Global Youth Action Fund grant awarded to the team (2026)', 'Featured in IB’s Festival of Hope, Youth in Action', 'About 30 children in a practical session', 'An Aerobin composter installed at school'],
      intended: ['Compost for an EarthPulse garden', 'Compost donations to local farmers'],
      links: [['Visit earthpulse.africa', 'https://earthpulse.africa'], ['EarthPulse on IB’s Festival of Hope', 'https://ibo.org/festival-of-hope/youth-in-action/earthpulse---waste-to-worth?contentId=207695'], ['AKDN partnership proposal (PDF)', 'https://earthpulse.africa/documents/earthpulse-akdn-partnership-proposal.pdf']],
      media: [
        { src: M + 'ep-team.webp', w: 1080, h: 1080, caption: 'The EarthPulse team and their roles' },
        { src: I + 'g-aerobin.webp', w: 1600, h: 918, caption: 'Students and staff beside the Aerobin composter we installed at school' },
        { src: I + 'g-classroom.webp', w: 812, h: 600, caption: 'Leading a session with students in a classroom' },
        { src: I + 'g-fingerprint-tree.webp', w: 1600, h: 1200, caption: 'Students around our fingerprint tree poster on campus' },
        { src: M + 'twister.webp', video: M + 'twister.mp4', w: 960, h: 540, caption: 'A game of Twister during an awareness activity' },
        { src: M + 'ep-festival-of-hope.webp', w: 1600, h: 713, caption: 'EarthPulse listed on IB’s Festival of Hope, Youth in Action (screenshot)', shot: true }
      ]
    },
    {
      id: 'binman', title: 'BINMAN', kind: 'EarthPulse initiative', group: 'community',
      role: 'Concept, prototype and website', when: 'Preparing for launch', where: 'Mombasa, Kenya',
      status: ['prep', 'Preparing for launch'], glyph: 'bin', tone: 'paper',
      cover: S + 'binman.webp',
      lead: 'An app being developed to make recycling easier to take part in.',
      body: [
        'BINMAN is being developed to connect households with recycling companies, coordinate collections and reward eligible recyclable materials. Its intended benefit is to make waste separation more practical and worthwhile for households while helping recycling partners access recoverable materials.',
        'I helped shape the concept and prototype, developed its website and worked closely with the app developer.'
      ],
      did: ['Shaping the concept and the prototype', 'Designing and building binman.app, including a live prototype', 'Working with the app developer'],
      intended: ['Household collections and rewards once the service launches'],
      links: [['Visit binman.app', 'https://binman.app']],
      media: [
        { src: S + 'binman.webp', w: 1200, h: 750, caption: 'The BINMAN website with its live prototype', shot: true },
        { src: M + 'binman-app.webp', w: 1280, h: 1024, caption: 'The BINMAN app', shot: true }
      ]
    },
    {
      id: 'yec', title: 'Youth Enterprise Catalyst', kind: 'School initiative', group: 'community',
      role: 'Founder', when: '2025 – present', where: 'School, Mombasa',
      status: ['live', 'Weekly'], glyph: 'chart', tone: 'ember',
      lead: 'Weekly two-hour sessions on financial literacy, investing and entrepreneurship.',
      body: [
        'Through YEC, I help students explore financial literacy, investing and entrepreneurship in weekly two-hour sessions. We use learning materials, investment simulations and discussions to connect financial concepts with practical decisions.',
        'I want other students to have opportunities to explore money and enterprise early, ask questions and practise before facing real financial decisions. Part of my earnings from A&F helps fund the learning resources we use.'
      ],
      did: ['Planning and running the weekly sessions', 'Choosing resources: Coursera and edX (paid), Investopedia and simulators (free)', 'Pointing students to Forage virtual job simulations, which are practice tasks with a completion certificate'],
      links: [],
      media: []
    },
    {
      id: 'akam', title: 'Aga Khan Agency for Microfinance', kind: 'Internship', group: 'internships',
      role: 'Remote Intern', when: '2026 · five weeks', where: 'Remote',
      status: ['done', 'Completed'], glyph: 'bank', tone: 'ink',
      cover: M + 'akam-session.webp',
      lead: 'Five weeks studying how a microfinance bank lends to people with no collateral or credit history.',
      body: [
        'Through a remote internship involving HR, marketing and product teams, I researched organisational challenges and prepared presentations exploring potential AI-supported solutions. The experience strengthened my interest in how financial institutions and technology can respond to practical needs.',
        'My main study was working-capital lending at First MicroFinanceBank Afghanistan. I found that harvest timing, exchange rates and a borrower’s reputation often mattered more than anything in the credit file.'
      ],
      did: ['Sessions with the HR, marketing and product teams', 'Research between sessions, and presentations on AI-supported ideas', 'A written proposal: Reading beyond the credit file'],
      links: [['Read my proposal (PDF)', D + 'akam-internship-proposal.pdf'], ['Interactive reflection talk', 'https://internship-presentation-alpha.vercel.app']],
      media: [
        { src: M + 'akam-session.webp', w: 1400, h: 788, caption: 'A video session with the First MicroFinanceBank Afghanistan team' },
        { src: D + 'akam-internship-proposal-cover.webp', w: 640, h: 905, caption: 'My proposal: Reading beyond the credit file', shot: true }
      ]
    },
    {
      id: 'aviny', title: 'Aviny SARL', kind: 'Internship', group: 'internships',
      role: 'Finance Intern', when: '2024', where: 'Kinshasa, DRC',
      status: ['done', 'Completed'], glyph: 'building', tone: 'paper',
      cover: D + 'aviny-sarl-company-profile-2024-cover.webp',
      lead: 'Learning how reliable financial information supports decisions in a diversified trading group.',
      body: [
        'Working alongside the finance team at Aviny SARL introduced me to financial reporting and the decisions supporting retail, restaurant and catering operations. I observed how reliable information helps managers understand costs and allocate resources.',
        'Aviny SARL is my family’s diversified trading group, incorporated in Kinshasa in 2005, with activities spanning trading and distribution, retail, restaurants and services.'
      ],
      did: ['Working alongside the finance team', 'Learning how financial reports are prepared and used'],
      links: [['Company profile (PDF)', D + 'aviny-sarl-company-profile-2024.pdf']],
      media: [
        { src: D + 'aviny-sarl-company-profile-2024-cover.webp', w: 640, h: 906, caption: 'Aviny SARL company profile, 2024', shot: true }
      ]
    },
    {
      id: 'chess', title: 'East African Chess Academy', kind: 'Education', group: 'community',
      role: 'Co-founder, co-instructor and finance lead', when: '2021 – 2024 · four summers', where: 'Kinshasa, DRC',
      status: ['done', 'Completed'], glyph: 'knight', tone: 'ink',
      lead: 'Structured summer coaching for about 50 young players aged 9 to 16.',
      body: [
        'After noticing young people’s enthusiasm for chess in Kinshasa’s parks, mosques and public spaces, I joined my cousin in creating structured summer coaching. Across four summers, approximately 50 individual participants aged 9 to 16 gained access to instruction, equipment and organised tournaments. Many returned in later years.',
        'We assessed participants’ abilities and adapted sessions for different levels. I gave focused support to a talented student who lacked confidence in timed games. He became more comfortable playing with a clock and later achieved success in interschool competition.'
      ],
      did: ['Co-teaching sessions, rotating coaching with videos and peer strategy discussions', 'Running the finances: fees covered equipment and practical costs', 'Four seven-day programmes, two to three hours a day'],
      done: ['About 50 individual participants across four summers', 'Organised tournaments each summer'],
      links: [],
      media: []
    },
    {
      id: 'into-the-woods', title: 'Into the Woods', kind: 'School production', group: 'community',
      role: 'Finance team', when: '2026', where: 'School, Mombasa',
      status: ['done', 'Completed'], glyph: 'mask', tone: 'moss',
      lead: 'Sponsorship, budgeting and licensing behind our school musical.',
      body: [
        'I helped make our school’s production of Into the Woods possible through sponsorship outreach, budgeting, allocation and licensing work. I personally secured 50% of the funds raised.',
        'This showed me how financial and organisational work can support other people’s creativity.'
      ],
      did: ['Sponsorship outreach and sponsor commitments', 'Budgeting and allocation', 'Licensing work'],
      done: ['Personally secured 50% of the funds raised'],
      links: [],
      media: []
    },
    {
      id: 'waffle-chips', title: 'Waffle Chips', kind: 'Product', group: 'ventures',
      role: 'Co-founder', when: '2025', where: 'Mombasa, Kenya',
      status: ['done', 'First launch done'], glyph: 'bag', tone: 'ember',
      lead: 'A snack product built with a supplier we met through Zawadi Bazaar.',
      body: [
        'Waffle Chips grew from a supplier relationship developed through Zawadi Bazaar. We combined the supplier’s manufacturing capabilities with our product ideas, branding and marketing to bring a snack product to market.',
        'The project helped me see how combining different people’s skills can turn an idea into a product.'
      ],
      did: ['Product ideas, branding and marketing', 'Working with the supplier on production'],
      done: ['Initial launch sold about 100 units'],
      links: [],
      media: []
    },
    {
      id: 'zawadi', title: 'Zawadi Bazaar', kind: 'School enterprise', group: 'ventures',
      role: 'Co-lead · four stalls', when: '2024 – 2025', where: 'School, Mombasa',
      status: ['done', 'Completed'], glyph: 'stall', tone: 'paper',
      lead: 'A four-stall school operation, with half of net proceeds going to sustainability initiatives.',
      body: [
        'I co-led a four-stall operation at our school’s Zawadi Bazaar, coordinating suppliers, stock, payment systems and sales tracking.',
        'The operation generated approximately KES 180,000 in sales, with 50% of net proceeds directed toward sustainability initiatives.'
      ],
      did: ['Supplier coordination and stock', 'Payment systems and sales tracking'],
      done: ['About KES 180,000 in sales', 'Half of net proceeds (not of sales) to sustainability initiatives'],
      links: [],
      media: []
    },
    {
      id: 'ge-summer', title: 'GE Summer Programme', kind: 'Programme abroad', group: 'community',
      role: 'Participant', when: '2025', where: 'Kyrgyzstan',
      status: ['done', 'Completed'], glyph: 'globe', tone: 'ink',
      lead: 'Workshops on technology, AI and entrepreneurship with an international group.',
      body: [
        'During the GE Summer Programme in Kyrgyzstan, I collaborated with an international group on technology, AI and entrepreneurship activities. We worked with SPCE schools and local communities to deliver interactive workshops introducing these topics.',
        'The experience helped me practise explaining unfamiliar ideas to different audiences and learn from people with different experiences.'
      ],
      did: ['Planning and delivering interactive workshops', 'Collaborating with an international group'],
      links: [],
      media: []
    }
  ];

  /* Certificates wall. Add `img` (and optionally `file`) when a photo or
     scan of the certificate is ready: put it in assets/media/. */
  var CERTS = [
    { title: 'Investment Banking Job Simulation', issuer: 'JP Morgan · Forage', year: 'Sept 2025', img: D + 'jpmorgan-investment-banking-job-simulation-cover.webp', file: D + 'jpmorgan-investment-banking-job-simulation.pdf', icon: 'doc' },
    { title: 'Virtual Job Simulation', issuer: 'Fidelity International · Forage', year: 'Forage', icon: 'doc' },
    { title: 'Second Honours', issuer: 'Academic award · three times', year: 'School', icon: 'medal' },
    { title: 'Most Improved', issuer: 'Academic award', year: 'School', icon: 'medal' },
    { title: 'GE Award', issuer: 'GE Summer Programme, Kyrgyzstan', year: '2025', icon: 'globe' },
    { title: 'Beat a chess grandmaster', issuer: 'Chess', year: 'Chess', icon: 'knight' },
    { title: 'Table tennis', issuer: 'Inter-school & Congo Olympics, Kinshasa', year: '2021 – 2024', icon: 'trophy' }
  ];

  /* Extra gallery photos that don't belong to one activity. */
  var GALLERY_EXTRA = [
    { src: I + 'portrait.webp', w: 1000, h: 1000, caption: 'Avi Dharani', group: 'life' }
  ];

  return { ACTIVITIES: ACTIVITIES, CERTS: CERTS, GALLERY_EXTRA: GALLERY_EXTRA };
})();
