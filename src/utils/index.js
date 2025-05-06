import qs from "query-string"

export const recruiterOnboardForm = [
  {
    label: "Name",
    name: "name",
    placeholder: "Enter your Name",
    componentType: "input",
  },
  {
    label: "Company Name",
    name: "companyName",
    placeholder: "Enter your Company Name",
    componentType: "input",
  },
  {
    label: "Company Role",
    name: "companyRole",
    placeholder: "Enter your Company Role",
    componentType: "input",
  },
];
export const intialRecruiterFormData = {
  name: "",
  companyName: "",
  companyRole: "",
};

export const candidateOnBoardForm = [
  {
    label: "Resume",
    name: "resume",
    componentType: "file",
  },
  {
    label: "Name",
    name: "name",
    placeholder: "Enter your name",
    componentType: "input",
  },
  {
    label: "Current Company",
    name: "currentCompany",
    placeholder: "Enter your Current Company",
    componentType: "input",
  },
  {
    label: "Current Job Location",
    name: "currentjobLocation",
    placeholder: "Enter your Current Job Location",
    componentType: "input",
  },
  {
    label: "Preferred Job Location",
    name: "preferredjobLocation",
    placeholder: "Enter your Preferred Job Location",
    componentType: "input",
  },
  {
    label: "Current Salary",
    name: "currentSalary",
    placeholder: "Enter your Current Salary",
    componentType: "input",
  },
  {
    label: "Notice Period",
    name: "noticePeriod",
    placeholder: "Enter your Notice Period",
    componentType: "input",
  },
  {
    label: "Skills",
    name: "skills",
    placeholder: "Enter your skills",
    componentType: "input",
  },
  {
    label: "Previous Companies",
    name: "previousCompanies",
    placeholder: "Enter your Previous Companies",
    componentType: "input",
  },
  {
    label: "Total Experience",
    name: "totalExperience",
    placeholder: "Enter your total experience",
    componentType: "input",
  },
  {
    label: "College",
    name: "college",
    placeholder: "Enter your College",
    componentType: "input",
  },
  {
    label: "College Location",
    name: "collegeLocation",
    placeholder: "Enter your College Location",
    componentType: "input",
  },
  {
    label: "Graduated Year",
    name: "graduatedYear",
    placeholder: "Enter your Graduated Year",
    componentType: "input",
  },
  {
    label: "Linkedin Profile",
    name: "linkedinProfile",
    placeholder: "Enter your Linkedin Profile",
    componentType: "input",
  },
  {
    label: "Github Profile",
    name: "githubProfile",
    placeholder: "Enter your Github Profile",
    componentType: "input",
  },
];

export const accountOnBoardForm = [
  {
    label: "Name",
    name: "name",
    placeholder: "Enter your name",
    componentType: "input",
  },
  {
    label: "Current Company",
    name: "currentCompany",
    placeholder: "Enter your Current Company",
    componentType: "input",
  },
  {
    label: "Current Job Location",
    name: "currentjobLocation",
    placeholder: "Enter your Current Job Location",
    componentType: "input",
  },
  {
    label: "Preferred Job Location",
    name: "preferredjobLocation",
    placeholder: "Enter your Preferred Job Location",
    componentType: "input",
  },
  {
    label: "Current Salary",
    name: "currentSalary",
    placeholder: "Enter your Current Salary",
    componentType: "input",
  },
  {
    label: "Notice Period",
    name: "noticePeriod",
    placeholder: "Enter your Notice Period",
    componentType: "input",
  },
  {
    label: "Skills",
    name: "skills",
    placeholder: "Enter your skills",
    componentType: "input",
  },
  {
    label: "Previous Companies",
    name: "previousCompanies",
    placeholder: "Enter your Previous Companies",
    componentType: "input",
  },
  {
    label: "Total Experience",
    name: "totalExperience",
    placeholder: "Enter your total experience",
    componentType: "input",
  },
  {
    label: "College",
    name: "college",
    placeholder: "Enter your College",
    componentType: "input",
  },
  {
    label: "College Location",
    name: "collegeLocation",
    placeholder: "Enter your College Location",
    componentType: "input",
  },
  {
    label: "Graduated Year",
    name: "graduatedYear",
    placeholder: "Enter your Graduated Year",
    componentType: "input",
  },
  {
    label: "Linkedin Profile",
    name: "linkedinProfile",
    placeholder: "Enter your Linkedin Profile",
    componentType: "input",
  },
  {
    label: "Github Profile",
    name: "githubProfile",
    placeholder: "Enter your Github Profile",
    componentType: "input",
  },
];

export const initialCandidateFormData={
    resume:'',
    name:'',
    currentCompany:'',
    currentjobLocation:'',
    preferredjobLocation:'',
    currentSalary:'',
    noticePeriod:'',
    skills:'',
    previousCompanies:'',
    totalExperience:'',
    college:'',
    collegeLocation:'',
    graduatedYear:'',
    linkedinProfile:'',
    githubProfile:'',
}
export const initialAccountCandidateFormData={
    name:'',
    currentCompany:'',
    currentjobLocation:'',
    preferredjobLocation:'',
    currentSalary:'',
    noticePeriod:'',
    skills:'',
    previousCompanies:'',
    totalExperience:'',
    college:'',
    collegeLocation:'',
    graduatedYear:'',
    linkedinProfile:'',
    githubProfile:'',
}

export const postNewJobFormControls=[
  {
    label:"Company Name",
    name:"companyName",
    placeholder:"Company Name",
    componentType:'input',
    disabled:true
  },
  {
    label:"Title",
    name:"title",
    placeholder:"Job Title",
    componentType:'input'
  },
  {
    label:"Type",
    name:"type",
    placeholder:"Job Type",
    componentType:'input'
  },
  {
    label:"Location",
    name:"location",
    placeholder:"Job Location",
    componentType:'input'
  },
  {
    label:"Experience",
    name:"experience",
    placeholder:"Experience",
    componentType:'input'
  },
  {
    label:"Description",
    name:"description",
    placeholder:"Description",
    componentType:'input'
  },
  {
    label:"Skills",
    name:"skills",
    placeholder:"Skills",
    componentType:'input'
  },
]

export const postNewJobFormData={
  companyName:'',
  title:'',
  type:'',
  location:'',
  experience:'',
  description:'',
  skills:''
}

export const filterMenuData=[
  {
    id:"companyName",
    label:"Company Name",
  },
  {
    id:"title",
    label:"Title",
  },
  {
    id:"type",
    label:"Type",
  },
  {
    id:"location",
    label:"Location",
  },
]

export const formUrlQuery=({params,dataToAdd})=>{
  let currentURL=qs.parse(params);
  if(Object.keys(dataToAdd).length>0){
    Object.keys(dataToAdd).map(key=>{
      if(dataToAdd[key].length===0) delete currentURL[key];
      else currentURL[key]=dataToAdd[key].join(",");
    })
  }
  return qs.stringifyUrl({
    url:window.location.pathname,
    query:currentURL,
  },{skipNull:true})}


  export const membershipPlans=[
    {
      heading:"Tier 1",
      price:250,
      type:'Basic',
    },
    {
      heading:"Tier 2",
      price:2500,
      type:'Teams',
    },
    {
      heading:"Tier 3",
      price:5000,
      type:'Enterprise',
    },
  ]