"use client"
import {useTranslations} from "next-intl";
import {ThemeSwitcher} from "@/components/switchers/ThemeSwitcher";
import {signOut, useSession} from "next-auth/react";
import {Button} from "@/components/ui/button";

const Home = () => {
  const t = useTranslations("Index")
  const session = useSession()

  const logoutHandler = () => {
    signOut({
      callbackUrl: `${window.location.origin}/sign-in`
    })
  }

  return <>
    <Button onClick={logoutHandler}>Logout</Button>
    <ThemeSwitcher />
  </>
}

export default Home