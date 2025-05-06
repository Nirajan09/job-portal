import React, { Fragment, useState } from "react";
import CommonCard from "../common-card";
import JobIcon from "../job-icon";
import { Button } from "../ui/button";
import JobApplicants from "../job-applicants";

const RecruiterJobCard = ({ JobItem, getJobApplicationList }) => {

  const [showApplicantsdrawer,setshowApplicantsdrawer]=useState(false)
  const [currentCandidateDetails,setCurrentCandidateDetails]=useState(null)
  const [showCurrentCandidateDetailsModel,setShowCurrentCandidateDetailsModel]=useState(false)

  return (
    <Fragment>
      <CommonCard
        title={JobItem?.title}
        description={JobItem?.description}
        icon={<JobIcon />}
        footerContent={
          <Button disabled={getJobApplicationList.filter((item) => item.jobID === JobItem?._id)
            .length===0} onClick={()=>setshowApplicantsdrawer(true)} className="disabled:opacity-50 flex h-11 items-centr justify-center">
            {
              getJobApplicationList.filter((item) => item.jobID === JobItem?._id)
                .length
            }{" "}
            Applicants
          </Button>
        }
        />
        <JobApplicants
        showApplicantsdrawer={showApplicantsdrawer}
        setshowApplicantsdrawer={setshowApplicantsdrawer}
        currentCandidateDetails={currentCandidateDetails}
        setCurrentCandidateDetails={setCurrentCandidateDetails}
        showCurrentCandidateDetailsModel={showCurrentCandidateDetailsModel}
        setShowCurrentCandidateDetailsModel={setShowCurrentCandidateDetailsModel}
        JobItem={JobItem}
        getJobApplicationList={getJobApplicationList.filter(item=>item.jobID===JobItem?._id)}
        />
    </Fragment>
  );
};

export default RecruiterJobCard;
