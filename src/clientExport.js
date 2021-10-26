export const clientExport = [
  {
    name: "projectAddress",
    type: "string",
    question: "What is the project address?",
    index: 0,
  },
  {
    name: "houseOccupancy",
    type: "int",
    question: "How many occupants are there in the house?",
    index: 1,
  },
  {
    name: "projectCompletionDate",
    type: "date",
    question: "When was the project completed?",
    index: 2,
  },
  {
    name: "projectLength",
    type: "multichoice",
    options: [
      "0 - 12 Months",
      "13 - 24 Months",
      "25 - 36 Months",
      "37+ Months",
    ],
    question: "How long did the project take?",
    index: 3,
  },
  {
    name: "projectCost",
    type: "float",
    question: "What was the cost of the project?",
    index: 4,
  },
  {
    name: "esdFeedback",
    type: "multichoice",
    options: ["Yes", "No", "Maybe"],
    question:
      "Do you think additional investment in Environmentally Sustainable Design (ESD) represents good value?",
    index: 5,
  },
  {
    name: "esdFeedbackExt",
    type: "string",
    question:
      "In a few words, please explain your response to the question above (ESD)",
    index: 6,
  },
  {
    name: "billsExpectations",
    type: "agreespread",
    question:
      "Are your electricity/gas/water bills in line with your expectations?",
    index: 7,
  },
  {
    name: "constructionExpecations",
    type: "agreespread",
    question: "Did the building construction process proceed as expected?",
    index: 8,
  },
  {
    name: "contractType",
    type: "multichoice",
    options: ["ABIC MW", "ABIC SW", "HIA", "Master Builders", "Owner Builder"],
    question: "What type of building contract did you use?",
    index: 9,
  },
  {
    name: "architectAdministeredContract",
    type: "bool",
    question: "Was the building contract administered by the architect?",
    index: 10,
  },
  {
    name: "contractExpectations",
    type: "agreespread",
    question: "Did the building contract work as intended?",
    index: 11,
  },
  {
    name: "contractExpectationsExt",
    type: "string",
    question: "What were the issues with the building contract, if any?",
    index: 12,
  },
  {
    name: "projectCoolingType",
    type: "multichoice-array",
    options: [
      "Reverse cycle air conditioner(s)",
      "Ducted cooling",
      "Evaporative cooling",
      "Ceiling fans",
      "No active cooling",
    ],
    question: "What type of cooling does the building use?",
    index: 13,
  },
  {
    name: "projectHeatingType",
    type: "multichoice-array",
    options: [
      "Reverse Cycle Split System Air Conditioner(s)",
      "Air Sourced Heat Pump Hydronic Heating",
      "Gas Hydronic Heating",
      "Wood Fired Hydronic Heating",
      "Flued Gas Heater",
      "Unflued Gas Heater",
      "Wood Burner",
      "Electric Panels",
      "None",
    ],
    question: "What type of heating system does the building use?",
    index: 14,
  },
  {
    name: "projectHotWaterType",
    type: "multichoice",
    options: [
      "Heat Pump",
      "Solar Hot Water Heater with Gas Boost",
      "Solar Hot Water Heater with Electric Boost",
      "Gas Instantaneous",
      "Electric Instantaneous",
      "Water Tank - Electric",
      "Water Tank - Gas",
      "Wood Fire Wet Back",
    ],
    question: "What type of hot water heating system was used?",
    index: 15,
  },
  {
    name: "hasMainsWater",
    type: "bool",
    question: "Is the house connected to mains reticulated water?",
    index: 16,
  },
  {
    name: "waterTankCapacity",
    type: "int",
    question:
      "If a water tank was installed, what was the total rainwater collection capacity?",
    index: 17,
  },
  {
    name: "hasCfaTank",
    type: "bool",
    question:
      "If a water tank was installed and you are in a bush prone area, did you also require a CFA dedicated 10,000 litre tank?",
    index: 18,
  },
  {
    name: "cfaCapacityIncluded",
    type: "bool",
    question: "If yes, is this included in the total capacity noted above?",
    index: 19,
  },
  {
    name: "hasPowerGridConnection",
    type: "bool",
    question: "Is the house connected to the power grid?",
    index: 20,
  },
  {
    name: "pvSystemCapacity",
    type: "int",
    question:
      "If a Photovoltaic (PV) system was installed, what was the capacity?",
    index: 21,
  },
  {
    name: "projectSatisfaction",
    type: "multichoice-array",
    options: [
      "Very dissatisfied",
      "Dissatisfied",
      "Neutral",
      "Satisfied",
      "Very satisfied",
    ],
    components: [
      "Cooling System",
      "Heating System",
      "Indoor Air Quality",
      "Lighting Layout and Level of Lighting",
      "Kitchen Layout and Level of Storage",
      "Number of Power Points",
      "Fixtures and Fittings",
      "Hot Water System",
    ],
    question:
      "How satisfied are you with the following components of the project?",
    index: 22,
  },
  {
    name: "regArchitectExperience",
    type: "satisfyspread",
    question:
      "How would you rate the experience of using a registered architect?",
    index: 23,
  },
  {
    name: "designBriefAchieved",
    type: "agreespread",
    question: "Was your initial design brief achieved?",
    index: 24,
  },
  {
    name: "wouldRecommend",
    type: "multichoice",
    options: ["Yes", "No", "Maybe"],
    question:
      "Would you recommend to others that they use a registered architect for their building project?",
    index: 25,
  },
  {
    name: "wouldRecommendExt",
    type: "string",
    question:
      "In a few words, please explain your response to the question above (registered architect)",
    index: 26,
  },
  {
    name: "regArchitectValue",
    type: "multichoice",
    options: ["Yes", "No", "Maybe"],
    question:
      "Given the outcome of the building, do you think using an architect represents value for money?",
    index: 27,
  },
  {
    name: "regArchitectValueExt",
    type: "string",
    question:
      "In a few words, please explain your response to the question above (value for money)",
    index: 28,
  },
  {
    name: "projectBudgetMet",
    type: "bool",
    question: "Was the project budget met?",
    index: 29,
  },
  {
    name: "archsContactedAmnt",
    type: "multichoice",
    options: ["0", "1", "2-5", "5+"],
    question:
      "How many architects did you contact before engaging with the selected architect?",
    index: 30,
  },
  {
    name: "discoveryMethod",
    type: "multichoice",
    options: [
      "Word of Mouth (Referral)",
      "Social Media",
      "Google Search",
      "Site Sign",
      "Print Media",
      "Network",
      "Unsure",
    ],
    question: "How did you discover your selected architect?",
    index: 31,
  },
  {
    name: "commentsExt",
    type: "string",
    question:
      "Before submitting the data, if you have any other additional comments about your architect you want to provide, please do so here",
    index: 32,
  },
];
