"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
// import { DialogContent } from "@radix-ui/react-dialog";
import CommonForm from "../common-form";
import { postNewJobFormControls, postNewJobFormData } from "@/utils";
import { CreateJobAction } from "@/actions";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";

const PostNewJob = ({ profileInfo, user,jobList }) => {

const router = useRouter();
  const [showJobDialog, setShowJobDialog] = useState(false);
  const [jobFormData, setjobFormData] = useState({
    ...postNewJobFormData,
    companyName: profileInfo?.recruiterInfo?.companyName,
  });

  
  const handlePostNewformValid = () => {
    return (
      jobFormData.title.trim() != "" &&
      jobFormData.type.trim() != "" &&
      jobFormData.location.trim() != "" &&
      jobFormData.experience.trim() != "" &&
      jobFormData.description.trim() != "" &&
      jobFormData.skills.trim() != ""
    );
  };

  const createNewJob = async () => {
    await CreateJobAction(
      {
        ...jobFormData,
        recruiterId: user?.id,
        applicants: [],
      }
    );
    router.refresh();
    setjobFormData({
      ...postNewJobFormData,
      companyName: profileInfo?.recruiterInfo?.companyName,
    });
  };
  const handleAddNewJob=()=>{
    if(!profileInfo?.isPremiumUser && jobList.length>=2){
      toast("You can only post maximum of 2 jobs", {
        description: "Upgrade the plans to post more jobs",
      })
      return;
    }
    setShowJobDialog(true)
  }

  return (
    <div>
      <Button
        onClick={() => handleAddNewJob()}
        className="disabled:opacity-50 flex h-11 items-centr justify-center"
      >
        Post a Job
      </Button>
      <Dialog
        open={showJobDialog}
        onOpenChange={() => {
          setShowJobDialog(false);
          setjobFormData({
            ...postNewJobFormData,
            companyName: profileInfo?.recruiterInfo?.companyName,
          });
        }}
      >
        <DialogContent className="sm:max-w-screen-md h-[600px] overflow-auto">
          <DialogHeader>
            <DialogTitle>Post New Job</DialogTitle>
            <div className="grid gap-4 py-4">
              <CommonForm
              setShowJobDialog={setShowJobDialog}
                ButtonText={"Add"}
                formData={jobFormData}
                setFormData={setjobFormData}
                formControls={postNewJobFormControls}
                isBtnDisabled={!handlePostNewformValid()}
                action={createNewJob}
              />
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PostNewJob;
