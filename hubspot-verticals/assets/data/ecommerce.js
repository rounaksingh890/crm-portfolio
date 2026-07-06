/* PeakGear Outfitters — E-commerce edition sample data.
   Every number shown in the app is calculated from these records, so all
   screens always agree with each other. Demo data only — no real people. */
window.HSV_DATA = window.HSV_DATA || {};
window.HSV_DATA.ecommerce = {
  key: 'ecommerce',
  brand: 'PeakGear Outfitters',
  product: 'E-commerce CRM',
  industryLabel: 'E-commerce & retail',
  tagline: 'Wholesale accounts, VIP customers and campaigns for an outdoor-gear brand.',
  accent: '#2e7d5b',
  currency: '$',
  terms: { deal: 'Order', deals: 'Orders', pipelineName: 'Wholesale & key accounts' },

  owners: [
    { id: 'o1', name: 'Ruth Calloway',   role: 'Head of sales',        color: '#2e7d5b' },
    { id: 'o2', name: 'Dev Sharma',      role: 'Wholesale manager',    color: '#f5a623' },
    { id: 'o3', name: 'Lily Fontaine',   role: 'Customer care lead',   color: '#e8467c' },
    { id: 'o4', name: 'Andre Kimura',    role: 'Retention marketer',   color: '#6a78d1' }
  ],

  stages: [
    { id: 's1', label: 'New enquiry',      prob: 10 },
    { id: 's2', label: 'Samples sent',     prob: 30 },
    { id: 's3', label: 'Quote sent',       prob: 55 },
    { id: 's4', label: 'PO received',      prob: 85 },
    { id: 's5', label: 'Fulfilled',        prob: 100 },
    { id: 's6', label: 'Lost',             prob: 0 }
  ],
  ticketStatuses: ['New', 'Waiting on us', 'Waiting on customer', 'Closed'],
  lifecycles: ['Subscriber', 'First-time buyer', 'Repeat customer', 'VIP', 'Wholesale account'],
  sources: ['Online store', 'Instagram', 'Trade show', 'Wholesale enquiry', 'Referral', 'Marketplace'],

  companies: [
    { id: 'co1', name: 'Summit & Trail Co-op',   domain: 'summittrail.com',   industry: 'Outdoor retail chain', size: '201-500', city: 'Denver, CO',       owner: 'o2', created: '2026-01-15', note: '34 stores across the Mountain West. Our largest wholesale prospect.' },
    { id: 'co2', name: 'Basecamp Rentals',       domain: 'basecamprentals.com', industry: 'Gear rental',        size: '11-50',  city: 'Moab, UT',          owner: 'o2', created: '2026-03-02', note: 'Buys rugged rental-fleet gear twice a year — spring and fall.' },
    { id: 'co3', name: 'Cascade University',     domain: 'cascade.edu',       industry: 'University outdoors program', size: '500+', city: 'Portland, OR', owner: 'o2', created: '2026-04-11', note: 'Outdoor programme outfits 400 students a year. Tax-exempt paperwork on file.' },
    { id: 'co4', name: 'TrailBlaze Adventures',  domain: 'trailblazeadv.com', industry: 'Guided tours',         size: '11-50',  city: 'Jackson, WY',       owner: 'o2', created: '2026-02-20', note: 'Guide company. Gear takes a beating — they care about warranty terms.' },
    { id: 'co5', name: 'Nordic Nest (EU)',       domain: 'nordicnest.se',     industry: 'Online retailer',      size: '51-200', city: 'Stockholm, Sweden', owner: 'o1', created: '2026-05-08', note: 'Wants EU distribution. Import duties and MOQ under negotiation.' },
    { id: 'co6', name: 'Riverbend Scout Council', domain: 'riverbendscouts.org', industry: 'Youth organisation', size: '51-200', city: 'Boise, ID',        owner: 'o2', created: '2026-06-01', note: 'Summer-camp bulk orders. Price-sensitive but orders 200+ units.' },
    { id: 'co7', name: 'The Gear Room',          domain: 'thegearroom.co',    industry: 'Independent shop',     size: '1-10',   city: 'Bend, OR',          owner: 'o2', created: '2025-11-12', note: 'Small shop, loyal reorders every quarter. Great social posts about us.' },
    { id: 'co8', name: 'Alta Media House',       domain: 'altamedia.co',      industry: 'Content & influencers', size: '1-10',  city: 'Salt Lake City, UT', owner: 'o4', created: '2026-05-25', note: 'Manages three hiking influencers we partner with for launches.' }
  ],

  contacts: [
    { id: 'c1',  first: 'Wes',     last: 'Granger',   email: 'wes@summittrail.com',       phone: '(303) 555-0171', title: 'Head buyer, Summit & Trail',   companyId: 'co1', lifecycle: 'Wholesale account', owner: 'o2', source: 'Trade show',        created: '2026-01-15', lastTouch: '2026-07-03', city: 'Denver, CO',
      custom: { 'Customer tier': 'Wholesale', 'Lifetime spend': '$0 (prospect)', 'Favorite category': 'Backpacks', 'Marketing consent': 'Yes' },
      timeline: [
        { d: '2026-07-03', t: 'email',   text: 'Buying committee approved the fall line. PO expected within two weeks.' },
        { d: '2026-06-11', t: 'meeting', text: 'Presented fall line to their buying committee — 8 SKUs shortlisted.' },
        { d: '2026-01-15', t: 'note',    text: 'Met at Outdoor Retailer. Wants exclusive colorways for their chain.' } ] },
    { id: 'c2',  first: 'Sasha',   last: 'Villanueva', email: 'sasha.v@gmail.com',        phone: '(415) 555-0139', title: 'VIP customer',                 companyId: null,  lifecycle: 'VIP',              owner: 'o4', source: 'Online store',      created: '2025-08-19', lastTouch: '2026-07-02', city: 'San Francisco, CA',
      custom: { 'Customer tier': 'VIP', 'Lifetime spend': '$3,840', 'Favorite category': 'Ultralight tents', 'Marketing consent': 'Yes' },
      timeline: [
        { d: '2026-07-02', t: 'note',  text: 'Ordered the new Ridgeline 2P tent within an hour of the launch email.' },
        { d: '2026-05-15', t: 'email', text: 'Sent early access to the summer drop — she bought 3 items.' },
        { d: '2025-12-20', t: 'note',  text: 'Crossed VIP threshold ($2,000 lifetime). Sent handwritten thank-you card.' } ] },
    { id: 'c3',  first: 'Martin',  last: 'Oyelaran',  email: 'martin@basecamprentals.com', phone: '(435) 555-0114', title: 'Owner, Basecamp Rentals',     companyId: 'co2', lifecycle: 'Wholesale account', owner: 'o2', source: 'Wholesale enquiry', created: '2026-03-02', lastTouch: '2026-06-30', city: 'Moab, UT',
      custom: { 'Customer tier': 'Wholesale', 'Lifetime spend': '$41,200', 'Favorite category': 'Rental-fleet packs', 'Marketing consent': 'Yes' },
      timeline: [
        { d: '2026-06-30', t: 'call',  text: 'Fall fleet order taking shape — ~120 packs plus repair kits.' },
        { d: '2026-04-08', t: 'note',  text: 'Spring order delivered. Praised the reinforced seams on the rental line.' } ] },
    { id: 'c4',  first: 'Dana',    last: 'Kowalczyk', email: 'dkowalczyk@cascade.edu',    phone: '(503) 555-0186', title: 'Program director, Cascade U',  companyId: 'co3', lifecycle: 'Wholesale account', owner: 'o2', source: 'Wholesale enquiry', created: '2026-04-11', lastTouch: '2026-07-01', city: 'Portland, OR',
      custom: { 'Customer tier': 'Wholesale', 'Lifetime spend': '$0 (prospect)', 'Favorite category': 'Sleeping bags', 'Marketing consent': 'No' },
      timeline: [
        { d: '2026-07-01', t: 'email', text: 'Purchasing office needs the quote on university letterhead template — resending.' },
        { d: '2026-05-19', t: 'meeting', text: 'Campus visit. 400-student programme, needs delivery before Sept 10.' } ] },
    { id: 'c5',  first: 'Jonah',   last: 'Redcloud',  email: 'jonah@trailblazeadv.com',   phone: '(307) 555-0158', title: 'Lead guide, TrailBlaze',       companyId: 'co4', lifecycle: 'Wholesale account', owner: 'o2', source: 'Referral',          created: '2026-02-20', lastTouch: '2026-06-28', city: 'Jackson, WY',
      custom: { 'Customer tier': 'Wholesale', 'Lifetime spend': '$18,750', 'Favorite category': 'Guide-grade shells', 'Marketing consent': 'Yes' },
      timeline: [
        { d: '2026-06-28', t: 'email', text: 'Two shells failed zippers mid-season — processing warranty replacements fast.' },
        { d: '2026-03-14', t: 'note',  text: 'Ordered 30 guide shells. Their guides tag us on every summit photo.' } ] },
    { id: 'c6',  first: 'Elin',    last: 'Bergström', email: 'elin@nordicnest.se',        phone: '+46 8 555 0192', title: 'Buying director, Nordic Nest', companyId: 'co5', lifecycle: 'Wholesale account', owner: 'o1', source: 'Trade show',        created: '2026-05-08', lastTouch: '2026-07-04', city: 'Stockholm, Sweden',
      custom: { 'Customer tier': 'Wholesale', 'Lifetime spend': '$0 (prospect)', 'Favorite category': 'Full range', 'Marketing consent': 'Yes' },
      timeline: [
        { d: '2026-07-04', t: 'email', text: 'Countered on MOQ: 600 units instead of 1,000 for the first EU order.' },
        { d: '2026-05-08', t: 'note',  text: 'EU distribution talk started at the summer trade show. Big opportunity, tricky logistics.' } ] },
    { id: 'c7',  first: 'Becca',   last: 'Liu',       email: 'becca.liu@gmail.com',       phone: '(206) 555-0127', title: 'Repeat customer',              companyId: null,  lifecycle: 'Repeat customer',  owner: 'o4', source: 'Instagram',         created: '2026-02-04', lastTouch: '2026-07-03', city: 'Seattle, WA',
      custom: { 'Customer tier': 'Standard', 'Lifetime spend': '$612', 'Favorite category': 'Trail running vests', 'Marketing consent': 'Yes' },
      timeline: [
        { d: '2026-07-03', t: 'note',  text: 'Third order this year. One more and she crosses into VIP early-access tier.' },
        { d: '2026-02-04', t: 'note',  text: 'Came from the trail-running reel collab with @altitude.annie.' } ] },
    { id: 'c8',  first: 'Frank',   last: 'Dempsey',   email: 'frank@riverbendscouts.org', phone: '(208) 555-0163', title: 'Council director, Riverbend Scouts', companyId: 'co6', lifecycle: 'Wholesale account', owner: 'o2', source: 'Wholesale enquiry', created: '2026-06-01', lastTouch: '2026-07-02', city: 'Boise, ID',
      custom: { 'Customer tier': 'Wholesale', 'Lifetime spend': '$0 (prospect)', 'Favorite category': 'Youth daypacks', 'Marketing consent': 'No' },
      timeline: [
        { d: '2026-07-02', t: 'call', text: 'Needs 220 daypacks by July 28 for camp season. Checking warehouse stock.' },
        { d: '2026-06-01', t: 'note', text: 'Found us through the Gear Room\'s recommendation. Budget: $38/unit max.' } ] },
    { id: 'c9',  first: 'Tomás',   last: 'Herrera',   email: 'tomas.herrera@gmail.com',   phone: '(602) 555-0149', title: 'First-time buyer',             companyId: null,  lifecycle: 'First-time buyer', owner: 'o3', source: 'Marketplace',       created: '2026-06-26', lastTouch: '2026-07-04', city: 'Phoenix, AZ',
      custom: { 'Customer tier': 'Standard', 'Lifetime spend': '$148', 'Favorite category': 'Hydration', 'Marketing consent': 'Yes' },
      timeline: [
        { d: '2026-07-04', t: 'note', text: 'Order arrived with a dented water bottle — replacement shipped same day.' },
        { d: '2026-06-26', t: 'note', text: 'First order via the marketplace listing; joined the newsletter at checkout.' } ] },
    { id: 'c10', first: 'Nina',    last: 'Vasquez',   email: 'nina@thegearroom.co',       phone: '(541) 555-0135', title: 'Owner, The Gear Room',         companyId: 'co7', lifecycle: 'Wholesale account', owner: 'o2', source: 'Wholesale enquiry', created: '2025-11-12', lastTouch: '2026-06-25', city: 'Bend, OR',
      custom: { 'Customer tier': 'Wholesale', 'Lifetime spend': '$27,300', 'Favorite category': 'Best-seller mix', 'Marketing consent': 'Yes' },
      timeline: [
        { d: '2026-06-25', t: 'email', text: 'Q3 reorder placed — added the new trail-running vests this time.' },
        { d: '2026-01-10', t: 'note',  text: 'Renewed annual terms. One of our most reliable independent accounts.' } ] },
    { id: 'c11', first: 'Annie',   last: 'Calder',    email: 'annie@altamedia.co',        phone: '(801) 555-0122', title: 'Creator (@altitude.annie)',    companyId: 'co8', lifecycle: 'VIP',              owner: 'o4', source: 'Instagram',         created: '2026-05-25', lastTouch: '2026-07-01', city: 'Salt Lake City, UT',
      custom: { 'Customer tier': 'Partner', 'Lifetime spend': '—', 'Favorite category': 'Trail running', 'Marketing consent': 'Yes' },
      timeline: [
        { d: '2026-07-01', t: 'meeting', text: 'Planned the Ridgeline tent launch reel — filming July 12 in the Uintas.' },
        { d: '2026-05-25', t: 'note',    text: 'Her February reel drove 1,900 site visits and 240 orders. Renewing partnership.' } ] },
    { id: 'c12', first: 'Gary',    last: 'Plotkin',   email: 'gary.plotkin@yahoo.com',    phone: '(312) 555-0118', title: 'Repeat customer',              companyId: null,  lifecycle: 'Repeat customer',  owner: 'o3', source: 'Online store',      created: '2025-10-30', lastTouch: '2026-06-29', city: 'Chicago, IL',
      custom: { 'Customer tier': 'Standard', 'Lifetime spend': '$927', 'Favorite category': 'Camp kitchen', 'Marketing consent': 'No' },
      timeline: [
        { d: '2026-06-29', t: 'note', text: 'Asked to be removed from marketing emails but keep order updates — done.' },
        { d: '2026-06-27', t: 'note', text: 'Return requested: camp stove igniter faulty out of the box.' } ] },
    { id: 'c13', first: 'Priti',   last: 'Anand',     email: 'priti.anand@gmail.com',     phone: '(917) 555-0175', title: 'Subscriber',                   companyId: null,  lifecycle: 'Subscriber',       owner: 'o4', source: 'Online store',      created: '2026-07-01', lastTouch: '2026-07-01', city: 'New York, NY',
      custom: { 'Customer tier': 'Standard', 'Lifetime spend': '$0', 'Favorite category': 'Unknown', 'Marketing consent': 'Yes' },
      timeline: [
        { d: '2026-07-01', t: 'note', text: 'Joined the list via the 10%-off popup. Abandoned a cart with the Ridgeline tent.' } ] },
    { id: 'c14', first: 'Cole',    last: 'Brandt',    email: 'cole.brandt@gmail.com',     phone: '(720) 555-0193', title: 'VIP customer',                 companyId: null,  lifecycle: 'VIP',              owner: 'o4', source: 'Referral',          created: '2025-06-15', lastTouch: '2026-06-30', city: 'Boulder, CO',
      custom: { 'Customer tier': 'VIP', 'Lifetime spend': '$2,215', 'Favorite category': 'Backpacks', 'Marketing consent': 'Yes' },
      timeline: [
        { d: '2026-06-30', t: 'email', text: 'Replied to the VIP survey — wants a trade-in programme for old packs.' },
        { d: '2026-04-22', t: 'note',  text: 'Referred two friends who both ordered. Sent him a $50 credit.' } ] }
  ],

  deals: [
    { id: 'd1',  name: 'Summit & Trail — fall line launch order',      amount: 84500, stage: 's3', close: '2026-07-20', owner: 'o2', contactId: 'c1',  companyId: 'co1', created: '2026-01-15', source: 'Trade show' },
    { id: 'd2',  name: 'Basecamp Rentals — fall fleet (120 packs)',    amount: 22800, stage: 's2', close: '2026-08-10', owner: 'o2', contactId: 'c3',  companyId: 'co2', created: '2026-06-15', source: 'Wholesale enquiry' },
    { id: 'd3',  name: 'Cascade U — student programme kit',            amount: 46200, stage: 's3', close: '2026-08-01', owner: 'o2', contactId: 'c4',  companyId: 'co3', created: '2026-04-11', source: 'Wholesale enquiry' },
    { id: 'd4',  name: 'Riverbend Scouts — 220 youth daypacks',        amount: 8140,  stage: 's4', close: '2026-07-14', owner: 'o2', contactId: 'c8',  companyId: 'co6', created: '2026-06-01', source: 'Wholesale enquiry' },
    { id: 'd5',  name: 'Nordic Nest — first EU distribution order',    amount: 61000, stage: 's3', close: '2026-08-25', owner: 'o1', contactId: 'c6',  companyId: 'co5', created: '2026-05-08', source: 'Trade show' },
    { id: 'd6',  name: 'The Gear Room — Q3 reorder',                   amount: 6800,  stage: 's5', close: '2026-06-25', owner: 'o2', contactId: 'c10', companyId: 'co7', created: '2026-06-20', source: 'Wholesale enquiry' },
    { id: 'd7',  name: 'TrailBlaze — winter shell pre-order',          amount: 14300, stage: 's2', close: '2026-09-05', owner: 'o2', contactId: 'c5',  companyId: 'co4', created: '2026-06-10', source: 'Referral' },
    { id: 'd8',  name: 'Alta Media — Ridgeline launch partnership',    amount: 9500,  stage: 's4', close: '2026-07-12', owner: 'o4', contactId: 'c11', companyId: 'co8', created: '2026-05-25', source: 'Instagram' },
    { id: 'd9',  name: 'Basecamp Rentals — spring fleet order',        amount: 19400, stage: 's5', close: '2026-04-08', owner: 'o2', contactId: 'c3',  companyId: 'co2', created: '2026-03-02', source: 'Wholesale enquiry' },
    { id: 'd10', name: 'Summit & Trail — exclusive colorway pilot',    amount: 12600, stage: 's1', close: '2026-09-30', owner: 'o2', contactId: 'c1',  companyId: 'co1', created: '2026-06-11', source: 'Trade show' },
    { id: 'd11', name: 'Mountain Mart chain — spring pitch',           amount: 38000, stage: 's6', close: '2026-05-15', owner: 'o1', contactId: null,  companyId: null,  created: '2026-03-20', source: 'Trade show' },
    { id: 'd12', name: 'The Gear Room — Q2 reorder',                   amount: 5900,  stage: 's5', close: '2026-03-28', owner: 'o2', contactId: 'c10', companyId: 'co7', created: '2026-03-15', source: 'Wholesale enquiry' },
    { id: 'd13', name: 'TrailBlaze — guide shell restock (30 units)',  amount: 11250, stage: 's5', close: '2026-03-14', owner: 'o2', contactId: 'c5',  companyId: 'co4', created: '2026-02-20', source: 'Referral' },
    { id: 'd14', name: 'Cascade U — add-on: 60 sleeping pads',         amount: 5400,  stage: 's1', close: '2026-08-15', owner: 'o2', contactId: 'c4',  companyId: 'co3', created: '2026-07-01', source: 'Wholesale enquiry' }
  ],

  tickets: [
    { id: 't1', subject: 'Zipper failures on two guide shells',       status: 'Waiting on us',       priority: 'High',   contactId: 'c5',  owner: 'o3', created: '2026-06-28', category: 'Warranty',
      desc: 'Two shells from the March batch failed zippers mid-season. Replacements ship today; QA is checking the batch.',
      thread: [ { from: 'them', at: '2026-06-28 07:45', text: 'Two of the shells lost their main zippers this week — mid-trip, which is rough with clients around.' },
                { from: 'us',   at: '2026-06-28 09:10', text: 'Not okay — replacements ship today with return labels. QA is pulling the batch records to see if it\'s wider.' } ] },
    { id: 't2', subject: 'Dented water bottle in first order',        status: 'Closed',              priority: 'Medium', contactId: 'c9',  owner: 'o3', created: '2026-07-04', category: 'Shipping damage',
      desc: 'Marketplace order arrived with a dented bottle. Replacement shipped same day; carrier claim filed.',
      thread: [ { from: 'them', at: '2026-07-04 10:22', text: 'My first order showed up with the bottle dented on one side. Not a great start!' },
                { from: 'us',   at: '2026-07-04 10:51', text: 'So sorry — a new one ships today, keep the dented one. Hope the rest of the gear treats you well!' } ] },
    { id: 't3', subject: 'Camp stove igniter faulty out of the box',  status: 'Waiting on customer', priority: 'Medium', contactId: 'c12', owner: 'o3', created: '2026-06-27', category: 'Returns',
      desc: 'Return approved for the faulty stove. Prepaid label sent; waiting for the unit to arrive back for refund.',
      thread: [ { from: 'them', at: '2026-06-27 19:33', text: 'The igniter on the stove clicks but never sparks. Tried a full gas swap, same thing.' },
                { from: 'us',   at: '2026-06-27 20:04', text: 'That\'s a defect — return label emailed. Refund or replacement, your pick, the moment it scans at the carrier.' } ] },
    { id: 't4', subject: 'Quote needs university letterhead format',  status: 'Waiting on us',       priority: 'Medium', contactId: 'c4',  owner: 'o2', created: '2026-07-01', category: 'Wholesale paperwork',
      desc: 'Cascade\'s purchasing office rejected the standard PDF quote. Reissuing on their required template with tax-exempt fields.',
      thread: [ { from: 'them', at: '2026-07-01 13:15', text: 'Purchasing bounced the quote — it has to be on our template with the tax-exempt ID shown.' },
                { from: 'us',   at: '2026-07-01 14:02', text: 'No problem, we\'ve filled university templates before. Reissued version with you tomorrow morning.' } ] },
    { id: 't5', subject: 'Where is my order? (marketplace delay)',    status: 'Closed',              priority: 'Low',    contactId: 'c9',  owner: 'o3', created: '2026-06-28', category: 'Shipping',
      desc: 'Marketplace shipment sat two days at a sort facility. Arrived June 30; flagged the carrier lane for review.',
      thread: [ { from: 'them', at: '2026-06-28 08:30', text: 'Tracking hasn\'t moved since Friday — is my order lost?' },
                { from: 'us',   at: '2026-06-28 09:15', text: 'It\'s at the regional sort hub — these usually move within 24h. We\'ll watch it and update you tomorrow either way.' } ] },
    { id: 't6', subject: 'Unsubscribe from marketing, keep receipts', status: 'Closed',              priority: 'Low',    contactId: 'c12', owner: 'o3', created: '2026-06-29', category: 'Preferences',
      desc: 'Gary wants transactional emails only. Updated his consent — order updates stay on, campaigns stop.',
      thread: [ { from: 'them', at: '2026-06-29 11:40', text: 'Too many emails, folks. Keep the shipping updates, lose the promos please.' },
                { from: 'us',   at: '2026-06-29 12:05', text: 'Done — you\'ll only hear from us about orders now. Thanks for telling us instead of hitting spam!' } ] },
    { id: 't7', subject: 'Daypack stock check for July 28 deadline',  status: 'Waiting on us',       priority: 'High',   contactId: 'c8',  owner: 'o2', created: '2026-07-02', category: 'Inventory',
      desc: 'Scouts need 220 youth daypacks by July 28. Warehouse shows 180 on hand; 60 more land July 15 — confirming allocation.',
      thread: [ { from: 'them', at: '2026-07-02 09:05', text: 'Camp starts August 1 — can you truly deliver all 220 packs by July 28?' },
                { from: 'us',   at: '2026-07-02 10:12', text: '180 are on the shelf now and 60 more arrive July 15. We\'re reserving your allocation today and will confirm in writing.' } ] },
    { id: 't8', subject: 'Wants a trade-in programme for old packs',  status: 'New',                 priority: 'Low',    contactId: 'c14', owner: 'o4', created: '2026-06-30', category: 'Feedback & ideas',
      desc: 'VIP survey reply suggesting a trade-in/refurb programme. Logging interest — third VIP to ask this quarter.',
      thread: [ { from: 'them', at: '2026-06-30 16:20', text: 'I\'ve got two old PeakGear packs in great shape. Ever thought about trade-ins for store credit?' } ] }
  ],

  tasks: [
    { id: 'k1', title: 'Reissue Cascade quote on university template',  due: '2026-07-06', type: 'To-do', owner: 'o2', related: { kind: 'ticket', id: 't4' },  done: false },
    { id: 'k2', title: 'Confirm daypack allocation in writing (Scouts)', due: '2026-07-06', type: 'Email', owner: 'o2', related: { kind: 'ticket', id: 't7' }, done: false },
    { id: 'k3', title: 'QA report on March shell batch zippers',        due: '2026-07-08', type: 'To-do', owner: 'o3', related: { kind: 'ticket', id: 't1' },  done: false },
    { id: 'k4', title: 'Counter Nordic Nest on MOQ (600 vs 1,000)',     due: '2026-07-07', type: 'Email', owner: 'o1', related: { kind: 'deal', id: 'd5' },    done: false },
    { id: 'k5', title: 'Ship samples for Basecamp fall fleet',          due: '2026-07-09', type: 'To-do', owner: 'o2', related: { kind: 'deal', id: 'd2' },    done: false },
    { id: 'k6', title: 'Brief Annie on Ridgeline reel talking points',  due: '2026-07-10', type: 'To-do', owner: 'o4', related: { kind: 'deal', id: 'd8' },    done: false },
    { id: 'k7', title: 'Send VIP early access for the summer drop',     due: '2026-05-15', type: 'Email', owner: 'o4', related: { kind: 'contact', id: 'c2' }, done: true },
    { id: 'k8', title: 'Follow up on Summit & Trail PO timing',         due: '2026-07-10', type: 'Call',  owner: 'o2', related: { kind: 'deal', id: 'd1' },    done: false },
    { id: 'k9', title: 'Log trade-in idea to the product board',        due: '2026-07-08', type: 'To-do', owner: 'o4', related: { kind: 'ticket', id: 't8' },  done: false }
  ],

  meetings: [
    { id: 'm1', title: 'Nordic Nest — MOQ & duties negotiation',    date: '2026-07-08', time: '08:00', contactId: 'c6',  owner: 'o1', kind: 'Negotiation' },
    { id: 'm2', title: 'Summit & Trail — PO logistics call',        date: '2026-07-10', time: '11:00', contactId: 'c1',  owner: 'o2', kind: 'Account call' },
    { id: 'm3', title: 'Annie Calder — Ridgeline shoot (Uintas)',   date: '2026-07-12', time: '06:00', contactId: 'c11', owner: 'o4', kind: 'Content shoot' },
    { id: 'm4', title: 'Cascade U — purchasing office review',      date: '2026-07-15', time: '14:00', contactId: 'c4',  owner: 'o2', kind: 'Account call' },
    { id: 'm5', title: 'Basecamp — fall fleet sample review',       date: '2026-07-17', time: '10:00', contactId: 'c3',  owner: 'o2', kind: 'Sample review' },
    { id: 'm6', title: 'TrailBlaze — winter pre-order planning',    date: '2026-07-21', time: '13:00', contactId: 'c5',  owner: 'o2', kind: 'Account call' }
  ],

  campaigns: [
    { id: 'g1', name: 'Ridgeline 2P tent launch',            type: 'One-off',    status: 'Sent',      date: '2026-07-01', audience: 'Full list',                sent: 24800, opened: 9670, clicked: 2140, replied: 63,
      subject: 'The Ridgeline 2P is here — 2.1 lbs, storm-tested', preview: 'Three years of prototypes. One tent we\'d bet a summit on. Ships this week.' },
    { id: 'g2', name: 'Abandoned cart recovery',             type: 'Automated',  status: 'Running',   date: '2026-01-01', audience: 'Cart abandoners',          sent: 5320, opened: 2610, clicked: 1180, replied: 12,
      subject: 'Your gear is still waiting', preview: 'We saved your cart. Heads up — the Ridgeline colorways are moving quickly.' },
    { id: 'g3', name: 'VIP early access — summer drop',      type: 'One-off',    status: 'Sent',      date: '2026-05-15', audience: 'VIP tier',                 sent: 480,  opened: 391, clicked: 227, replied: 34,
      subject: '48 hours early: the summer drop', preview: 'You\'re in before everyone else — as always. Full collection inside.' },
    { id: 'g4', name: 'Win-back: 6 months since last order', type: 'Automated',  status: 'Running',   date: '2026-02-10', audience: 'Lapsed customers',         sent: 3140, opened: 998, clicked: 341, replied: 8,
      subject: 'Trails miss you (here\'s 15% off)', preview: 'It\'s been a while. New colors, lighter fabrics, same lifetime warranty.' },
    { id: 'g5', name: 'Wholesale fall-line lookbook',        type: 'One-off',    status: 'Scheduled', date: '2026-07-18', audience: 'Wholesale accounts',       sent: 0,    opened: 0,   clicked: 0,   replied: 0,
      subject: 'Fall 2026 wholesale lookbook + order windows', preview: 'Line sheets, margins and the exclusive colorway programme for stockists.' }
  ],

  forms: [
    { id: 'f1', name: 'Newsletter + 10% off popup',   page: 'Online store (site-wide)', views: 48200, submissions: 2610, fields: ['Email'],                                                     recent: ['c13'] },
    { id: 'f2', name: 'Wholesale application',        page: '/wholesale',               views: 1830,  submissions: 74,   fields: ['Business name', 'Contact', 'Email', 'Resale ID', 'Store locations', 'How did you hear about us?'], recent: ['c8', 'c6'] },
    { id: 'f3', name: 'Warranty claim',               page: '/warranty',                views: 940,   submissions: 118,  fields: ['Order number', 'Product', 'What happened?', 'Photos'],       recent: ['c5', 'c12'] },
    { id: 'f4', name: 'Ambassador application',       page: '/ambassadors',             views: 2760,  submissions: 203,  fields: ['Name', 'Email', 'Social handles', 'Why PeakGear?'],          recent: ['c11'] }
  ],

  workflows: [
    { id: 'w1', name: 'Abandoned cart rescue',            status: 'On', trigger: 'A cart sits untouched for 4 hours', goal: 'Recovered checkout', enrolled: 5320, active: 96, completed: 4870,
      steps: [ { k: 'trigger', text: 'Cart abandoned for 4 hours' },
               { k: 'email',   text: '"Your gear is still waiting" with the cart contents' },
               { k: 'delay',   text: 'Wait 1 day' },
               { k: 'branch',  text: 'Still no order? Send low-stock nudge if any item is under 20 units' },
               { k: 'delay',   text: 'Wait 2 days' },
               { k: 'email',   text: 'Final note with free-shipping code (once per customer per quarter)' } ] },
    { id: 'w2', name: 'Welcome series for new subscribers', status: 'On', trigger: 'Someone joins the newsletter', goal: 'First order within 30 days', enrolled: 2610, active: 240, completed: 2210,
      steps: [ { k: 'trigger', text: 'New newsletter signup' },
               { k: 'email',   text: 'Welcome + 10% code, brand story and best-sellers' },
               { k: 'delay',   text: 'Wait 3 days' },
               { k: 'email',   text: 'Gear guides matched to what they browsed' },
               { k: 'branch',  text: 'Code unused after 7 days? Send a reminder before it expires' } ] },
    { id: 'w3', name: 'VIP tier upgrade',                 status: 'On', trigger: 'Lifetime spend crosses $2,000', goal: 'Keep VIPs feeling like VIPs', enrolled: 61, active: 3, completed: 58,
      steps: [ { k: 'trigger', text: 'Lifetime spend crosses $2,000' },
               { k: 'update',  text: 'Set customer tier to VIP and add to the early-access list' },
               { k: 'email',   text: 'Personal thank-you with early-access explanation' },
               { k: 'task',    text: 'Queue a handwritten card for the next mail run' } ] },
    { id: 'w4', name: 'Warranty claim handling',          status: 'On', trigger: 'The warranty form is submitted', goal: 'Resolution within 3 days', enrolled: 118, active: 7, completed: 104,
      steps: [ { k: 'trigger', text: 'Warranty claim form submitted' },
               { k: 'task',    text: 'Create a ticket and assign by product category' },
               { k: 'email',   text: 'Acknowledge within the hour with what happens next' },
               { k: 'branch',  text: 'Same product failing 3+ times this month? Alert the QA channel' } ] },
    { id: 'w5', name: 'Wholesale application triage',     status: 'On', trigger: 'The wholesale form is submitted', goal: 'Reply within 1 business day', enrolled: 74, active: 4, completed: 66,
      steps: [ { k: 'trigger', text: 'Wholesale application submitted' },
               { k: 'branch',  text: 'Has a resale ID and physical store? Route to the wholesale manager' },
               { k: 'email',   text: 'Send line sheet and terms to qualified applicants' },
               { k: 'task',    text: 'Book an intro call within 5 days' } ] }
  ],

  conversations: [
    { id: 'v1', channel: 'Email',    contactId: 'c6',  subject: 'Re: MOQ counter-proposal',        unread: true,  at: '2026-07-04 09:30',
      msgs: [ { from: 'them', at: '2026-07-04 09:30', text: 'We can commit to 600 units for the first order if you hold the same unit price. If the line performs, 1,000+ per season is realistic.' } ] },
    { id: 'v2', channel: 'Chat',     contactId: 'c13', subject: 'Sizing question',                 unread: true,  at: '2026-07-04 20:15',
      msgs: [ { from: 'them', at: '2026-07-04 20:15', text: 'Is the Ridgeline 2P actually roomy enough for two people plus a dog? Asking for a 60lb golden retriever.' } ] },
    { id: 'v3', channel: 'Email',    contactId: 'c1',  subject: 'PO paperwork in motion',          unread: false, at: '2026-07-03 16:05',
      msgs: [ { from: 'them', at: '2026-07-03 16:05', text: 'Committee signed off. Our PO system needs your W-9 and updated line sheet — send those and paperwork starts Monday.' },
              { from: 'us',   at: '2026-07-03 16:32', text: 'Both attached. Excited to get PeakGear into all 34 stores — let us know if the system needs anything else.' } ] },
    { id: 'v4', channel: 'Instagram', contactId: 'c11', subject: 'Shoot location confirmed',       unread: false, at: '2026-07-01 21:40',
      msgs: [ { from: 'them', at: '2026-07-01 21:40', text: 'Permit came through for the Uintas site 🎉 Golden hour on the 12th. Send the tent + two colorways by the 9th?' },
              { from: 'us',   at: '2026-07-01 21:55', text: 'Shipping both colorways tomorrow, overnight. Can\'t wait to see the footage!' } ] },
    { id: 'v5', channel: 'Email',    contactId: 'c8',  subject: 'Camp deadline — in writing',      unread: false, at: '2026-07-02 10:12',
      msgs: [ { from: 'them', at: '2026-07-02 10:12', text: 'I have 220 scouts counting on this. I need the July 28 delivery commitment in writing before I release the PO.' },
              { from: 'us',   at: '2026-07-02 11:00', text: 'Completely fair. Formal delivery commitment letter attached — 180 units ship July 8, remaining 60 ship July 16.' } ] },
    { id: 'v6', channel: 'Chat',     contactId: 'c2',  subject: 'Ridgeline shipping date',         unread: false, at: '2026-07-02 08:20',
      msgs: [ { from: 'them', at: '2026-07-02 08:20', text: 'Ordered the Ridgeline the minute the email landed 😄 When does it ship? Trip on the 18th.' },
              { from: 'us',   at: '2026-07-02 08:34', text: 'VIP orders ship first — yours leaves the warehouse tomorrow. You\'ll have it well before the 18th. Have an amazing trip!' } ] }
  ],

  customProps: [
    { object: 'Contact', label: 'Customer tier',        internal: 'customer_tier',      type: 'Dropdown',     options: 'Standard, VIP, Partner, Wholesale',          used: 'Early access and support priority' },
    { object: 'Contact', label: 'Lifetime spend',       internal: 'lifetime_spend',     type: 'Currency',     options: '—',                                           used: 'VIP tier workflow' },
    { object: 'Contact', label: 'Favorite category',    internal: 'favorite_category',  type: 'Dropdown',     options: 'Backpacks, Tents, Trail running, Camp kitchen, Hydration', used: 'Personalised campaigns' },
    { object: 'Contact', label: 'Marketing consent',    internal: 'marketing_consent',  type: 'Yes / No',     options: 'Yes, No',                                     used: 'Campaign audiences (legal requirement)' },
    { object: 'Contact', label: 'Size profile',         internal: 'size_profile',       type: 'Single line',  options: '—',                                           used: 'Reducing size-related returns' },
    { object: 'Deal',    label: 'Order type',           internal: 'order_type',         type: 'Dropdown',     options: 'Wholesale, Fleet, Institutional, Partnership', used: 'Margin reporting' },
    { object: 'Deal',    label: 'Requested delivery date', internal: 'delivery_date',   type: 'Date',         options: '—',                                           used: 'Warehouse planning' },
    { object: 'Company', label: 'Resale ID on file',    internal: 'resale_id_status',   type: 'Yes / No',     options: 'Yes, No',                                     used: 'Wholesale compliance' },
    { object: 'Company', label: 'Store count',          internal: 'store_count',        type: 'Number',       options: '—',                                           used: 'Account sizing' },
    { object: 'Ticket',  label: 'Order number',         internal: 'order_number',       type: 'Single line',  options: '—',                                           used: 'Linking issues to orders' }
  ],

  integrations: [
    { name: 'Shopify',            cat: 'Store',         desc: 'Orders, customers and refunds sync in real time.',                       connected: true },
    { name: 'Klaviyo import',     cat: 'Migration',     desc: 'One-time import of email history — completed in January.',               connected: false },
    { name: 'ShipStation',        cat: 'Fulfilment',    desc: 'Tracking numbers post back to tickets and order records.',               connected: true },
    { name: 'Stripe',             cat: 'Payments',      desc: 'Wholesale invoices and payment status on every order.',                   connected: true },
    { name: 'Instagram & Meta',   cat: 'Social & ads',  desc: 'DMs land in the inbox; ad-driven orders keep their campaign source.',    connected: true },
    { name: 'Slack',              cat: 'Notifications', desc: 'Warranty spikes and big wholesale orders ping the team.',                connected: true },
    { name: 'Google Analytics',   cat: 'Analytics',     desc: 'Store traffic joins CRM data for the visitors report.',                  connected: true },
    { name: 'NetSuite',           cat: 'Inventory',     desc: 'Warehouse stock levels for delivery-date promises. Setup in progress.',  connected: false },
    { name: 'Typeform',           cat: 'Forms',         desc: 'The VIP survey pipes answers onto contact records.',                     connected: true },
    { name: 'Loop Returns',       cat: 'Returns',       desc: 'Return requests open tickets with the order attached.',                  connected: true }
  ],

  monthly: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    revenue:     [148000, 132000, 176000, 194000, 221000, 263000],
    newContacts: [420, 380, 465, 510, 590, 705],
    won:         [18, 15, 22, 24, 27, 31],
    ticketsClosed: [64, 58, 71, 69, 82, 77],
    visitors:    [88000, 79000, 96000, 104000, 121000, 139000]
  },
  sourceBreakdown: [
    { label: 'Online store',      value: 41 },
    { label: 'Instagram',         value: 19 },
    { label: 'Marketplace',       value: 14 },
    { label: 'Wholesale enquiry', value: 11 },
    { label: 'Trade show',        value: 8 },
    { label: 'Referral',          value: 7 }
  ],

  reports: [
    { id: 'r1', name: 'Revenue by month',              desc: 'Store plus wholesale revenue, month by month.',                 type: 'line' },
    { id: 'r2', name: 'New contacts by month',         desc: 'Subscribers, buyers and wholesale leads entering the CRM.',      type: 'bar' },
    { id: 'r3', name: 'Where customers come from',     desc: 'Share of contacts by original source.',                          type: 'donut' },
    { id: 'r4', name: 'Wholesale pipeline funnel',     desc: 'How wholesale enquiries become fulfilled orders.',               type: 'funnel' },
    { id: 'r5', name: 'Pipeline by account owner',     desc: 'Open order value carried by each team member.',                  type: 'ownerbar' },
    { id: 'r6', name: 'Support load by category',      desc: 'What customers contact us about most.',                          type: 'catbar' }
  ]
};
