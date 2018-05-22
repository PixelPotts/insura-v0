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
      placeholder: "$50,000",
      category: 'BIO',
      title: "LOAN BALANCE",
      subtitle: null,
      answer: null,
      field: 'mortgage',
      submitByReturn: true
    },
    {
      id: 401,
      text: 'What is your mortgage term?',
      placeholder: "10yr, 15yr, 30yr etc.",
      category: 'BIO',
      title: "LOAN TERM",
      subtitle: null,
      answer: null,
      field: 'mortgage-term',
      submitByReturn: true
    },
    {
      id: 400,
      text: 'What is the current interest rate of your home mortgage?',
      placeholder: "e.g. 4.5%",
      category: 'BIO',
      title: "INTEREST RATE",
      subtitle: null,
      answer: null,
      field: 'mortgage-rate',
      submitByReturn: true
    },
    {
      id: 400,
      text: 'What is your mortgage type?',
      placeholder: "HELOC, Reverse, Refinanced, New Loan",
      category: 'BIO',
      title: "LOAN TYPE",
      subtitle: null,
      answer: null,
      field: 'mortgage-type',
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
      text: 'Medications within the last 7 years?',
      placeholder: "e.g. Metoprolol",
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
      text: 'Currently/Ever prescribed heart or circulatory meds?',
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
      id: 702,
      text: 'Treated/advised for heart/circulatory disorders by a professional?',
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
      text: 'Respiratory disorders (asthma, COPD) and taking Rx meds for? ',
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
      text: 'Mental health issues (eg. anxiety, depression) and taking Rx meds for?',
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
      text: 'Autoimmune, liver disease, or musculoskeletal disorders?',
      placeholder: '',
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
      text: 'Treated or current treatment for diabetes with any complications? ',
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
