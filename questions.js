export default {
  questions: [
    // {
    //   id: 90,
    //   text: 'What is your email?*',
    //   placeholder: "john@example.com",
    //   category: 'BIO',
    //   title: "EMAIL",
    //   subtitle: null,
    //   answer: null,
    //   field: 'email',
    //   fieldType: 'email',
    //   submitByReturn: true
    // },
    // {
    //   id: 100,
    //   text: 'What is your name?*',
    //   placeholder: "First (Middle) Last",
    //   category: 'BIO',
    //   title: "NAME",
    //   subtitle: null,
    //   answer: null,
    //   field: 'name',
    //   fieldType: 'full-name',
    //   submitByReturn: true
    // },
    {
      id: 101,
      text: 'What is your gender?*',
      placeholder: "",
      category: 'BIO',
      title: "GENDER",
      subtitle: null,
      answer: null,
      field: 'gender',
      fieldType: 'buttons',
      submitByReturn: false,
      answerOptions: [
        {"id": 1,"value": "Male","name": "Male"},
        {"id": 2,"value": "Female","name": "Female"} ]
    },
    // {
    //   id: 200,
    //   text: 'What is your Date of Birth?*',
    //   placeholder: "MM/DD/YY",
    //   category: 'BIO',
    //   title: "DOB",
    //   subtitle: null,
    //   answer: null,
    //   field: 'dob',
    //   fieldType: 'dob',
    //   submitByReturn: true
    // },
    // {
    //   id: 300,
    //   text: 'What is your height?',
    //   placeholder: "0-00 (feet-inches)",
    //   category: 'BIO',
    //   title: "HEIGHT",
    //   subtitle: null,
    //   answer: null,
    //   field: 'height',
    //   fieldType: 'buttons',
    //   submitByReturn: false,
    //   answerOptions: [{"id":27,"value":50,"name":"4'2''"},{"id":28,"value":51,"name":"4'3''"},{"id":29,"value":52,"name":"4'4''"},{"id":30,"value":53,"name":"4'5''"},{"id":31,"value":54,"name":"4'6''"},{"id":32,"value":55,"name":"4'7''"},{"id":33,"value":56,"name":"4'8''"},{"id":34,"value":57,"name":"4'9''"},{"id":35,"value":58,"name":"4'10''"},{"id":36,"value":59,"name":"4'11''"},{"id":37,"value":60,"name":"5'0''"},{"id":38,"value":61,"name":"5'1''"},{"id":39,"value":62,"name":"5'2''"},{"id":40,"value":63,"name":"5'3''"},{"id":41,"value":64,"name":"5'4''"},{"id":42,"value":65,"name":"5'5''"},{"id":43,"value":66,"name":"5'6''"},{"id":44,"value":67,"name":"5'7''"},{"id":45,"value":68,"name":"5'8''"},{"id":46,"value":69,"name":"5'9''"},{"id":47,"value":70,"name":"5'10''"},{"id":48,"value":71,"name":"5'11''"},{"id":49,"value":72,"name":"6'0''"},{"id":50,"value":73,"name":"6'1''"},{"id":51,"value":74,"name":"6'2''"},{"id":52,"value":75,"name":"6'3''"},{"id":53,"value":76,"name":"6'4''"},{"id":54,"value":77,"name":"6'5''"},{"id":55,"value":78,"name":"6'6''"},{"id":56,"value":79,"name":"6'7''"},{"id":57,"value":80,"name":"6'8''"},{"id":58,"value":81,"name":"6'9''"},{"id":59,"value":82,"name":"6'10''"},{"id":60,"value":83,"name":"6'11''"},{"id":61,"value":84,"name":"7'0''"},{"id":62,"value":85,"name":"7'1''"},{"id":63,"value":86,"name":"7'2''"},{"id":64,"value":87,"name":"7'3''"},{"id":65,"value":88,"name":"7'4''"},{"id":66,"value":89,"name":"7'5''"},{"id":67,"value":90,"name":"7'6''"},{"id":68,"value":91,"name":"7'7''"},{"id":69,"value":92,"name":"7'8''"},{"id":70,"value":93,"name":"7'9''"},{"id":71,"value":94,"name":"7'10''"},{"id":72,"value":95,"name":"7'11''"}]
    // },
    // {
    //   id: 400,
    //   text: 'What is your weight?',
    //   placeholder: "000",
    //   category: 'BIO',
    //   title: "WEIGHT",
    //   subtitle: null,
    //   answer: null,
    //   field: 'weight',
    //   fieldType: 'buttons',
    //   submitByReturn: false,
    //   answerOptions: [{"id":1,"value":65,"name":65},{"id":2,"value":70,"name":70},{"id":3,"value":75,"name":75},{"id":4,"value":80,"name":80},{"id":5,"value":85,"name":85},{"id":6,"value":90,"name":90},{"id":7,"value":95,"name":95},{"id":8,"value":100,"name":100},{"id":9,"value":105,"name":105},{"id":10,"value":110,"name":110},{"id":11,"value":115,"name":115},{"id":12,"value":120,"name":120},{"id":13,"value":125,"name":125},{"id":14,"value":130,"name":130},{"id":15,"value":135,"name":135},{"id":16,"value":140,"name":140},{"id":17,"value":145,"name":145},{"id":18,"value":150,"name":150},{"id":19,"value":155,"name":155},{"id":20,"value":160,"name":160},{"id":21,"value":165,"name":165},{"id":22,"value":170,"name":170},{"id":23,"value":175,"name":175},{"id":24,"value":180,"name":180},{"id":25,"value":185,"name":185},{"id":26,"value":190,"name":190},{"id":27,"value":195,"name":195},{"id":28,"value":200,"name":200},{"id":29,"value":205,"name":205},{"id":30,"value":210,"name":210},{"id":31,"value":215,"name":215},{"id":32,"value":220,"name":220},{"id":33,"value":225,"name":225},{"id":34,"value":230,"name":230},{"id":35,"value":235,"name":235},{"id":36,"value":240,"name":240},{"id":37,"value":245,"name":245},{"id":38,"value":250,"name":250},{"id":39,"value":255,"name":255},{"id":40,"value":260,"name":260},{"id":41,"value":265,"name":265},{"id":42,"value":270,"name":270},{"id":43,"value":275,"name":275},{"id":44,"value":280,"name":280},{"id":45,"value":285,"name":285},{"id":46,"value":290,"name":290},{"id":47,"value":295,"name":295},{"id":48,"value":300,"name":300},{"id":49,"value":305,"name":305},{"id":50,"value":310,"name":310},{"id":51,"value":315,"name":315},{"id":52,"value":320,"name":320},{"id":53,"value":325,"name":325},{"id":54,"value":330,"name":330},{"id":55,"value":335,"name":335},{"id":56,"value":340,"name":340},{"id":57,"value":345,"name":345},{"id":58,"value":350,"name":350},{"id":59,"value":355,"name":355},{"id":60,"value":360,"name":360},{"id":61,"value":365,"name":365},{"id":62,"value":370,"name":370},{"id":63,"value":375,"name":375},{"id":64,"value":380,"name":380},{"id":65,"value":385,"name":385},{"id":66,"value":390,"name":390},{"id":67,"value":395,"name":395},{"id":68,"value":400,"name":400}]
    // },
    // {
    //   id: 400,
    //   text: 'What is the balance of your home mortgage?',
    //   placeholder: "$50,000",
    //   category: 'BIO',
    //   title: "LOAN BALANCE",
    //   subtitle: null,
    //   answer: null,
    //   field: 'mortgage',
    //   fieldType: 'int',
    //   submitByReturn: true
    // },
    // {
    //   id: 401,
    //   text: 'What is your mortgage term?',
    //   placeholder: "10yr, 15yr, 30yr etc.",
    //   category: 'BIO',
    //   title: "LOAN TERM",
    //   subtitle: null,
    //   answer: null,
    //   field: 'mortgage-term',
    //   fieldType: 'buttons',
    //   submitByReturn: false,
    //   answerOptions: [ {"id": 1,"value": 5,"name": "5 Yr"},{"id": 2,"value": 10,"name": "10 Yr"},{"id": 3,"value": 15,"name": "15 Yr"},{"id": 4,"value": 20,"name": "20 Yr"},{"id": 5,"value": 25,"name": "25 Yr"},{"id": 6,"value": 30,"name": "30 Yr"},{"id": 7,"value": 35,"name": "35 Yr"},{"id": 8,"value": 40,"name": "40 Yr"}]
    // },
    // {
    //   id: 400,
    //   text: 'What is the current interest rate of your home mortgage?',
    //   placeholder: "e.g. 4.5%",
    //   category: 'BIO',
    //   title: "INTEREST RATE",
    //   subtitle: null,
    //   answer: null,
    //   field: 'mortgage-rate',
    //   fieldType: 'float',
    //   submitByReturn: true
    // },
    // {
    //   id: 400,
    //   text: 'What is your mortgage type?',
    //   placeholder: "HELOC, Reverse, Refinanced, New Loan",
    //   category: 'BIO',
    //   title: "LOAN TYPE",
    //   subtitle: null,
    //   answer: null,
    //   field: 'mortgage-type',
    //   fieldType: 'buttons',
    //   submitByReturn: false,
    //   answerOptions: [
    //     {id: 1, value: 'HELOC',   name: "HELOC"},
    //     {id: 2, value: 'REVERSE', name: "Reverse"},
    //     {id: 3, value: 'REFI',    name: "Refinanced"},
    //     {id: 4, value: 'NEW',     name: "New Loan"},
    //   ]
    // },
    // {
    //   id: 402,
    //   text: 'What type of tobacco products do you use?',
    //   placeholder: "",
    //   category: 'BIO',
    //   title: "TOBACCO TYPE",
    //   subtitle: null,
    //   answer: null,
    //   field: 'tobacco-use-type',
    //   fieldType: 'buttons',
    //   submitByReturn: false,
    //   answerOptions: [
    //     {id: 1, value: 'None',   name: "None"},
    //     {id: 2, value: 'Chewing',   name: "Chewing"},
    //     {id: 3, value: 'Cigarettes', name: "Cigarettes"},
    //     {id: 4, value: 'Occasional', name: "Occasional (Any)"},
    //   ]
    // },

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
      fieldType: 'options',
      submitByReturn: false,
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
      fieldType: 'options',
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
      fieldType: 'options',
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
      fieldType: 'options',
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
      fieldType: 'options',
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
      fieldType: 'options',
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
      fieldType: 'options',
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
      fieldType: 'options',
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
      fieldType: 'options',
      submitByReturn: false
    },
    // {
    //   id: 400,
    //   text: 'Two or more occurences of any kind of cancer or reoccurence of a prev. cancer?',
    //   placeholder: "",
    //   category: 'CON',
    //   title: "RECURRENT CANCER",
    //   subtitle: null,
    //   answer: null,
    //   field: 'recurrent-cancer',
    //   submitByReturn: false,
    //   answerOptions: [
    //     {id: 1, value: '0',   name: "NO"},
    //     {id: 2, value: '1', name: "YES"}
    //   ],
    //   underwriting: {
    //     guaranteed: 1
    //   }
    // },
  ]
}
