"use client";
import { PagesTopLoader } from "nextjs-toploader/pages";

const Loading = () => {
  return (
    <>
      <PagesTopLoader 
      showSpinner={false}
      />
    </>
  );
};

export default Loading;
