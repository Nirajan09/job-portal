export const dynamic = "force-dynamic";
import {
  createFilterCategoryAction,
  fetchJobApplicationForCandidate,
  fetchJobApplicationForRecruiter,
  fetchJobCandidateAction,
  fetchJobRecruiterAction,
  fetchProfileAction,
} from "@/actions";
import JobListing from "@/components/job-listing";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const JobsPage = async ({searchParams}) => {
  const params = await searchParams;
  const user = await currentUser();
  const profileInfo = await fetchProfileAction(user?.id);

  const jobList =
    profileInfo?.role === "candidate"
      ? await fetchJobCandidateAction(params)
      : await fetchJobRecruiterAction(user?.id);

  const getJobApplicationList =
    profileInfo?.role === "candidate"
      ? await fetchJobApplicationForCandidate(user?.id)
      : await fetchJobApplicationForRecruiter(user?.id);

  if(user===null){
    redirect("/")
  }
  if(!profileInfo?.role){
    redirect("/onboard")
  }
  const fetchFilterCategories=await createFilterCategoryAction();
  return (
    <JobListing
      user={JSON.parse(JSON.stringify(user))}
      profileInfo={profileInfo}
      jobList={jobList}
      getJobApplicationList={getJobApplicationList}
      fetchFilterCategories={fetchFilterCategories}
      
    />
  );
};

export default JobsPage;
