"use client";

import React, { Fragment } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import {
  getCandidateDetailsByIDAction,
  updateJobApplicationAction,
} from "@/actions";
import { createClient } from "@supabase/supabase-js";

const CandidateList = ({
  currentCandidateDetails,
  setCurrentCandidateDetails,
  getJobApplicationList,
  showCurrentCandidateDetailsModel,
  setShowCurrentCandidateDetailsModel,
}) => {
  const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
  console.log(process.env.SUPABASE_URI);
  const handleFetchCandidateDetails = async (id) => {
    const data = await getCandidateDetailsByIDAction(id);
    if (data) {
      setCurrentCandidateDetails(data);
      setShowCurrentCandidateDetailsModel(true);
    }
  };

  const handleResume = () => {
    const { data } = supabaseClient.storage
      .from("job-portal-public")
      .getPublicUrl(currentCandidateDetails?.candidateInfo?.resume);
    const a = document.createElement("a");
    a.href = data?.publicUrl;
    a.setAttribute("download", "Resume.pdf");
    a.setAttribute("target", "_blank");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleUpdateJobStatus = async (getStatus) => {
    let cpyJobApplicants = [...getJobApplicationList];
    const indexOfcurrentJobApplicant = cpyJobApplicants.findIndex(
      (item) => item.candidateUserID === currentCandidateDetails?.userId
    );

    const jobApplicantsToUpdate = {
      ...cpyJobApplicants[indexOfcurrentJobApplicant],
      status:
        cpyJobApplicants[indexOfcurrentJobApplicant].status.concat(getStatus),
    };
    await updateJobApplicationAction(jobApplicantsToUpdate, "/jobs");
  };
  return (
    <Fragment>
      <div className="grid grid-cols-1 gap-3 p-10 md:grid-cols-2 lg:grid-cols-3">
        {getJobApplicationList && getJobApplicationList.length > 0
          ? getJobApplicationList.map((item) => (
              <div className="bg-white shadow-lg w-full max-w-sm rounded-lg overflow-hidden mx-auto mt-4">
                <div className="px-4 my-6 flex justify-between items-center">
                  <h3 className="text-lg font-bold">{item?.name}</h3>
                  <Button
                  key={item.id}
                    onClick={() =>
                      handleFetchCandidateDetails(item?.candidateUserID)
                    }
                    className="flex h-11 items-center justify-center px-5"
                  >
                    View Profile
                  </Button>
                </div>
              </div>
            ))
          : null}
      </div>
      <Dialog
        open={showCurrentCandidateDetailsModel}
        onOpenChange={() => {
          setCurrentCandidateDetails(null);
          setShowCurrentCandidateDetailsModel(false);
        }}
      >
        <DialogContent>
          <DialogHeader>
    <DialogTitle>Profile Details</DialogTitle>
  </DialogHeader>
          <div>
            <h1 className="text-2xl font-bold text-black">
              {currentCandidateDetails?.candidateInfo?.name},
              {currentCandidateDetails?.email}
            </h1>
            <p className="text-xl font-medium text-black">
              {currentCandidateDetails?.candidateInfo?.currentCompany}
            </p>
            <p className="text-sm font-normal text-black">
              {currentCandidateDetails?.candidateInfo?.currentjobLocation}
            </p>
            <p className="text-sm font-normal text-black">
              Total Experience:{" "}
              {currentCandidateDetails?.candidateInfo?.totalExperience} Years
            </p>
            <p className="text-sm font-normal text-black">
              Salary: {currentCandidateDetails?.candidateInfo?.currentSalary}{" "}
              LPA
            </p>
            <p className="text-sm font-normal text-black">
              Notice Period:{" "}
              {currentCandidateDetails?.candidateInfo?.noticePeriod} days
            </p>
            <div className="flex gap-4 mt-6 items-center">
              <h1>Previous Companies</h1>
              <div className="flex flex-wrap gap-4 mt-6 items-center">
                {currentCandidateDetails?.candidateInfo?.previousCompanies
                  .split(",")
                  .map((skill) => (
                    <div className="flex w-[100px]  justify-center items-center h-[35px] bg-black rounded-[4px]">
                      <h2 className="text-[13px] font-medium text-white">
                        {skill}
                      </h2>
                    </div>
                  ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-4 mt-6">
              {currentCandidateDetails?.candidateInfo?.skills
                .split(" ")
                .map((skill) => (
                  <div className="flex w-[100px]  justify-center items-center h-[35px] bg-black rounded-[4px]">
                    <h2 className="text-[13px] font-medium text-white">
                      {skill}
                    </h2>
                  </div>
                ))}
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={handleResume}
              className="flex h-11 items-center justify-center px-5"
            >
              Resume
            </Button>
            <Button
              onClick={() => handleUpdateJobStatus("Selected")}
              disabled={
                getJobApplicationList
                  .find(
                    (item) =>
                      item.candidateUserID === currentCandidateDetails?.userId
                  )
                  ?.status.includes("Selected") ||
                getJobApplicationList
                  .find(
                    (item) =>
                      item.candidateUserID === currentCandidateDetails?.userId
                  )
                  ?.status.includes("Rejected")
                  ? true
                  : false
              }
              className="disabled:opacity-65 flex h-11 items-center justify-center px-5"
            >
              {getJobApplicationList
                .find(
                  (item) =>
                    item.candidateUserID === currentCandidateDetails?.userId
                )
                ?.status.includes("Selected")
                ? "Selected"
                : "Select"}
            </Button>
            <Button
              onClick={() => handleUpdateJobStatus("Rejected")}
              disabled={
                getJobApplicationList
                  .find(
                    (item) =>
                      item.candidateUserID === currentCandidateDetails?.userId
                  )
                  ?.status.includes("Rejected") ||
                getJobApplicationList
                  .find(
                    (item) =>
                      item.candidateUserID === currentCandidateDetails?.userId
                  )
                  ?.status.includes("Selected")
                  ? true
                  : false
              }
              className="disabled:opacity-65 flex h-11 items-center justify-center px-5"
            >
              {getJobApplicationList
                .find(
                  (item) =>
                    item.candidateUserID === currentCandidateDetails?.userId
                )
                ?.status.includes("Rejected")
                ? "Rejected"
                : "Reject"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default CandidateList;
