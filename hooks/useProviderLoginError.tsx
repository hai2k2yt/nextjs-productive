import {useRouter, useSearchParams} from "next/navigation";
import {useSession} from "next-auth/react";
import {useTranslations} from "next-intl";
import {useEffect} from "react";
import {toast} from "sonner";

export const useProviderLoginError = (showLoggedInfo: boolean) => {
  const params = useSearchParams()
  const session = useSession()
  const router = useRouter()

  const m = useTranslations("MESSAGES")

  useEffect(() => {
    const error = params.get("error")

    if (error && session.status === "unauthenticated") {
      switch (error) {
        case "OAuthAccountNotLinked":
          toast({
            title: m("ERRORS.TAKEN_EMAIL"),
            variant: "destructive"
          })
          break;
        case "OAuthCreateAccount":
          toast({
            title: m("ERRORS.TAKEN_USERNAME"),
            variant: "destructive"
          })
          break;
        case "Callback":
          toast({
            title: m("ERRORS.DEFAULT"),
            variant: "destructive"
          })
          break;
        default:
          toast({
            title: m("ERRORS.DEFAULT"),
            variant: "destructive"
          })
          break;
      }

      const timer = setTimeout(() => {
        router.replace("/sign-in")
      })

      return () => {
        clearTimeout(timer)
      }
    }

    if (session.status === "authenticated" && showLoggedInfo) {
      toast({
        title: m("SUCCESS.SIGN_IN")
      })
    }
  }, [params, toast, session, router, m, showLoggedInfo]);
}