"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import CommonCard from "../common-card";
import JobIcon from "../job-icon";

const CandidateActivity = ({ jobList, jobApplicants }) => {
  const uniqueStatus = [
    ...new Set(jobApplicants.map((item) => item.status).flat(1)),
  ];
  return (
    <div className="mx-auto p-6 lg:p-8 ">
      <Tabs defaultValue="Applied" className="w-full">
        <div className="flex items-baseline justify-between flex-col gap-4 md:flex-row Border-b py-4">
          <h1 className="text-4xl font-bold tracking-tight text-gray-950">
            Your Activity
          </h1>
          <TabsList>
            {uniqueStatus.map((status) => (
              <TabsTrigger value={status}>{status}</TabsTrigger>
            ))}
          </TabsList>
        </div>
        <div >
          <div  >
            <div className="flex flex-col">
              {uniqueStatus.map((status) => (
                <TabsContent className="flex flex-col gap-4" value={status}>
                  {jobList
                    .filter(
                      (jobItem) =>
                        jobApplicants
                          .filter(
                            (jobApplicantion) =>
                              jobApplicantion.status.indexOf(status) > -1
                          )
                          .findIndex(
                            (filterItemByStatus) =>
                              jobItem._id === filterItemByStatus.jobID
                          ) > -1
                    )
                    .map((finalFilteredItem) => (
                      <CommonCard
                        icon={<JobIcon />}
                        title={finalFilteredItem?.title}
                        description={finalFilteredItem?.companyName}
                      ></CommonCard>
                    ))}
                </TabsContent>
              ))}
            </div>
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default CandidateActivity;
