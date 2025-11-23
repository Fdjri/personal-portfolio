// Tipe Data Project Lengkap
export type Project = {
  id: string; // Slug URL (misal: "kaizen-db-engine")
  category: "web" | "mobile" | "uiux";
  title: string;
  subtitle: string; // Tambahan: Sub-judul kayak di gambar ("Customer Follow Up...")
  description: string;
  overview: string; // Deskripsi panjang buat halaman detail
  keyFeatures: string[]; // List fitur utama
  techStack: string[];
  image: string; // Thumbnail utama
  screenshots: string[]; // Galeri screenshot tambahan
  links: {
    demo?: string;
    code?: string;
    prototype?: string;
  };
};

export const allProjects: Project[] = [
  // --- WEB PROJECTS ---
  {
    id: "kaizen-db-engine",
    category: "web",
    title: "Kaizen DB Engine",
    subtitle: "Customer Follow Up Tracking Website",
    description: "A comprehensive dashboard for tracking customer follow-ups and sales performance.",
    overview: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    keyFeatures: [
      "Real-time Dashboard Analytics",
      "Customer Relationship Management (CRM)",
      "Automated Follow-up Reminders",
      "Role-based Access Control (RBAC)"
    ],
    techStack: ["Laravel", "JavaScript", "TailwindCSS", "MySQL"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
    screenshots: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1555421689-49263376da39?q=80&w=1000&auto=format&fit=crop"
    ],
    links: { demo: "#", code: "#" }
  },
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
    techStack: ["React", "Next.js", "Tailwind", "MySQL"],
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop",
    screenshots: [
      "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop"
    ],
    links: { demo: "#", code: "#" }
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
    techStack: ["PHP", "Laravel", "Bootstrap", "MySQL"],
    image: "https://images.unsplash.com/photo-1481487484168-9b9301cd2766?q=80&w=1000&auto=format&fit=crop",
    screenshots: [
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507842217121-9e9f147d719d?q=80&w=1000&auto=format&fit=crop"
    ],
    links: { demo: "#", code: "#" }
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
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop",
    screenshots: [
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1000&auto=format&fit=crop"
    ],
    links: { demo: "#", code: "#" }
  },

  // --- MOBILE PROJECTS ---
  {
    id: "tixgo",
    category: "mobile",
    title: "TixGO!",
    subtitle: "Cinema Booking App",
    description: "Cinema ticketing application. Users can browse movies, select seats, and book tickets in real-time.",
    overview: "Experience movies like never before with TixGO!. Skip the lines and book your favorite seats instantly. Integrated with major cinema chains for real-time availability.",
    keyFeatures: [
      "Real-time Seat Selection",
      "QR Code Ticket Generation",
      "Payment Integration",
      "Movie Reviews & Trailers"
    ],
    techStack: ["Flutter", "Dart", "Firebase"],
    image: "https://images.unsplash.com/photo-1517260739337-6799d239ce83?q=80&w=1000&auto=format&fit=crop",
    screenshots: [
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1000&auto=format&fit=crop"
    ],
    links: { demo: "#", code: "#" }
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
    techStack: ["Flutter", "Google Maps API"],
    image: "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?q=80&w=1000&auto=format&fit=crop",
    screenshots: [
      "https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1000&auto=format&fit=crop"
    ],
    links: { demo: "#", code: "#" }
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
    techStack: ["Figma", "Prototyping", "User Research"],
    image: "https://images.unsplash.com/photo-1556742393-d75f468bfcb0?q=80&w=1000&auto=format&fit=crop",
    screenshots: [
      "https://images.unsplash.com/photo-1511690656952-34342d5c28b5?q=80&w=1000&auto=format&fit=crop"
    ],
    links: { prototype: "#" }
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
    techStack: ["Figma", "UI Design"],
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=1000&auto=format&fit=crop",
    screenshots: [
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=1000&auto=format&fit=crop"
    ],
    links: { prototype: "#" }
  }
];