import {  fetchProfileAction } from "@/actions";
import HomePageButton from "@/components/homepagebutton";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Fragment } from "react";

export default async function Home () {
  const User =await currentUser();
  const profileInfo=await fetchProfileAction(User?.id)


  if(User && !profileInfo?._id){
    redirect("/onboard")
  }
  return (
  <Fragment>
    <div className="p-6 lg:p-8 overflow-hidden">
      <div className="relative overflow-hidden w-full">
          <div className="md:h-[78.7vh] h-[65vh] overflow-hidden">
            <div className="container m-auto p-0">
              <div className="flex justify-between items-center flex-wrap gap-12 lg:gap-0 ">
                  <div className="lg:w-5/12 space-y-8 flex flex-col gap-12 mt-9 md:mt-4 md:gap-4">
                    <span className="font-extrabold text-size-3xl -text--clr-slate800  leading-[0.9] lg:text-size-6xl sm:text-size-5xl xs:text-size-4xl sm:text-size-[1.7rem] ">
                    Find Your Dream Job with Ease!
                    </span>
                    <p className="max-w-[60ch] text-size-base -text--clr-slate600 lg:text-size-xl sm:text-size-lg">
                    Explore thousands of job opportunities from top companies and take the next step in your career.
                    </p>
                    <HomePageButton User={JSON.parse(JSON.stringify(User))} profileInfo={profileInfo}/>
                  </div>
                  <div>
                      <img
                      src="JobPortal_Logo.png"
                      alt="Job Portal"
                      className="relative ml-auto w-[400px] h-[400px] md:w-[600px] md:h-[600px] mr-4 select-none"
                      />
                  </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  </Fragment>
  );
}
