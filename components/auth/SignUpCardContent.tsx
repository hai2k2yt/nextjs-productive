"use client"

import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {SignUpSchema, signUpSchema} from "@/schema/signUpSchema";
import {CardContent} from "@/components/ui/card";
import {Form, FormField, FormItem, FormControl, FormMessage} from "@/components/ui/form";
import {ProviderSignInBtns} from "@/components/auth/ProviderSignInBtns";
import {Input} from "@/components/ui/input"
import {useTranslations} from "next-intl";
import React, {useState} from "react";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {toast} from "sonner";
import {signIn} from "next-auth/react";
import {LoadingState} from "@/components/ui/loadingState";

export const SignUpCardContent = () => {

  const t = useTranslations("AUTH")
  const m = useTranslations("MESSAGES")

  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      username: ""
    }
  })

  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const onSubmit = async (data: SignUpSchema) => {
    setIsLoading(true)

    try {
      const res = await fetch(
        '/api/auth/register', {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
      if(!res.ok) throw new Error("Something went wrong")
      const signUpInfo = await res.json()

      if (res.status == 200) {
        toast({
          title: m("SUCCESS.SIGN_UP"),
        })
        await signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false
        })
        router.push("/")
      } else throw new Error(signUpInfo)
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
          <ProviderSignInBtns disabled={isLoading} />

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
              name="username"
              render={({field}) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder={t('USERNAME')}
                      {...field}
                    />
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
            <Button disabled={isLoading} className="w-full font-bold text-white" type="submit">
              {
                isLoading
                  ? (<LoadingState loadingText={m("PENDING.LOADING")}/>)
                  : (t("SIGN_UP.SUBMIT_BTN"))
              }
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              {t("SIGN_UP.TERMS.FIRST")}{" "}
              <Link className="font-bold" href={"/"}>
                {t("SIGN_UP.TERMS.SECOND")}
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </CardContent>
  )
}