"use client"

import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {useOnboardingForm} from "@/context/OnboardingForm";
import {UserAvatar} from "@/components/ui/user-avatar";

export const SummarySection = () => {

  const { name, surname, profileImage, useCase } = useOnboardingForm()

  return (
    <section className="hidden lg:w-1/2 bg-primary lg:flex justify-center items-center">
      <div className="bg-card rounded-2xl w-96 min-h-[10rem] shadow-sm flex flex-col items-center p-4 py-8 gap-5">
        <div className="w-32 h-32 rounded-full shadow-sm bg-muted mt-[-5rem]">

        </div>
        <div className="text-center space-y-1.5 text-3xl break-words max-w-xs font-semibold">
          {name && <p>{name}</p>}
          <UserAvatar className="w-32 h-32 shadow-sm mt-[-5rem]" size={40} profileImage={profileImage} />
          {surname && <p>{surname}</p>}
        </div>
        {!useCase && <span className="bg-muted rounded-md w-24 h-8"></span>}
        {useCase && (
          <p>
            {useCase === "WORK" && "For Work"}
            {useCase === "STUDY" && "For Study"}
            {useCase === "PERSONAL_USE" && "For Personal Use"}
          </p>
        )}
      </div>
    </section>
  )
}