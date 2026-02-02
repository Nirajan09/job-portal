import { currentUser } from "@clerk/nextjs/server";
import Header from "../header";
import { fetchProfileAction } from "@/actions";

const CommonLayout = async ({ children }) => {
  const User = await currentUser();
  const profileInfo = await fetchProfileAction(User?.id);

  const safeUser = User
    ? {
        id: User.id,
        firstName: User.firstName,
        lastName: User.lastName,
        email: User.emailAddresses?.[0]?.emailAddress,
        imageUrl: User.imageUrl,
      }
    : null;

  return (
    <div className="max-w-9xl max-h-screen">
      <Header profileInfo={profileInfo} User={safeUser} />
      <main>{children}</main>
    </div>
  );
};

export default CommonLayout;
