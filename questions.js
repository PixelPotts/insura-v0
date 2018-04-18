export default {
  questions: [
    {
      id: 100,
      text: 'What is your name?',
      placeholder: "First (Middle) Last",
      category: 'BIO',
      title: "NAME",
      subtitle: null,
      answer: null,
      field: 'name',
      submitByReturn: true
    },
    {
      id: 200,
      text: 'What is your Date of Birth?',
      placeholder: "MM/DD/YY",
      category: 'BIO',
      title: "DOB",
      subtitle: null,
      answer: null,
      field: 'dob',
      submitByReturn: true
    },
    {
      id: 300,
      text: 'What is your height?',
      placeholder: "0-00 (feet-inches)",
      category: 'BIO',
      title: "HEIGHT",
      subtitle: null,
      answer: null,
      field: 'height',
      submitByReturn: true
    },
    {
      id: 400,
      text: 'What is your weight?',
      placeholder: "000",
      category: 'BIO',
      title: "WEIGHT",
      subtitle: null,
      answer: null,
      field: 'weight',
      submitByReturn: true
    },
    {
      id: 400,
      text: 'What is the balance of your home mortgage?',
      placeholder: "000",
      category: 'BIO',
      title: "MORTGAGE",
      subtitle: null,
      answer: null,
      field: 'mortgage',
      submitByReturn: true
    },
    {
      id: 500,
      text: 'What medications are you currently on?',
      placeholder: "e.g. Omeprazole",
      category: 'MED',
      title: null,
      subtitle: null,
      answer: null,
      suggest: true,
      field: 'medication',
      submitByReturn: false
    },
    {
      id: 600,
      text: 'What medications were you previously on within the last 7 years?',
      placeholder: "e.g. Omeprazole",
      category: 'MED_OLD',
      title: null,
      subtitle: null,
      answer: null,
      suggest: true,
      field: 'prev_medication',
      submitByReturn: false
    },
    {
      id: 601,
      text: 'Are you currently or have you ever taken prescribed medications for any heart or circulatory disorder?',
      placeholder: "e.g. Warfarin",
      category: 'MED_OLD',
      title: null,
      subtitle: null,
      answer: null,
      suggest: true,
      field: 'prev_medication',
      submitByReturn: false
    },
    {
      id: 700,
      text: 'What medical conditions do you currently have?',
      placeholder: 'e.g. Type 2 Diabetes',
      category: 'CON',
      title: null,
      subtitle: null,
      answer: null,
      suggest: true,
      field: 'condition',
      submitByReturn: false
    },
    {
      id: 701,
      text: 'What medical conditions do you currently have?',
      placeholder: 'e.g. Type 2 Diabetes',
      category: 'CON',
      title: null,
      subtitle: null,
      answer: null,
      suggest: true,
      field: 'condition',
      submitByReturn: false
    },
    {
      id: 702,
      text: 'Have you ever been diagnosed, treated or advised by a professional for any heart or circulatory disorders?',
      placeholder: 'e.g. Coronary artery disease, heart attack or stroke, circulatory disorders',
      category: 'CON',
      title: null,
      subtitle: null,
      answer: null,
      suggest: true,
      field: 'condition',
      submitByReturn: false
    },
    {
      id: 703,
      text: 'Any respiratory disorders like asthma or COPD that you are taking prescribed meds for? ',
      placeholder: 'e.g. Albuterol',
      category: 'CON',
      title: null,
      subtitle: null,
      answer: null,
      suggest: true,
      field: 'condition',
      submitByReturn: false
    },
    {
      id: 704,
      text: 'Any mental health issues such as anxiety or depression etc your taking or were taking meds for?',
      placeholder: 'e.g. Prozac, Zoloft', // Ya Xanax + weed, bitch !
      category: 'CON',
      title: null,
      subtitle: null,
      answer: null,
      suggest: true,
      field: 'condition',
      submitByReturn: false
    },
   {
      id: 705,
      text: 'Any autoimmune disorders/liver disease/or musculoskeletal disorders?',
      placeholder: 'e.g. Prozac, Zoloft',
      category: 'CON',
      title: null,
      subtitle: null,
      answer: null,
      suggest: true,
      field: 'condition',
      submitByReturn: false
    },
   {
      id: 706,
      text: 'Have you been treated or currently undergoing treatment for diabetes with any complications? ',
      placeholder: 'e.g. Retinopathy, Nephropathy, Neuropathy',
      category: 'CON',
      title: null,
      subtitle: null,
      answer: null,
      suggest: true,
      field: 'condition',
      submitByReturn: false
    },
  ]
}
