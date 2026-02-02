export const dynamic = "force-dynamic";
import React from "react";
import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => {
  return (
    <div className="flex justify-center w-full">
      <SignUp />
    </div>
  
  );
};

export default SignUpPage;
