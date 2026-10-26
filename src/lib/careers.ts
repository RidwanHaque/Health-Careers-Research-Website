export const AGE_BANDS = ["elementary", "middle", "high", "college"] as const;

export type AgeBand = (typeof AGE_BANDS)[number];

export type CareerId =
  | "physician"
  | "physician-assistant"
  | "nurse"
  | "physical-therapist"
  | "pharmacist"
  | "educator"
  | "researcher";

export type Career = {
  id: CareerId;
  name: string;
  shortName: string;
  navLabel: string;
  accent: string;
  overview: string;
  impact: string;
  dayToDay: string[];
  roadmap: { label: string; detail: string }[];
  credentialNote: string;
  tryNow: Record<AgeBand, string[]>;
  sources: { label: string; href: string }[];
};

export const careers: Career[] = [
  {
    id: "physician",
    name: "Physician",
    shortName: "Doctor",
    navLabel: "Physician",
    accent: "#e85d4c",
    overview:
      "A physician is a doctor who listens to people, figures out what is going on with their health, and helps them get better. Some doctors care for whole families. Others focus on one part of the body, like the heart, bones, or brain.",
    impact:
      "Doctors help people stay well, catch problems early, and treat illness. They also work with nurses, physician assistants, pharmacists, and many other teammates.",
    dayToDay: [
      "Talk with patients and families about symptoms and health history",
      "Examine patients and order tests when more information is needed",
      "Explain what the results mean and choose a treatment plan",
      "Write notes, follow up on labs, and coordinate care with the rest of the team",
    ],
    roadmap: [
      { label: "Bachelor's", detail: "About 4 years of college, including science courses" },
      { label: "Medical school", detail: "M.D. or D.O. program, usually 4 years" },
      { label: "Residency", detail: "Paid training in a specialty, often 3 to 7 years" },
      { label: "License", detail: "Pass national exams and earn a state medical license" },
    ],
    credentialNote:
      "In the United States, physicians typically need a bachelor's degree, an M.D. or D.O. degree, residency training, and a state license. Board certification in a specialty is common after residency.",
    tryNow: {
      elementary: [
        "Visit a science museum and look for exhibits about the human body",
        "Read kids' books about doctors, hospitals, and how bodies work",
        "Ask a trusted adult what a checkup is for, and what each tool in the exam room does",
      ],
      middle: [
        "Join a science club or a school STEM night",
        "Keep a simple journal of questions you have after health class",
        "Look for age-open hospital or clinic open-house events with a parent or guardian",
      ],
      high: [
        "Ask a counselor about HOSA, Medical Explorers, or other health clubs",
        "Volunteer in a role that is open to teens, such as a hospital volunteer program with age rules",
        "Take biology, chemistry, and anatomy if your school offers them",
        "Look into local summer programs such as PCOM Georgia's Opportunities Academy if you are eligible",
      ],
      college: [
        "Complete prerequisite science courses and keep a realistic study schedule",
        "Shadow physicians only through official programs that allow it",
        "Serve as a medical scribe, EMT, or clinic volunteer if trained and permitted",
        "Ask mentors about the MCAT only when you are actually preparing for medical school",
      ],
    },
    sources: [
      {
        label: "BLS: Physicians and Surgeons",
        href: "https://www.bls.gov/ooh/healthcare/physicians-and-surgeons.htm",
      },
      {
        label: "AAMC: Becoming a Doctor",
        href: "https://students-residents.aamc.org/choosing-medical-career/how-become-doctor",
      },
    ],
  },
  {
    id: "physician-assistant",
    name: "Physician Assistant",
    shortName: "PA",
    navLabel: "PA",
    accent: "#f4a127",
    overview:
      "A physician assistant (PA) is a licensed clinician who examines patients, orders tests, and helps treat illness as part of a healthcare team. PAs work in clinics, hospitals, emergency departments, and many specialties.",
    impact:
      "PAs help more people get timely care. They often spend a lot of time talking with patients, solving problems, and making a plan with the supervising or collaborating physician and the rest of the team.",
    dayToDay: [
      "Take medical histories and perform exams",
      "Order and review common tests",
      "Treat injuries and illnesses and write prescriptions where state law allows",
      "Teach patients how to take medicines and what to watch for at home",
    ],
    roadmap: [
      { label: "Bachelor's", detail: "About 4 years, often with patient-care experience" },
      { label: "PA program", detail: "Master's-level program, often about 2 to 3 years" },
      { label: "PANCE", detail: "National certifying exam after graduation" },
      { label: "License", detail: "State license; teams and rules vary by state" },
    ],
    credentialNote:
      "PAs typically complete a master's-level accredited PA program, pass the PANCE, and obtain a state license. Many programs expect hands-on patient-care hours before admission.",
    tryNow: {
      elementary: [
        "Learn the names of people on a clinic team: doctor, PA, nurse, and medical assistant",
        "Practice explaining how you feel using clear words, like a patient would",
      ],
      middle: [
        "Volunteer at a community event that needs helpers, such as a health fair setup (with an adult)",
        "Interview a family friend in healthcare about teamwork, not just 'being the boss'",
      ],
      high: [
        "Look for paid or volunteer patient-care roles allowed at your age, such as CNA training if you meet the age requirement",
        "Take science courses and keep a log of any healthcare volunteering",
        "Read about what PAs do in primary care versus surgery so you see the range of the job",
      ],
      college: [
        "Gain patient-care hours that PA programs actually count, such as EMT, CNA, or medical assistant work",
        "Complete prerequisite courses and ask PA programs what they require",
        "Shadow a PA only if the clinic has a formal process for it",
      ],
    },
    sources: [
      {
        label: "BLS: Physician Assistants",
        href: "https://www.bls.gov/ooh/healthcare/physician-assistants.htm",
      },
      {
        label: "AAPA: What is a PA?",
        href: "https://www.aapa.org/about/what-is-a-pa/",
      },
    ],
  },
  {
    id: "nurse",
    name: "Nurse",
    shortName: "Nurse",
    navLabel: "Nurse",
    accent: "#3dbb6b",
    overview:
      "Nurses take care of people at the bedside, in clinics, schools, and homes. They watch how a patient is doing, give medicines, teach families, and speak up when something does not look right.",
    impact:
      "Nursing is one of the largest health professions. Nurses keep patients safe hour by hour and help families understand what happens next.",
    dayToDay: [
      "Check vital signs and look for changes in how a patient feels",
      "Give medications and treatments planned with the care team",
      "Help with daily needs, wound care, and getting ready to go home",
      "Teach patients and families, then write careful notes so the next shift knows what happened",
    ],
    roadmap: [
      { label: "Nursing program", detail: "ADN (about 2 years) or BSN (about 4 years) are common paths" },
      { label: "NCLEX-RN", detail: "National exam to become a registered nurse" },
      { label: "License", detail: "State RN license; employers may prefer a BSN" },
      { label: "Optional next steps", detail: "Experience, then APRN programs such as NP with extra graduate school" },
    ],
    credentialNote:
      "Registered nurses typically complete an accredited nursing program (often an ADN or BSN), pass the NCLEX-RN, and obtain a state license. Licensed practical nurses follow a shorter program and a different exam. Advanced practice roles need graduate education.",
    tryNow: {
      elementary: [
        "Practice kindness and clear communication — nurses use both all day",
        "Learn basic first aid ideas from a trusted adult, like when to get help",
      ],
      middle: [
        "Join a club that helps people, such as a peer-helper or community service group",
        "Look for a babysitting or first-aid course designed for your age",
      ],
      high: [
        "Ask about CNA or BLS/CPR classes if you meet the age and training rules",
        "Volunteer in a setting that welcomes teens, such as a nursing home activity program",
        "Take anatomy and health-science electives if they are offered",
      ],
      college: [
        "Compare ADN, BSN, and accelerated BSN options with an advisor",
        "Work as a CNA or patient-care tech while in school if you can",
        "Keep immunization and background-check paperwork organized for clinicals",
      ],
    },
    sources: [
      {
        label: "BLS: Registered Nurses",
        href: "https://www.bls.gov/ooh/healthcare/registered-nurses.htm",
      },
      {
        label: "NCSBN: NCLEX",
        href: "https://www.ncsbn.org/exams/nclex.page",
      },
    ],
  },
  {
    id: "physical-therapist",
    name: "Physical Therapist",
    shortName: "PT",
    navLabel: "PT",
    accent: "#5b8def",
    overview:
      "A physical therapist (PT) helps people move with less pain and more strength. PTs work with patients after injuries, surgeries, and illnesses, and they also help people prevent injuries.",
    impact:
      "PTs help someone walk again after an accident, get back to sports, or stay independent at home. They turn exercises into a plan a person can actually follow.",
    dayToDay: [
      "Ask how a patient moves through a normal day and what hurts",
      "Test strength, balance, and range of motion",
      "Teach exercises, stretches, and safer ways to walk, lift, or climb stairs",
      "Adjust the plan as the patient gets stronger and write notes for the care team",
    ],
    roadmap: [
      { label: "Bachelor's", detail: "About 4 years; many students choose a related major" },
      { label: "DPT", detail: "Doctor of Physical Therapy program, often about 3 years" },
      { label: "Licensure exam", detail: "Pass the national PT exam (NPTE)" },
      { label: "State license", detail: "Meet your state's rules before treating patients" },
    ],
    credentialNote:
      "Physical therapists in the United States typically need a Doctor of Physical Therapy degree from an accredited program, a passing NPTE score, and a state license. Observation hours are often required before applying.",
    tryNow: {
      elementary: [
        "Notice how your body balances on one foot, climbs stairs, or throws a ball",
        "Try a kids' stretching or movement class and pay attention to form, not just speed",
      ],
      middle: [
        "Join a sport or dance activity and learn how warm-ups prevent injuries",
        "Ask a coach or PE teacher what they do when someone sprains an ankle",
      ],
      high: [
        "Look for PT observation hours only through clinics that accept high school students",
        "Volunteer with adaptive sports or school athletic training if the program allows it",
        "Take biology and physics; both show up later in PT school",
      ],
      college: [
        "Complete DPT prerequisites and required observation hours",
        "Work as a PT aide if a clinic hires students",
        "Learn the difference between PT, PTA, athletic training, and occupational therapy before you apply",
      ],
    },
    sources: [
      {
        label: "BLS: Physical Therapists",
        href: "https://www.bls.gov/ooh/healthcare/physical-therapists.htm",
      },
      {
        label: "APTA: Becoming a PT",
        href: "https://www.apta.org/your-career/careers-in-physical-therapy/becoming-a-pt",
      },
    ],
  },
  {
    id: "pharmacist",
    name: "Pharmacist",
    shortName: "Pharmacist",
    navLabel: "Pharmacist",
    accent: "#9b59b6",
    overview:
      "A pharmacist is the medicine expert on the team. Pharmacists check that a prescription is safe, explain how to take it, and answer questions about side effects and refills.",
    impact:
      "The right medicine at the right dose can help a person heal. The wrong mix can cause harm. Pharmacists catch problems before a patient leaves the counter or the hospital.",
    dayToDay: [
      "Review prescriptions for dose, allergies, and interactions with other medicines",
      "Talk with patients about how and when to take a medicine",
      "Work with doctors and nurses when a change is needed",
      "In hospitals, join rounds or prepare medicines for people who are very sick",
    ],
    roadmap: [
      { label: "College science", detail: "Pre-pharmacy courses; some students finish a bachelor's first" },
      { label: "PharmD", detail: "Doctor of Pharmacy program, often 4 professional years" },
      { label: "Exams", detail: "NAPLEX plus state law exam in many states" },
      { label: "License", detail: "State pharmacist license; residencies are optional extra training" },
    ],
    credentialNote:
      "Pharmacists typically earn a PharmD from an accredited program, pass licensure exams such as the NAPLEX, and obtain a state license. Many also complete intern hours during school.",
    tryNow: {
      elementary: [
        "Look at a vitamin or medicine label with an adult and find the directions and warnings",
        "Learn why you should never share prescription medicine",
      ],
      middle: [
        "Join a science fair and pick a project about how a common medicine is used safely",
        "Ask a pharmacist (with an adult) what they check before handing over a prescription",
      ],
      high: [
        "Take chemistry and biology",
        "Look for pharmacy technician or clerk jobs if you meet the age requirement",
        "Volunteer in a role that involves careful counting, labeling, or following protocols",
      ],
      college: [
        "Complete pre-pharmacy courses and confirm each PharmD program's requirements",
        "Work as a pharmacy technician if licensed or registered in your state",
        "Ask pharmacists about community, hospital, and industry career paths",
      ],
    },
    sources: [
      {
        label: "BLS: Pharmacists",
        href: "https://www.bls.gov/ooh/healthcare/pharmacists.htm",
      },
      {
        label: "AACP: Become a Pharmacist",
        href: "https://www.aacp.org/resources/students/future",
      },
    ],
  },
  {
    id: "educator",
    name: "Health and Science Educator",
    shortName: "Educator",
    navLabel: "Educator",
    accent: "#ef6c9c",
    overview:
      "Health and science educators teach people how bodies work and how to make healthier choices. Some teach in schools. Others work in clinics, public health departments, museums, or community programs.",
    impact:
      "A clear explanation can help a class understand germs, help a family manage asthma, or help a neighborhood find a vaccine clinic. Educators turn complicated health information into something people can use.",
    dayToDay: [
      "Plan lessons, activities, or workshops for a specific age group",
      "Teach with labs, models, stories, or practice skills, not just lectures",
      "Check what students or community members understood and adjust the next lesson",
      "Work with nurses, doctors, or teachers when the topic is clinical or sensitive",
    ],
    roadmap: [
      { label: "Bachelor's", detail: "Health education, science education, biology, or a related major" },
      { label: "Classroom path", detail: "State teaching license if you want to teach in a public school" },
      { label: "Community path", detail: "Public health or health-education roles in clinics and nonprofits" },
      { label: "Optional CHES", detail: "Certified Health Education Specialist exam after qualifying coursework" },
    ],
    credentialNote:
      "School science or health teachers typically need a bachelor's degree and a state teaching license. Community health educators often have a bachelor's degree in health education or public health. CHES certification is optional and based on academic qualifications.",
    tryNow: {
      elementary: [
        "Explain a science idea to a younger sibling or classmate using a drawing",
        "Help with a class project about washing hands, nutrition, or exercise",
      ],
      middle: [
        "Tutor a classmate in science",
        "Join science Olympiad, a museum volunteer day, or a peer-education club",
      ],
      high: [
        "Teach a short lesson in a club, camp, or after-school program",
        "Volunteer at a science museum, library STEM hour, or school health fair",
        "Take biology and a writing-heavy class; educators write a lot of lesson plans",
      ],
      college: [
        "Ask an advisor about teacher-prep versus public-health majors",
        "Get classroom observation hours if you want a teaching license",
        "Look up CHES eligibility if you want a health-education credential",
      ],
    },
    sources: [
      {
        label: "BLS: Health Education Specialists",
        href: "https://www.bls.gov/ooh/community-and-social-service/health-education-specialists.htm",
      },
      {
        label: "NCHEC: CHES exam eligibility",
        href: "https://www.nchec.org/ches-exam-eligibility",
      },
    ],
  },
  {
    id: "researcher",
    name: "Health and Science Researcher",
    shortName: "Researcher",
    navLabel: "Researcher",
    accent: "#2bb7c7",
    overview:
      "Researchers ask careful questions and run studies to find trustworthy answers. In health and science, that might mean testing a new treatment, tracking how a disease spreads, or learning how a cell works.",
    impact:
      "Today's checkups, vaccines, and physical-therapy exercises exist because someone measured what works. Researchers help the rest of the health team make decisions based on evidence, not guesses.",
    dayToDay: [
      "Read what other scientists have already found",
      "Design an experiment or study and collect data",
      "Use lab tools, surveys, or computer analysis, depending on the project",
      "Share results in papers, posters, or team meetings, including what still is not known",
    ],
    roadmap: [
      { label: "Bachelor's", detail: "Science major; lab or data internships help" },
      { label: "Research roles", detail: "Some lab technician jobs start with a bachelor's degree" },
      { label: "Graduate study", detail: "Many independent scientist roles need a master's, Ph.D., or dual degree" },
      { label: "Ongoing training", detail: "Ethics training, lab safety, and mentoring are part of the job" },
    ],
    credentialNote:
      "Job titles vary. Clinical laboratory technologists often start with a bachelor's degree. Medical scientists and principal investigators commonly hold a Ph.D. or a professional degree such as an M.D. There is no single license for 'researcher.'",
    tryNow: {
      elementary: [
        "Ask a 'what if' question and test it with a simple, safe home or classroom experiment",
        "Visit a science museum and look for how exhibits show evidence, not just facts",
      ],
      middle: [
        "Enter a science fair and keep a notebook of methods, not only the final poster",
        "Join a robotics, coding, or science club",
      ],
      high: [
        "Ask a science teacher about science-fair mentorship or a school lab assistant role",
        "Look for summer research programs that accept high school students",
        "Learn to read a graph and to say 'I don't know yet' when the data are unclear",
      ],
      college: [
        "Email a professor with a short, specific request to join a lab as a volunteer or assistant",
        "Take statistics along with biology or chemistry",
        "Complete responsible-conduct-of-research training when your campus offers it",
      ],
    },
    sources: [
      {
        label: "BLS: Medical Scientists",
        href: "https://www.bls.gov/ooh/life-physical-and-social-science/medical-scientists.htm",
      },
      {
        label: "NIH: STEM education resources",
        href: "https://www.nih.gov/research-training/k-12-stem-education",
      },
    ],
  },
];

export const careerIds = careers.map((career) => career.id);

export function getCareer(id: string): Career | undefined {
  return careers.find((career) => career.id === id);
}

export const ageBandLabels: Record<AgeBand, string> = {
  elementary: "Elementary",
  middle: "Middle school",
  high: "High school",
  college: "College",
};
