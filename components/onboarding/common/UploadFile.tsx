"use client"

import {UseFormReturn} from "react-hook-form";
import {z} from "zod";
import React, {useRef, useState} from "react";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Trash2, UploadCloud} from "lucide-react";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {useTranslations} from "next-intl";

interface Props {
  form: UseFormReturn<any>;
  schema: z.ZodObject<any>;
  getImagePreview?: React.Dispatch<React.SetStateAction<string>>;
  inputAccept: "image/*" | "pdf";
  typesDescription: string;
  ContainerClassName?: string;
  LabelClassName?: string;
  LabelText?: string;
}

export function UploadFile(
  {
    form,
    schema,
    getImagePreview,
    inputAccept,
    typesDescription,
    ContainerClassName,
    LabelClassName,
    LabelText
  }: Props) {
  const t = useTranslations("UPLOAD_FILE");

  const [dragActive, setDragActive] = useState<boolean>(false)
  const [file, setFile] = useState<File | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const onFileHandler = (providedFile: File) => {
    const result = schema
      .pick({file: true})
      .safeParse({image: providedFile}) as z.SafeParseReturnType<
      {
        [x: string]: any
      },
      {
        [x: string]: any
      }
    >

    if (result.success) {
      form.clearErrors("file")
      form.setValue("file", providedFile)
      setFile(providedFile)
      if (getImagePreview) getImagePreview(URL.createObjectURL(providedFile))
    } else {
      const errors = result.error.flatten().fieldErrors.file
      errors?.forEach((error) => form.setError("file", {message: error}))
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files

    if (files && files[0]) {
      onFileHandler(files[0])
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    const files = e.dataTransfer.files
    if(files && files[0]) {
      onFileHandler(files[0])
    }
  }

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(true)
  }

  const removeFile = () => {
    setFile(null)
    form.setValue("file", null)
  }

  return (
    <FormField
      name="file"
      control={form.control}
      render={({field}) => (
        <FormItem className="flex flex-col justify-center items-center">
          {LabelText && <FormLabel className={LabelClassName}>{LabelText}</FormLabel>}
          <FormControl>
            <div
              className={cn(
                `${
                  dragActive ? "bg-primary/20" : "bg-muted"
                } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring 
                focus-visible:ring-offset-2 p-4 sm:p-6 h-min-0 h-40 cursor-pointer 
                hover:bg-muted/90 duration-200 transition-colors ring-offset-background 
                rounded-md relative border-muted-foreground border border-dashed 
                text-muted-foreground flex flex-col items-center w-[15rem] justify-center`,
                ContainerClassName
              )}
              onDragEnter={handleDragEnter}
              onDrop={handleDrop}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onClick={() => {
                if(inputRef.current) inputRef?.current?.click()
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && inputRef.current) {
                  inputRef.current?.click()
                }
              }}
              role="presentation"
              tabIndex={0}
            >
              <Input
                {...field}
                placeholder="fileInput"
                className="sr-only"
                type="file"
                multiple={true}
                onChange={handleChange}
                ref={inputRef}
                value={undefined}
                accept={inputAccept}
              />
              <UploadCloud size={30} />
              <p className="text-sm font-semibold uppercase text-primary mt-5">
                {t("UPLOAD")}
              </p>
              <p className="text-xs mt-1">
                {typesDescription}
              </p>
            </div>
          </FormControl>
          <FormMessage />
          {file && (
            <div className="flex items-center flex-row space-x-5 text-sm mt-4 ">
              <p>{file.name}</p>
              <Button
                className="h-8 w-8 text-destructive hover:text-destructive"
                variant="ghost"
                size="icon"
                onClick={() => removeFile()}
              >
                <Trash2 size={18} />
              </Button>
            </div>
          )}
        </FormItem>
      )}
    >
    </FormField>
  )
}