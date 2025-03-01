"use client"

import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {CardContent} from "@/components/ui/card";
import {Form, FormField, FormItem, FormControl, FormMessage} from "@/components/ui/form";
import {ProviderSignInBtns} from "@/components/auth/ProviderSignInBtns";
import {Input} from "@/components/ui/input"
import {useTranslations} from "next-intl";
import React, {useState} from "react";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {signInSchema, SignInSchema} from "@/schema/signInSchema";
import {useRouter} from "next/navigation";
import {signIn} from "next-auth/react";
import {toast} from "sonner";

export const SignInCardContent = () => {

  const t = useTranslations("AUTH")

  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const m = useTranslations("MESSAGES")

  const onSubmit = async (data: SignInSchema) => {
    setIsLoading(true)

    try {
      const account = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false
      })

      if(!account) throw new Error("Something went wrong")

      if(account.error) {
        toast({
          title: m(account.error),
          variant: "destructive"
        })
      } else {
        toast({
          title: m("SUCCESS.SIGN_IN")
        })
        router.push("/onboarding")
        router.refresh()
      }
    } catch (err) {
      let errMsg = m("ERROR.DEFAULT")
      if (typeof err === "string") {
        errMsg = err
      } else if (err instanceof Error) {
        errMsg = err.message
      }
      toast({
        title: errMsg,
        variant: "destructive"
      })
    }

    setIsLoading(false)
  }

  return (
    <CardContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
          <ProviderSignInBtns signInCard onLoading={setIsLoading} />

          <div className="space-y-1.5">
            <FormField
              control={form.control}
              name="email"
              render={({field}) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder={t('EMAIL')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({field}) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder={t('PASSWORD')}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
                )}
            />
          </div>
          <div className="space-y-2">
            <Button className="w-full font-bold text-white" type="submit">
              {t("SIGN_IN.SUBMIT_BTN")}
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              {t("SIGN_IN.FORGOT_PASSWORD")}{" "}
            </p>
          </div>
        </form>
      </Form>
    </CardContent>
  )
}