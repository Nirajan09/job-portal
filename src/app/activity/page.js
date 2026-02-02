export const dynamic = "force-dynamic";
import {
  fetchJobApplicationForCandidate,
  fetchJobCandidateAction,
} from "@/actions";
import CandidateActivity from "@/components/Candidate-Activity";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

const Activity = async () => {
  const user = await currentUser();
  const jobList = await fetchJobCandidateAction();
  const jobApplicants = await fetchJobApplicationForCandidate(user?.id);
 
  return <CandidateActivity jobList={jobList} jobApplicants={jobApplicants} />;
};

export default Activity;
