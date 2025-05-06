"use client"
import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const HomePageButton = ({ User, profileUser }) => {
    const router=useRouter()
    useEffect(()=>{
        router.refresh();
    },[])
  return (
    <div className="flex justify-around">
       
      <Button onClick={User===null?(()=>router.push('/sign-in')):()=>router.push('/jobs')} className="flex h-11 items-centr justify-center">
        {
            User?profileUser?.role==="candidate" ? "Browse Jobs":"Jobs Dashboard":"Find Jobs"
        }
      </Button>
      <Button onClick={User===null?(()=>router.push('/sign-in')):()=>router.push(User?profileUser?.role==='candidate'?'/activity':'/jobs':'/jobs')} className="flex h-11 items-centr justify-center">
        {
            User?profileUser?.role==='candidate'?'Your Activity':'Post New Job':"Post New Job"
        }
      </Button>
    </div>
  );
};

export default HomePageButton;
