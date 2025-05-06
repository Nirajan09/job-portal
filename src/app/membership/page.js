import { fetchProfileAction } from '@/actions';
import MemberShipPage from '@/components/membership-page'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation';
import React from 'react'

const MemberShip = async() => {
  const user=await currentUser();
  const profileInfo=await fetchProfileAction(user?.id)

  if(!profileInfo) redirect("/onboard");
  return (
    <MemberShipPage profileInfo={profileInfo}/>
  )
}

export default MemberShip