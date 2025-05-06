import { currentUser } from "@clerk/nextjs/server";
import Header from "../header";
import { fetchProfileAction } from "@/actions";

const CommonLayout=async({children})=>{
    const User=await currentUser();
    const profileInfo=await fetchProfileAction(User?.id);
    
    return(
        <div className="max-w-9xl max-h-screen">
            {/* Header Component  */}
            <Header profileInfo={profileInfo} User={JSON.parse(JSON.stringify(User))}/>
            {/* Header Component  */}

            {/* Main Content */}
            <main>
                {children}
            </main>
            {/* Main Content */}
        </div>
    )
}
export default CommonLayout;