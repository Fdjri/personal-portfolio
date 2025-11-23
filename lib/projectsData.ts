export type Project = {
  id: string; 
  category: "web" | "mobile" | "uiux";
  title: string;
  subtitle: string; 
  description: string;
  overview: string; 
  keyFeatures: string[]; 
  techStack: string[];
  image: string; 
  screenshots: string[]; 
  links: {
    demo?: string;
    code?: string;
    prototype?: string;
  };
};

export const allProjects: Project[] = [
  // --- WEB PROJECTS ---
  {
    id: "academix",
    category: "web",
    title: "AcademiX",
    subtitle: "Learning Management System",
    description: "A comprehensive learning management system designed to streamline educational processes.",
    overview: "AcademiX is designed to bridge the gap between teachers and students. It offers a seamless platform for sharing resources, submitting assignments, and tracking academic progress in real-time.",
    keyFeatures: [
      "Interactive Course Modules",
      "Student Progress Tracking",
      "Online Quiz & Assessment",
      "Discussion Forums"
    ],
    techStack: ["Java", "MySQL"],
    image: "/images/projects/academix/mockup.jpg",
    screenshots: [
      "/images/projects/academix/landing.jpg",
      "/images/projects/academix/dashboard.jpg",
      "/images/projects/academix/login.jpg",
      "/images/projects/academix/addkrs.jpg"
    ],
    links: { demo: "https://www.youtube.com/watch?v=L_73bXFKUHI", code: "https://github.com/Fdjri/Academix" }
  },
  {
    id: "cuyperpus",
    category: "web",
    title: "CuyPerpus",
    subtitle: "Digital Library Management",
    description: "Digital library platform allowing users to borrow books, track reading history, and manage inventory seamlessly.",
    overview: "CuyPerpus digitizes the traditional library experience. It allows members to browse catalogs, reserve books, and view borrowing history, while librarians can manage inventory and fines efficiently.",
    keyFeatures: [
      "Book Reservation System",
      "Fine Calculation & Tracking",
      "Member Management",
      "Digital Catalog Search"
    ],
    techStack: ["PHP", "Bootstrap", "MySQL"],
    image: "/images/projects/cuyperpus/mockup.jpg",
    screenshots: [
      "/images/projects/cuyperpus/landing.jpg",
      "/images/projects/cuyperpus/dashboarduser.jpg",
      "/images/projects/cuyperpus/dashboardadmin.jpg",
      "/images/projects/cuyperpus/addbuku.jpg"
    ],
    links: { demo: "https://youtu.be/vDrakewu3nM?si=CYbBWqUDAW_x9tmt", code: "https://github.com/Fdjri/web_perpus" }
  },
  {
    id: "sepatuku",
    category: "web",
    title: "SepaTUKU",
    subtitle: "Footwear E-Commerce",
    description: "E-commerce website specializing in footwear. Provides a smooth shopping experience with cart functionality.",
    overview: "A dedicated marketplace for sneakerheads and casual walkers alike. SepaTUKU offers a secure and intuitive shopping journey from product discovery to checkout.",
    keyFeatures: [
      "Advanced Product Filtering",
      "Secure Payment Gateway",
      "Order Tracking System",
      "User Reviews & Ratings"
    ],
    techStack: ["Laravel", "Tailwind", "MySQL"],
    image: "/images/projects/sepatuku/mockup.jpg",
    screenshots: [
      "/images/projects/sepatuku/landing.jpg",
      "/images/projects/sepatuku/dashboard.jpg"
    ],
    links: { demo: "#", code: "https://github.com/Fdjri/web_sepatuku" }
  },
  {
    id: "tixgo",
    category: "web",
    title: "TixGO!",
    subtitle: "Cinema Ticketing Website",
    description: "Web-based cinema, travel, and hotel ticket booking platform with real-time seat selection and secure payment integration.",
    overview: "TixGO! brings the cinema experience online. Browse movies, pick your perfect seats in real-time, and book tickets hassle-free. Integrated with multiple cinema chains for up-to-date showtimes and availability.",
    keyFeatures: [
      "Real-time Seat Selection Map",
      "Multiple Cinema Integration",
      "Online Payment Gateway",
      "Booking History & E-Tickets"
    ],
    techStack: ["Laravel", "Tailwind", "MySQL"],
    image: "/images/projects/tixgoweb/mockup.jpg",
    screenshots: [
      "/images/projects/tixgoweb/dashboarduser.jpg",
      "/images/projects/tixgoweb/booking.jpg",
      "/images/projects/tixgoweb/dashboardadmin.jpg",
      "/images/projects/tixgoweb/dashboardservice.jpg"
    ],
    links: { demo: "https://youtu.be/pWBpOghwUHA?si=KBnpHEyH_Qd3mxei", code: "https://github.com/Fdjri/UAS_Integrasi_Aplikasi" }
  },
  {
    id: "parking-slot-monitoring",
    category: "web",
    title: "Parking Slot Monitoring",
    subtitle: "IoT Smart Parking System",
    description: "Smart parking management system using IoT sensors to monitor parking slot availability in real-time.",
    overview: "Say goodbye to endless parking searches! This IoT-powered system detects available parking slots using ultrasonic sensors and displays real-time availability on a web dashboard. Perfect for managing parking lots efficiently.",
    keyFeatures: [
      "Real-time Slot Availability Detection",
      "IoT Sensor Integration (ESP32)",
      "Live Dashboard Monitoring",
      "Automated Status Updates"
    ],
    techStack: ["Laravel", "C++", "Alpine.js", "Tailwind", "MySQL"],
    image: "/images/projects/dashboardparking/mockup.jpg",
    screenshots: [
      "/images/projects/dashboardparking/parking.jpg"
    ],
    links: { demo: "#", code: "https://github.com/Fdjri/UAS_IoT_SmartParkingSystem" }
  },
  {
    id: "personal-portfolio",
    category: "web",
    title: "Personal Portfolio",
    subtitle: "Developer Portfolio Website",
    description: "Modern and interactive portfolio website built with Next.js showcasing projects, skills, and professional journey.",
    overview: "My personal space on the web! Built with the latest Next.js and React, this portfolio features smooth animations, dark mode, and a clean design. It's where I showcase my work and share my developer journey with the world.",
    keyFeatures: [
      "Responsive & Mobile-First Design",
      "Smooth Page Transitions",
      "Project Showcase Gallery",
      "Contact Form Integration"
    ],
    techStack: ["Next.js", "React", "JavaScript", "TypeScript", "Tailwind"],
    image: "/images/projects/sepatuku/mockup.jpg",
    screenshots: [
      "/images/projects/sepatuku/landing.jpg",
      "/images/projects/sepatuku/dashboard.jpg"
    ],
    links: { demo: "#", code: "https://github.com/Fdjri/personal-portfolio" }
  },
  {
    id: "kaizen-db-engine",
    category: "web",
    title: "Kaizen DB Engine",
    subtitle: "Sales Follow-up Management System",
    description: "Comprehensive CRM dashboard for sales teams to track customer interactions, follow-ups, and performance metrics.",
    overview: "Kaizen DB Engine keeps your sales team organized and efficient. Track every customer interaction, set follow-up reminders, and analyze sales performance with detailed reports. Built for teams that want to improve continuously (kaizen = continuous improvement!).",
    keyFeatures: [
      "Real-time Sales Dashboard",
      "Customer Interaction History",
      "Automated Follow-up Reminders",
      "Performance Analytics & Reports"
    ],
    techStack: ["Laravel", "JavaScript", "TailwindCSS", "MySQL"],
    image: "/images/projects/kaizendbengine/mockup.jpg",
    screenshots: [
      "/images/projects/kaizendbengine/dashboardadmin.jpg",
      "/images/projects/kaizendbengine/adminreport.jpg",
      "/images/projects/kaizendbengine/login.jpg"
    ],
    links: { demo: "#", code: "https://github.com/Fdjri/web_project_salesman" }
  },
  {
    id: "paud-insani",
    category: "web",
    title: "PAUD INSANI Management",
    subtitle: "Preschool Management System",
    description: "Complete management system for PAUD (Early Childhood Education) covering student data, attendance, payments, and administration.",
    overview: "Making preschool management a breeze! This system helps teachers and admins manage student records, track attendance, handle tuition payments, and communicate with parents all in one place. Built with Livewire for a smooth, reactive experience.",
    keyFeatures: [
      "Student & Staff Management",
      "Attendance Tracking System",
      "Tuition Payment Processing",
      "Parent Communication Portal"
    ],
    techStack: ["Laravel", "Livewire", "Alpine.js", "TailwindCSS", "MySQL"],
    image: "/images/projects/paudinsani/mockup.jpg",
    screenshots: [
      "/images/projects/paudinsani/login.jpg",
      "/images/projects/paudinsani/dashboardadmin.jpg",
      "/images/projects/paudinsani/listsiswa.jpg",
      "/images/projects/paudinsani/absensi.jpg",
      "/images/projects/paudinsani/spp.jpg",
      "/images/projects/paudinsani/keuangan.jpg",
      "/images/projects/paudinsani/listuser.jpg"
    ],
    links: { demo: "#", code: "https://github.com/Fdjri/paud_insani" }
  },

  // --- MOBILE PROJECTS ---
  {
    id: "tixgo-mobile",
    category: "mobile",
    title: "TixGO! Mobile",
    subtitle: "Cinema Booking Mobile App",
    description: "Mobile version of TixGO! - Book cinema, travel, and hotel tickets on the go with smooth mobile UI and offline ticket storage.",
    overview: "Cinema tickets in your pocket! The mobile companion to TixGO! brings all the booking features to your smartphone. Browse showtimes, pick seats, and get your tickets as QR codes - all optimized for mobile use.",
    keyFeatures: [
      "Mobile-Optimized Seat Selection",
      "QR Code E-Ticket Generation",
      "Offline Ticket Access",
      "Push Notifications for Showtimes"
    ],
    techStack: ["Flutter", "Dart", "JSON"],
    image: "/images/projects/tixgomobile/mockup.jpg",
    screenshots: [
      "/images/projects/tixgomobile/login.jpg",
      "/images/projects/tixgomobile/category.jpg",
      "/images/projects/tixgomobile/booking.jpg"
    ],
    links: { demo: "https://youtu.be/pWBpOghwUHA?si=KBnpHEyH_Qd3mxei", code: "https://github.com/Fdjri/UAS_Integrasi_Aplikasi/tree/main/tixgo_mobile" }
  },
  {
    id: "my-simple-location",
    category: "mobile",
    title: "My Simple Location",
    subtitle: "Location Tracker",
    description: "Location tracking app that helps users save and share their favorite spots.",
    overview: "Never lose a favorite spot again. My Simple Location allows you to pin, save, and share locations with ease, utilizing high-precision GPS data.",
    keyFeatures: [
      "GPS Coordinates Tracking",
      "Save & Categorize Locations",
      "Share via Social Media",
      "Offline Mode Support"
    ],
    techStack: ["Flutter", "Dart", "Google Maps API"],
    image: "/images/projects/mysimplelocation/mockup.jpg",
    screenshots: [
      "/images/projects/mysimplelocation/getlocation.jpg",
      "/images/projects/mysimplelocation/history.jpg",
      "/images/projects/mysimplelocation/detail.jpg"
    ],
    links: { demo: "#", code: "https://github.com/Fdjri/MySimple-Location" }
  },
  {
    id: "e-uji-emisi",
    category: "mobile",
    title: "E-Uji Emisi",
    subtitle: "Vehicle Emission Test App",
    description: "Mobile app for vehicle emission testing services. Book appointments, track test results, and get reminders.",
    overview: "Keep your vehicle emissions in check! This app connects drivers with certified emission testing centers. Schedule tests, view results, and get notifications when your next test is due. Making eco-friendly driving easier to manage.",
    keyFeatures: [
      "Online Test Booking",
      "Emission Test Results History",
      "Testing Center Locator",
      "Reminder Notifications"
    ],
    techStack: ["Flutter", "Dart"],
    image: "/images/projects/eujiemisi/mockup.jpg",
    screenshots: [
      "/images/projects/eujiemisi/splash.jpg",
      "/images/projects/eujiemisi/login.jpg",
      "/images/projects/eujiemisi/home.jpg",
      "/images/projects/eujiemisi/info.jpg"
    ],
    links: { demo: "#", code: "https://github.com/Fdjri/e-uji_emisi" }
  },
  {
    id: "espj",
    category: "mobile",
    title: "eSPJ",
    subtitle: "Financial Report Management",
    description: "Digital solution for SPJ (Surat Perintah Jalan) - financial accountability report management for organizations.",
    overview: "Digitizing financial reporting! eSPJ streamlines the process of creating, submitting, and tracking financial accountability reports. No more paper trails - everything's digital, organized, and easy to access.",
    keyFeatures: [
      "Digital Report Creation",
      "Receipt Photo Upload",
      "Submission Tracking",
      "Report History Archive"
    ],
    techStack: ["Flutter", "Dart"],
    image: "/images/projects/espj/mockup.jpg",
    screenshots: [
      "/images/projects/espj/splash.jpg",
      "/images/projects/espj/login.jpg",
      "/images/projects/espj/home.jpg"
    ],
    links: { demo: "#", code: "https://github.com/Fdjri/eSPJ-FCA" }
  },
  {
    id: "bps-rw",
    category: "mobile",
    title: "BPS RW",
    subtitle: "Neighborhood Waste Management System",
    description: "Smart mobile app for managing waste collection and disposal at the neighborhood level, keeping communities clean and organized.",
    overview: "Making neighborhoods cleaner, one tap at a time! BPS RW (Bidang Pengelola Sampah Rukun Warga) helps manage waste collection schedules, track pickups, and coordinate with local waste management teams. Perfect for keeping your neighborhood tidy and eco-friendly!",
    keyFeatures: [
      "Waste Collection Scheduling",
      "Real-time Pickup Tracking",
      "Resident Waste Reports",
      "Collection History & Analytics"
    ],
    techStack: ["Flutter", "Dart"],
    image: "/images/projects/bpsrw/mockup.jpg",
    screenshots: [
      "/images/projects/bpsrw/splash.jpg",
      "/images/projects/bpsrw/login.jpg",
      "/images/projects/bpsrw/data.jpg",
      "/images/projects/bpsrw/input.jpg",
      "/images/projects/bpsrw/laporan.jpg"
    ],
    links: { demo: "#", code: "https://github.com/Fdjri/BPS-RW" }
  },

  // --- UI/UX PROJECTS ---
  {
    id: "nutrimate",
    category: "uiux",
    title: "NutriMate",
    subtitle: "Diet & Nutrition App Design",
    description: "UI/UX Case study for a diet and nutrition tracking app.",
    overview: "NutriMate focuses on simplifying the complex world of nutrition tracking. The design prioritizes readability, ease of data entry, and motivating visualizations.",
    keyFeatures: [
      "User-Centric Dashboard",
      "Meal Planning Interface",
      "Calorie Counter Visuals",
      "Progress Charts"
    ],
    techStack: ["Figma", "Prototyping", "UI/UX Design"],
    image: "/images/projects/nutrimate/mockup.jpg",
    screenshots: [
      "/images/projects/nutrimate/splash.jpg",
      "/images/projects/nutrimate/login.jpg",
      "/images/projects/nutrimate/home.jpg",
      "/images/projects/nutrimate/tracker.jpg"
    ],
    links: { prototype: "https://www.figma.com/proto/DxsHxy6qYXPV4hgXBqnK59/Nutri-Mate-App?page-id=0%3A1&node-id=4-379&p=f&viewport=50%2C466%2C0.36&t=Athh7oE6TrCkO0Lx-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=13%3A656&show-proto-sidebar=1" }
  },
  {
    id: "e-bank-sampah",
    category: "uiux",
    title: "E-Bank Sampah",
    subtitle: "Waste Management System Design",
    description: "Waste bank management system design. Encourages recycling by converting trash into digital currency.",
    overview: "A green initiative visualized. This design promotes recycling habits through gamification and a clean, nature-inspired user interface.",
    keyFeatures: [
      "Waste Weighing Interface",
      "Points & Rewards System",
      "Educational Content Layout",
      "Community Leaderboard"
    ],
    techStack: ["Figma", "Prototyping", "UI/UX Design"],
    image: "/images/projects/banksampah/mockup.jpg",
    screenshots: [
      "/images/projects/banksampah/splash.jpg",
      "/images/projects/banksampah/dashboard1.jpg",
      "/images/projects/banksampah/dashboard2.jpg",
      "/images/projects/banksampah/nasabah.jpg",
      "/images/projects/banksampah/riwayat.jpg"
    ],
    links: { prototype: "https://www.figma.com/proto/ivZovTvnSAdkHN0oTUzIxf/Bank-Sampah?page-id=0%3A1&node-id=5-4329&p=f&viewport=481%2C52%2C0.05&t=cp0dwObvO0L487xo-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=1%3A2" }
  },
  {
    id: "silika",
    category: "uiux",
    title: "SILIKA",
    subtitle: "Air Quality Monitoring App Design",
    description: "UI/UX design for SILIKA - an air quality monitoring system that tracks pollution levels and provides health recommendations.",
    overview: "Breathing cleaner air starts with awareness. SILIKA's design focuses on making complex air quality data easy to understand through intuitive visualizations and color-coded indicators. The interface guides users with actionable health tips based on current conditions.",
    keyFeatures: [
      "Real-time Air Quality Dashboard",
      "Interactive Pollution Maps",
      "Health Advisory Notifications",
      "Historical Data Visualization"
    ],
    techStack: ["Figma", "Prototyping", "UI/UX Design"],
    image: "/images/projects/silika/mockup.jpg",
    screenshots: [
      "/images/projects/silika/home.jpg",
      "/images/projects/silika/pemantauan.jpg",
      "/images/projects/silika/udara.jpg"
    ],
    links: { prototype: "https://www.figma.com/proto/DLnjbSVclNl1fPbxXqDKmo/SILIKA?page-id=&node-id=501-6608&viewport=-42%2C180%2C0.43&t=6M2FpGxHUducWRnW-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=501%3A6359" }
  }
];