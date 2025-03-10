"use client"

import {useOnboardingForm} from "@/context/OnboardingForm";
import {useTranslations} from "next-intl";
import {useMutation} from "@tanstack/react-query";
import axios, {AxiosError} from "axios";
import {toast} from "sonner";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import {LoadingState} from "@/components/ui/loadingState";

export const Finish = () => {
  const t = useTranslations("ONBOARDING_FORM")
  const m = useTranslations("MESSAGES")
  const {workspaceImage, workspaceName, surname, useCase, name} = useOnboardingForm()
  const {update} = useSession()
  const router = useRouter()
  const {mutate: completeOnboarding, isPending} = useMutation({
    mutationFn: async () => {
      const {data} = await axios.post("/api/onboarding", {
        name,
        surname,
        useCase,
        workspaceImage,
        workspaceName
      })
      return data
    },
    onError: (err: AxiosError) => {
      const error = err?.response?.data ? err.response.data : "ERRORS_DEFAULT"
      toast({
        title: m(error),
        variant: "destructive"
      })
    },
    onSuccess: async () => {
      toast({
        title: m("SUCCESS.ONBOARDING_COMPLETE")
      })

      await update()
      router.push("/dashboard")
      router.refresh()
    },
    mutationKey: ["completeOnboarding"]
  })

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-4 w-full mt-10 text-center">
        <h2 className="font-bold text-4xl md:text-5xl max-w-xs">
          {t("FINISH.TITLE")}
        </h2>
      </div>
      <div className="font-bold text-xl ms:text-2xl md:text-3xl w-full max-w-lg text-center">
        <p>
          {t("FINISH.DESC_FIRST")}{" "}
          <span>
            Super <span className="text-primary font-semibold">Productive</span>
          </span>
          {t("FINISH.DESC_SECOND")}{" "}
        </p>
        <Button
          disabled={isPending}
          onClick={() => completeOnboarding()}
          type="submit"
          className="mt-10 sm:mt-32 w-full max-w-md dark:text-white font-semibold"
        >
          {
            isPending
              ? <LoadingState/>
              : (
                <>
                  {t('START_BTN')}
                </>
              )
          }
        </Button>
      </div>
    </>
  )
}