/* CloudMetric — SaaS edition sample data.
   Every number shown in the app is calculated from these records, so all
   screens always agree with each other. Demo data only — no real people. */
window.HSV_DATA = window.HSV_DATA || {};
window.HSV_DATA.saas = {
  key: 'saas',
  brand: 'CloudMetric',
  product: 'SaaS Sales CRM',
  industryLabel: 'B2B software',
  tagline: 'Trials, demos and annual contracts for a product-analytics platform.',
  accent: '#6a78d1',
  currency: '$',
  terms: { deal: 'Deal', deals: 'Deals', pipelineName: 'Sales pipeline' },

  owners: [
    { id: 'o1', name: 'Elena Vasquez',  role: 'Head of sales',        color: '#6a78d1' },
    { id: 'o2', name: 'Jordan Blake',   role: 'Account executive',    color: '#f5a623' },
    { id: 'o3', name: 'Sam Whitmore',   role: 'Account executive',    color: '#00bda5' },
    { id: 'o4', name: 'Ivy Tanaka',     role: 'Customer success',     color: '#e8467c' }
  ],

  stages: [
    { id: 's1', label: 'Trial started',     prob: 10 },
    { id: 's2', label: 'Demo booked',       prob: 25 },
    { id: 's3', label: 'Demo done',         prob: 45 },
    { id: 's4', label: 'Proposal sent',     prob: 65 },
    { id: 's5', label: 'Contract out',      prob: 85 },
    { id: 's6', label: 'Closed won',        prob: 100 },
    { id: 's7', label: 'Closed lost',       prob: 0 }
  ],
  ticketStatuses: ['New', 'Waiting on us', 'Waiting on customer', 'Closed'],
  lifecycles: ['Trial user', 'Marketing qualified', 'Sales qualified', 'Opportunity', 'Customer'],
  sources: ['Free trial signup', 'Demo request', 'G2 listing', 'Webinar', 'Outbound', 'Partner referral'],

  companies: [
    { id: 'co1', name: 'Fintrella',        domain: 'fintrella.com',    industry: 'Fintech',          size: '51-200',  city: 'New York, NY',      owner: 'o2', created: '2026-04-14', note: 'Series B fintech. Evaluating us against Amplitude for their growth team.' },
    { id: 'co2', name: 'Shopwell Labs',    domain: 'shopwell.io',      industry: 'E-commerce tech',  size: '201-500', city: 'Seattle, WA',       owner: 'o3', created: '2026-02-19', note: 'Biggest open deal this quarter. Security review is the last hurdle.' },
    { id: 'co3', name: 'Nordic Rides',     domain: 'nordicrides.no',   industry: 'Mobility',         size: '51-200',  city: 'Oslo, Norway',      owner: 'o2', created: '2026-05-22', note: 'EU data residency was the deciding factor — we host in Frankfurt.' },
    { id: 'co4', name: 'Praxa Health',     domain: 'praxahealth.com',  industry: 'Digital health',   size: '11-50',   city: 'Boston, MA',        owner: 'o3', created: '2026-06-02', note: 'HIPAA questions answered; legal reviewing our BAA template.' },
    { id: 'co5', name: 'Loop Learning',    domain: 'looplearning.com', industry: 'EdTech',           size: '11-50',   city: 'Austin, TX',        owner: 'o2', created: '2026-01-27', note: 'Customer since March. Ivy runs quarterly reviews; expansion likely in Q4.' },
    { id: 'co6', name: 'Beacon Media',     domain: 'beaconmedia.co',   industry: 'Media & publishing', size: '201-500', city: 'Chicago, IL',     owner: 'o3', created: '2026-03-08', note: 'Churned from Mixpanel over pricing. Very price-sensitive — annual only.' },
    { id: 'co7', name: 'Arcline Robotics', domain: 'arcline.ai',       industry: 'Robotics',         size: '11-50',   city: 'San Jose, CA',      owner: 'o2', created: '2026-06-18', note: 'Came in from the product-metrics webinar. Small team, fast decisions.' },
    { id: 'co8', name: 'Verve Fitness',    domain: 'vervefit.app',     industry: 'Consumer apps',    size: '51-200',  city: 'Los Angeles, CA',   owner: 'o4', created: '2025-10-05', note: 'Customer since October. Health score dipped in May — usage recovering now.' }
  ],

  contacts: [
    { id: 'c1',  first: 'Maya',   last: 'Lindqvist', email: 'maya@fintrella.com',       phone: '(212) 555-0147', title: 'VP Growth, Fintrella',        companyId: 'co1', lifecycle: 'Opportunity',        owner: 'o2', source: 'Demo request',       created: '2026-04-14', lastTouch: '2026-07-03', city: 'New York, NY',
      custom: { 'Plan tier interest': 'Scale', 'Seats needed': '25', 'Current tool': 'Amplitude', 'Trial ends': '2026-07-12' },
      timeline: [
        { d: '2026-07-03', t: 'email',   text: 'Sent side-by-side comparison vs Amplitude her team asked for.' },
        { d: '2026-06-25', t: 'meeting', text: 'Technical deep-dive with her data engineers — event schema questions.' },
        { d: '2026-04-14', t: 'note',    text: 'Booked a demo straight from the pricing page. Moving fast.' } ] },
    { id: 'c2',  first: 'Derek',  last: 'Osei',      email: 'derek@shopwell.io',        phone: '(206) 555-0183', title: 'CTO, Shopwell Labs',          companyId: 'co2', lifecycle: 'Opportunity',        owner: 'o3', source: 'Outbound',           created: '2026-02-19', lastTouch: '2026-07-02', city: 'Seattle, WA',
      custom: { 'Plan tier interest': 'Enterprise', 'Seats needed': '60', 'Current tool': 'In-house', 'Trial ends': '—' },
      timeline: [
        { d: '2026-07-02', t: 'email',   text: 'Security questionnaire returned — 2 open items on data retention.' },
        { d: '2026-06-12', t: 'meeting', text: 'Contract walkthrough. Wants a 60-seat, 2-year term with a ramp.' },
        { d: '2026-02-19', t: 'call',    text: 'Cold outreach landed — they were about to rebuild dashboards in-house.' } ] },
    { id: 'c3',  first: 'Ingrid', last: 'Solberg',   email: 'ingrid@nordicrides.no',    phone: '+47 555 01 923', title: 'Head of Product, Nordic Rides', companyId: 'co3', lifecycle: 'Customer',        owner: 'o2', source: 'G2 listing',         created: '2026-05-22', lastTouch: '2026-06-29', city: 'Oslo, Norway',
      custom: { 'Plan tier interest': 'Scale', 'Seats needed': '18', 'Current tool': 'None', 'Trial ends': 'Converted' },
      timeline: [
        { d: '2026-06-29', t: 'meeting', text: 'Onboarding session 2 of 3 — funnels and retention boards set up.' },
        { d: '2026-06-20', t: 'note',    text: 'Signed! 18 seats, annual, Frankfurt hosting. Handed to Ivy for onboarding.' },
        { d: '2026-05-22', t: 'note',    text: 'Found us on G2, shortlisted for EU data residency.' } ] },
    { id: 'c4',  first: 'Ben',    last: 'Carraway',  email: 'ben.c@praxahealth.com',    phone: '(617) 555-0121', title: 'Co-founder, Praxa Health',    companyId: 'co4', lifecycle: 'Sales qualified',    owner: 'o3', source: 'Free trial signup',  created: '2026-06-02', lastTouch: '2026-07-01', city: 'Boston, MA',
      custom: { 'Plan tier interest': 'Growth', 'Seats needed': '8', 'Current tool': 'Spreadsheets', 'Trial ends': '2026-07-09' },
      timeline: [
        { d: '2026-07-01', t: 'call',  text: 'Legal is reviewing the BAA. He wants to sign before trial ends on the 9th.' },
        { d: '2026-06-02', t: 'note',  text: 'Trial signup; instrumented their app the same evening. Very hands-on founder.' } ] },
    { id: 'c5',  first: 'Renata', last: 'Fox',       email: 'renata@looplearning.com',  phone: '(512) 555-0177', title: 'CEO, Loop Learning',          companyId: 'co5', lifecycle: 'Customer',           owner: 'o4', source: 'Webinar',            created: '2026-01-27', lastTouch: '2026-06-26', city: 'Austin, TX',
      custom: { 'Plan tier interest': 'Growth', 'Seats needed': '10', 'Current tool': 'CloudMetric', 'Trial ends': 'Converted' },
      timeline: [
        { d: '2026-06-26', t: 'meeting', text: 'Q2 business review — usage up 40%, teased the cohort-export feature.' },
        { d: '2026-03-06', t: 'note',    text: 'Became a customer on Growth annual after the January webinar.' } ] },
    { id: 'c6',  first: 'Marcus', last: 'Hale',      email: 'm.hale@beaconmedia.co',    phone: '(312) 555-0139', title: 'VP Audience, Beacon Media',   companyId: 'co6', lifecycle: 'Opportunity',        owner: 'o3', source: 'Partner referral',   created: '2026-03-08', lastTouch: '2026-06-30', city: 'Chicago, IL',
      custom: { 'Plan tier interest': 'Scale', 'Seats needed': '30', 'Current tool': 'Mixpanel', 'Trial ends': '2026-07-15' },
      timeline: [
        { d: '2026-06-30', t: 'email', text: 'Asked for a 3-year price lock. Escalated to Elena for approval.' },
        { d: '2026-05-14', t: 'meeting', text: 'Demo to 9 people across audience + data teams. Strong interest, price worries.' } ] },
    { id: 'c7',  first: 'Ana',    last: 'Petrov',    email: 'ana@arcline.ai',           phone: '(408) 555-0168', title: 'Founding engineer, Arcline',  companyId: 'co7', lifecycle: 'Trial user',         owner: 'o2', source: 'Webinar',            created: '2026-06-18', lastTouch: '2026-07-04', city: 'San Jose, CA',
      custom: { 'Plan tier interest': 'Growth', 'Seats needed': '5', 'Current tool': 'None', 'Trial ends': '2026-07-16' },
      timeline: [
        { d: '2026-07-04', t: 'note',  text: 'Trial usage is excellent — 4 dashboards built in week one.' },
        { d: '2026-06-18', t: 'note',  text: 'Signed up during the webinar Q&A session.' } ] },
    { id: 'c8',  first: 'Tessa',  last: 'Okonkwo',   email: 'tessa@vervefit.app',       phone: '(310) 555-0154', title: 'Head of Data, Verve Fitness', companyId: 'co8', lifecycle: 'Customer',           owner: 'o4', source: 'Free trial signup',  created: '2025-10-05', lastTouch: '2026-07-02', city: 'Los Angeles, CA',
      custom: { 'Plan tier interest': 'Scale', 'Seats needed': '22', 'Current tool': 'CloudMetric', 'Trial ends': 'Converted' },
      timeline: [
        { d: '2026-07-02', t: 'call',  text: 'Renewal call — happy with support, wants SSO before re-signing in October.' },
        { d: '2026-05-18', t: 'note',  text: 'Usage dipped after their reorg; Ivy ran a re-onboarding for new analysts.' } ] },
    { id: 'c9',  first: 'Kofi',   last: 'Mensah',    email: 'kofi@fintrella.com',       phone: '(212) 555-0192', title: 'Data engineer, Fintrella',    companyId: 'co1', lifecycle: 'Opportunity',        owner: 'o2', source: 'Demo request',       created: '2026-06-25', lastTouch: '2026-07-03', city: 'New York, NY',
      custom: { 'Plan tier interest': 'Scale', 'Seats needed': '—', 'Current tool': 'Amplitude', 'Trial ends': '2026-07-12' },
      timeline: [
        { d: '2026-07-03', t: 'email', text: 'Confirmed our SDK handles their event volume — 40M events/month.' },
        { d: '2026-06-25', t: 'meeting', text: 'Joined the technical deep-dive; owns the migration decision.' } ] },
    { id: 'c10', first: 'Sadie',  last: 'Brennan',   email: 'sadie.b@gmail.com',        phone: '(415) 555-0126', title: 'Indie developer',             companyId: null,  lifecycle: 'Trial user',         owner: 'o3', source: 'Free trial signup',  created: '2026-07-01', lastTouch: '2026-07-03', city: 'San Francisco, CA',
      custom: { 'Plan tier interest': 'Starter', 'Seats needed': '1', 'Current tool': 'None', 'Trial ends': '2026-07-29' },
      timeline: [
        { d: '2026-07-03', t: 'note', text: 'Solo dev tracking her journaling app. Good fit for the Starter plan.' } ] },
    { id: 'c11', first: 'Viktor', last: 'Reyes',     email: 'v.reyes@shopwell.io',      phone: '(206) 555-0115', title: 'Security lead, Shopwell Labs', companyId: 'co2', lifecycle: 'Opportunity',       owner: 'o3', source: 'Outbound',           created: '2026-06-10', lastTouch: '2026-07-02', city: 'Seattle, WA',
      custom: { 'Plan tier interest': '—', 'Seats needed': '—', 'Current tool': '—', 'Trial ends': '—' },
      timeline: [
        { d: '2026-07-02', t: 'email', text: 'Two open questionnaire items: log retention period and sub-processor list.' },
        { d: '2026-06-10', t: 'note',  text: 'Runs the vendor security review. Friendly but thorough.' } ] },
    { id: 'c12', first: 'Hana',   last: 'Yoshida',   email: 'hana@looplearning.com',    phone: '(512) 555-0163', title: 'Product manager, Loop Learning', companyId: 'co5', lifecycle: 'Customer',        owner: 'o4', source: 'Webinar',            created: '2026-03-10', lastTouch: '2026-06-26', city: 'Austin, TX',
      custom: { 'Plan tier interest': 'Growth', 'Seats needed': '—', 'Current tool': 'CloudMetric', 'Trial ends': 'Converted' },
      timeline: [
        { d: '2026-06-26', t: 'meeting', text: 'Day-to-day power user. Asked for scheduled email reports — on our roadmap.' } ] },
    { id: 'c13', first: 'Paulo',  last: 'Guimarães', email: 'paulo@beaconmedia.co',     phone: '(312) 555-0148', title: 'Analytics lead, Beacon Media', companyId: 'co6', lifecycle: 'Opportunity',       owner: 'o3', source: 'Partner referral',   created: '2026-05-14', lastTouch: '2026-06-28', city: 'Chicago, IL',
      custom: { 'Plan tier interest': 'Scale', 'Seats needed': '—', 'Current tool': 'Mixpanel', 'Trial ends': '2026-07-15' },
      timeline: [
        { d: '2026-06-28', t: 'note', text: 'Rebuilt their top-10 Mixpanel reports in our trial workspace — all matched.' } ] },
    { id: 'c14', first: 'Greta',  last: 'Nilsen',    email: 'greta@nordicrides.no',     phone: '+47 555 01 877', title: 'Data analyst, Nordic Rides',  companyId: 'co3', lifecycle: 'Customer',           owner: 'o4', source: 'G2 listing',         created: '2026-06-21', lastTouch: '2026-07-01', city: 'Oslo, Norway',
      custom: { 'Plan tier interest': '—', 'Seats needed': '—', 'Current tool': 'CloudMetric', 'Trial ends': 'Converted' },
      timeline: [
        { d: '2026-07-01', t: 'email', text: 'Asked how to share dashboards with external investors — sent the guide.' } ] }
  ],

  deals: [
    { id: 'd1',  name: 'Fintrella — Scale plan, 25 seats annual',        amount: 54000,  stage: 's4', close: '2026-07-12', owner: 'o2', contactId: 'c1',  companyId: 'co1', created: '2026-04-14', source: 'Demo request' },
    { id: 'd2',  name: 'Shopwell Labs — Enterprise, 60 seats, 2 years',  amount: 168000, stage: 's5', close: '2026-07-31', owner: 'o3', contactId: 'c2',  companyId: 'co2', created: '2026-02-19', source: 'Outbound' },
    { id: 'd3',  name: 'Nordic Rides — Scale plan, 18 seats annual',     amount: 38900,  stage: 's6', close: '2026-06-20', owner: 'o2', contactId: 'c3',  companyId: 'co3', created: '2026-05-22', source: 'G2 listing' },
    { id: 'd4',  name: 'Praxa Health — Growth plan, 8 seats annual',     amount: 11500,  stage: 's5', close: '2026-07-09', owner: 'o3', contactId: 'c4',  companyId: 'co4', created: '2026-06-02', source: 'Free trial signup' },
    { id: 'd5',  name: 'Beacon Media — Scale plan, 30 seats annual',     amount: 64800,  stage: 's4', close: '2026-07-28', owner: 'o3', contactId: 'c6',  companyId: 'co6', created: '2026-03-08', source: 'Partner referral' },
    { id: 'd6',  name: 'Arcline Robotics — Growth plan, 5 seats',        amount: 7200,   stage: 's1', close: '2026-07-30', owner: 'o2', contactId: 'c7',  companyId: 'co7', created: '2026-06-18', source: 'Webinar' },
    { id: 'd7',  name: 'Sadie Brennan — Starter plan',                   amount: 588,    stage: 's1', close: '2026-07-29', owner: 'o3', contactId: 'c10', companyId: null,  created: '2026-07-01', source: 'Free trial signup' },
    { id: 'd8',  name: 'Verve Fitness — renewal + SSO add-on',           amount: 47500,  stage: 's3', close: '2026-10-05', owner: 'o4', contactId: 'c8',  companyId: 'co8', created: '2026-06-15', source: 'Free trial signup' },
    { id: 'd9',  name: 'Loop Learning — Q4 seat expansion (10 → 16)',    amount: 8600,   stage: 's2', close: '2026-09-30', owner: 'o4', contactId: 'c5',  companyId: 'co5', created: '2026-06-26', source: 'Webinar' },
    { id: 'd10', name: 'Datawise Agency — white-label pilot',            amount: 24000,  stage: 's7', close: '2026-05-30', owner: 'o1', contactId: null,  companyId: null,  created: '2026-04-01', source: 'Outbound' },
    { id: 'd11', name: 'Fintrella — onboarding & migration package',     amount: 6500,   stage: 's4', close: '2026-07-12', owner: 'o2', contactId: 'c9',  companyId: 'co1', created: '2026-06-25', source: 'Demo request' },
    { id: 'd12', name: 'Helio Games — Growth plan, 12 seats',            amount: 16800,  stage: 's7', close: '2026-06-10', owner: 'o2', contactId: null,  companyId: null,  created: '2026-05-02', source: 'G2 listing' },
    { id: 'd13', name: 'Beacon Media — onboarding services',             amount: 4800,   stage: 's3', close: '2026-08-05', owner: 'o3', contactId: 'c13', companyId: 'co6', created: '2026-06-28', source: 'Partner referral' },
    { id: 'd14', name: 'Nordic Rides — investor-dashboard add-on',       amount: 3400,   stage: 's2', close: '2026-08-15', owner: 'o4', contactId: 'c14', companyId: 'co3', created: '2026-07-01', source: 'G2 listing' }
  ],

  tickets: [
    { id: 't1', subject: 'Dashboard loads slowly with 90-day range',    status: 'Waiting on us',        priority: 'High',   contactId: 'c8',  owner: 'o4', created: '2026-07-01', category: 'Performance',
      desc: 'Verve\'s retention board takes 20+ seconds on 90-day ranges. Engineering is adding a pre-aggregation for their event volume.',
      thread: [ { from: 'them', at: '2026-07-01 10:12', text: 'Our retention dashboard crawls when we pick 90 days. 20+ seconds every time.' },
                { from: 'us',   at: '2026-07-01 11:03', text: 'Reproduced it — your event volume needs a pre-aggregation we\'re rolling out this week.' } ] },
    { id: 't2', subject: 'How do I share a dashboard externally?',      status: 'Closed',               priority: 'Low',    contactId: 'c14', owner: 'o4', created: '2026-07-01', category: 'How-to',
      desc: 'Greta wanted a read-only investor link. Sent the sharing guide; she set it up herself in minutes.',
      thread: [ { from: 'them', at: '2026-07-01 09:30', text: 'Can I give our investors a view-only link to the growth dashboard?' },
                { from: 'us',   at: '2026-07-01 09:52', text: 'Yes — "Share → public read-only link", guide attached. Links can expire automatically too.' } ] },
    { id: 't3', subject: 'Two security-questionnaire items open',       status: 'Waiting on us',        priority: 'High',   contactId: 'c11', owner: 'o3', created: '2026-07-02', category: 'Security review',
      desc: 'Shopwell needs our log-retention period and current sub-processor list in writing before contract signature.',
      thread: [ { from: 'them', at: '2026-07-02 14:20', text: 'Last two items: how long do you keep access logs, and can we get the sub-processor list?' },
                { from: 'us',   at: '2026-07-02 15:05', text: 'Logs are kept 13 months. Sub-processor list is being signed off by legal — with you Monday.' } ] },
    { id: 't4', subject: 'Event names mismatched after SDK update',     status: 'Waiting on customer',  priority: 'Medium', contactId: 'c4',  owner: 'o4', created: '2026-06-29', category: 'Implementation',
      desc: 'Praxa\'s new SDK version sends snake_case names, splitting their charts. Sent a mapping fix; waiting for them to deploy it.',
      thread: [ { from: 'them', at: '2026-06-29 16:40', text: 'After updating the SDK our signup chart split into two lines — old and new event names.' },
                { from: 'us',   at: '2026-06-29 17:22', text: 'The update changed name casing. I\'ve sent an alias mapping — apply it and the lines will merge.' } ] },
    { id: 't5', subject: 'Invoice needs a purchase-order number',       status: 'Closed',               priority: 'Low',    contactId: 'c3',  owner: 'o4', created: '2026-06-23', category: 'Billing',
      desc: 'Nordic Rides\' finance team requires PO numbers on all invoices. Added to their billing profile — applies automatically now.',
      thread: [ { from: 'them', at: '2026-06-23 08:15', text: 'Our finance team bounced your invoice — it needs PO-2026-118 printed on it.' },
                { from: 'us',   at: '2026-06-23 09:00', text: 'Reissued with the PO number, and saved it so every future invoice includes it.' } ] },
    { id: 't6', subject: 'Trial limit reached mid-evaluation',          status: 'Waiting on us',        priority: 'Medium', contactId: 'c13', owner: 'o3', created: '2026-07-03', category: 'Trials & billing',
      desc: 'Beacon hit the 5M trial event cap while rebuilding reports. Requesting a temporary raise so the evaluation isn\'t blocked.',
      thread: [ { from: 'them', at: '2026-07-03 11:48', text: 'We hit the trial event cap — half our reports stopped updating.' },
                { from: 'us',   at: '2026-07-03 12:10', text: 'Raising your cap to 20M for the rest of the trial today. Sorry for the interruption!' } ] },
    { id: 't7', subject: 'Can\'t invite a teammate with SSO domain',    status: 'New',                  priority: 'Medium', contactId: 'c12', owner: 'o4', created: '2026-07-04', category: 'Accounts & access',
      desc: 'Hana\'s invite to a contractor bounced because the domain doesn\'t match Loop\'s SSO rules. Needs a guest-access exception.',
      thread: [ { from: 'them', at: '2026-07-04 15:31', text: 'Trying to invite our contractor but it says her email domain isn\'t allowed.' } ] },
    { id: 't8', subject: 'Feature request: scheduled email reports',    status: 'Waiting on us',        priority: 'Low',    contactId: 'c5',  owner: 'o4', created: '2026-06-26', category: 'Feature request',
      desc: 'Renata wants Monday-morning email digests of key dashboards. Logged against the roadmap item; she\'ll join the beta.',
      thread: [ { from: 'them', at: '2026-06-26 12:02', text: 'Any chance of getting our main dashboard emailed to the exec team every Monday?' },
                { from: 'us',   at: '2026-06-26 12:30', text: 'It\'s on the roadmap for Q3 — I\'ve added you to the beta list so you get it first.' } ] }
  ],

  tasks: [
    { id: 'k1', title: 'Send sub-processor list to Shopwell',            due: '2026-07-06', type: 'Email', owner: 'o3', related: { kind: 'ticket', id: 't3' },  done: false },
    { id: 'k2', title: 'Get 3-year price-lock approval for Beacon',      due: '2026-07-07', type: 'To-do', owner: 'o1', related: { kind: 'deal', id: 'd5' },    done: false },
    { id: 'k3', title: 'Check Praxa BAA status before trial ends',       due: '2026-07-07', type: 'Call',  owner: 'o3', related: { kind: 'deal', id: 'd4' },    done: false },
    { id: 'k4', title: 'Raise Beacon trial event cap to 20M',            due: '2026-07-05', type: 'To-do', owner: 'o3', related: { kind: 'ticket', id: 't6' },  done: true },
    { id: 'k5', title: 'Prep Fintrella proposal-review call',            due: '2026-07-08', type: 'To-do', owner: 'o2', related: { kind: 'deal', id: 'd1' },    done: false },
    { id: 'k6', title: 'Fix Verve slow dashboard (pre-aggregation)',     due: '2026-07-09', type: 'To-do', owner: 'o4', related: { kind: 'ticket', id: 't1' },  done: false },
    { id: 'k7', title: 'Q2 review deck for Loop Learning',               due: '2026-06-25', type: 'To-do', owner: 'o4', related: { kind: 'contact', id: 'c5' }, done: true },
    { id: 'k8', title: 'Check in on Arcline trial (week 2)',             due: '2026-07-10', type: 'Email', owner: 'o2', related: { kind: 'deal', id: 'd6' },    done: false },
    { id: 'k9', title: 'Loop guest-access exception for contractor',     due: '2026-07-08', type: 'To-do', owner: 'o4', related: { kind: 'ticket', id: 't7' },  done: false }
  ],

  meetings: [
    { id: 'm1', title: 'Fintrella — proposal review',              date: '2026-07-08', time: '14:00', contactId: 'c1',  owner: 'o2', kind: 'Sales meeting' },
    { id: 'm2', title: 'Shopwell — contract close call',           date: '2026-07-09', time: '11:00', contactId: 'c2',  owner: 'o3', kind: 'Sales meeting' },
    { id: 'm3', title: 'Nordic Rides — onboarding session 3 of 3', date: '2026-07-10', time: '09:00', contactId: 'c3',  owner: 'o4', kind: 'Onboarding' },
    { id: 'm4', title: 'Beacon Media — pricing decision call',     date: '2026-07-15', time: '15:30', contactId: 'c6',  owner: 'o3', kind: 'Sales meeting' },
    { id: 'm5', title: 'Arcline — trial check-in',                 date: '2026-07-11', time: '10:30', contactId: 'c7',  owner: 'o2', kind: 'Check-in' },
    { id: 'm6', title: 'Verve Fitness — SSO scoping with IT',      date: '2026-07-16', time: '13:00', contactId: 'c8',  owner: 'o4', kind: 'Technical call' }
  ],

  campaigns: [
    { id: 'g1', name: 'Monthly product newsletter — June',       type: 'Newsletter', status: 'Sent',      date: '2026-06-15', audience: 'Customers + trial users', sent: 1840, opened: 812, clicked: 271, replied: 18,
      subject: 'New: funnel comparisons and a faster query engine', preview: 'June shipped big — compare funnels side by side and feel queries fly.' },
    { id: 'g2', name: 'Trial onboarding sequence',               type: 'Automated',  status: 'Running',   date: '2026-01-10', audience: 'New trial signups',        sent: 964,  opened: 689, clicked: 402, replied: 57,
      subject: 'Day 1: send your first event in 10 minutes', preview: 'Copy one snippet, paste it in your app, and watch data appear live.' },
    { id: 'g3', name: 'Webinar: metrics that actually matter',   type: 'One-off',    status: 'Sent',      date: '2026-06-18', audience: 'Prospect list',            sent: 3200, opened: 1184, clicked: 396, replied: 41,
      subject: 'Live Thursday: the 6 product metrics worth tracking', preview: '45 minutes, real dashboards, no fluff. Recording sent to all registrants.' },
    { id: 'g4', name: 'Trial ending — upgrade nudge',            type: 'Automated',  status: 'Running',   date: '2026-02-01', audience: 'Trials ending in 3 days',  sent: 505,  opened: 356, clicked: 190, replied: 33,
      subject: 'Your trial ends Thursday — keep your dashboards', preview: 'Everything you built stays exactly as-is when you pick a plan.' },
    { id: 'g5', name: 'Q3 customer roadmap preview',             type: 'One-off',    status: 'Scheduled', date: '2026-07-15', audience: 'All customers',            sent: 0,    opened: 0,   clicked: 0,   replied: 0,
      subject: 'What\'s coming in Q3 (scheduled reports, SSO+)', preview: 'A first look at what ships next quarter — and how to join the betas.' }
  ],

  forms: [
    { id: 'f1', name: 'Start free trial',       page: '/signup',      views: 8420, submissions: 611, fields: ['Work email', 'Company', 'Password', 'What are you building?'],       recent: ['c10', 'c7', 'c4'] },
    { id: 'f2', name: 'Book a demo',            page: '/demo',        views: 2140, submissions: 148, fields: ['Name', 'Work email', 'Company size', 'Current analytics tool'],       recent: ['c1', 'c9'] },
    { id: 'f3', name: 'Webinar registration',   page: '/webinar',     views: 3900, submissions: 502, fields: ['Name', 'Work email', 'Role'],                                          recent: ['c7'] },
    { id: 'f4', name: 'Talk to sales (enterprise)', page: '/enterprise', views: 640, submissions: 37, fields: ['Name', 'Work email', 'Seats needed', 'Security requirements'],       recent: ['c2', 'c6'] }
  ],

  workflows: [
    { id: 'w1', name: 'Trial onboarding drip',                 status: 'On', trigger: 'A new trial account is created', goal: 'First event tracked within 24 hours', enrolled: 964, active: 88, completed: 741,
      steps: [ { k: 'trigger', text: 'New trial account created' },
               { k: 'email',   text: 'Day 1 — "Send your first event in 10 minutes"' },
               { k: 'delay',   text: 'Wait 1 day' },
               { k: 'branch',  text: 'Sent an event? If not, email the 3 most common setup fixes' },
               { k: 'delay',   text: 'Wait 2 days' },
               { k: 'email',   text: 'Day 3 — "Build your first funnel" walkthrough' },
               { k: 'task',    text: 'High-fit account with no events by day 5? Create a call task for sales' } ] },
    { id: 'w2', name: 'Trial ending — convert or extend',      status: 'On', trigger: 'Trial ends in 3 days', goal: 'Paid conversion', enrolled: 505, active: 21, completed: 448,
      steps: [ { k: 'trigger', text: 'Trial has 3 days left' },
               { k: 'email',   text: 'Send "keep your dashboards" upgrade email' },
               { k: 'branch',  text: 'Heavy usage but no upgrade? Offer a 1-week extension' },
               { k: 'task',    text: 'Enterprise-fit account? Create a task for an AE to reach out personally' } ] },
    { id: 'w3', name: 'Demo request fast response',            status: 'On', trigger: 'The "Book a demo" form is submitted', goal: 'Demo held within 3 working days', enrolled: 148, active: 6, completed: 131,
      steps: [ { k: 'trigger', text: 'Demo form submitted' },
               { k: 'email',   text: 'Instant reply with a calendar link' },
               { k: 'update',  text: 'Set lifecycle to Sales qualified and assign an owner by territory' },
               { k: 'delay',   text: 'Wait 1 day' },
               { k: 'branch',  text: 'No booking yet? Create a call task for the assigned AE' } ] },
    { id: 'w4', name: 'Customer health check',                 status: 'On', trigger: 'Weekly usage drops 40% vs. last month', goal: 'Usage recovers within 30 days', enrolled: 37, active: 5, completed: 29,
      steps: [ { k: 'trigger', text: 'Weekly active usage drops 40%' },
               { k: 'task',    text: 'Alert the customer success owner with a usage summary' },
               { k: 'email',   text: 'Offer a free re-onboarding session' },
               { k: 'delay',   text: 'Wait 14 days' },
               { k: 'branch',  text: 'Still low? Flag the renewal as at-risk on the deal record' } ] },
    { id: 'w5', name: 'Won deal → onboarding handoff',         status: 'On', trigger: 'A deal moves to Closed won', goal: 'Onboarding call within 5 days', enrolled: 41, active: 2, completed: 39,
      steps: [ { k: 'trigger', text: 'Deal marked Closed won' },
               { k: 'task',    text: 'Create onboarding kickoff task for customer success' },
               { k: 'email',   text: 'Send the welcome pack with the onboarding calendar link' },
               { k: 'update',  text: 'Set company lifecycle to Customer and start the health-score tracker' } ] }
  ],

  conversations: [
    { id: 'v1', channel: 'Email', contactId: 'c6',  subject: 'Re: 3-year price lock',            unread: true,  at: '2026-07-04 16:45',
      msgs: [ { from: 'them', at: '2026-07-04 16:45', text: 'Any word from your leadership on locking pricing for 3 years? That\'s the last thing between us and a yes.' } ] },
    { id: 'v2', channel: 'Chat',  contactId: 'c10', subject: 'Question about the Starter plan',  unread: true,  at: '2026-07-04 21:10',
      msgs: [ { from: 'them', at: '2026-07-04 21:10', text: 'Does Starter include funnels, or is that only on Growth? Solo dev here, trying to keep costs down.' } ] },
    { id: 'v3', channel: 'Email', contactId: 'c2',  subject: 'Contract redlines v2',             unread: false, at: '2026-07-02 17:30',
      msgs: [ { from: 'them', at: '2026-07-02 17:30', text: 'Legal sent back v2 with two small redlines on the SLA section. Nothing controversial, mostly wording.' },
              { from: 'us',   at: '2026-07-02 18:02', text: 'Both look fine at first read — our counsel will confirm tomorrow and we can route for signature.' } ] },
    { id: 'v4', channel: 'Chat',  contactId: 'c7',  subject: 'Funnel step question',             unread: false, at: '2026-07-03 11:20',
      msgs: [ { from: 'them', at: '2026-07-03 11:20', text: 'Can a funnel step match on event properties, not just the event name?' },
              { from: 'us',   at: '2026-07-03 11:24', text: 'Yes — click the step, then "Add filter" and pick any property. Works on all plans.' },
              { from: 'them', at: '2026-07-03 11:26', text: 'Perfect, that\'s exactly what I needed.' } ] },
    { id: 'v5', channel: 'Email', contactId: 'c1',  subject: 'Comparison doc feedback',          unread: false, at: '2026-07-03 15:55',
      msgs: [ { from: 'them', at: '2026-07-03 15:55', text: 'The comparison doc landed well internally. Two follow-ups: migration timeline, and can we import 12 months of Amplitude history?' },
              { from: 'us',   at: '2026-07-03 16:20', text: 'Typical migration is 2–3 weeks, and yes — we\'ve imported Amplitude history for three customers this year. Details in Thursday\'s call.' } ] },
    { id: 'v6', channel: 'Email', contactId: 'c8',  subject: 'SSO requirements doc',             unread: false, at: '2026-07-02 10:05',
      msgs: [ { from: 'them', at: '2026-07-02 10:05', text: 'Attached our IT team\'s SSO requirements — Okta, SCIM provisioning, and enforced MFA.' },
              { from: 'us',   at: '2026-07-02 10:40', text: 'Okta and enforced MFA are live today; SCIM lands in the Q3 release. Let\'s scope it on the 16th.' } ] }
  ],

  customProps: [
    { object: 'Contact', label: 'Plan tier interest',   internal: 'plan_tier_interest',   type: 'Dropdown',    options: 'Starter, Growth, Scale, Enterprise', used: 'Routing and proposal templates' },
    { object: 'Contact', label: 'Seats needed',         internal: 'seats_needed',         type: 'Number',      options: '—',                                   used: 'Deal sizing' },
    { object: 'Contact', label: 'Current tool',         internal: 'current_tool',         type: 'Dropdown',    options: 'Amplitude, Mixpanel, In-house, Spreadsheets, None', used: 'Competitive battlecards' },
    { object: 'Contact', label: 'Trial ends',           internal: 'trial_end_date',       type: 'Date',        options: '—',                                   used: 'Trial-ending workflow' },
    { object: 'Contact', label: 'Product role',         internal: 'product_role',         type: 'Dropdown',    options: 'Founder, Product, Engineering, Data, Marketing', used: 'Onboarding content per role' },
    { object: 'Deal',    label: 'Contract length',      internal: 'contract_length',      type: 'Dropdown',    options: 'Monthly, Annual, 2-year, 3-year',     used: 'Revenue forecasting' },
    { object: 'Deal',    label: 'Security review needed', internal: 'security_review',    type: 'Yes / No',    options: 'Yes, No',                             used: 'Deal-stage checklists' },
    { object: 'Company', label: 'Monthly event volume', internal: 'event_volume',         type: 'Number',      options: '—',                                   used: 'Pricing and infrastructure planning' },
    { object: 'Company', label: 'Health score',         internal: 'health_score',         type: 'Score (0-100)', options: '—',                                 used: 'Churn-risk workflow' },
    { object: 'Ticket',  label: 'Product area',         internal: 'product_area',         type: 'Dropdown',    options: 'Dashboards, SDK, Billing, Access, Performance', used: 'Routing to the right engineer' }
  ],

  integrations: [
    { name: 'Slack',            cat: 'Notifications', desc: 'Deal wins and at-risk alerts post to #sales and #success.',            connected: true },
    { name: 'Stripe',           cat: 'Billing',       desc: 'Subscriptions, upgrades and failed payments sync to the company record.', connected: true },
    { name: 'Google Calendar',  cat: 'Scheduling',    desc: 'Demo bookings land on the right AE\'s calendar by territory.',          connected: true },
    { name: 'Zoom',             cat: 'Meetings',      desc: 'Every demo gets a Zoom link; recordings attach to the deal.',           connected: true },
    { name: 'Segment',          cat: 'Product data',  desc: 'Product usage events flow in to power health scores.',                  connected: true },
    { name: 'DocuSign',         cat: 'Documents',     desc: 'Order forms and MSAs routed for signature from the deal record.',       connected: true },
    { name: 'Clearbit',         cat: 'Enrichment',    desc: 'Fills in company size and industry on new signups automatically.',      connected: true },
    { name: 'Zendesk import',   cat: 'Migration',     desc: 'One-time import of historical support tickets — completed in March.',   connected: false },
    { name: 'Salesforce sync',  cat: 'Migration',     desc: 'Two-way sync for the enterprise team. Evaluation paused.',              connected: false },
    { name: 'LinkedIn Ads',     cat: 'Advertising',   desc: 'Webinar registrations tie back to the campaigns that drove them.',      connected: true }
  ],

  monthly: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    revenue:     [61000, 74500, 89200, 96800, 112400, 131600],
    newContacts: [122, 138, 155, 149, 176, 204],
    won:         [7, 9, 10, 12, 11, 14],
    ticketsClosed: [42, 38, 51, 47, 55, 49],
    visitors:    [18200, 21400, 24800, 23900, 28600, 33400]
  },
  sourceBreakdown: [
    { label: 'Free trial signup', value: 38 },
    { label: 'Demo request',      value: 17 },
    { label: 'G2 listing',        value: 14 },
    { label: 'Webinar',           value: 13 },
    { label: 'Outbound',          value: 10 },
    { label: 'Partner referral',  value: 8 }
  ],

  reports: [
    { id: 'r1', name: 'New ARR by month',              desc: 'Closed-won contract value added each month.',                    type: 'line' },
    { id: 'r2', name: 'New contacts by month',         desc: 'Trials, demo requests and webinar signups entering the CRM.',    type: 'bar' },
    { id: 'r3', name: 'Where pipeline comes from',     desc: 'Share of contacts by original source.',                          type: 'donut' },
    { id: 'r4', name: 'Trial-to-paid funnel',          desc: 'How accounts move from trial to a signed contract.',             type: 'funnel' },
    { id: 'r5', name: 'Pipeline by rep',               desc: 'Open deal value carried by each account executive.',             type: 'ownerbar' },
    { id: 'r6', name: 'Support load by category',      desc: 'What customers ask for help with most.',                         type: 'catbar' }
  ],

  /* what we sell — powers the quote builder */
  catalog: [
    { id: 'p1', name: 'Starter plan — annual',                 price: 588,   unit: 'per workspace' },
    { id: 'p2', name: 'Growth plan — per seat, annual',        price: 1440,  unit: 'per seat' },
    { id: 'p3', name: 'Scale plan — per seat, annual',         price: 2160,  unit: 'per seat' },
    { id: 'p4', name: 'Enterprise seat — 2-year prepay',       price: 2400,  unit: 'per seat' },
    { id: 'p5', name: 'Enterprise platform fee',               price: 24000, unit: 'per contract' },
    { id: 'p6', name: 'Onboarding & migration package',        price: 6500,  unit: 'one-time' },
    { id: 'p7', name: 'SSO & SCIM add-on',                     price: 3500,  unit: 'per year' },
    { id: 'p8', name: 'Historical data import',                price: 2500,  unit: 'one-time' }
  ],
  quotes: [
    { id: 'q1', name: 'Shopwell Labs — Enterprise, 60 seats × 2 years', dealId: 'd2', contactId: 'c2', status: 'Sent',
      created: '2026-06-12', expires: '2026-07-31', discount: 0,
      note: 'Two-year term, Frankfurt hosting, SLA rider attached. Security review addendum included.',
      items: [ { p: 'p5', qty: 1 }, { p: 'p4', qty: 60 } ] },
    { id: 'q2', name: 'Fintrella — Scale plan, 25 seats', dealId: 'd1', contactId: 'c1', status: 'Sent',
      created: '2026-07-01', expires: '2026-07-12', discount: 0,
      note: 'Includes the Amplitude comparison commitments discussed on the deep-dive call.',
      items: [ { p: 'p3', qty: 25 } ] },
    { id: 'q3', name: 'Praxa Health — Growth, 8 seats', dealId: 'd4', contactId: 'c4', status: 'Accepted',
      created: '2026-06-25', expires: '2026-07-09', accepted: '2026-07-03', discount: 20,
      note: 'BAA attached. Early-stage discount applied as agreed.',
      items: [ { p: 'p2', qty: 8 } ] }
  ],

  /* email templates — product voice, reusable */
  templates: [
    { id: 'e1', kind: 'Welcome',       name: 'Trial day 1 — first event',       uses: 964, edited: '2026-06-10',
      subject: '{{first name}}, send your first event in 10 minutes',
      body: 'Hi {{first name}},\n\nWelcome to CloudMetric! The fastest way to feel the value: copy one snippet, paste it into your app, and watch live data appear.\n\nYour snippet is waiting on the setup page. Stuck anywhere? Reply — a human answers, usually within the hour.\n\n{{owner}}\nCloudMetric' },
    { id: 'e2', kind: 'Reminder',      name: 'Trial ending — keep your work',   uses: 505, edited: '2026-06-28',
      subject: 'Your trial ends soon, {{first name}} — your dashboards stay',
      body: 'Hi {{first name}},\n\nYour CloudMetric trial wraps up shortly. Everything you built — dashboards, funnels, saved views — stays exactly as-is the moment you pick a plan.\n\nQuestions about pricing or seats? Reply and we’ll sort it out on one short call.\n\n{{owner}}' },
    { id: 'e3', kind: 'Follow-up',     name: 'Demo follow-up with recording',   uses: 148, edited: '2026-05-20',
      subject: 'Thanks for the demo, {{first name}} — recording inside',
      body: 'Hi {{first name}},\n\nGreat questions today. The recording and the comparison sheet we promised are linked below.\n\nNext step when you’re ready: a two-week pilot with your real data — we handle the setup.\n\n{{owner}}\nCloudMetric' },
    { id: 'e4', kind: 'Re-engagement', name: 'Usage dip — offer a hand',        uses: 37,  edited: '2026-05-18',
      subject: 'Anything we can help with at {{company}}?',
      body: 'Hi {{first name}},\n\nNoticed the team’s usage dipped this month — that’s usually a re-org, a busy sprint, or something we could make easier.\n\nIf it’s the last one: a free 30-minute re-onboarding usually fixes it. Want a slot?\n\n{{owner}}' },
    { id: 'e5', kind: 'Renewal',       name: 'Renewal — 60 days out',           uses: 41,  edited: '2026-06-30',
      subject: 'Renewal ahead for {{company}} — zero surprises',
      body: 'Hi {{first name}},\n\nYour renewal is about 60 days out, so here’s everything upfront: current usage, seat count, and next year’s pricing — no games.\n\nWant to adjust seats or add SSO before renewal? Now’s the cheapest moment.\n\n{{owner}}\nCloudMetric' }
  ]
};
