"use client";
import React, { useEffect, useState } from "react";
import PostNewJob from "../post-new-job";
import RecruiterJobCard from "../recruiter";
import CandidateJobCard from "../candidate-job-card";
import { filterMenuData, formUrlQuery } from "@/utils";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "../ui/menubar";
import { Label } from "../ui/label";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const JobListing = ({
  user,
  profileInfo,
  jobList,
  getJobApplicationList,
  fetchFilterCategories,
}) => {
  const [filterParams, setFilterParams] = useState({});
  const searchParams = useSearchParams();
  const router = useRouter();
  const handleFilter = (getID, getOptions) => {
    let cpyfilters = { ...filterParams };
    const indexOfCurrentSection = Object.keys(cpyfilters).indexOf(getID);
    if (indexOfCurrentSection === -1) {
      cpyfilters = {
        ...cpyfilters,
        [getID]: [getOptions],
      };
    } else {
      const indexOfCurrentOption = cpyfilters[getID].indexOf(getOptions);
      if (indexOfCurrentOption === -1) cpyfilters[getID].push(getOptions);
      else cpyfilters[getID].splice(indexOfCurrentOption, 1);
    }
    setFilterParams(cpyfilters);
    sessionStorage.setItem("filterParams", JSON.stringify(cpyfilters));
  };

  useEffect(() => {
    setFilterParams(JSON.parse(sessionStorage.getItem("filterParams")));
  }, []);

  useEffect(() => {
    if (filterParams && Object.keys(filterParams).length > 0) {
      let url = "";
      url = formUrlQuery({
        params: searchParams.toString(),
        dataToAdd: filterParams,
      });
      router.push(url, { scroll: false });
    }
  }, [filterParams, searchParams]);

  const filterMenus = filterMenuData.map((item) => ({
    id: item.id,
    name: item.label,
    options: [...new Set(fetchFilterCategories.map((items) => items[item.id]))],
  }));
  return (
    <div className="mx-auto p-6 lg:p-8">
      <div className="flex items-baseline justify-between flex-col gap-4 md:flex-row py-4">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          {profileInfo?.role == "candidate"
            ? "Explore more jobs"
            : "Jobs Dashboard"}
        </h1>
        <div className="flex items-center">
          {profileInfo?.role === "candidate" ? (
            <Menubar>
              {filterMenus.map((filterMenu) => (
                <MenubarMenu key={filterMenu.id}>
                  <MenubarTrigger className="cursor-pointer">
                    {filterMenu.name}
                  </MenubarTrigger>
                  <MenubarContent>
                    {filterMenu.options.map((option, optionIndex) => (
                      <MenubarItem
                        key={`${filterMenu.id}-${option}`}
                        className="flex items-center"
                        onClick={() => handleFilter(filterMenu.id, option)}
                      >
                        <div
                          className={`h-4 w-4 border rounded border-gray-900 ${
                            filterParams &&
                            Object.keys(filterParams).length > 0 &&
                            filterParams[filterMenu.id] &&
                            filterParams[filterMenu.id].indexOf(option) > -1
                              ? "bg-black"
                              : ""
                          }`}
                        />
                        <Label className="ml-3 cursor-pointer text-sm text-gray-600">
                          {option}
                        </Label>
                      </MenubarItem>
                    ))}
                  </MenubarContent>
                </MenubarMenu>
              ))}
            </Menubar>
          ) : (
            <PostNewJob
              jobList={jobList}
              user={user}
              profileInfo={profileInfo}
            />
          )}
        </div>
      </div>
      <div className="pt-6 pb-24">
        <div className="grid gird-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
          <div className="lg:col-span-4">
            <div className="conatainer mx-auto space-y-8">
              <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
                {jobList && jobList.length > 0
                  ? jobList.map((JobItem) =>
                      profileInfo?.role === "candidate" ? (
                        <CandidateJobCard
                          key={JobItem.id}
                          user={user}
                          JobItem={JobItem}
                          profileInfo={profileInfo}
                          getJobApplicationList={getJobApplicationList}
                        />
                      ) : (
                        <RecruiterJobCard
                          key={JobItem.id}
                          JobItem={JobItem}
                          profileInfo={profileInfo}
                          getJobApplicationList={getJobApplicationList}
                        />
                      )
                    )
                  : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobListing;
