"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CommonForm from "../common-form";
import {
  candidateOnBoardForm,
  initialCandidateFormData,
  intialRecruiterFormData,
  recruiterOnboardForm,
} from "@/utils";
import { useUser } from "@clerk/nextjs";
import { createClient } from "@supabase/supabase-js";
import createProfileAction from "@/actions";
import { useRouter } from "next/navigation";
const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

const OnBoard = () => {
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState("candidate");
  const [recruiterFormData, setRecruiterFormData] = useState(
    intialRecruiterFormData,
  );
  const [candidateFormData, setCandidateFormData] = useState(
    initialCandidateFormData,
  );
  const [file, setFile] = useState(null);
  const handleFileChange = (event) => {
    event.preventDefault();
    setFile(event.target.files[0]);
  };

  const handleUploadPdfToSupabase = async () => {
  console.log("Uploading resume...");

  const { data, error } = await supabaseClient.storage
    .from("job-portal-public")
    .upload(`/public/${file.name}`, file);

  if (data) {
    console.log("Upload success:", data.path);

    setCandidateFormData((prev) => ({
      ...prev,
      resume: data.path,
    }));
  }
};

  useEffect(() => {
    if (file) handleUploadPdfToSupabase();
  }, [file]);
  const currentAuthUser = useUser();
  const { user } = currentAuthUser;

  const validateRecruiter = () => {
    return (
      recruiterFormData.name.trim() !== "" &&
      recruiterFormData.companyName.trim() !== "" &&
      recruiterFormData.companyRole.trim() !== ""
    );
  };

  const handleTabChange = (value) => {
    setCurrentTab(value);
  };

  const validateCandidate = () => {
    return Object.values(candidateFormData).every((value) => {
      if (typeof value === "string") {
        return value.trim() !== "";
      }
      return value !== null && value !== undefined;
    });
  };
  const RefreshPage = () => {
    router.refresh();
  };
  const createProfile = async () => {
    const data =
      currentTab === "candidate"
        ? {
            candidateInfo: candidateFormData,
            role: "candidate",
            isPremiumUser: false,
            userId: user?.id,
            email: user?.primaryEmailAddress?.emailAddress,
          }
        : {
            recruiterInfo: recruiterFormData,
            role: "recruiter",
            isPremiumUser: false,
            userId: user?.id,
            email: user?.primaryEmailAddress?.emailAddress,
          };

    await createProfileAction(data);
    router.refresh();
  };
  return (
    <div className=" p-6 lg:p-8">
      <Tabs value={currentTab} onValueChange={handleTabChange}>
        <div className="w-full ">
          <div className="flex items-baseline justify-between flex-col gap-4 md:flex-row border-b py-4">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              Welcome to OnBoarding
            </h1>
            <TabsList>
              <TabsTrigger value="candidate">Candidate</TabsTrigger>
              <TabsTrigger value="recruiter">Recruiter</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="candidate">
            <CommonForm
              action={createProfile}
              formControls={candidateOnBoardForm}
              ButtonText={"OnBoard as Candidate"}
              formData={candidateFormData}
              isBtnDisabled={!validateCandidate()}
              setFormData={setCandidateFormData}
              handleFileChange={handleFileChange}
            />
          </TabsContent>
          <TabsContent value="recruiter">
            <CommonForm
              formControls={recruiterOnboardForm}
              ButtonText={"OnBoard as Recruiter"}
              formData={recruiterFormData}
              setFormData={setRecruiterFormData}
              isBtnDisabled={!validateRecruiter()}
              action={createProfile}
              RefreshPage={RefreshPage}
            />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default OnBoard;
