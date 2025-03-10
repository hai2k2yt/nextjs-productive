import {getAuthSession} from "@/lib/auth";
import {redirect} from "@/i18n/navigation";

export const checkIfUserCompletedOnboarding = async (currentPath: string) => {
  const session = await getAuthSession();

  if(!session) redirect("/")
  if(session.user.completedOnboarding && currentPath === "/onboarding")
    redirect("/dashboard")
  if(!session.user.completedOnboarding && currentPath !== "/onboarding")
    redirect("/onboarding?error=not-completed-onboarding")

  return session
}