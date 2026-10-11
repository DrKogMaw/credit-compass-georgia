const sources = [
  { name: "TSU Academic Programs", note: "Program structures, curriculum documents and course information.", url: "https://www.tsu.ge/syllabus/programs", type: "Official portal" },
  { name: "GTU Course Catalogue", note: "Searchable courses by faculty, credit, degree and language.", url: "https://syllabus.gtu.ge/en/", type: "Official database" },
  { name: "Ilia State Academic Programs", note: "Program structures, ECTS and curriculum information.", url: "https://programs.iliauni.edu.ge/en/computer-science/", type: "Official portal" },
  { name: "University of Georgia Programs", note: "Structured course codes, ECTS and semester assignments.", url: "https://online.ug.edu.ge/programs/programs_full.php?lang=eng&programID%5B%5D=6060", type: "Official database" },
  { name: "Georgian mobility rule", note: "The receiving institution makes the final credit-recognition decision.", url: "https://matsne.gov.ge/ka/document/view/1001733?publication=0", type: "Legal source" },
  { name: "Georgia ECTS workload rule", note: "60 ECTS is the standard full academic-year load; a student's annual load must not exceed 75 ECTS.", url: "https://matsne.gov.ge/ka/document/view/5310221", type: "National legal source" },
  { name: "GTU study-process instructions", note: "GTU applies a 30-ECTS semester plan and permits up to 15 additional annual credits for clearing academic debt.", url: "https://gtu.ge/pdf/forms-instructions/educational-process.pdf", type: "University regulation" }
];

const CREDIT_LOAD_RULES = {
  standardSemester: 30,
  standardYear: 60,
  maximumYear: 75
};

const defaultAttempts = [
  { id: "t1", institution: "TSU", period: "Semester 1 · 2023", code: "CS101", title: "Introduction to Programming", ects: 6, passed: true, topics: ["programming", "algorithms", "c++", "control flow", "functions"] },
  { id: "t2", institution: "TSU", period: "Semester 1 · 2023", code: "MATH101", title: "Calculus I", ects: 6, passed: true, topics: ["calculus", "limits", "derivatives", "integrals"] },
  { id: "t3", institution: "TSU", period: "Semester 1 · 2023", code: "MATH105", title: "Discrete Mathematics", ects: 6, passed: true, topics: ["discrete mathematics", "logic", "sets", "graphs", "combinatorics"] },
  { id: "t4", institution: "TSU", period: "Semester 1 · 2023", code: "ACAD101", title: "Academic Writing", ects: 5, passed: true, topics: ["academic writing", "research", "citation", "communication"] },
  { id: "t5", institution: "TSU", period: "Semester 1 · 2023", code: "PHYS101", title: "Physics I", ects: 5, passed: false, topics: ["physics", "mechanics", "energy", "laboratory"] },
  { id: "t6", institution: "TSU", period: "Semester 2 · 2024", code: "CS102", title: "Object-Oriented Programming", ects: 6, passed: true, topics: ["programming", "object oriented", "c++", "classes", "inheritance"] },
  { id: "t7", institution: "TSU", period: "Semester 2 · 2024", code: "MATH111", title: "Linear Algebra", ects: 6, passed: true, topics: ["linear algebra", "matrices", "vectors", "eigenvalues"] },
  { id: "t8", institution: "TSU", period: "Semester 2 · 2024", code: "CS201", title: "Data Structures", ects: 6, passed: true, topics: ["data structures", "algorithms", "trees", "graphs", "complexity"] },
  { id: "t9", institution: "TSU", period: "Semester 2 · 2024", code: "ENG201", title: "English B2", ects: 5, passed: false, topics: ["english", "communication", "writing", "presentation"] },
  { id: "t10", institution: "TSU", period: "Semester 2 · 2024", code: "CS210", title: "Database Fundamentals", ects: 5, passed: false, topics: ["databases", "sql", "relational model", "normalization"] },
  { id: "g1", institution: "GTU", period: "Semester 3 · 2024", code: "GTU-CS21", title: "Algorithms and Complexity", ects: 5, passed: true, topics: ["algorithms", "complexity", "sorting", "graphs", "dynamic programming"] },
  { id: "g2", institution: "GTU", period: "Semester 3 · 2024", code: "GTU-CS22", title: "Database Systems", ects: 5, passed: true, topics: ["databases", "sql", "relational model", "normalization", "transactions"] },
  { id: "g3", institution: "GTU", period: "Semester 3 · 2024", code: "GTU-M31", title: "Probability and Statistics", ects: 5, passed: true, topics: ["probability", "statistics", "distributions", "hypothesis testing"] },
  { id: "g4", institution: "GTU", period: "Semester 3 · 2024", code: "GTU-CS25", title: "Computer Architecture", ects: 5, passed: true, topics: ["computer architecture", "processors", "memory", "assembly", "digital logic"] },
  { id: "g5", institution: "GTU", period: "Semester 3 · 2024", code: "GTU-PH2", title: "Physics II", ects: 5, passed: false, topics: ["physics", "electricity", "magnetism", "laboratory"] },
  { id: "g6", institution: "GTU", period: "Semester 4 · 2025", code: "GTU-CS31", title: "Web Technologies", ects: 5, passed: true, topics: ["web", "html", "css", "javascript", "http"] },
  { id: "g7", institution: "GTU", period: "Semester 4 · 2025", code: "GTU-CS32", title: "Operating Systems", ects: 5, passed: true, topics: ["operating systems", "processes", "memory", "file systems", "concurrency"] },
  { id: "g8", institution: "GTU", period: "Semester 4 · 2025", code: "GTU-CS33", title: "Computer Networks I", ects: 5, passed: true, topics: ["networks", "tcp ip", "routing", "protocols", "security"] },
  { id: "g9", institution: "GTU", period: "Semester 4 · 2025", code: "GTU-SE1", title: "Software Engineering", ects: 5, passed: true, topics: ["software engineering", "requirements", "testing", "git", "agile"] },
  { id: "g10", institution: "GTU", period: "Semester 4 · 2025", code: "GTU-EC1", title: "Engineering Economics", ects: 5, passed: false, topics: ["economics", "finance", "projects", "cost analysis"] }
];

let attempts;
try {
  const savedAttempts = JSON.parse(localStorage.getItem("creditCompassTranscript"));
  attempts = Array.isArray(savedAttempts) && savedAttempts.length ? savedAttempts : structuredClone(defaultAttempts);
} catch {
  attempts = structuredClone(defaultAttempts);
}

let programs = [
  {
    id: "ilia-cs", university: "Ilia State University", short: "Ilia State", faculty: "School of Technology", program: "Computer Science", cohort: "2025–2026", totalEcts: 240,
    source: sources[2].url,
    courses: [
      ["CS-101", "Programming Fundamentals", 6, 1, ["programming", "algorithms", "control flow", "functions"]],
      ["MATH-111", "Calculus I", 6, 1, ["calculus", "limits", "derivatives", "integrals"]],
      ["MATH-121", "Discrete Mathematics", 6, 1, ["discrete mathematics", "logic", "sets", "graphs", "combinatorics"]],
      ["GEN-101", "Academic Work Techniques", 6, 1, ["academic writing", "research", "citation", "communication"]],
      ["CS-102", "Object-Oriented Programming", 6, 2, ["programming", "object oriented", "classes", "inheritance"]],
      ["MATH-122", "Linear Algebra", 6, 2, ["linear algebra", "matrices", "vectors", "eigenvalues"]],
      ["CS-201", "Data Structures and Algorithms", 6, 2, ["data structures", "algorithms", "trees", "graphs", "complexity"]],
      ["CS-211", "Database Systems", 6, 3, ["databases", "sql", "relational model", "normalization", "transactions"]],
      ["MATH-231", "Probability and Statistics", 6, 3, ["probability", "statistics", "distributions", "hypothesis testing"]],
      ["CS-221", "Computer Organization", 6, 3, ["computer architecture", "processors", "memory", "assembly", "digital logic"]],
      ["CS-301", "Web Programming", 6, 4, ["web", "html", "css", "javascript", "http"]],
      ["CS-302", "Operating Systems", 6, 4, ["operating systems", "processes", "memory", "file systems", "concurrency"]],
      ["CS-303", "Computer Networks", 6, 4, ["networks", "tcp ip", "routing", "protocols", "security"]],
      ["CS-304", "Software Engineering", 6, 4, ["software engineering", "requirements", "testing", "git", "agile"]],
      ["ENG-B2", "English B2", 6, 2, ["english", "communication", "writing", "presentation"]],
      ["PHYS-1", "General Physics", 6, 2, ["physics", "mechanics", "energy", "electricity", "laboratory"]],
      ["CS-401", "Artificial Intelligence", 6, 5, ["artificial intelligence", "search", "machine learning", "knowledge representation"]]
    ]
  },
  {
    id: "tsu-cs", university: "Tbilisi State University", short: "TSU", faculty: "Faculty of Exact and Natural Sciences", program: "Computer Science", cohort: "2025–2026", totalEcts: 240,
    source: sources[0].url,
    courses: [
      ["TSU-P1", "Programming I", 6, 1, ["programming", "algorithms", "c++", "control flow", "functions"]],
      ["TSU-M1", "Calculus I", 6, 1, ["calculus", "limits", "derivatives", "integrals"]],
      ["TSU-DM", "Discrete Structures", 6, 1, ["discrete mathematics", "logic", "sets", "graphs", "combinatorics"]],
      ["TSU-P2", "Programming II", 6, 2, ["programming", "object oriented", "c++", "classes", "inheritance"]],
      ["TSU-LA", "Linear Algebra", 6, 2, ["linear algebra", "matrices", "vectors", "eigenvalues"]],
      ["TSU-DS", "Algorithms and Data Structures", 6, 3, ["data structures", "algorithms", "trees", "graphs", "complexity", "sorting"]],
      ["TSU-DB", "Databases", 5, 3, ["databases", "sql", "relational model", "normalization", "transactions"]],
      ["TSU-ST", "Statistics", 5, 3, ["probability", "statistics", "distributions", "hypothesis testing"]],
      ["TSU-CA", "Computer Architecture", 5, 3, ["computer architecture", "processors", "memory", "assembly"]],
      ["TSU-WEB", "Web Development", 5, 4, ["web", "html", "css", "javascript", "http"]],
      ["TSU-OS", "Operating Systems", 5, 4, ["operating systems", "processes", "memory", "file systems", "concurrency"]],
      ["TSU-NET", "Computer Networks", 5, 4, ["networks", "tcp ip", "routing", "protocols", "security"]],
      ["TSU-SE", "Software Engineering", 5, 4, ["software engineering", "requirements", "testing", "git", "agile"]],
      ["TSU-AI", "Introduction to Artificial Intelligence", 5, 5, ["artificial intelligence", "search", "machine learning"]]
    ]
  },
  {
    id: "gtu-it", university: "Georgian Technical University", short: "GTU", faculty: "Faculty of Informatics and Control Systems", program: "Informatics", cohort: "2025–2026", totalEcts: 240,
    source: sources[1].url,
    courses: [
      ["GTU-101", "Programming Fundamentals", 5, 1, ["programming", "algorithms", "control flow", "functions"]],
      ["GTU-102", "Higher Mathematics I", 5, 1, ["calculus", "limits", "derivatives", "integrals"]],
      ["GTU-103", "Discrete Mathematics", 5, 2, ["discrete mathematics", "logic", "sets", "graphs", "combinatorics"]],
      ["GTU-201", "Object-Oriented Programming", 5, 2, ["programming", "object oriented", "classes", "inheritance"]],
      ["GTU-202", "Linear Algebra and Geometry", 5, 2, ["linear algebra", "matrices", "vectors", "eigenvalues"]],
      ["GTU-203", "Data Structures", 5, 3, ["data structures", "algorithms", "trees", "graphs", "complexity"]],
      ["GTU-301", "Database Management Systems", 5, 3, ["databases", "sql", "relational model", "normalization", "transactions"]],
      ["GTU-302", "Probability Theory", 5, 3, ["probability", "statistics", "distributions"]],
      ["GTU-303", "Computer Architecture", 5, 3, ["computer architecture", "processors", "memory", "assembly", "digital logic"]],
      ["GTU-401", "Web Technologies", 5, 4, ["web", "html", "css", "javascript", "http"]],
      ["GTU-402", "Operating Systems", 5, 4, ["operating systems", "processes", "memory", "file systems", "concurrency"]],
      ["GTU-403", "Computer Networks I", 5, 4, ["networks", "tcp ip", "routing", "protocols", "security"]],
      ["GTU-404", "Software Engineering", 5, 4, ["software engineering", "requirements", "testing", "git", "agile"]],
      ["GTU-501", "Artificial Intelligence", 5, 5, ["artificial intelligence", "search", "machine learning"]]
    ]
  },
  {
    id: "ug-cs", university: "University of Georgia", short: "UG", faculty: "School of Science and Technology", program: "Computer Science", cohort: "2025–2026", totalEcts: 240,
    source: sources[3].url,
    courses: [
      ["INFO1111", "Introduction to Programming", 6, 1, ["programming", "algorithms", "c++", "control flow", "functions"]],
      ["MATH1115", "Calculus I", 6, 1, ["calculus", "limits", "derivatives", "integrals"]],
      ["MATH3112", "Discrete Mathematics", 6, 2, ["discrete mathematics", "logic", "sets", "graphs", "combinatorics"]],
      ["INFO3131", "Object Oriented Programming C++", 6, 3, ["programming", "object oriented", "c++", "classes", "inheritance"]],
      ["MATH1123", "Linear Algebra and Analytical Geometry", 6, 2, ["linear algebra", "matrices", "vectors", "eigenvalues"]],
      ["INFO2210", "Data Structures and Algorithms", 6, 3, ["data structures", "algorithms", "trees", "graphs", "complexity"]],
      ["INFO1125", "Database Management Systems", 6, 4, ["databases", "sql", "relational model", "normalization", "transactions"]],
      ["MATH2004", "Probability and Statistics", 6, 5, ["probability", "statistics", "distributions", "hypothesis testing"]],
      ["INFO2150", "Computer Architecture", 6, 3, ["computer architecture", "processors", "memory", "assembly", "digital logic"]],
      ["INFO3220", "WEB Technologies II", 6, 5, ["web", "html", "css", "javascript", "http"]],
      ["INFO3100", "Operating Systems", 6, 4, ["operating systems", "processes", "memory", "file systems", "concurrency"]],
      ["INFO3110", "Computer Network I", 6, 6, ["networks", "tcp ip", "routing", "protocols", "security"]],
      ["EENG3222", "Software Engineering", 6, 7, ["software engineering", "requirements", "testing", "git", "agile"]],
      ["INFO4100", "Artificial Intelligence", 6, 6, ["artificial intelligence", "search", "machine learning"]]
    ]
  }
];

let currentProgram = programs[0];
let currentFilter = "all";
let currentResults = [];
let draftSemesters = [];
let isGuestPlan = localStorage.getItem("creditCompassMode") === "guest";

const supplementalCatalogs = {
  "tsu-computer-engineering": [
    ["CE101", "Programming Fundamentals", 6, 1, ["programming", "algorithms", "c++", "control flow"]],
    ["CE102", "Calculus I", 6, 1, ["calculus", "limits", "derivatives", "integrals"]],
    ["CE103", "Physics I", 5, 1, ["physics", "mechanics", "energy", "laboratory"]],
    ["CE104", "Digital Logic", 5, 2, ["digital logic", "boolean algebra", "circuits", "hardware"]],
    ["CE201", "Object-Oriented Programming", 6, 2, ["programming", "object oriented", "classes", "inheritance"]],
    ["CE202", "Circuit Analysis", 5, 3, ["circuits", "electronics", "signals", "measurement"]],
    ["CE203", "Computer Architecture", 5, 3, ["computer architecture", "processors", "memory", "assembly"]],
    ["CE301", "Microprocessors", 5, 4, ["microprocessors", "embedded systems", "assembly", "hardware"]]
  ],
  "gtu-computer-engineering": [
    ["CE-101", "Engineering Mathematics I", 5, 1, ["calculus", "engineering mathematics", "functions"]],
    ["CE-102", "General Physics A", 4, 1, ["physics", "mechanics", "laboratory"]],
    ["CE-103", "Programming Fundamentals (C/C++)", 5, 1, ["programming", "c++", "algorithms", "control flow"]],
    ["CE-104", "Computer Architecture and Organization", 5, 1, ["computer architecture", "processors", "memory", "digital logic"]],
    ["CE-201", "Data Structures and Algorithms", 5, 2, ["data structures", "algorithms", "trees", "graphs"]],
    ["CE-202", "Operating Systems Fundamentals", 5, 2, ["operating systems", "processes", "memory", "file systems"]],
    ["CE-203", "Web Programming Fundamentals", 5, 2, ["web", "html", "css", "javascript"]],
    ["CE-301", "Database Design and Management", 5, 3, ["databases", "sql", "relational model", "normalization"]]
  ]
};

let universityCatalogs = [
  {
    id: "TSU", name: "Tbilisi State University", faculties: [
      { id: "tsu-exact", name: "ზუსტ და საბუნებისმეტყველო მეცნიერებათა ფაკულტეტი", specialties: [
        { id: "tsu-cs", name: "კომპიუტერული მეცნიერება / Computer Science", programId: "tsu-cs" },
        { id: "tsu-ce", name: "კომპიუტერული ინჟინერია / Computer Engineering", catalogKey: "tsu-computer-engineering" },
        { id: "tsu-math", name: "მათემატიკა / Mathematics" },
        { id: "tsu-physics", name: "ფიზიკა / Physics" },
        { id: "tsu-chemistry", name: "ქიმია / Chemistry" },
        { id: "tsu-biology", name: "ბიოლოგია / Biology" },
        { id: "tsu-geography", name: "გეოგრაფია / Geography" },
        { id: "tsu-eee", name: "ელექტრული და ელექტრონული ინჟინერია / Electrical and Electronic Engineering" }
      ]},
      { id: "tsu-econ", name: "ეკონომიკისა და ბიზნესის ფაკულტეტი", specialties: [
        { id: "tsu-economics", name: "ეკონომიკა / Economics" },
        { id: "tsu-business", name: "ბიზნესის ადმინისტრირება / Business Administration" }
      ]}
    ]
  },
  {
    id: "GTU", name: "Georgian Technical University", faculties: [
      { id: "gtu-ims", name: "ინფორმატიკისა და მართვის სისტემების ფაკულტეტი", specialties: [
        { id: "gtu-info", name: "ინფორმატიკა / Informatics", programId: "gtu-it" },
        { id: "gtu-ce", name: "კომპიუტერული ინჟინერია / Computer Engineering", catalogKey: "gtu-computer-engineering" },
        { id: "gtu-math", name: "მათემატიკა / Mathematics" },
        { id: "gtu-physics", name: "საინჟინრო ფიზიკა / Engineering Physics" },
        { id: "gtu-biomedical", name: "ბიოსამედიცინო ინჟინერია / Biomedical Engineering" },
        { id: "gtu-control", name: "მართვის სისტემები, ავტომატიზაცია და ტესტ-ინჟინერინგი" },
        { id: "gtu-telecom", name: "ციფრული სატელეკომუნიკაციო ტექნოლოგიები" },
        { id: "gtu-cs-en", name: "კომპიუტერული მეცნიერება / Computer Science (English)", programId: "gtu-it" }
      ]}
    ]
  },
  {
    id: "ILIA", name: "Ilia State University", faculties: [
      { id: "ilia-tech", name: "School of Technology", specialties: [
        { id: "ilia-cs", name: "Computer Science", programId: "ilia-cs" },
        { id: "ilia-civil", name: "Civil Engineering" },
        { id: "ilia-eee", name: "Electrical and Electronic Engineering" }
      ]}
    ]
  },
  {
    id: "UG", name: "University of Georgia", faculties: [
      { id: "ug-scitech", name: "School of Science and Technology", specialties: [
        { id: "ug-cs", name: "Computer Science", programId: "ug-cs" },
        { id: "ug-ece", name: "Electrical and Computer Engineering" },
        { id: "ug-it", name: "Information Technology", programId: "ug-cs" }
      ]}
    ]
  }
];

let officialDatasetMeta = null;

async function loadOfficialDataset() {
  const response = await fetch("data/real-university-catalog.json", { cache: "no-cache" });
  if (!response.ok) throw new Error(`Official dataset returned ${response.status}`);
  const dataset = await response.json();
  const importedIds = new Set(dataset.programs.map(program => program.id));
  const previousProgramId = currentProgram?.id;

  programs = [
    ...programs.filter(program => !importedIds.has(program.id) && program.id !== "gtu-it"),
    ...dataset.programs
  ];

  dataset.universities.forEach(importedUniversity => {
    const existingUniversity = universityCatalogs.find(item => item.id === importedUniversity.id);
    if (!existingUniversity) {
      universityCatalogs.push(importedUniversity);
      return;
    }
    importedUniversity.faculties.forEach(importedFaculty => {
      const existingFaculty = existingUniversity.faculties.find(item => item.id === importedFaculty.id);
      if (!existingFaculty) {
        existingUniversity.faculties.unshift(importedFaculty);
        return;
      }
      const importedSpecialtyIds = new Set(importedFaculty.specialties.map(item => item.id));
      existingFaculty.specialties = [
        ...importedFaculty.specialties,
        ...existingFaculty.specialties.filter(item => !importedSpecialtyIds.has(item.id) && item.programId !== "gtu-it")
      ];
    });
    existingUniversity.name = importedUniversity.name;
  });

  sources.unshift(...dataset.sources);
  officialDatasetMeta = {
    lastVerified: dataset.lastVerified,
    programs: dataset.programs.length,
    courses: dataset.programs.reduce((total, program) => total + program.courses.length, 0)
  };
  currentProgram = programs.find(program => program.id === previousProgramId) || programs[0];
}

const escapeHtml = value => String(value).replace(/[&<>'"]/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character]);
const saveTranscript = () => localStorage.setItem("creditCompassTranscript", JSON.stringify(attempts));
const normalize = text => String(text || "").normalize("NFKD").toLowerCase().replace(/[^\p{L}\p{N}+#.]+/gu, " ").split(/\s+/).filter(x => x.length > 1);
const overlap = (a, b) => {
  const one = new Set(a), two = new Set(b);
  const shared = [...one].filter(x => two.has(x)).length;
  return shared / Math.max(1, two.size);
};

const CONCEPT_ONTOLOGY = {
  programming: ["programming", "დაპროგრამება", "program", "coding", "c++", "java", "python", "c#", "control flow", "functions"],
  object_oriented: ["object oriented", "ობიექტზე ორიენტირებული", "classes", "objects", "inheritance", "encapsulation", "polymorphism"],
  algorithms: ["algorithm", "algorithms", "ალგორითმები", "complexity", "sorting", "dynamic programming"],
  data_structures: ["data structures", "მონაცემთა სტრუქტურები", "trees", "graphs", "queues", "stacks"],
  databases: ["database", "databases", "მონაცემთა ბაზები", "sql", "relational", "normalization", "nosql"],
  web: ["web", "html", "css", "javascript", "php", "django", "laravel", ".net", "client server"],
  operating_systems: ["operating system", "operating systems", "ოპერაციული სისტემები", "processes", "memory", "file systems", "concurrency"],
  networks: ["network", "networks", "ქსელური", "tcp ip", "routing", "protocols", "communications"],
  architecture: ["computer architecture", "კომპიუტერის არქიტექტურა", "processors", "assembly", "digital logic", "memory organization"],
  software_engineering: ["software engineering", "პროგრამული უზრუნველყოფის ინჟინერია", "requirements", "testing", "lifecycle", "agile", "devops"],
  artificial_intelligence: ["artificial intelligence", "ხელოვნური ინტელექტი", "machine learning", "search", "knowledge representation", "neural"],
  mathematics: ["calculus", "linear algebra", "discrete mathematics", "mathematics", "კალკულუსი", "ალგებრა", "მათემატიკა"],
  statistics: ["statistics", "probability", "data analysis", "სტატისტიკა", "ალბათობა"],
  physics: ["physics", "ფიზიკა", "mechanics", "electricity", "magnetism"],
  communication: ["communication", "academic writing", "english", "presentation", "writing", "ინგლისური"],
  design: ["design", "ui", "ux", "human computer interaction", "user experience"],
  security: ["security", "cybersecurity", "cryptography", "კიბერუსაფრთხოება", "information security"]
};

function semanticConcepts(values) {
  const haystack = (Array.isArray(values) ? values : [values]).join(" ").toLowerCase();
  const concepts = new Set();
  Object.entries(CONCEPT_ONTOLOGY).forEach(([concept, aliases]) => {
    if (aliases.some(alias => haystack.includes(alias))) concepts.add(concept);
  });
  return [...concepts];
}

function inferCategory(code, title) {
  const value = `${code} ${title}`.toLowerCase();
  if (/free|თავისუფალი|cit-f/.test(value)) return "free";
  if (/elect|არჩევითი/.test(value)) return "elective";
  return "core";
}

function estimatedOutcomes(topics) {
  return semanticConcepts(topics).map(concept => `apply ${concept.replaceAll("_", " ")} concepts to solve discipline problems`);
}

function normalizeCourse(raw, program) {
  const code = raw[0], metadata = program.courseMetadata?.[code] || {};
  const topics = raw[4] || [];
  const learningOutcomes = metadata.learningOutcomes?.length ? metadata.learningOutcomes : estimatedOutcomes(topics);
  return {
    code,
    title: raw[1],
    ects: Number(raw[2]) || 0,
    semester: raw[3],
    topics,
    learningOutcomes,
    outcomeEvidence: metadata.outcomeEvidence || (learningOutcomes.length ? "topic-derived-estimate" : "unavailable"),
    prerequisites: metadata.prerequisites || [],
    category: metadata.category || inferCategory(code, raw[1]),
    curriculumVersion: program.cohort
  };
}

function sourceOutcomes(source) {
  return source.learningOutcomes?.length ? source.learningOutcomes : estimatedOutcomes(source.topics || []);
}

function scoreBundle(sources, destination) {
  const sourceTopics = [...new Set(sources.flatMap(source => source.topics || []))];
  const sourceLearningOutcomes = [...new Set(sources.flatMap(sourceOutcomes))];
  const topicScore = overlap(semanticConcepts(sourceTopics), semanticConcepts(destination.topics));
  const outcomeScore = destination.learningOutcomes.length
    ? overlap(semanticConcepts(sourceLearningOutcomes), semanticConcepts(destination.learningOutcomes))
    : 0;
  const titleScore = Math.max(...sources.map(source => overlap(normalize(source.title), normalize(destination.title))), 0);
  const sourceEcts = sources.reduce((sum, source) => sum + Number(source.ects || 0), 0);
  const coverage = Math.min(1, sourceEcts / Math.max(1, destination.ects));
  const proportional = Math.min(sourceEcts, destination.ects) / Math.max(sourceEcts, destination.ects, 1);
  const ectsScore = coverage * .7 + proportional * .3;
  const knownVersions = sources.map(source => source.curriculumVersion).filter(Boolean);
  const versionScore = !knownVersions.length ? .6 : knownVersions.every(version => version === destination.curriculumVersion) ? 1 : .45;
  const evidencePenalty = destination.outcomeEvidence === "unavailable" ? .06 : 0;
  const bundlePenalty = Math.max(0, sources.length - 1) * .025;
  const score = Math.max(0, Math.round((topicScore * .34 + outcomeScore * .30 + titleScore * .10 + ectsScore * .16 + versionScore * .10 - evidencePenalty - bundlePenalty) * 100));
  return {
    score,
    titleScore: Math.round(titleScore * 100),
    topicScore: Math.round(topicScore * 100),
    outcomeScore: Math.round(outcomeScore * 100),
    ectsScore: Math.round(ectsScore * 100),
    versionScore: Math.round(versionScore * 100),
    sourceEcts,
    sharedConcepts: semanticConcepts(sourceTopics).filter(concept => semanticConcepts(destination.topics).includes(concept))
  };
}

function candidateBundles(available, destination) {
  const ranked = available.map(source => ({ source, signal: scoreBundle([source], destination).score })).sort((a, b) => b.signal - a.signal).slice(0, 9).map(item => item.source);
  const bundles = ranked.map(source => [source]);
  for (let i = 0; i < ranked.length; i += 1) {
    for (let j = i + 1; j < ranked.length; j += 1) bundles.push([ranked[i], ranked[j]]);
  }
  for (let i = 0; i < Math.min(6, ranked.length); i += 1) {
    for (let j = i + 1; j < Math.min(7, ranked.length); j += 1) {
      for (let k = j + 1; k < Math.min(8, ranked.length); k += 1) bundles.push([ranked[i], ranked[j], ranked[k]]);
    }
  }
  return bundles.map(sources => ({ sources, ...scoreBundle(sources, destination) })).sort((a, b) => b.score - a.score || a.sources.length - b.sources.length);
}

function analyzeStudyLoad(records) {
  const semesterMap = new Map();
  records.forEach(record => {
    const key = `${record.institution}|${record.period}`;
    if (!semesterMap.has(key)) semesterMap.set(key, { institution: record.institution, period: record.period, ects: 0 });
    semesterMap.get(key).ects += Number(record.ects) || 0;
  });
  const semesters = [...semesterMap.values()].map((semester, index) => ({
    ...semester,
    number: index + 1,
    status: semester.ects > CREDIT_LOAD_RULES.standardSemester ? "overload" : "standard"
  }));
  const years = [];
  semesters.forEach((semester, index) => {
    const yearIndex = Math.floor(index / 2);
    if (!years[yearIndex]) years[yearIndex] = { number: yearIndex + 1, ects: 0, semesters: [] };
    years[yearIndex].ects += semester.ects;
    years[yearIndex].semesters.push(semester);
  });
  years.forEach(year => {
    year.status = year.ects > CREDIT_LOAD_RULES.maximumYear ? "breach" : year.ects > CREDIT_LOAD_RULES.standardYear ? "overload" : "standard";
  });
  return {
    semesters,
    years,
    hasAnnualBreach: years.some(year => year.status === "breach"),
    hasOverload: semesters.some(semester => semester.status === "overload") || years.some(year => year.status === "overload")
  };
}

function analyze(program) {
  const passed = attempts.filter(x => x.passed);
  const used = new Set();
  const recognizedDestinationCodes = new Set();
  const results = [];

  program.courses.forEach(raw => {
    const destination = normalizeCourse(raw, program);
    const available = passed.filter(source => !used.has(source.id));
    const best = candidateBundles(available, destination)[0];
    if (best && best.score >= 48) {
      best.sources.forEach(source => used.add(source.id));
      const missingPrerequisites = destination.prerequisites.filter(code => !recognizedDestinationCodes.has(code));
      const semanticPass = best.score >= 72;
      const kind = semanticPass && !missingPrerequisites.length ? "strong" : "review";
      const credited = kind === "strong" ? Math.min(best.sourceEcts, destination.ects) : 0;
      if (kind === "strong") recognizedDestinationCodes.add(destination.code);
      results.push({ destination, ...best, source: best.sources[0], missingPrerequisites, kind, credited });
    } else if (destination.semester <= 4 && destination.category === "core") {
      results.push({ destination, sources: [], source: null, score: best?.score || 0, topicScore: best?.topicScore || 0, outcomeScore: best?.outcomeScore || 0, ectsScore: best?.ectsScore || 0, titleScore: best?.titleScore || 0, versionScore: best?.versionScore || 0, sharedConcepts: [], missingPrerequisites: destination.prerequisites, kind: "missing", credited: 0 });
    }
  });

  const unmatched = passed.filter(x => !used.has(x.id));
  const freeEcts = Math.min(program.freeCreditLimit ?? 12, unmatched.reduce((sum, x) => sum + Number(x.ects || 0), 0));
  const coreEcts = results.filter(item => item.kind === "strong" && item.destination.category === "core").reduce((sum, item) => sum + item.credited, 0);
  const electiveEcts = results.filter(item => item.kind === "strong" && item.destination.category === "elective").reduce((sum, item) => sum + item.credited, 0);
  const recognized = coreEcts + electiveEcts + freeEcts;
  const strong = results.filter(x => x.kind === "strong");
  const review = results.filter(x => x.kind === "review");
  const missing = results.filter(x => x.kind === "missing");
  const semesterCoverage = [1,2,3,4].map(s => {
    const required = results.filter(x => x.destination.semester === s && x.destination.category === "core");
    const done = required.filter(x => x.kind === "strong");
    return required.length ? done.length / required.length : 1;
  });
  let coveragePlacement = 1;
  semesterCoverage.forEach((coverage, index) => { if (coverage >= .65) coveragePlacement = index + 2; });
  coveragePlacement = Math.min(5, coveragePlacement);
  const creditPlacement = Math.max(1, Math.min(8, Math.floor(recognized / CREDIT_LOAD_RULES.standardSemester) + 1));
  const placement = Math.min(coveragePlacement, creditPlacement);
  return { results, unmatched, coreEcts, electiveEcts, freeEcts, recognized, strong, review, missing, placement, coveragePlacement, creditPlacement, passed };
}

function setupSelects() {
  const destinationSelect = document.getElementById("destinationSelect");
  programs.forEach(p => {
    const option = document.createElement("option");
    option.value = p.id;
    option.textContent = p.university;
    destinationSelect.appendChild(option);
  });
  destinationSelect.value = currentProgram.id;
  syncProgramSelect();
  destinationSelect.addEventListener("change", () => {
    currentProgram = programs.find(p => p.id === destinationSelect.value);
    syncProgramSelect();
    render();
  });
}

function syncProgramSelect() {
  const select = document.getElementById("programSelect");
  select.innerHTML = `<option>${currentProgram.faculty} · ${currentProgram.program}</option>`;
}

function render() {
  const analysis = analyze(currentProgram);
  const loadAnalysis = analyzeStudyLoad(attempts);
  currentResults = analysis.results;
  const earned = analysis.passed.reduce((sum, x) => sum + x.ects, 0);
  const institutionCount = new Set(attempts.map(x => x.institution)).size;
  document.getElementById("resultSubtitle").textContent = `Based on ${analysis.passed.length} passed courses · ${earned} earned ECTS · ${analysis.recognized} ECTS estimated transferable`;
  document.getElementById("courseCount").textContent = attempts.length;
  document.getElementById("profileName").textContent = isGuestPlan ? "Guest student" : "John Doe";
  document.getElementById("profileAvatar").textContent = isGuestPlan ? "GS" : "JD";
  document.getElementById("profileSubtitle").textContent = isGuestPlan ? "Saved on this device" : "Demo mobility profile";
  document.getElementById("semesterMetric").textContent = `Semester ${analysis.placement}`;
  document.getElementById("placementConfidence").textContent = analysis.missing.length <= 2 ? "High confidence" : analysis.missing.length <= 4 ? "Moderate confidence" : "Low confidence";
  document.getElementById("semesterProgress").style.width = `${Math.min(100, analysis.placement / 8 * 100)}%`;
  const placementReasons = [];
  if (analysis.missing.length) placementReasons.push(`${analysis.missing.length} earlier requirement${analysis.missing.length === 1 ? "" : "s"} may affect placement`);
  if (analysis.creditPlacement < analysis.coveragePlacement) placementReasons.push(`the 30-ECTS semester baseline limits advancement`);
  document.getElementById("placementNote").textContent = placementReasons.length ? `${placementReasons.join("; ")}.` : "Core prerequisites and the standard credit pace are covered.";
  document.getElementById("recognizedMetric").textContent = analysis.coreEcts;
  document.getElementById("recognizedCourses").textContent = `${analysis.strong.filter(item => item.destination.category === "core").length} core requirement${analysis.strong.filter(item => item.destination.category === "core").length === 1 ? "" : "s"}`;
  document.getElementById("electiveMetric").textContent = analysis.electiveEcts;
  document.getElementById("freeMetric").textContent = analysis.freeEcts;
  document.getElementById("reviewMetric").textContent = analysis.review.length;
  const top = analysis.strong.sort((a,b) => b.score - a.score)[0];
  const topSourceTitle = top?.sources.map(source => source.title).join(" + ");
  document.getElementById("insightText").textContent = top ? `${topSourceTitle} → ${top.destination.title} is the strongest evidence-backed match at ${top.score}%.` : "Complete more courses to improve your transfer estimate.";
  renderCreditLoad(loadAnalysis);
  renderJourney();
  renderAlternatives();
  renderMatches();
  renderTranscript();
}

function renderCreditLoad(loadAnalysis) {
  const panel = document.getElementById("creditLoadPanel");
  const highestYear = loadAnalysis.years.reduce((highest, year) => Math.max(highest, year.ects), 0);
  const highestSemester = loadAnalysis.semesters.reduce((highest, semester) => Math.max(highest, semester.ects), 0);
  const state = loadAnalysis.hasAnnualBreach ? "breach" : loadAnalysis.hasOverload ? "overload" : "standard";
  const headline = state === "breach" ? "Annual legal ceiling exceeded" : state === "overload" ? "Overload needs university approval" : "Study load is within the standard plan";
  const detail = state === "breach"
    ? `One academic year exceeds 75 ECTS. Credits can still be recognized, but the study plan must be redistributed.`
    : state === "overload"
      ? `A semester exceeds 30 ECTS or a year exceeds 60 ECTS. This may be possible through an individual plan, but never above 75 ECTS per year.`
      : `The entered history stays within the 30-ECTS semester baseline and 60-ECTS academic-year plan.`;
  panel.className = `credit-load-panel ${state}`;
  panel.innerHTML = `<div class="load-icon">${state === "standard" ? "✓" : "!"}</div><div><span class="eyebrow">ECTS workload check</span><h3>${headline}</h3><p>${detail}</p></div><div class="load-numbers"><span><b>${highestSemester}</b> highest semester</span><span><b>${highestYear}</b> highest year</span><em>75 ECTS legal annual maximum</em></div>`;
}

function renderJourney() {
  const groups = [...new Map(attempts.map(item => [`${item.institution}|${item.period}`, { institution: item.institution, period: item.period }])).values()];
  const items = groups.map((group, index) => `<div class="journey-line"><span class="journey-dot done">${index + 1}</span><div><strong>${escapeHtml(group.institution)}</strong><span>${escapeHtml(group.period)}</span></div></div>`);
  items.push(`<div class="journey-line next"><span class="journey-dot">${groups.length + 1}</span><div><strong>${currentProgram.short}</strong><span>Your next move</span></div></div>`);
  document.getElementById("journeyList").innerHTML = items.join("");
}

function renderAlternatives() {
  const ranking = programs.map(program => ({ program, analysis: analyze(program) }))
    .sort((a, b) => b.analysis.recognized - a.analysis.recognized || a.analysis.missing.length - b.analysis.missing.length);
  const grid = document.getElementById("alternativesGrid");
  grid.innerHTML = ranking.map((item, index) => `<button class="alternative-card ${item.program.id === currentProgram.id ? "active" : ""}" data-program-id="${item.program.id}">
    <span class="alternative-rank"><span>Option ${index + 1}</span><span>${index + 1}</span></span>
    <h3>${item.program.short}</h3>
    <p>${item.program.program}</p>
    <span class="alternative-stats"><strong>${item.analysis.recognized} <small>ECTS</small></strong><span>Semester ${item.analysis.placement}</span></span>
  </button>`).join("");
  grid.querySelectorAll("[data-program-id]").forEach(button => button.addEventListener("click", () => {
    currentProgram = programs.find(program => program.id === button.dataset.programId);
    document.getElementById("destinationSelect").value = currentProgram.id;
    syncProgramSelect();
    render();
    document.getElementById("overview").scrollIntoView({ behavior: "smooth" });
  }));
}

function renderMatches() {
  const list = document.getElementById("matchList");
  const filtered = currentResults.filter(x => currentFilter === "all" || x.kind === currentFilter);
  if (!filtered.length) {
    list.innerHTML = `<div class="empty-state">No courses in this category for the current estimate.</div>`;
    return;
  }
  list.innerHTML = filtered.map((item, index) => {
    const sources = item.sources || (item.source ? [item.source] : []);
    const label = item.kind === "strong" ? "Strong match" : item.kind === "review" ? "Manual review" : "Missing";
    const sourceCell = sources.length
      ? `<span>${sources.length > 1 ? `${sources.length}-course bundle` : `${escapeHtml(sources[0].institution)} · ${escapeHtml(sources[0].code)}`}</span><strong>${sources.map(source => escapeHtml(source.title)).join(" + ")}</strong><em>${sources.reduce((sum, source) => sum + Number(source.ects || 0), 0)} ECTS · used once</em>`
      : `<span>No passed equivalent found</span><strong>Requirement not covered</strong><em>Check failed or untaken courses</em>`;
    const prerequisites = item.destination.prerequisites || [];
    const missingPrerequisites = item.missingPrerequisites || [];
    const explanation = item.kind === "strong"
      ? `Content concepts and learning outcomes clear the threshold${sources.length > 1 ? ` using a ${sources.length}-course bundle` : ""}; the source credit is now reserved and cannot be reused.`
      : item.kind === "review"
        ? missingPrerequisites.length ? `Content may match, but prerequisite evidence is missing: ${missingPrerequisites.join(", ")}.` : "Some learning outcomes overlap, but the evidence remains below the automatic-recognition threshold."
        : "No unused passed course or course bundle cleared the minimum evidence threshold.";
    const outcomeEvidence = item.destination.outcomeEvidence === "normalized-estimate" ? "normalized estimate" : item.destination.outcomeEvidence === "unavailable" ? "unavailable" : "topic-derived estimate";
    return `<article class="match-card" data-kind="${item.kind}" data-index="${index}">
      <div class="course-cell">${sourceCell}</div>
      <div class="match-arrow">›</div>
      <div class="course-cell"><span>${currentProgram.short} · ${escapeHtml(item.destination.code)} · ${item.destination.category}</span><strong>${escapeHtml(item.destination.title)}</strong><em>${item.destination.ects} ECTS · Semester ${item.destination.semester} · ${escapeHtml(item.destination.curriculumVersion)}</em></div>
      <div class="match-score"><strong>${item.score}%</strong><span>${label}</span><div class="score-bar"><span style="width:${item.score}%"></span></div></div>
      <button class="expand-button" aria-label="Show match details">+</button>
      <div class="match-details">
        <div class="detail-block"><span>Why this result</span><p>${explanation}</p></div>
        <div class="detail-block"><span>Evidence scores</span><p>Concepts ${item.topicScore}% · outcomes ${item.outcomeScore}% · ECTS ${item.ectsScore}% · version ${item.versionScore}% · title ${item.titleScore}%</p></div>
        <div class="detail-block"><span>Curriculum controls</span><p>${prerequisites.length ? `Prerequisites: ${prerequisites.join(", ")}. ${missingPrerequisites.length ? "Not yet evidenced." : "Satisfied."}` : "No published prerequisite in the imported record."} Learning outcomes: ${outcomeEvidence}.</p></div>
        <div class="detail-block"><span>Shared syllabus concepts</span><p>${item.sharedConcepts?.length ? item.sharedConcepts.map(x => `<i class="tag">${escapeHtml(x.replaceAll("_", " "))}</i>`).join("") : "No strong shared concepts identified."}</p></div>
      </div>
    </article>`;
  }).join("");
  list.querySelectorAll(".expand-button").forEach(button => button.addEventListener("click", () => {
    const card = button.closest(".match-card");
    card.classList.toggle("open");
    button.textContent = card.classList.contains("open") ? "−" : "+";
  }));
}

function renderTranscript() {
  const container = document.getElementById("transcriptList");
  const periods = [...new Set(attempts.map(x => `${x.institution}|${x.period}`))];
  container.innerHTML = periods.map(key => {
    const [institution, period] = key.split("|");
    const rows = attempts.filter(x => x.institution === institution && x.period === period);
    const passed = rows.filter(x => x.passed).length;
    return `<section class="transcript-group"><div class="transcript-group-header"><strong>${escapeHtml(institution)} · ${escapeHtml(period)}</strong><span>${passed}/${rows.length} passed</span></div>${rows.map(item => `<div class="attempt-row ${item.custom ? "has-delete" : ""}"><div><strong>${escapeHtml(item.title)}</strong><span>${escapeHtml(item.code || "No code")}</span></div><span>${item.ects} ECTS</span>${item.custom ? `<button class="delete-attempt" data-delete-id="${item.id}" aria-label="Delete ${escapeHtml(item.title)}">×</button>` : ""}<button class="status-toggle ${item.passed ? "passed" : "failed"}" data-id="${item.id}">${item.passed ? "Passed" : "Failed"}</button></div>`).join("")}</section>`;
  }).join("");
  container.querySelectorAll(".status-toggle").forEach(button => button.addEventListener("click", () => {
    const item = attempts.find(x => x.id === button.dataset.id);
    item.passed = !item.passed;
    saveTranscript();
    render();
  }));
  container.querySelectorAll("[data-delete-id]").forEach(button => button.addEventListener("click", () => {
    attempts = attempts.filter(item => item.id !== button.dataset.deleteId);
    saveTranscript();
    render();
  }));
}

function selectedSpecialty(semester) {
  const university = universityCatalogs.find(item => item.id === semester.universityId);
  const faculty = university?.faculties.find(item => item.id === semester.facultyId);
  return faculty?.specialties.find(item => item.id === semester.specialtyId);
}

function catalogForSelection(semester) {
  const specialty = selectedSpecialty(semester);
  const program = programs.find(item => item.id === specialty?.programId);
  const rawCourses = program?.courses || supplementalCatalogs[specialty?.catalogKey] || [];
  if (!program) return rawCourses.map(course => ({ code: course[0], title: course[1], ects: course[2], suggestedSemester: course[3], topics: course[4], category: inferCategory(course[0], course[1]), prerequisites: [], learningOutcomes: estimatedOutcomes(course[4]), outcomeEvidence: "topic-derived-estimate", curriculumVersion: "Unverified catalogue" }));
  return rawCourses.map(course => {
    const normalized = normalizeCourse(course, program);
    return { ...normalized, suggestedSemester: normalized.semester };
  });
}

function openBuilder() {
  draftSemesters = [];
  renderBuilder();
  document.getElementById("builderModal").classList.add("open");
  document.getElementById("builderModal").setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeBuilder() {
  document.getElementById("builderModal").classList.remove("open");
  document.getElementById("builderModal").setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function addDraftSemester() {
  draftSemesters.push({ id: `semester-${Date.now()}-${draftSemesters.length}`, universityId: "", facultyId: "", specialtyId: "", courses: [] });
  renderBuilder();
  requestAnimationFrame(() => document.querySelector(".semester-builder-card:last-child")?.scrollIntoView({ behavior: "smooth", block: "center" }));
}

function renderBuilder() {
  const list = document.getElementById("semesterBuilderList");
  const empty = document.getElementById("builderEmpty");
  empty.classList.toggle("hidden", draftSemesters.length > 0);
  list.innerHTML = draftSemesters.map((semester, index) => {
    const selectedUniversity = universityCatalogs.find(university => university.id === semester.universityId);
    const selectedFaculty = selectedUniversity?.faculties.find(faculty => faculty.id === semester.facultyId);
    const specialty = selectedSpecialty(semester);
    const hasCatalog = catalogForSelection(semester).length > 0;
    const universityOptions = [`<option value="">Choose university…</option>`, ...universityCatalogs.map(university => `<option value="${university.id}" ${semester.universityId === university.id ? "selected" : ""}>${university.name}</option>`)].join("");
    const facultyOptions = [`<option value="">Choose faculty…</option>`, ...(selectedUniversity?.faculties || []).map(faculty => `<option value="${faculty.id}" ${semester.facultyId === faculty.id ? "selected" : ""}>${escapeHtml(faculty.name)}</option>`)].join("");
    const specialtyOptions = [`<option value="">Choose specialty…</option>`, ...(selectedFaculty?.specialties || []).map(item => `<option value="${item.id}" ${semester.specialtyId === item.id ? "selected" : ""}>${escapeHtml(item.name)}</option>`)].join("");
    const searchPlaceholder = !specialty ? "Choose a specialty first" : hasCatalog ? "Type a subject name or code…" : "Subject catalogue import in progress";
    const datasetStatus = !specialty ? "" : specialty.verification === "official"
      ? `<div class="dataset-status official"><span>✓ Official curriculum</span><b>${catalogForSelection(semester).length} courses · source retained</b></div>`
      : `<div class="dataset-status pending"><span>Catalogue pending</span><b>Programme selection is available; course import is not verified yet.</b></div>`;
    const semesterEcts = semester.courses.reduce((sum, course) => sum + (Number(course.ects) || 0), 0);
    const loadState = semesterEcts > CREDIT_LOAD_RULES.standardSemester ? "overload" : "standard";
    const loadMessage = semesterEcts > CREDIT_LOAD_RULES.standardSemester
      ? `${semesterEcts} ECTS · above the 30-ECTS standard; annual total must remain at or below 75.`
      : `${semesterEcts} / ${CREDIT_LOAD_RULES.standardSemester} ECTS standard semester load`;
    const courses = semester.courses.length
      ? semester.courses.map(course => `<div class="semester-course-row"><div><strong>${escapeHtml(course.title)}</strong><small>${escapeHtml(course.code)}</small></div><span>${course.ects} ECTS</span><button class="draft-status ${course.passed ? "" : "failed"}" data-draft-status="${course.id}" data-semester-id="${semester.id}">${course.passed ? "Passed" : "Failed"}</button><button class="draft-remove" data-draft-remove="${course.id}" data-semester-id="${semester.id}" aria-label="Remove ${escapeHtml(course.title)}">×</button></div>`).join("")
      : `<div class="semester-no-courses">Choose university, faculty and specialty, then search and add subjects.</div>`;
    return `<article class="semester-builder-card" data-semester-card="${semester.id}">
      <div class="semester-card-header"><div class="semester-title"><span>${index + 1}</span><div><h3>Semester ${index + 1}</h3><small>${semester.courses.length} subject${semester.courses.length === 1 ? "" : "s"} added</small></div></div><button class="remove-semester" data-remove-semester="${semester.id}">Remove semester</button></div>
      <div class="semester-fields">
        <label class="field-label">University<select data-semester-university="${semester.id}">${universityOptions}</select></label>
        <label class="field-label">Faculty<select data-semester-faculty="${semester.id}" ${selectedUniversity ? "" : "disabled"}>${facultyOptions}</select></label>
        <label class="field-label">Specialty<select data-semester-specialty="${semester.id}" ${selectedFaculty ? "" : "disabled"}>${specialtyOptions}</select></label>
        <label class="field-label">Search subject<div class="subject-picker"><input class="subject-search" type="search" autocomplete="off" placeholder="${searchPlaceholder}" ${hasCatalog ? "" : "disabled"} data-subject-search="${semester.id}" /><div class="subject-results" data-subject-results="${semester.id}"></div></div></label>
      </div>
      ${datasetStatus}
      <div class="semester-load ${loadState}"><span>${loadState === "standard" ? "✓" : "!"}</span><strong>${loadMessage}</strong></div>
      <div class="semester-courses">${courses}</div>
    </article>`;
  }).join("");

  const courseTotal = draftSemesters.reduce((sum, semester) => sum + semester.courses.length, 0);
  const draftRecords = draftSemesters.flatMap((semester, index) => semester.courses.map(course => ({ ...course, institution: semester.universityId || "Unselected", period: `Semester ${index + 1}` })));
  const draftLoad = analyzeStudyLoad(draftRecords);
  document.getElementById("builderSummary").textContent = draftSemesters.length ? `${draftSemesters.length} semester${draftSemesters.length === 1 ? "" : "s"} · ${courseTotal} subject${courseTotal === 1 ? "" : "s"}` : "No semesters yet";
  document.getElementById("builderLoadSummary").textContent = draftLoad.hasAnnualBreach
    ? "Annual load exceeds the 75-ECTS legal maximum. Redistribute courses before calculating."
    : draftLoad.hasOverload
      ? "Overload detected: university approval may be required."
      : "30 ECTS/semester standard · 60/year standard · 75/year maximum";
  document.getElementById("builderLoadSummary").className = draftLoad.hasAnnualBreach ? "load-breach" : draftLoad.hasOverload ? "load-overload" : "";
  document.getElementById("calculateCleanPlan").disabled = courseTotal === 0 || draftLoad.hasAnnualBreach;

  list.querySelectorAll("[data-semester-university]").forEach(select => select.addEventListener("change", () => {
    const semester = draftSemesters.find(item => item.id === select.dataset.semesterUniversity);
    if (semester.universityId && semester.universityId !== select.value && semester.courses.length && !window.confirm("Changing university will clear the subjects in this semester. Continue?")) {
      select.value = semester.universityId;
      return;
    }
    semester.universityId = select.value;
    semester.facultyId = "";
    semester.specialtyId = "";
    semester.courses = [];
    renderBuilder();
  }));
  list.querySelectorAll("[data-semester-faculty]").forEach(select => select.addEventListener("change", () => {
    const semester = draftSemesters.find(item => item.id === select.dataset.semesterFaculty);
    if (semester.facultyId && semester.facultyId !== select.value && semester.courses.length && !window.confirm("Changing faculty will clear the subjects in this semester. Continue?")) {
      select.value = semester.facultyId;
      return;
    }
    semester.facultyId = select.value;
    semester.specialtyId = "";
    semester.courses = [];
    renderBuilder();
  }));
  list.querySelectorAll("[data-semester-specialty]").forEach(select => select.addEventListener("change", () => {
    const semester = draftSemesters.find(item => item.id === select.dataset.semesterSpecialty);
    if (semester.specialtyId && semester.specialtyId !== select.value && semester.courses.length && !window.confirm("Changing specialty will clear the subjects in this semester. Continue?")) {
      select.value = semester.specialtyId;
      return;
    }
    semester.specialtyId = select.value;
    semester.courses = [];
    renderBuilder();
  }));
  list.querySelectorAll("[data-remove-semester]").forEach(button => button.addEventListener("click", () => {
    draftSemesters = draftSemesters.filter(item => item.id !== button.dataset.removeSemester);
    renderBuilder();
  }));
  list.querySelectorAll("[data-subject-search]").forEach(input => {
    input.addEventListener("input", () => renderSubjectResults(input));
    input.addEventListener("focus", () => renderSubjectResults(input));
    input.addEventListener("keydown", event => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      event.stopPropagation();
      document.querySelector(`[data-subject-results="${input.dataset.subjectSearch}"]`)?.classList.remove("open");
      input.blur();
    });
  });
  list.querySelectorAll("[data-draft-status]").forEach(button => button.addEventListener("click", () => {
    const semester = draftSemesters.find(item => item.id === button.dataset.semesterId);
    const course = semester.courses.find(item => item.id === button.dataset.draftStatus);
    course.passed = !course.passed;
    renderBuilder();
  }));
  list.querySelectorAll("[data-draft-remove]").forEach(button => button.addEventListener("click", () => {
    const semester = draftSemesters.find(item => item.id === button.dataset.semesterId);
    semester.courses = semester.courses.filter(item => item.id !== button.dataset.draftRemove);
    renderBuilder();
  }));
}

function renderSubjectResults(input) {
  const semester = draftSemesters.find(item => item.id === input.dataset.subjectSearch);
  const results = document.querySelector(`[data-subject-results="${semester.id}"]`);
  const query = input.value.trim().toLowerCase();
  const addedCodes = new Set(semester.courses.map(course => course.code));
  const matches = catalogForSelection(semester)
    .filter(course => !addedCodes.has(course.code) && (!query || `${course.title} ${course.code}`.toLowerCase().includes(query)))
    .slice(0, 7);
  results.innerHTML = matches.length ? matches.map(course => `<button class="subject-result" type="button" data-add-subject="${course.code}"><span><strong>${escapeHtml(course.title)}</strong><small>${escapeHtml(course.code)} · Suggested semester ${course.suggestedSemester}</small></span><span>${course.ects} ECTS ＋</span></button>`).join("") : `<div class="semester-no-courses">No matching subjects found.</div>`;
  results.classList.add("open");
  results.querySelectorAll("[data-add-subject]").forEach(button => button.addEventListener("click", () => {
    const selected = catalogForSelection(semester).find(course => course.code === button.dataset.addSubject);
    semester.courses.push({ ...selected, id: `${semester.id}-${selected.code}`, passed: true });
    renderBuilder();
  }));
}

function calculateCleanPlan() {
  const populated = draftSemesters.filter(semester => semester.universityId && semester.courses.length);
  if (!populated.length) return;
  const loadRecords = populated.flatMap((semester, index) => semester.courses.map(course => ({ ...course, institution: semester.universityId, period: `Semester ${index + 1}` })));
  if (analyzeStudyLoad(loadRecords).hasAnnualBreach) {
    document.getElementById("builderLoadSummary").scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }
  attempts = populated.flatMap((semester, index) => {
    const university = universityCatalogs.find(item => item.id === semester.universityId);
    return semester.courses.map(course => ({ ...course, id: `guest-${index}-${course.code}`, institution: university.id, period: `Semester ${index + 1}`, custom: true }));
  });
  isGuestPlan = true;
  localStorage.setItem("creditCompassMode", "guest");
  saveTranscript();
  closeBuilder();
  render();
  document.getElementById("overview").scrollIntoView({ behavior: "smooth" });
}

function renderSources() {
  document.getElementById("sourceList").innerHTML = sources.map(source => `<a class="source-card" href="${source.url}" target="_blank" rel="noreferrer"><strong>${source.name}</strong><span>${source.note}</span><em>${source.type} ↗</em></a>`).join("");
}

function openDrawer(id) {
  closeDrawers();
  document.getElementById(id).classList.add("open");
  document.getElementById(id).setAttribute("aria-hidden", "false");
  document.getElementById("drawerBackdrop").classList.add("open");
}
function closeDrawers() {
  document.querySelectorAll(".drawer").forEach(x => { x.classList.remove("open"); x.setAttribute("aria-hidden", "true"); });
  document.getElementById("drawerBackdrop").classList.remove("open");
}

document.addEventListener("click", event => {
  if (!event.target.closest(".subject-picker")) {
    document.querySelectorAll(".subject-results.open").forEach(results => results.classList.remove("open"));
  }
  const action = event.target.closest("[data-action]")?.dataset.action;
  if (action === "open-transcript") openDrawer("transcriptDrawer");
  if (action === "open-sources") openDrawer("sourcesDrawer");
  if (action === "close-drawers") closeDrawers();
  if (action === "start-clean") openBuilder();
  if (action === "close-builder") closeBuilder();
  if (action === "add-semester") addDraftSemester();
  const scroll = event.target.closest("[data-scroll]")?.dataset.scroll;
  if (scroll) document.getElementById(scroll)?.scrollIntoView({ behavior: "smooth" });
});
document.getElementById("drawerBackdrop").addEventListener("click", closeDrawers);
document.addEventListener("keydown", event => {
  if (event.key !== "Escape") return;
  const openResults = document.querySelectorAll(".subject-results.open");
  if (openResults.length) {
    openResults.forEach(results => results.classList.remove("open"));
    return;
  }
  closeDrawers();
  closeBuilder();
});
document.getElementById("analyzeButton").addEventListener("click", () => {
  render();
  document.querySelector(".metric-grid").animate([{opacity:.45, transform:"translateY(4px)"},{opacity:1, transform:"translateY(0)"}], {duration:330});
});
document.querySelectorAll("[data-filter]").forEach(button => button.addEventListener("click", () => {
  document.querySelectorAll("[data-filter]").forEach(x => x.classList.remove("active"));
  button.classList.add("active");
  currentFilter = button.dataset.filter;
  renderMatches();
}));
document.getElementById("addCourseForm").addEventListener("submit", event => {
  event.preventDefault();
  const topics = document.getElementById("newTopics").value.split(",").map(value => value.trim().toLowerCase()).filter(Boolean);
  attempts.push({
    id: `custom-${Date.now()}`,
    institution: document.getElementById("newInstitution").value.trim(),
    period: document.getElementById("newPeriod").value.trim(),
    code: document.getElementById("newCode").value.trim() || "CUSTOM",
    title: document.getElementById("newTitle").value.trim(),
    ects: Number(document.getElementById("newEcts").value),
    passed: document.getElementById("newPassed").checked,
    topics,
    custom: true
  });
  saveTranscript();
  event.target.reset();
  document.getElementById("newEcts").value = 5;
  document.getElementById("newPassed").checked = true;
  document.querySelector(".add-course-panel").open = false;
  render();
});
document.getElementById("resetTranscript").addEventListener("click", () => {
  attempts = structuredClone(defaultAttempts);
  isGuestPlan = false;
  localStorage.setItem("creditCompassMode", "demo");
  saveTranscript();
  render();
});
document.getElementById("calculateCleanPlan").addEventListener("click", calculateCleanPlan);

async function initializeApp() {
  try {
    await loadOfficialDataset();
  } catch (error) {
    console.warn("Official curriculum dataset could not be loaded; using the bundled fallback.", error);
  }
  setupSelects();
  renderSources();
  render();
}

initializeApp();
