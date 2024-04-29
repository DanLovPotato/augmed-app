import { TreeNode } from "./index";

export const caseExample = [
  {
    key: "BACKGROUND",
    values: [
      {
        key: "Patient Demographics",
        values: [
          {
            key: "Age",
            values: "63",
          },
          {
            key: "Gender",
            values: "Female",
          },
          {
            key: "Occupation",
            values: "Retired Civil Servant",
          },
        ],
        style: {
          collapse: true,
        },
      },
      {
        key: "Medical History",
        values: [
          {
            key: "Carcinoma of the breast",
            values: ["8 years prior", "left mastectomy", "radiotherapy"],
            style: {
              highlight: true,
            },
          },
        ],
      },
      {
        key: "Family History",
        values: null,
        style: {
          highlight: true,
        },
      },
      {
        key: "Social History",
        values: [
          {
            key: "Nonsmoker",
            values: null,
            style: {
              highlight: true,
            },
          },
          {
            key: "Alcohol",
            values: ["10 units per week"],
          },
        ],
      },
    ],
  },
  {
    key: "PATIENT COMPLAINT",
    values: [
      {
        key: "Chief Complaint",
        values: [
          {
            key: "Polyuria",
            values: ["5x per night", "Accomp: Extreme thirst"],
          },
        ],
      },
      {
        key: "Current Symptoms",
        values: [
          {
            key: "Unwell feeling",
            values: ["Duration: 3 month"],
          },
          {
            key: "Frontal headache",
            values: ["Assoc w/ early morning nausea", "Worsened by coughing or lying down"],
          },
          {
            key: "Back pain",
            values: ["Duration: 3 months"],
          },
          {
            key: "Weight loss",
            values: ["3kg", "Duration: 3 months"],
          },
        ],
      },
      {
        key: "HPI",
        values: null,
      },
    ],
  },
  {
    key: "PHYSICAL EXAMINATION",
    values: [
      {
        key: "Physical Characteristics",
        values: ["thin", "wasted muscles"],
      },
      {
        key: "Vital Signs",
        values: [
          {
            key: "Pulse rate",
            values: "72/min",
            style: {
              highlight: true,
            },
          },
          {
            key: "BP",
            values: "120/84 mmHg",
          },
        ],
      },
      {
        key: "Cardiovascular",
        values: ["JVP: normal", "Heart auscultation: normal", "peripheral edema: no"],
      },
      {
        key: "Ophthalmology",
        values: [
          {
            key: "Ocular Fundus",
            values: ["Papilloedema"],
          },
        ],
      },
      {
        key: "Respiratory",
        values: "Normal",
      },
      {
        key: "Abdominal",
        values: null,
      },
      {
        key: "Neurological",
        values: null,
      },
      {
        key: "Labs & Diagnostics",
        values: null,
      },
    ],
  },
] as TreeNode[];
