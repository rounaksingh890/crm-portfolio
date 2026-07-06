/* BrightCare Health — Medical edition sample data.
   Every number shown in the app is calculated from these records, so all
   screens always agree with each other. Demo data only — no real people. */
window.HSV_DATA = window.HSV_DATA || {};
window.HSV_DATA.medical = {
  key: 'medical',
  brand: 'BrightCare Health',
  product: 'Medical CRM',
  industryLabel: 'Healthcare & clinics',
  tagline: 'Patient enquiries, referrals and care plans for a multi-location clinic group.',
  accent: '#00a4bd',
  currency: '$',
  terms: { deal: 'Care plan', deals: 'Care plans', pipelineName: 'Patient journey' },

  owners: [
    { id: 'o1', name: 'Dr. Anaya Rao',    role: 'Practice director',   color: '#00a4bd' },
    { id: 'o2', name: 'Marcus Webb',      role: 'Patient coordinator', color: '#f5a623' },
    { id: 'o3', name: 'Sofia Delgado',    role: 'Front desk lead',     color: '#8067dc' },
    { id: 'o4', name: 'Priya Nair',       role: 'Referral manager',    color: '#00bda5' }
  ],

  stages: [
    { id: 's1', label: 'New enquiry',        prob: 10 },
    { id: 's2', label: 'Consult booked',     prob: 30 },
    { id: 's3', label: 'Consult completed',  prob: 55 },
    { id: 's4', label: 'Plan proposed',      prob: 75 },
    { id: 's5', label: 'Accepted',           prob: 100 },
    { id: 's6', label: 'Not a fit',          prob: 0 }
  ],
  ticketStatuses: ['New', 'Waiting on us', 'Waiting on patient', 'Closed'],
  lifecycles: ['New lead', 'Contacted', 'Consult scheduled', 'Active patient', 'Past patient'],
  sources: ['Website form', 'Doctor referral', 'Google Ads', 'Walk-in', 'Insurance partner'],

  companies: [
    { id: 'co1', name: 'Lakeside Family Practice', domain: 'lakesidefp.com',   industry: 'Primary care referrer', size: '11-50',  city: 'Austin, TX',      owner: 'o4', created: '2026-01-12', note: 'Sends us 4–6 specialist referrals a month. Dr. Okafor is the main contact.' },
    { id: 'co2', name: 'Hill Country Orthopedics', domain: 'hcortho.com',      industry: 'Specialist partner',    size: '51-200', city: 'Austin, TX',      owner: 'o4', created: '2026-02-03', note: 'Two-way referral agreement signed in February.' },
    { id: 'co3', name: 'BlueRiver Insurance',      domain: 'blueriver.com',    industry: 'Insurance',             size: '500+',   city: 'Dallas, TX',      owner: 'o1', created: '2025-11-20', note: 'In-network since November. Claims contact: partners desk.' },
    { id: 'co4', name: 'Cedar Park ISD',           domain: 'cedarparkisd.org', industry: 'Employer group',        size: '500+',   city: 'Cedar Park, TX',  owner: 'o2', created: '2026-03-15', note: 'School district staff wellness programme — annual screenings.' },
    { id: 'co5', name: 'Verde Yoga Studios',       domain: 'verdeyoga.com',    industry: 'Wellness partner',      size: '1-10',   city: 'Austin, TX',      owner: 'o3', created: '2026-04-02', note: 'Cross-promotes our physio packages to members.' },
    { id: 'co6', name: 'TravisTech Employees',     domain: 'travistech.io',    industry: 'Employer group',        size: '201-500',city: 'Austin, TX',      owner: 'o2', created: '2026-05-11', note: 'Corporate health-check contract under discussion.' },
    { id: 'co7', name: 'Sunrise Senior Living',    domain: 'sunrisesl.com',    industry: 'Care facility',         size: '51-200', city: 'Round Rock, TX',  owner: 'o4', created: '2026-02-27', note: 'On-site visit programme for residents, quarterly billing.' },
    { id: 'co8', name: 'Mueller Pharmacy',         domain: 'muellerrx.com',    industry: 'Pharmacy partner',      size: '1-10',   city: 'Austin, TX',      owner: 'o3', created: '2026-06-01', note: 'Shares our flu-clinic flyers at the counter each autumn.' }
  ],

  contacts: [
    { id: 'c1',  first: 'Grace',  last: 'Holloway',  email: 'grace.h@gmail.com',        phone: '(512) 555-0134', title: 'Patient',                    companyId: null,  lifecycle: 'Active patient',    owner: 'o2', source: 'Website form',      created: '2026-03-04', lastTouch: '2026-07-01', city: 'Austin, TX',
      custom: { 'Insurance provider': 'BlueRiver PPO', 'Preferred clinic': 'Downtown', 'Referring doctor': '—', 'Next appointment': '2026-07-14' },
      timeline: [
        { d: '2026-07-01', t: 'call',    text: 'Confirmed physio follow-up for 14 July, prefers mornings.' },
        { d: '2026-06-18', t: 'meeting', text: 'Six-week physio review — knee mobility clearly improving.' },
        { d: '2026-05-02', t: 'email',   text: 'Sent home-exercise plan PDF and parking instructions.' },
        { d: '2026-03-04', t: 'note',    text: 'Came in via the knee-pain landing page. Booked consult same day.' } ] },
    { id: 'c2',  first: 'Raymond', last: 'Ortiz',    email: 'r.ortiz@outlook.com',      phone: '(512) 555-0187', title: 'Patient',                    companyId: null,  lifecycle: 'Consult scheduled', owner: 'o3', source: 'Google Ads',        created: '2026-06-21', lastTouch: '2026-07-03', city: 'Round Rock, TX',
      custom: { 'Insurance provider': 'Self-pay', 'Preferred clinic': 'Round Rock', 'Referring doctor': '—', 'Next appointment': '2026-07-08' },
      timeline: [
        { d: '2026-07-03', t: 'email', text: 'Sent intake forms and what-to-bring checklist for Tuesday.' },
        { d: '2026-06-21', t: 'note',  text: 'Clicked the back-pain ad, filled the booking form at 9:40pm.' } ] },
    { id: 'c3',  first: 'Dr. Chidi', last: 'Okafor', email: 'c.okafor@lakesidefp.com',  phone: '(512) 555-0102', title: 'GP, Lakeside Family Practice', companyId: 'co1', lifecycle: 'Active patient',   owner: 'o4', source: 'Doctor referral',   created: '2026-01-12', lastTouch: '2026-06-30', city: 'Austin, TX',
      custom: { 'Insurance provider': '—', 'Preferred clinic': '—', 'Referring doctor': 'Is a referrer', 'Next appointment': '—' },
      timeline: [
        { d: '2026-06-30', t: 'email',   text: 'Sent June referral summary — 5 patients referred, 4 seen.' },
        { d: '2026-04-15', t: 'meeting', text: 'Quarterly lunch. Wants faster discharge letters back to his team.' },
        { d: '2026-01-12', t: 'note',    text: 'Our most consistent referring GP. Priya owns this relationship.' } ] },
    { id: 'c4',  first: 'Meredith', last: 'Chan',    email: 'meredith.chan@gmail.com',  phone: '(512) 555-0119', title: 'Patient',                    companyId: null,  lifecycle: 'New lead',          owner: 'o2', source: 'Website form',      created: '2026-07-02', lastTouch: '2026-07-02', city: 'Austin, TX',
      custom: { 'Insurance provider': 'Unknown', 'Preferred clinic': 'Downtown', 'Referring doctor': '—', 'Next appointment': 'Not booked' },
      timeline: [
        { d: '2026-07-02', t: 'note', text: 'Asked about sports-injury assessments for her teenage son.' } ] },
    { id: 'c5',  first: 'Tom',    last: 'Beckett',   email: 'tom.beckett@travistech.io',phone: '(512) 555-0166', title: 'HR Director, TravisTech',    companyId: 'co6', lifecycle: 'Contacted',         owner: 'o2', source: 'Insurance partner', created: '2026-05-11', lastTouch: '2026-06-27', city: 'Austin, TX',
      custom: { 'Insurance provider': 'BlueRiver Corporate', 'Preferred clinic': '—', 'Referring doctor': '—', 'Next appointment': '—' },
      timeline: [
        { d: '2026-06-27', t: 'call',  text: 'Walked through the 240-employee health-check proposal. Board reviews in July.' },
        { d: '2026-05-11', t: 'email', text: 'Introduced by BlueRiver partners desk. Sent corporate brochure.' } ] },
    { id: 'c6',  first: 'Luciana', last: 'Ferreira', email: 'luci.ferreira@yahoo.com',  phone: '(512) 555-0143', title: 'Patient',                    companyId: null,  lifecycle: 'Active patient',    owner: 'o3', source: 'Walk-in',           created: '2025-12-08', lastTouch: '2026-06-24', city: 'Austin, TX',
      custom: { 'Insurance provider': 'BlueRiver HMO', 'Preferred clinic': 'Downtown', 'Referring doctor': '—', 'Next appointment': '2026-08-03' },
      timeline: [
        { d: '2026-06-24', t: 'meeting', text: 'Annual check-up done. Bloods normal, booked next year.' },
        { d: '2026-02-14', t: 'email',   text: 'Opted in to the monthly wellness newsletter.' } ] },
    { id: 'c7',  first: 'Harold', last: 'Whitfield', email: 'h.whitfield@sunrisesl.com',phone: '(512) 555-0128', title: 'Director, Sunrise Senior Living', companyId: 'co7', lifecycle: 'Active patient', owner: 'o4', source: 'Doctor referral', created: '2026-02-27', lastTouch: '2026-07-04', city: 'Round Rock, TX',
      custom: { 'Insurance provider': '—', 'Preferred clinic': 'Round Rock', 'Referring doctor': '—', 'Next appointment': '—' },
      timeline: [
        { d: '2026-07-04', t: 'email',   text: 'Q3 on-site visit schedule confirmed — first Tuesday monthly.' },
        { d: '2026-05-19', t: 'meeting', text: 'Renewal talk went well; wants podiatry added to visits.' } ] },
    { id: 'c8',  first: 'Jasmine', last: 'Reed',     email: 'jasmine.reed@gmail.com',   phone: '(512) 555-0151', title: 'Patient',                    companyId: null,  lifecycle: 'Consult scheduled', owner: 'o2', source: 'Doctor referral',   created: '2026-06-28', lastTouch: '2026-07-02', city: 'Cedar Park, TX',
      custom: { 'Insurance provider': 'BlueRiver PPO', 'Preferred clinic': 'Cedar Park', 'Referring doctor': 'Dr. Okafor', 'Next appointment': '2026-07-10' },
      timeline: [
        { d: '2026-07-02', t: 'call', text: 'Reminder call — confirmed Friday 10am dermatology consult.' },
        { d: '2026-06-28', t: 'note', text: 'Referred by Dr. Okafor for a recurring skin condition.' } ] },
    { id: 'c9',  first: 'Viktor', last: 'Baranov',   email: 'v.baranov@gmail.com',      phone: '(512) 555-0172', title: 'Patient',                    companyId: null,  lifecycle: 'Past patient',      owner: 'o3', source: 'Google Ads',        created: '2025-09-14', lastTouch: '2026-05-30', city: 'Austin, TX',
      custom: { 'Insurance provider': 'Self-pay', 'Preferred clinic': 'Downtown', 'Referring doctor': '—', 'Next appointment': 'Not booked' },
      timeline: [
        { d: '2026-05-30', t: 'email', text: 'Sent the "we miss you" re-engagement email — opened, no reply yet.' },
        { d: '2025-11-02', t: 'note',  text: 'Completed 8-session physio block, discharged with home plan.' } ] },
    { id: 'c10', first: 'Amara',  last: 'Diallo',    email: 'amara.d@cedarparkisd.org', phone: '(512) 555-0195', title: 'Benefits lead, Cedar Park ISD', companyId: 'co4', lifecycle: 'Contacted',      owner: 'o2', source: 'Insurance partner', created: '2026-03-15', lastTouch: '2026-06-19', city: 'Cedar Park, TX',
      custom: { 'Insurance provider': 'District plan', 'Preferred clinic': 'Cedar Park', 'Referring doctor': '—', 'Next appointment': '—' },
      timeline: [
        { d: '2026-06-19', t: 'meeting', text: 'Scoped autumn screening days for ~180 staff across 3 campuses.' },
        { d: '2026-03-15', t: 'email',   text: 'First outreach after BlueRiver introduction.' } ] },
    { id: 'c11', first: 'Owen',   last: 'Gallagher', email: 'owen.gall@gmail.com',      phone: '(512) 555-0110', title: 'Patient',                    companyId: null,  lifecycle: 'New lead',          owner: 'o3', source: 'Walk-in',           created: '2026-07-04', lastTouch: '2026-07-04', city: 'Austin, TX',
      custom: { 'Insurance provider': 'Unknown', 'Preferred clinic': 'Downtown', 'Referring doctor': '—', 'Next appointment': 'Not booked' },
      timeline: [
        { d: '2026-07-04', t: 'note', text: 'Walked in asking about travel vaccinations for an August trip.' } ] },
    { id: 'c12', first: 'Nadia',  last: 'Osei',      email: 'nadia.osei@verdeyoga.com', phone: '(512) 555-0158', title: 'Owner, Verde Yoga',          companyId: 'co5', lifecycle: 'Active patient',    owner: 'o3', source: 'Walk-in',           created: '2026-04-02', lastTouch: '2026-06-15', city: 'Austin, TX',
      custom: { 'Insurance provider': 'Self-pay', 'Preferred clinic': 'Downtown', 'Referring doctor': '—', 'Next appointment': '2026-07-20' },
      timeline: [
        { d: '2026-06-15', t: 'meeting', text: 'Discussed member discount codes for physio packages.' },
        { d: '2026-04-02', t: 'note',    text: 'Studio owner and patient — good partnership potential.' } ] },
    { id: 'c13', first: 'Felix',  last: 'Nguyen',    email: 'felix.n@hcortho.com',      phone: '(512) 555-0181', title: 'Practice manager, Hill Country Ortho', companyId: 'co2', lifecycle: 'Active patient', owner: 'o4', source: 'Doctor referral', created: '2026-02-03', lastTouch: '2026-06-26', city: 'Austin, TX',
      custom: { 'Insurance provider': '—', 'Preferred clinic': '—', 'Referring doctor': 'Is a referrer', 'Next appointment': '—' },
      timeline: [
        { d: '2026-06-26', t: 'email', text: 'They sent 3 post-surgery rehab referrals this month.' },
        { d: '2026-02-03', t: 'note',  text: 'Referral agreement live. Send imaging by secure portal only.' } ] },
    { id: 'c14', first: 'Beatriz', last: 'Molina',   email: 'bea.molina@gmail.com',     phone: '(512) 555-0139', title: 'Patient',                    companyId: null,  lifecycle: 'Contacted',         owner: 'o2', source: 'Website form',      created: '2026-06-11', lastTouch: '2026-06-29', city: 'Round Rock, TX',
      custom: { 'Insurance provider': 'BlueRiver PPO', 'Preferred clinic': 'Round Rock', 'Referring doctor': '—', 'Next appointment': 'Not booked' },
      timeline: [
        { d: '2026-06-29', t: 'call', text: 'Left voicemail with consult options — asked to call back after the 6th.' },
        { d: '2026-06-11', t: 'note', text: 'Asked about allergy testing prices via the contact form.' } ] }
  ],

  deals: [
    { id: 'd1',  name: 'Grace Holloway — physio block (8 sessions)',      amount: 1440,  stage: 's5', close: '2026-05-02', owner: 'o2', contactId: 'c1',  companyId: null,  created: '2026-03-04', source: 'Website form' },
    { id: 'd2',  name: 'TravisTech — 240 employee health checks',         amount: 38400, stage: 's4', close: '2026-07-25', owner: 'o2', contactId: 'c5',  companyId: 'co6', created: '2026-05-11', source: 'Insurance partner' },
    { id: 'd3',  name: 'Cedar Park ISD — autumn screening days',          amount: 21600, stage: 's3', close: '2026-08-15', owner: 'o2', contactId: 'c10', companyId: 'co4', created: '2026-03-15', source: 'Insurance partner' },
    { id: 'd4',  name: 'Sunrise Senior Living — on-site visits renewal',  amount: 28800, stage: 's5', close: '2026-06-01', owner: 'o4', contactId: 'c7',  companyId: 'co7', created: '2026-04-20', source: 'Doctor referral' },
    { id: 'd5',  name: 'Raymond Ortiz — back-pain treatment plan',        amount: 2250,  stage: 's2', close: '2026-07-18', owner: 'o3', contactId: 'c2',  companyId: null,  created: '2026-06-21', source: 'Google Ads' },
    { id: 'd6',  name: 'Jasmine Reed — dermatology course',               amount: 1180,  stage: 's2', close: '2026-07-24', owner: 'o2', contactId: 'c8',  companyId: null,  created: '2026-06-28', source: 'Doctor referral' },
    { id: 'd7',  name: 'Verde Yoga — member physio partnership',          amount: 6000,  stage: 's4', close: '2026-07-30', owner: 'o3', contactId: 'c12', companyId: 'co5', created: '2026-04-02', source: 'Walk-in' },
    { id: 'd8',  name: 'Luciana Ferreira — annual wellness plan',         amount: 780,   stage: 's5', close: '2026-06-24', owner: 'o3', contactId: 'c6',  companyId: null,  created: '2026-06-01', source: 'Walk-in' },
    { id: 'd9',  name: 'Meredith Chan — sports injury assessment',        amount: 320,   stage: 's1', close: '2026-07-20', owner: 'o2', contactId: 'c4',  companyId: null,  created: '2026-07-02', source: 'Website form' },
    { id: 'd10', name: 'Owen Gallagher — travel vaccination pack',        amount: 410,   stage: 's1', close: '2026-07-15', owner: 'o3', contactId: 'c11', companyId: null,  created: '2026-07-04', source: 'Walk-in' },
    { id: 'd11', name: 'Beatriz Molina — allergy testing panel',          amount: 640,   stage: 's3', close: '2026-07-22', owner: 'o2', contactId: 'c14', companyId: null,  created: '2026-06-11', source: 'Website form' },
    { id: 'd12', name: 'Hill Country Ortho — rehab referral programme',   amount: 14400, stage: 's5', close: '2026-04-10', owner: 'o4', contactId: 'c13', companyId: 'co2', created: '2026-02-03', source: 'Doctor referral' },
    { id: 'd13', name: 'Viktor Baranov — physio top-up block',            amount: 720,   stage: 's6', close: '2026-06-05', owner: 'o3', contactId: 'c9',  companyId: null,  created: '2026-05-20', source: 'Google Ads' },
    { id: 'd14', name: 'Mueller Pharmacy — flu clinic co-promotion',      amount: 3600,  stage: 's3', close: '2026-08-28', owner: 'o3', contactId: null,  companyId: 'co8', created: '2026-06-01', source: 'Walk-in' }
  ],

  tickets: [
    { id: 't1', subject: 'Invoice shows wrong insurance discount',      status: 'Waiting on us',      priority: 'High',   contactId: 'c6',  owner: 'o3', created: '2026-07-02', category: 'Billing',
      desc: 'Luciana was billed the self-pay rate but she is on BlueRiver HMO. Needs a corrected invoice before her card is charged.',
      thread: [ { from: 'them', at: '2026-07-02 09:14', text: 'Hi, my invoice for the annual check-up looks wrong — it doesn\'t apply my insurance.' },
                { from: 'us',   at: '2026-07-02 10:02', text: 'You\'re right, our mistake. We\'re reissuing it with the HMO rate today.' } ] },
    { id: 't2', subject: 'Can\'t open the intake form link on phone',   status: 'Waiting on patient', priority: 'Medium', contactId: 'c2',  owner: 'o3', created: '2026-07-03', category: 'Portal & forms',
      desc: 'Link opened a blank page on his Android browser. Sent an alternative PDF version by email.',
      thread: [ { from: 'them', at: '2026-07-03 18:40', text: 'The form link just shows a white screen on my phone.' },
                { from: 'us',   at: '2026-07-03 19:05', text: 'Sorry about that! I\'ve emailed a PDF you can fill instead — let me know if that works.' } ] },
    { id: 't3', subject: 'Reschedule July on-site visit day',           status: 'Closed',             priority: 'Low',    contactId: 'c7',  owner: 'o4', created: '2026-06-25', category: 'Scheduling',
      desc: 'Sunrise asked to move the July visit from the 7th to the 14th due to a facility event. Done and confirmed.',
      thread: [ { from: 'them', at: '2026-06-25 11:20', text: 'Could we shift the July visit a week later? We have an inspection that day.' },
                { from: 'us',   at: '2026-06-25 12:00', text: 'No problem — moved to Tuesday the 14th, same times. Calendar invite updated.' } ] },
    { id: 't4', subject: 'Referral letters arriving too slowly',        status: 'Waiting on us',      priority: 'High',   contactId: 'c3',  owner: 'o4', created: '2026-06-30', category: 'Referrals',
      desc: 'Dr. Okafor\'s team waits up to 10 days for discharge letters. Target is 3 working days. Reviewing our dictation workflow.',
      thread: [ { from: 'them', at: '2026-06-30 08:55', text: 'We\'re still waiting on letters for two patients seen in mid-June.' },
                { from: 'us',   at: '2026-06-30 09:30', text: 'Both letters go out today. We\'re also fixing the workflow so this stops happening.' } ] },
    { id: 't5', subject: 'Wants receipt for insurance reimbursement',   status: 'Closed',             priority: 'Low',    contactId: 'c1',  owner: 'o2', created: '2026-06-20', category: 'Billing',
      desc: 'Grace needed an itemised receipt for her physio sessions to claim reimbursement. Sent same day.',
      thread: [ { from: 'them', at: '2026-06-20 14:12', text: 'Could I get an itemised receipt for my last four sessions?' },
                { from: 'us',   at: '2026-06-20 15:01', text: 'Attached! It lists each session date and code your insurer will ask for.' } ] },
    { id: 't6', subject: 'Text reminders arriving at 6am',              status: 'New',                priority: 'Medium', contactId: 'c14', owner: 'o3', created: '2026-07-04', category: 'Portal & forms',
      desc: 'Beatriz gets appointment reminder texts at 6am. Reminder send window should be 9am–7pm — checking the automation settings.',
      thread: [ { from: 'them', at: '2026-07-04 07:02', text: 'Your reminder texts keep waking me up at 6am — can you send them later?' } ] },
    { id: 't7', subject: 'Parking validation not working',              status: 'Waiting on patient', priority: 'Low',    contactId: 'c12', owner: 'o3', created: '2026-06-28', category: 'Facilities',
      desc: 'Downtown garage scanner rejected her ticket. Asked for a photo of the ticket to raise with the garage operator.',
      thread: [ { from: 'them', at: '2026-06-28 16:44', text: 'The parking machine wouldn\'t accept the validation from reception.' },
                { from: 'us',   at: '2026-06-28 17:10', text: 'Sorry! Could you send a photo of the ticket? We\'ll get the garage to refund it.' } ] },
    { id: 't8', subject: 'Update employee roster for health checks',    status: 'Waiting on us',      priority: 'Medium', contactId: 'c5',  owner: 'o2', created: '2026-07-01', category: 'Corporate accounts',
      desc: 'TravisTech sent 12 new joiners to add to the proposed health-check roster before the July board review.',
      thread: [ { from: 'them', at: '2026-07-01 13:25', text: 'Sending over 12 new starters — can the proposal reflect the updated headcount?' },
                { from: 'us',   at: '2026-07-01 14:00', text: 'Will do — updated proposal with 252 employees goes out tomorrow.' } ] }
  ],

  tasks: [
    { id: 'k1', title: 'Send corrected invoice to Luciana',                 due: '2026-07-06', type: 'To-do',  owner: 'o3', related: { kind: 'ticket', id: 't1' },  done: false },
    { id: 'k2', title: 'Update TravisTech proposal to 252 employees',       due: '2026-07-06', type: 'To-do',  owner: 'o2', related: { kind: 'deal', id: 'd2' },    done: false },
    { id: 'k3', title: 'Call Beatriz back about consult times',            due: '2026-07-07', type: 'Call',   owner: 'o2', related: { kind: 'contact', id: 'c14' }, done: false },
    { id: 'k4', title: 'Fix reminder-text send window (9am–7pm)',          due: '2026-07-08', type: 'To-do',  owner: 'o3', related: { kind: 'ticket', id: 't6' },  done: false },
    { id: 'k5', title: 'Draft Cedar Park ISD screening-day schedule',       due: '2026-07-10', type: 'To-do',  owner: 'o2', related: { kind: 'deal', id: 'd3' },    done: false },
    { id: 'k6', title: 'June referral summary to Dr. Okafor',              due: '2026-06-30', type: 'Email',  owner: 'o4', related: { kind: 'contact', id: 'c3' },  done: true },
    { id: 'k7', title: 'Confirm Q3 visit dates with Sunrise',              due: '2026-07-04', type: 'Email',  owner: 'o4', related: { kind: 'contact', id: 'c7' },  done: true },
    { id: 'k8', title: 'Send Verde Yoga partnership agreement',            due: '2026-07-09', type: 'Email',  owner: 'o3', related: { kind: 'deal', id: 'd7' },    done: false },
    { id: 'k9', title: 'Chase discharge-letter backlog (2 remaining)',     due: '2026-07-07', type: 'To-do',  owner: 'o4', related: { kind: 'ticket', id: 't4' },  done: false }
  ],

  meetings: [
    { id: 'm1', title: 'Raymond Ortiz — first consult (back pain)',     date: '2026-07-08', time: '10:00', contactId: 'c2',  owner: 'o1', kind: 'Consultation' },
    { id: 'm2', title: 'Jasmine Reed — dermatology consult',            date: '2026-07-10', time: '10:00', contactId: 'c8',  owner: 'o1', kind: 'Consultation' },
    { id: 'm3', title: 'Grace Holloway — physio follow-up',            date: '2026-07-14', time: '09:30', contactId: 'c1',  owner: 'o2', kind: 'Follow-up' },
    { id: 'm4', title: 'Sunrise Senior Living — July on-site day',     date: '2026-07-14', time: '13:00', contactId: 'c7',  owner: 'o4', kind: 'On-site visit' },
    { id: 'm5', title: 'TravisTech — proposal walkthrough with board', date: '2026-07-21', time: '15:00', contactId: 'c5',  owner: 'o2', kind: 'Sales meeting' },
    { id: 'm6', title: 'Nadia Osei — physio session + partnership chat', date: '2026-07-20', time: '11:00', contactId: 'c12', owner: 'o3', kind: 'Follow-up' }
  ],

  campaigns: [
    { id: 'g1', name: 'July wellness newsletter',            type: 'Newsletter', status: 'Sent',      date: '2026-07-01', audience: 'All active patients',        sent: 640, opened: 302, clicked: 88,  replied: 12,
      subject: 'Summer health checklist: 5 things before August', preview: 'Hydration, travel jabs, sun care and two things people always forget…' },
    { id: 'g2', name: 'Knee & back pain — Google Ads follow-up', type: 'Automated', status: 'Running', date: '2026-06-10', audience: 'New enquiries from ads',    sent: 96,  opened: 71,  clicked: 34,  replied: 9,
      subject: 'Your consult options at BrightCare', preview: 'Same-week appointments at Downtown and Round Rock, with prices upfront.' },
    { id: 'g3', name: 'We miss you — 6-month re-engagement',   type: 'Automated',  status: 'Running',  date: '2026-05-15', audience: 'Past patients, no visit in 6 months', sent: 155, opened: 64, clicked: 18, replied: 5,
      subject: 'It\'s been a while — time for a check-in?', preview: 'A quick check-up now beats a bigger problem later. Book in two taps.' },
    { id: 'g4', name: 'Flu clinic early-bird announcement',    type: 'One-off',    status: 'Scheduled', date: '2026-08-20', audience: 'All patients + partners',   sent: 0,   opened: 0,   clicked: 0,   replied: 0,
      subject: 'Flu jabs open early this year — book your slot', preview: 'Beat the autumn rush. Walk-in Saturdays at all three clinics.' },
    { id: 'g5', name: 'Referrer update — new dermatology service', type: 'One-off', status: 'Sent',    date: '2026-06-05', audience: 'Referring doctors',          sent: 42,  opened: 33,  clicked: 15,  replied: 7,
      subject: 'New: consultant dermatology at BrightCare', preview: 'Referral criteria, wait times and how to send us patients securely.' }
  ],

  forms: [
    { id: 'f1', name: 'Book a consult',            page: '/book',            views: 2180, submissions: 214, fields: ['Full name', 'Phone', 'Email', 'Preferred clinic', 'What do you need help with?'], recent: ['c4', 'c2', 'c14'] },
    { id: 'f2', name: 'Ask a billing question',    page: '/billing-help',    views: 460,  submissions: 58,  fields: ['Full name', 'Email', 'Invoice number', 'Your question'],                             recent: ['c6', 'c1'] },
    { id: 'f3', name: 'Refer a patient (doctors)', page: '/refer',           views: 310,  submissions: 41,  fields: ['Doctor name', 'Practice', 'Patient initials', 'Urgency', 'Clinical summary'],        recent: ['c3', 'c13'] },
    { id: 'f4', name: 'Corporate health enquiry',  page: '/for-employers',   views: 720,  submissions: 26,  fields: ['Company', 'Contact name', 'Email', 'Team size', 'What are you looking for?'],        recent: ['c5', 'c10'] }
  ],

  workflows: [
    { id: 'w1', name: 'New enquiry → book the consult', status: 'On',  trigger: 'Someone submits the "Book a consult" form', goal: 'Consult booked within 5 days', enrolled: 214, active: 23, completed: 168,
      steps: [ { k: 'trigger', text: 'Form "Book a consult" is submitted' },
               { k: 'email',   text: 'Send "Your consult options at BrightCare" straight away' },
               { k: 'delay',   text: 'Wait 1 day' },
               { k: 'branch',  text: 'Booked already? If yes, end the workflow' },
               { k: 'task',    text: 'Create a call task for the patient coordinator' },
               { k: 'delay',   text: 'Wait 3 days' },
               { k: 'email',   text: 'Send a gentle "still interested?" nudge' } ] },
    { id: 'w2', name: 'Appointment reminders',        status: 'On',  trigger: 'An appointment is 48 hours away', goal: 'Fewer no-shows', enrolled: 1240, active: 31, completed: 1180,
      steps: [ { k: 'trigger', text: 'Appointment is 48 hours away' },
               { k: 'email',   text: 'Send reminder email with directions and parking info' },
               { k: 'delay',   text: 'Wait until 24 hours before' },
               { k: 'update',  text: 'Send reminder text (send window 9am–7pm)' } ] },
    { id: 'w3', name: 'Post-visit follow-up & review ask', status: 'On', trigger: 'An appointment is marked completed', goal: 'A Google review or rebooking', enrolled: 890, active: 18, completed: 812,
      steps: [ { k: 'trigger', text: 'Appointment marked as completed' },
               { k: 'delay',   text: 'Wait 4 hours' },
               { k: 'email',   text: 'Send "How was your visit?" with a 1-tap rating' },
               { k: 'branch',  text: 'Rated 4–5 stars? Ask for a Google review' },
               { k: 'task',    text: 'Rated 3 or less? Create a call-back task for the front desk lead' } ] },
    { id: 'w4', name: 'Past-patient re-engagement',   status: 'On',  trigger: 'No visit in 6 months', goal: 'A new booking', enrolled: 155, active: 40, completed: 61,
      steps: [ { k: 'trigger', text: 'Last visit was 6 months ago' },
               { k: 'email',   text: 'Send "It\'s been a while" with easy booking link' },
               { k: 'delay',   text: 'Wait 14 days' },
               { k: 'branch',  text: 'Booked? End. Otherwise send seasonal offer' } ] },
    { id: 'w5', name: 'Referral thank-you to doctors', status: 'Off', trigger: 'A referred patient completes their first visit', goal: 'Keep referrers informed', enrolled: 64, active: 0, completed: 64,
      steps: [ { k: 'trigger', text: 'Referred patient completes first visit' },
               { k: 'email',   text: 'Thank the referring doctor and confirm the patient was seen' },
               { k: 'task',    text: 'Remind referral manager to send the discharge letter within 3 days' } ] }
  ],

  conversations: [
    { id: 'v1', channel: 'Email',    contactId: 'c4',  subject: 'Sports assessment for my son',   unread: true,  at: '2026-07-04 19:22',
      msgs: [ { from: 'them', at: '2026-07-04 19:22', text: 'Hi — my 15-year-old plays soccer and has had ankle pain for two weeks. Do you do sports injury assessments for teens, and what does it cost?' } ] },
    { id: 'v2', channel: 'Chat',     contactId: 'c11', subject: 'Travel vaccination timing',      unread: true,  at: '2026-07-04 15:03',
      msgs: [ { from: 'them', at: '2026-07-04 15:03', text: 'If I travel on Aug 12, when is the latest I can get the typhoid jab?' },
              { from: 'us',   at: '2026-07-04 15:09', text: 'Ideally 2 weeks before travel — so by July 29. We have slots most weekday mornings.' },
              { from: 'them', at: '2026-07-04 15:11', text: 'Great, I\'ll check my week and book. Thanks!' } ] },
    { id: 'v3', channel: 'Email',    contactId: 'c5',  subject: 'Updated roster attached',        unread: false, at: '2026-07-01 13:25',
      msgs: [ { from: 'them', at: '2026-07-01 13:25', text: 'Roster attached with the 12 new starters. Board meets July 21 — would be great to have the final proposal a week before.' },
              { from: 'us',   at: '2026-07-01 14:00', text: 'Perfect timing. Updated proposal with 252 employees will be with you by the 14th.' } ] },
    { id: 'v4', channel: 'WhatsApp', contactId: 'c8',  subject: 'Friday appointment',             unread: false, at: '2026-07-02 12:40',
      msgs: [ { from: 'us',   at: '2026-07-02 12:38', text: 'Hi Jasmine, confirming your dermatology consult this Friday at 10am, Cedar Park clinic.' },
              { from: 'them', at: '2026-07-02 12:40', text: 'Confirmed, see you then 👍' } ] },
    { id: 'v5', channel: 'Email',    contactId: 'c3',  subject: 'Two letters still outstanding',  unread: false, at: '2026-06-30 08:55',
      msgs: [ { from: 'them', at: '2026-06-30 08:55', text: 'Morning — still waiting on discharge letters for the two patients we referred mid-June. Our nurses need them to close the loop.' },
              { from: 'us',   at: '2026-06-30 09:30', text: 'Apologies — both go out today by secure portal, and we\'re fixing the workflow behind the delay.' } ] },
    { id: 'v6', channel: 'Chat',     contactId: 'c9',  subject: 'Prices for a top-up block',      unread: false, at: '2026-05-28 17:15',
      msgs: [ { from: 'them', at: '2026-05-28 17:15', text: 'Hey, what would 4 more physio sessions cost me? Same knee as last year.' },
              { from: 'us',   at: '2026-05-28 17:20', text: 'A 4-session top-up is $720, and your old exercise plan is still on file. Want me to pencil in a start date?' } ] }
  ],

  customProps: [
    { object: 'Contact', label: 'Insurance provider',   internal: 'insurance_provider',  type: 'Dropdown',      options: 'BlueRiver PPO, BlueRiver HMO, District plan, Self-pay, Unknown', used: 'Billing, eligibility checks' },
    { object: 'Contact', label: 'Preferred clinic',     internal: 'preferred_clinic',    type: 'Dropdown',      options: 'Downtown, Round Rock, Cedar Park',                               used: 'Scheduling, capacity planning' },
    { object: 'Contact', label: 'Referring doctor',     internal: 'referring_doctor',    type: 'Single line',   options: '—',                                                              used: 'Referral thank-yous, reporting' },
    { object: 'Contact', label: 'Next appointment',     internal: 'next_appointment',    type: 'Date',          options: '—',                                                              used: 'Reminder workflows' },
    { object: 'Contact', label: 'Consent to text',      internal: 'sms_consent',         type: 'Yes / No',      options: 'Yes, No',                                                        used: 'Text reminders (legal requirement)' },
    { object: 'Deal',    label: 'Treatment category',   internal: 'treatment_category',  type: 'Dropdown',      options: 'Physio, Dermatology, Screening, Vaccination, Corporate',         used: 'Revenue-by-service reporting' },
    { object: 'Deal',    label: 'Sessions included',    internal: 'sessions_included',   type: 'Number',        options: '—',                                                              used: 'Capacity forecasting' },
    { object: 'Company', label: 'Partner type',         internal: 'partner_type',        type: 'Dropdown',      options: 'Referrer, Employer, Insurer, Wellness, Pharmacy',                used: 'Partner reporting' },
    { object: 'Company', label: 'Referrals this year',  internal: 'referrals_ytd',       type: 'Number',        options: '—',                                                              used: 'Referrer league table' },
    { object: 'Ticket',  label: 'Clinic location',      internal: 'clinic_location',     type: 'Dropdown',      options: 'Downtown, Round Rock, Cedar Park, Head office',                  used: 'Spotting location-specific issues' }
  ],

  integrations: [
    { name: 'Google Calendar',   cat: 'Scheduling',     desc: 'Consult bookings appear on each clinician\'s calendar automatically.',      connected: true },
    { name: 'Twilio SMS',        cat: 'Messaging',      desc: 'Sends appointment reminder texts inside the allowed hours.',                 connected: true },
    { name: 'Stripe',            cat: 'Payments',       desc: 'Takes deposits and care-plan payments; receipts sync to the contact.',       connected: true },
    { name: 'Aircall',           cat: 'Calling',        desc: 'Front-desk calls are logged on the contact timeline with recordings.',       connected: true },
    { name: 'DocuSign',          cat: 'Documents',      desc: 'Consent forms and corporate agreements signed electronically.',              connected: true },
    { name: 'Google Ads',        cat: 'Advertising',    desc: 'Ad-click enquiries land here with their campaign and keyword attached.',     connected: true },
    { name: 'Mailchimp import',  cat: 'Migration',      desc: 'One-time import of the old newsletter list — done in January.',              connected: false },
    { name: 'QuickBooks',        cat: 'Accounting',     desc: 'Won care plans create draft invoices for the finance team.',                 connected: true },
    { name: 'Zoom',              cat: 'Meetings',       desc: 'Video consults get a Zoom link added to the confirmation email.',            connected: false },
    { name: 'Slack',             cat: 'Notifications',  desc: 'High-priority tickets ping the #front-desk channel.',                        connected: true }
  ],

  monthly: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    revenue:     [24800, 31200, 28400, 42100, 39800, 47300],
    newContacts: [38, 45, 52, 48, 61, 74],
    won:         [6, 8, 7, 11, 9, 12],
    ticketsClosed: [14, 11, 16, 13, 18, 15],
    visitors:    [3200, 3900, 4400, 4100, 5200, 6100]
  },
  sourceBreakdown: [
    { label: 'Website form',      value: 34 },
    { label: 'Doctor referral',   value: 26 },
    { label: 'Google Ads',        value: 19 },
    { label: 'Walk-in',           value: 13 },
    { label: 'Insurance partner', value: 8 }
  ],

  reports: [
    { id: 'r1', name: 'Revenue by month',              desc: 'Accepted care-plan value, month by month.',                    type: 'line' },
    { id: 'r2', name: 'New contacts by month',         desc: 'How many new people entered the CRM each month.',              type: 'bar' },
    { id: 'r3', name: 'Where enquiries come from',     desc: 'Share of contacts by original source.',                        type: 'donut' },
    { id: 'r4', name: 'Patient journey funnel',        desc: 'How enquiries move from first contact to an accepted plan.',   type: 'funnel' },
    { id: 'r5', name: 'Care plans by team member',     desc: 'Open pipeline value owned by each person.',                    type: 'ownerbar' },
    { id: 'r6', name: 'Ticket load by category',       desc: 'Which kinds of issues the front desk handles most.',           type: 'catbar' }
  ]
};
