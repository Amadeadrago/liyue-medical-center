require('dotenv').config(); 
const mongoose = require('mongoose');
const { Doctor } = require('./models/Schemas');

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://myAtlasDBUser:825230178@myatlasclusteredu.vrpelxa.mongodb.net/liyue_medical?retryWrites=true&w=majority";
const doctorsData = [
    {
        name: "Dr.Baizhu", 
        title: "Senior Consultant", 
        specialty: "Internal Medicine", 
        availableDays: ["Monday", "Wednesday", "Friday"], 
        fee: 4000,
        bio: "A graduate of Liyue Medical Academy, Dr. Baizhu completed his residency in internal medicine and advanced training in chronic disease management. He is known for his patient-centered approach and interest in integrating traditional herbal medicine with modern clinical practice.",
        image: "https://i.pinimg.com/1200x/f7/2e/a9/f72ea9d3d6ca0215b4995d241dfe3221.jpg"
    },
    {
        name: "Dr.Zhongli", 
        title: "Senior Consultant", 
        specialty: "Geriatric Medicine", 
        availableDays: ["Tuesday", "Thursday", "Saturday"], 
        fee: 3000,
        bio:"Dr. Zhongli received his medical degree from Liyue Medical Academy and pursued advanced training in geriatric medicine. With decades of clinical experience, he specializes in age-related conditions, preventive care, and maintaining quality of life among older adults.",
        image: "https://i.pinimg.com/736x/cc/ab/b3/ccabb35ee89951e64f2eb6ab3c2cdb4d.jpg"
    },
    {
        name: "Dr.Xianyun", 
        title: "Consultant Surgeon", 
        specialty: "Orthopedic Surgery", 
        availableDays: ["Tuesday", "Wednesday", "Saturday"], 
        fee: 3500,
        bio:"Dr. Xianyun graduated from Liyue Medical Academy before completing her surgical residency and fellowship in orthopedic surgery. She specializes in musculoskeletal disorders, joint reconstruction, and the treatment of complex bone and joint injuries.",
        image: "https://i.pinimg.com/736x/32/7f/00/327f007d9a9ae540a3762d957c8c7490.jpg"
    },
    {
        name: "Dr.Ganyu", 
        title: " Consultant", 
        specialty: "Endocrinology", 
        availableDays: ["Monday", "Wednesday", "Friday"], 
        fee: 3000,
        bio:"Dr. Ganyu earned her medical degree from Liyue Medical Academy and completed postgraduate training in endocrinology. Her clinical interests include diabetes, thyroid disorders, and hormonal imbalances, with an emphasis on long-term disease management.",
        image: "https://i.pinimg.com/736x/4d/82/6c/4d826cc9ea03b325edcaa2327195f84e.jpg"
    },
    {
        name: "Dr.Kamisato Ayato", 
        title: "Senior Consultant", 
        specialty: "Cardiology", 
        availableDays: ["Tuesday", "Thursday", "Saturday"], 
        fee: 4000,
        bio:"Dr. Ayato graduated from Inazuma Medical University and completed specialist training in cardiology. He focuses on cardiovascular disease prevention, hypertension, and the management of complex heart conditions.",
        image: "https://i.pinimg.com/736x/f2/d6/bd/f2d6bd321d06f8d364337a0a8fcd9204.jpg"
    },
    {
        name: "Dr.Wriothesley", 
        title: " Consultant", 
        specialty: "Pulmonology", 
        availableDays: ["Monday", "Tuesday", "Saturday"], 
        fee: 3000,
        bio:"Dr. Wriothesley earned his medical degree from Fontaine Medical Institute and completed residency training in internal medicine followed by a pulmonology fellowship. He specializes in asthma, chronic respiratory diseases, and pulmonary rehabilitation.",
        image: "https://i.pinimg.com/1200x/4e/4b/5a/4e4b5ad1632cd8bcfe2813d0bb659447.jpg"
    },
    {
        name: "Dr.Shenhe", 
        title: " Consultant Surgeon", 
        specialty: "Trauma Surgery", 
        availableDays: ["Tuesday", "Thursday", "Saturday"], 
        fee: 3500,
        bio:"Dr. Shenhe received her medical degree from Liyue Medical Academy and completed advanced surgical training in trauma care. She specializes in emergency surgical intervention, complex injuries, and the stabilization of critically injured patients.",
        image: "https://i.pinimg.com/736x/81/ee/e6/81eee67651e437c91f60c60feff4d73c.jpg"
    },
    {
        name: "Dr.Kuki Shinobu", 
        title: "Attending Physician", 
        specialty: "Emergency Medicine", 
        availableDays: ["Wednesday", "Thursday", "Saturday"], 
        fee: 5000,
        bio:"Dr. Shinobu graduated from Inazuma Medical University and completed residency training in emergency medicine. She is experienced in acute care, emergency stabilization, and the initial management of patients with urgent medical conditions.",
        image: "https://i.pinimg.com/736x/8a/91/67/8a91677cf1a9d24019abab5c543865e0.jpg"
    },
    {
        name: "Dr.Neuvillete", 
        title: " Senior Consultant", 
        specialty: "Gastroentology", 
        availableDays: ["Monday", "Thursday", "Saturday"], 
        fee: 4000,
        bio:"Dr. Neuvillette earned his medical degree from Fontaine Medical Institute before specializing in gastroenterology. His clinical expertise includes digestive disorders, liver diseases, and the diagnosis and management of complex gastrointestinal conditions.",
        image: "https://i.pinimg.com/736x/8d/7c/11/8d7c110dd1f06daa7babb929d54fea71.jpg"
    },
    {
        name: "Dr.Nahida", 
        title: " Consultant Psychiatrist", 
        specialty: "Psychiatry", 
        availableDays: ["Tuesday", "Wednesday", "Friday"], 
        fee: 3500,
        bio:"Dr. Nahida graduated from Sumeru Akademiya's College of Medicine and completed specialist training in psychiatry. She focuses on mood disorders, anxiety disorders, and psychological well-being, providing evidence-based and compassionate mental health care.",
        image: "https://i.pinimg.com/736x/23/b4/18/23b418a716fc50dcbe13ef28216f8c91.jpg"
    },
    {
        name: "Dr.Sigewinne", 
        title: " Consultant Pediatrician", 
        specialty: "Pediatrics", 
        availableDays: ["Monday", "Wednesday", "Friday"], 
        fee: 3500,
        bio:"Dr. Sigewinne completed her medical education at Fontaine Medical Institute, followed by residency training in pediatrics. She specializes in child development, preventive health, and the diagnosis and treatment of common childhood illnesses.",
        image: "https://i.pinimg.com/736x/84/a9/36/84a93693c0e9f3851670299cc8ab13f5.jpg"
    },
    {
        name: "Dr.Yaoyao", 
        title: " General Practitioner", 
        specialty: "Family Medicine", 
        availableDays: ["Tuesday", "Thursday", "Saturday"], 
        fee: 2500,
        bio:"Dr. Yaoyao graduated from Liyue Medical Academy and completed postgraduate training in family medicine. She provides primary care for patients of all ages, with a focus on preventive medicine, routine health assessments, and family wellness.",
        image: "https://i.pinimg.com/736x/10/1c/9c/101c9c97dfbc529518b2d9503d4961a6.jpg"
    },
    {
        name: "Dr.Sucrose", 
        title: " Consultant", 
        specialty: "Clinical Pharmacology", 
        availableDays: ["Monday", "Thursday", "Friday"], 
        fee: 3000,
        bio:"Dr. Sucrose graduated from Mondstadt Medical University and pursued postgraduate training in clinical pharmacology. She specializes in medication safety, drug interactions, and optimizing treatment plans through evidence-based pharmacological practice.",
        image: "https://i.pinimg.com/736x/57/30/27/573027336aa56b378fb3f8d5b2f0a24e.jpg"
    },
    {
        name: "Dr.Cyno", 
        title: " Consultant", 
        specialty: "Forensic Medicine", 
        availableDays: ["Tuesday", "Thursday", "Saturday"], 
        fee: 3000,
        bio:"Dr. Cyno received his medical degree from Sumeru Akademiya's College of Medicine and completed advanced training in forensic medicine. His work involves medicolegal examinations, clinical forensic assessments, and the scientific evaluation of medical evidence.",
        image: "https://i.pinimg.com/736x/21/77/e0/2177e07bf9cbb0153c7ed78e10842461.jpg"
    },
    {
        name: "Dr.Mika", 
        title: " Rehabilitation Physician", 
        specialty: "Physical Medicine and Rehabilitation", 
        availableDays: ["Tuesday", "Thursday", "Friday"], 
        fee: 3500,
        bio:"Dr. Mika graduated from Mondstadt Medical University and completed residency training in physical medicine and rehabilitation. He focuses on restoring mobility, improving physical function, and supporting recovery following injuries, surgery, or illness.",
        image: "https://i.pinimg.com/736x/86/f4/d8/86f4d8e5a1d7e643fa54457d8bcace02.jpg"
    },
    {
        name: "Dr.Dehya", 
        title: " Consultant", 
        specialty: "Sports Medicine", 
        availableDays: ["Wednesday", "Thursday", "Saturday"], 
        fee: 3000,
        bio:"Dr. Dehya earned her medical degree from Sumeru Akademiya's College of Medicine and pursued specialized training in sports medicine. She works with active individuals and athletes to prevent injuries, manage musculoskeletal conditions, and support safe returns to physical activity.",
        image: "https://i.pinimg.com/736x/bb/b6/32/bbb632eb033845eed0f666d7a89428b5.jpg"
    },
    {
        name: "Dr.Shikanoin Heizou", 
        title: "Attending Physician", 
        specialty: "Neurology", 
        availableDays: ["Monday", "Wednesday", "Saturday"], 
        fee: 5000,
        bio:"Dr. Heizou graduated from Inazuma Medical University and completed specialist training in neurology. He has a particular interest in headache disorders, nerve conditions, and the diagnostic assessment of complex neurological symptoms.",
        image: "https://i.pinimg.com/736x/71/b2/59/71b259dd50c36433b5359cf6ee1fe79f.jpg"
    },
    {
        name: "Dr.Jean", 
        title: " Senior General Practitioner", 
        specialty: "General Practice", 
        availableDays: ["Monday", "Wednesday", "Friday"], 
        fee: 4500,
        bio:"Dr. Jean earned her medical degree from Mondstadt Medical University and completed advanced training in general practice. She provides comprehensive primary care, preventive screenings, and ongoing management of common acute and chronic conditions.",
        image: "https://i.pinimg.com/736x/09/54/16/095416d9c254b2a7fc66a650dc68182b.jpg"
    },
    {
        name: "Dr.Kamisato Ayaka", 
        title: " Consultant", 
        specialty: "Obsterics and Gynceology", 
        availableDays: ["Tuesday", "Thursday", "Saturday"], 
        fee: 3000,
        bio:"Dr. Ayaka graduated from Inazuma Medical University and completed postgraduate specialist training in obstetrics and gynecology. She provides reproductive health consultations, routine gynecological care, and pregnancy-related medical services.",
        image: ""
    },
    {
        name: "Dr.Yelan", 
        title: " Consultant Radiologist", 
        specialty: "Radiology", 
        availableDays: ["Wednesday", "Thursday", "Saturday"], 
        fee: 3500,
        bio:"Dr. Yelan earned her medical degree from Liyue Medical Academy and completed specialist training in diagnostic radiology. She specializes in interpreting medical imaging, including X-rays, CT scans, and MRI studies, to support accurate diagnosis and treatment planning.",
        image: "https://i.pinimg.com/736x/8d/f8/99/8df8994f0cc10dc8501aa78b7959588b.jpg"
    },
    {
        name: "Dr.Gorou", 
        title: " Consultant", 
        specialty: "", 
        availableDays: ["Monday", "Wednesday", "Saturday"], 
        fee: 3000,
        bio:"Dr. Gorou graduated from Inazuma Medical University and completed advanced training in rheumatology. His clinical interests include arthritis, autoimmune conditions, and inflammatory diseases affecting the joints, muscles, and connective tissues.",
        image: "https://i.pinimg.com/1200x/40/15/ec/4015ec3443928055fae531070ad2e1dd.jpg"
    },
    {
        name: "Dr.Thoma", 
        title: " Consultant Anesthesiologist", 
        specialty: "Anesthesiology", 
        availableDays: ["Tuesday", "Thursday", "Saturday"], 
        fee: 3500,
        bio:"Dr. Thoma received his medical degree from Inazuma Medical University and completed residency training in anesthesiology. He specializes in perioperative care, anesthesia administration, pain management, and patient monitoring during surgical procedures.",
        image: "https://i.pinimg.com/736x/02/f5/24/02f524fb31bb6dcf91fd37732ebbfbda.jpg"
    },
    {
        name: "Dr.Diona", 
        title: " Attending Physician", 
        specialty: "Allergy and Immunology", 
        availableDays: ["Wednesday", "Thursday", "Friday"], 
        fee: 5000,
        bio:"Dr. Diona graduated from Mondstadt Medical University and completed postgraduate training in allergy and clinical immunology. She evaluates and manages allergic reactions, asthma-related allergies, and disorders involving the immune system.",
        image: "https://i.pinimg.com/736x/ea/06/5d/ea065dc63f7cc8e8c92157dfee7b5b51.jpg"
    },
    {
        name: "Dr.Kaveh", 
        title: " Consultant Surgeon", 
        specialty: "Plastic and Reconstructive Surgery", 
        availableDays: ["Monday", "Tuesday", "Thursday"], 
        fee: 3500,
        bio:"Dr. Kaveh earned his medical degree from Sumeru Akademiya's College of Medicine before completing surgical residency and fellowship training in plastic and reconstructive surgery. He focuses on reconstructive procedures, wound repair, and restoring function following injury or surgery.",
        image: "https://i.pinimg.com/736x/9b/fa/06/9bfa06dc2e4c5b37c749042b86f90351.jpg"
    },
    {
        name: "Dr.Kujou Sara", 
        title: " Consultant Surgeon", 
        specialty: "Vascular Surgery", 
        availableDays: ["Tuesday", "Thursday", "Saturday"], 
        fee: 3500,
        bio:"Dr. Sara graduated from Inazuma Medical University and completed advanced surgical training in vascular surgery. She specializes in conditions affecting blood vessels, including peripheral arterial disease, vascular injuries, and disorders of circulation.",
        image: "https://i.pinimg.com/736x/7b/8d/ac/7b8dacb1e1a65753a324f48f1f3540b5.jpg"
    },
    {
        name: "Dr.Xingqiu", 
        title: " Attending Physician", 
        specialty: "Nephrology", 
        availableDays: ["Wednesday", "Thursday", "Saturday"], 
        fee: 5000,
        bio:"Dr. Xingqiu earned his medical degree from Liyue Medical Academy and completed specialist training in nephrology. His clinical interests include chronic kidney disease, electrolyte imbalances, hypertension-related kidney complications, and the preservation of kidney function.",
        image: "https://i.pinimg.com/736x/88/ac/f6/88acf6f37429f1c1759baf7b3bf3493e.jpg"
    },
    {
        name: "Dr.Rosaria", 
        title: " Consultant", 
        specialty: "Infectious Disease", 
        availableDays: ["Tuesday", "Friday", "Saturday"], 
        fee: 3000,
        bio:"Dr. Rosaria graduated from Mondstadt Medical University and completed advanced training in infectious diseases. She specializes in diagnosing and managing complex infections, antimicrobial treatment, and infection prevention in clinical settings.",
        image: "https://i.pinimg.com/736x/58/10/42/581042646658b6f10a3aed0ec0160df7.jpg"
    },
    {
        name: "Dr.Yae Miko", 
        title: " Senior Consultant", 
        specialty: "Ophtalmology ", 
        availableDays: ["Monday", "Tuesday", "Friday"], 
        fee: 4000,
        bio:"Dr. Yae Miko earned her medical degree from Inazuma Medical University and completed specialist training in ophthalmology. With extensive clinical experience, she focuses on eye health, vision disorders, and the diagnosis and treatment of ocular diseases.",
        image: "https://i.pinimg.com/1200x/f7/2e/a9/f72ea9d3d6ca0215b4995d241dfe3221.jpg"
    },
{
        name: "Dr.Yae Miko", 
        title: " Senior Consultant", 
        specialty: "Ophtalmology ", 
        availableDays: ["Monday", "Tuesday", "Friday"], 
        fee: 4000,
        bio:"Dr. Yae Miko earned her medical degree from Inazuma Medical University and completed specialist training in ophthalmology. With extensive clinical experience, she focuses on eye health, vision disorders, and the diagnosis and treatment of ocular diseases.",
        image: "https://i.pinimg.com/736x/2b/04/d8/2b04d8d21b21a8b0dde78de9503854da.jpg"
    },
    {
        
        name: "Dr.Barbara", 
        title: " Consultant", 
        specialty: "Dermatology ", 
        availableDays: ["Monday", "Tuesday", "Friday"], 
        fee: 3000,
        bio:"Dr. Barbara earned her medical degree from Mondstadt Medical University and completed specialist training in dermatology. Her clinical interests include acne, eczema, skin allergies, and other conditions affecting skin health.",
        image: "https://i.pinimg.com/736x/98/8f/f7/988ff70214381b215fffe720cc3fa549.jpg"
    },
    {
        name: "Dr.Tighnari", 
        title: " Toxicology", 
        specialty: "Ophtalmology ", 
        availableDays: ["Monday", "Tuesday", "Friday"], 
        fee: 3000,
        bio:"Dr. Tighnari graduated from Sumeru Akademiya's College of Medicine and pursued advanced training in clinical toxicology. His work focuses on poisoning, adverse drug reactions, and the effects of environmental substances on human health.",
        image: "https://i.pinimg.com/736x/d3/e8/77/d3e877f30f16133a0564b6db64298fb4.jpg"
    }
];

mongoose.connect(process.env.MONGO_URI)
.then(async () => {
    console.log('🌱 Connecting to MongoDB Atlas...');
    await Doctor.deleteMany(); // Hapus data lama agar tidak dobel
    await Doctor.insertMany(doctorsData);
    console.log('SUCCESS! 30 Data Doctors have been uploaded to MongoDB Atlas Cloud!');
    process.exit();
})
.catch((err) => {
    console.error('Error Seeding Doctors:', err);
    process.exit(1);
});