"use client";

import { membershipPlans } from "@/utils";
import React, { useEffect } from "react";
import CommonCard from "../common-card";
import { Button } from "../ui/button";
import JobIcon from "../job-icon";
import { createPaymentStripe, createPriceIDAction, UpdateProfileAction } from "@/actions";
import { loadStripe } from "@stripe/stripe-js";
import { useSearchParams } from "next/navigation";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);
const MemberShipPage = ({ profileInfo }) => {
  const pathName = useSearchParams();

  const handlePayment = async (getCurrentPlan) => {
    const stripe = await stripePromise;
    const extractPriceId = await createPriceIDAction({
      amount: Number(getCurrentPlan?.price),
    });
    if (extractPriceId) {
      sessionStorage.setItem("currentPlan", JSON.stringify(getCurrentPlan));
      const result = await createPaymentStripe({
        lineItems: [
          {
            price: extractPriceId?.id,
            quantity: 1,
          },
        ],
      });
      await stripe.redirectToCheckout({
        sessionId: result?.id,
      });
    }

  };

  const updateProfile = async () => {
    const fetchCurrentPlanfromSession = JSON.parse(
      sessionStorage.getItem("currentPlan")
    );
    await UpdateProfileAction(
      {
        ...profileInfo,
        isPremiumUser: true,
        memberShipType: fetchCurrentPlanfromSession?.type,
        memberShipStartDate: new Date().toString(),
        memberShipEndDate: new Date(
          new Date().getFullYear() + fetchCurrentPlanfromSession?.type === "Basic"
            ? 1
            : fetchCurrentPlanfromSession?.plan === "Teams"
            ? 2
            : 5,
          new Date().getMonth(),
          new Date().getDay()
        ),
      },
      "/membership"
    );
  };
  useEffect(() => {
    if (pathName.get("status") === "success") updateProfile();
  }, [pathName]);
  return (
    <div className="mx-auto p-6 lg:p-8">
      <div className="flex items-baseline justify-between flex-col gap-4 md:flex-row border-b py-4">
        <h1 className="text-4xl font-bold tracking-tight text-gray-950">
          {profileInfo?.isPremiumUser
            ? "You are a Premium User"
            : "Choose your Best Plan"}
        </h1>
        <div>
            {
                profileInfo?.isPremiumUser?
                <Button className="flex h-11 items-center justify-center px-5">
                    {membershipPlans.find(planItem=>planItem.type===profileInfo?.memberShipType)?.heading||"No Plans Found"}
                </Button>
                :null
            }
        </div>
      </div>
      <div className="py-20 pb-24 pt-6">
        <div className="container mx-auto p-0 space-y-8">
          <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
            {membershipPlans.map((plan,index) => (
              <CommonCard
                icon={
                  <div className="flex justify-between">
                    <div>
                      <JobIcon />
                    </div>
                    <h1 className="font-bold text-2xl">{plan?.heading}</h1>
                  </div>
                }
                title={`$ ${plan.price} / year`}
                description={plan.type}
                footerContent={
                    profileInfo?.memberShipType==="Enterprise" || (profileInfo?.memberShipType==='Basic'&&index===0)||(
                        profileInfo?.memberShipType==="Teams"&&index>=0 && index<2?null:<Button onClick={() => handlePayment(plan)}>
                        {
                            profileInfo?.memberShipType==="Basic"||
                            profileInfo?.memberShipType==="Teams"||
                            profileInfo?.memberShipType==="Enterprise"?"Update Plan":"Get Premium"
                        }
                      </Button>
                    )
                  
                }
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberShipPage;
