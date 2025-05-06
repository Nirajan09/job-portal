"use client";
import {
  candidateOnBoardForm,
  initialAccountCandidateFormData,
  initialCandidateFormData,
  intialRecruiterFormData,
  recruiterOnboardForm,
} from "@/utils";
import React, { useEffect, useState } from "react";
import CommonForm from "../common-form";
import { UpdateProfileAction } from "@/actions";

const AccountInfo = ({ profileInfo }) => {
  const [candidateFormData, setCandidateformData] = useState(
    initialAccountCandidateFormData
  );
  const [recruiterFormData, setRecruiterformData] = useState(
    intialRecruiterFormData
  );

  useEffect(() => {
    if (profileInfo?.role == "recruiter")
      setRecruiterformData(profileInfo?.recruiterInfo);
    if (profileInfo?.role == "candidate")
      setCandidateformData(profileInfo?.candidateInfo);
  }, [profileInfo]);

  const handleUpdateAccount = async () => {
    await UpdateProfileAction(
      profileInfo?.role === "candidate"
        ? {
            _id: profileInfo?._id,
            userId: profileInfo?.userId,
            email: profileInfo?.email,
            role: profileInfo?.role,
            isPremiumUser: profileInfo?.isPremiumUser,
            memberShipType: profileInfo?.memeberShipType,
            memeberShipStartDate: profileInfo?.memeberShipStartDate,
            memberShipEndDate: profileInfo?.memberShipEndDate,
            candidateInfo: {
              ...candidateFormData,
              resume: profileInfo?.candidateInfo?.resume,
            },
          }
        : {
            _id: profileInfo?._id,
            userId: profileInfo?.userId,
            email: profileInfo?.email,
            role: profileInfo?.role,
            isPremiumUser: profileInfo?.isPremiumUser,
            memberShipType: profileInfo?.memeberShipType,
            memeberShipStartDate: profileInfo?.memeberShipStartDate,
            memberShipEndDate: profileInfo?.memberShipEndDate,
            recruiterInfo: {
              ...recruiterFormData,
            },
          },
      "/acccount"
    );
  };
  return (
    <div className="mx-auto p-6 lg:p-8">
      <div className="flex items-baseline justify-between py-4">
        <h1 className="text-4xl font-bold tracking-tight text-gray-950">
          Account Details
        </h1>
      </div>
      <div className="pt-4">
        <div>
          <CommonForm
            action={handleUpdateAccount}
            formControls={
              profileInfo?.role === "candidate"
                ? candidateOnBoardForm.filter(
                    (formControl) => formControl.name !== "resume"
                  )
                : recruiterOnboardForm
            }
            formData={
              profileInfo?.role === "candidate"
                ? candidateFormData
                : recruiterFormData
            }
            setFormData={
              profileInfo?.role === "recruiter"
                ? setRecruiterformData
                : setCandidateformData
            }
            ButtonText="Update Profile"
          />
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;
