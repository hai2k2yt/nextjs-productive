import React from "react"
import {useOnboardingForm} from "@/context/OnboardingForm";
import {useForm} from "react-hook-form";
import {additionalUserInfoSecondPart, AdditionalUserInfoSecondPart} from "@/schema/additionalUserInfoSecondPart";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {ActionType} from "@/types/onBoardingContext";
import {Button} from "@/components/ui/button";
import {ArrowRight} from "lucide-react";

const useCases = [
  {
    case: "WORK",
    title: "For work"
  },
  {
    case: "STUDY",
    title: "For study"
  },
  {
    case: "PERSONAL_USE",
    title: "For Personal Use"
  }
]

export const SecondStep = () => {
  const {currentStep, dispatch} = useOnboardingForm()
  const form = useForm<AdditionalUserInfoSecondPart>({
    resolver: zodResolver(additionalUserInfoSecondPart)
  })

  const onSubmit = (data: AdditionalUserInfoSecondPart) => {
    dispatch({type: ActionType.USECASE, payload: data.useCase})
    dispatch({type: ActionType.CHANGE_SITE, payload: currentStep + 1})
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-4 w-full mt-10 text-center">
        <h2 className="font-bold text-4xl md:text-5xl flex flex-col items-center max-w-xs">
          How will you use Super Productive?
        </h2>
        <p className="max-w-lg text-muted-foreground">
          We will use this information to personalize the experience for you
        </p>
      </div>
      <div className="max-w-md w-full space-y-8 mt-14">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="useCase"
              render={({field}) => (
                <FormItem>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      {useCases.map((useCase) => (
                        <FormItem key={useCase.case}
                                  className={`flex items-center space-x-3 space-y-0 p-3 rounded-md transition-colors duration-200 relative overflow-hidden 
                                  ${form.getValues("useCase") === useCase.case ? "bg-primary/40" : "hover:bg-primary/10"}`}
                        >
                          <FormControl onClick={(e) => {
                            const target = e.target as HTMLInputElement
                            dispatch({
                              type: ActionType.USECASE,
                              payload: target.value
                            })
                          }}>
                            <RadioGroupItem value={useCase.case} />
                          </FormControl>
                          <FormLabel className="font-normal lg:text-lg h-full left-9 flex items-center absolute w-full cursor-pointer">
                            {useCase.title}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              className="mt-10 w-full max-w-md dark:text-white font-semibold"
              disabled={!form.formState.isValid}
              type="submit"
            >
              Continue
              <ArrowRight className="" width={18} height={18} />
            </Button>
          </form>
        </Form>
      </div>
    </>
  )
}