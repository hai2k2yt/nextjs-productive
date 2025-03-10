import {checkIfUserCompletedOnboarding} from "@/lib/checkIfUserCompletedOnboarding";

const Dashboard = async () => {
  const session = await checkIfUserCompletedOnboarding("/dashboard")
  console.log(session)

  return (
    <div>
      Dashboard
    </div>
  )
}

export default Dashboard