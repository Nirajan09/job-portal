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
const supabaseClient= createClient("https://akdqebxurkjfsvoahrao.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFrZHFlYnh1cmtqZnN2b2FocmFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU1NTIyMTAsImV4cCI6MjA1MTEyODIxMH0.4qqOSjCC-ARDt6JXMg06kmh6hyXWD8BlUvAsELZQ8u8")

const OnBoard = () => {
  const router=useRouter()
  const [currentTab, setCurrentTab] = useState("candidate");
  const [recruiterFormData, setRecruiterFormData] = useState(
    intialRecruiterFormData
  );
  const [candidateFormData, setCandidateFormData] = useState(
    initialCandidateFormData
  );
  const [file,setFile] = useState(null)
  const handleFileChange=(event)=>{
    event.preventDefault()
    setFile(event.target.files[0])
  }

  const handleUploadPdfToSupabase=async()=>{
    const {data,error}=await supabaseClient.storage.from("job-portal-public").upload(`/public/${file.name}`,file,{cacheControl:"3600",
      upsert:false,
    })
    if(data){
      setCandidateFormData({
        ...candidateFormData,
        resume:data.path
      })
    }
  }

  useEffect(()=>{
    if(file) handleUploadPdfToSupabase()
  },[file])
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

  const validateCandidate=()=>{
    return Object.keys(candidateFormData).every((key)=>candidateFormData[key].trim()!=='')
  }
  const RefreshPage=()=>{
    router.refresh();
  }
  const createProfile=async()=>{
    const data= currentTab==="candidate"?{
      candidateInfo:candidateFormData,
      role:"candidate",
      isPremiumUser:false,
      userId:user?.id,
      email:user?.primaryEmailAddress?.emailAddress
    }:{
      recruiterInfo:recruiterFormData,
      role:"recruiter",
      isPremiumUser:false,
      userId:user?.id,
      email:user?.primaryEmailAddress?.emailAddress
    }

    await createProfileAction(data)
    router.refresh()
  }
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
