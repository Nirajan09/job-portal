const { default: mongoose } = require("mongoose");


const ProfileSchema=new mongoose.Schema({
    userId:String,
    role:String,
    email:String,
    isPremiumUser:Boolean,
    memberShipType:String,
    memeberShipStartDate:String,
    memberShipEndDate:String,
    recruiterInfo:{
        name:String,
        companyName:String,
        companyRole:String
    },
    candidateInfo:{
        resume:String,
        name:String,
        currentCompany:String,
        currentjobLocation:String,
        preferredjobLocation:String,
        currentSalary:String,
        noticePeriod:String,
        skills:String,
        previousCompanies:String,
        totalExperience:String,
        college:String,
        collegeLocation:String,
        graduatedYear:String,
        linkedinProfile:String,
        githubProfile:String,
    }
})

const Profile=mongoose.models.Profile || mongoose.model("Profile",ProfileSchema);
export default Profile;