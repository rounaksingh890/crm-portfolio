/* Harborline Realty — Real estate edition sample data.
   Every number shown in the app is calculated from these records, so all
   screens always agree with each other. Demo data only — no real people. */
window.HSV_DATA = window.HSV_DATA || {};
window.HSV_DATA.realestate = {
  key: 'realestate',
  brand: 'Harborline Realty',
  product: 'Real Estate CRM',
  industryLabel: 'Real estate',
  tagline: 'Buyers, sellers, showings and closings for a coastal brokerage.',
  accent: '#e8734a',
  currency: '$',
  terms: { deal: 'Transaction', deals: 'Transactions', pipelineName: 'Buying & selling pipeline' },

  owners: [
    { id: 'o1', name: 'Dana Whitlock',   role: 'Broker / owner',   color: '#e8734a' },
    { id: 'o2', name: 'Chris Palmer',    role: 'Listing agent',    color: '#00a4bd' },
    { id: 'o3', name: 'Aisha Robinson',  role: 'Buyer\'s agent',   color: '#8067dc' },
    { id: 'o4', name: 'Miguel Santos',   role: 'Transaction coordinator', color: '#00bda5' }
  ],

  stages: [
    { id: 's1', label: 'New lead',          prob: 10 },
    { id: 's2', label: 'Toured / listed',   prob: 30 },
    { id: 's3', label: 'Offer made',        prob: 55 },
    { id: 's4', label: 'Under contract',    prob: 80 },
    { id: 's5', label: 'Closed',            prob: 100 },
    { id: 's6', label: 'Fell through',      prob: 0 }
  ],
  ticketStatuses: ['New', 'Waiting on us', 'Waiting on client', 'Closed'],
  lifecycles: ['New lead', 'Actively looking', 'Under contract', 'Closed client', 'Past client'],
  sources: ['Zillow', 'Website form', 'Open house', 'Referral', 'Sign call', 'Instagram'],

  companies: [
    { id: 'co1', name: 'Coastal Lending Group',  domain: 'coastallend.com',   industry: 'Mortgage lender',   size: '11-50',  city: 'Wilmington, NC', owner: 'o1', created: '2025-09-10', note: 'Preferred lender. Pre-approvals back within 24 hours for our buyers.' },
    { id: 'co2', name: 'Anchor Title Co.',       domain: 'anchortitle.com',   industry: 'Title & escrow',    size: '11-50',  city: 'Wilmington, NC', owner: 'o4', created: '2025-09-10', note: 'Handles most of our closings. Ask for Renee on rush files.' },
    { id: 'co3', name: 'Saltmarsh Builders',     domain: 'saltmarshbuild.com',industry: 'Home builder',      size: '51-200', city: 'Leland, NC',     owner: 'o2', created: '2026-02-12', note: 'We list their Marsh Landing new-construction phase — 14 lots.' },
    { id: 'co4', name: 'Harbor Inspections',     domain: 'harborinspect.com', industry: 'Home inspection',   size: '1-10',   city: 'Wilmington, NC', owner: 'o4', created: '2025-11-03', note: 'Reliable 48-hour turnaround, buyers love their reports.' },
    { id: 'co5', name: 'Beacon Property Mgmt',   domain: 'beaconpm.com',      industry: 'Property management', size: '11-50', city: 'Carolina Beach, NC', owner: 'o1', created: '2026-01-20', note: 'Sends us owners who decide to sell instead of re-listing rentals.' },
    { id: 'co6', name: 'Cape Fear Relocation',   domain: 'cfrelo.com',        industry: 'Corporate relocation', size: '1-10', city: 'Wilmington, NC', owner: 'o3', created: '2026-03-30', note: 'Corporate relo referrals — hospital and university hires mostly.' },
    { id: 'co7', name: 'Dockside Staging',       domain: 'docksidestaging.com', industry: 'Home staging',    size: '1-10',   city: 'Wilmington, NC', owner: 'o2', created: '2026-04-08', note: 'Staged listings sell ~9 days faster for us on average.' },
    { id: 'co8', name: 'Pelican State Insurance', domain: 'pelicanins.com',   industry: 'Home insurance',    size: '11-50',  city: 'Wilmington, NC', owner: 'o4', created: '2026-05-14', note: 'Quotes coastal / flood policies fast — crucial near the water.' }
  ],

  contacts: [
    { id: 'c1',  first: 'Nathan',  last: 'Pruitt',    email: 'nathan.pruitt@gmail.com',   phone: '(910) 555-0161', title: 'Buyer',            companyId: null,  lifecycle: 'Under contract',   owner: 'o3', source: 'Zillow',       created: '2026-04-18', lastTouch: '2026-07-03', city: 'Wilmington, NC',
      custom: { 'Budget range': '$400k – $475k', 'Pre-approved': 'Yes — Coastal Lending', 'Areas of interest': 'Ogden, Porters Neck', 'Bedrooms needed': '4' },
      timeline: [
        { d: '2026-07-03', t: 'call',    text: 'Appraisal came in at value — cleared the last financing hurdle.' },
        { d: '2026-06-14', t: 'note',    text: 'Offer accepted on 214 Marsh Fern Ct at $452,000. Closing set for July 24.' },
        { d: '2026-05-09', t: 'meeting', text: 'Toured 5 homes in Ogden. Loved the two with big yards.' } ] },
    { id: 'c2',  first: 'Carol',   last: 'Mizrahi',   email: 'carol.miz@outlook.com',     phone: '(910) 555-0117', title: 'Seller',           companyId: null,  lifecycle: 'Actively looking', owner: 'o2', source: 'Referral',     created: '2026-06-05', lastTouch: '2026-07-04', city: 'Wrightsville Beach, NC',
      custom: { 'Budget range': '—', 'Pre-approved': '—', 'Areas of interest': 'Selling: 12 Dune Ridge', 'Bedrooms needed': '—' },
      timeline: [
        { d: '2026-07-04', t: 'email',   text: 'Sent the comparative market analysis — suggesting $1.15M list price.' },
        { d: '2026-06-28', t: 'meeting', text: 'Walked the Dune Ridge property. Great condition; needs staging for scale.' },
        { d: '2026-06-05', t: 'note',    text: 'Referred by the Hendersons (closed with us in 2025). Beach house, relocating to Denver.' } ] },
    { id: 'c3',  first: 'Jamal',   last: 'Whitaker',  email: 'jamal.w@gmail.com',         phone: '(910) 555-0184', title: 'Buyer',            companyId: null,  lifecycle: 'Actively looking', owner: 'o3', source: 'Open house',   created: '2026-06-15', lastTouch: '2026-07-02', city: 'Wilmington, NC',
      custom: { 'Budget range': '$300k – $340k', 'Pre-approved': 'In progress', 'Areas of interest': 'Midtown, Pine Valley', 'Bedrooms needed': '3' },
      timeline: [
        { d: '2026-07-02', t: 'email', text: 'Sent 6 new Midtown listings matching his filters. He starred two.' },
        { d: '2026-06-15', t: 'note',  text: 'Met at the Pine Hollow open house. First-time buyer, renting until October.' } ] },
    { id: 'c4',  first: 'Evelyn',  last: 'Nakamura',  email: 'evelyn.nak@gmail.com',      phone: '(910) 555-0125', title: 'Seller & buyer',   companyId: null,  lifecycle: 'Under contract',   owner: 'o2', source: 'Website form', created: '2026-03-22', lastTouch: '2026-07-01', city: 'Wilmington, NC',
      custom: { 'Budget range': '$550k – $625k (buying)', 'Pre-approved': 'Yes — Coastal Lending', 'Areas of interest': 'Landfall, Ogden', 'Bedrooms needed': '4' },
      timeline: [
        { d: '2026-07-01', t: 'note',    text: 'Her sale and purchase are lined up to close the same week — juggling both files.' },
        { d: '2026-06-08', t: 'meeting', text: 'Accepted an offer on her townhome at $389,000.' },
        { d: '2026-03-22', t: 'note',    text: 'Selling the townhome to upsize — baby on the way.' } ] },
    { id: 'c5',  first: 'Gus',     last: 'Antonopoulos', email: 'gus.anton@saltmarshbuild.com', phone: '(910) 555-0109', title: 'Sales director, Saltmarsh Builders', companyId: 'co3', lifecycle: 'Closed client', owner: 'o2', source: 'Referral', created: '2026-02-12', lastTouch: '2026-06-30', city: 'Leland, NC',
      custom: { 'Budget range': '—', 'Pre-approved': '—', 'Areas of interest': 'Marsh Landing development', 'Bedrooms needed': '—' },
      timeline: [
        { d: '2026-06-30', t: 'meeting', text: 'Phase 2 update: 9 of 14 lots reserved. Model home tours doubled since June.' },
        { d: '2026-02-12', t: 'note',    text: 'Signed exclusive listing agreement for the Marsh Landing phase.' } ] },
    { id: 'c6',  first: 'Priya',   last: 'Raghavan',  email: 'priya.rag@dukehealth.org',  phone: '(910) 555-0173', title: 'Buyer (relocating)', companyId: 'co6', lifecycle: 'Actively looking', owner: 'o3', source: 'Referral',   created: '2026-06-20', lastTouch: '2026-07-04', city: 'Durham, NC',
      custom: { 'Budget range': '$500k – $560k', 'Pre-approved': 'Yes — outside lender', 'Areas of interest': 'Mayfaire, Wrightsville corridor', 'Bedrooms needed': '3' },
      timeline: [
        { d: '2026-07-04', t: 'call', text: 'Flying in July 11–12 — building a 8-home tour weekend for her.' },
        { d: '2026-06-20', t: 'note', text: 'Hospital relocation via Cape Fear Relocation. Starts new role Sept 1.' } ] },
    { id: 'c7',  first: 'Ray',     last: 'Delgado',   email: 'ray.delgado@gmail.com',     phone: '(910) 555-0146', title: 'Seller',           companyId: null,  lifecycle: 'Under contract',   owner: 'o2', source: 'Sign call',    created: '2026-05-02', lastTouch: '2026-07-02', city: 'Carolina Beach, NC',
      custom: { 'Budget range': '—', 'Pre-approved': '—', 'Areas of interest': 'Selling: 88 Pelican Way', 'Bedrooms needed': '—' },
      timeline: [
        { d: '2026-07-02', t: 'email', text: 'Repair addendum signed — sellers crediting $3,500 for the HVAC.' },
        { d: '2026-06-10', t: 'note',  text: 'Beach cottage under contract at $618,000 after 11 days on market.' } ] },
    { id: 'c8',  first: 'Tanya',   last: 'Brooks',    email: 'tanya.brooks@beaconpm.com', phone: '(910) 555-0132', title: 'Portfolio manager, Beacon PM', companyId: 'co5', lifecycle: 'Actively looking', owner: 'o1', source: 'Referral', created: '2026-01-20', lastTouch: '2026-06-27', city: 'Carolina Beach, NC',
      custom: { 'Budget range': '—', 'Pre-approved': '—', 'Areas of interest': 'Investor-owned rentals converting to sales', 'Bedrooms needed': '—' },
      timeline: [
        { d: '2026-06-27', t: 'email', text: 'Two more owners want valuations — sending CMAs next week.' },
        { d: '2026-01-20', t: 'note',  text: 'Partnership: they refer selling landlords, we handle the listings.' } ] },
    { id: 'c9',  first: 'Dylan',   last: 'Frost',     email: 'dylan.frost@gmail.com',     phone: '(910) 555-0198', title: 'Buyer',            companyId: null,  lifecycle: 'New lead',         owner: 'o3', source: 'Instagram',    created: '2026-07-03', lastTouch: '2026-07-03', city: 'Raleigh, NC',
      custom: { 'Budget range': '$250k – $290k', 'Pre-approved': 'No', 'Areas of interest': 'Anywhere near the beach', 'Bedrooms needed': '2' },
      timeline: [
        { d: '2026-07-03', t: 'note', text: 'DM\'d from the condo reel. Wants a weekend place. Needs lender intro first.' } ] },
    { id: 'c10', first: 'Marguerite', last: 'LeBlanc', email: 'mlb1948@aol.com',          phone: '(910) 555-0113', title: 'Seller',           companyId: null,  lifecycle: 'Actively looking', owner: 'o2', source: 'Referral',     created: '2026-06-24', lastTouch: '2026-07-01', city: 'Wilmington, NC',
      custom: { 'Budget range': '—', 'Pre-approved': '—', 'Areas of interest': 'Selling: family home, downsizing', 'Bedrooms needed': '—' },
      timeline: [
        { d: '2026-07-01', t: 'meeting', text: 'Family meeting with her daughter — agreed to list in August after estate cleanout.' },
        { d: '2026-06-24', t: 'note',    text: 'Downsizing after 40 years in the home. Handle with patience and care.' } ] },
    { id: 'c11', first: 'Scott',   last: 'Hensley',   email: 'scott.h@coastallend.com',   phone: '(910) 555-0155', title: 'Loan officer, Coastal Lending', companyId: 'co1', lifecycle: 'Past client', owner: 'o1', source: 'Referral', created: '2025-09-10', lastTouch: '2026-07-02', city: 'Wilmington, NC',
      custom: { 'Budget range': '—', 'Pre-approved': '—', 'Areas of interest': 'Lender partner', 'Bedrooms needed': '—' },
      timeline: [
        { d: '2026-07-02', t: 'call', text: 'Confirmed Pruitt file is clear to close. Also flagged rates dipped this week — good for buyer outreach.' } ] },
    { id: 'c12', first: 'Bree',    last: 'Castellanos', email: 'bree.cast@gmail.com',     phone: '(910) 555-0170', title: 'Buyer',            companyId: null,  lifecycle: 'Actively looking', owner: 'o3', source: 'Zillow',       created: '2026-05-28', lastTouch: '2026-06-29', city: 'Wilmington, NC',
      custom: { 'Budget range': '$350k – $395k', 'Pre-approved': 'Yes — Coastal Lending', 'Areas of interest': 'Monkey Junction, Myrtle Grove', 'Bedrooms needed': '3' },
      timeline: [
        { d: '2026-06-29', t: 'note',  text: 'Lost the Wisteria Ln bid (5 offers). She\'s ready to move fast on the next one.' },
        { d: '2026-06-02', t: 'meeting', text: 'Buyer consult done; wants new-ish construction, low maintenance.' } ] },
    { id: 'c13', first: 'Hank',    last: 'Odom',      email: 'hank.odom@gmail.com',       phone: '(910) 555-0141', title: 'Seller',           companyId: null,  lifecycle: 'Past client',      owner: 'o2', source: 'Sign call',    created: '2025-08-14', lastTouch: '2026-05-20', city: 'Leland, NC',
      custom: { 'Budget range': '—', 'Pre-approved': '—', 'Areas of interest': 'Closed: sold Nov 2025', 'Bedrooms needed': '—' },
      timeline: [
        { d: '2026-05-20', t: 'email', text: 'Sent home-anniversary note. He mentioned his neighbor may sell this fall.' },
        { d: '2025-11-21', t: 'note',  text: 'Closed at $342,000 — smooth file, left us a 5-star review.' } ] },
    { id: 'c14', first: 'Olivia',  last: 'Tran',      email: 'olivia.tran@gmail.com',     phone: '(910) 555-0188', title: 'Buyer',            companyId: null,  lifecycle: 'New lead',         owner: 'o3', source: 'Website form', created: '2026-07-04', lastTouch: '2026-07-04', city: 'Charlotte, NC',
      custom: { 'Budget range': '$600k – $700k', 'Pre-approved': 'Unknown', 'Areas of interest': 'Waterfront or water view', 'Bedrooms needed': '4' },
      timeline: [
        { d: '2026-07-04', t: 'note', text: 'Filled the "waterfront homes" guide form at 7am. Asked about boat slips.' } ] }
  ],

  deals: [
    { id: 'd1',  name: '214 Marsh Fern Ct — Pruitt purchase',        amount: 452000,  stage: 's4', close: '2026-07-24', owner: 'o3', contactId: 'c1',  companyId: null,  created: '2026-04-18', source: 'Zillow' },
    { id: 'd2',  name: '12 Dune Ridge — Mizrahi listing',            amount: 1150000, stage: 's2', close: '2026-09-15', owner: 'o2', contactId: 'c2',  companyId: null,  created: '2026-06-05', source: 'Referral' },
    { id: 'd3',  name: '88 Pelican Way — Delgado sale',              amount: 618000,  stage: 's4', close: '2026-07-31', owner: 'o2', contactId: 'c7',  companyId: null,  created: '2026-05-02', source: 'Sign call' },
    { id: 'd4',  name: 'Nakamura townhome sale — 45 Ibis Ln',        amount: 389000,  stage: 's4', close: '2026-07-22', owner: 'o2', contactId: 'c4',  companyId: null,  created: '2026-03-22', source: 'Website form' },
    { id: 'd5',  name: 'Nakamura purchase — Landfall search',        amount: 598000,  stage: 's3', close: '2026-07-29', owner: 'o3', contactId: 'c4',  companyId: null,  created: '2026-04-02', source: 'Website form' },
    { id: 'd6',  name: 'Whitaker first home — Midtown search',       amount: 325000,  stage: 's2', close: '2026-08-30', owner: 'o3', contactId: 'c3',  companyId: null,  created: '2026-06-15', source: 'Open house' },
    { id: 'd7',  name: 'Raghavan relocation purchase',               amount: 540000,  stage: 's2', close: '2026-08-20', owner: 'o3', contactId: 'c6',  companyId: 'co6', created: '2026-06-20', source: 'Referral' },
    { id: 'd8',  name: 'Marsh Landing lot 7 — new construction',     amount: 486000,  stage: 's5', close: '2026-06-12', owner: 'o2', contactId: 'c5',  companyId: 'co3', created: '2026-03-01', source: 'Referral' },
    { id: 'd9',  name: 'Marsh Landing lot 11 — new construction',    amount: 512000,  stage: 's4', close: '2026-08-08', owner: 'o2', contactId: 'c5',  companyId: 'co3', created: '2026-04-15', source: 'Referral' },
    { id: 'd10', name: 'Castellanos purchase — round two',           amount: 372000,  stage: 's2', close: '2026-08-15', owner: 'o3', contactId: 'c12', companyId: null,  created: '2026-05-28', source: 'Zillow' },
    { id: 'd11', name: 'LeBlanc family home — August listing',       amount: 435000,  stage: 's1', close: '2026-09-30', owner: 'o2', contactId: 'c10', companyId: null,  created: '2026-06-24', source: 'Referral' },
    { id: 'd12', name: 'Frost beach condo search',                   amount: 275000,  stage: 's1', close: '2026-09-15', owner: 'o3', contactId: 'c9',  companyId: null,  created: '2026-07-03', source: 'Instagram' },
    { id: 'd13', name: '31 Wisteria Ln — Castellanos offer',         amount: 368000,  stage: 's6', close: '2026-06-27', owner: 'o3', contactId: 'c12', companyId: null,  created: '2026-06-20', source: 'Zillow' },
    { id: 'd14', name: 'Tran waterfront search',                     amount: 650000,  stage: 's1', close: '2026-10-15', owner: 'o3', contactId: 'c14', companyId: null,  created: '2026-07-04', source: 'Website form' }
  ],

  tickets: [
    { id: 't1', subject: 'HVAC repair credit paperwork',           status: 'Closed',            priority: 'High',   contactId: 'c7',  owner: 'o4', created: '2026-06-30', category: 'Under contract',
      desc: 'Inspection flagged the HVAC at end-of-life. Negotiated a $3,500 credit; addendum signed by both sides July 2.',
      thread: [ { from: 'them', at: '2026-06-30 09:20', text: 'The buyers want the whole HVAC replaced — that seems like a lot for a 12-year-old unit?' },
                { from: 'us',   at: '2026-06-30 10:05', text: 'Agreed. We countered with a $3,500 credit so they choose their own contractor — they usually take it.' } ] },
    { id: 't2', subject: 'Appraisal timeline worry',               status: 'Closed',            priority: 'High',   contactId: 'c1',  owner: 'o4', created: '2026-06-26', category: 'Financing',
      desc: 'Nathan worried the appraisal wouldn\'t land before the financing deadline. It came in July 3, at value.',
      thread: [ { from: 'them', at: '2026-06-26 13:11', text: 'Lender says the appraiser is booked out — are we going to miss the deadline?' },
                { from: 'us',   at: '2026-06-26 13:40', text: 'We\'ve asked Coastal to rush it and alerted the listing side. Worst case we extend 3 days — but we won\'t need to.' } ] },
    { id: 't3', subject: 'Staging quote for Dune Ridge',           status: 'Waiting on us',     priority: 'Medium', contactId: 'c2',  owner: 'o2', created: '2026-07-03', category: 'Listing prep',
      desc: 'Carol wants staging before photos. Dockside is quoting the full main level plus primary suite this week.',
      thread: [ { from: 'them', at: '2026-07-03 15:42', text: 'Let\'s do staging — how much for the main floor and primary bedroom?' },
                { from: 'us',   at: '2026-07-03 16:10', text: 'Dockside is measuring Monday; quote should be with you Wednesday. Usually ~$3k for 60 days at this size.' } ] },
    { id: 't4', subject: 'Flood insurance quote taking too long',  status: 'Waiting on us',     priority: 'High',   contactId: 'c4',  owner: 'o4', created: '2026-07-01', category: 'Financing',
      desc: 'Evelyn\'s lender needs a flood policy bound before closing on the purchase. Pelican\'s first quote looked high — getting a second.',
      thread: [ { from: 'them', at: '2026-07-01 11:05', text: 'The flood quote came in at $4,100/year?! That can\'t be right for that elevation.' },
                { from: 'us',   at: '2026-07-01 11:30', text: 'That\'s using the old flood map. Pelican is re-running it with the elevation certificate — expect roughly half that.' } ] },
    { id: 't5', subject: 'Change showing window for tenants',      status: 'Waiting on client', priority: 'Low',    contactId: 'c8',  owner: 'o2', created: '2026-06-25', category: 'Showings',
      desc: 'Tenant-occupied rental going to market. Need Tanya to confirm the tenants\' allowed showing windows before we schedule.',
      thread: [ { from: 'them', at: '2026-06-25 10:15', text: 'The tenants asked to limit showings to weekends only — is that workable?' },
                { from: 'us',   at: '2026-06-25 10:45', text: 'Weekends-only slows things down but works. Can you confirm hours so we can set the showing rules?' } ] },
    { id: 't6', subject: 'Wants sold-price data for her street',   status: 'New',               priority: 'Low',    contactId: 'c10', owner: 'o2', created: '2026-07-04', category: 'Valuation',
      desc: 'Marguerite\'s daughter asked for recent sold comps on the street before they commit to a list price in August.',
      thread: [ { from: 'them', at: '2026-07-04 09:12', text: 'Before we sign anything, could you show us what nearby houses actually sold for this year?' } ] },
    { id: 't7', subject: 'Lockbox code not working at lot 11',     status: 'Closed',            priority: 'Medium', contactId: 'c5',  owner: 'o4', created: '2026-06-28', category: 'Showings',
      desc: 'Showing agent couldn\'t open the lockbox at Marsh Landing lot 11. Battery had died; swapped same afternoon.',
      thread: [ { from: 'them', at: '2026-06-28 14:02', text: 'An agent just called — the lockbox at lot 11 won\'t open.' },
                { from: 'us',   at: '2026-06-28 14:20', text: 'Miguel is heading over with a replacement now. Fixed by 3pm, and we\'ve apologised to the showing agent.' } ] },
    { id: 't8', subject: 'Closing-date conflict with movers',      status: 'Waiting on us',     priority: 'Medium', contactId: 'c1',  owner: 'o4', created: '2026-07-02', category: 'Under contract',
      desc: 'Nathan\'s movers are only available July 23 but closing is the 24th. Asking the sellers about pre-closing access or early key release.',
      thread: [ { from: 'them', at: '2026-07-02 17:25', text: 'Movers can only do the 23rd. Any chance we can get in a day early?' },
                { from: 'us',   at: '2026-07-02 17:50', text: 'We\'ve asked the listing agent about a pre-occupancy agreement for the garage at minimum. Answer by Monday.' } ] }
  ],

  tasks: [
    { id: 'k1', title: 'Chase Dockside staging quote for Dune Ridge',    due: '2026-07-08', type: 'To-do', owner: 'o2', related: { kind: 'ticket', id: 't3' },  done: false },
    { id: 'k2', title: 'Build Raghavan July 11–12 tour route (8 homes)', due: '2026-07-08', type: 'To-do', owner: 'o3', related: { kind: 'deal', id: 'd7' },    done: false },
    { id: 'k3', title: 'Follow up: pre-occupancy answer for Pruitt',     due: '2026-07-07', type: 'Call',  owner: 'o4', related: { kind: 'ticket', id: 't8' },  done: false },
    { id: 'k4', title: 'Pull sold comps for LeBlanc\'s street',          due: '2026-07-09', type: 'To-do', owner: 'o2', related: { kind: 'ticket', id: 't6' },  done: false },
    { id: 'k5', title: 'Intro Dylan Frost to Scott at Coastal Lending',  due: '2026-07-07', type: 'Email', owner: 'o3', related: { kind: 'contact', id: 'c9' },  done: false },
    { id: 'k6', title: 'Confirm re-run flood quote for Nakamura',        due: '2026-07-08', type: 'Call',  owner: 'o4', related: { kind: 'ticket', id: 't4' },  done: false },
    { id: 'k7', title: 'Send CMA to Carol Mizrahi',                      due: '2026-07-04', type: 'Email', owner: 'o2', related: { kind: 'deal', id: 'd2' },    done: true },
    { id: 'k8', title: 'Order sign + photos for Pelican Way',            due: '2026-05-06', type: 'To-do', owner: 'o4', related: { kind: 'deal', id: 'd3' },    done: true },
    { id: 'k9', title: 'Send Tran the waterfront + boat-slip shortlist', due: '2026-07-06', type: 'Email', owner: 'o3', related: { kind: 'contact', id: 'c14' }, done: false }
  ],

  meetings: [
    { id: 'm1', title: 'Mizrahi — list-price decision meeting',     date: '2026-07-09', time: '10:00', contactId: 'c2',  owner: 'o2', kind: 'Listing appointment' },
    { id: 'm2', title: 'Raghavan — tour day 1 (5 homes)',           date: '2026-07-11', time: '09:00', contactId: 'c6',  owner: 'o3', kind: 'Showing' },
    { id: 'm3', title: 'Raghavan — tour day 2 (3 homes)',           date: '2026-07-12', time: '10:00', contactId: 'c6',  owner: 'o3', kind: 'Showing' },
    { id: 'm4', title: 'Whitaker — second look at starred homes',   date: '2026-07-13', time: '17:30', contactId: 'c3',  owner: 'o3', kind: 'Showing' },
    { id: 'm5', title: 'Nakamura — closing (sale side), Anchor Title', date: '2026-07-22', time: '13:00', contactId: 'c4', owner: 'o4', kind: 'Closing' },
    { id: 'm6', title: 'Pruitt — final walkthrough + closing',      date: '2026-07-24', time: '09:00', contactId: 'c1',  owner: 'o3', kind: 'Closing' }
  ],

  campaigns: [
    { id: 'g1', name: 'July market update — Wilmington area',   type: 'Newsletter', status: 'Sent',      date: '2026-07-01', audience: 'All contacts',            sent: 1120, opened: 498, clicked: 132, replied: 21,
      subject: 'Wilmington market, July: prices steady, inventory up 12%', preview: 'What that means if you\'re buying, selling, or just curious about your home\'s value.' },
    { id: 'g2', name: 'New listing alerts (saved searches)',    type: 'Automated',  status: 'Running',   date: '2026-01-05', audience: 'Active buyers',            sent: 2840, opened: 1930, clicked: 1105, replied: 84,
      subject: 'New in Midtown: 3BR ranch under $330k', preview: 'Matches your saved search. 14 photos inside — this price band moves fast.' },
    { id: 'g3', name: 'Home anniversary — past clients',        type: 'Automated',  status: 'Running',   date: '2025-10-01', audience: 'Past clients',             sent: 96,   opened: 61,  clicked: 12,  replied: 9,
      subject: 'One year in your home! 🏡', preview: 'Happy home-iversary — plus a quick look at what it\'s worth today.' },
    { id: 'g4', name: 'Open house invites — Marsh Landing',     type: 'One-off',    status: 'Sent',      date: '2026-06-19', audience: 'Buyers $400k–$600k',       sent: 310,  opened: 172, clicked: 64,  replied: 11,
      subject: 'Sat & Sun: tour the new Marsh Landing model home', preview: 'New construction from the high $400s. Builder on site, coffee\'s on us.' },
    { id: 'g5', name: 'Fall sellers guide',                     type: 'One-off',    status: 'Scheduled', date: '2026-08-15', audience: 'Homeowner list',           sent: 0,    opened: 0,   clicked: 0,   replied: 0,
      subject: 'Thinking of selling this fall? Read this first', preview: 'Timing, pricing and the 5 cheap fixes that actually pay off.' }
  ],

  forms: [
    { id: 'f1', name: 'What\'s my home worth?',       page: '/home-value',   views: 3140, submissions: 187, fields: ['Address', 'Name', 'Email', 'Phone', 'When are you thinking of selling?'], recent: ['c2', 'c10'] },
    { id: 'f2', name: 'Waterfront homes guide',       page: '/waterfront',   views: 1820, submissions: 94,  fields: ['Name', 'Email', 'Budget range', 'Boat slip needed?'],                     recent: ['c14'] },
    { id: 'f3', name: 'Schedule a showing',           page: '/listings',     views: 5230, submissions: 241, fields: ['Name', 'Email', 'Phone', 'Property address', 'Preferred times'],          recent: ['c3', 'c12', 'c6'] },
    { id: 'f4', name: 'First-time buyer workshop',    page: '/workshop',     views: 890,  submissions: 52,  fields: ['Name', 'Email', 'Are you pre-approved?', 'Target move date'],             recent: ['c3', 'c9'] }
  ],

  workflows: [
    { id: 'w1', name: 'New lead speed-to-contact',        status: 'On', trigger: 'Any lead form is submitted', goal: 'First call within 15 minutes', enrolled: 574, active: 12, completed: 519,
      steps: [ { k: 'trigger', text: 'A lead form is submitted (any source)' },
               { k: 'update',  text: 'Assign an agent based on price band and area' },
               { k: 'task',    text: 'Create a "call within 15 minutes" task with the lead\'s answers attached' },
               { k: 'email',   text: 'Instant reply: "We got your message — expect a call shortly"' },
               { k: 'branch',  text: 'No call logged in 1 hour? Escalate to the broker' } ] },
    { id: 'w2', name: 'Saved-search listing alerts',      status: 'On', trigger: 'A new listing matches a buyer\'s saved search', goal: 'Showings booked from alerts', enrolled: 2840, active: 214, completed: 2490,
      steps: [ { k: 'trigger', text: 'New or price-dropped listing matches a saved search' },
               { k: 'email',   text: 'Send the listing card with photos and a "book a showing" button' },
               { k: 'branch',  text: 'Clicked but no showing in 2 days? Nudge the buyer\'s agent to follow up' } ] },
    { id: 'w3', name: 'Under-contract milestone tracker', status: 'On', trigger: 'A transaction moves to Under contract', goal: 'Zero missed deadlines', enrolled: 87, active: 5, completed: 80,
      steps: [ { k: 'trigger', text: 'Transaction stage becomes Under contract' },
               { k: 'task',    text: 'Create the deadline checklist: inspection, appraisal, financing, walkthrough' },
               { k: 'email',   text: 'Send the client a "what happens next" timeline' },
               { k: 'delay',   text: 'Wait until 3 days before each deadline' },
               { k: 'update',  text: 'Remind the transaction coordinator ahead of every deadline' } ] },
    { id: 'w4', name: 'Past-client keep-in-touch',        status: 'On', trigger: 'A transaction closes', goal: 'Referrals and repeat business', enrolled: 96, active: 41, completed: 48,
      steps: [ { k: 'trigger', text: 'Transaction marked Closed' },
               { k: 'delay',   text: 'Wait 30 days' },
               { k: 'email',   text: 'Check-in: "How\'s the new place?" + review request' },
               { k: 'delay',   text: 'Wait until the 1-year anniversary' },
               { k: 'email',   text: 'Home anniversary note with an updated value estimate' } ] },
    { id: 'w5', name: 'Open-house follow-up',             status: 'Off', trigger: 'Someone signs in at an open house', goal: 'A buyer consult booked', enrolled: 138, active: 0, completed: 121,
      steps: [ { k: 'trigger', text: 'Open-house sign-in sheet synced' },
               { k: 'email',   text: 'Same evening: photos of the home + 3 similar listings' },
               { k: 'delay',   text: 'Wait 2 days' },
               { k: 'task',    text: 'Agent calls to offer a private tour or buyer consult' } ] }
  ],

  conversations: [
    { id: 'v1', channel: 'Email',    contactId: 'c14', subject: 'Boat slip questions',           unread: true,  at: '2026-07-04 07:12',
      msgs: [ { from: 'them', at: '2026-07-04 07:12', text: 'Loved the waterfront guide. Do any of the Intracoastal listings come with deeded boat slips? That\'s a must for us.' } ] },
    { id: 'v2', channel: 'WhatsApp', contactId: 'c6',  subject: 'Tour weekend logistics',        unread: true,  at: '2026-07-04 18:33',
      msgs: [ { from: 'us',   at: '2026-07-04 18:30', text: 'Hi Priya! Tour plan: 5 homes Saturday starting 9am, 3 Sunday. I\'ll send the route map tonight.' },
              { from: 'them', at: '2026-07-04 18:33', text: 'Perfect. Can we add the Mayfaire townhouse that hit the market yesterday?' } ] },
    { id: 'v3', channel: 'Email',    contactId: 'c2',  subject: 'Re: CMA and list price',        unread: false, at: '2026-07-04 14:20',
      msgs: [ { from: 'them', at: '2026-07-04 14:20', text: 'Read the CMA twice. $1.15M feels right, though my neighbor swears we should ask $1.25M. Convince me Thursday?' },
              { from: 'us',   at: '2026-07-04 15:01', text: 'Ha — neighbors always say that! I\'ll bring the data on what happens to overpriced beach listings. See you Thursday at 10.' } ] },
    { id: 'v4', channel: 'Chat',     contactId: 'c3',  subject: 'Starred listings',              unread: false, at: '2026-07-02 19:44',
      msgs: [ { from: 'them', at: '2026-07-02 19:44', text: 'The Camellia Dr one looks great. Is the roof really from 2024?' },
              { from: 'us',   at: '2026-07-02 20:02', text: 'Yes — permit on file confirms full replacement March 2024. Want to see it Monday evening?' },
              { from: 'them', at: '2026-07-02 20:05', text: 'Monday works. 5:30 if possible!' } ] },
    { id: 'v5', channel: 'Email',    contactId: 'c1',  subject: 'Moving day update',             unread: false, at: '2026-07-02 17:25',
      msgs: [ { from: 'them', at: '2026-07-02 17:25', text: 'Movers confirmed for the 23rd only. Fingers crossed on the early access — otherwise everything sits in the truck overnight.' },
              { from: 'us',   at: '2026-07-02 17:50', text: 'We\'ve requested a pre-occupancy agreement. Sellers are motivated — I\'d expect a yes by Monday.' } ] },
    { id: 'v6', channel: 'Chat',     contactId: 'c9',  subject: 'Getting started',               unread: false, at: '2026-07-03 12:15',
      msgs: [ { from: 'them', at: '2026-07-03 12:15', text: 'Saw the condo reel — what would payments look like on something around $270k?' },
              { from: 'us',   at: '2026-07-03 12:22', text: 'Rough math: ~$1,850/mo with 10% down at current rates, plus HOA. Want an intro to our lender for exact numbers?' },
              { from: 'them', at: '2026-07-03 12:24', text: 'Yes please — weekends work best for calls.' } ] }
  ],

  customProps: [
    { object: 'Contact', label: 'Budget range',        internal: 'budget_range',       type: 'Dropdown',    options: 'Under $300k, $300–450k, $450–600k, $600k–1M, $1M+',   used: 'Matching buyers to listings' },
    { object: 'Contact', label: 'Pre-approved',        internal: 'preapproval_status', type: 'Dropdown',    options: 'Yes, In progress, No, Unknown',                        used: 'Prioritising ready buyers' },
    { object: 'Contact', label: 'Areas of interest',   internal: 'areas_of_interest',  type: 'Multi-select', options: 'Downtown, Midtown, Ogden, Landfall, beaches…',        used: 'Saved-search alerts' },
    { object: 'Contact', label: 'Bedrooms needed',     internal: 'bedrooms_needed',    type: 'Number',      options: '—',                                                    used: 'Listing match filters' },
    { object: 'Contact', label: 'Buyer or seller',     internal: 'client_type',        type: 'Dropdown',    options: 'Buyer, Seller, Both, Investor, Partner',               used: 'Pipeline reporting' },
    { object: 'Deal',    label: 'Property address',    internal: 'property_address',   type: 'Single line', options: '—',                                                    used: 'Everything — it\'s the deal identity' },
    { object: 'Deal',    label: 'Commission rate',     internal: 'commission_rate',    type: 'Percent',     options: '—',                                                    used: 'Revenue forecasting' },
    { object: 'Deal',    label: 'Key deadline dates',  internal: 'deadline_dates',     type: 'Date list',   options: 'Inspection, appraisal, financing, closing',            used: 'Milestone workflow' },
    { object: 'Company', label: 'Partner type',        internal: 'partner_type',       type: 'Dropdown',    options: 'Lender, Title, Inspector, Builder, Stager, Insurance', used: 'Vendor directory' },
    { object: 'Ticket',  label: 'Transaction file',    internal: 'transaction_file',   type: 'Single line', options: '—',                                                    used: 'Linking issues to the right closing' }
  ],

  integrations: [
    { name: 'Zillow Premier Agent', cat: 'Lead sources',  desc: 'Zillow leads drop straight into the pipeline with source attached.',  connected: true },
    { name: 'ShowingTime',          cat: 'Scheduling',    desc: 'Showings sync both ways — confirmations, reschedules, feedback.',      connected: true },
    { name: 'DocuSign',             cat: 'Documents',     desc: 'Offers, addenda and listing agreements signed from the deal record.',  connected: true },
    { name: 'Google Calendar',      cat: 'Scheduling',    desc: 'Tours, listing appointments and closings on every agent\'s calendar.', connected: true },
    { name: 'MLS sync (nightly)',   cat: 'Listings data', desc: 'Listing statuses and price changes refresh every night.',              connected: true },
    { name: 'Twilio SMS',           cat: 'Messaging',     desc: 'Showing confirmations and new-listing texts to opted-in buyers.',      connected: true },
    { name: 'Instagram Lead Ads',   cat: 'Lead sources',  desc: 'DM and reel leads flow in with the ad they came from.',                connected: true },
    { name: 'QuickBooks',           cat: 'Accounting',    desc: 'Closed transactions create commission records for bookkeeping.',       connected: false },
    { name: 'Mailchimp import',     cat: 'Migration',     desc: 'One-time import of the old newsletter list — done last September.',    connected: false },
    { name: 'Slack',                cat: 'Notifications', desc: 'New leads and under-contract milestones ping the team channel.',       connected: true }
  ],

  monthly: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    revenue:     [1240000, 980000, 1620000, 2140000, 1880000, 2460000],
    newContacts: [31, 28, 42, 51, 47, 58],
    won:         [3, 2, 4, 5, 4, 6],
    ticketsClosed: [9, 7, 12, 11, 14, 13],
    visitors:    [5400, 5100, 7200, 8800, 8100, 9600]
  },
  sourceBreakdown: [
    { label: 'Zillow',       value: 27 },
    { label: 'Website form', value: 22 },
    { label: 'Referral',     value: 21 },
    { label: 'Open house',   value: 12 },
    { label: 'Sign call',    value: 10 },
    { label: 'Instagram',    value: 8 }
  ],

  reports: [
    { id: 'r1', name: 'Closed volume by month',        desc: 'Total sale price of closed transactions each month.',           type: 'line' },
    { id: 'r2', name: 'New leads by month',            desc: 'Buyers and sellers entering the CRM each month.',               type: 'bar' },
    { id: 'r3', name: 'Where leads come from',         desc: 'Share of contacts by original source.',                         type: 'donut' },
    { id: 'r4', name: 'Lead-to-closing funnel',        desc: 'How leads progress from first contact to a closed transaction.', type: 'funnel' },
    { id: 'r5', name: 'Pipeline by agent',             desc: 'Open transaction value carried by each agent.',                 type: 'ownerbar' },
    { id: 'r6', name: 'Issue load by category',        desc: 'Where transaction problems come up most often.',                type: 'catbar' }
  ],

  /* listing services — powers the proposal (quote) builder */
  catalog: [
    { id: 'p1', name: 'Listing marketing package',            price: 1800, unit: 'per listing' },
    { id: 'p2', name: 'Professional photography + floor plan', price: 450, unit: 'per shoot' },
    { id: 'p3', name: 'Drone & twilight shoot',               price: 350,  unit: 'per shoot' },
    { id: 'p4', name: 'Home staging — 60 days',               price: 3000, unit: 'per listing' },
    { id: 'p5', name: 'Premium video tour',                   price: 900,  unit: 'per listing' },
    { id: 'p6', name: 'Open-house programme',                 price: 600,  unit: 'per weekend' },
    { id: 'p7', name: 'Deep clean & punch-list crew',         price: 750,  unit: 'per visit' },
    { id: 'p8', name: 'Pre-listing inspection',               price: 425,  unit: 'per listing' }
  ],
  quotes: [
    { id: 'q1', name: 'Dune Ridge — listing proposal', dealId: 'd2', contactId: 'c2', status: 'Sent',
      created: '2026-07-04', expires: '2026-07-20', discount: 0,
      note: 'Beach-house launch package: staged, filmed, and open two consecutive weekends.',
      items: [ { p: 'p4', qty: 1 }, { p: 'p2', qty: 1 }, { p: 'p3', qty: 1 }, { p: 'p5', qty: 1 }, { p: 'p1', qty: 1 }, { p: 'p6', qty: 1 } ] },
    { id: 'q2', name: 'LeBlanc family home — gentle-start package', dealId: 'd11', contactId: 'c10', status: 'Draft',
      created: '2026-07-02', expires: '2026-08-31', discount: 0,
      note: 'Paced for an August listing after the estate cleanout. No pressure, no rush.',
      items: [ { p: 'p1', qty: 1 }, { p: 'p2', qty: 1 }, { p: 'p7', qty: 1 } ] },
    { id: 'q3', name: 'Marsh Landing — model home programme', dealId: 'd9', contactId: 'c5', status: 'Accepted',
      created: '2026-04-20', expires: '2026-05-20', accepted: '2026-04-28', discount: 0,
      note: 'Phase 2 launch: doubled marketing, four open-house weekends, drone site film.',
      items: [ { p: 'p1', qty: 2 }, { p: 'p5', qty: 1 }, { p: 'p6', qty: 4 }, { p: 'p3', qty: 1 } ] }
  ],

  /* email templates — the brokerage's voice */
  templates: [
    { id: 'e1', kind: 'Welcome',       name: 'New buyer welcome',            uses: 574, edited: '2026-06-15',
      subject: 'Welcome aboard, {{first name}} — here’s how the search works',
      body: 'Hi {{first name}},\n\nGreat to have you with Harborline. From here: you’ll get listing alerts the moment matches hit the market, and {{owner}} is your person for tours — evenings and weekends included.\n\nOne ask: tell us when a listing feels wrong, not just when it feels right. It sharpens the search fast.\n\nTalk soon,\n{{owner}}' },
    { id: 'e2', kind: 'Alert',         name: 'New listing match',            uses: 2840, edited: '2026-07-01',
      subject: 'New in your search area, {{first name}}',
      body: 'Hi {{first name}},\n\nA new listing just matched your saved search — photos and details below. Homes in this band have been moving in under two weeks.\n\nWant to see it? Reply with a day and time; we’ll handle the rest.\n\n{{owner}}\nHarborline Realty' },
    { id: 'e3', kind: 'Follow-up',     name: 'After the tour',               uses: 310, edited: '2026-05-22',
      subject: 'Thoughts on today’s homes, {{first name}}?',
      body: 'Hi {{first name}},\n\nThanks for touring with us today. While it’s fresh: which one would you be sad to lose?\n\nIf the answer is “none of them”, that’s useful too — it tells us exactly what to cut from the next round.\n\n{{owner}}' },
    { id: 'e4', kind: 'Milestone',     name: 'Under contract — what happens next', uses: 87, edited: '2026-06-10',
      subject: 'You’re under contract, {{first name}} 🎉 — the road from here',
      body: 'Hi {{first name}},\n\nCongratulations — offer accepted! Between now and closing there are four checkpoints: inspection, appraisal, financing, final walkthrough.\n\nWe track every deadline and nudge you only when something actually needs you. Your timeline is attached.\n\n{{owner}}\nHarborline Realty' },
    { id: 'e5', kind: 'Anniversary',   name: 'Home anniversary note',        uses: 96, edited: '2026-05-01',
      subject: 'One year at home, {{first name}} 🏡',
      body: 'Hi {{first name}},\n\nHappy home-iversary! A year already.\n\nAttached is a quick, no-strings update on what your home is worth today — neighbours’ sales included. And if anyone you know is thinking of moving, you know where we are.\n\nWarmly,\n{{owner}}' }
  ]
};
