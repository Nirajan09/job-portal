"use client"
import React, { Fragment, useState } from 'react'
import CommonCard from '../common-card'
import JobIcon from '../job-icon'
import { Button } from '../ui/button'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"
import { createJobApplicationAction } from '@/actions'
import { toast } from 'sonner'
import { useRouter } from "next/navigation";

const CandidateJobCard = ({user,JobItem,profileInfo,getJobApplicationList}) => {
    const [showJobDetailsDrawer,setShowJobDetailsDrawer]=useState(false)

const router = useRouter();
    const handleJobApply=async()=>{
        if(!profileInfo?.isPremiumUser && getJobApplicationList.length>=2){
            
            toast("You can only apply to maximum of 2 jobs", {
                description: "Upgrade the plans to apply for more jobs",
                style: {
                    color: 'red', // Change to your desired color
                    opacity:1,
                  },
                  descriptionStyle: {
                    color: 'gray' // Change to desired color
                  }
              })
              return;
        }
        await createJobApplicationAction({
            recruiterUserID:JobItem?.recruiterId,
            name:profileInfo?.candidateInfo?.name,
            email:profileInfo?.email,
            candidateUserID:profileInfo?.userId,
            status:["Applied"],
            jobID:JobItem?._id,
            jobAppliedDate:new Date().toLocaleDateString()
        })
        router.refresh(); // Instead of revalidating path
        setShowJobDetailsDrawer(false)
    }
  return (
        <Fragment>
            <Drawer open={showJobDetailsDrawer}
            onOpenChange={setShowJobDetailsDrawer}
            >

                
            <CommonCard icon={<JobIcon/>}
            title={JobItem?.title}
            description={JobItem?.companyName}
            footerContent={
                <Button onClick={()=>setShowJobDetailsDrawer(true)} className="disabled:opacity-50 flex h-11 items-centr justify-center">View Details</Button>
            }
            />
            <DrawerContent className="p-6">
                <DrawerHeader className="px-0">
                    <div className='flex justify-between'>
                        <DrawerTitle className="text-4xl font-extrabold text-gray-800">
                            {JobItem?.title}
                        </DrawerTitle>
                        <div className='flex gap-3'>
                            <Button disabled={
                                getJobApplicationList.findIndex(item=>item.jobID===JobItem?._id)>-1?true:false
                            } onClick={handleJobApply} className="flex h-11 items-center justify-center px-5">{
                                getJobApplicationList.findIndex(item=>item.jobID===JobItem?._id)>-1?"Applied":"Apply"
                            }</Button>
                            <Button className="flex h-11 items-center justify-center px-5" onClick={()=>setShowJobDetailsDrawer(false)}>Cancel</Button>
                        </div>
                    </div>
                </DrawerHeader>
                <DrawerDescription className="text-2xl font-medium text-gray-600">{JobItem?.description}
                    <span className='text-xl ml-4 font-normal text-gray-500'>{JobItem?.location}</span>
                </DrawerDescription>
                <div className='w-[150px] mt-6 flex justify-center items-center h-[40px] bg-black rounded-[4px]'>
                    <h2 className="text-xl font-bold text-white">{JobItem?.type}</h2>
                </div>
                <h3 className='text-2xl font-medium text-black mt-3'>Experience: {JobItem?.experience} Years</h3>
                <div className="flex gap-4 mt-6">
                    {
                        JobItem?.skills.split(",").map((skill)=>(
                            <div className="flex w-[100px]  justify-center items-center h-[35px] bg-black rounded-[4px]">
                                <h2 className='text-[13px] font-medium text-white'>{skill}</h2>
                            </div>
                        ))
                    }
                </div>
                </DrawerContent>
            </Drawer>
        </Fragment>
  )
}

export default CandidateJobCard