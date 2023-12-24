import { UnitGroup, UnitGroupsDict } from "../../common/types";

export const unitGroups: UnitGroup[] = [
  {
    details: {
      code: "HEYM",
      name: "Heysham",
      coords: {
        lat: 54.0295,
        lng: -2.9149,
      },
      fuelType: "nuclear",
    },
    units: [
      {
        bmUnit: "T_HEYM28",
      },
      {
        bmUnit: "T_HEYM12",
      },
      {
        bmUnit: "T_HEYM27",
      },
      {
        bmUnit: "T_HEYM11",
      },
    ],
  },

  {
    details: {
      code: 'TORN',
      name: "Torness",
      coords: {
        lat: 55.96929194350165, 
        lng: -2.4061520827496983
      },
      fuelType: "nuclear",
    },
    units: [
      {
        bmUnit: "T_TORN-1",
      },
      {
        bmUnit: "T_TORN-2",
      },
    ],
  },

  {
    details: {
      code: 'SIZB',
      name: "Sizewell B",
      coords: {
        lat: 52.2123,
        lng: 1.6195,
      },
      fuelType: "nuclear",
    },
    units: [
      {
        bmUnit: "T_SIZB-1",
      },
      {
        bmUnit: "T_SIZB-2",
      },
    ],
  },

  {
    details: {
      code: 'HRTL',
      name: "Hartlepool",
      coords: {
        lat: 54.6341,
        lng: -1.1801,
      },
      fuelType: "nuclear",
    },
    units: [
      {
        bmUnit: "T_HRTL-1",
      },
      {
        bmUnit: "T_HRTL-2",
      },
    ],
  },

  {
    details: {
      code: 'PEMB',
      name: "Pembroke",
      coords: {
        lat: 51.68436,
        lng: -4.9968,
      },
      fuelType: "gas",
    },
    units: [
      {
        bmUnit: "T_PEMB-11",
      },
      {
        bmUnit: "T_PEMB-21",
      },
      {
        bmUnit: "T_PEMB-31",
      },
      {
        bmUnit: "T_PEMB-41",
      },
      {
        bmUnit: "T_PEMB-51",
      },
    ],
  },

  {
    details: {
      code: 'CARR',
      name: "Carrington",
      coords: {
        lat: 53.43772,
        lng: -2.41014,
      },
      fuelType: "gas",
    },
    units: [
      {
        bmUnit: "T_CARR-1",
      },
      {
        bmUnit: "T_CARR-2",
      },
    ],
  },

  {
    details: {
      code: 'LBAR',
      name: "Little Barford",
      coords: {
        lat: 52.20533,
        lng: -0.2668,
      },
      fuelType: "gas",
    },
    units: [
      {
        bmUnit: "T_LBAR-1",
      },
    ],
  },

  {
    details: {
      code: 'SPLN',
      name: "Spalding",
      coords: {
        lat: 52.80721,
        lng: -0.13334,
      },
      fuelType: "gas",
    },
    units: [
      {
        bmUnit: "T_SPLN-1",
      },
      {
        bmUnit: "T_SEEL-1",
      },
    ],
  },

  {
    details: {
      code: 'MOWEO',
      name: "Moray East",
      coords: {
        lat: 58.188,
        lng: -2.72,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "T_MOWEO-1",
      },
      {
        bmUnit: "T_MOWEO-2",
      },
      {
        bmUnit: "T_MOWEO-3",
      },
    ],
  },

  {
    details: {
      code: 'HOW',
      name: "Hornsea ",
      coords: {
        lat: 53.6815,
        lng: 1.4207,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "T_HOWBO-1",
      },
      {
        bmUnit: "T_HOWBO-2",
      },
      {
        bmUnit: "T_HOWBO-3",
      },
      {
        bmUnit: "T_HOWAO-1",
      },
      {
        bmUnit: "T_HOWAO-2",
      },
      {
        bmUnit: "T_HOWAO-3",
      },
    ],
  },

  {
    details: {
      code: 'SGRWO',
      name: "Seagreen",
      coords: {
        lat: 56.6355,
        lng: -1.9266,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "T_SGRWO-1",
      },
      {
        bmUnit: "T_SGRWO-2",
      },
      {
        bmUnit: "T_SGRWO-3",
      },
      {
        bmUnit: "T_SGRWO-4",
      },
      {
        bmUnit: "T_SGRWO-5",
      },
      {
        bmUnit: "T_SGRWO-6",
      },
    ],
  },

  {
    details: {
      code: 'TKN',
      name: "Triton Knoll",
      coords: {
        lat: 53.2123,
        lng: 0.8616,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "T_TKNEW-1",
      },
      {
        bmUnit: "T_TKNWW-1",
      },
    ],
  },

  {
    details: {
      code: 'FAWN',
      name: "Fawley North",
      coords: {
        lat: 50.818,
        lng: -1.329,
      },
      fuelType: "gas",
    },
    units: [
      {
        bmUnit: "E_FAWN-1",
      },
    ],
  },

  {
    details: {
      code: "WLNYO",
      name: "Walney",
      coords: {
        lat: 54.0394,
        lng: 3.5158,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "T_WLNYO-1",
      },
      {
        bmUnit: "T_WLNYO-2",
      },

      {
        bmUnit: "T_WLNYO-3",
      },

      {
        bmUnit: "T_WLNYO-4",
      },
      {
        bmUnit: "T_WLNYW-1",
      },
    ],
  },

  {
    details: {
      code: "CDCL",
      name: "Cottam",
      coords: {
        lat: 53.304757,
        lng: -0.781646,
      },
      fuelType: "gas",
    },
    units: [
      {
        bmUnit: "T_CDCL-1",
      },
    ],
  },

  {
    details: {
      code: 'CNQPS',
      name: "Connah's Quay",
      coords: {
        lat: 53.2317,
        lng: -3.08149,
      },
      fuelType: "gas",
    },
    units: [
      {
        bmUnit: "T_CNQPS-1",
      },
      {
        bmUnit: "T_CNQPS-2",
      },
      {
        bmUnit: "T_CNQPS-3",
      },
      {
        bmUnit: "T_CNQPS-4",
      },
    ],
  },

  {
    details: {
      code: 'RATS',
      name: "Ratcliffe",
      coords: {
        lat: 52.866945,
        lng: -1.256635,
      },
      fuelType: "coal",
    },
    units: [
      {
        bmUnit: "T_RATS-1",
      },
      {
        bmUnit: "T_RATS-2",
      },
      {
        bmUnit: "T_RATS-3",
      },
      {
        bmUnit: "T_RATS-4",
      },
      {
        bmUnit: "T_RATSGT-2",
      },
      {
        bmUnit: "T_RATSGT-4",
      },
    ],
  },

  {
    details: {
      code: "ROCK",
      name: "Rocksavage",
      coords: {
        lat: 53.31522,
        lng: -2.72278,
      },
      fuelType: "gas",
    },
    units: [
      {
        bmUnit: "T_ROCK-1",
      },
    ],
  },

  {
    details: {
      code: "EECL",
      name: "Enfield",
      coords: {
        lat: 51.66248,
        lng: -0.02248,
      },
      fuelType: "gas",
    },
    units: [
      {
        bmUnit: "T_EECL-1",
      },
    ],
  },

  {
    details: {
      code: "SHOS",
      name: "Shoreham",
      coords: {
        lat: 50.82992,
        lng: -0.23144,
      },
      fuelType: "gas",
    },
    units: [
      {
        bmUnit: "E_SHOS-1",
      },
    ],
  },

  {
    details: {
      code: "SEAB",
      name: "Seabank",
      coords: {
        lat: 51.5392,
        lng: -2.67,
      },
      fuelType: "gas",
    },
    units: [
      {
        bmUnit: "T_SEAB-1",
      },
      {
        bmUnit: "T_SEAB-2",
      },
    ],
  },

  {
    details: {
      code: "GRAI",
      name: "Grain",
      coords: {
        lat: 51.44298,
        lng: 0.70782,
      },
      fuelType: "gas",
    },
    units: [
      {
        bmUnit: "T_GRAI-6",
      },
      {
        bmUnit: "T_GRAI-7",
      },
      {
        bmUnit: "T_GRAI-8",
      },
    ],
  },

  {
    details: {
      code: 'GYAR',
      name: "Great Yarmouth",
      coords: {
        lat: 52.58395,
        lng: 1.73381,
      },
      fuelType: "gas",
    },
    units: [
      {
        bmUnit: "E_GYAR-1",
      },
    ],
  },

  {
    details: {
      code: "SCCL",
      name: "Saltend",
      coords: {
        lat: 53.73543,
        lng: -0.24315,
      },
      fuelType: "gas",
    },
    units: [
      {
        bmUnit: "T_SCCL-1",
      },
      {
        bmUnit: "T_SCCL-2",
      },
      {
        bmUnit: "T_SCCL-3",
      },
    ],
  },

  {
    details: {
      code: 'MRWD',
      name: "Marchwood",
      coords: {
        lat: 50.89798,
        lng: -1.43751,
      },
      fuelType: "gas",
    },
    units: [
      {
        bmUnit: "T_MRWD-1",
      },
    ],
  },

  {
    details: {
      code : 'HUMR',
      name: "Immingham",
      coords: {
        lat: 53.63779,
        lng: -0.23674,
      },
      fuelType: "gas",
    },
    units: [
      {
        bmUnit: "T_HUMR-1",
      },
    ],
  },

  {
    details: {
      code : 'LAGA',
      name: "Langage",
      coords: {
        lat: 50.3872,
        lng: -4.01099,
      },
      fuelType: "gas",
    },
    units: [
      {
        bmUnit: "T_LAGA-1",
      },
    ],
  },
  // E_DIDC01G E_DIDC02G E_DIDC03G E_DIDC04G
  {
    details: {
      code: 'DIDC',
      name: "Didcot",
      coords: {
        lat: 51.6246,
        lng: -1.2683,
      },
      fuelType: "gas",
    },
    units: [
      {
        bmUnit: "T_DIDCB5",
      },
      {
        bmUnit: "T_DIDCB6",
      },
      {
        bmUnit: "E_DIDC01G",
      },
      {
        bmUnit: "E_DIDC02G",
      },
      {
        bmUnit: "E_DIDC03G",
      },
      {
        bmUnit: "E_DIDC04G",
      },
    ],
  },
  {
    details: {
      code: "DRAX",
      name: "Drax",
      coords: {
        lat: 53.737196,
        lng: -0.999021,
      },
      fuelType: "biomass",
    },
    units: [
      {
        bmUnit: "T_DRAXX-1",
      },
      {
        bmUnit: "T_DRAXX-2",
      },
      {
        bmUnit: "T_DRAXX-3",
      },
      {
        bmUnit: "T_DRAXX-4",
      },
    ],
  },

  {
    details: {
      code: 'DAMC',
      name: "Damhead Creek",
      coords: {
        lat: 51.42492,
        lng: 0.60143,
      },
      fuelType: "gas",
    },
    units: [
      {
        bmUnit: "T_DAMC-1",
      },
      {
        bmUnit: "T_DAMC-2",
      },
    ],
  },

  {
    details: {
      code: 'STAY',
      name: "Staythorpe",
      coords: {
        lat: 53.07368,
        lng: -0.85901,
      },
      fuelType: "gas",
    },
    units: [
      {
        bmUnit: "T_STAY-1",
      },
      {
        bmUnit: "T_STAY-2",
      },
      {
        bmUnit: "T_STAY-3",
      },
      {
        bmUnit: "T_STAY-4",
      },
    ],
  },

  {
    details: {
      code: "SHBA",
      name: "South Humber Bank",
      coords: {
        lat: 53.60078,
        lng: -0.14462,
      },
      fuelType: "gas",
    },
    units: [
      {
        bmUnit: "T_SHBA-1",
      },
      {
        bmUnit: "T_SHBA-2",
      },
    ],
  },

  {
    details: {
      code : 'WBURB',
      name: "West Burton",
      coords: {
        lat: 53.36223,
        lng: -0.80759,
      },
      fuelType: "gas",
    },
    units: [
      {
        bmUnit: "T_WBURB-1",
      },
      {
        bmUnit: "T_WBURB-2",
      },
      {
        bmUnit: "T_WBURB-3",
      },
      {
        bmUnit: "T_WBURB-41",
      },
      {
        bmUnit: "T_WBURB-43",
      },
      {
        bmUnit: "T_WBUGT-1",
      },
      {
        bmUnit: "T_WBUGT-4",
      },
      {
        bmUnit: "T_WBURB-1",
      },
      {
        bmUnit: "T_WBURB-2",
      },
      {
        bmUnit: "T_WBURB-3",
      },
    ],
  },

  {
    details: {
      code: 'RCBK',
      name: "Race Bank",
      coords: {
        lat: 53.136,
        lng: 0.5892,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "T_RCBKO-1",
      },
      {
        bmUnit: "T_RCBKO-2",
      },
    ],
  },

  {
    details: {
      code: "KEAD",
      name: "Keadby",
      coords: {
        lat: 53.59444,
        lng: -0.75044,
      },
      fuelType: "gas",
    },
    units: [
      {
        bmUnit: "T_KEAD-1",
      },
      {
        bmUnit: "T_KEAD-2",
      },
      {
        bmUnit: "T_KEADGT-2",
      },
    ],
  },

  {
    details: {
      code: 'WHILW',
      name: "Whitelee",
      coords: {
        lat: 55.6812,
        lng: -4.2791,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "T_WHILW-1",
      },
      {
        bmUnit: "T_WHILW-2",
      },
    ],
  },

  {
    details: {
      code: "EAAO",
      name: "East Anglia",
      coords: {
        lat: 52.137,
        lng: 2.1728,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "T_EAAO-1",
      },
      {
        bmUnit: "T_EAAO-2",
      },
    ],
  },

  {
    details: {
      code: "ERRO",
      name: "Errochty",
      coords: {
        lat: 56.7091,
        lng: -4.0065,
      },
      fuelType: "hydro",
    },
    units: [
      {
        bmUnit: "T_ERRO-1",
      },
      {
        bmUnit: "T_ERRO-2",
      },
      {
        bmUnit: "T_ERRO-3",
      },
      {
        bmUnit: "T_ERRO-4",
      },
    ],
  },

  {
    details: {
      name: "Duddon Sands",
      code: 'WDNSO',
      coords: {
        lat: 53.9851,
        lng: -3.462,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "T_WDNSO-1",
      },
      {
        bmUnit: "T_WDNSO-2",
      },
    ],
  },

  {
    details: {
      code: "WTMSO",
      name: "Westmost Rough",
      coords: {
        lat: 53.81,
        lng: 0.15,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "T_WTMSO-1",
      },
    ],
  },

  {
    details: {
      code: "LYNE",
      name: "Lynemouth",
      coords: {
        lat: 55.204167,
        lng: -1.520833,
      },
      fuelType: "biomass",
    },
    units: [
      {
        bmUnit: "E_LYNE1",
      },
      {
        bmUnit: "E_LYNE2",
      },
      {
        bmUnit: "E_LYNE3",
      },
    ],
  },
  //T_SHRSW-1

  {
    details: {
      code: 'SHRSW',
      name: "Sheringham Shoal",
      coords: {
        lat: 53.81,
        lng: 0.15,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "T_SHRSW-1",
      },
      {
        bmUnit: "T_SHRSW-2",
      },
    ],
  },

  {
    details: {
      code: "GYMR",
      name: "Gwynt y Mor",
      coords: {
        lat: 53.454,
        lng: -3.6266,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "T_GYMR-15",
      },
      {
        bmUnit: "T_GYMR-17",
      },
      {
        bmUnit: "T_GYMR-26",
      },
      {
        bmUnit: "T_GYMR-28",
      },
    ],
  },

  {
    details: {
      code: "DINO",
      name: "Dinorwig",
      coords: {
        lat: 53.1206,
        lng: -4.1153,
      },
      fuelType: "hydro",
    },
    units: [
      {
        bmUnit: "T_DINO-1",
      },
      {
        bmUnit: "T_DINO-2",
      },
      {
        bmUnit: "T_DINO-3",
      },
      {
        bmUnit: "T_DINO-4",
      },
      {
        bmUnit: "T_DINO-5",
      },
      {
        bmUnit: "T_DINO-6",
      },
    ],
  },

  {
    details: {
      code: "FFES",
      name: "Ffestiniog",
      coords: {
        lat: 52.9808,
        lng: -3.9686,
      },
      fuelType: "hydro",
    },
    units: [
      {
        bmUnit: "T_FFES-1",
      },
      {
        bmUnit: "T_FFES-2",
      },
      {
        bmUnit: "T_FFES-3",
      },
      {
        bmUnit: "T_FFES-4",
      },
    ],
  },

  {
    details: {
      code: "FASN",
      name: "Fasnakyle",
      coords: {
        lat: 57.32586,
        lng: -4.79438,
      },
      fuelType: "hydro",
    },
    units: [
      {
        bmUnit: "T_FASN-1",
      },
      {
        bmUnit: "E_FASN-4",
      },
      {
        bmUnit: "T_FASN-2",
      },
      {
        bmUnit: "E_FASN-3",
      },
    ],
  },

  {
    details: {
      code: "ANRB",
      name: "Aberdeen",
      coords: {
        lat: 57.2225,
        lng: -1.9728,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "T_ABRBO-1",
      },
    ],
  },

  //E_ABRTW-1

  {
    details: {
      code: "ABRTW",
      name: "Auchrobert",
      coords: {
        lat: 55.624,
        lng: -3.9842,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "E_ABRTW-1",
      },
    ],
  },

  {
    details: {
      code: "ACHL",
      name: "Achlachan",
      coords: {
        lat: 58.4489,
        lng: -3.4546,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "C__PSMAR001",
      },
    ],
  },

  {
    details: {
      code: "ACHR",
      name: "A`Chruach",
      coords: {
        lat: 56.1528,
        lng: -5.3102,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "T_ACHRW-1",
      },
    ],
  },

  //afton T_AFTOW-1 55.3116, -4.1743

  {
    details: {
      code: "AFTO",
      name: "Afton",
      coords: {
        lat: 55.3116,
        lng: -4.1743,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "T_AFTOW-1",
      },
    ],
  },

  //airis E_AIRSW-1 54.8021, -4.6577

  {
    details: {
      code: "AIRS",
      name: "Airies",
      coords: {
        lat: 54.8021,
        lng: -4.6577,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "E_AIRSW-1",
      },
    ],
  },

  //Aikengall T_AKGLW-2 T_AKGLW-3 //55.9172, -2.4901

  {
    details: {
      code :"AKGL",
      name: "Aikengall",
      coords: {
        lat: 55.9172,
        lng: -2.4901,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "T_AKGLW-2",
      },
      {
        bmUnit: "T_AKGLW-3",
      },
    ],
  },

  //An Suidhe 56.2187, -5.2194 T_ANSUW-1

  {
    details: {
      code : "ANSU",
      name: "An Suidhe",
      coords: {
        lat: 56.2187,
        lng: -5.2194,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "T_ANSUW-1",
      },
    ],
  },

  //Arecleoch 55.0688, -4.7971 T_ARCHW-1

  {
    details: {
      code: 'ARCHW',
      name: "Arecleoch",
      coords: {
        lat: 55.0688,
        lng: -4.7971,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "T_ARCHW-1",
      },
    ],
  },

  //Andershaw 55.5093, -3.8463 E_ASHWW-1

  {
    details: {
      code: "ASHWW",
      name: "Andershaw",
      coords: {
        lat: 55.5093,
        lng: -3.8463,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "E_ASHWW-1",
      },
    ],
  },

  //baillie E_BABAW-1 58.5679, -3.677

  {
    details: {
      code: "BABAW",
      name: "Baillie",
      coords: {
        lat: 58.5679,
        lng: -3.677,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "E_BABAW-1",
      },
    ],
  },

  //baglan bay T_BAGE-1 T_BAGE-2 51.61551, -3.8346

  {
    details: {
      code: "BAGE",
      name: "Baglan Bay",
      coords: {
        lat: 51.61551,
        lng: -3.8346,
      },
      fuelType: "gas",
    },
    units: [
      {
        bmUnit: "T_BAGE-1",
      },
      {
        bmUnit: "T_BAGE-2",
      },
    ],
  },

  //Bad A Cheo 58.4205, -3.4292 T_BDCHW-1

  {
    details: {
      code: "BDCHW",
      name: "Bad A Cheo",
      coords: {
        lat: 58.4205,
        lng: -3.4292,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "T_BDCHW-1",
      },
    ],
  },

  // beatrice T_BEATO-1 T_BEATO-2 T_BEATO-3 T_BEATO-4 58.0882, -2.9502

  {
    details: {
      code: "BEATO",
      name: "Beatrice",
      coords: {
        lat: 58.0882,
        lng: -2.9502,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "T_BEATO-1",
      },
      {
        bmUnit: "T_BEATO-2",
      },
      {
        bmUnit: "T_BEATO-3",
      },
      {
        bmUnit: "T_BEATO-4",
      },
    ],
  },

  //Beinneun 57.0956, -4.9655 T_BEINW-1

  {
    details: {
      code: "BEINW",
      name: "Beinneun",
      coords: {
        lat: 57.0956,
        lng: -4.9655,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "T_BEINW-1",
      },
    ],
  },

  //Bhlaraidh 57.2191, -4.5819 T_BHLAW-1

  {
    details: {
      code: "BHLAW",
      name: "Bhlaraidh",
      coords: {
        lat: 57.2191,
        lng: -4.5819,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "T_BHLAW-1",
      },
    ],
  },

  //Blackcraig 55.1199, -4.032 T_BLKWW-1

  {
    details: {
      code: "BLKWW",
      name: "Blackcraig",
      coords: {
        lat: 55.1199,
        lng: -4.032,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "T_BLKWW-1",
      },
    ],
  },

  //Blacklaw 55.766944, -3.738889 T_BLLA-1, T_BLLA-2

  {
    details: {
      code: "BLLA",
      name: "Blacklaw",
      coords: {
        lat: 55.766944,
        lng: -3.738889,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "T_BLLA-1",
      },
      {
        bmUnit: "T_BLLA-2",
      },
    ],
  },

  // Burn of Whilk 58.3568, -3.2039 E_BNWKW-1

  {
    details: {
      code: "BNWK",
      name: "Burn of Whilk",
      coords: {
        lat: 58.3568,
        lng: -3.2039,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "E_BNWKW-1",
      },
    ],
  },

  // Barrow T_BOWLW-1 53.9915, -3.2983

  {
    details: {
      code: "BOWL",
      name: "Barrow",
      coords: {
        lat: 53.9915,
        lng: -3.2983,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "T_BOWLW-1",
      },
    ],
  },

  // Burbo 53.4882, -3.1849 T_BRBEO-1 E_BURBO

  {
    details: {
      code: "BRBO",
      name: "Burbo",
      coords: {
        lat: 53.4882,
        lng: -3.1849,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "T_BRBEO-1",
      },
      {
        bmUnit: "E_BURBO",
      },
    ],
  },

  // Braes O'Doune 56.2698, -4.0589 E_BRDUW-1

  {
    details: {
      code: "BRDU",
      name: "Braes O'Doune",
      coords: {
        lat: 56.2698,
        lng: -4.0589,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "E_BRDUW-1",
      },
    ],
  },

  //Brigg E_BRGG-1 53.5423, -0.5092

  {
    details: {
      code: "BRGG",
      name: "Brigg",
      coords: {
        lat: 53.5423,
        lng: -0.5092,
      },
      fuelType: "biomass",
    },
    units: [
      {
        bmUnit: "E_BRGG-1",
      },
    ],
  },

  //Berry Burn 57.4466, -3.4754 E_BRYBW-1

  {
    details: {
      code: "BRYB",
      name: "Berry Burn",
      coords: {
        lat: 57.4466,
        lng: -3.4754,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "E_BRYBW-1",
      },
    ],
  },

  //Beinn an Turic 55.5732, -5.5874 E_BTUIW-2 E_BTUIW-3

  {
    details: {
      code: "BTUIW",
      name: "Beinn an Turic",
      coords: {
        lat: 55.5732,
        lng: -5.5874,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "E_BTUIW-2",
      },
      {
        bmUnit: "E_BTUIW-3",
      },
    ],
  },

  //Cairn Uish Wind 57.5373, -3.363 2_PPGEN001 2_PPGEN001

  {
    details: {
      code: "CAIR",
      name: "Cairn Uish Wind",
      coords: {
        lat: 57.5373,
        lng: -3.363,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "2_PPGEN001",
      },
      {
        bmUnit: "2_PPGEN001",
      },
    ],
  },

  //Beauly M_CAS-BEU01 57.47309, -4.45938

  {
    details: {
      code: "BEU",
      name: "Beauly",
      coords: {
        lat: 57.47309,
        lng: -4.45938,
      },
      fuelType: "hydro",
    },
    units: [
      {
        bmUnit: "M_CAS-BEU01",
      },
    ],
  },

  // Clunie M_CAS-CLU01 56.71688724042855, -3.7780916020120454

  {
    details: {
      code: 'CLU',
      name: "Clunie",
      coords: {
        lat: 56.71688724042855,
        lng: -3.7780916020120454,
      },
      fuelType: "hydro",
    },
    units: [
      {
        bmUnit: "M_CAS-CLU01",
      },
    ],
  },

  // conon M_CAS-CON01 57.5746352506808, -4.686210732440651

  {
    details: {
      code: 'CON',
      name: "Conon",
      coords: {
        lat: 57.5746352506808,
        lng: -4.686210732440651,
      },
      fuelType: "hydro",
    },
    units: [
      {
        bmUnit: "M_CAS-CON01",
      },
    ],
  },

  // Garry M_CAS-GAR01 57.070466800000005, -5.281377792807345

  {
    details: {
      code: 'GAR',
      name: "Garry",
      coords: {
        lat: 57.070466800000005,
        lng: -5.281377792807345,
      },
      fuelType: "hydro",
    },
    units: [
      {
        bmUnit: "M_CAS-GAR01",
      },
    ],
  },
  // Killin M_CAS-KIL01 56.481, -4.298

  {
    details: {
      code: 'KIL',
      name: "Killin",
      coords: {
        lat: 56.481,
        lng: -4.298,
      },
      fuelType: "hydro",
    },
    units: [
      {
        bmUnit: "M_CAS-KIL01",
      },
    ],
  },

  // Moriston M_CAS-MOR01 57.1761093185331, -4.803003452163473

  {
    details: {
      code: 'MOR',
      name: "Moriston",
      coords: {
        lat: 57.1761093185331,
        lng: -4.803003452163473,
      },
      fuelType: "hydro",
    },
    units: [
      {
        bmUnit: "M_CAS-MOR01",
      },
    ],
  },

  // T_CGTHW-1 Corriegarth 57.186684969545475, -4.366919616037227

  {
    details: {
      code: "CGTHW",
      name: "Corriegarth",
      coords: {
        lat: 57.186684969545475,
        lng: -4.366919616037227,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "T_CGTHW-1",
      },
    ],
  },

  // Clachan 56.27744438034275, -4.920869168208424 E_CLAC-1

  {
    details: {
      code: "CLAC",
      name: "Clachan",
      coords: {
        lat: 56.27744438034275,
        lng: -4.920869168208424,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "E_CLAC-1",
      },
    ],
  },

  // Clyd T_CLDCW-1 T_CLDNW-1 T_CLDSW-1 55.44612344718645, -3.5987094283153507

  {
    details: {
      code: "T_CLDCW",
      name: "Clyde",
      coords: {
        lat: 55.44612344718645,
        lng: -3.5987094283153507,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "T_CLDCW-1",
      },
      {
        bmUnit: "T_CLDNW-1",
      },
      {
        bmUnit: "T_CLDSW-1",
      },
    ],
  },

  //Clashindarroch 57.3665, -2.8661 E_CLDRW-1

  {
    details: {
      code: "CLDRW",
      name: "Clashindarroch",
      coords: {
        lat: 57.3665,
        lng: -2.8661,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "E_CLDRW-1",
      },
    ],
  },

  // Clachan flats E_CLFLW-1 56.2881, -4.9429

  {
    details: {
      code: "CLFLW",
      name: "Clachan flats",
      coords: {
        lat: 56.2881,
        lng: -4.9429,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "E_CLFLW-1",
      },
    ],
  },

  // Camster 2_PPGEN003 58.4087, -3.2715

  {
    details: {
      code: "CAM",
      name: "Camster",
      coords: {
        lat: 58.4087,
        lng: -3.2715,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "2_PPGEN003",
      },
    ],
  },

  //Coire Na Cloiche WF 57.7696, -4.3732 E_CNCLW-1

  {
    details: {
      code: "CNCLW",
      name: "Coire Na Cloiche WF",
      coords: {
        lat: 57.7696,
        lng: -4.3732,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "E_CNCLW-1",
      },
    ],
  },

  // Corby E_CORB-1 52.51044, -0.68143

  {
    details: {
      code: "CORB",
      name: "Corby",
      coords: {
        lat: 52.51044,
        lng: -0.68143,
      },
      fuelType: "biomass",
    },
    units: [
      {
        bmUnit: "E_CORB-1",
      },
    ],
  },

  //T_COSO-1 Coryton 51.51185, 0.5079

  {
    details: {
      code: "COSO",
      name: "Coryton",
      coords: {
        lat: 51.51185,
        lng: 0.5079,
      },
      fuelType: "gas",
    },
    units: [
      {
        bmUnit: "T_COSO-1",
      },
    ],
  },

  // Cour  55° 34' 9.7" -5° 37' 27.8" T_COUWW-1

  {
    details: {
      code: "COUWW",
      name: "Cour",
      coords: {
        lat: 55.569361,
        lng: -5.624389,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "T_COUWW-1",
      },
    ],
  },

  // COwes E_COWE1 E_COWE2 50.74711, -1.2862

  {
    details: {
      code: "COWE",
      name: "Cowes",
      coords: {
        lat: 50.74711,
        lng: -1.2862,
      },
      fuelType: "gas",
    },
    units: [
      {
        bmUnit: "E_COWE1",
      },
      {
        bmUnit: "E_COWE2",
      },
    ],
  },

  // crossdykes E_CRDEW-1 E_CRDEW-2 55.1762, -3.1729

  {
    details: {
      code: "CRDEW",
      name: "Crossdykes",
      coords: {
        lat: 55.1762,
        lng: -3.1729,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "T_CRDEW-1",
      },
      {
        bmUnit: "T_CRDEW-2",
      },
      {
        bmUnit: "E_CRDEW-1", // T_CRDEW-1
      },
      {
        bmUnit: "E_CRDEW-2",
      },
    ],
  },

  //Carraig Gheal T_CRGHW-1 56.339, -5.2945

  {
    details: {
      code: "CRGHW",
      name: "Carraig Gheal",
      coords: {
        lat: 56.339,
        lng: -5.2945,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "T_CRGHW-1",
      },
    ],
  },

  //Corrimoillie	T_CRMLW-1  57° 40' 3.6" -4° 46' 24"

  {
    details: {
      code: "CRMLW",
      name: "Corrimoillie",
      coords: {
        lat: 57.667667,
        lng: -4.773333,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "T_CRMLW-1",
      },
    ],
  },

  // cruacha T_CRUA-1 T_CRUA- T_CRUA-3 T_CRUA-4 56.4192, -5.0127

  {
    details: {
      code: "CRUA",
      name: "Cruachan",
      coords: {
        lat: 56.4192,
        lng: -5.0127,
      },
      fuelType: "hydro",
    },
    units: [
      {
        bmUnit: "T_CRUA-1",
      },
      {
        bmUnit: "T_CRUA-2",
      },
      {
        bmUnit: "T_CRUA-3",
      },
      {
        bmUnit: "T_CRUA-4",
      },
    ],
  },

  // Crystal Rig T_CRYRW-2 T_CRYRW-3 55.883, -2.5075

  {
    details: {
      code: "CRYRW",
      name: "Crystal Rig",
      coords: {
        lat: 55.883,
        lng: -2.5075,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "T_CRYRW-2",
      },
      {
        bmUnit: "T_CRYRW-3",
      },
    ],
  },

  // Dalswinton E_DALSW-1 55.1841, -3.6506

  {
    details: {
      code: "DALSW",
      name: "Dalswinton",
      coords: {
        lat: 55.1841,
        lng: -3.6506,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "E_DALSW-1",
      },
    ],
  },

  // Dudgeon T_DDGNO-1 T_DDGNO-2 T_DDGNO-3 T_DDGNO-4 53.1175, 0.6135

  {
    details: {
      code: "DDGNO",
      name: "Dudgeon",
      coords: {
        lat: 53.1175,
        lng: 0.6135,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "T_DDGNO-1",
      },
      {
        bmUnit: "T_DDGNO-2",
      },
      {
        bmUnit: "T_DDGNO-3",
      },
      {
        bmUnit: "T_DDGNO-4",
      },
    ],
  },

  // Deeside  T_DEEP-1 53°14′00″N 3°03′17″W

  {
    details: {
      code: "DEEP",
      name: "Deeside",
      coords: {
        lat: 53.233333,
        lng: -3.054722,
      },
      fuelType: "gas",
    },
    units: [
      {
        bmUnit: "T_DEEP-1",
      },
    ],
  },

  // Dunbar 55.99467893827063, -2.5037593767422934 2__NSMAR001

  {
    details: {
       code: "DUNB",
      name: "Dunbar",
      coords: {
        lat: 55.99467893827063,
        lng: -2.5037593767422934,
      },
      fuelType: "biomass",
    },
    units: [
      {
        bmUnit: "2__NSMAR001",
      },
    ],
  },

  // Dunlaw : 55° 48' 20.1" -2° 51' 10.4" T_DNLWW-1

  {
    details: {
      code: "DNLWW",
      name: "Dunlaw",
      coords: {
        lat: 55.805583,
        lng: -2.852889,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "T_DNLWW-1",
      },
    ],
  },

  // Dorenell 57° 21' 9.8" -3° 7' 45" T_DOREW-1 T_DOREW-2

  {
    details: {
      code: "DOREW",
      name: "Dorenell",
      coords: {
        lat: 57.352722,
        lng: -3.129167,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "T_DOREW-1",
      },
      {
        bmUnit: "T_DOREW-2",
      },
    ],
  },

  // Dersalloch 55.31925878073858, -4.468916566180941 T_DRSLW-1

  {
    details: {
      code: "DRSLW",
      name: "Dersalloch",
      coords: {
        lat: 55.31925878073858,
        lng: -4.468916566180941,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "T_DRSLW-1",
      },
    ],
  },

  // Dunmaglass 57.239772263978885, -4.267768506763746 T_DUNGW-1

  {
    details: {
      code: "DUNGW",
      name: "Dunmaglass",
      coords: {
        lat: 57.239772263978885,
        lng: -4.267768506763746,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "T_DUNGW-1",
      },
    ],
  },

  // edinbane 57.40959498314662, -6.417996723851728 T_EDINW-1

  {
    details: {
      code: "EDINW",
      name: "Edinbane",
      coords: {
        lat: 57.40959498314662,
        lng: -6.417996723851728,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "T_EDINW-1",
      },
    ],
  },

  // ewe hill T_EWHLW-1 55° 6' 54" -3° 13' 40.8"

  {
    details: {
      code: "EWHLW",
      name: "Ewe Hill",
      coords: {
        lat: 55.115,
        lng: -3.228,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "T_EWHLW-1",
      },
    ],
  },

  // farr 57.325264293976204, -4.092302940312459 T_FARR-1 T_FARR-2

  {
    details: {
      code: "FARR",
      name: "Farr",
      coords: {
        lat: 57.325264293976204,
        lng: -4.092302940312459,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "T_FARR-1",
      },
      {
        bmUnit: "T_FARR-2",
      },
    ],
  },

  // Fallago 55.82489777951005, -2.66409699462629 T_FALGW-1

  {
    details: {
      code: "FALGW",
      name: "Fallago",
      coords: {
        lat: 55.82489777951005,
        lng: -2.66409699462629,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "T_FALGW-1",
      },
    ],
  },

  //fellside E_FELL-1 -1.35	50.83

  {
    details: {
      code: "FELL",
      name: "Fellside",
      coords: {
        lat: 50.83,
        lng: -1.35,
      },
      fuelType: "biomass",
    },
    units: [
      {
        bmUnit: "E_FELL-1",
      },
    ],
  },

  // Finlarig Longitude	-3.61 Latitude	56.28 T_FINL-1

  {
    details: {
      code: "FINL",
      name: "Finlarig",
      coords: {
        lat: 56.28,
        lng: -3.61,
      },
      fuelType: "hydro",
    },
    units: [
      {
        bmUnit: "T_FINL-1",
      },
    ],
  },

  // foyers T_FOYE-1, T_FOYE-2 -4.36 57.24

  {
    details: {
      code: "FOYE",
      name: "Foyers",
      coords: {
        lat: 57.24,
        lng: -4.36,
      },
      fuelType: "hydro",
    },
    units: [
      {
        bmUnit: "T_FOYE-1",
      },
      {
        bmUnit: "T_FOYE-2",
      },
    ],
  },

  //Freasdail	T_FSDLW-1 -5.48 55.78

  {
    details: {
      code: "FSDLW",
      name: "Freasdail",
      coords: {
        lat: 55.78,
        lng: -5.48,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "T_FSDLW-1",
      },
    ],
  },

  //  galloper T_GANW-11, T_GANW-13, T_GANW-22, T_GANW-24 51.89 2.04

  {
    details: {
      code: "GANW",
      name: "Galloper",
      coords: {
        lat: 51.89,
        lng: 2.04,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "T_GANW-11",
      },
      {
        bmUnit: "T_GANW-13",
      },
      {
        bmUnit: "T_GANW-22",
      },
      {
        bmUnit: "T_GANW-24",
      },
    ],
  },

  // gordonstoun E_GDSTW-1 -2.53 53.27

  {
    details: {
      code: "GDSTW",
      name: "Gordonstoun",
      coords: {
        lat: 53.27,
        lng: -2.53,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "E_GDSTW-1",
      },
    ],
  },
  // Glenchamber E_GLCHW-1 -4.75 54.96

  {
    details: {
      code: "GLCHW",
      name: "Glenchamber",
      coords: {
        lat: 54.96,
        lng: -4.75,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "E_GLCHW-1",
      },
    ],
  },

  // Glendoe T_GLNDO-1 -5.17 57.15

  {
    details: {
      code: "GLNDO",
      name: "Glendoe",
      coords: {
        lat: 57.15,
        lng: -5.17,
      },
      fuelType: "hydro",
    },
    units: [
      {
        bmUnit: "T_GLNDO-1",
      },
    ],
  },

  // E_GLOFW-1 Glens of Foudland -2.88 57.22

  {
    details: {
      code: "GLOFW",
      name: "Glens of Foudland",
      coords: {
        lat: 57.22,
        lng: -2.88,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "E_GLOFW-1",
      },
    ],
  },

  // galawhistle T_GLWSW-1 -3.92 55.53

  {
    details: {
      code: "GLWSW",
      name: "Galawhistle",
      coords: {
        lat: 55.53,
        lng: -3.92,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "T_GLWSW-1",
      },
    ],
  },

  //Glen App T_GNAPW-1 -5.03 55.02

  {
    details: {
      code: "GNAPW",
      name: "Glen App",
      coords: {
        lat: 55.02,
        lng: -5.03,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "T_GNAPW-1",
      },
    ],
  },

  // Gunfleet Sands T_GNFSW-1 E_GNFSW-2 1.17 51.74

  {
    details: {
      code: "GNFSW",
      name: "Gunfleet Sands",
      coords: {
        lat: 51.74,
        lng: 1.17,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "T_GNFSW-1",
      },
      {
        bmUnit: "E_GNFSW-2",
      },
    ],
  },

  // Gordonbush 58.07153332938159, -3.991809012205654 T_GORDW-1 T_GORDW-2

  {
    details: {
      code: "GORDW",
      name: "Gordonbush",
      coords: {
        lat: 58.07153332938159,
        lng: -3.991809012205654,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "T_GORDW-1",
      },
      {
        bmUnit: "T_GORDW-2",
      },
    ],
  },

  // Greater Gabbard 51.86649367222777, 1.9277117027817146 T_GRGBW-1, T_GRGBW-2, T_GRGBW-3

  {
    details: {
      code: "GRGBW",
      name: "Greater Gabbard",
      coords: {
        lat: 51.86649367222777,
        lng: 1.9277117027817146,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "T_GRGBW-1",
      },
      {
        bmUnit: "T_GRGBW-2",
      },
      {
        bmUnit: "T_GRGBW-3",
      },
    ],
  },

  // Griffin T_GRIFW-1, T_GRIFW-2  -3.39 56.53

  {
    details: {
      code: "GRIFW",
      name: "Griffin",
      coords: {
        lat: 56.53,
        lng: -3.39,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "T_GRIFW-1",
      },
      {
        bmUnit: "T_GRIFW-2",
      },
    ],
  },

  // Grangemouth T_GRMO-1 -2.53 53.27

  {
    details: {
      code: "GRMO",
      name: "Grangemouth",
      coords: {
        lat: 56.02,
        lng: -3.73,
      },
      fuelType: "gas",
    },
    units: [
      {
        bmUnit: "T_GRMO-1",
      },
    ],
  },

  //Halsary	T_HALSW-1 58.44652833288308, -3.4208646140957404
  {
    details: {
      code: "HALSW",
      name: "Halsary",
      coords: {
        lat: 58.44652833288308,
        lng: -3.4208646140957404,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "T_HALSW-1",
      },
    ],
  },

  //Harburnhead	E_HBHDW-1 55.814764307994125, -3.54231733790513
  {
    details: {
      code: "HBHDW",
      name: "Harburnhead",
      coords: {
        lat: 55.814764307994125,
        lng: -3.54231733790513,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "E_HBHDW-1",
      },
    ],
  },

  //Hill of Glaschyle	E_HLGLW-1 -3.62 57.51
  {
    details: {
      code: "HLGLW",
      name: "Hill of Glaschyle",
      coords: {
        lat: 57.51,
        lng: -3.62,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "E_HLGLW-1",
      },
    ],
  },
  //Hill of Towie	E_HLTWW-1 -2.41	57.49
  {
    details: {
      code: "HLTWW",
      name: "Hill of Towie",
      coords: {
        lat: 57.49,
        lng: -2.41,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "E_HLTWW-1",
      },
    ],
  },
  //Humber Gateway Offshore	T_HMGTO-1 T_HMGTO-2 53.65936008605068, 0.29528252560843476
  {
    details: {
      code: "HMGTO",
      name: "Humber Gateway",
      coords: {
        lat: 53.65936008605068,
        lng: 0.29528252560843476,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "T_HMGTO-1",
      },
      {
        bmUnit: "T_HMGTO-2",
      },
    ],
  },
  //Hare Hill Ext	E_HRHLW-1 55.36726941867161, -4.1089394055798705
  {
    details: {
      code: "HRHLW",
      name: "Hare Hill",
      coords: {
        lat: 55.36726941867161,
        lng: -4.1089394055798705,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "E_HRHLW-1",
      },
    ],
  },

  //Harestanes	T_HRSTW-1 55.37438774601089, -3.9614870161241624
  {
    details: {
      code: "HRSTW",
      name: "Harestanes",
      coords: {
        lat: 55.37438774601089,
        lng: -3.9614870161241624,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "T_HRSTW-1",
      },
    ],
  },

  //Hywind	E_HYWDW-1 -1.35 57.48

  {
    details: {
      code: "HYWDW",
      name: "Hywind",
      coords: {
        lat: 57.48,
        lng: -1.35,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "E_HYWDW-1",
      },
    ],
  },

  //Indian Queens	T_INDQ-1 50.39636444053638, -4.898096864753528
  {
    details: {
      code: "INDQ",
      name: "Indian Queens",
      coords: {
        lat: 50.39636444053638,
        lng: -4.898096864753528,
      },
      fuelType: "gas",
    },
    units: [
      {
        bmUnit: "T_INDQ-1",
      },
    ],
  },

  //JG Pears Power Limited	T_JGPR-1 3.07 51.74

  {
    details: {
      code: "JGPR",
      name: "JG Pears Power Limited",
      coords: {
        lat: 51.74,
        lng: 3.07,
      },
      fuelType: "biomass",
    },
    units: [
      {
        bmUnit: "T_JGPR-1",
      },
    ],
  },

  //Kilbraur	T_KILBW-1 -4.06 58.04

  {
    details: {
      code: "KILBW",
      name: "Kilbraur",
      coords: {
        lat: 58.04,
        lng: -4.06,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "T_KILBW-1",
      },
    ],
  },
  // Killingholme (PG)	T_KILLPG-1 T_KILLPG-2 T_KILNS-1 -2.53 53.27

  {
    details: {
      code: "KILLPG",
      name: "Killingholme (PG)",
      coords: {
        lat: 53.27,
        lng: -2.53,
      },
      fuelType: "gas",
    },
    units: [
      {
        bmUnit: "T_KILLPG-1",
      },
      {
        bmUnit: "T_KILLPG-2",
      },
      {
        bmUnit: "T_KILNS-1",
      },
    ],
  },

  //Kincardine Offshore	E_KINCW-1 1.88 56.98

  {
    details: {
      code: "KINCW",
      name: "Kincardine",
      coords: {
        lat: 56.98,
        lng: 1.88,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "E_KINCW-1",
      },
    ],
  },

  //Kilgallioch	T_KLGLW-1 55.049912278136496, -4.764493574079205
  {
    details: {
      code: "KLGLW",
      name: "Kilgallioch",
      coords: {
        lat: 55.049912278136496,
        lng: -4.764493574079205,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "T_KLGLW-1",
      },
    ],
  },

  //Kings Lynn	E_KLYN-A-1 52.72750854417357, 0.38092497060502656
  {
    details: {
      code: "KLYN",
      name: "Kings Lynn",
      coords: {
        lat: 52.72750854417357,
        lng: 0.38092497060502656,
      },
      fuelType: "gas",
    },
    units: [
      {
        bmUnit: "E_KLYN-A-1",
      },
    ],
  },
  //Kype Muir	T_KPMRW-1 55.62896285665657, -4.061570179294071
  {
    details: {
      code: "KPMRW",
      name: "Kype Muir",
      coords: {
        lat: 55.62896285665657,
        lng: -4.061570179294071,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "T_KPMRW-1",
      },
    ],
  },
  //Keith Hill	T_KTHLW-1 2.83 55.82

  {
    details: {
      code: "KTHLW",
      name: "Keith Hill",
      coords: {
        lat: 55.82,
        lng: 2.83,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "T_KTHLW-1",
      },
    ],
  },
  //London Array	T_LARYW-1, T_LARYW-2, T_LARYW-3, T_LARYW-4 1.36 51.65

  {
    details: {
      code: "LARYW",
      name: "London Array",
      coords: {
        lat: 51.65,
        lng: 1.36,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "T_LARYW-1",
      },
      {
        bmUnit: "T_LARYW-2",
      },
      {
        bmUnit: "T_LARYW-3",
      },
      {
        bmUnit: "T_LARYW-4",
      },
    ],
  },
  //Lochluichart	T_LCLTW-1 -4.56 57.74

  {
    details: {
      code: "LCLTW",
      name: "Lochluichart",
      coords: {
        lat: 57.74,
        lng: -4.56,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "T_LCLTW-1",
      },
    ],
  },

  // Lincs	T_LNCSW-1 T_LNCSW-2 0.53 53.27

  {
    details: {
      code: "LNCSW",
      name: "Lincs",
      coords: {
        lat: 53.27,
        lng: 0.53,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "T_LNCSW-1",
      },
      {
        bmUnit: "T_LNCSW-2",
      },
    ],
  },
  // Markinch Biomass	E_MARK-1 56.200423605026515, -3.1567815618346255
  {
    details: {
      code: "MARK",
      name: "Markinch Biomass",
      coords: {
        lat: 56.200423605026515,
        lng: -3.1567815618346255,
      },
      fuelType: "biomass",
    },
    units: [
      {
        bmUnit: "E_MARK-1",
      },
    ],
  },
  // Mid Hill	2__PSTAT002 -2.48 56.96

  {
    details: {
      code: "MIDH",
      name: "Mid Hill",
      coords: {
        lat: 56.96,
        lng: -2.48,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "2__PSTAT002",
      },
    ],
  },

  // Medway	T_MEDP-1 0.89 51.38

  {
    details: {
      code: "MEDP",
      name: "Medway",
      coords: {
        lat: 51.38,
        lng: 0.89,
      },
      fuelType: "gas",
    },
    units: [
      {
        bmUnit: "T_MEDP-1",
      },
    ],
  },
  // Middle Muir	T_MIDMW-1 55.514378415866375, -3.803041190703463

  {
    details: {
      code: "MIDMW",
      name: "Middle Muir",
      coords: {
        lat: 55.514378415866375,
        lng: -3.803041190703463,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "T_MIDMW-1",
      },
    ],
  },
  // Millennium Windfarm	T_MILWW-1 57.12374520636007, -4.845656718900648

  {
    details: {
      code: "MILWW",
      name: "Millennium",
      coords: {
        lat: 57.12374520636007,
        lng: -4.845656718900648,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "T_MILWW-1",
      },
    ],
  },
  // Minsca	E_MINSW-1 -3.47	55.04

  {
    details: {
      code: "MINSW",
      name: "Minsca",
      coords: {
        lat: 55.04,
        lng: -3.47,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "E_MINSW-1",
      },
    ],
  },

  // Mark Hill	T_MKHLW-1 4.82 55.16

  {
    details: {
      code: "MKHLW",
      name: "Mark Hill",
      coords: {
        lat: 55.16,
        lng: 4.82,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "T_MKHLW-1",
      },
    ],
  },
  // Moy	E_MOYEW-1 -4.06 57.39

  {
    details: {
      code: "MOYEW",
      name: "Moy",
      coords: {
        lat: 57.39,
        lng: -4.06,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "E_MOYEW-1",
      },
    ],
  },
  // Minnygap	T_MYGPW-1 -3.51 55.25

  {
    details: {
      code: "MYGPW",
      name: "Minnygap",
      coords: {
        lat: 55.25,
        lng: -3.51,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "T_MYGPW-1",
      },
    ],
  },
  // Nant	T_NANT-1 -2.53 53.27

  {
    details: {
      code: "NANT",
      name: "Nant",
      coords: {
        lat: 53.27,
        lng: -2.53,
      },
      fuelType: "hydro",
    },
    units: [
      {
        bmUnit: "T_NANT-1",
      },
    ],
  },

  // Ormonde Eng Ltd	T_OMNDW-1 -2.53 53.27

  {
    details: {
      code: "OMNDW",
      name: "Ormonde",
      coords: {
        lat: 53.27,
        lng: -2.53,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "T_OMNDW-1",
      },
    ],
  },
  // Pauls' Hill Aberlour	2_PPGEN002  -3.46 57.45

  {
    details: {
      code: "PHABL",
      name: "Pauls' Hill Aberlour",
      coords: {
        lat: 57.45,
        lng: -3.46,
      },
      fuelType: "biomass",
    },
    units: [
      {
        bmUnit: "2_PPGEN002",
      },
    ],
  },
  // Peterhead	T_PEHE-1 -1.87 57.53

  {
    details: {
      code: "PEHE",
      name: "Peterhead",
      coords: {
        lat: 57.53,
        lng: -1.87,
      },
      fuelType: "gas",
    },
    units: [
      {
        bmUnit: "T_PEHE-1",
      },
    ],
  },

  // Peterborough	E_PETEM1 -0.20 52.58

  {
    details: {
      code: "PETEM1",
      name: "Peterborough",
      coords: {
        lat: 52.58,
        lng: -0.2,
      },
      fuelType: "biomass",
    },
    units: [
      {
        bmUnit: "E_PETEM1",
      },
    ],
  },
  // Pogbie	T_PGBIW-1 -2.53 53.27

  {
    details: {
      code: "PGBIW",
      name: "Pogbie",
      coords: {
        lat: 53.27,
        lng: -2.53,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "T_PGBIW-1",
      },
    ],
  },
  // Pen y Cymoedd	T_PNYCW-1 -2.53 53.27

  {
    details: {
      code: "PNYCW",
      name: "Pen y Cymoedd",
      coords: {
        lat: 53.27,
        lng: -2.53,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "T_PNYCW-1",
      },
    ],
  },

  // Redditch Power Station	E_REDGT-1 -1.93 52.30

  {
    details: {
      code: "REDGT",
      name: "Redditch Power Station",
      coords: {
        lat: 52.3,
        lng: -1.93,
      },
      fuelType: "gas",
    },
    units: [
      {
        bmUnit: "E_REDGT-1",
      },
    ],
  },
  // Rampion Offshore Wind	T_RMPNO-1 T_RMPNO-2 0.27 50.67

  {
    details: {
      code: "RMPNO",
      name: "Rampion",
      coords: {
        lat: 50.67,
        lng: 0.27,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "T_RMPNO-1",
      },
      {
        bmUnit: "T_RMPNO-2",
      },
    ],
  },
  // Robin Rigg East	T_RREW-1 T_RRWW-1 -3.72	54.75

  {
    details: {
      code: "RREW",
      name: "Robin Rigg",
      coords: {
        lat: 54.75,
        lng: -3.72,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "T_RREW-1",
      },
      {
        bmUnit: "T_RRWW-1",
      },
    ],
  },

  // Rosehall	E_RSHLW-1 -2.53	53.27

  {
    details: {
      code: "RSHLW",
      name: "Rosehall",
      coords: {
        lat: 53.27,
        lng: -2.53,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "E_RSHLW-1",
      },
    ],
  },
  // Rye House Power Station	T_RYHPS-1 -2.53 53.27

  {
    details: {
      code: "RYHPS",
      name: "Rye House Power Station",
      coords: {
        lat: 53.27,
        lng: -2.53,
      },
      fuelType: "gas",
    },
    units: [
      {
        bmUnit: "T_RYHPS-1",
      },
    ],
  },
  // Sanquhar	T_SANQW-1 -2.53 53.27

  {
    details: {
      code: "SANQW",
      name: "Sanquhar",
      coords: {
        lat: 53.27,
        lng: -2.53,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "T_SANQW-1",
      },
    ],
  },

  // Sloy	M_SLOY-1 T_SLOY-2 T_SLOY-3 	M_SLOY-4 -4.74	56.20

  {
    details: {
      code: "SLOY",
      name: "Sloy",
      coords: {
        lat: 56.2,
        lng: -4.74,
      },
      fuelType: "hydro",
    },
    units: [
      {
        bmUnit: "M_SLOY-1",
      },
      {
        bmUnit: "T_SLOY-2",
      },
      {
        bmUnit: "T_SLOY-3",
      },
      {
        bmUnit: "M_SLOY-4",
      },
    ],
  },

  //  Stronelairg 4.46	57.10 T_STLGW-1, T_STLGW-2, T_STLGW-3

  {
    details: {
      code: "STLGW",
      name: "Stronelairg",
      coords: {
        lat: 57.1,
        lng: 4.46,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "T_STLGW-1",
      },
      {
        bmUnit: "T_STLGW-2",
      },
      {
        bmUnit: "T_STLGW-3",
      },
    ],
  },

  // Stathy North T_STRNW-1 2.53 53.27

  {
    details: {
      code: "STRNW",
      name: "Stathy North",
      coords: {
        lat: 53.27,
        lng: 2.53,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "T_STRNW-1",
      },
    ],
  },

  // sutton bridge 0.10 52.62

  {
    details: {
      code: "SUTB",
      name: "Sutton Bridge",
      coords: {
        lat: 52.62,
        lng: 0.1,
      },
      fuelType: "gas",
    },
    units: [
      {
        bmUnit: "T_SUTB-1",
      },
    ],
  },

  // Severn Power 3.07 51.74 T_SVRP-10 T_SVRP-20

  {
    details: {
      code: "SVRP",
      name: "Severn Power",
      coords: {
        lat: 51.74,
        lng: -3.07,
      },
      fuelType: "gas",
    },
    units: [
      {
        bmUnit: "T_SVRP-10",
      },
      {
        bmUnit: "T_SVRP-20",
      },
    ],
  },

  //   Taylors Lane	E_TAYL2G 	E_TAYL3G -0.26 51.55

  {
    details: {
      code: "TAYL",
      name: "Taylors Lane",
      coords: {
        lat: 51.55,
        lng: -0.26,
      },
      fuelType: "gas",
    },
    units: [
      {
        bmUnit: "E_TAYL2G",
      },
      {
        bmUnit: "E_TAYL3G",
      },
    ],
  },

  // Toddleburn	T_TDBNW-1 -2.53 53.27

  {
    details: {
      code: "TDBNW",
      name: "Toddleburn",
      coords: {
        lat: 53.27,
        lng: -2.53,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "T_TDBNW-1",
      },
    ],
  },
  // Thanet Offshore Wind	T_THNTO-1 	T_THNTO-2 1.46 51.39

  {
    details: {
      code: "THNTO",
      name: "Thanet",
      coords: {
        lat: 51.39,
        lng: 1.46,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "T_THNTO-1",
      },
      {
        bmUnit: "T_THNTO-2",
      },
    ],
  },

  // Tullymurdoch	E_TLYMW-1 -3.29 56.67

  {
    details: {
      code: "TLYMW",
      name: "Tullymurdoch",
      coords: {
        lat: 56.67,
        lng: -3.29,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "E_TLYMW-1",
      },
    ],
  },

  // Tralorg	T_TRLGW-1 -2.53 53.27

  {
    details: {
      code: "TRLGW",
      name: "Tralorg",
      coords: {
        lat: 53.27,
        lng: -2.53,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "T_TRLGW-1",
      },
    ],
  },
  // MGT Teesside	T_TSREP-1 -2.53 53.27

  {
    details: {
      code: "TSREP",
      name: "MGT Teesside",
      coords: {
        lat: 53.27,
        lng: -2.53,
      },
      fuelType: "biomass",
    },
    units: [
      {
        bmUnit: "T_TSREP-1",
      },
    ],
  },
  // Tullo, Laurencekirk	E_TULWW-1 -2.53 53.27

  {
    details: {
      code: "TULWW",
      name: "Tullo",
      coords: {
        lat: 53.27,
        lng: -2.53,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "E_TULWW-1",
      },
      {
        bmUnit: "E_TULWW-2",
      },
    ],
  },
  // twent T_TWSHW-1 -3.92 55.32

  {
    details: {
      code: "TWENT",
      name: "Twent",
      coords: {
        lat: 55.32,
        lng: -3.92,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "T_TWSHW-1",
      },
    ],
  },

  // T_WDRGW-1 2.53 53.27 T_WDRGW-1

  {
    details: {
      code: "WDRGW",
      name: "T_WDRGW-1",
      coords: {
        lat: 53.27,
        lng: 2.53,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "T_WDRGW-1",
      },
    ],
  },

  // Whiteside Hill T_WHIHW-1 -2.53 53.27

  {
    details: {
      code: "WHIHW",
      name: "Whiteside Hill",
      coords: {
        lat: 53.27,
        lng: -2.53,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "T_WHIHW-1",
      },
      {
        bmUnit: "T_WHIHW-2",
      },
    ],
  },

  // Wilton T_WILCT-1 -2.53	53.27

  {
    details: {
      code: "WILCT",
      name: "Wilton",
      coords: {
        lat: 53.27,
        lng: -2.53,
      },
      fuelType: "gas",
    },
    units: [
      {
        bmUnit: "T_WILCT-1",
      },
    ],
  },

  // E_WINN-1 Winnington -2.53	53.27

  {
    details: {
      code: "WINN",
      name: "Winnington",
      coords: {
        lat: 53.27,
        lng: -2.53,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "E_WINN-1",
      },
    ],
  },

  // Windy Standard II -4.18 55.27 T_WISTW-2

  {
    details: {
      code: "WISTW",
      name: "Windy Standard II",
      coords: {
        lat: 55.27,
        lng: -4.18,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "T_WISTW-2",
      },
    ],
  },

  // Wethergar T_WTGRW-1 2.53 53.27

  {
    details: {
      code: "WTGRW",
      name: "Wethergar",
      coords: {
        lat: 53.27,
        lng: 2.53,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "T_WTGRW-1",
      },
    ],
  },

  // T_SOKYW-1 -2.53	53.27 South Kyle

  {
    details: {
      code: "SOKYW",
      name: "South Kyle",
      coords: {
        lat: 53.27,
        lng: -2.53,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "T_SOKYW-1",
      },
    ],
  },

  //Kennoxhead T_KENNW-1 55.49831806503957, -3.9137355183118387

  {
    details: {
      code: "KENNW",
      name: "Kennoxhead",
      coords: {
        lat: 55.49831806503957,
        lng: -3.9137355183118387,
      },
      fuelType: "wind",
    },
    units: [
      {
        bmUnit: "T_KENNW-1",
      },
    ],
  },

  // Pinfold

  {
    details: {
      code: "PINF",
      name: "Pinfold",
      coords: {
        lat: 53.26596802790049, 
        lng: -2.941941529015923
      },
      fuelType: "battery",
    },
    units: [
      {
        bmUnit: "T_PINFB-1",
      },
      {
        bmUnit: "T_PINFB-2",
      },
      {
        bmUnit: "T_PINFB-3",
      },
      {
        bmUnit: "T_PINFB-4",
      },
      {
        bmUnit: "T_PINFD-5",
      },
      {
        bmUnit: "T_PINFD-6",
      },
    ],
  },

  // E_BROUD-1 2.53 53.27
  // kype muir T_KYPEW-1
  // E_TGP1
  // T_DRGW-1
  // T_HAADHW-1
  // T_DOUGW-1
  // E_GRGRW-1
  // T_DALQW-1
  // T_CUMHW-1
  // E_BETHW-1
  // T_GNFSW-1
  // E_BLARW-1
  // E_ASLVW-1
  // T_DBAWO-1
  // T_SAKNW-1
  // E_CRGTW-1
  // T_CASKD-1
  // T_WISHB-1
  // T_TINSD-1

  // T__KYELT003
];

// convert to a dictionary with code as key
export const unitGroupsDict: UnitGroupsDict = {};
for (const ug of unitGroups) {
  if(ug.details.code) unitGroupsDict[ug.details.code] = ug;
}
