/**
 * site.js — portfolio interactions (no dependencies)
 * Theme, EN/BM language, mobile menu, scroll reveal, active nav,
 * copy-to-clipboard and the case-study dialog.
 * Language preference shares the 'afiez_lang' key with assets/js/i18n.js.
 */
(function () {
   'use strict';

   var root = document.documentElement;
   root.classList.add('js');

   function store(key, val) {
      try {
         if (val === undefined) return localStorage.getItem(key);
         localStorage.setItem(key, val);
      } catch (e) { return null; }
   }

   // ─── TRANSLATIONS ──────────────────────────────────────────────────────
   var t = {
      en: {
         skip: 'Skip to content',
         nav_work: 'Work', nav_experience: 'Experience', nav_skills: 'Skills', nav_contact: 'Contact',
         cta_cv: 'Download CV', cta_work: 'View selected work', cta_contact: 'Get in touch',
         cta_cv_view: 'View full résumé (PDF)',
         status: 'Open to new opportunities',
         motto_note: '“Passionate about coding — learn, learn, and keep learning.” — my motto',
         hero_lede: "I'm a <strong>full-stack developer</strong> who loves <em>ilmu</em>. For <strong>3+ years</strong> I've built the systems behind Malaysian public services — Laravel, PHP and JavaScript, PostgreSQL and MySQL, running on Ubuntu — with a real eye for clean, modern UI.",
         meta_company: 'Currently at <strong>Olive Intelligent Management</strong>',
         meta_remote: 'Hybrid / On-site',
         role: 'Full-stack Developer · Laravel',
         fact_focus: 'Focus', fact_focus_val: 'Full-stack · Modern UI', fact_stack: 'Core stack', fact_db: 'Databases', fact_env: 'Environment',
         stat_years: 'Years building production systems',
         stat_platforms: 'Enterprise systems delivered',
         stat_aid: 'State-aid programmes unified in AKSES',
         stat_apis: 'REST APIs designed & shipped',
         clients_label: 'Built for',
         work_eyebrow: 'Selected work',
         work_title: 'Production systems used by <em>real citizens</em>, every day.',
         work_sub: 'Five platforms I\'ve designed, built and shipped — four at Olive, one solo freelance. Open any project for the full case study and screenshots.',
         tag_gov: 'State government', tag_fed: 'Federal agency', tag_uni: 'University', tag_progress: 'In progress',
         lbl_role: 'Role', read_case: 'Read case study',
         role_fullstack: 'Full-stack Developer', role_backend: 'Backend & API Developer', role_lead: 'Lead Developer',
         akses_summary: 'A single digital front door for 46 state-aid programmes — cash aid, housing, education and OKU support — replacing the legacy SSIPR system.',
         intan_title: 'INTAN Ecosystem — 4 platforms',
         intan_summary: "Evaluation, facility booking, competency tracking and media repository for Malaysia's public-sector training institute — all powered by Lumen REST APIs.",
         picoms_summary: 'Student-affairs back office with role-based access (hostels, discipline, welfare) plus a self-service academic portal for students.',
         elmas_summary: "Digitising how elected representatives' offices handle complaints, aid applications and programme enquiries — replacing paper forms with a trackable, transparent workflow.",
         exp_eyebrow: 'Experience',
         exp_title: 'From electronics engineering to <em>enterprise software.</em>',
         now: 'Present',
         job_olive: 'Software Developer', job_netcare: 'Network Engineer Trainee',
         olive_points: '<li>Delivered <strong>5+ enterprise systems</strong> for Selangor State Government, INTAN, UCMI and PTG Johor.</li><li>Lead developer on <strong>eLMAS Community</strong> for DUN &amp; Parliament offices — owning the full SDLC.</li><li>Built admin &amp; public portals for <strong>AKSES Selangor</strong>, including complex data migrations from legacy SSIPR.</li><li>Designed and maintained <strong>Lumen REST APIs</strong> for four INTAN platforms.</li><li>Set up servers (Ubuntu, Nginx/Apache) and CI/CD with GitHub Actions; kept legacy apps at <strong>99% uptime</strong> while cutting load times.</li>',
         education: 'Education',
         degree_name: 'Bachelor of Electronic Engineering Technology (Hons.)',
         diploma_name: 'Diploma in Electronic Engineering',
         skills_eyebrow: 'Capabilities',
         skills_title: 'Full-stack ownership, <em>from database to UI.</em>',
         sk_backend: 'Backend development', sk_backend_d: 'Laravel is my core — PHP 8, Laravel 11 to 13 and Lumen. Eloquent where it helps, raw SQL where performance matters.',
         sk_api: 'REST API design', sk_api_d: "Secure, versioned APIs consumed by multiple front-ends across INTAN's nationwide network.",
         sk_db: 'Database architecture', sk_db_d: 'PostgreSQL and MySQL — relational modelling and large legacy migrations for high-traffic government portals.',
         sk_fe: 'Frontend & modern UI', sk_fe_d: 'Clean, responsive interfaces built on modern UI practice — clear hierarchy, dark mode, subtle motion and accessibility — from Vue SPAs to Bootstrap admin portals.',
         sk_cicd: 'CI/CD & DevOps', sk_cicd_d: 'Automated pipelines with GitHub Actions, Docker containers and Git-based releases to staging and production.',
         sk_server: 'Server provisioning', sk_server_d: 'Ubuntu is my daily environment — servers built from scratch with Nginx/Apache, PHP runtime, SSL and hardening.',
         quote: 'Afiez is a hardworking staff member who learns quickly and is highly dedicated to his work. He is willing to work extra hours to ensure deadlines are met, and is a very helpful and supportive teammate.',
         quote_role: 'Senior Software Engineer, Olive Intelligent Management',
         contact_eyebrow: 'Contact',
         contact_title: "Hiring a Laravel or full-stack developer? <em>Let's talk.</em>",
         contact_sub: 'Email works best — or message me on WhatsApp.',
         c_phone: 'Phone', c_location: 'Location',
         copyright: '© 2026 Mohd Afiez Bin Abdul Haris. All rights reserved.',
         to_top: 'Back to top',
         // dialog / runtime
         copied: 'Email copied to clipboard',
         f_client: 'Client', f_role: 'Role', f_stack: 'Stack', f_status: 'Status',
         visit: 'Visit live site',
         menu_open: 'Open menu', menu_close: 'Close menu',
         lang_aria: 'Switch language to Bahasa Melayu',
         aria_theme: 'Toggle colour theme', aria_profile: 'Profile summary', aria_highlights: 'Highlights', aria_clients: 'Clients',
         aria_open_akses: 'Open AKSES case study', aria_open_intan: 'Open INTAN case study', aria_open_picoms: 'Open UCMI eHEPA and eAcademic case study', aria_open_elmas: 'Open eLMAS Community case study',
         aria_testimonial: 'Testimonial', aria_close_case: 'Close case study', aria_screens: 'Screenshots', aria_prev: 'Previous screenshot', aria_next: 'Next screenshot', aria_github: 'GitHub profile (opens in new tab)',
         aria_open_alhuda: 'Open Poliklinik Al-Huda case study',
         aria_linkedin: 'LinkedIn profile (opens in new tab)',
         tag_freelance: 'Freelance',
         alhuda_title: 'Poliklinik Al-Huda — portal & clinic system',
         alhuda_summary: 'A modern public website plus a full clinic management system — queue, medical records, pharmacy, billing and QR-verified documents — designed and built solo.',
         role_solo: 'Solo Full-stack Developer',
         job_freelance: 'Freelance Full-stack Developer',
         freelance_points: '<li>Designed and built the clinic\'s public website and internal management system <strong>solo</strong>, from requirements to production.</li><li>Laravel 13, Inertia, <strong>Vue 3</strong> and <strong>Tailwind CSS</strong>, real-time staff notifications with Laravel Reverb, deployed via GitHub Actions.</li>',
         when_netcare: 'Feb — Aug 2022',
         netcare_points: '<li>Configured and deployed enterprise network hardware — switches, firewalls and servers.</li><li>Worked on network security infrastructure using Sophos and HP systems.</li>',
         degree_major: 'Electronic Network Design',
         diploma_major: 'Communication',
         certs: 'Certifications & awards',
         award_silver: 'Silver Medal, FYP 2017',
         tools_label: 'Daily tools',
         ai_label: 'AI-assisted workflow',
         st_live_freelance: 'Live in production · v2.0',
         aria_swap_photo: 'Switch photo — see the off-duty me', hold_hint: 'Press & hold to scatter', click_me: 'Click me', photo_casual: 'Off duty', photo_pro: 'At work',
         st_live: 'Live in production', st_progress: 'In active development'
      },

      bm: {
         skip: 'Langkau ke kandungan',
         nav_work: 'Projek', nav_experience: 'Pengalaman', nav_skills: 'Kemahiran', nav_contact: 'Hubungi',
         cta_cv: 'Muat Turun CV', cta_work: 'Lihat projek terpilih', cta_contact: 'Hubungi saya',
         cta_cv_view: 'Lihat resume penuh (PDF)',
         status: 'Terbuka untuk peluang baharu',
         motto_note: '— moto saya',
         hero_lede: 'Saya <strong>pembangun full-stack</strong> yang cintakan <em>ilmu</em>. Selama <strong>3+ tahun</strong> saya membina sistem di sebalik perkhidmatan awam Malaysia — Laravel, PHP dan JavaScript, PostgreSQL dan MySQL, berjalan di Ubuntu — dengan perhatian tinggi terhadap UI moden yang kemas.',
         meta_company: 'Kini di <strong>Olive Intelligent Management</strong>',
         meta_remote: 'Hibrid / Di pejabat',
         role: 'Pembangun Full-stack · Laravel',
         fact_focus: 'Fokus', fact_focus_val: 'Full-stack · UI Moden', fact_stack: 'Stack utama', fact_db: 'Pangkalan data', fact_env: 'Persekitaran',
         stat_years: 'Tahun membina sistem produksi',
         stat_platforms: 'Sistem enterprise disiapkan',
         stat_aid: 'Program bantuan negeri disatukan dalam AKSES',
         stat_apis: 'REST API direka & dilancarkan',
         clients_label: 'Dibina untuk',
         work_eyebrow: 'Projek terpilih',
         work_title: 'Sistem sebenar yang digunakan <em>rakyat</em> setiap hari.',
         work_sub: 'Lima platform yang saya reka, bina dan lancarkan — empat di Olive, satu projek freelance secara solo. Buka mana-mana projek untuk kajian kes penuh dan tangkapan skrin.',
         tag_gov: 'Kerajaan negeri', tag_fed: 'Agensi persekutuan', tag_uni: 'Universiti', tag_progress: 'Dalam proses',
         lbl_role: 'Peranan', read_case: 'Baca kajian kes',
         role_fullstack: 'Pembangun Full-stack', role_backend: 'Pembangun Backend & API', role_lead: 'Pembangun Utama',
         akses_summary: 'Satu pintu masuk digital untuk 46 program bantuan negeri — bantuan tunai, perumahan, pendidikan dan OKU — menggantikan sistem lama SSIPR.',
         intan_title: 'Ekosistem INTAN — 4 platform',
         intan_summary: 'Penilaian, tempahan fasiliti, penjejakan kompetensi dan repositori media untuk institut latihan sektor awam Malaysia — semuanya dikuasakan REST API Lumen.',
         picoms_summary: 'Sistem pentadbiran Hal Ehwal Pelajar (HEP) dengan kawalan akses berasaskan peranan (asrama, disiplin, kebajikan) serta portal akademik layan-diri untuk pelajar.',
         elmas_summary: 'Mendigitalkan cara pejabat wakil rakyat mengurus aduan, permohonan bantuan dan pertanyaan program — menggantikan borang kertas dengan aliran kerja yang telus dan boleh dijejak.',
         exp_eyebrow: 'Pengalaman',
         exp_title: 'Dari kejuruteraan elektronik ke <em>dunia perisian enterprise.</em>',
         now: 'Kini',
         job_olive: 'Pembangun Perisian', job_netcare: 'Pelatih Jurutera Rangkaian',
         olive_points: '<li>Menyiapkan <strong>5+ sistem enterprise</strong> untuk Kerajaan Negeri Selangor, INTAN, UCMI dan PTG Johor.</li><li>Pembangun utama <strong>eLMAS Community</strong> untuk pejabat DUN &amp; Parlimen — bertanggungjawab atas keseluruhan SDLC.</li><li>Membina portal admin &amp; awam <strong>AKSES Selangor</strong>, termasuk migrasi data kompleks daripada SSIPR.</li><li>Mereka bentuk dan menyelenggara <strong>REST API Lumen</strong> untuk empat platform INTAN.</li><li>Menyediakan server (Ubuntu, Nginx/Apache) dan CI/CD dengan GitHub Actions; mengekalkan aplikasi lama pada <strong>99% uptime</strong> sambil mempercepatkan masa muat.</li>',
         education: 'Pendidikan',
         degree_name: 'Ijazah Sarjana Muda Teknologi Kejuruteraan Elektronik (Kepujian)',
         diploma_name: 'Diploma Kejuruteraan Elektronik',
         skills_eyebrow: 'Keupayaan',
         skills_title: 'Full-stack sepenuhnya, <em>dari pangkalan data hingga UI.</em>',
         sk_backend: 'Pembangunan backend', sk_backend_d: 'Laravel ialah teras saya — PHP 8, Laravel 11 hingga 13 dan Lumen. Eloquent bila sesuai, SQL mentah bila prestasi penting.',
         sk_api: 'Reka bentuk REST API', sk_api_d: 'API selamat dan berversi yang digunakan pelbagai front-end di seluruh rangkaian INTAN.',
         sk_db: 'Seni bina pangkalan data', sk_db_d: 'PostgreSQL dan MySQL — pemodelan hubungan dan migrasi data lama berskala besar untuk portal kerajaan bertrafik tinggi.',
         sk_fe: 'Frontend & UI moden', sk_fe_d: 'Antara muka responsif dan kemas berasaskan amalan UI moden — hierarki jelas, mod gelap, animasi halus dan kebolehcapaian — daripada SPA Vue hingga portal admin Bootstrap.',
         sk_cicd: 'CI/CD & DevOps', sk_cicd_d: 'Pipeline automatik dengan GitHub Actions, kontena Docker dan release berasaskan Git ke persekitaran staging dan produksi.',
         sk_server: 'Penyediaan server', sk_server_d: 'Ubuntu ialah persekitaran harian saya — server dibina dari kosong dengan Nginx/Apache, PHP, SSL dan pengukuhan keselamatan.',
         quote: 'Afiez seorang kakitangan yang rajin, cepat belajar dan sangat berdedikasi. Beliau sanggup bekerja lebih masa untuk memastikan tarikh akhir dipenuhi, dan merupakan rakan sepasukan yang sangat membantu.',
         quote_role: 'Jurutera Perisian Kanan, Olive Intelligent Management',
         contact_eyebrow: 'Hubungi',
         contact_title: 'Mencari pembangun Laravel atau full-stack? <em>Jom berbincang.</em>',
         contact_sub: 'E-mel paling sesuai — atau mesej saya di WhatsApp.',
         c_phone: 'Telefon', c_location: 'Lokasi',
         copyright: '© 2026 Mohd Afiez Bin Abdul Haris. Hak cipta terpelihara.',
         to_top: 'Kembali ke atas',
         copied: 'E-mel disalin',
         f_client: 'Klien', f_role: 'Peranan', f_stack: 'Stack', f_status: 'Status',
         visit: 'Buka laman web',
         menu_open: 'Buka menu', menu_close: 'Tutup menu',
         lang_aria: 'Tukar bahasa ke English',
         aria_theme: 'Tukar tema warna', aria_profile: 'Ringkasan profil', aria_highlights: 'Sorotan', aria_clients: 'Klien',
         aria_open_akses: 'Buka kajian kes AKSES', aria_open_intan: 'Buka kajian kes INTAN', aria_open_picoms: 'Buka kajian kes eHEPA dan eAcademic UCMI', aria_open_elmas: 'Buka kajian kes eLMAS Community',
         aria_testimonial: 'Testimoni', aria_close_case: 'Tutup kajian kes', aria_screens: 'Tangkapan skrin', aria_prev: 'Tangkapan skrin sebelumnya', aria_next: 'Tangkapan skrin seterusnya', aria_github: 'Profil GitHub (buka di tab baharu)',
         aria_open_alhuda: 'Buka kajian kes Poliklinik Al-Huda',
         aria_linkedin: 'Profil LinkedIn (buka di tab baharu)',
         tag_freelance: 'Freelance',
         alhuda_title: 'Poliklinik Al-Huda — portal & sistem klinik',
         alhuda_summary: 'Laman web awam moden serta sistem pengurusan klinik lengkap — giliran, rekod perubatan, farmasi, bil dan dokumen disahkan kod QR — direka dan dibina secara solo.',
         role_solo: 'Pembangun Full-stack Solo',
         job_freelance: 'Pembangun Full-stack Freelance',
         freelance_points: '<li>Mereka bentuk dan membina laman web awam serta sistem pengurusan dalaman klinik <strong>secara solo</strong>, dari keperluan hingga produksi.</li><li>Laravel 13, Inertia, <strong>Vue 3</strong> dan <strong>Tailwind CSS</strong>, notifikasi staf masa nyata dengan Laravel Reverb, dilancarkan melalui GitHub Actions.</li>',
         when_netcare: 'Feb — Ogos 2022',
         netcare_points: '<li>Mengkonfigurasi dan memasang perkakasan rangkaian enterprise — suis, firewall dan server.</li><li>Terlibat dalam infrastruktur keselamatan rangkaian menggunakan sistem Sophos dan HP.</li>',
         degree_major: 'Reka Bentuk Rangkaian Elektronik',
         diploma_major: 'Komunikasi',
         certs: 'Sijil & anugerah',
         award_silver: 'Pingat Perak, Projek Tahun Akhir 2017',
         tools_label: 'Alatan harian',
         ai_label: 'Aliran kerja berbantu AI',
         st_live_freelance: 'Beroperasi dalam produksi · v2.0',
         aria_swap_photo: 'Tukar gambar — lihat saya santai', hold_hint: 'Tekan & tahan untuk serakkan', click_me: 'Klik saya', photo_casual: 'Santai', photo_pro: 'Bekerja',
         st_live: 'Beroperasi dalam produksi', st_progress: 'Dalam pembangunan aktif'
      }
   };

   // ─── CASE STUDIES ──────────────────────────────────────────────────────
   var cases = {
      akses: {
         title: 'AKSES — Aplikasi KitaSelangor Sepadu',
         client: 'Kerajaan Negeri Selangor',
         role: 'role_fullstack',
         stack: 'PHP 8.3 · Laravel · PostgreSQL · GitHub Actions',
         status: 'st_live',
         images: ['akses-3', 'akses-1', 'akses-2'],
         alt: 'AKSES screenshot',
         links: [{ href: 'https://akses.selangor.gov.my', label: 'akses.selangor.gov.my' }],
         en: '<h3>The problem</h3><p>Selangor residents had to navigate dozens of separate channels to apply for state aid. Under the <strong>Iltizam KitaSelangor Penyayang</strong> initiative, the state needed one place to apply for all of it.</p><h3>The product</h3><p>AKSES consolidates <strong>46 government aid programmes</strong> — cash assistance, housing, education and support for persons with disabilities (OKU) — into a single portal where citizens apply, track status and receive updates.</p><h3>What I did</h3><ul><li>Built features across both the <strong>admin portal</strong> (officers processing applications) and the <strong>public portal</strong> (citizens applying).</li><li>Planned and executed <strong>complex database migrations</strong> from the legacy SSIPR system during the rebrand to AKSES.</li><li>Shipped through a GitHub Actions CI/CD pipeline to production.</li></ul>',
         bm: '<h3>Masalah</h3><p>Warga Selangor terpaksa melalui pelbagai saluran berasingan untuk memohon bantuan negeri. Di bawah inisiatif <strong>Iltizam KitaSelangor Penyayang</strong>, kerajaan negeri memerlukan satu tempat untuk semuanya.</p><h3>Produk</h3><p>AKSES menyatukan <strong>46 program bantuan kerajaan</strong> — bantuan tunai, perumahan, pendidikan dan sokongan OKU — ke dalam satu portal di mana rakyat boleh memohon, menyemak status dan menerima makluman.</p><h3>Sumbangan saya</h3><ul><li>Membina fungsi untuk <strong>portal admin</strong> (pegawai memproses permohonan) dan <strong>portal awam</strong> (rakyat memohon).</li><li>Merancang dan melaksanakan <strong>migrasi pangkalan data yang kompleks</strong> daripada sistem lama SSIPR semasa penjenamaan semula ke AKSES.</li><li>Melancarkan ke produksi melalui pipeline CI/CD GitHub Actions.</li></ul>'
      },
      alhuda: {
         title: 'Poliklinik Al-Huda',
         titleKey: 'alhuda_title',
         client: 'Poliklinik Al-Huda, Jitra, Kedah',
         role: 'role_solo',
         stack: 'Laravel 13 · Inertia · Vue 3 · Tailwind CSS · MySQL · Reverb',
         status: 'st_live_freelance',
         images: ['alhuda-1', 'alhuda-2', 'alhuda-3'],
         alt: 'Poliklinik Al-Huda screenshot',
         links: [{ href: 'https://poliklinikalhuda.com/', label: 'poliklinikalhuda.com' }],
         en: '<h3>The brief</h3><p>Poliklinik Al-Huda, a family clinic in Jitra, Kedah, needed a modern public website and an internal system to run the clinic day to day — from the registration counter to the pharmacy.</p><h3>The product</h3><ul><li><strong>Public portal</strong> — services, opening hours, health tips and patient testimonials with admin moderation.</li><li><strong>Clinic management system</strong> — patient registration, live queue, appointments, electronic medical records with <strong>SOAP notes and ICD-10 diagnoses</strong>, digital prescriptions, pharmacy &amp; inventory, billing, finance and reports.</li><li><strong>Clinical documents</strong> — MCs, referral letters and test results with <strong>QR-code verification</strong>.</li><li><strong>Security</strong> — role-based access for doctors, nurses, pharmacists, receptionists, finance and admin, a full audit log and Google sign-in.</li></ul><h3>What I did</h3><ul><li>Everything, <strong>solo</strong>: requirements, UI design, database, backend, frontend and deployment.</li><li>Built a modern single-page app with <strong>Laravel 13, Inertia and Vue 3</strong>, styled with Tailwind CSS, with real-time staff notifications via Laravel Reverb.</li><li>Automated deployment to a VPS with GitHub Actions, backed by PHPUnit feature and unit tests.</li><li>Bilingual interface (BM / EN).</li></ul>',
         bm: '<h3>Keperluan</h3><p>Poliklinik Al-Huda, klinik keluarga di Jitra, Kedah, memerlukan laman web awam yang moden dan sistem dalaman untuk menguruskan operasi harian klinik — dari kaunter pendaftaran hingga ke farmasi.</p><h3>Produk</h3><ul><li><strong>Portal awam</strong> — perkhidmatan, waktu operasi, tips kesihatan dan testimoni pesakit dengan moderasi admin.</li><li><strong>Sistem pengurusan klinik</strong> — pendaftaran pesakit, giliran langsung, temujanji, rekod perubatan elektronik dengan <strong>nota SOAP dan diagnosis ICD-10</strong>, preskripsi digital, farmasi &amp; inventori, bil, kewangan dan laporan.</li><li><strong>Dokumen klinikal</strong> — MC, surat rujukan dan keputusan ujian dengan <strong>pengesahan kod QR</strong>.</li><li><strong>Keselamatan</strong> — kawalan akses berasaskan peranan untuk doktor, jururawat, farmasi, kaunter, kewangan dan admin, log audit penuh serta log masuk Google.</li></ul><h3>Sumbangan saya</h3><ul><li>Semuanya <strong>secara solo</strong>: keperluan, reka bentuk UI, pangkalan data, backend, frontend dan deployment.</li><li>Membina aplikasi satu halaman moden dengan <strong>Laravel 13, Inertia dan Vue 3</strong>, digayakan dengan Tailwind CSS, serta notifikasi staf masa nyata melalui Laravel Reverb.</li><li>Deployment automatik ke VPS dengan GitHub Actions, disokong ujian feature dan unit PHPUnit.</li><li>Antara muka dwibahasa (BM / EN).</li></ul>'
      },
      intan: {
         title: 'INTAN Ecosystem',
         titleKey: 'intan_title',
         client: 'Institut Tadbiran Awam Negara (INTAN)',
         role: 'role_backend',
         stack: 'Lumen · Laravel · PostgreSQL · RESTful API',
         status: 'st_live',
         images: ['intan-2', 'intan-1', 'intan-3'],
         alt: 'INTAN platform screenshot',
         links: [
            { href: 'https://booking2u.intan.my/', label: 'booking2u.intan.my' },
            { href: 'https://media.intan.my/', label: 'media.intan.my' }
         ],
         en: "<p>INTAN is Malaysia's premier public-sector training institute. I engineered and maintain several of its production platforms, all backed by <strong>secure RESTful APIs built with Lumen</strong> and serving staff and management across INTAN's nationwide network.</p><h3>Platforms</h3><ul><li><strong>ePenilaian</strong> — course and training evaluation for civil servants, covering ICT courses (ISAC module), English assessment (ELPA), leadership courses and special examinations.</li><li><strong>Booking4U</strong> — facility booking for seminar rooms, meeting rooms, dormitories and halls, with slot management, approvals and usage reports.</li><li><strong>CTMG</strong> (Competency Tracking &amp; Monitoring Gateway) — ILA course registration, competency tracking and automated training-performance reports.</li><li><strong>Media INTAN</strong> — central repository for training videos, slides and e-learning content.</li></ul><h3>What I did</h3><ul><li>Designed the API layer shared across these platforms.</li><li>Owned backend features, data modelling and ongoing maintenance in production.</li></ul>",
         bm: '<p>INTAN ialah institusi latihan sektor awam utama Malaysia. Saya membangun dan menyelenggara beberapa platform produksinya, semuanya disokong <strong>RESTful API selamat yang dibina dengan Lumen</strong> untuk kakitangan dan pengurusan di seluruh rangkaian INTAN.</p><h3>Platform</h3><ul><li><strong>ePenilaian</strong> — penilaian kursus dan latihan kakitangan awam, termasuk kursus ICT (modul ISAC), penilaian bahasa Inggeris (ELPA), kursus kepimpinan dan ujian khas.</li><li><strong>Booking4U</strong> — tempahan bilik seminar, bilik mesyuarat, asrama dan dewan dengan pengurusan slot, kelulusan dan laporan penggunaan.</li><li><strong>CTMG</strong> (Competency Tracking &amp; Monitoring Gateway) — pendaftaran kursus ILA, penjejakan kompetensi dan laporan prestasi latihan automatik.</li><li><strong>Media INTAN</strong> — repositori berpusat untuk video latihan, slaid dan kandungan e-pembelajaran.</li></ul><h3>Sumbangan saya</h3><ul><li>Mereka bentuk lapisan API yang dikongsi merentas platform ini.</li><li>Bertanggungjawab atas fungsi backend, pemodelan data dan penyelenggaraan berterusan dalam produksi.</li></ul>'
      },
      picoms: {
         title: 'eHEPA & eAcademic',
         client: 'Kolej Universiti Antarabangsa MAIWP (UCMI)',
         role: 'role_fullstack',
         stack: 'Laravel · PostgreSQL · JavaScript · Bootstrap 5',
         status: 'st_live',
         images: ['picoms-1', 'picoms-3', 'picoms-2'],
         alt: 'UCMI system screenshot',
         links: [],
         en: '<p>Critical modules for a university under Majlis Agama Islam Wilayah Persekutuan (MAIWP), digitising key academic and administrative workflows across two platforms.</p><h3>Platforms</h3><ul><li><strong>eHEPA</strong> — student-affairs system for admin staff: hostel management, discipline records, summons and student welfare, with a full <strong>role-based access control (RBAC)</strong> workflow.</li><li><strong>eAcademic</strong> — self-service portal where students check CGPA, GPA, subject marks and their full academic history.</li></ul><h3>What I did</h3><ul><li>Built features end-to-end — schema, Laravel backend and Bootstrap/JavaScript UI.</li><li>Implemented RBAC so each staff role only sees and approves what it should.</li></ul>',
         bm: '<p>Modul kritikal untuk universiti di bawah Majlis Agama Islam Wilayah Persekutuan (MAIWP), mendigitalkan aliran kerja akademik dan pentadbiran merentas dua platform.</p><h3>Platform</h3><ul><li><strong>eHEPA</strong> — sistem Hal Ehwal Pelajar untuk kakitangan: pengurusan asrama, rekod disiplin, saman dan kebajikan pelajar, dengan aliran kerja <strong>kawalan akses berasaskan peranan (RBAC)</strong> yang lengkap.</li><li><strong>eAcademic</strong> — portal layan-diri untuk pelajar menyemak CGPA, GPA, markah subjek dan sejarah akademik.</li></ul><h3>Sumbangan saya</h3><ul><li>Membina fungsi dari hujung ke hujung — skema, backend Laravel dan UI Bootstrap/JavaScript.</li><li>Melaksanakan RBAC supaya setiap peranan hanya melihat dan meluluskan apa yang sepatutnya.</li></ul>'
      },
      elmas: {
         title: 'eLMAS Community',
         client: 'Pejabat DUN / Parlimen',
         role: 'role_lead',
         stack: 'Laravel · PostgreSQL · JavaScript · Bootstrap 5',
         status: 'st_progress',
         images: ['elmas-1', 'elmas-2'],
         alt: 'eLMAS Community screenshot',
         links: [],
         en: "<h3>The problem</h3><p>Offices of state assemblymen (DUN) and members of parliament handled constituents' complaints and aid requests on <strong>paper forms</strong> — hard to track, slow to follow up and opaque to the public.</p><h3>The product</h3><p>eLMAS Community lets citizens submit <strong>complaints, aid applications and programme enquiries online</strong>, while representatives' offices track, review and manage every record in one transparent workflow.</p><h3>What I do</h3><ul><li>As <strong>Lead Developer</strong>, I own the architecture, data model and delivery of the platform.</li><li>Building the case-management back office (complaints, aid, programmes) and the citizen-facing intake.</li><li>This is Olive's newest product line, extending its enterprise portfolio to elected representatives at state and federal level.</li></ul>",
         bm: '<h3>Masalah</h3><p>Pejabat ADUN dan Ahli Parlimen mengurus aduan dan permohonan bantuan rakyat menggunakan <strong>borang kertas</strong> — sukar dijejak, lambat disusuli dan tidak telus.</p><h3>Produk</h3><p>eLMAS Community membolehkan rakyat mengemukakan <strong>aduan, permohonan bantuan dan pertanyaan program secara dalam talian</strong>, manakala pejabat wakil rakyat menjejak, menyemak dan mengurus setiap rekod dalam satu aliran kerja yang telus.</p><h3>Peranan saya</h3><ul><li>Sebagai <strong>Pembangun Utama</strong>, saya bertanggungjawab atas seni bina, model data dan penghantaran platform.</li><li>Membina sistem pengurusan kes (aduan, bantuan, program) dan saluran permohonan untuk rakyat.</li><li>Ini adalah barisan produk terbaharu Olive, memperluas portfolio enterprise kepada wakil rakyat di peringkat negeri dan persekutuan.</li></ul>'
      }
   };

   // ─── LANGUAGE ──────────────────────────────────────────────────────────
   var lang = store('afiez_lang') === 'bm' ? 'bm' : 'en';
   var langBtn = document.getElementById('lang-toggle');

   function tr(key) { return (t[lang] && t[lang][key]) || t.en[key] || key; }

   function applyLang(next) {
      lang = next;
      store('afiez_lang', lang);
      root.lang = lang === 'bm' ? 'ms' : 'en';
      var s = t[lang];
      document.querySelectorAll('[data-i18n]').forEach(function (el) {
         var k = el.getAttribute('data-i18n');
         if (s[k] !== undefined) el.textContent = s[k];
      });
      document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
         var k = el.getAttribute('data-i18n-html');
         if (s[k] !== undefined) el.innerHTML = s[k];
      });
      document.querySelectorAll('[data-i18n-title]').forEach(function (el) {
         var k = el.getAttribute('data-i18n-title');
         if (s[k] !== undefined) el.setAttribute('title', s[k]);
      });
      document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
         var k = el.getAttribute('data-i18n-aria');
         if (s[k] !== undefined) el.setAttribute('aria-label', s[k]);
      });
      if (langBtn) {
         langBtn.querySelector('.lang-label').textContent = lang === 'en' ? 'BM' : 'EN';
         langBtn.setAttribute('aria-label', tr('lang_aria'));
      }
      if (dialog && dialog.open && current) renderCase(current);
   }

   if (langBtn) langBtn.addEventListener('click', function () { applyLang(lang === 'en' ? 'bm' : 'en'); });

   // ─── THEME ─────────────────────────────────────────────────────────────
   var themeBtn = document.getElementById('theme-toggle');
   if (themeBtn) themeBtn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      store('afiez_theme', next);
   });

   // ─── HEADER + MOBILE MENU ──────────────────────────────────────────────
   var header = document.querySelector('.site-header');
   var onScroll = function () { header.classList.toggle('is-scrolled', window.scrollY > 8); };
   onScroll();
   window.addEventListener('scroll', onScroll, { passive: true });

   var menuBtn = document.getElementById('menu-toggle');
   var menu = document.getElementById('mobile-menu');
   function setMenu(open) {
      menuBtn.setAttribute('aria-expanded', String(open));
      menuBtn.setAttribute('aria-label', tr(open ? 'menu_close' : 'menu_open'));
      menu.hidden = !open;
      header.classList.toggle('is-scrolled', open || window.scrollY > 8);
   }
   menuBtn.addEventListener('click', function () { setMenu(menu.hidden); });
   menu.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
   document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !menu.hidden) { setMenu(false); menuBtn.focus(); } });
   window.matchMedia('(min-width: 861px)').addEventListener('change', function (m) { if (m.matches) setMenu(false); });

   // ─── REVEAL + ACTIVE NAV ───────────────────────────────────────────────
   if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
         entries.forEach(function (en) {
            if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
         });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
      document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });

      var links = document.querySelectorAll('.primary-nav a');
      var spy = new IntersectionObserver(function (entries) {
         entries.forEach(function (en) {
            if (!en.isIntersecting) return;
            links.forEach(function (a) { a.classList.toggle('is-active', a.getAttribute('href') === '#' + en.target.id); });
         });
      }, { rootMargin: '-45% 0px -50% 0px' });
      ['work', 'experience', 'skills', 'contact'].forEach(function (id) {
         var el = document.getElementById(id);
         if (el) spy.observe(el);
      });
   } else {
      document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('is-in'); });
   }

   // ─── PORTRAIT SWAP (work ↔ off duty) ──────────────────────────────────
   var portrait = document.getElementById('portrait');
   var swapBtn = document.getElementById('portrait-swap');
   if (portrait && swapBtn) {
      var used = store('afiez_swap_used') === '1';
      var calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      var particles = null;
      if (used) portrait.classList.add('is-used');

      swapBtn.addEventListener('click', function () {
         var alt = portrait.classList.toggle('is-alt');
         swapBtn.setAttribute('aria-pressed', String(alt));
         portrait.classList.add('is-used');
         store('afiez_swap_used', '1');
         if (particles) particles.swap(alt);
      });

      // Particle portrait (Motion + three.js). Falls back to the "peek" below if unavailable.
      var peek = function () {
         if (used) return;
         setTimeout(function () {
            if (portrait.classList.contains('is-used')) return;
            portrait.classList.add('is-alt');
            setTimeout(function () {
               if (swapBtn.getAttribute('aria-pressed') !== 'true') portrait.classList.remove('is-alt');
            }, 1300);
         }, 2200);
      };

      var loadParticles = function () {
         import('./portrait-particles.js')
            .then(function (m) {
               return m.mountPortraitParticles({
                  portrait: portrait,
                  photos: portrait.querySelector('.portrait-photos'),
                  startAlt: portrait.classList.contains('is-alt')
               });
            })
            .then(function (api) { particles = api; })
            .catch(function (err) {
               if (window.console) console.warn('Particle portrait unavailable:', err);
               var c = portrait.querySelector('.portrait-canvas');
               if (c) c.remove();
               portrait.classList.remove('has-particles');
               peek();
            });
      };

      // Fetch the 3D libraries only after the page itself has finished loading
      if (!calm) {
         var idle = window.requestIdleCallback || function (fn) { return setTimeout(fn, 200); };
         if (document.readyState === 'complete') idle(loadParticles);
         else window.addEventListener('load', function () { idle(loadParticles); }, { once: true });
      }
   }

   // ─── COPY EMAIL ────────────────────────────────────────────────────────
   var toast = document.getElementById('toast');
   var toastTimer;
   function showToast(msg) {
      toast.textContent = msg;
      toast.classList.add('is-visible');
      clearTimeout(toastTimer);
      toastTimer = setTimeout(function () { toast.classList.remove('is-visible'); }, 2200);
   }
   document.querySelectorAll('[data-copy]').forEach(function (btn) {
      btn.addEventListener('click', function () {
         var val = btn.getAttribute('data-copy');
         if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(val).then(function () { showToast(tr('copied')); },
               function () { location.href = 'mailto:' + val; });
         } else {
            location.href = 'mailto:' + val;
         }
      });
   });

   // ─── CASE STUDY DIALOG ─────────────────────────────────────────────────
   var dialog = document.getElementById('case-dialog');
   var current = null;
   var lastTrigger = null;
   var track = document.getElementById('case-gallery');
   var count = document.getElementById('case-count');

   function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

   function renderCase(id) {
      var c = cases[id];
      if (!c) return;
      document.getElementById('case-title').textContent = c.titleKey ? tr(c.titleKey) : c.title;
      document.getElementById('case-client').textContent = c.client;

      track.innerHTML = c.images.map(function (img, i) {
         return '<img src="assets/img/work/' + img + '.webp" width="1600" height="800" alt="' + esc(c.alt + ' ' + (i + 1)) + '"' + (i ? ' loading="lazy"' : '') + ' decoding="async">';
      }).join('');

      document.getElementById('case-facts').innerHTML =
         '<div><dt>' + tr('f_client') + '</dt><dd>' + esc(c.client) + '</dd></div>' +
         '<div><dt>' + tr('f_role') + '</dt><dd>' + tr(c.role) + '</dd></div>' +
         '<div><dt>' + tr('f_stack') + '</dt><dd>' + esc(c.stack) + '</dd></div>' +
         '<div><dt>' + tr('f_status') + '</dt><dd>' + tr(c.status) + '</dd></div>';

      document.getElementById('case-text').innerHTML = c[lang] || c.en;

      document.getElementById('case-foot').innerHTML = c.links.map(function (l, i) {
         return '<a class="btn ' + (i ? 'btn-ghost' : 'btn-primary') + '" href="' + l.href + '" target="_blank" rel="noopener">' +
            (i ? '' : tr('visit') + ' · ') + esc(l.label) + ' <span aria-hidden="true">↗</span></a>';
      }).join('');

      updateCount();
   }

   function updateCount() {
      var n = track.children.length;
      var i = Math.round(track.scrollLeft / ((track.clientWidth + 16) || 1));
      count.textContent = n ? (i + 1) + ' / ' + n : '';
   }
   track.addEventListener('scroll', function () { window.requestAnimationFrame(updateCount); }, { passive: true });
   dialog.querySelectorAll('[data-gal]').forEach(function (b) {
      b.addEventListener('click', function () {
         var dir = Number(b.getAttribute('data-gal'));
         var n = track.children.length;
         var i = Math.round(track.scrollLeft / (track.clientWidth + 16));
         var next = (i + dir + n) % n;
         track.scrollTo({ left: next * (track.clientWidth + 16), behavior: 'smooth' });
      });
   });
   track.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
         e.preventDefault();
         dialog.querySelector('[data-gal="' + (e.key === 'ArrowRight' ? 1 : -1) + '"]').click();
      }
   });

   function openCase(id, trigger) {
      if (!cases[id]) return;
      current = id;
      lastTrigger = trigger || null;
      renderCase(id);
      dialog.showModal();
      document.body.style.overflow = 'hidden';
      dialog.querySelector('.case-inner').scrollTop = 0;
      track.scrollLeft = 0;
      updateCount();
      if (location.hash !== '#case-' + id) history.replaceState(null, '', '#case-' + id);
   }

   dialog.addEventListener('close', function () {
      document.body.style.overflow = '';
      current = null;
      if (location.hash.indexOf('#case-') === 0) history.replaceState(null, '', location.pathname + location.search + '#work');
      if (lastTrigger) lastTrigger.focus();
   });
   dialog.addEventListener('click', function (e) {
      if (e.target === dialog || e.target.closest('[data-close]')) dialog.close();
   });

   document.querySelectorAll('[data-open]').forEach(function (btn) {
      btn.addEventListener('click', function () { openCase(btn.getAttribute('data-open'), btn); });
   });

   // ─── INIT ──────────────────────────────────────────────────────────────
   applyLang(lang);
   var m = location.hash.match(/^#case-(\w+)/);
   if (m) openCase(m[1]);
})();
