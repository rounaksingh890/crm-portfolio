/* Spreadsheet Rescue — sample data.
   One fictional landscaping company: the messy spreadsheet they really ran on
   (rows below, mess preserved faithfully) and the clean CRM it became.
   Every stat on the page is computed from these records at render time.
   All names, numbers and typos are made up. */
window.MIG = {

  biz: {
    name: 'GreenSlate Lawn & Landscape',
    owner: 'Denise',
    line: 'A six-person landscaping crew that ran everything on one spreadsheet for four years.',
    sheetName: 'CUSTOMERS master FINAL v3 (2).xlsx'
  },

  /* ---- the spreadsheet, exactly as found ------------------------------- */
  columns: [
    { key: 'name',    letter: 'A', label: 'Customer Name' },
    { key: 'phone',   letter: 'B', label: 'Phone' },
    { key: 'email',   letter: 'C', label: 'Email' },
    { key: 'address', letter: 'D', label: 'Address / Job Site' },
    { key: 'status',  letter: 'E', label: 'Status' },
    { key: 'quote',   letter: 'F', label: 'Quote $' },
    { key: 'last',    letter: 'G', label: 'Last Contact' },
    { key: 'notes',   letter: 'H', label: 'NOTES' },
    { key: 'follow',  letter: 'I', label: 'FOLLOW UP???' }
  ],

  /* dupGroup ties duplicate rows together; archive marks non-customer rows.
     Everything else about a cell (bad phone, vague date…) is detected live. */
  rows: [
    { id: 1,  cells: { name: 'Bob & Carol Jenkins', phone: '(555) 301-4482', email: 'bjenkins52@gmail.com', address: '41 Fernwood Dr', status: 'repeat customer', quote: '2400', last: '3/14', notes: 'mow + mulch every year, gate code 4482, dog is friendly (Buster)', follow: '' }, dupGroup: 'g1' },
    { id: 2,  cells: { name: 'Angela Torres', phone: '555.887.2210', email: 'atorres.home@yahoo.com', address: '12 Birchwood Ln', status: 'weekly mow', quote: '45/wk', last: '6/29', notes: 'bills monthly, skip when raining, invoice #s live in QuickBooks', follow: '' } },
    { id: 3,  cells: { name: 'Maria Delgado-Ruiz', phone: '(555) 402-9917', email: 'mdelgadoruiz@gmial.com', address: '88 Sycamore Ct', status: 'HOT LEAD!!!', quote: 'TBD', last: '7/1', notes: 'wants full backyard redesign, budget "around 15k??", call back Tues', follow: '' }, dupGroup: 'g2' },
    { id: 4,  cells: { name: 'Hank Sobieski', phone: '555-119-0043 call after 5!!', email: '', address: '7 Quarry Rd', status: 'called - no answer x3', quote: '', last: '6/18', notes: 'referred by Jenkins', follow: '' } },
    { id: 5,  cells: { name: 'The Wilmots', phone: '(555) 640-2281', email: 'thewilmots@aol.com', address: '230 Lakeview Ter', status: 'scheduled for spring', quote: '3100', last: 'last spring', notes: 'sod + irrigation, HOA needs certificate of insurance!!', follow: '' } },
    { id: 6,  cells: { name: 'Dee Okafor', phone: '555 218 7754', email: 'dokafor@outlook.com; d.okafor@work-mail.com', address: '15 Alder St', status: 'Quoted - waiting', quote: '1,150??', last: '6/22', notes: 'tree trimming, neighbor may split cost (see row 18)', follow: '' } },
    { id: 7,  cells: { name: 'Tommy Nguyen', phone: '5559981123', email: '', address: '?? somewhere on Maple', status: 'left VM', quote: '', last: '5/30', notes: 'mow quote request from FB', follow: '' }, dupGroup: 'g3' },
    { id: 8,  cells: { name: 'Rosa & Neil Fairbanks', phone: '(555) 774-3308', email: 'rfairbanks@gmail.com', address: '9 Old Mill Rd', status: 'DONE', quote: '5200', last: '4/20', notes: 'patio job done, LOVED it, will refer', follow: 'ask for google review' } },
    { id: 9,  cells: { name: 'Curtis Boone', phone: '555-330-1969', email: 'cboone1969@hotmail.com', address: '77 Ridgecrest Dr', status: 'not interested (rude)', quote: '', last: '3/02', notes: 'price shopper', follow: '' } },
    { id: 10, cells: { name: 'Priya & Dev Patel', phone: '(555) 415-6690', email: 'patel.family@gmail.com', address: '5 Juniper Way', status: 'QUOTED 3/12', quote: '2,850', last: '3/12', notes: 'spring cleanup + mulch, want dark brown mulch NOT red!!!', follow: '' }, dupGroup: 'g4' },
    { id: 11, cells: { name: 'Glenn Harmaty', phone: '', email: 'gharmaty@gmail.com', address: '18 Cobbler Ln', status: 'hot', quote: '900', last: '6/30', notes: 'irrigation heads busted, wants fix before party 7/12', follow: 'THIS WEEK' } },
    { id: 12, cells: { name: 'S. Whitcomb', phone: '(555) 209-8841', email: '', address: '3 Dove Hollow', status: 'moved away', quote: '', last: '1/15', notes: 'sold the house, new owners might call?', follow: '' } },
    { id: 13, cells: { name: 'MULCH GUY - Big Earth Supply', phone: '(555) 999-0102', email: 'orders@bigearthsupply.com', address: '', status: '', quote: '', last: '', notes: 'supplier not customer!! bulk mulch $34/yd', follow: '' },
      archive: 'A supplier, not a customer — moved to a separate vendors list.' },
    { id: 14, cells: { name: 'JENKINS, ROBERT', phone: '5553014482', email: '', address: '41 Fernwood (same as above??)', status: 'DONE - PAID', quote: '$2,400', last: 'March 14', notes: 'paid cash for mulch, ask about aeration in fall', follow: 'YES - fall aeration!!' }, dupGroup: 'g1' },
    { id: 15, cells: { name: 'Yolanda Griggs', phone: '555.601.7743', email: 'ygriggs@gmail.com', address: '51 Bramble St', status: 'weekly mow', quote: '50/wk', last: '7/02', notes: 'gate sticks, lift latch UP not down', follow: '' } },
    { id: 16, cells: { name: 'Marcus & Jo Lindqvist', phone: '(555) 883-4152', email: 'lindqvist.home@gmail.com', address: '402 Heron Pt', status: 'quoted', quote: '7400', last: '6/27', notes: 'backyard regrade + sod, comparing 2 other bids', follow: '' } },
    { id: 17, cells: { name: "Fr. Dominic (St. Anne's)", phone: '(555) 727-9910', email: 'office@stannesparish.org', address: '600 Chapel Rd', status: 'repeat customer', quote: '4800', last: '6/15', notes: 'church grounds monthly contract, invoice to the parish office', follow: '' } },
    { id: 18, cells: { name: '(neighbor of Dee - tree)', phone: '', email: '', address: '17 Alder St', status: '??', quote: '', last: '', notes: 'might split Dee\'s tree job, name is Walt maybe?', follow: '' } },
    { id: 19, cells: { name: 'Tommy Nguyen', phone: '(555) 998-1123', email: 'tnguyen.mpls@gmail.com', address: '302 Maple Ave', status: 'warm-ish?', quote: '60', last: '6/12', notes: 'found the address, quoted $60/mow', follow: '' }, dupGroup: 'g3' },
    { id: 20, cells: { name: "DO NOT USE THIS TAB >>> SEE 'FINAL v3 (2)' TAB", phone: '', email: '', address: '', status: '', quote: '', last: '', notes: '', follow: '' },
      archive: 'A note someone typed into the data. Kept as a screenshot for posterity, removed from the records.' },
    { id: 21, cells: { name: 'Beatrice Hollow', phone: '(555) 512-3327', email: '', address: '240 Wren St', status: 'hot', quote: 'TBD', last: '7/3', notes: 'fall leaf cleanup + gutters, ALSO asked about snow contract $$$', follow: '' } },
    { id: 22, cells: { name: 'Maria D.', phone: '5554029917', email: 'mdelgadoruiz@gmail.com', address: '88 Sycamore', status: 'quoted', quote: '14,800', last: '2026-07-02', notes: 'sent design quote v2', follow: '' }, dupGroup: 'g2' },
    { id: 23, cells: { name: 'Ken Watts', phone: '5557408812', email: 'kwatts@kwattselectric.com', address: '31 Foundry Rd', status: 'done', quote: '1900', last: '5/22', notes: 'strip-mall beds at his office, NET 30, slow payer', follow: '' } },
    { id: 24, cells: { name: 'Patel (Juniper Way)', phone: '5554156690', email: '', address: '5 Juniper', status: 'scheduled', quote: '2850', last: '6/25', notes: 'booked for July 9am — CONFIRMED', follow: '' }, dupGroup: 'g4' },
    { id: 25, cells: { name: 'Lena Vogel', phone: '(555) 934-5546', email: 'lvogel.design@gmail.com', address: '12 Ashgrove Cir', status: 'scheduled', quote: '3600', last: '7/01', notes: 'mulch + edging July 15, park in street NOT driveway', follow: '' } },
    { id: 26, cells: { name: 'Otis Brandwine', phone: '555-118-2294', email: '', address: '4 Kettle Ct', status: 'left VM', quote: '', last: '6/26', notes: "heard us working next door at Vogel's", follow: '' } },
    { id: 27, cells: { name: 'tommy n (maple ave)', phone: '', email: 'tnguyen.mpls@gmail.com', address: '302 maple', status: '??', quote: '', last: '', notes: 'did anyone call him back???', follow: '' }, dupGroup: 'g3' },
    { id: 28, cells: { name: 'Harriet & Paul Ngo', phone: '(555) 660-4419', email: 'ngo.household@gmail.com', address: '89 Larkspur Ln', status: 'QUOTED', quote: '5,750', last: '6/29', notes: 'full front-yard redo, want a start date before August', follow: '' } },
    { id: 29, cells: { name: 'Customer Name', phone: 'Phone', email: 'Email', address: 'Address / Job Site', status: 'Status', quote: 'Quote $', last: 'Last Contact', notes: 'NOTES', follow: '' },
      archive: 'The header row, pasted again halfway down the sheet. It happens more than you\'d think.' },
    { id: 30, cells: { name: 'Dana Whitfield-Okoye', phone: '(555) 344-7781', email: 'dwokoye@gmail.com', address: '7 Pemberly Ave', status: '??', quote: '', last: '7/4', notes: 'just called!! wants an estimate for hedge removal + privacy trees', follow: 'CALL BACK FRIDAY' } }
  ],

  /* ---- the clean CRM ----------------------------------------------------- */
  stages: [
    { id: 'new',       label: 'New lead',        color: '#4f7cd1' },
    { id: 'contacted', label: 'Contacted',       color: '#8067dc' },
    { id: 'quoted',    label: 'Quoted',          color: '#f5a623' },
    { id: 'scheduled', label: 'Scheduled',       color: '#00a4bd' },
    { id: 'active',    label: 'Active customer', color: '#00bda5' },
    { id: 'past',      label: 'Past customer',   color: '#7c98b6' },
    { id: 'lost',      label: 'Not a fit',       color: '#c2586b' }
  ],

  /* how eighteen kinds of chaos became seven honest stages */
  statusMap: [
    { from: 'HOT LEAD!!!',            to: 'new',       note: 'Excitement is not a stage.' },
    { from: 'hot',                    to: 'new' },
    { from: '?? (or left blank)',     to: 'new',       note: 'Reviewed by hand, one row at a time.' },
    { from: 'called - no answer x3',  to: 'contacted', note: 'The "x3" became three logged call attempts.' },
    { from: 'left VM',                to: 'contacted' },
    { from: 'warm-ish?',              to: 'contacted' },
    { from: 'quoted',                 to: 'quoted' },
    { from: 'Quoted - waiting',       to: 'quoted' },
    { from: 'QUOTED',                 to: 'quoted' },
    { from: 'QUOTED 3/12',            to: 'quoted',    note: 'The date moved to the quote record where it belongs.' },
    { from: 'scheduled',              to: 'scheduled' },
    { from: 'scheduled for spring',   to: 'scheduled', note: '"Spring" became an actual date.' },
    { from: 'done',                   to: 'past' },
    { from: 'DONE',                   to: 'past' },
    { from: 'DONE - PAID',            to: 'past',      note: 'Payment status became its own field.' },
    { from: 'moved away',             to: 'past' },
    { from: 'repeat customer',        to: 'active' },
    { from: 'weekly mow',             to: 'active',    note: 'The service and its price got their own fields.' },
    { from: 'not interested (rude)',  to: 'lost',      note: 'The editorial stayed in the notes.' }
  ],

  /* spreadsheet column → CRM fields */
  columnMap: [
    { from: 'A · Customer Name',      to: 'First name + Last name (+ household flag)', type: 'Text',
      how: 'Split and title-cased. "JENKINS, ROBERT" and "Bob & Carol Jenkins" turned out to be one household.' },
    { from: 'B · Phone',              to: 'Phone',                                     type: 'Phone',
      how: 'Every format normalised to (555) 000-0000. "Call after 5!!" moved to the contact\'s notes, where it still helps.' },
    { from: 'C · Email',              to: 'Email (+ second email where found)',        type: 'Email',
      how: 'Lowercased, typo domains fixed (gmial → gmail), two-in-one-cell emails split into their own fields.' },
    { from: 'D · Address / Job Site', to: 'Street address',                            type: 'Address',
      how: 'Completed from other rows where partial ("88 Sycamore" → "88 Sycamore Ct"). Guesses flagged, not silently kept.' },
    { from: 'E · Status',             to: 'Pipeline stage',                            type: 'Dropdown (7 choices)',
      how: '19 different spellings of enthusiasm mapped to 7 stages — the full table is below.' },
    { from: 'F · Quote $',            to: 'Quote amount (+ recurring price field)',    type: 'Currency',
      how: '"2,400??", "$2,400" and "2400" all became 2400. "45/wk" became a proper recurring price. "TBD" became a task to send the quote.' },
    { from: 'G · Last Contact',       to: 'Last contact date',                         type: 'Date',
      how: '"3/14", "March 14" and "2026-03-14" agreed for once. "Last spring" got a real date from the invoice history.' },
    { from: 'H · NOTES + I · FOLLOW UP???', to: 'Timeline notes + Next action with a due date', type: 'Notes / Tasks',
      how: 'Gate codes, dog names and mulch-color ultimatums kept as notes. Every "FOLLOW UP!!!" became a task with an owner and a date.' }
  ],

  /* 22 clean contacts. sourceRows ties each one back to the sheet. */
  contacts: [
    { id: 'C1',  name: 'Robert & Carol Jenkins', first: 'Robert', last: 'Jenkins', household: true,
      phone: '(555) 301-4482', email: 'bjenkins52@gmail.com', address: '41 Fernwood Dr',
      stage: 'active', service: 'Annual mulch + mowing', dealAmount: 2400, dealLabel: '$2,400 · won, paid',
      lastContact: '2026-03-14', nextAction: 'Offer fall aeration in September', sourceRows: [1, 14],
      fixes: [
        { field: 'Duplicates', from: 'Row 1 ("Bob & Carol Jenkins") + row 14 ("JENKINS, ROBERT")', to: 'One household record' },
        { field: 'Follow-up', from: '"YES - fall aeration!!" in column I', to: 'A dated task for September' },
        { field: 'Notes', from: 'Gate code + dog\'s name buried in one cell', to: 'Kept — now on the record where the crew sees it' } ] },
    { id: 'C2',  name: 'Angela Torres', first: 'Angela', last: 'Torres',
      phone: '(555) 887-2210', email: 'atorres.home@yahoo.com', address: '12 Birchwood Ln',
      stage: 'active', service: 'Weekly mowing', dealAmount: null, dealLabel: '$45 per week, billed monthly', weekly: 45,
      lastContact: '2026-06-29', nextAction: '—', sourceRows: [2],
      fixes: [
        { field: 'Phone', from: '555.887.2210', to: '(555) 887-2210' },
        { field: 'Quote $', from: '"45/wk" in a currency column', to: 'A recurring-price field the invoices read from' } ] },
    { id: 'C3',  name: 'Maria Delgado-Ruiz', first: 'Maria', last: 'Delgado-Ruiz',
      phone: '(555) 402-9917', email: 'mdelgadoruiz@gmail.com', address: '88 Sycamore Ct',
      stage: 'quoted', service: 'Full backyard redesign', dealAmount: 14800, dealLabel: '$14,800 quote sent (v2)',
      lastContact: '2026-07-02', nextAction: 'Follow up on design quote v2', sourceRows: [3, 22],
      fixes: [
        { field: 'Duplicates', from: 'Row 3 + row 22 ("Maria D."), different phone formats', to: 'One record' },
        { field: 'Email', from: 'mdelgadoruiz@gmial.com', to: 'mdelgadoruiz@gmail.com' },
        { field: 'Quote', from: '"TBD" then "14,800" on separate rows', to: 'One quote with version history' } ] },
    { id: 'C4',  name: 'Hank Sobieski', first: 'Hank', last: 'Sobieski',
      phone: '(555) 119-0043', email: '', address: '7 Quarry Rd',
      stage: 'contacted', service: 'Not scoped yet', dealAmount: null, dealLabel: '—',
      lastContact: '2026-06-18', nextAction: 'Call after 5pm (three earlier tries logged)', sourceRows: [4],
      fixes: [
        { field: 'Phone', from: '"555-119-0043 call after 5!!"', to: 'A clean number — and "after 5pm" saved as a call preference' },
        { field: 'Status', from: '"called - no answer x3"', to: 'Contacted, with 3 call attempts actually logged' } ] },
    { id: 'C5',  name: 'The Wilmot Family', first: 'Grant', last: 'Wilmot', household: true,
      phone: '(555) 640-2281', email: 'thewilmots@aol.com', address: '230 Lakeview Ter',
      stage: 'scheduled', service: 'Sod + irrigation install', dealAmount: 3100, dealLabel: '$3,100 · booked',
      lastContact: '2026-04-02', nextAction: 'Send certificate of insurance to the HOA before work starts', sourceRows: [5],
      fixes: [
        { field: 'Date', from: '"last spring"', to: 'April 2, 2026 — recovered from the quote email' },
        { field: 'Follow-up', from: 'HOA requirement shouting from the notes cell', to: 'A blocking task on the job' } ] },
    { id: 'C6',  name: 'Dee Okafor', first: 'Dee', last: 'Okafor',
      phone: '(555) 218-7754', email: 'dokafor@outlook.com', email2: 'd.okafor@work-mail.com', address: '15 Alder St',
      stage: 'quoted', service: 'Tree trimming', dealAmount: 1150, dealLabel: '$1,150 quote, waiting',
      lastContact: '2026-06-22', nextAction: 'Ask if the neighbor (Walt, 17 Alder) wants to split the job', sourceRows: [6],
      fixes: [
        { field: 'Email', from: 'Two emails jammed in one cell', to: 'Primary + secondary email fields' },
        { field: 'Quote $', from: '"1,150??"', to: '$1,150 — the question marks became a follow-up task' } ] },
    { id: 'C7',  name: 'Tommy Nguyen', first: 'Tommy', last: 'Nguyen',
      phone: '(555) 998-1123', email: 'tnguyen.mpls@gmail.com', address: '302 Maple Ave',
      stage: 'quoted', service: 'Weekly mowing', dealAmount: null, dealLabel: '$60 per mow, quoted', weekly: 60,
      lastContact: '2026-06-12', nextAction: 'Call him back — row 27 asked "did anyone call him back???" Nobody had.', sourceRows: [7, 19, 27],
      fixes: [
        { field: 'Duplicates', from: 'Three rows, added on three different days', to: 'One record with the full story' },
        { field: 'Address', from: '"?? somewhere on Maple" / "302 maple"', to: '302 Maple Ave' },
        { field: 'The catch', from: 'A follow-up question typed into the sheet that no one answered', to: 'An assigned task with a due date' } ] },
    { id: 'C8',  name: 'Rosa & Neil Fairbanks', first: 'Rosa', last: 'Fairbanks', household: true,
      phone: '(555) 774-3308', email: 'rfairbanks@gmail.com', address: '9 Old Mill Rd',
      stage: 'past', service: 'Patio build', dealAmount: 5200, dealLabel: '$5,200 · won',
      lastContact: '2026-04-20', nextAction: 'Ask for a Google review (they offered!)', sourceRows: [8],
      fixes: [
        { field: 'Follow-up', from: '"ask for google review" sitting in column I since April', to: 'A task — the easiest five-star review never asked for' } ] },
    { id: 'C9',  name: 'Curtis Boone', first: 'Curtis', last: 'Boone',
      phone: '(555) 330-1969', email: 'cboone1969@hotmail.com', address: '77 Ridgecrest Dr',
      stage: 'lost', service: '—', dealAmount: null, dealLabel: '—',
      lastContact: '2026-03-02', nextAction: '—', sourceRows: [9],
      fixes: [
        { field: 'Status', from: '"not interested (rude)"', to: 'Not a fit — the commentary stayed in the notes' } ] },
    { id: 'C10', name: 'Priya & Dev Patel', first: 'Priya', last: 'Patel', household: true,
      phone: '(555) 415-6690', email: 'patel.family@gmail.com', address: '5 Juniper Way',
      stage: 'scheduled', service: 'Spring cleanup + mulch', dealAmount: 2850, dealLabel: '$2,850 · booked July 9am',
      lastContact: '2026-06-25', nextAction: 'Confirm dark brown mulch on the truck — NOT red', sourceRows: [10, 24],
      fixes: [
        { field: 'Duplicates', from: 'Row 10 (the quote) + row 24 (the booking)', to: 'One record, one job, two milestones' },
        { field: 'Detail that matters', from: 'Mulch-color ultimatum in caps', to: 'A checklist item on the work order' } ] },
    { id: 'C11', name: 'Glenn Harmaty', first: 'Glenn', last: 'Harmaty',
      phone: '(555) 726-1108', email: 'gharmaty@gmail.com', address: '18 Cobbler Ln',
      stage: 'quoted', service: 'Irrigation repair', dealAmount: 900, dealLabel: '$900 quote — party deadline July 12',
      lastContact: '2026-06-30', nextAction: 'Schedule this week (his words: THIS WEEK)', sourceRows: [11],
      fixes: [
        { field: 'Phone', from: 'Empty cell', to: 'Recovered from his email signature' },
        { field: 'Urgency', from: '"THIS WEEK" in column I', to: 'A dated task at the top of the list' } ] },
    { id: 'C12', name: 'Sandra Whitcomb', first: 'Sandra', last: 'Whitcomb',
      phone: '(555) 209-8841', email: '', address: '3 Dove Hollow',
      stage: 'past', service: 'Seasonal cleanups (2023–25)', dealAmount: null, dealLabel: '—',
      lastContact: '2026-01-15', nextAction: 'Doorhanger for the new owners of 3 Dove Hollow', sourceRows: [12],
      fixes: [
        { field: 'Name', from: '"S. Whitcomb"', to: 'Sandra Whitcomb — from the invoice history' },
        { field: 'Opportunity', from: '"new owners might call?" as a shrug', to: 'A marketing task with an address attached' } ] },
    { id: 'C13', name: 'Yolanda Griggs', first: 'Yolanda', last: 'Griggs',
      phone: '(555) 601-7743', email: 'ygriggs@gmail.com', address: '51 Bramble St',
      stage: 'active', service: 'Weekly mowing', dealAmount: null, dealLabel: '$50 per week', weekly: 50,
      lastContact: '2026-07-02', nextAction: '—', sourceRows: [15],
      fixes: [
        { field: 'Crew knowledge', from: '"gate sticks, lift latch UP" in a cell nobody reads', to: 'A site note that prints on the route sheet' } ] },
    { id: 'C14', name: 'Marcus & Jo Lindqvist', first: 'Marcus', last: 'Lindqvist', household: true,
      phone: '(555) 883-4152', email: 'lindqvist.home@gmail.com', address: '402 Heron Pt',
      stage: 'quoted', service: 'Backyard regrade + sod', dealAmount: 7400, dealLabel: '$7,400 quote — competitive bid',
      lastContact: '2026-06-27', nextAction: 'Check in before their other two bids land', sourceRows: [16],
      fixes: [
        { field: 'Context', from: '"comparing 2 other bids" as trivia', to: 'A deal flag that changes how fast we follow up' } ] },
    { id: 'C15', name: "St. Anne's Parish (Fr. Dominic)", first: 'Dominic', last: "— St. Anne's",
      phone: '(555) 727-9910', email: 'office@stannesparish.org', address: '600 Chapel Rd',
      stage: 'active', service: 'Grounds contract, monthly', dealAmount: null, dealLabel: '$400 per month, invoiced to the office', monthly: 400,
      lastContact: '2026-06-15', nextAction: '—', sourceRows: [17],
      fixes: [
        { field: 'Record type', from: 'A person and an organisation sharing one cell', to: 'An organisation record with Fr. Dominic as the contact' },
        { field: 'Quote $', from: '"4800" (the yearly number, undocumented)', to: '$400/month recurring — same money, no guessing' } ] },
    { id: 'C16', name: 'Walt (17 Alder St)', first: 'Walt', last: '— surname unknown',
      phone: '', email: '', address: '17 Alder St',
      stage: 'new', service: 'Possible tree-job split with Dee Okafor', dealAmount: null, dealLabel: '—',
      lastContact: '', nextAction: 'Knock on the door while quoting Dee\'s job — get his details', sourceRows: [18],
      fixes: [
        { field: 'Honesty', from: '"(neighbor of Dee - tree)" with no contact info', to: 'Kept as a real lead — incomplete, but with a plan to complete it' } ] },
    { id: 'C17', name: 'Beatrice Hollow', first: 'Beatrice', last: 'Hollow',
      phone: '(555) 512-3327', email: '', address: '240 Wren St',
      stage: 'new', service: 'Fall cleanup + gutters (+ snow?)', dealAmount: null, dealLabel: 'Quote not sent yet',
      lastContact: '2026-07-03', nextAction: 'Send the fall quote — and mention the snow contract she asked about', sourceRows: [21],
      fixes: [
        { field: 'Quote $', from: '"TBD"', to: 'A task to actually send it, instead of a placeholder that sat there' },
        { field: 'Upsell', from: '"snow contract $$$" buried in notes', to: 'A tagged opportunity for the September snow push' } ] },
    { id: 'C18', name: 'Ken Watts', first: 'Ken', last: 'Watts',
      phone: '(555) 740-8812', email: 'kwatts@kwattselectric.com', address: '31 Foundry Rd',
      stage: 'past', service: 'Commercial bed install', dealAmount: 1900, dealLabel: '$1,900 · won, NET 30',
      lastContact: '2026-05-22', nextAction: '—', sourceRows: [23],
      fixes: [
        { field: 'Payment terms', from: '"NET 30, slow payer" as gossip', to: 'Payment terms on the record; invoices now flag when he\'s late' } ] },
    { id: 'C19', name: 'Lena Vogel', first: 'Lena', last: 'Vogel',
      phone: '(555) 934-5546', email: 'lvogel.design@gmail.com', address: '12 Ashgrove Cir',
      stage: 'scheduled', service: 'Mulch + edging', dealAmount: 3600, dealLabel: '$3,600 · booked July 15',
      lastContact: '2026-07-01', nextAction: 'Route sheet: park in the street, not the driveway', sourceRows: [25],
      fixes: [
        { field: 'Site rule', from: 'Parking instructions in the notes cell', to: 'On the work order the crew actually opens' } ] },
    { id: 'C20', name: 'Otis Brandwine', first: 'Otis', last: 'Brandwine',
      phone: '(555) 118-2294', email: '', address: '4 Kettle Ct',
      stage: 'contacted', service: 'Not scoped yet', dealAmount: null, dealLabel: '—',
      lastContact: '2026-06-26', nextAction: 'Call back — he watched us work next door, warmest kind of lead', sourceRows: [26],
      fixes: [
        { field: 'Source', from: '"heard us next door at Vogel\'s" in notes', to: 'Lead source: neighbor referral — now it shows up in reporting' } ] },
    { id: 'C21', name: 'Harriet & Paul Ngo', first: 'Harriet', last: 'Ngo', household: true,
      phone: '(555) 660-4419', email: 'ngo.household@gmail.com', address: '89 Larkspur Ln',
      stage: 'quoted', service: 'Front-yard redo', dealAmount: 5750, dealLabel: '$5,750 quote — wants to start before August',
      lastContact: '2026-06-29', nextAction: 'Confirm crew availability for a July start, then call', sourceRows: [28],
      fixes: [
        { field: 'Deadline', from: '"before August" as a hope in the notes', to: 'A close date on the deal — it drives the follow-up' } ] },
    { id: 'C22', name: 'Dana Whitfield-Okoye', first: 'Dana', last: 'Whitfield-Okoye',
      phone: '(555) 344-7781', email: 'dwokoye@gmail.com', address: '7 Pemberly Ave',
      stage: 'new', service: 'Hedge removal + privacy trees', dealAmount: null, dealLabel: 'Estimate visit to book',
      lastContact: '2026-07-04', nextAction: 'Call back Friday — she asked for exactly that', sourceRows: [30],
      fixes: [
        { field: 'Status', from: '"??"', to: 'New lead — reviewed by hand like every other mystery row' },
        { field: 'Follow-up', from: '"CALL BACK FRIDAY" in caps', to: 'A task, due Friday, assigned to Denise' } ] }
  ],

  /* the honest 5-step method — shown at the end */
  process: [
    { title: 'Look before touching', text: 'A read-only pass over the whole sheet first. Every migration decision here — merges, mappings, what to archive — was written down before a single cell changed.' },
    { title: 'Map every column', text: 'Each spreadsheet column gets a real field with a real type, or an honest reason it doesn\'t. Nothing lands in a "misc" dumping ground.' },
    { title: 'Merge people, not rows', text: 'Duplicates get merged by evidence — same phone, same address, same story — and every merge stays traceable back to its source rows.' },
    { title: 'Turn shouting into tasks', text: 'Every "FOLLOW UP!!!" and "THIS WEEK" becomes a task with an owner and a date. That\'s the difference between a spreadsheet and a system.' },
    { title: 'Keep the archaeology', text: 'The original sheet is preserved untouched. Every clean record links back to the rows it came from — you can audit any decision, forever.' }
  ]
};
