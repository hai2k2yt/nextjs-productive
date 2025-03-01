"use client"

import {startTransition, useState} from "react";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {LoadingState} from "@/components/ui/loadingState";
import {useLocale} from "next-intl";
import {usePathname, useRouter} from "@/i18n/navigation";

export const LocaleSwitcher = () => {
  const [isLoading, setIsLoading] = useState(false)
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  function onSelectChange(nextLocale: "te" | "en") {
    setIsLoading(true)
    startTransition(() => {
      router.replace(pathname, {locale: nextLocale})
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button disabled={isLoading} variant="outline" size="icon">
          {isLoading ? <LoadingState className="mr-0" /> : locale.toUpperCase()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => {
            onSelectChange("te")
          }}
          className="cursor-pointer"
        >
          TE
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            onSelectChange("en")
          }}
          className="cursor-pointer"
        >
          EN
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}