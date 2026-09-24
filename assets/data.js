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
        { src: S + 'ntv.webp', w: 1200, h: 750, caption: 'Noortaaj Village, Kinshasa: ordering, catering and rewards', shot: true },
        { src: M + 'af-qaffee-team.webp', w: 1226, h: 1280, caption: 'At Qaffee Point with the restaurant team' },
        { src: M + 'af-client-meeting.webp', w: 1600, h: 1200, caption: 'A client meeting' },
        { src: M + 'af-qaffee-visit.webp', w: 1200, h: 1600, caption: 'Visiting our client, Qaffee Point' },
        { src: M + 'af-qaffee-store.webp', w: 1200, h: 1600, caption: 'Qaffee Point, Mombasa' }
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
      done: ['USD 2,500 IB Global Youth Action Fund grant awarded to the team (2026)', 'Featured in IB’s Festival of Hope, Youth in Action', 'About 30 children in a practical session', 'An Aerobin composter installed at school', 'DP CAS Award from The Aga Khan Academy, Mombasa, for my EarthPulse contribution (2025–26)'],
      intended: ['Compost for an EarthPulse garden', 'Compost donations to local farmers'],
      links: [['Visit earthpulse.africa', 'https://earthpulse.africa'], ['EarthPulse on IB’s Festival of Hope', 'https://ibo.org/festival-of-hope/youth-in-action/earthpulse---waste-to-worth?contentId=207695'], ['AKDN partnership proposal (PDF)', 'https://earthpulse.africa/documents/earthpulse-akdn-partnership-proposal.pdf']],
      media: [
        { src: M + 'ep-team.webp', w: 1080, h: 1080, caption: 'The EarthPulse team and their roles' },
        { src: I + 'g-aerobin.webp', w: 1600, h: 918, caption: 'Students and staff beside the Aerobin composter we installed at school' },
        { src: I + 'g-classroom.webp', w: 812, h: 600, caption: 'Leading a session with students in a classroom' },
        { src: I + 'g-fingerprint-tree.webp', w: 1600, h: 1200, caption: 'Students around our fingerprint tree poster on campus' },
        { src: M + 'twister.webp', video: M + 'twister.mp4', w: 960, h: 540, caption: 'A game of Twister during an awareness activity' },
        { src: M + 'ep-festival-of-hope.webp', w: 1600, h: 713, caption: 'EarthPulse listed on IB’s Festival of Hope, Youth in Action (screenshot)', shot: true },
        { src: M + 'ep-sorting.webp', w: 1600, h: 900, caption: 'A waste-sorting activity with students' },
        { src: M + 'ep-sorting-2.webp', w: 1600, h: 900, caption: 'Sorting recyclables into labelled boxes' },
        { src: M + 'ep-aerobin.webp', video: M + 'ep-aerobin.mp4', w: 568, h: 320, caption: 'Installing the Aerobin composter at school' },
        { src: M + 'ep-cas-board.webp', w: 960, h: 1280, caption: 'EarthPulse on the school CAS board' },
        { src: M + 'p-056.webp', w: 1600, h: 900, caption: 'A Twister game during an awareness activity' },
        { src: M + 'p-057.webp', w: 1200, h: 1600, caption: 'Students playing Twister' },
        { src: M + 'p-058.webp', w: 1200, h: 1600, caption: 'Students playing Twister' },
        { src: M + 'p-059.webp', w: 1200, h: 1600, caption: 'Students playing Twister' },
        { src: M + 'p-064.webp', w: 1600, h: 900, caption: 'Sorting recyclables with students' },
        { src: M + 'ep-twister-1.webp', video: M + 'ep-twister-1.mp4', w: 568, h: 320, caption: 'Twister during an awareness activity' },
        { src: M + 'ep-twister-2.webp', video: M + 'ep-twister-2.mp4', w: 568, h: 320, caption: 'Twister during an awareness activity' },
        { src: M + 'p-035.webp', w: 1600, h: 900, caption: 'The EarthPulse team on the IB Global Youth Action Fund 2026 winners page (screenshot)', shot: true }
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
      status: ['live', 'Weekly'], cover: M + 'yec-intro.webp', glyph: 'chart', tone: 'ember',
      lead: 'Weekly two-hour sessions on financial literacy, investing and entrepreneurship.',
      body: [
        'Through YEC, I help students explore financial literacy, investing and entrepreneurship in weekly two-hour sessions. We use learning materials, investment simulations and discussions to connect financial concepts with practical decisions.',
        'I want other students to have opportunities to explore money and enterprise early, ask questions and practise before facing real financial decisions. Part of my earnings from A&F helps fund the learning resources we use.'
      ],
      did: ['Planning and running the weekly sessions', 'Choosing resources: Coursera and edX (paid), Investopedia and simulators (free)', 'Pointing students to Forage virtual job simulations, which are practice tasks with a completion certificate'],
      links: [],
      media: [
        { src: M + 'yec-intro.webp', w: 1600, h: 1200, caption: 'An early YEC session: an introduction to investing and trading' },
        { src: M + 'yec-session.webp', w: 1600, h: 1200, caption: 'A YEC session in progress' },
        { src: M + 'yec-session-2.webp', w: 1600, h: 1200, caption: 'Students presenting in a YEC session' },
        { src: M + 'yec-session-3.webp', w: 1600, h: 1200, caption: 'Discussion during a YEC session' },
        { src: M + 'p-077.webp', w: 1600, h: 1200, caption: 'A YEC session, September 2025' },
        { src: M + 'p-079.webp', w: 1600, h: 1200, caption: 'A YEC session, September 2025' },
        { src: M + 'p-081.webp', w: 1600, h: 1200, caption: 'A YEC session, September 2025' },
        { src: M + 'p-085.webp', w: 1600, h: 1200, caption: 'A YEC session, September 2025' },
        { src: M + 'p-087.webp', w: 1600, h: 1200, caption: 'A YEC session, September 2025' },
        { src: M + 'p-091.webp', w: 1600, h: 1200, caption: 'A YEC session, September 2025' },
        { src: M + 'p-095.webp', w: 1600, h: 1200, caption: 'A YEC session, September 2025' },
        { src: M + 'yec-video.webp', video: M + 'yec-video.mp4', w: 436, h: 327, caption: 'A YEC session, September 2025' }
      ]
    },
    {
      id: 'investing', title: 'Personal Investing', kind: 'Personal · Finance', group: 'ventures',
      role: 'Managing my own portfolio', when: 'Ongoing', where: 'Self-directed',
      status: ['live', 'Ongoing'], cover: M + 'investing-portfolio.webp', glyph: 'chart', tone: 'ink',
      lead: 'Managing a small portfolio of my own, to learn how markets behave with real money at stake.',
      body: [
        'Alongside YEC, I manage a small investment portfolio of my own. It currently holds PAX Gold (a token backed by physical gold), Bitcoin and a stablecoin (USDT) kept as cash, split across a store of value, a higher-risk growth asset and a cash reserve.',
        'Some positions are currently showing losses, which has been part of the lesson: watching how prices move, sticking to a plan instead of reacting to every swing, and understanding why diversification and position sizing matter. It is the practical side of the investing ideas we discuss in YEC sessions.'
      ],
      did: ['Choosing assets and deciding how to split the portfolio', 'Tracking performance and unrealised gains and losses', 'Keeping a cash reserve instead of being fully invested'],
      links: [],
      media: [
        { src: M + 'investing-portfolio.webp', w: 800, h: 1624, caption: 'My portfolio overview, with balances and amounts blurred for privacy', shot: true }
      ]
    },
    {
      id: 'tutorcraft', title: 'TutorCraft', kind: 'Service · Tutoring', group: 'community',
      role: 'Website, AI marketing and volunteer tutoring', when: 'Ongoing', where: 'Online',
      status: ['live', 'Ongoing'], cover: M + 'tc-site-home.webp', glyph: 'doc', tone: 'paper',
      lead: 'Helping build TutorCraft’s study platform, creating its AI marketing content and tutoring students.',
      body: [
        'I work with TutorCraft, a Canadian tutoring company that pairs one-to-one tutoring with TutorCraft Online, an AI-powered study platform. The platform offers curriculum-aligned lessons, worksheets and practice quizzes for Ontario, Quebec and IB MYP students in Grades 5 to 10, plus free enrichment courses in chess, coding, money and critical thinking.',
        'I helped build the TutorCraft Online website and created AI-generated marketing content for the company’s social media. I also help tutor students, giving my time to help them with topics they find difficult. It connects to what I enjoy most about YEC and the chess academy: helping someone understand an idea well enough to use it on their own.'
      ],
      did: ['Helping build the TutorCraft Online website', 'Creating AI marketing content for TutorCraft’s social media', 'Tutoring students as a volunteer'],
      links: [['Visit tutorcraft.online', 'https://tutorcraft.online'], ['Visit tutorcraft.ca', 'https://www.tutorcraft.ca/'], ['TutorCraft on Instagram', 'https://www.instagram.com/tutorcraftonline/']],
      media: [
        { src: M + 'tc-site-home.webp', w: 1400, h: 875, caption: 'TutorCraft Online, the study platform I helped build', shot: true },
        { src: M + 'tc-site-features.webp', w: 1184, h: 866, caption: 'Step-by-step lessons, an E-Tutor and homework help', shot: true },
        { src: M + 'tc-site-courses.webp', w: 1184, h: 578, caption: 'Free enrichment courses: chess, coding, money and critical thinking', shot: true },
        { src: M + 'tc-site-schools.webp', w: 1400, h: 875, caption: 'TutorCraft for schools', shot: true },
        { src: M + 'tc-site-ca.webp', w: 1400, h: 875, caption: 'tutorcraft.ca: one-to-one tutoring', shot: true },
        { src: M + 'tc-ad-personalized.webp', w: 496, h: 640, caption: 'TutorCraft marketing: personalised tutoring', shot: true },
        { src: M + 'tc-ad-learning.webp', w: 640, h: 640, caption: 'TutorCraft marketing: the study platform', shot: true },
        { src: M + 'tc-ad-tutors.webp', w: 640, h: 495, caption: 'TutorCraft marketing: tutor with TutorCraft', shot: true },
        { src: M + 'tc-ad-platform.webp', w: 640, h: 452, caption: 'TutorCraft marketing: tutoring plus an AI-powered platform', shot: true },
        { src: M + 'tc-ad-report-card.webp', w: 480, h: 640, caption: 'TutorCraft marketing: back to school', shot: true },
        { src: M + 'tc-ad-ontario.webp', w: 480, h: 640, caption: 'TutorCraft marketing: changes in Ontario education', shot: true },
        { src: M + 'tc-ad-summer-camp.webp', w: 480, h: 640, caption: 'TutorCraft marketing: summer school-readiness camp', shot: true },
        { src: M + 'tc-ad-special-needs.webp', w: 640, h: 640, caption: 'TutorCraft marketing: support for students with special needs', shot: true },
        { src: M + 'tc-ad-results.webp', w: 360, h: 640, caption: 'TutorCraft marketing: one-to-one tutoring that delivers results', shot: true },
        { src: M + 'tc-ad-tutors-2.webp', w: 640, h: 495, caption: 'TutorCraft marketing: expert tutors', shot: true },
        { src: M + 'tc-ad-social.webp', w: 640, h: 640, caption: 'TutorCraft on social media', shot: true }
      ]
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
        { src: D + 'akam-internship-proposal-cover.webp', w: 640, h: 905, caption: 'My proposal: Reading beyond the credit file', shot: true },
        { src: M + 'akam-banking-session.webp', w: 1600, h: 850, caption: 'A session on the bank’s operations and loan products' },
        { src: M + 'akam-hr-session.webp', w: 1600, h: 750, caption: 'A session with the FMFB-A HR team on conventional and Islamic banking' },
        { src: M + 'p-123.webp', w: 1280, h: 590, caption: 'A session on the bank’s UNDP-backed training for small-business customers', shot: true }
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
      status: ['done', 'Completed'], cover: M + 'chess-group.webp', glyph: 'knight', tone: 'ink',
      lead: 'Structured summer coaching for about 50 young players aged 9 to 16.',
      body: [
        'After noticing young people’s enthusiasm for chess in Kinshasa’s parks, mosques and public spaces, I joined my cousin in creating structured summer coaching. Across four summers, approximately 50 individual participants aged 9 to 16 gained access to instruction, equipment and organised tournaments. Many returned in later years.',
        'We assessed participants’ abilities and adapted sessions for different levels. I gave focused support to a talented student who lacked confidence in timed games. He became more comfortable playing with a clock and later achieved success in interschool competition.'
      ],
      did: ['Co-teaching sessions, rotating coaching with videos and peer strategy discussions', 'Running the finances: fees covered equipment and practical costs', 'Four seven-day programmes, two to three hours a day'],
      done: ['About 50 individual participants across four summers', 'Organised tournaments each summer', 'I also compete: East African Junior Chess Championship (2025), a simul with a National Master (2024)'],
      links: [],
      media: [
        { src: M + 'chess-group.webp', w: 1280, h: 960, caption: 'The academy’s players at the end of a summer session' },
        { src: M + 'chess-coaching.webp', w: 1280, h: 960, caption: 'Coaching a game' },
        { src: M + 'chess-coaching-2.webp', w: 960, h: 1280, caption: 'Helping a player think through a position' },
        { src: M + 'chess-game.webp', w: 1280, h: 960, caption: 'A tournament round' },
        { src: M + 'chess-session.webp', w: 1280, h: 960, caption: 'A summer session in Kinshasa' },
        { src: M + 'chess-hall.webp', w: 1280, h: 960, caption: 'Players from beginners to experienced' },
        { src: M + 'chess-match.webp', w: 1280, h: 960, caption: 'A game between two of our players' },
        { src: M + 'chess-eajcc.webp', w: 1280, h: 960, caption: 'Competing at the East African Junior Chess Championship, Mombasa, January 2025' },
        { src: M + 'chess-simul.webp', w: 1200, h: 1600, caption: 'A chess simul with Algerian National Master Yala Lyes, May 2024' },
        { src: M + 'chess-akam-swiss.webp', w: 960, h: 1280, caption: 'The Aga Khan Academy chess Swiss tournament, September 2024' },
        { src: M + 'p-008.webp', w: 1280, h: 960, caption: 'Summer coaching in Kinshasa, 2024' },
        { src: M + 'p-009.webp', w: 960, h: 1280, caption: 'Summer coaching in Kinshasa, 2024' },
        { src: M + 'p-016.webp', w: 960, h: 1280, caption: 'Summer coaching in Kinshasa, 2024' },
        { src: M + 'p-020.webp', w: 1280, h: 960, caption: 'Summer coaching in Kinshasa, 2024' },
        { src: M + 'p-022.webp', w: 960, h: 1280, caption: 'Summer coaching in Kinshasa, 2024' },
        { src: M + 'p-026.webp', w: 960, h: 1280, caption: 'Summer coaching in Kinshasa, 2024' },
        { src: M + 'p-027.webp', w: 1280, h: 960, caption: 'Summer coaching in Kinshasa, 2024' },
        { src: M + 'p-028.webp', w: 1280, h: 960, caption: 'Summer coaching in Kinshasa, 2024' },
        { src: M + 'p-031.webp', w: 1280, h: 960, caption: 'Summer coaching in Kinshasa, 2024' },
        { src: M + 'p-034.webp', w: 960, h: 1280, caption: 'Summer coaching in Kinshasa, 2024' },
        { src: M + 'p-037.webp', w: 1280, h: 960, caption: 'Summer coaching in Kinshasa, 2024' },
        { src: M + 'p-038.webp', w: 1280, h: 960, caption: 'Summer coaching in Kinshasa, 2024' },
        { src: M + 'p-108.webp', w: 1280, h: 960, caption: 'Summer coaching in Kinshasa, 2024' },
        { src: M + 'p-109.webp', w: 1280, h: 960, caption: 'Summer coaching in Kinshasa, 2024' },
        { src: M + 'p-112.webp', w: 1280, h: 960, caption: 'Summer coaching in Kinshasa, 2024' },
        { src: M + 'p-114.webp', w: 1280, h: 960, caption: 'Summer coaching in Kinshasa, 2024' },
        { src: M + 'p-116.webp', w: 960, h: 1280, caption: 'Summer coaching in Kinshasa, 2024' },
        { src: M + 'p-120.webp', w: 960, h: 1280, caption: 'Summer coaching in Kinshasa, 2024' },
        { src: M + 'p-124.webp', w: 1280, h: 960, caption: 'Summer coaching in Kinshasa, 2024' },
        { src: M + 'p-018.webp', w: 720, h: 1280, caption: 'Chess Swiss tournament at school, September 2024' },
        { src: M + 'p-039.webp', w: 1200, h: 1600, caption: 'East African Junior Chess Championship, January 2025' },
        { src: M + 'p-054.webp', w: 1200, h: 1600, caption: 'Chess simul with a National Master, May 2024' },
        { src: M + 'p-066.webp', w: 1200, h: 1600, caption: 'A chess session at school' }
      ]
    },
    {
      id: 'into-the-woods', title: 'Into the Woods', kind: 'DP1 Play', group: 'community',
      role: 'Finance team', when: '2026', where: 'School, Mombasa',
      status: ['done', 'Completed'], cover: M + 'itw-shirt.webp', glyph: 'mask', tone: 'moss',
      lead: 'Sponsorship, budgeting and licensing behind our school musical.',
      body: [
        'I helped make our school’s production of Into the Woods possible through sponsorship outreach, budgeting, allocation and licensing work. I personally secured 50% of the funds raised.',
        'The DP1 Play is an annual student-run production at The Aga Khan Academy, Mombasa, performed on 20 and 21 April 2026. Beyond production costs, funds raised were intended to support students at Mwega Primary School in Gilgil, where our class began its CAS journey. This showed me how financial and organisational work can support other people’s creativity.'
      ],
      did: ['Sponsorship outreach, using a five-tier sponsorship package (Bronze to Diamond)', 'Sponsor letters and sponsor commitments', 'Budgeting and allocation', 'Licensing work'],
      done: ['Personally secured 50% of the funds raised'],
      links: [['Sponsorship tiers (PDF)', D + 'dp1-play-sponsorship-tiers.pdf'], ['Sponsor letter (PDF)', D + 'dp1-play-sponsor-letter.pdf']],
      media: [
        { src: D + 'dp1-play-sponsorship-tiers-cover.webp', w: 640, h: 828, caption: 'The DP1 Play sponsorship package: five tiers from Bronze to Diamond', shot: true },
        { src: D + 'dp1-play-sponsor-letter-cover.webp', w: 640, h: 828, caption: 'The sponsor letter sent to potential sponsors', shot: true },
        { src: M + 'itw-shirt.webp', w: 1200, h: 1600, caption: 'Our Finance Team shirt, with the production’s sponsors' }
      ]
    },
    {
      id: 'waffle-chips', title: 'Waffle Chips', kind: 'Product', group: 'ventures',
      role: 'Co-founder', when: '2025', where: 'Mombasa, Kenya',
      status: ['done', 'First launch done'], cover: M + 'wc-strawberry.webp', glyph: 'bag', tone: 'ember',
      lead: 'A snack product built with a supplier we met through Zawadi Bazaar.',
      body: [
        'Waffle Chips grew from a supplier relationship developed through Zawadi Bazaar. We combined the supplier’s manufacturing capabilities with our product ideas, branding and marketing to bring a snack product to market.',
        'The project helped me see how combining different people’s skills can turn an idea into a product.'
      ],
      did: ['Product ideas, branding and marketing, including the Sweet Escape packaging for four flavours', 'Working with the supplier on production'],
      done: ['Initial launch sold about 100 units'],
      links: [],
      media: [
        { src: M + 'wc-strawberry.webp', w: 853, h: 1280, caption: 'Sweet Escape Waffle Chips packaging: Strawberry Dream' },
        { src: M + 'wc-milk-choco.webp', w: 853, h: 1280, caption: 'Sweet Escape Waffle Chips packaging: Milk Choco Drizzle' },
        { src: M + 'wc-kinder.webp', w: 853, h: 1280, caption: 'Sweet Escape Waffle Chips packaging: Kinder' },
        { src: M + 'wc-oreo.webp', w: 853, h: 1280, caption: 'Sweet Escape Waffle Chips packaging: Oreo' },
        { src: M + 'zb-waffles.webp', w: 960, h: 1280, caption: 'Making waffles at our Zawadi Bazaar stall, where the supplier relationship started' },
        { src: M + 'p-033.webp', w: 810, h: 1080, caption: 'Our waffle stall at Zawadi Bazaar' }
      ]
    },
    {
      id: 'zawadi', title: 'Zawadi Bazaar', kind: 'School enterprise', group: 'ventures',
      role: 'Co-lead · four stalls', when: '2024 – 2025', where: 'School, Mombasa',
      status: ['done', 'Completed'], cover: M + 'zb-waffles.webp', glyph: 'stall', tone: 'paper',
      lead: 'A four-stall school operation, with half of net proceeds going to sustainability initiatives.',
      body: [
        'I co-led a four-stall operation at our school’s Zawadi Bazaar, coordinating suppliers, stock, payment systems and sales tracking.',
        'The operation generated approximately KES 180,000 in sales, with 50% of net proceeds directed toward sustainability initiatives.'
      ],
      did: ['Supplier coordination and stock', 'Payment systems and sales tracking'],
      done: ['About KES 180,000 in sales', 'Half of net proceeds (not of sales) to sustainability initiatives'],
      links: [],
      media: [
        { src: M + 'zb-waffles.webp', w: 960, h: 1280, caption: 'Making bubble waffles at our stall' },
        { src: M + 'zb-boba-poster.webp', w: 1024, h: 1536, caption: 'Poster for The Boba Stop, one of our four stalls' },
        { src: M + 'zb-menu.webp', w: 815, h: 1230, caption: 'The Sweet Escape menu' },
        { src: M + 'zb-clothing-stall.webp', w: 1600, h: 1200, caption: 'The clothing stall' },
        { src: M + 'zb-stall.webp', w: 960, h: 1280, caption: 'Setting up a stall' },
        { src: M + 'p-023.webp', w: 960, h: 1280, caption: 'Our stall at Zawadi Bazaar' },
        { src: M + 'p-036.webp', w: 960, h: 1280, caption: 'Making bubble waffles' },
        { src: M + 'p-046.webp', w: 1600, h: 1200, caption: 'The clothing stall' },
        { src: M + 'zb-video-1.webp', video: M + 'zb-video-1.mp4', w: 272, h: 480, caption: 'Our stall at Zawadi Bazaar' },
        { src: M + 'zb-video-2.webp', video: M + 'zb-video-2.mp4', w: 268, h: 480, caption: 'Setting up for the bazaar' }
      ]
    },
    {
      id: 'ge-summer', title: 'GE Summer Programme', kind: 'Programme abroad', group: 'community',
      role: 'Participant', when: '2025', where: 'Kyrgyzstan',
      status: ['done', 'Completed'], cover: M + 'ge-group.webp', glyph: 'globe', tone: 'ink',
      lead: 'Workshops on technology, AI and entrepreneurship with an international group.',
      body: [
        'During the GE Summer Programme in Kyrgyzstan, I collaborated with an international group on technology, AI and entrepreneurship activities. We worked with SPCE schools and local communities to deliver interactive workshops introducing these topics.',
        'The experience helped me practise explaining unfamiliar ideas to different audiences and learn from people with different experiences.'
      ],
      did: ['Planning and delivering interactive workshops', 'Collaborating with an international group'],
      links: [],
      media: [
        { src: M + 'ge-group.webp', w: 1600, h: 900, caption: 'With the programme cohort' },
        { src: M + 'ge-presentation.webp', w: 1200, h: 1600, caption: 'Presenting a group task: analysing a business' },
        { src: M + 'ge-video.webp', video: M + 'ge-video.mp4', w: 360, h: 480, caption: 'Presenting a group task' }
      ]
    }
  ];

  /* Certificates wall. Add `img` (and optionally `file`) when a photo or
     scan of the certificate is ready: put it in assets/media/. */
  var CERTS = [
    { title: 'DP CAS Award', issuer: 'The Aga Khan Academy, Mombasa · for EarthPulse', year: '2025 – 26', imgs: [M + 'cert-cas-award.webp'], icon: 'medal', star: true, note: 'For outstanding contributions in a DP CAS project with great impact on the community' },
    { title: 'Second Honours, three times', issuer: 'The Aga Khan Academy, Mombasa', year: '2024 – 26', imgs: [M + 'cert-second-honours-dp1-s2.webp', M + 'cert-second-honours-dp1-s1.webp', M + 'cert-second-honours-y10.webp'], icon: 'medal' },
    { title: 'Most Improved', issuer: 'The Aga Khan Academy, Mombasa · DP1', year: '2025 – 26', imgs: [M + 'cert-most-improved.webp'], icon: 'medal' },
    { title: 'Investment Banking Job Simulation', issuer: 'JP Morgan · Forage', year: 'Sept 2025', imgs: [D + 'jpmorgan-investment-banking-job-simulation-cover.webp'], file: D + 'jpmorgan-investment-banking-job-simulation.pdf', icon: 'doc' },
    { title: 'East African Junior Chess Championship', issuer: 'Certificate of participation · Mombasa', year: 'Jan 2025', imgs: [M + 'cert-eajcc.webp'], icon: 'knight' },
    { title: 'Chess simul with a National Master', issuer: 'Algerian National Master Yala Lyes · medal', year: 'May 2024', imgs: [M + 'cert-chess-simul.webp'], icon: 'knight' },
    { title: 'Chess Swiss Tournament', issuer: 'The Aga Khan Academy · exemplary performance', year: 'Sept 2024', imgs: [M + 'cert-akam-chess-swiss.webp'], icon: 'knight' },
    { title: 'Science Quiz, first place', issuer: 'English International School, Kinshasa · Grade 7', year: '2022', imgs: [M + 'cert-science-quiz.webp'], icon: 'trophy' },
    { title: 'Oratorical Competition, second place', issuer: 'English International School, Kinshasa · Grade 8', year: '2023', imgs: [M + 'cert-oratorical.webp'], icon: 'trophy' },
    { title: 'Academic Proficiency, first place', issuer: 'English International School, Kinshasa', year: '2021 – 22', imgs: [M + 'cert-proficiency.webp'], icon: 'trophy' },
    { title: 'Annual Peace Summit', issuer: 'The Aga Khan Academy · certificate of facilitation', year: 'Summit', imgs: [M + 'cert-peace-summit.webp'], icon: 'doc' },
    { title: 'Virtual Job Simulation', issuer: 'Fidelity International · Forage', year: 'Forage', icon: 'doc' },
    { title: 'GE Award', issuer: 'GE Summer Programme, Kyrgyzstan', year: 'GE', icon: 'globe' },
    { title: 'Beat a chess grandmaster', issuer: 'Chess', year: 'Chess', icon: 'knight' },
    { title: 'Table tennis', issuer: 'Inter-school & Congo Olympics, Kinshasa', year: '2021 – 2024', icon: 'trophy' }
  ];

  /* Extra gallery photos that don't belong to one activity. */
  var GALLERY_EXTRA = [
    { src: M + 'kaka-mkubwa.webp', w: 1020, h: 768, caption: 'Kaka Mkubwa, a peer tutoring programme: our Group 3', group: 'community' },
    { src: M + 'st-augustine.webp', w: 960, h: 540, caption: 'A session with students at St. Augustine’s', group: 'community' },
    { src: M + 'st-augustine-2.webp', w: 1020, h: 768, caption: 'Working with students at St. Augustine’s', group: 'community' },
    { src: M + 'kids-session.webp', w: 1020, h: 768, caption: 'Running a session with children', group: 'community' },
    { src: M + 'p-029.webp', w: 1204, h: 1600, caption: 'Running a session with children', group: 'community' },
    { src: M + 'p-030.webp', w: 1020, h: 768, caption: 'Running a session with children', group: 'community' },
    { src: M + 'p-122.webp', w: 1020, h: 768, caption: 'Running a session with children', group: 'community' },
    { src: M + 'p-125.webp', w: 768, h: 1020, caption: 'Running a session with children', group: 'community' },
    { src: M + 'p-107.webp', w: 768, h: 1020, caption: 'Running a session with children', group: 'community' },
    { src: M + 'p-042.webp', w: 1600, h: 1200, caption: 'Presenting a project at school', group: 'community' },
    { src: M + 'p-043.webp', w: 1600, h: 1200, caption: 'Presenting a project at school', group: 'community' },
    { src: M + 'p-044.webp', w: 1600, h: 1200, caption: 'Presenting a project at school', group: 'community' },
    { src: M + 'p-049.webp', w: 1200, h: 1600, caption: 'Community service, March 2024', group: 'community' },
    { src: M + 'p-050.webp', w: 1200, h: 1600, caption: 'Community service, March 2024', group: 'community' },
    { src: M + 'p-051.webp', w: 1200, h: 1600, caption: 'Community service, March 2024', group: 'community' },
    { src: M + 'p-052.webp', w: 1200, h: 1600, caption: 'Community service, March 2024', group: 'community' },
    { src: M + 'p-047.webp', w: 1200, h: 1600, caption: 'Planting a seedling', group: 'community' },
    { src: M + 'p-100.webp', w: 1600, h: 1200, caption: 'With friends', group: 'life' },
    { src: M + 'p-101.webp', w: 1600, h: 1200, caption: 'With friends', group: 'life' },
    { src: M + 'p-072.webp', w: 1200, h: 1600, caption: 'A participation certificate and medal', group: 'life' },
    { src: M + 'p-073.webp', w: 1600, h: 1200, caption: 'Recognition certificate for full attendance in religious education, 2023–24', group: 'life' },
    { src: M + 'life-gym.webp', video: M + 'life-gym.mp4', w: 568, h: 320, caption: 'Training at the gym', group: 'life' },
    { src: I + 'portrait.webp', w: 1000, h: 1000, caption: 'Avi Dharani', group: 'life' }
  ];

  return { ACTIVITIES: ACTIVITIES, CERTS: CERTS, GALLERY_EXTRA: GALLERY_EXTRA };
})();
