/* ============================================================
   DATA FILE — this is the only file you need to touch to add
   new skills, projects, certifications, or education entries.
   Just add a new object to the right array below, save, and
   redeploy. Nothing else in the site needs to change.
   ============================================================ */

// SKILLS
// icon: a devicon class name — browse options at https://devicon.dev
// category: must match one of the CATEGORIES names below exactly
const CATEGORIES = ["Languages", "Web & Frontend", "Backend & Frameworks", "Databases", "Data Science & Tools"];

const skills = [
  { name: "Python",      icon: "devicon-python-plain colored",      category: "Languages" },
  { name: "JavaScript",  icon: "devicon-javascript-plain colored",  category: "Languages" },
  { name: "Java",        icon: "devicon-java-plain colored",        category: "Languages" },
  { name: "C++",         icon: "devicon-cplusplus-plain colored",   category: "Languages" },
  { name: "C",           icon: "devicon-c-plain colored",           category: "Languages" },

  { name: "HTML5",       icon: "devicon-html5-plain colored",       category: "Web & Frontend" },
  { name: "CSS3",        icon: "devicon-css3-plain colored",        category: "Web & Frontend" },
  { name: "React.js",    icon: "devicon-react-original colored",    category: "Web & Frontend" },
  { name: "Tailwind",    icon: "devicon-tailwindcss-plain colored", category: "Web & Frontend" },
  { name: "Bootstrap",   icon: "devicon-bootstrap-plain colored",   category: "Web & Frontend" },

  { name: "Node.js",     icon: "devicon-nodejs-plain colored",      category: "Backend & Frameworks" },
  { name: "Express.js",  icon: "devicon-express-original colored",  category: "Backend & Frameworks" },
  { name: "Django",      icon: "devicon-django-plain colored",      category: "Backend & Frameworks" },
  { name: "DRF",         icon: "devicon-django-plain colored",      category: "Backend & Frameworks" },

  { name: "MySQL",       icon: "devicon-mysql-plain colored",       category: "Databases" },
  { name: "MongoDB",     icon: "devicon-mongodb-plain colored",     category: "Databases" },
  { name: "SQLite3",     icon: "devicon-sqlite-plain colored",      category: "Databases" },

  { name: "Data Science",icon: "devicon-python-plain colored",      category: "Data Science & Tools" },
  { name: "Git",         icon: "devicon-git-plain colored",         category: "Data Science & Tools" },
  { name: "Linux",       icon: "devicon-linux-plain colored",       category: "Data Science & Tools" },
];

// PROJECTS
// image: path to a screenshot of the project (put files in the "projects" folder
//        next to index.html, e.g. "projects/hostel-management.jpg"). Leave as "" to
//        keep the icon/gradient cover instead. Plain relative paths only.
// links: optional buttons under the project, e.g.
//        links: [{ label: "GitHub", url: "https://github.com/you/repo" }, { label: "Live demo", url: "https://..." }]
//        Only https:// links are shown.
// cover: gradient used as a fallback if no image is set, or if the image fails to load.
// icon: devicon class shown large on the fallback cover.
const projects = [
  {
    initials: "HM",
    name: "Role-Based Hostel Management System",
    date: "2026",
    desc: "A full academic-grade platform for 5 roles (Admin, Warden, Caretaker, Security, Student) covering admissions, complaints with SLA tracking, leave/outpass, mess billing, inspections and analytics, all on a shared MySQL database.",
    image: "projects/hostel.png",
    cover: "cover-hostel",
    icon: "devicon-django-plain colored",
    tags: ["Django 5.2", "MySQL", "Tailwind CSS", "JavaScript"],
    actions: ["🏗️ 7 modules", "👥 5 roles", "⚙️ In progress"]
  },
  {
    initials: "LH",
    name: "Legal Hub",
    date: "Jan – May 2025",
    desc: "A secure web platform for managing and accessing legal case information in a lawyer's office, with a structured database schema for efficient storage and retrieval.",
    image: "projects/legal-hub.jpg",
    cover: "cover-legal",
    icon: "devicon-html5-plain colored",
    tags: ["Web App", "Secure Auth", "Database Design"],
    actions: ["🔒 Secure access", "📁 Case management"]
  },
  {
    initials: "BC",
    name: "Baby Care Management System",
    date: "Apr – May 2024",
    desc: "A management system built to streamline day-to-day operations for daycare service centers.",
    image: "projects/baby-project.png",
    cover: "cover-baby",
    icon: "devicon-javascript-plain colored",
    tags: ["Management System", "Operations"],
    actions: ["👶 Daycare ops", "📋 Workflow tools"]
  },
];

// CERTIFICATIONS & TRAINING
// image: path to the certificate image (put files in a "certs" folder next to index.html).
//        Leave as "" if you don't have the image yet — the card will still show,
//        just without a click-to-view image.
const certifications = [
  {
    title: "Full Stack Web Development – MERN Stack",
    org: "Capital Infotech, Thiruvalla",
    desc: "Comprehensive training covering MongoDB, Express.js, React.js, and Node.js for building end-to-end web applications.",
    image: "certs/mern.jpg"
  },
  {
    title: "Python for Data Science — Elite",
    org: "NPTEL, IIT Madras · Jan – Feb 2026",
    desc: "Elite certification in applied Python for data science.",
    image: "certs/nptel.jpg"
  },
  {
    title: 'International Conference — "Viksit Bharat 2047"',
    org: "MACFAST, Tiruvalla · Feb 2026",
    desc: "Participated in a conference integrating business, technology and computational mathematics for a sustainable future.",
    image: "certs/viksithbharath.png"
  },
  {
    title: "IT Industry Practice Program",
    org: "Faith Infotech Academy, Technopark Campus",
    desc: "Hands-on exposure to real-time IT industry workflows, development practices and project collaboration.",
    image: ""   // add "certs/it-industry-practice.jpg" when you have the file
  },
  {
    title: "Legal Hub — Project Certification",
    org: "Corezone Solutions",
    desc: "Certification for the Legal Hub case-management platform.",
    image: ""   // add "certs/legal-hub.jpg" when you have the file
  },
  {
    title: "Baby Care Management System — Project Certification",
    org: "Allievo IEEE Center",
    desc: "Certification for the daycare operations management system.",
    image: ""   // add "certs/baby-care.jpg" when you have the file
  },
];

// EDUCATION (shown as a timeline, in order)
const education = [
  {
    title: "Master of Computer Applications (MCA)",
    org: "Mar Athanasios College for Advanced Studies, Tiruvalla, Kerala",
    date: "Aug 2025 – Present"
  },
  {
    title: "Bachelor of Computer Applications (BCA)",
    org: "Mar Gregorios College, Punnapra, Alappuzha, Kerala",
    date: "Sept 2022 – May 2025"
  },
  {
    title: "Senior Secondary Education (Science)",
    org: "St. Aloysius Higher Secondary School, Edathua, Alappuzha",
    date: "June 2020 – April 2022"
  },
  {
    title: "Secondary School Education",
    org: "Georgian Public School, Edathua, Alappuzha",
    date: "Completed March 2020"
  },
];
