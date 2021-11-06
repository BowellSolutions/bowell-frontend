interface Patient {
  id: number,
  first_name: string,
  last_name: string,
  email: string,
}

export const patientsData: Patient[] = [
  {
    id: 1,
    first_name: "",
    last_name: "",
    email: "",
  },
  {
    id: 2,
    first_name: "",
    last_name: "",
    email: "",
  },
  {
    id: 3,
    first_name: "",
    last_name: "",
    email: "",
  },
];

export const tablesTableData = [
  {
    logo: "",
    name: "Esthera Jackson",
    email: "alexa@simmmple.com",
    subdomain: "Manager",
    domain: "Organization",
    status: "Online",
    date: "14/06/21",
  },
  {
    logo: "",
    name: "Alexa Liras",
    email: "laurent@simmmple.com",
    subdomain: "Programmer",
    domain: "Developer",
    status: "Offline",
    date: "12/05/21",
  },
  {
    logo: "",
    name: "Laurent Michael",
    email: "laurent@simmmple.com",
    subdomain: "Executive",
    domain: "Projects",
    status: "Online",
    date: "07/06/21",
  },
  {
    logo: "",
    name: "Freduardo Hill",
    email: "freduardo@simmmple.com",
    subdomain: "Manager",
    domain: "Organization",
    status: "Online",
    date: "14/11/21",
  },
];


interface Recording {
  id: number,
  name: string,
  date: Date,
}


interface Examination {
  name: string,
  email: string,
  date: Date,
  status: string,
  recording: null | Recording,
}

export const examinationsData: Examination[] = [
  {
    name: "Oliver Liam",
    email: "oliver@burrito.com",
    date: new Date(),
    status: "File Uploaded",
    recording: {
      id: 1,
      name: "fart.wav",
      date: new Date()
    }
  },
  {
    name: "Lucas Stone",
    email: "lucas@stone.com",
    date: new Date(),
    status: "Cancelled",
    recording: null,
  },
  {
    name: "Marian James",
    email: "ethan@fiber.com",
    date: new Date(),
    status: "Examination Completed",
    recording: null,
  },
];


export const recordingsData: Recording[] = [
  {
    id: 4,
    name: "fwefwe52w3482-0aasd.wav",
    date: new Date(),
  },
  {
    id: 3,
    name: "asdfgas34234sdvf.wav",
    date: new Date(),
  },
  {
    id: 1,
    name: "ffaweartt.wav",
    date: new Date(),
  },
];
