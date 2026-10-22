import { TKAPaket } from "./types";

// ============================================================================
// BANK SOAL TKA MEMBER: BAHASA INGGRIS (10 PAKET BERTINGKAT)
// Sesuai standar TKA Kemendikdasmen: Reading Comprehension, Vocabulary, Grammar in Context
// Dilengkapi pembahasan mendalam dan grafik/ilustrasi visual
// ============================================================================

export const paketBahasaInggris: TKAPaket[] = [
  // --- PAKET 1: School Life & Daily Habits (Dasar) ---
  {
    id: "ing-p1",
    subjectId: "bahasa-inggris",
    jenjang: "SD/MI",
    mapelName: "Bahasa Inggris (English Literacy)",
    paketNumber: 1,
    title: "Paket 1: School Life, Healthy Habits & Simple Routines",
    description: "Memahami teks narasi harian sederhana, kosakata aktivitas sekolah, dan present simple tense.",
    levelKesukaran: "Level 1: Dasar & Pemahaman",
    durasiMenit: 20,
    passingScore: 50,
    totalSoal: 5,
    soalList: [
      {
        nomor: 1,
        id: "ING-01-01",
        tipe: "PG",
        stimulus: "Hello, my name is Rian. I am a sixth-grade student at SD Nusantara. Every morning, I wake up at 05.00 AM, tidy up my bed, and take a quick warm shower. After having breakfast with my family, I ride my bicycle to school. School starts at 07.00 AM and finishes at 01.00 PM.",
        pertanyaan: "How does Rian go to school every morning?",
        opsi: ["By school bus", "By bicycle", "On foot", "By motorcycle"],
        kunci: "B",
        pembahasan: "Pada teks tertulis jelas: 'After having breakfast with my family, I ride my bicycle to school.' Jadi Rian pergi ke sekolah mengendarai sepeda (by bicycle).",
        konsepKunci: "Finding specific factual information in descriptive text."
      },
      {
        nomor: 2,
        id: "ING-01-02",
        tipe: "MCMA",
        stimulus: "Read Rian's morning routine carefully.",
        pertanyaan: "Which of the following activities does Rian do before leaving for school?",
        opsi: [
          "Wakes up at 05.00 AM",
          "Tidies up his bed",
          "Has breakfast with his family",
          "Watches movies until late at night"
        ],
        kunci: ["A", "B", "C"],
        pembahasan: "Rian bangun pukul 5 pagi (A), merapikan tempat tidur (B), dan sarapan bersama keluarga (C). Menonton film larut malam tidak disebutkan dan bertentangan dengan kebiasaan sehat.",
        konsepKunci: "Identifying chronological order of morning routines."
      },
      {
        nomor: 3,
        id: "ING-01-03",
        tipe: "BS",
        pertanyaan: "Rian spends 6 hours at school every day from 07.00 AM until 01.00 PM.",
        opsi: ["BENAR", "SALAH"],
        kunci: "BENAR",
        pembahasan: "Dari pukul 07.00 pagi sampai 01.00 siang (13.00) berdurasi tepat 6 jam (13 - 7 = 6 jam). Pernyataan BENAR.",
        konsepKunci: "Time calculation from reading context."
      },
      {
        nomor: 4,
        id: "ING-01-04",
        tipe: "PG",
        pertanyaan: "What is the synonym of the word 'tidy up' in the sentence 'tidy up my bed'?",
        opsi: ["Clean and arrange", "Break down", "Paint", "Forget"],
        kunci: "A",
        pembahasan: "'Tidy up' bermakna merapikan, membersihkan, atau mengatur sesuatu agar teratur rapi (clean and arrange).",
        konsepKunci: "Vocabulary: Phrasal verbs and synonyms."
      },
      {
        nomor: 5,
        id: "ING-01-05",
        tipe: "BS",
        pertanyaan: "The text mainly uses Simple Past Tense to narrate historical past events.",
        opsi: ["BENAR", "SALAH"],
        kunci: "SALAH",
        pembahasan: "Teks tersebut menceritakan kebiasaan rutin sehari-hari (habitual actions) sehingga menggunakan Simple Present Tense (wake up, ride, starts), bukan Simple Past Tense. Pernyataan SALAH.",
        konsepKunci: "Grammar: Simple Present Tense for daily routines."
      }
    ]
  },

  // --- PAKET 2: Traditional Food & Culture (Dasar) ---
  {
    id: "ing-p2",
    subjectId: "bahasa-inggris",
    jenjang: "SD/MI",
    mapelName: "Bahasa Inggris (English Literacy)",
    paketNumber: 2,
    title: "Paket 2: Indonesian Traditional Culinary & Food Recipes",
    description: "Memahami teks prosedur resep makanan nusantara, kata sifat rasa, dan urutan instruksi.",
    levelKesukaran: "Level 1: Dasar & Pemahaman",
    durasiMenit: 20,
    passingScore: 50,
    totalSoal: 5,
    soalList: [
      {
        nomor: 1,
        id: "ING-02-01",
        tipe: "PG",
        stimulus: "Gado-gado is a famous traditional salad from Indonesia. It consists of slightly boiled vegetables such as long beans, spinach, cabbage, and bean sprouts, served with fried tofu, boiled eggs, and topped with rich peanut sauce. It is usually served with crispy crackers called krupuk.",
        pertanyaan: "What is the main dressing poured over gado-gado?",
        opsi: ["Tomato ketchup", "Rich peanut sauce", "Mayonnaise", "Cheese sauce"],
        kunci: "B",
        pembahasan: "Teks menyatakan: '...and topped with rich peanut sauce.' Dressing utama gado-gado adalah bumbu saus kacang gurih.",
        konsepKunci: "Identifying culinary components in descriptive text."
      },
      {
        nomor: 2,
        id: "ING-02-02",
        tipe: "MCMA",
        stimulus: "Read the ingredients of gado-gado mentioned in the text.",
        pertanyaan: "Which ingredients are included in authentic gado-gado?",
        opsi: [
          "Boiled vegetables (spinach, cabbage, long beans)",
          "Fried tofu and boiled eggs",
          "Crispy crackers (krupuk)",
          "Raw beef steak"
        ],
        kunci: ["A", "B", "C"],
        pembahasan: "Sayuran rebus, tahu goreng, telur rebus, dan kerupuk semuanya disebutkan dalam teks. Daging sapi mentah bukan bahan gado-gado.",
        konsepKunci: "Information retrieval from culinary text."
      },
      {
        nomor: 3,
        id: "ING-02-03",
        tipe: "BS",
        pertanyaan: "Gado-gado is considered a healthy food because it contains various nutritious vegetables and protein sources like tofu and eggs.",
        opsi: ["BENAR", "SALAH"],
        kunci: "BENAR",
        pembahasan: "Gado-gado kaya serat dari sayuran dan protein nabati/hewani dari tahu dan telur, menjadikannya makanan sehat bergizi seimbang. Pernyataan BENAR.",
        konsepKunci: "Contextual understanding of nutritional value."
      },
      {
        nomor: 4,
        id: "ING-02-04",
        tipe: "PG",
        pertanyaan: "The word 'crispy' in 'crispy crackers' describes a food texture that is...",
        opsi: ["Soft and watery", "Firm, dry, and easily broken with a crunch", "Extremely salty and sour", "Hot and boiling"],
        kunci: "B",
        pembahasan: "'Crispy' artinya renyah atau garing, yaitu tekstur makanan kering yang berbunyi kriuk saat digigit (crunchy).",
        konsepKunci: "Sensory adjectives for food texture."
      },
      {
        nomor: 5,
        id: "ING-02-05",
        tipe: "BS",
        pertanyaan: "The word 'consists of' means 'is made up of' or 'contains'.",
        opsi: ["BENAR", "SALAH"],
        kunci: "BENAR",
        pembahasan: "'Consists of' bermakna terdiri atas atau memuat bahan-bahan tertentu. Pernyataan BENAR.",
        konsepKunci: "Vocabulary: Phrasal verbs."
      }
    ]
  },

  // --- PAKET 3: Wildlife Conservation & Komodo Dragon (Menengah Awal) ---
  {
    id: "ing-p3",
    subjectId: "bahasa-inggris",
    jenjang: "SD/MI",
    mapelName: "Bahasa Inggris (English Literacy)",
    paketNumber: 3,
    title: "Paket 3: Wildlife Conservation: The Giant Komodo Dragon",
    description: "Teks laporan informatif satwa endemik Indonesia, habitat, dan upaya pelestarian.",
    levelKesukaran: "Level 1: Dasar & Pemahaman",
    durasiMenit: 20,
    passingScore: 50,
    totalSoal: 5,
    soalList: [
      {
        nomor: 1,
        id: "ING-03-01",
        tipe: "PG",
        stimulus: "The Komodo dragon is the largest living species of lizard on Earth. It can grow up to 3 meters in length and weigh over 70 kilograms. They are endemic to Indonesian islands such as Komodo, Rinca, and Flores. Komodo dragons are carnivores and possess a sharp sense of smell using their yellow forked tongues to detect prey from miles away.",
        pertanyaan: "How do Komodo dragons detect their prey from long distances?",
        opsi: [
          "Using their sharp eyesight at night",
          "Using their yellow forked tongues to smell",
          "Using their large sensitive ears",
          "By sending sonar waves through the ground"
        ],
        kunci: "B",
        pembahasan: "Kalimat terakhir menjelaskan: '...possess a sharp sense of smell using their yellow forked tongues to detect prey from miles away.'",
        konsepKunci: "Anatomy and behavioral adaptation of animals in factual report text."
      },
      {
        nomor: 2,
        id: "ING-03-02",
        tipe: "MCMA",
        stimulus: "Read the physical characteristics of Komodo dragons.",
        pertanyaan: "Which statements are TRUE according to the text?",
        opsi: [
          "They are the largest living species of lizard in the world.",
          "They can reach a maximum length of up to 3 meters.",
          "They are herbivores that only eat grasses and leaves.",
          "They can be naturally found on Komodo, Rinca, and Flores islands."
        ],
        kunci: ["A", "B", "D"],
        pembahasan: "Komodo adalah kadal terbesar di dunia (A), panjang sampai 3 meter (B), endemik di pulau Komodo, Rinca, dan Flores (D). Komodo adalah karnivora pemakan daging, bukan herbivora (C salah).",
        konsepKunci: "Evaluating factual statements in biological reports."
      },
      {
        nomor: 3,
        id: "ING-03-03",
        tipe: "BS",
        pertanyaan: "The word 'endemic' means an animal or plant that is native and naturally restricted to a specific geographical area.",
        opsi: ["BENAR", "SALAH"],
        kunci: "BENAR",
        pembahasan: "Endemik merujuk pada spesies yang secara alami hanya hidup di wilayah geografis tertentu dan tidak dijumpai di alam liar tempat lain. Pernyataan BENAR.",
        konsepKunci: "Scientific vocabulary in ecology."
      },
      {
        nomor: 4,
        id: "ING-03-04",
        tipe: "PG",
        pertanyaan: "What is the primary communicative purpose of the text above?",
        opsi: [
          "To entertain readers with a fairy tale about dragons",
          "To describe the factual features of Komodo dragons objectively",
          "To persuade people to hunt lizards for leather",
          "To give step-by-step instructions on cooking meat"
        ],
        kunci: "B",
        pembahasan: "Teks tersebut berjenis Factual Report yang bertujuan menyajikan informasi ilmiah tentang komodo secara objektif kepada pembaca.",
        konsepKunci: "Communicative purpose of Report Text."
      },
      {
        nomor: 5,
        id: "ING-03-05",
        tipe: "BS",
        pertanyaan: "An adult Komodo dragon can weigh more than 70 kilograms.",
        opsi: ["BENAR", "SALAH"],
        kunci: "BENAR",
        pembahasan: "Teks menyatakan: '...and weigh over 70 kilograms.' Pernyataan BENAR.",
        konsepKunci: "Verification of numerical facts in reading text."
      }
    ]
  },

  // --- PAKET 4: Clean Energy & Solar Powered Vehicles (Menengah) ---
  {
    id: "ing-p4",
    subjectId: "bahasa-inggris",
    jenjang: "SMP/MTs",
    mapelName: "Bahasa Inggris (English Literacy)",
    paketNumber: 4,
    title: "Paket 4: Innovations in Clean Energy & Green Transportation",
    description: "Teks eksposisi analitis tentang transportasi listrik, dampak emisi karbon, dan kata penghubung sebab-akibat.",
    levelKesukaran: "Level 2: Aplikasi & Terapan",
    durasiMenit: 25,
    passingScore: 50,
    totalSoal: 5,
    soalList: [
      {
        nomor: 1,
        id: "ING-04-01",
        tipe: "PG",
        stimulus: "Electric vehicles (EVs) are becoming increasingly popular across the globe. Unlike conventional cars that burn gasoline, EVs are powered by rechargeable battery packs. As a result, they produce zero tailpipe emissions, which significantly reduces urban air pollution and greenhouse gas concentrations in major metropolitan cities.",
        pertanyaan: "Why do electric vehicles (EVs) produce zero tailpipe emissions?",
        opsi: [
          "Because they run on diesel fuel",
          "Because they are powered by rechargeable batteries instead of burning gasoline",
          "Because they do not have any wheels",
          "Because they only travel during cold weather"
        ],
        kunci: "B",
        pembahasan: "Teks menyebutkan: 'Unlike conventional cars that burn gasoline, EVs are powered by rechargeable battery packs. As a result, they produce zero tailpipe emissions...'",
        konsepKunci: "Cause and effect relationship in expository text."
      },
      {
        nomor: 2,
        id: "ING-04-02",
        tipe: "MCMA",
        stimulus: "Read the positive impacts of electric vehicles mentioned in the passage.",
        pertanyaan: "What are the environmental benefits of switching to electric vehicles?",
        opsi: [
          "Reduces urban air pollution",
          "Lowers greenhouse gas emissions in metropolitan areas",
          "Decreases dependence on fossil fuels like gasoline",
          "Increases thick toxic black smoke from exhausts"
        ],
        kunci: ["A", "B", "C"],
        pembahasan: "EV mengurangi polusi udara, menekan gas rumah kaca, dan mengurangi ketergantungan bahan bakar bensin. Opsi D salah karena EV tidak mengeluarkan asap knalpot beracun.",
        konsepKunci: "Identifying benefits of green technology."
      },
      {
        nomor: 3,
        id: "ING-04-03",
        tipe: "BS",
        pertanyaan: "The phrase 'As a result' functions as a transition signal indicating a consequence or outcome.",
        opsi: ["BENAR", "SALAH"],
        kunci: "BENAR",
        pembahasan: "'As a result' (sebagai akibatnya/akibatnya) adalah penanda transisi hubungan sebab-akibat (cause and effect). Pernyataan BENAR.",
        konsepKunci: "Discourse markers and cohesive devices."
      },
      {
        nomor: 4,
        id: "ING-04-04",
        tipe: "PG",
        pertanyaan: "The word 'conventional' in 'conventional cars' is closest in meaning to...",
        opsi: ["Traditional / standard", "Futuristic", "Imaginary", "Bizarre"],
        kunci: "A",
        pembahasan: "'Conventional' berarti lazim, standar, atau tradisional yang sudah biasa digunakan sebelumnya.",
        konsepKunci: "Contextual vocabulary: Antonyms and synonyms."
      },
      {
        nomor: 5,
        id: "ING-04-05",
        tipe: "BS",
        pertanyaan: "Electric cars require frequent oil changes just like gasoline engines.",
        opsi: ["SALAH", "BENAR"],
        kunci: "SALAH",
        pembahasan: "Mobil listrik (EV) digerakkan oleh motor listrik dan baterai tanpa ruang pembakaran silinder, sehingga tidak memerlukan penggantian oli mesin seperti mobil bensin. Pernyataan SALAH.",
        konsepKunci: "Technical knowledge integration in English literacy."
      }
    ]
  },

  // --- PAKET 5: Traditional Narrative: The Legend of Roro Jonggrang (Sastra) ---
  {
    id: "ing-p5",
    subjectId: "bahasa-inggris",
    jenjang: "SMP/MTs",
    mapelName: "Bahasa Inggris (English Literacy)",
    paketNumber: 5,
    title: "Paket 5: Narrative Legend: The Thousand Temples & Moral Values",
    description: "Menganalisis teks narasi legenda Prambanan, past tense, karakter tokoh, dan pesan moral.",
    levelKesukaran: "Level 2: Aplikasi & Terapan",
    durasiMenit: 25,
    passingScore: 50,
    totalSoal: 5,
    soalList: [
      {
        nomor: 1,
        id: "ING-05-01",
        tipe: "PG",
        stimulus: "Long ago, Prince Bandung Bondowoso defeated the Kingdom of Prambanan. He wanted to marry Princess Roro Jonggrang, but she did not love him. To politely reject the proposal, she asked Bandung to build one thousand stone temples in a single night before the rooster crowed at dawn.",
        pertanyaan: "Why did Princess Roro Jonggrang ask Bandung Bondowoso to build one thousand temples in one night?",
        opsi: [
          "Because she wanted to build a tourist park",
          "As an impossible condition to reject his marriage proposal",
          "Because she was an architect who loved stone statues",
          "To celebrate Bandung Bondowoso's birthday"
        ],
        kunci: "B",
        pembahasan: "Roro Jonggrang tidak mencintai Bandung Bondowoso sehingga ia memberikan syarat mustahil (membangun seribu candi dalam satu malam) agar lamaran tersebut gagal.",
        konsepKunci: "Identifying character motivation and conflict in narrative text."
      },
      {
        nomor: 2,
        id: "ING-05-02",
        tipe: "MCMA",
        stimulus: "Read the story's development.",
        pertanyaan: "Which narrative text elements are present in the excerpt?",
        opsi: [
          "Orientation (introduction of characters and setting)",
          "Complication (conflict between the prince and princess)",
          "Use of past action verbs (defeated, wanted, asked)",
          "Scientific experiment data and formulas"
        ],
        kunci: ["A", "B", "C"],
        pembahasan: "Teks naratif memuat orientasi, komplikasi (konflik), dan kata kerja lampau. Data eksperimen ilmiah tidak ada dalam teks legenda cerita rakyat.",
        konsepKunci: "Structural components of narrative texts."
      },
      {
        nomor: 3,
        id: "ING-05-03",
        tipe: "BS",
        pertanyaan: "The rooster crowing is traditionally used as an indicator of sunrise and morning dawn in agrarian societies.",
        opsi: ["BENAR", "SALAH"],
        kunci: "BENAR",
        pembahasan: "Kokok ayam jantan secara kultural menandai fajar menyingsing dan pergantian malam menuju pagi hari. Pernyataan BENAR.",
        konsepKunci: "Cultural context in narrative folklore."
      },
      {
        nomor: 4,
        id: "ING-05-04",
        tipe: "PG",
        pertanyaan: "What is the past form (Verb 2) of the verb 'build' used in the text?",
        opsi: ["Builded", "Built", "Building", "Builts"],
        kunci: "B",
        pembahasan: "'Build' adalah irregular verb yang bentuk lampau (V2) dan past participle (V3)-nya adalah 'built'.",
        konsepKunci: "Irregular verbs in past tense."
      },
      {
        nomor: 5,
        id: "ING-05-05",
        tipe: "BS",
        pertanyaan: "Princess Roro Jonggrang genuinely loved Prince Bandung Bondowoso and accepted his proposal immediately.",
        opsi: ["SALAH", "BENAR"],
        kunci: "SALAH",
        pembahasan: "Teks menyatakan dengan gamblang: '...but she did not love him.' Pernyataan SALAH.",
        konsepKunci: "Textual truth evaluation."
      }
    ]
  },

  // --- PAKET 6: Digital Literacy & Cybersecurity for Teenagers (Menengah Terapan) ---
  {
    id: "ing-p6",
    subjectId: "bahasa-inggris",
    jenjang: "SMP/MTs",
    mapelName: "Bahasa Inggris (English Literacy)",
    paketNumber: 6,
    title: "Paket 6: Teen Digital Citizenship & Cybersecurity Awareness",
    description: "Memahami teks eksposisi keamanan data pribadi di internet, password security, dan phishing.",
    levelKesukaran: "Level 2: Aplikasi & Terapan",
    durasiMenit: 25,
    passingScore: 50,
    totalSoal: 5,
    soalList: [
      {
        nomor: 1,
        id: "ING-06-01",
        tipe: "PG",
        stimulus: "Cyberbullying and data theft are critical challenges in today's interconnected world. Security experts recommend using multi-factor authentication (MFA) and strong passwords combining uppercase letters, numbers, and symbols. Furthermore, netizens should never share sensitive personal information such as home addresses and identity numbers on public social media forums.",
        pertanyaan: "What do cybersecurity experts recommend to secure online accounts?",
        opsi: [
          "Using short and easy passwords like '123456'",
          "Sharing passwords with all classmates",
          "Using multi-factor authentication and complex password combinations",
          "Posting identity cards on public social media feeds"
        ],
        kunci: "C",
        pembahasan: "Pakar merekomendasikan: '...using multi-factor authentication (MFA) and strong passwords combining uppercase letters, numbers, and symbols.'",
        konsepKunci: "Practical advice retrieval in expository text."
      },
      {
        nomor: 2,
        id: "ING-06-02",
        tipe: "MCMA",
        stimulus: "Read the online safety tips.",
        pertanyaan: "Which practices demonstrate responsible digital citizenship?",
        opsi: [
          "Verifying news sources before clicking or forwarding suspicious links",
          "Treating other users respectfully in comments and online chats",
          "Protecting personal identifiable information from public exposure",
          "Spreading unverified rumors to gain followers"
        ],
        kunci: ["A", "B", "C"],
        pembahasan: "Verifikasi berita, santun di media sosial, dan menjaga privasi adalah ciri netizen bertanggung jawab. Menyebarkan rumor tanpa verifikasi adalah tindakan negatif.",
        konsepKunci: "Digital literacy guidelines and ethics."
      },
      {
        nomor: 3,
        id: "ING-06-03",
        tipe: "BS",
        pertanyaan: "The word 'Furthermore' is used to add additional supportive information to an existing argument.",
        opsi: ["BENAR", "SALAH"],
        kunci: "BENAR",
        pembahasan: "'Furthermore' (lagipula, lebih-lebih lagi, selain itu) adalah konjungsi aditif untuk menambahkan poin argumen pendukung. Pernyataan BENAR.",
        konsepKunci: "Conjunctive adverbs in expository writing."
      },
      {
        nomor: 4,
        id: "ING-06-04",
        tipe: "PG",
        pertanyaan: "What does the abbreviation 'MFA' stand for in computer security?",
        opsi: [
          "Multi-Factor Authentication",
          "Main File Architecture",
          "Maximum Frequency Acceleration",
          "Micro Fiber Attachment"
        ],
        kunci: "A",
        pembahasan: "MFA merupakan singkatan dari Multi-Factor Authentication (Autentikasi Multi-Faktor).",
        konsepKunci: "Acronyms in information technology."
      },
      {
        nomor: 5,
        id: "ING-06-05",
        tipe: "BS",
        pertanyaan: "Creating passwords with only sequential numbers like '12345678' provides maximum protection against hacker algorithms.",
        opsi: ["SALAH", "BENAR"],
        kunci: "SALAH",
        pembahasan: "Kombinasi angka berurutan sangat lemah dan paling mudah dibobol oleh program peretas dalam hitungan detik. Pernyataan SALAH.",
        konsepKunci: "Cyber hygiene evaluation."
      }
    ]
  },

  // --- PAKET 7: Marine Biology & Coral Reef Ecosystems (Menengah Atas) ---
  {
    id: "ing-p7",
    subjectId: "bahasa-inggris",
    jenjang: "SMA",
    mapelName: "Bahasa Inggris (English Literacy)",
    paketNumber: 7,
    title: "Paket 7: Marine Biology: The Vulnerability of Coral Reefs",
    description: "Menganalisis teks sains oseanografi, fenomena pemutihan karang (coral bleaching), dan kalimat pasif.",
    levelKesukaran: "Level 2: Aplikasi & Terapan",
    durasiMenit: 30,
    passingScore: 50,
    totalSoal: 5,
    soalList: [
      {
        nomor: 1,
        id: "ING-07-01",
        tipe: "PG",
        stimulus: "Coral reefs support approximately 25% of all marine life despite covering less than 1% of the ocean floor. When sea temperatures rise abnormally due to global warming, corals expel the colorful symbiotic algae (zooxanthellae) living inside their tissues. This stressful process is known as coral bleaching, which leaves the reef fragile, white, and susceptible to mass mortality.",
        pertanyaan: "What causes the phenomenon known as 'coral bleaching'?",
        opsi: [
          "Fish eating too much coral tissue",
          "Corals expelling their symbiotic algae when sea temperatures rise abnormally",
          "Sunlight being completely blocked by volcanic ash",
          "Sudden drop of ocean salt levels"
        ],
        kunci: "B",
        pembahasan: "Teks menjelaskan: 'When sea temperatures rise abnormally due to global warming, corals expel the colorful symbiotic algae (zooxanthellae) living inside their tissues. This stressful process is known as coral bleaching...'",
        konsepKunci: "Scientific mechanism of ecological bleaching."
      },
      {
        nomor: 2,
        id: "ING-07-02",
        tipe: "MCMA",
        stimulus: "Read about the ecological importance of coral reefs.",
        pertanyaan: "Which statements accurately describe coral reefs based on the text?",
        opsi: [
          "They support roughly a quarter (25%) of all marine species.",
          "They cover less than one percent of the Earth's ocean floor.",
          "Bleached corals become completely immune to all ocean diseases.",
          "Bleaching causes corals to turn white and fragile."
        ],
        kunci: ["A", "B", "D"],
        pembahasan: "Karang menopang 25% kehidupan laut, menutupi kurang dari 1% dasar laut, dan pemutihan membuat karang rapuh serta rentan mati (bukan imun/kebal terhadap penyakit). Pilihan A, B, dan D benar.",
        konsepKunci: "Synthesizing marine biology data."
      },
      {
        nomor: 3,
        id: "ING-07-03",
        tipe: "BS",
        pertanyaan: "In the clause 'This stressful process is known as coral bleaching', passive voice is employed.",
        opsi: ["BENAR", "SALAH"],
        kunci: "BENAR",
        pembahasan: "Bentuk 'is known' (to be + V3) merupakan pola Passive Voice dalam Simple Present Tense. Pernyataan BENAR.",
        konsepKunci: "Grammar: Passive voice in scientific reporting."
      },
      {
        nomor: 4,
        id: "ING-07-04",
        tipe: "PG",
        pertanyaan: "The word 'susceptible' in 'susceptible to mass mortality' means...",
        opsi: ["Easily harmed or vulnerable", "Totally protected", "Unaware", "Immortal"],
        kunci: "A",
        pembahasan: "'Susceptible' bermakna rentan, mudah terpengaruh, atau mudah terserang bahaya (vulnerable).",
        konsepKunci: "Advanced academic vocabulary."
      },
      {
        nomor: 5,
        id: "ING-07-05",
        tipe: "BS",
        pertanyaan: "Zooxanthellae are tiny symbiotic algae that provide corals with nourishment and their vibrant colors.",
        opsi: ["BENAR", "SALAH"],
        kunci: "BENAR",
        pembahasan: "Zooxanthellae adalah alga fotosintetik mikroskopis yang memberi nutrisi dan pigmen warna indah pada karang. Pernyataan BENAR.",
        konsepKunci: "Biological symbiosis in marine ecosystems."
      }
    ]
  },

  // --- PAKET 8: Space Exploration & Mars Rover Missions (HOTS Lanjutan) ---
  {
    id: "ing-p8",
    subjectId: "bahasa-inggris",
    jenjang: "SMA",
    mapelName: "Bahasa Inggris (English Literacy)",
    paketNumber: 8,
    title: "Paket 8: Aerospace Technology: The Quest for Past Life on Mars",
    description: "Menganalisis artikel teknologi astronomi penjelajahan planet Mars, inferensi bacaan, dan modalitas.",
    levelKesukaran: "Level 3: Analisis & HOTS Mahir",
    durasiMenit: 30,
    passingScore: 50,
    totalSoal: 5,
    soalList: [
      {
        nomor: 1,
        id: "ING-08-01",
        tipe: "PG",
        stimulus: "Robotic rovers deployed on the Martian surface are equipped with autonomous navigation, high-resolution spectrometers, and specialized core drills. Their primary scientific objective is not merely to capture panoramic terrain imagery, but to analyze ancient sedimentary rock formations in dry river deltas for biosignatures—microscopic chemical footprints that may indicate ancient microbial life existed billions of years ago when Mars had liquid water and a thicker atmosphere.",
        pertanyaan: "What is the primary scientific mission of the Martian core drill instruments?",
        opsi: [
          "To dig foundations for futuristic human shopping malls",
          "To gather and analyze ancient rock samples for potential chemical biosignatures of past microbial life",
          "To pump underground oil reserves back to Earth",
          "To create artificial volcanic eruptions"
        ],
        kunci: "B",
        pembahasan: "Teks menyatakan: '...to analyze ancient sedimentary rock formations in dry river deltas for biosignatures—microscopic chemical footprints that may indicate ancient microbial life existed...'",
        konsepKunci: "Detailed reading comprehension in astrophysical texts."
      },
      {
        nomor: 2,
        id: "ING-08-02",
        tipe: "MCMA",
        stimulus: "Read the scientific criteria for past habitable conditions on Mars.",
        pertanyaan: "According to the passage, what environmental conditions did Mars possess billions of years ago?",
        opsi: [
          "Presence of liquid water on its surface",
          "A thicker planetary atmosphere than today",
          "Active ancient river deltas and sedimentary basins",
          "Modern skyscrapers and paved highways"
        ],
        kunci: ["A", "B", "C"],
        pembahasan: "Miliaran tahun lalu Mars memiliki air cair, atmosfer yang lebih tebal, dan delta sungai purba. Opsi D adalah khayalan fiksi.",
        konsepKunci: "Extracting scientific conditions of habitability."
      },
      {
        nomor: 3,
        id: "ING-08-03",
        tipe: "BS",
        pertanyaan: "The term 'biosignature' refers to any substance, structure, or phenomenon that provides scientific evidence of past or present biological life.",
        opsi: ["BENAR", "SALAH"],
        kunci: "BENAR",
        pembahasan: "Biosignatur adalah bukti zat kimiawi atau fosil molekuler yang membuktikan keberadaan jejak kehidupan biologis. Pernyataan BENAR.",
        konsepKunci: "Astrobiology definition."
      },
      {
        nomor: 4,
        id: "ING-08-04",
        tipe: "PG",
        pertanyaan: "The word 'autonomous' in 'autonomous navigation' implies that the vehicle...",
        opsi: [
          "Can make real-time route decisions independently without direct human remote steering for every step",
          "Must be pushed manually by astronauts",
          "Can only move backwards",
          "Does not contain any microprocessors"
        ],
        kunci: "A",
        pembahasan: "Otonom (autonomous) berarti mampu beroperasi dan mengambil keputusan navigasi secara mandiri berdasarkan sensor tanpa perlu kendali jarak jauh manusia secara terus-menerus.",
        konsepKunci: "Robotics and artificial intelligence terminology."
      },
      {
        nomor: 5,
        id: "ING-08-05",
        tipe: "BS",
        pertanyaan: "Radio signals between Mars and Earth travel instantaneously with zero time delay.",
        opsi: ["SALAH", "BENAR"],
        kunci: "SALAH",
        pembahasan: "Karena jarak puluhan hingga ratusan juta kilometer, sinyal radio cahaya memerlukan waktu tunda (time delay) antara 3 hingga 22 menit untuk menempuh perjalanan antara Mars dan Bumi. Pernyataan SALAH.",
        konsepKunci: "Scientific fact checking."
      }
    ]
  },

  // --- PAKET 9: Economics & Global Supply Chain Dynamics (HOTS Mahir) ---
  {
    id: "ing-p9",
    subjectId: "bahasa-inggris",
    jenjang: "SMA",
    mapelName: "Bahasa Inggris (English Literacy)",
    paketNumber: 9,
    title: "Paket 9: Global Economics: Supply Chains & Semiconductor Chips",
    description: "Menganalisis artikel ekonomi makro rantai pasok semikonduktor, grafik perdagangan global, dan klausa kondisional.",
    levelKesukaran: "Level 3: Analisis & HOTS Mahir",
    durasiMenit: 35,
    passingScore: 50,
    totalSoal: 5,
    soalList: [
      {
        nomor: 1,
        id: "ING-09-01",
        tipe: "PG",
        stimulus: "Semiconductors serve as the fundamental backbone of modern industrial economies, powering everything from smartphones and medical devices to electric vehicles and satellite defense networks. Because silicon chip fabrication involves specialized cleanrooms, nanoscale lithography, and rare raw materials, manufacturing is heavily concentrated in a few geographic hubs. Consequently, any logistical disruption in maritime transport or geopolitical friction can trigger global shortages that halt automotive assembly lines worldwide.",
        pertanyaan: "Why are semiconductor manufacturing facilities geographically concentrated?",
        opsi: [
          "Because silicon chips are made of regular beach sand that can only be found in one desert",
          "Due to the requirement for highly specialized cleanroom infrastructure, extreme precision lithography, and rare materials",
          "Because car manufacturers prefer to produce their own chips by hand",
          "Because governments strictly forbid building electronics factories outside one country"
        ],
        kunci: "B",
        pembahasan: "Teks menjelaskan faktor konsentrasi geografis pabrik chip: 'Because silicon chip fabrication involves specialized cleanrooms, nanoscale lithography, and rare raw materials, manufacturing is heavily concentrated in a few geographic hubs.'",
        konsepKunci: "Understanding industrial logistics in discursive economic text."
      },
      {
        nomor: 2,
        id: "ING-09-02",
        tipe: "MCMA",
        stimulus: "Read the economic impacts of chip shortages.",
        pertanyaan: "What are the repercussions of semiconductor supply chain bottlenecks?",
        opsi: [
          "Automotive assembly factories may temporarily cease operations",
          "Production delays occur across consumer electronics and medical equipment",
          "Shortages can elevate global retail prices of end-user tech products",
          "Global internet connectivity is completely shut down permanently"
        ],
        kunci: ["A", "B", "C"],
        pembahasan: "Kelangkaan chip menghentikan perakitan mobil, menunda produksi gawai medis/elektronik, dan menaikkan harga jual produk konsumen. Opsi D adalah pernyataan ekstrem yang salah.",
        konsepKunci: "Evaluating economic causality and supply-demand imbalances."
      },
      {
        nomor: 3,
        id: "ING-09-03",
        tipe: "BS",
        pertanyaan: "The word 'Consequently' in the passage serves as a causal connector linking reasons to their resulting consequences.",
        opsi: ["BENAR", "SALAH"],
        kunci: "BENAR",
        pembahasan: "'Consequently' (oleh karena itu, akibatnya) adalah kata penghubung logis yang menandai hubungan sebab akibat langsung dari kalimat sebelumnya. Pernyataan BENAR.",
        konsepKunci: "Logical connectors in analytical exposition."
      },
      {
        nomor: 4,
        id: "ING-09-04",
        tipe: "PG",
        pertanyaan: "Which conditional sentence structure expresses an unreal past condition with an unreal past result (Conditional Type 3)?",
        opsi: [
          "If governments had diversified semiconductor supply chains earlier, the manufacturing crisis would have been mitigated.",
          "If governments diversify supply chains, factories will produce more chips.",
          "If governments diversified supply chains, factories would produce more chips.",
          "Governments diversify supply chains whenever crises occur."
        ],
        kunci: "A",
        pembahasan: "Conditional Type 3 menggunakan rumus: If + Past Perfect (had + V3), Subject + would have + V3. Opsi A secara sempurna menerapkan rumus ini untuk situasi lampau.",
        konsepKunci: "Grammar: Third Conditional (Past Unreal Condition)."
      },
      {
        nomor: 5,
        id: "ING-09-05",
        tipe: "BS",
        pertanyaan: "Semiconductors are only utilized in simple desktop toys and are not essential for electric vehicles or telecommunication networks.",
        opsi: ["SALAH", "BENAR"],
        kunci: "SALAH",
        pembahasan: "Teks secara eksplisit menegaskan bahwa semikonduktor menggerakkan smartphone, alat medis, mobil listrik, hingga satelit pertahanan. Pernyataan SALAH.",
        konsepKunci: "Fact verification in industrial literacy."
      }
    ]
  },

  // --- PAKET 10: Artificial Intelligence & The Future of Work (Master HOTS) ---
  {
    id: "ing-p10",
    subjectId: "bahasa-inggris",
    jenjang: "SMA",
    mapelName: "Bahasa Inggris (English Literacy)",
    paketNumber: 10,
    title: "Paket 10: Grand Final Literacy: Artificial Intelligence & Ethics",
    description: "Evaluasi kritis artikel kecerdasan buatan, etika automasi, sintesis argumentasi pro-kontra, dan tone analisis.",
    levelKesukaran: "Level 3: Analisis & HOTS Mahir",
    durasiMenit: 35,
    passingScore: 50,
    totalSoal: 5,
    soalList: [
      {
        nomor: 1,
        id: "ING-10-01",
        tipe: "PG",
        stimulus: "The advent of generative artificial intelligence has precipitated intense philosophical and economic debates. Proponents underscore its extraordinary capacity to accelerate drug discovery, democratize programming, and eliminate mundane clerical chores. Conversely, critics caution against algorithmic bias, intellectual property infringement, and the imminent displacement of white-collar professionals. Rather than viewing AI as an existential replacement for human cognition, scholars advocate for symbiotic augmented intelligence—wherein algorithms handle massive computation while humans contribute moral discernment, creative nuance, and emotional empathy.",
        pertanyaan: "According to the passage, what is the ideal relationship proposed between human intelligence and AI?",
        opsi: [
          "Complete abandonment of all artificial intelligence systems",
          "Allowing algorithms to make all moral and creative decisions without human input",
          "Symbiotic augmented intelligence where AI assists computation while humans provide ethical judgment and creative nuance",
          "Replacing all human workers in every sector within one year"
        ],
        kunci: "C",
        pembahasan: "Kalimat terakhir menjelaskan solusi ideal: '...scholars advocate for symbiotic augmented intelligence—wherein algorithms handle massive computation while humans contribute moral discernment, creative nuance, and emotional empathy.'",
        konsepKunci: "Synthesizing author's central thesis in argumentative academic discourse."
      },
      {
        nomor: 2,
        id: "ING-10-02",
        tipe: "MCMA",
        stimulus: "Read both perspectives on artificial intelligence presented in the text.",
        pertanyaan: "What potential concerns are voiced by critics of generative AI?",
        opsi: [
          "Perpetuation of algorithmic bias in decision making",
          "Potential infringement of intellectual property and copyright",
          "Labor market disruption and displacement of professional workers",
          "AI causing the immediate physical destruction of electrical cables"
        ],
        kunci: ["A", "B", "C"],
        pembahasan: "Kritik mencakup bias algoritma, pelanggaran hak cipta kekayaan intelektual, dan pergeseran lapangan kerja profesional. Opsi D tidak memiliki dasar dalam teks.",
        konsepKunci: "Identifying contrasting arguments in discursive literature."
      },
      {
        nomor: 3,
        id: "ING-10-03",
        tipe: "BS",
        pertanyaan: "The overall tone of the author in this passage can best be characterized as balanced, analytical, and forward-looking.",
        opsi: ["BENAR", "SALAH"],
        kunci: "BENAR",
        pembahasan: "Penulis menyajikan sisi positif (proponents) dan risiko (critics) secara objektif, lalu menawarkan solusi sintesis masa depan (augmented intelligence). Nada tulisan berimbang dan analitis. Pernyataan BENAR.",
        konsepKunci: "Tone and perspective analysis in advanced reading."
      },
      {
        nomor: 4,
        id: "ING-10-04",
        tipe: "PG",
        pertanyaan: "The word 'discernment' in 'moral discernment' is closest in meaning to...",
        opsi: ["Blind obedience", "Judgment and insightful perception", "Physical strength", "Total ignorance"],
        kunci: "B",
        pembahasan: "'Discernment' berarti kebijaksanaan dalam menimbang, daya membedakan hal yang benar dan salah secara tajam (insightful judgment).",
        konsepKunci: "High-level nuance vocabulary."
      },
      {
        nomor: 5,
        id: "ING-10-05",
        tipe: "BS",
        pertanyaan: "Generative AI systems possess inherent human consciousness, biological feelings, and personal moral accountability.",
        opsi: ["SALAH", "BENAR"],
        kunci: "SALAH",
        pembahasan: "AI adalah model matematika dan pemrosesan data statistik tanpa kesadaran biologis, emosi sejati, maupun pertanggungjawaban moral pribadi. Pernyataan SALAH.",
        konsepKunci: "Critical evaluation of AI philosophy."
      }
    ]
  }
];
