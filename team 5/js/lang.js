/* =====================================================
   LAKSHMI TEXTILE — MULTILINGUAL DICTIONARY
   Languages: English (en), Hindi (hi), Telugu (te)
   ===================================================== */

const LANG_DATA = {
  en: {
    /* ── App Shell ── */
    'app.name':          'Lakshmi Textile',
    'app.tagline':       'Smart Inventory Management',
    'login.title':       'Welcome Back',
    'login.subtitle':    'Select your role and enter your PIN to continue',
    'login.role.label':  'Select Role',
    'login.pin.label':   'Enter 4-Digit PIN',
    'login.btn':         'Login',
    'login.error':       'Incorrect PIN. Please try again.',
    'logout':            'Logout',

    /* ── Roles ── */
    'role.owner':        'Malik (Owner)',
    'role.sales':        'Counter Staff',
    'role.godown':       'Godown Staff',

    /* ── Navigation ── */
    'nav.dashboard':     '📊 Dashboard',
    'nav.billing':       '🏪 Dukaan Billing',
    'nav.stock':         '📦 Stock Manager',
    'nav.supplier':      '🤝 Vyapaari',
    'nav.calculators':   '🧮 Calculators',
    'nav.reports':       '📈 Reports',

    /* ── Dashboard ── */
    'dash.title':        'Business Dashboard',
    'dash.subtitle':     'Real-time overview of Lakshmi Textile',
    'dash.total.earn':   'Lifetime Earnings (Kul Kamaai)',
    'dash.month.earn':   'This Month\'s Sales',
    'dash.net.profit':   'Net Profit (Shuddh Munafa)',
    'dash.stock.val':    'Stock Value (Godown Maal)',
    'dash.wastage':      'Wastage Loss (Nuksan)',
    'dash.orders':       'Active Orders',
    'dash.low.stock':    'Low Stock Alerts',
    'dash.recent.sales': 'Recent Sales',
    'dash.target':       'Monthly Target',

    /* ── Stock ── */
    'stock.title':       'Stock Manager',
    'stock.subtitle':    'Manage Godown & Dukaan inventory',
    'stock.godown':      'Godown (Warehouse)',
    'stock.dukaan':      'Dukaan (Shop Floor)',
    'stock.all':         'All Items',
    'stock.add.item':    '+ Add New Item',
    'stock.search':      'Search item, fabric, color...',
    'stock.move':        'Move to Dukaan',
    'stock.wastage.log': 'Log Kharaab Maal (Wastage)',
    'stock.col.item':    'Item Name',
    'stock.col.cat':     'Category',
    'stock.col.qty':     'Quantity',
    'stock.col.unit':    'Unit',
    'stock.col.buy':     'Buy Price (₹)',
    'stock.col.sell':    'Sell Price (₹)',
    'stock.col.loc':     'Location',
    'stock.col.status':  'Status',
    'stock.col.action':  'Action',
    'stock.status.ok':   '✅ Normal',
    'stock.status.low':  '⚠️ Kam Stock',
    'stock.status.out':  '🔴 Khatam',
    'stock.godown.to.dukaan': 'Transfer Godown → Dukaan',
    'stock.qty.update':  'Stock Updated!',

    /* ── Billing ── */
    'billing.title':     'Dukaan Billing (Counter POS)',
    'billing.subtitle':  'Select item, enter quantity, and generate bill',
    'billing.select.cat':'Select Category',
    'billing.select.item':'Select Item',
    'billing.qty':       'Quantity / Meters',
    'billing.add':       'Add to Bill',
    'billing.bill':      'Current Bill',
    'billing.subtotal':  'Subtotal',
    'billing.gst':       'GST (5%)',
    'billing.total':     'Total Amount',
    'billing.sell':      '✅ Maal Becha (Complete Sale)',
    'billing.clear':     '🗑️ Clear Bill',
    'billing.empty':     'No items added yet',
    'billing.success':   'Sale completed! Stock updated.',

    /* ── Supplier ── */
    'supplier.title':    'Vyapaari Hub',
    'supplier.subtitle': 'Manage suppliers and track incoming orders',
    'supplier.add':      '+ Add Vyapaari',
    'supplier.dir':      'Vyapaari Directory',
    'supplier.orders':   'Order Pipeline',
    'supplier.history':  'Order History',
    'supplier.whatsapp': '📱 WhatsApp',
    'supplier.new.order':'📝 Khareedi Order',
    'supplier.col.vya':  'Vyapaari',
    'supplier.col.item': 'Item',
    'supplier.col.qty':  'Quantity',
    'supplier.col.cost': 'Cost (₹)',
    'supplier.col.date': 'Order Date',
    'supplier.col.status':'Status',
    'supplier.pending':  '🟠 Pending',
    'supplier.transit':  '🔵 In Transit',
    'supplier.delivered':'🟢 Delivered',
    'supplier.receive':  '✅ Maal Mila (Receive Stock)',
    'supplier.mark.transit':'🚚 Mark In Transit',

    /* ── Calculators ── */
    'calc.title':        'Hisab-Kitaab (Calculators)',
    'calc.subtitle':     'Smart tools for textile business decisions',
    'calc.kamaai.title': '💰 Kamaai Calculator (Profit Margin)',
    'calc.kamaai.desc':  'Find the right selling price for maximum profit',
    'calc.kamaai.buy':   'Khareedi Daam (Buy Price) ₹',
    'calc.kamaai.overhead':'Transport/Overhead Cost ₹',
    'calc.kamaai.margin':'Desired Kamaai (Margin %)',
    'calc.kamaai.result.sell':'Bikri Daam (Sell Price) ₹',
    'calc.kamaai.result.profit':'Net Profit per Unit ₹',
    'calc.kamaai.result.markup':'Markup %',
    'calc.kamaai.result.gst':'With GST (5%) ₹',

    'calc.gsm.title':    '📏 Than Yield Calculator (GSM to Meters)',
    'calc.gsm.desc':     'Convert fabric roll weight to estimated meters',
    'calc.gsm.weight':   'Roll Weight (Kg)',
    'calc.gsm.width':    'Fabric Width (cm)',
    'calc.gsm.gsm':      'GSM (Grams per sq. meter)',
    'calc.gsm.result':   'Estimated Length (Meters)',

    'calc.season.title': '🌸 Mausam Predictor (Seasonal Stock)',
    'calc.season.desc':  'Plan how much stock to order for upcoming season',
    'calc.season.sales': 'Last Month Sales (Units/Meters)',
    'calc.season.season':'Select Season / Festival',
    'calc.season.result':'Recommended Order Quantity',

    'calc.waste.title':  '⚠️ Kharaab Maal Calculator (Wastage Loss)',
    'calc.waste.desc':   'Calculate how much profit is lost due to wastage',
    'calc.waste.meters': 'Wasted Fabric (Meters)',
    'calc.waste.cost':   'Cost Price per Meter ₹',
    'calc.waste.sales':  'Total Monthly Sales ₹',
    'calc.waste.result.loss':'Total Wastage Loss ₹',
    'calc.waste.result.pct': 'Loss as % of Sales',

    /* ── Reports ── */
    'report.title':      'Reports & Analytics',
    'report.subtitle':   'Business performance insights',
    'report.sales.trend':'Sales vs Expense Trend',
    'report.stock.dist': 'Stock Value Distribution',
    'report.profit.cat': 'Profit by Category',
    'report.supplier.spend':'Spend by Vyapaari',
    'report.order.hist': 'Order History Chart',

    /* ── Common ── */
    'common.save':       'Save',
    'common.cancel':     'Cancel',
    'common.delete':     'Delete',
    'common.edit':       'Edit',
    'common.add':        'Add',
    'common.close':      'Close',
    'common.confirm':    'Confirm',
    'common.search':     'Search...',
    'common.no.data':    'No data available',
    'common.rupee':      '₹',
    'common.meters':     'Meters',
    'common.kg':         'Kg',
    'common.pcs':        'Pieces',
    'common.export':     '📥 Export Backup',
    'common.import':     '📤 Import Backup',
    'common.total':      'Total',
    'common.date':       'Date',
    'common.name':       'Name',
  },

  hi: {
    /* ── App Shell ── */
    'app.name':          'लक्ष्मी टेक्सटाइल',
    'app.tagline':       'स्मार्ट इन्वेंट्री मैनेजमेंट',
    'login.title':       'स्वागत है',
    'login.subtitle':    'अपनी भूमिका चुनें और PIN डालें',
    'login.role.label':  'भूमिका चुनें',
    'login.pin.label':   '4 अंकों का PIN डालें',
    'login.btn':         'लॉगिन',
    'login.error':       'गलत PIN। कृपया फिर कोशिश करें।',
    'logout':            'लॉगआउट',

    /* ── Roles ── */
    'role.owner':        '👑 मालिक',
    'role.sales':        '🏪 काउंटर स्टाफ',
    'role.godown':       '📦 गोदाम स्टाफ',

    /* ── Navigation ── */
    'nav.dashboard':     '📊 डैशबोर्ड',
    'nav.billing':       '🏪 दुकान बिलिंग',
    'nav.stock':         '📦 स्टॉक मैनेजर',
    'nav.supplier':      '🤝 व्यापारी',
    'nav.calculators':   '🧮 कैलकुलेटर',
    'nav.reports':       '📈 रिपोर्ट',

    /* ── Dashboard ── */
    'dash.title':        'व्यापार डैशबोर्ड',
    'dash.subtitle':     'लक्ष्मी टेक्सटाइल की लाइव जानकारी',
    'dash.total.earn':   'कुल कमाई (सभी समय)',
    'dash.month.earn':   'इस महीने की बिक्री',
    'dash.net.profit':   'शुद्ध मुनाफ़ा',
    'dash.stock.val':    'गोदाम माल मूल्य',
    'dash.wastage':      'नुकसान (ख़राब माल)',
    'dash.orders':       'चल रहे ऑर्डर',
    'dash.low.stock':    'कम स्टॉक अलर्ट',
    'dash.recent.sales': 'हाल की बिक्री',
    'dash.target':       'मासिक लक्ष्य',

    /* ── Stock ── */
    'stock.title':       'स्टॉक मैनेजर',
    'stock.subtitle':    'गोदाम और दुकान का इन्वेंट्री देखें',
    'stock.godown':      'गोदाम (वेयरहाउस)',
    'stock.dukaan':      'दुकान (शॉप)',
    'stock.all':         'सभी आइटम',
    'stock.add.item':    '+ नया आइटम जोड़ें',
    'stock.search':      'आइटम, कपड़ा, रंग खोजें...',
    'stock.move':        'दुकान में भेजें',
    'stock.wastage.log': 'ख़राब माल लॉग करें',
    'stock.col.item':    'आइटम का नाम',
    'stock.col.cat':     'श्रेणी',
    'stock.col.qty':     'मात्रा',
    'stock.col.unit':    'यूनिट',
    'stock.col.buy':     'खरीद मूल्य (₹)',
    'stock.col.sell':    'बिक्री मूल्य (₹)',
    'stock.col.loc':     'स्थान',
    'stock.col.status':  'स्थिति',
    'stock.col.action':  'कार्रवाई',
    'stock.status.ok':   '✅ ठीक है',
    'stock.status.low':  '⚠️ कम स्टॉक',
    'stock.status.out':  '🔴 खत्म',
    'stock.godown.to.dukaan':'गोदाम → दुकान ट्रांसफर',
    'stock.qty.update':  'स्टॉक अपडेट हो गया!',

    /* ── Billing ── */
    'billing.title':     'दुकान बिलिंग (काउंटर POS)',
    'billing.subtitle':  'आइटम चुनें, मात्रा डालें, बिल बनाएं',
    'billing.select.cat':'श्रेणी चुनें',
    'billing.select.item':'आइटम चुनें',
    'billing.qty':       'मात्रा / मीटर',
    'billing.add':       'बिल में जोड़ें',
    'billing.bill':      'चालू बिल',
    'billing.subtotal':  'उप-कुल',
    'billing.gst':       'GST (5%)',
    'billing.total':     'कुल रकम',
    'billing.sell':      '✅ माल बेचा (बिक्री पूरी)',
    'billing.clear':     '🗑️ बिल साफ करें',
    'billing.empty':     'अभी कोई आइटम नहीं जोड़ा',
    'billing.success':   'बिक्री पूरी! स्टॉक अपडेट हो गया।',

    /* ── Supplier ── */
    'supplier.title':    'व्यापारी हब',
    'supplier.subtitle': 'व्यापारियों से संपर्क करें और ऑर्डर ट्रैक करें',
    'supplier.add':      '+ व्यापारी जोड़ें',
    'supplier.dir':      'व्यापारी सूची',
    'supplier.orders':   'ऑर्डर पाइपलाइन',
    'supplier.history':  'ऑर्डर इतिहास',
    'supplier.whatsapp': '📱 WhatsApp',
    'supplier.new.order':'📝 खरीदी ऑर्डर',
    'supplier.col.vya':  'व्यापारी',
    'supplier.col.item': 'आइटम',
    'supplier.col.qty':  'मात्रा',
    'supplier.col.cost': 'लागत (₹)',
    'supplier.col.date': 'तारीख',
    'supplier.col.status':'स्थिति',
    'supplier.pending':  '🟠 पेंडिंग',
    'supplier.transit':  '🔵 रास्ते में',
    'supplier.delivered':'🟢 मिल गया',
    'supplier.receive':  '✅ माल मिला (स्टॉक जोड़ें)',
    'supplier.mark.transit':'🚚 रास्ते में करें',

    /* ── Calculators ── */
    'calc.title':        'हिसाब-किताब (कैलकुलेटर)',
    'calc.subtitle':     'व्यापार के लिए स्मार्ट टूल्स',
    'calc.kamaai.title': '💰 कमाई कैलकुलेटर',
    'calc.kamaai.desc':  'सही बिक्री मूल्य खोजें अधिक मुनाफ़े के लिए',
    'calc.kamaai.buy':   'खरीद दाम ₹',
    'calc.kamaai.overhead':'ढुलाई/अन्य खर्च ₹',
    'calc.kamaai.margin':'मनचाही कमाई (%)',
    'calc.kamaai.result.sell':'बिक्री दाम ₹',
    'calc.kamaai.result.profit':'प्रति यूनिट मुनाफ़ा ₹',
    'calc.kamaai.result.markup':'मार्कअप %',
    'calc.kamaai.result.gst':'GST सहित (5%) ₹',

    'calc.gsm.title':    '📏 थान कैलकुलेटर',
    'calc.gsm.desc':     'कपड़े का वज़न देखकर मीटर का अनुमान लगाएं',
    'calc.gsm.weight':   'रोल वज़न (Kg)',
    'calc.gsm.width':    'कपड़ा चौड़ाई (cm)',
    'calc.gsm.gsm':      'GSM (ग्राम प्रति वर्ग मीटर)',
    'calc.gsm.result':   'अनुमानित लंबाई (मीटर)',

    'calc.season.title': '🌸 मौसम अनुमान',
    'calc.season.desc':  'त्योहार/सीज़न के लिए कितना माल मंगाएं',
    'calc.season.sales': 'पिछले महीने की बिक्री',
    'calc.season.season':'मौसम/त्योहार चुनें',
    'calc.season.result':'कितना माल मंगाएं',

    'calc.waste.title':  '⚠️ ख़राब माल नुकसान',
    'calc.waste.desc':   'ख़राब माल से कितना नुकसान हुआ',
    'calc.waste.meters': 'ख़राब कपड़ा (मीटर)',
    'calc.waste.cost':   'प्रति मीटर लागत ₹',
    'calc.waste.sales':  'महीने की कुल बिक्री ₹',
    'calc.waste.result.loss':'कुल नुकसान ₹',
    'calc.waste.result.pct': 'बिक्री का % नुकसान',

    /* ── Reports ── */
    'report.title':      'रिपोर्ट और विश्लेषण',
    'report.subtitle':   'व्यापार की प्रगति देखें',
    'report.sales.trend':'बिक्री बनाम खर्च',
    'report.stock.dist': 'स्टॉक वितरण',
    'report.profit.cat': 'श्रेणी अनुसार मुनाफ़ा',
    'report.supplier.spend':'व्यापारी अनुसार खर्च',
    'report.order.hist': 'ऑर्डर इतिहास',

    /* ── Common ── */
    'common.save':       'सहेजें',
    'common.cancel':     'रद्द करें',
    'common.delete':     'हटाएं',
    'common.edit':       'संपादित करें',
    'common.add':        'जोड़ें',
    'common.close':      'बंद करें',
    'common.confirm':    'पुष्टि करें',
    'common.search':     'खोजें...',
    'common.no.data':    'कोई डेटा नहीं',
    'common.rupee':      '₹',
    'common.meters':     'मीटर',
    'common.kg':         'Kg',
    'common.pcs':        'पीस',
    'common.export':     '📥 बैकअप निर्यात करें',
    'common.import':     '📤 बैकअप आयात करें',
    'common.total':      'कुल',
    'common.date':       'तारीख',
    'common.name':       'नाम',
  },

  te: {
    /* ── App Shell ── */
    'app.name':          'లక్ష్మి టెక్స్టైల్',
    'app.tagline':       'స్మార్ట్ ఇన్వెంటరీ మేనేజ్‌మెంట్',
    'login.title':       'స్వాగతం',
    'login.subtitle':    'మీ పాత్ర ఎంచుకుని PIN నమోదు చేయండి',
    'login.role.label':  'పాత్ర ఎంచుకోండి',
    'login.pin.label':   '4 అంకెల PIN నమోదు చేయండి',
    'login.btn':         'లాగిన్',
    'login.error':       'తప్పు PIN. దయచేసి మళ్లీ ప్రయత్నించండి.',
    'logout':            'లాగ్అవుట్',

    /* ── Roles ── */
    'role.owner':        '👑 మాలిక్ (యజమాని)',
    'role.sales':        '🏪 కౌంటర్ స్టాఫ్',
    'role.godown':       '📦 గోడౌన్ స్టాఫ్',

    /* ── Navigation ── */
    'nav.dashboard':     '📊 డాష్‌బోర్డ్',
    'nav.billing':       '🏪 దుకాణం బిల్లింగ్',
    'nav.stock':         '📦 స్టాక్ మేనేజర్',
    'nav.supplier':      '🤝 వ్యాపారి',
    'nav.calculators':   '🧮 లెక్కలు',
    'nav.reports':       '📈 నివేదికలు',

    /* ── Dashboard ── */
    'dash.title':        'వ్యాపార డాష్‌బోర్డ్',
    'dash.subtitle':     'లక్ష్మి టెక్స్టైల్ లైవ్ సమాచారం',
    'dash.total.earn':   'మొత్తం సంపాదన',
    'dash.month.earn':   'ఈ నెల అమ్మకాలు',
    'dash.net.profit':   'నికర లాభం',
    'dash.stock.val':    'గోడౌన్ సరుకు విలువ',
    'dash.wastage':      'నష్టం (చెడిపోయిన సరుకు)',
    'dash.orders':       'చురుకైన ఆర్డర్లు',
    'dash.low.stock':    'తక్కువ స్టాక్ హెచ్చరికలు',
    'dash.recent.sales': 'ఇటీవలి అమ్మకాలు',
    'dash.target':       'నెలవారీ లక్ష్యం',

    /* ── Stock ── */
    'stock.title':       'స్టాక్ మేనేజర్',
    'stock.subtitle':    'గోడౌన్ & దుకాణం ఇన్వెంటరీ నిర్వహించండి',
    'stock.godown':      'గోడౌన్ (నిల్వ)',
    'stock.dukaan':      'దుకాణం (షాప్)',
    'stock.all':         'అన్ని వస్తువులు',
    'stock.add.item':    '+ కొత్త వస్తువు జోడించండి',
    'stock.search':      'వస్తువు, వస్త్రం, రంగు వెతకండి...',
    'stock.move':        'దుకాణానికి పంపండి',
    'stock.wastage.log': 'చెడిపోయిన సరుకు నమోదు',
    'stock.col.item':    'వస్తువు పేరు',
    'stock.col.cat':     'వర్గం',
    'stock.col.qty':     'పరిమాణం',
    'stock.col.unit':    'యూనిట్',
    'stock.col.buy':     'కొనుగోలు ధర (₹)',
    'stock.col.sell':    'అమ్మకపు ధర (₹)',
    'stock.col.loc':     'స్థానం',
    'stock.col.status':  'స్థితి',
    'stock.col.action':  'చర్య',
    'stock.status.ok':   '✅ సాధారణం',
    'stock.status.low':  '⚠️ తక్కువ స్టాక్',
    'stock.status.out':  '🔴 అయిపోయింది',
    'stock.godown.to.dukaan':'గోడౌన్ → దుకాణం బదిలీ',
    'stock.qty.update':  'స్టాక్ అప్‌డేట్ అయింది!',

    /* ── Billing ── */
    'billing.title':     'దుకాణం బిల్లింగ్ (కౌంటర్ POS)',
    'billing.subtitle':  'వస్తువు ఎంచుకోండి, పరిమాణం నమోదు చేయండి, బిల్లు తయారు చేయండి',
    'billing.select.cat':'వర్గం ఎంచుకోండి',
    'billing.select.item':'వస్తువు ఎంచుకోండి',
    'billing.qty':       'పరిమాణం / మీటర్లు',
    'billing.add':       'బిల్లులో జోడించండి',
    'billing.bill':      'ప్రస్తుత బిల్లు',
    'billing.subtotal':  'మొత్తం (GST లేకుండా)',
    'billing.gst':       'GST (5%)',
    'billing.total':     'మొత్తం మొత్తం',
    'billing.sell':      '✅ మాల్ బేచా (అమ్మకం పూర్తి)',
    'billing.clear':     '🗑️ బిల్లు క్లియర్ చేయండి',
    'billing.empty':     'ఇంకా ఏ వస్తువులు జోడించలేదు',
    'billing.success':   'అమ్మకం పూర్తయింది! స్టాక్ అప్‌డేట్ అయింది.',

    /* ── Supplier ── */
    'supplier.title':    'వ్యాపారి హబ్',
    'supplier.subtitle': 'సరఫరాదారులను నిర్వహించండి మరియు ఆర్డర్లు ట్రాక్ చేయండి',
    'supplier.add':      '+ వ్యాపారిని జోడించండి',
    'supplier.dir':      'వ్యాపారి జాబితా',
    'supplier.orders':   'ఆర్డర్ పైప్‌లైన్',
    'supplier.history':  'ఆర్డర్ చరిత్ర',
    'supplier.whatsapp': '📱 WhatsApp',
    'supplier.new.order':'📝 కొనుగోలు ఆర్డర్',
    'supplier.col.vya':  'వ్యాపారి',
    'supplier.col.item': 'వస్తువు',
    'supplier.col.qty':  'పరిమాణం',
    'supplier.col.cost': 'ధర (₹)',
    'supplier.col.date': 'తేదీ',
    'supplier.col.status':'స్థితి',
    'supplier.pending':  '🟠 పెండింగ్',
    'supplier.transit':  '🔵 రవాణాలో',
    'supplier.delivered':'🟢 వచ్చింది',
    'supplier.receive':  '✅ మాల్ మిలా (స్టాక్ జోడించు)',
    'supplier.mark.transit':'🚚 రవాణాలో చేయండి',

    /* ── Calculators ── */
    'calc.title':        'లెక్కలు (Calculators)',
    'calc.subtitle':     'వ్యాపార నిర్ణయాల కోసం స్మార్ట్ సాధనాలు',
    'calc.kamaai.title': '💰 కమాయి క్యాల్కులేటర్',
    'calc.kamaai.desc':  'గరిష్ట లాభం కోసం సరైన అమ్మకపు ధర కనుగొనండి',
    'calc.kamaai.buy':   'కొనుగోలు ధర ₹',
    'calc.kamaai.overhead':'రవాణా/ఇతర ఖర్చులు ₹',
    'calc.kamaai.margin':'కావలసిన లాభం (%)',
    'calc.kamaai.result.sell':'అమ్మకపు ధర ₹',
    'calc.kamaai.result.profit':'యూనిట్‌కి నికర లాభం ₹',
    'calc.kamaai.result.markup':'మార్కప్ %',
    'calc.kamaai.result.gst':'GST తో (5%) ₹',

    'calc.gsm.title':    '📏 థాన్ కొలత',
    'calc.gsm.desc':     'గుడ్డ బరువు బట్టి మీటర్లు అంచనా వేయండి',
    'calc.gsm.weight':   'రోల్ బరువు (Kg)',
    'calc.gsm.width':    'గుడ్డ వెడల్పు (cm)',
    'calc.gsm.gsm':      'GSM (గ్రాములు/చదరపు మీటరు)',
    'calc.gsm.result':   'అంచనా పొడవు (మీటర్లు)',

    'calc.season.title': '🌸 మౌసమ్ అంచనా',
    'calc.season.desc':  'పండుగ/సీజన్ కోసం ఎంత స్టాక్ ఆర్డర్ చేయాలో',
    'calc.season.sales': 'గత నెల అమ్మకాలు',
    'calc.season.season':'సీజన్/పండుగ ఎంచుకోండి',
    'calc.season.result':'ఆర్డర్ చేయాల్సిన పరిమాణం',

    'calc.waste.title':  '⚠️ చెడిపోయిన సరుకు నష్టం',
    'calc.waste.desc':   'చెడిపోయిన సరుకు వల్ల ఎంత నష్టం అయిందో చూడండి',
    'calc.waste.meters': 'చెడిన గుడ్డ (మీటర్లు)',
    'calc.waste.cost':   'మీటరుకి ధర ₹',
    'calc.waste.sales':  'నెల మొత్తం అమ్మకాలు ₹',
    'calc.waste.result.loss':'మొత్తం నష్టం ₹',
    'calc.waste.result.pct': 'అమ్మకాల్లో నష్టం %',

    /* ── Reports ── */
    'report.title':      'నివేదికలు & విశ్లేషణ',
    'report.subtitle':   'వ్యాపార పనితీరు చూడండి',
    'report.sales.trend':'అమ్మకాలు vs ఖర్చులు',
    'report.stock.dist': 'స్టాక్ పంపిణీ',
    'report.profit.cat': 'వర్గం వారీ లాభం',
    'report.supplier.spend':'వ్యాపారి వారీ ఖర్చు',
    'report.order.hist': 'ఆర్డర్ చరిత్ర',

    /* ── Common ── */
    'common.save':       'సేవ్ చేయండి',
    'common.cancel':     'రద్దు చేయండి',
    'common.delete':     'తొలగించండి',
    'common.edit':       'సవరించండి',
    'common.add':        'జోడించండి',
    'common.close':      'మూసివేయండి',
    'common.confirm':    'నిర్ధారించండి',
    'common.search':     'వెతకండి...',
    'common.no.data':    'డేటా అందుబాటులో లేదు',
    'common.rupee':      '₹',
    'common.meters':     'మీటర్లు',
    'common.kg':         'Kg',
    'common.pcs':        'పీస్',
    'common.export':     '📥 బ్యాకప్ ఎగుమతి',
    'common.import':     '📤 బ్యాకప్ దిగుమతి',
    'common.total':      'మొత్తం',
    'common.date':       'తేదీ',
    'common.name':       'పేరు',
  }
};

/* ─── Language Engine ─── */
let currentLang = localStorage.getItem('lt_lang') || 'en';

function t(key) {
  return (LANG_DATA[currentLang] && LANG_DATA[currentLang][key])
    || (LANG_DATA['en'][key])
    || key;
}

function setLanguage(lang) {
  if (!LANG_DATA[lang]) return;
  currentLang = lang;
  localStorage.setItem('lt_lang', lang);
  applyTranslations();
  updateLangButtons();
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const val = t(key);
    if (el.tagName === 'INPUT' && el.getAttribute('placeholder') !== null) {
      el.setAttribute('placeholder', val);
    } else {
      el.textContent = val;
    }
  });
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    el.setAttribute('placeholder', t(el.getAttribute('data-i18n-ph')));
  });
}

function updateLangButtons() {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === currentLang);
  });
}

/* Initialize on page load */
document.addEventListener('DOMContentLoaded', () => {
  applyTranslations();
  updateLangButtons();
});
