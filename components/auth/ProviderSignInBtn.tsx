"use client"
import {Button} from "@/components/ui/button";
import React, {useState} from "react";
import {useLocale} from "next-intl";
import {useProviderLoginError} from "@/hooks/useProviderLoginError";
import {signIn} from "next-auth/react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement>{
  children: React.ReactNode;
  providerName: "google" | "github";
  onLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export const ProviderSignInBtn = (
  {
    children,
    providerName,
    onLoading,
    ...props
  }: Props) => {

  const [showLoggedInfo, setShowLoggedInfo] = useState(false)
  const locale = useLocale()
  useProviderLoginError(showLoggedInfo)

  const signInHandler = async () => {
    onLoading(true)
    setShowLoggedInfo(true);

    try {
      await signIn(providerName, {callbackUrl: `/${locale}/onboarding`})
    } catch (e) {
      console.log(e)
    }

    onLoading(false)
  }

  return (
    <Button onClick={signInHandler} {...props} variant="secondary" type="button">
      {children}
    </Button>
  )

}