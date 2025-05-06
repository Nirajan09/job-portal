"use client"
import React from 'react'
import { Drawer, DrawerContent } from '../ui/drawer'
import { ScrollArea } from '../ui/scroll-area'
import CandidateList from '../candidate-list'

const JobApplicants = ({showApplicantsdrawer,setshowApplicantsdrawer,currentCandidateDetails,setCurrentCandidateDetails,showCurrentCandidateDetailsModel,setShowCurrentCandidateDetailsModel,getJobApplicationList}) => {
  return (
    <Drawer open={showApplicantsdrawer} onOpenChange={setshowApplicantsdrawer}>
        <DrawerContent className="max-h-[50vh]">
            <ScrollArea className="h-auto overflow-y-auto">
                <CandidateList
                currentCandidateDetails={currentCandidateDetails}
                setCurrentCandidateDetails={setCurrentCandidateDetails}
                getJobApplicationList={getJobApplicationList}
                showCurrentCandidateDetailsModel={showCurrentCandidateDetailsModel}
                setShowCurrentCandidateDetailsModel={setShowCurrentCandidateDetailsModel}
                />
            </ScrollArea>

        </DrawerContent>

    </Drawer>
  )
}

export default JobApplicants