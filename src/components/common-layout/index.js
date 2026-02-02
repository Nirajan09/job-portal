export const dynamic = "force-dynamic";

import { currentUser } from "@clerk/nextjs/server";
import Header from "../header";
import { fetchProfileAction } from "@/actions";

const CommonLayout = async ({ children }) => {
  let safeUser = null;
  let profileInfo = null;

  try {
    const User = await currentUser();
    profileInfo = await fetchProfileAction(User?.id);
    if (User) {
      safeUser = {
        id: User.id,
        firstName: User.firstName,
        lastName: User.lastName,
        email: User.emailAddresses?.[0]?.emailAddress,
        imageUrl: User.imageUrl,
      };
    }
  } catch (err) {
    console.error("Error in CommonLayout server render:", err);
  }

  return (
    <div className="max-w-9xl max-h-screen">
      <Header profileInfo={profileInfo} User={safeUser} />
      <main>{children}</main>
    </div>
  );
};

export default CommonLayout;
