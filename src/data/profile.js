export const profile = {
  name: "Akash Samanta",
  email: "akashsamanta0018@gmail.com",
  location: "Barasat, Kolkata, West Bengal, India",
  github: "https://github.com/akashsamanta2569-a11y",
  linkedin: "https://www.linkedin.com/in/akash-samanta-a3331b371/",
  resume: "public/AKASH_RESUME001.pdf",
};

export const skillGroups = [
  { label: "Programming", items: ["Python", "C++", "SQL", "HTML", "CSS"] },
  { label: "AI / ML", items: ["YOLOv8", "OpenCV", "NumPy", "Pandas", "Prompt Engineering"] },
  { label: "Backend", items: ["FastAPI", "REST APIs", "MySQL"] },
  { label: "Applied AI", items: ["RAG", "Gemini AI", "NDVI analysis"] },
];

export const projects = [
  {
    id: "memoryvault",
    name: "MemoryVault AI",
    kicker: "AI Hackathon project",
    summary: "A memory companion designed to support senior citizens with personalized recall, reminders, caregiver support, and emergency assistance.",
    problem: "Senior citizens can benefit from support that helps them recall personal context and stay on top of daily care needs.",
    solution: "An AI-powered companion that combines Gemini AI and retrieval-augmented generation to support personalized memory recall alongside medicine reminders, caregiver support, and emergency assistance.",
    technologies: ["Next.js", "FastAPI", "Gemini AI", "MongoDB", "RAG"],
    features: ["Personalized memory recall", "Medicine reminders", "Caregiver support", "Emergency assistance"],
    workflow: ["Memory context", "Gemini AI + RAG", "Personalized support"],
    contribution: "Developed the AI-powered memory-companion project as part of an AI hackathon.",
    verified: "Project scope and technology stack are verified from the supplied résumé. A public repository or live demo was not available for verification.",
    signature: true,
  },
  {
    id: "encroachment",
    name: "AI-Powered Land Encroachment Detection",
    kicker: "Smart India Hackathon 2026",
    summary: "A computer-vision concept for detecting illegal land encroachments from satellite imagery and vegetation analysis.",
    problem: "Illegal land encroachment is difficult to identify at scale from large areas of satellite imagery.",
    solution: "A computer-vision workflow using YOLOv8, OpenCV, and NDVI vegetation analysis to identify potential illegal encroachments in satellite imagery.",
    technologies: ["Python", "YOLOv8", "OpenCV", "NDVI"],
    features: ["Satellite-image analysis", "Object detection", "Vegetation analysis", "Potential encroachment identification"],
    workflow: ["Satellite imagery", "YOLOv8 + OpenCV", "NDVI analysis", "Potential encroachment signal"],
    contribution: "Led the Smart India Hackathon 2026 team working on this project, as stated on the résumé.",
    verified: "Project description, team-lead role, and stack are verified from the supplied résumé. No accuracy claims, repository URL, or demo have been added without evidence.",
  },
];

export const journey = [
  { year: "2026 — Present", title: "GeeksforGeeks Campus Mantri", organization: "Brainware University", description: "Campus leadership role listed on the current résumé." },
  { year: "2026", title: "Google Student Ambassador", organization: "Google", description: "Student ambassador role listed on the current résumé." },
  { year: "2026", title: "Smart India Hackathon Team Lead", organization: "Smart India Hackathon", description: "Led a team working on AI-powered land encroachment detection." },
  { year: "2026", title: "Hackathon & innovation participation", organization: "Google Student Ambassador Hackathon · AI Ignite Innovation Challenge", description: "Participant experience documented on the current résumé." },
  { year: "Ongoing", title: "DSA practice", organization: "GeeksforGeeks & LeetCode", description: "Active learner, strengthening core problem-solving foundations." },
];
