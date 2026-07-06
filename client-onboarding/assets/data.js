/* Client onboarding portal — sample data.
   A fictional agency (NorthBeam Systems) onboarding a fictional clinic
   (Juniper Physio & Wellness) through a CRM implementation.
   Every progress number in the portal is computed from these records live:
   steps can declare what they need (tasks, documents, approvals, access),
   and they complete themselves the moment the client provides it.
   All names and details are made up. */
window.OB = {

  agency: { name: 'NorthBeam Systems', line: 'CRM setup, data migration and automation' },
  client: { company: 'Juniper Physio & Wellness', contact: 'Maya', logoHue: 152 },
  project: {
    name: 'CRM implementation & migration',
    started: '2026-06-22',
    launch: '2026-07-28',
    summary: 'Move Juniper off the old spreadsheet onto a properly configured CRM: clean data, a patient pipeline, appointment reminders and a trained team.'
  },
  today: '2026-07-05',

  team: [
    { id: 'p1', name: 'Rahul Menon',   role: 'Project lead',            side: 'agency', color: '#4553c2', note: 'Your main contact. Replies within one business day, usually much faster.' },
    { id: 'p2', name: 'Sofia Brandt',  role: 'Data & migration',        side: 'agency', color: '#0e8a7d', note: 'Owns the spreadsheet cleanup and the import. Ask her anything about your data.' },
    { id: 'p3', name: 'Eli Navarro',   role: 'Automations & training',  side: 'agency', color: '#b3652a', note: 'Builds the reminders and runs your team training on July 21.' },
    { id: 'p4', name: 'Maya Kowalski', role: 'Clinic owner',            side: 'client', color: '#8a4ec2', note: 'Approves the big decisions.' },
    { id: 'p5', name: 'Jordan Reyes',  role: 'Front desk lead',         side: 'client', color: '#c24e6b', note: 'Day-to-day contact; will run the CRM after launch.' }
  ],

  /* ---- the plan -----------------------------------------------------------
     Step status is 'done' | 'active' | 'upcoming', but a step may also list
     `needs` — ids of tasks / docs / approvals / access items. A step with
     needs completes itself when everything it needs is provided, and shows
     as "waiting on you" until then. */
  phases: [
    { id: 'ph1', title: 'Kickoff', when: 'Week of June 22', blurb: 'Meet, agree the plan, get the paperwork out of the way.',
      steps: [
        { id: 's1', title: 'Kickoff call',                       owner: 'us',  status: 'done', date: '2026-06-24',
          desc: 'Forty-five minutes: goals, timeline, who does what. Notes and the recording are in Documents.' },
        { id: 's2', title: 'Proposal signed & project scheduled', owner: 'us',  status: 'done', date: '2026-06-23',
          desc: 'Scope locked: CRM setup, migration of the customer spreadsheet, reminder automations, one training session.' },
        { id: 's3', title: 'Business profile form',               owner: 'you', status: 'active', date: null, needs: { tasks: ['t1'] },
          desc: 'Ten questions about how the clinic actually runs — it drives how we configure everything.' }
      ] },
    { id: 'ph2', title: 'Access & discovery', when: 'Week of June 29', blurb: 'We get the keys and map how things work today.',
      steps: [
        { id: 's4', title: 'System access granted',               owner: 'you', status: 'active', date: null, needs: { access: ['a2', 'a3', 'a5'] },
          desc: 'Each system on the Access list, with a one-line reason we need it. Grant them as you can — any order.' },
        { id: 's5', title: 'Current-process walkthrough',         owner: 'us',  status: 'done', date: '2026-06-30',
          desc: 'Sofia shadowed the front desk for a morning: how bookings, reminders and follow-ups happen today.' },
        { id: 's6', title: 'Brand & tone form',                   owner: 'you', status: 'active', date: null, needs: { tasks: ['t2'] },
          desc: 'How Juniper sounds in writing — so the reminder emails read like you, not like a robot.' }
      ] },
    { id: 'ph3', title: 'Data migration', when: 'July 1 – 10', blurb: 'The spreadsheet becomes clean, trustworthy records.',
      steps: [
        { id: 's7', title: 'Customer spreadsheet received',       owner: 'you', status: 'done', date: '2026-07-01',
          desc: 'Received July 1. If you find a newer copy floating around, send it — we\'ll reconcile.' },
        { id: 's8', title: 'Cleanup & duplicate merge',           owner: 'us',  status: 'done', date: '2026-07-04',
          desc: '214 rows in, 186 clean patient records out. 19 duplicate rows merged, 9 non-patient rows archived. Every merge is traceable.' },
        { id: 's9', title: 'You review the cleaned list',         owner: 'you', status: 'active', date: null, needs: { tasks: ['t4'] },
          desc: 'A spot-check, not homework: we flag 12 records we want your eyes on (odd phone numbers, possible duplicates we didn\'t merge).' },
        { id: 's10', title: 'Import into the CRM',                owner: 'us',  status: 'upcoming', date: null,
          desc: 'Happens within a day of your review. Nothing is deleted — the original sheet is archived untouched.' }
      ] },
    { id: 'ph4', title: 'Build & automations', when: 'July 8 – 18', blurb: 'Pipeline, fields, reminders — built to match the clinic.',
      steps: [
        { id: 's11', title: 'Patient pipeline design',            owner: 'you', status: 'active', date: null, needs: { approvals: ['ap1'] },
          desc: 'Six stages from "New enquiry" to "Active patient". Approve it in Approvals — or ask for changes, that\'s what the button is for.' },
        { id: 's12', title: 'Custom fields',                      owner: 'us',  status: 'done', date: '2026-06-30',
          desc: 'Eight fields you approved: insurance provider, preferred clinician, referral source and five more.' },
        { id: 's13', title: 'Reminder emails & texts',            owner: 'you', status: 'active', date: null, needs: { approvals: ['ap3'] },
          desc: 'Two templates await your sign-off: the welcome email and the 48-hour appointment reminder.' },
        { id: 's14', title: 'Automations built & tested',         owner: 'us',  status: 'upcoming', date: null,
          desc: 'Booking confirmations, reminders and the no-show follow-up — tested on our own numbers before yours.' }
      ] },
    { id: 'ph5', title: 'Training & launch', when: 'July 21 – 28', blurb: 'Your team learns it, then we go live together.',
      steps: [
        { id: 's15', title: 'Team training session',              owner: 'us',  status: 'upcoming', date: '2026-07-21',
          desc: '90 minutes on July 21, recorded. Jordan drives, everyone else follows along on their own screen.' },
        { id: 's16', title: 'Launch week support',                owner: 'us',  status: 'upcoming', date: '2026-07-28',
          desc: 'We watch the first week closely and fix anything that feels off. Same-day response, guaranteed.' },
        { id: 's17', title: 'Handover & documentation',           owner: 'us',  status: 'upcoming', date: null,
          desc: 'A short written guide, your admin passwords, and a 30-day check-in booked before we step back.' }
      ] }
  ],

  /* ---- the client's action items ------------------------------------------- */
  tasks: [
    { id: 't1', title: 'Fill in the business profile form', due: '2026-07-08', done: false, view: 'forms',
      note: '10 questions, about 10 minutes. Most of it you know off the top of your head.' },
    { id: 't2', title: 'Fill in the brand & tone form',      due: '2026-07-09', done: false, view: 'forms',
      note: 'Six questions about how Juniper should sound in emails and texts.' },
    { id: 't3', title: 'Send the logo pack',                 due: '2026-07-09', done: false, view: 'documents',
      note: 'The files your designer sent you — SVG or the biggest PNGs you have.' },
    { id: 't4', title: 'Review the 12 flagged patient records', due: '2026-07-08', done: false, view: 'documents',
      note: 'Sofia\'s list is in Documents ("Records to review"). Reply in Updates with anything odd.' },
    { id: 't5', title: 'Approve the patient pipeline',       due: '2026-07-08', done: false, view: 'approvals',
      note: 'The six proposed stages are in Approvals with the reasoning for each.' },
    { id: 't6', title: 'Approve the email & text templates', due: '2026-07-10', done: false, view: 'approvals',
      note: 'Read them as a patient would. If anything sounds off, request changes.' },
    { id: 't7', title: 'Grant website admin access',         due: '2026-07-08', done: false, view: 'forms',
      note: 'So the booking form can create CRM contacts. Instructions are on the Access list.' },
    { id: 't8', title: 'Confirm who attends training on July 21', due: '2026-07-15', done: false, view: 'meetings',
      note: 'Names + emails of everyone joining, so invites and logins are ready.' },
    { id: 't9', title: 'Sign the proposal',                  due: '2026-06-23', done: true, view: 'documents',
      note: 'Signed June 23 — thank you!' },
    { id: 't10', title: 'Send the customer spreadsheet',     due: '2026-07-01', done: true, view: 'documents',
      note: 'Received July 1. Sofia has already cleaned it — see Updates.' }
  ],

  /* ---- access checklist -------------------------------------------------------- */
  access: [
    { id: 'a1', system: 'Google Workspace',   why: 'Calendar sync for appointments and a shared inbox for enquiries.',            status: 'granted', how: 'Done June 29 — thank you.' },
    { id: 'a2', system: 'Website admin',      why: 'To connect the booking form so submissions create contacts automatically.',    status: 'pending', how: 'Invite hello@northbeam.systems as an administrator in your site dashboard.' },
    { id: 'a3', system: 'Phone system (Twilio)', why: 'Appointment reminder texts come from your existing clinic number.',         status: 'pending', how: 'Add us as a developer user — two-minute guide is in Documents.' },
    { id: 'a4', system: 'Stripe',             why: 'Deposits and package payments recorded on the patient record.',                status: 'granted', how: 'Done June 30.' },
    { id: 'a5', system: 'Facebook page',      why: 'Messages from the page land in the shared inbox instead of being missed.',     status: 'pending', how: 'Settings → Page access → invite the NorthBeam business account.' },
    { id: 'a6', system: 'Old booking tool',   why: 'Not needed — we\'re replacing it, and history comes from the spreadsheet.',    status: 'skip',    how: 'Nothing to do here. It retires at launch.' }
  ],

  /* ---- forms ---------------------------------------------------------------------- */
  forms: [
    { id: 'f1', title: 'Business profile', taskId: 't1', blurb: 'How the clinic runs — this drives the whole configuration.',
      fields: [
        { id: 'q1', label: 'Clinic locations',                        type: 'text',   value: 'Riverside (main) + Northgate (Tue/Thu)', done: true },
        { id: 'q2', label: 'Services you offer',                      type: 'area',   value: 'Physiotherapy, sports massage, post-surgery rehab, pilates classes', done: true },
        { id: 'q3', label: 'How do new patients usually find you?',   type: 'area',   value: 'GP referrals mostly, then Google, then word of mouth', done: true },
        { id: 'q4', label: 'Roughly how many new enquiries a week?',  type: 'text',   value: '', done: false, hint: 'A guess is fine — it sizes the pipeline.' },
        { id: 'q5', label: 'What happens today when someone enquires?', type: 'area', value: '', done: false, hint: 'Walk us through it — phone rings, then what?' },
        { id: 'q6', label: 'Which insurance providers do you accept?', type: 'area',  value: '', done: false },
        { id: 'q7', label: 'Typical appointment length & price',      type: 'text',   value: '45 min · $95 initial, $70 follow-up', done: true },
        { id: 'q8', label: 'Your biggest admin headache right now',   type: 'area',   value: '', done: false, hint: 'Honest answers make better systems.' },
        { id: 'q9', label: 'Anything patients complain about?',       type: 'area',   value: '', done: false },
        { id: 'q10', label: 'What would make this project a win for you?', type: 'area', value: '', done: false }
      ] },
    { id: 'f2', title: 'Brand & tone', taskId: 't2', blurb: 'So every email and text sounds like Juniper.',
      fields: [
        { id: 'b1', label: 'Describe Juniper in three words',         type: 'text',   value: '', done: false, hint: 'e.g. warm, practical, unhurried' },
        { id: 'b2', label: 'How formal should messages be?',          type: 'text',   value: '', done: false, hint: '"Hi Sarah" or "Dear Ms. Chen"?' },
        { id: 'b3', label: 'Emojis: yes, sparingly, or never?',       type: 'text',   value: '', done: false },
        { id: 'b4', label: 'A phrase you always use with patients',   type: 'text',   value: '', done: false },
        { id: 'b5', label: 'A phrase you would never use',            type: 'text',   value: '', done: false },
        { id: 'b6', label: 'Sign-off (name, role, or just the clinic?)', type: 'text', value: '', done: false }
      ] }
  ],

  /* ---- documents -------------------------------------------------------------------- */
  docsShared: [
    { name: 'Proposal & scope (signed)',        type: 'PDF',  size: '420 KB', date: '2026-06-23', desc: 'What we\'re building, what it costs, what\'s not included.' },
    { name: 'Kickoff notes & recording link',   type: 'DOC',  size: '38 KB',  date: '2026-06-24', desc: 'Everything agreed on the call, in writing.' },
    { name: 'Project timeline (this portal is live too)', type: 'PDF', size: '180 KB', date: '2026-06-25', desc: 'The same plan you see here, as a one-page PDF for printing.' },
    { name: 'Records to review (12 flagged)',   type: 'XLSX', size: '26 KB',  date: '2026-07-04', desc: 'Sofia\'s spot-check list from the cleanup — task t4 on your list.' },
    { name: 'Twilio access guide',              type: 'PDF',  size: '210 KB', date: '2026-06-29', desc: 'Two minutes, four screenshots.' }
  ],
  docsNeeded: [
    { id: 'd1', name: 'Customer spreadsheet export', status: 'received', date: '2026-07-01', taskId: 't10',
      why: 'The source of truth for the migration.' },
    { id: 'd2', name: 'Logo pack (SVG or large PNG)', status: 'waiting', date: null, taskId: 't3',
      why: 'For the portal header, email templates and invoice branding.' },
    { id: 'd3', name: 'Price & services list',        status: 'waiting', date: null, taskId: null,
      why: 'So quotes and packages in the CRM match reality.' },
    { id: 'd4', name: 'Insurance providers you accept', status: 'received', date: '2026-06-30', taskId: null,
      why: 'Becomes the dropdown on every patient record.' },
    { id: 'd5', name: 'Staff list with roles',        status: 'waiting', date: null, taskId: 't8',
      why: 'Drives CRM logins and the training invite list.' }
  ],

  /* ---- approvals ------------------------------------------------------------------------ */
  approvals: [
    { id: 'ap1', title: 'Patient pipeline — six stages', status: 'waiting', taskId: 't5',
      blurb: 'Every enquiry moves left to right. Nothing gets lost between "they called" and "they\'re booked".',
      items: [
        ['New enquiry', 'Someone called, messaged or filled the form. Nothing done yet.'],
        ['Contacted', 'We\'ve spoken or left a message — waiting on them.'],
        ['Assessment booked', 'First appointment in the calendar.'],
        ['Assessment done', 'Seen once; treatment plan proposed.'],
        ['Plan accepted', 'They said yes — sessions scheduled.'],
        ['Active patient', 'In ongoing treatment. The goal column.']
      ] },
    { id: 'ap2', title: 'Custom fields — eight of them', status: 'approved', date: '2026-06-30', taskId: null,
      blurb: 'Approved June 30. Each field exists for a reason — no "misc" dumping grounds.',
      items: [
        ['Insurance provider', 'Dropdown — drives billing and the eligibility check.'],
        ['Preferred clinician', 'Keeps rebookings with the right person.'],
        ['Referral source', 'GP name or channel — powers the referral report.'],
        ['Preferred location', 'Riverside or Northgate.'],
        ['Next appointment', 'Feeds the reminder automation.'],
        ['Package sessions left', 'Counts down; alerts at 1 remaining.'],
        ['Consent to text', 'Legal requirement for reminders.'],
        ['Emergency contact', 'Standard clinic practice.']
      ] },
    { id: 'ap3', title: 'Email & text templates', status: 'waiting', taskId: 't6',
      blurb: 'Read them as a patient would. Approve, or tell us what feels off.',
      preview: {
        subject: 'Welcome to Juniper Physio 🌿 — here\'s what happens next',
        body: 'Hi {first name},\n\nThanks for booking your first assessment with us — {date} at {time}, {location} clinic.\n\nWhat to bring: comfortable clothes, your referral letter if you have one, and any scan reports.\n\nNeed to change the time? Just reply to this email or call the front desk.\n\nSee you soon,\nThe Juniper team',
        sms: 'Juniper Physio: reminder — your appointment is {day} at {time} ({location}). Reply C to confirm or call us to reschedule.'
      } }
  ],

  /* ---- meetings ---------------------------------------------------------------------------- */
  meetings: [
    { id: 'm1', title: 'Kickoff call',            date: '2026-06-24', time: '10:00', length: '45 min', status: 'done',
      who: ['p1', 'p2', 'p4', 'p5'], notes: 'Goals agreed: no lost enquiries, reminders that actually send, one system for both locations. Notes are in Documents.',
      agenda: ['Introductions & goals', 'The plan, phase by phase', 'What we need from you', 'Questions'] },
    { id: 'm2', title: 'Weekly check-in',         date: '2026-07-08', time: '09:30', length: '20 min', status: 'next',
      who: ['p1', 'p4'], agenda: ['Progress recap (5 min)', 'The two open approvals', 'Access items still pending', 'Anything worrying you'] },
    { id: 'm3', title: 'Migration review',        date: '2026-07-10', time: '14:00', length: '30 min', status: 'scheduled',
      who: ['p2', 'p4', 'p5'], agenda: ['Walk through the cleaned records', 'Your 12 flagged records', 'Green light for import'] },
    { id: 'm4', title: 'Team training',           date: '2026-07-21', time: '13:00', length: '90 min', status: 'scheduled',
      who: ['p3', 'p4', 'p5'], agenda: ['The daily routine, hands-on', 'Pipelines and follow-ups', 'The inbox and reminders', 'Q&A — recorded for anyone absent'] },
    { id: 'm5', title: 'Launch call',             date: '2026-07-28', time: '09:00', length: '30 min', status: 'scheduled',
      who: ['p1', 'p2', 'p3', 'p4', 'p5'], agenda: ['Final checks together', 'Switch the booking form live', 'Launch-week support plan'] }
  ],

  /* ---- updates feed -------------------------------------------------------------------------- */
  updates: [
    { id: 'u1', from: 'p2', at: '2026-07-04 16:20',
      text: 'Cleanup finished! Your 214 spreadsheet rows became 186 clean patient records — 19 duplicates merged, 9 rows that weren\'t patients archived (suppliers, a note-to-self, one header row pasted mid-sheet — happens to everyone). I\'ve flagged 12 records for your eyes; the list is in Documents and it\'s task #4 on your list.' },
    { id: 'u2', from: 'p1', at: '2026-07-03 11:05',
      text: 'Two approvals are ready for you: the six-stage patient pipeline and the reminder templates. Both are in Approvals with a big friendly button each. The moment they\'re approved, Eli starts building the automations.' },
    { id: 'u3', from: 'p3', at: '2026-07-01 09:40',
      text: 'Sneak peek: the 48-hour reminder text is drafted and waiting in Approvals. It sends between 9am and 7pm only — nobody gets woken at 6am by a physio clinic.' },
    { id: 'u4', from: 'p2', at: '2026-07-01 08:15',
      text: 'Spreadsheet received — thank you Maya! Starting the cleanup today. You\'ll get before/after numbers, not just "trust us, it\'s done".' },
    { id: 'u5', from: 'p1', at: '2026-06-30 17:30',
      text: 'Custom fields approved and built. Also: Stripe access came through, thanks. Still waiting on website admin, Twilio and the Facebook page — the Access list has one-line instructions for each.' },
    { id: 'u6', from: 'p1', at: '2026-06-25 10:00',
      text: 'Welcome to your project portal! Everything lives here: the plan, your to-dos, documents, approvals and this feed. Bookmark it on your phone too — it works there. Questions? Reply right below any update.' }
  ],

  faq: [
    { q: 'How much of my time will this take?',
      a: 'About 2–3 hours total across the whole project: two short forms, a few approvals, one review of your patient list, and the training session. The portal always shows exactly what\'s waiting on you — if your list is empty, you\'re free.' },
    { q: 'What happens to our old spreadsheet?',
      a: 'Nothing destructive. It gets archived untouched, and every record in the new CRM keeps a link back to the spreadsheet rows it came from, so anything can be audited later.' },
    { q: 'What if the cleanup merges two patients that are actually different people?',
      a: 'That\'s exactly what your review step is for — we flag every judgement call instead of guessing silently. And merges are reversible: the original rows are preserved.' },
    { q: 'Who owns the CRM account?',
      a: 'You do, from day one. It\'s created under your email, you hold the admin password, and we work as invited users you can remove at any time.' },
    { q: 'Will patients notice the switch?',
      a: 'Only in good ways: confirmations arrive promptly, reminders actually send, and nobody has to repeat their story because the notes are on their record.' },
    { q: 'What if something breaks after launch?',
      a: 'Launch week has same-day support, then a 30-day check-in. After that you\'re covered by the support terms in the proposal — and the written handover guide covers the common stuff.' },
    { q: 'Can we add things later (online payments, packages, a second form)?',
      a: 'Yes — the build is deliberately extendable. We\'d rather launch a solid core on time than a wobbly everything.' },
    { q: 'Is our patient data safe with you?',
      a: 'We work under the confidentiality terms in the proposal, access only the systems on your Access list, and you can revoke any of it in one click. Data never leaves your own accounts.' }
  ]
};
