"use server";

const { default: connectToDB } = require("@/database");
import Profile from "@/models";
import Application from "@/models/application";
import Job from "@/models/job";
const { revalidatePath } = require("next/cache");

const stripe =require('stripe')(process.env.STRIPE_URI)
// Create Profile Action
const createProfileAction = async (formData) => {
  try {
    await connectToDB(); // Ensure the database connection is established
    await Profile.create(formData); // Create a new profile document

   
  } catch (error) {
    console.error("Error creating profile:", error);
    throw new Error("Failed to create profile.");
  }
};

export default createProfileAction;

// Fetch Profile Action
export const fetchProfileAction = async (id) => {
  await connectToDB();
  const result = await Profile.findOne({ userId: id });
  return JSON.parse(JSON.stringify(result));
};

//create job action
export const CreateJobAction = async (formData) => {
  try {
    await connectToDB();
    await Job.create(formData);
  } catch (error) {
    console.log(error);
  }
};

//fetch job action
//recruiter
export const fetchJobRecruiterAction = async (id) => {
  try {
    await connectToDB();
    const result = await Job.find({ recruiterId: id });
    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    console.log(error);
  }
};

//candidate

export const fetchJobCandidateAction = async (filterParams = {}) => {
  try {
    await connectToDB();
    let updatedParams = {};
    Object.keys(filterParams).forEach((filterKey) => {
      updatedParams[filterKey] = { $in: filterParams[filterKey].split(",") };
    });
    const result = await Job.find(
      filterParams && Object.keys(filterParams).length > 0 ? updatedParams : {}
    );
    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    console.log(error);
  }
};

//create job application
export const createJobApplicationAction = async (data) => {
  await connectToDB();
  await Application.create(data);
};

//create job application - candidate
export const fetchJobApplicationForCandidate = async (candidateId) => {
  await connectToDB();

  const result = await Application.find({ candidateUserID: candidateId });
  return JSON.parse(JSON.stringify(result));
};

//create job application - recruiter
export const fetchJobApplicationForRecruiter = async (recruiterId) => {
  await connectToDB();

  const result = await Application.find({ recruiterUserID: recruiterId });
  return JSON.parse(JSON.stringify(result));
};

//Candidate details through ID

export const getCandidateDetailsByIDAction = async (candidateID) => {
  await connectToDB();
  const result = await Profile.findOne({ userId: candidateID });
  return JSON.parse(JSON.stringify(result));
};

//update job application
export const updateJobApplicationAction = async (data, pathToRevalidate) => {
  const {
    recruiterUserID,
    name,
    email,
    candidateUserID,
    status,
    jobID,
    _id,
    jobAppliedDate,
  } = data;
  await Application.findOneAndUpdate(
    { _id: _id },
    {
      recruiterUserID,
      name,
      email,
      candidateUserID,
      status,
      jobID,
      jobAppliedDate,
    },
    { new: true }
  );
  revalidatePath(pathToRevalidate);
};

//create Filter categories
export const createFilterCategoryAction = async () => {
  await connectToDB();
  const result = await Job.find({});

  return JSON.parse(JSON.stringify(result));
};

//Update profile info
export const UpdateProfileAction = async (data, pathToRevalidate) => {
  await connectToDB();
  const {
    userId,
    role,
    email,
    isPremiumUser,
    memberShipType,
    memeberShipStartDate,
    memberShipEndDate,
    recruiterInfo,
    candidateInfo,
    _id,
  } = data;
  await Profile.findOneAndUpdate({_id:_id},{userId,
    role,
    email,
    isPremiumUser,
    memberShipType,
    memeberShipStartDate,
    memberShipEndDate,
    recruiterInfo,
    candidateInfo,},{new:true})
    revalidatePath(pathToRevalidate)
};


// create stripe priceid based on tier
export const createPriceIDAction=async(data)=>{
  const session=await stripe.prices.create({
    currency:"USD",
    unit_amount:data?.amount*100,
    recurring:{
      interval:'year'
    },
    product_data:{
      name:"Premium Plan"
    }
  })
  return {
    success:true,
    id:session?.id,
  }
}

// payment logic
export const createPaymentStripe=async(data)=>{
    const session=await stripe.checkout.sessions.create({
      payment_method_types:["card"],
      line_items:data?.lineItems,
      mode:'subscription',
      success_url:"https://job-portal-sable-seven.vercel.app/membership"+"?status=success",
      cancel_url:'https://job-portal-sable-seven.vercel.app/membership'+"?status=cancel",
    })
    return {
      success:true,
      id:session?.id,
    }
}