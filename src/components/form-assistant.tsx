"use client";

import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import jsPDF from "jspdf";
import {
  Upload,
  Loader2,
  Download,
  FileText,
  User,
  CalendarDays,
  Users,
  MapPin,
  Fingerprint,
  CreditCard,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { extractDataAction } from "@/app/actions";
import { VoiceInputButton } from "@/components/voice-input-button";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  name: z.string().optional(),
  dob: z.string().optional(),
  gender: z.string().optional(),
  address: z.string().optional(),
  aadhaar: z.string().optional(),
  pan: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;
type FormType = "A" | "B";

const fieldConfig: Record<
  keyof FormValues,
  { label: string; icon: LucideIcon }
> = {
  name: { label: "Full Name", icon: User },
  dob: { label: "Date of Birth", icon: CalendarDays },
  gender: { label: "Gender", icon: Users },
  address: { label: "Address", icon: MapPin },
  aadhaar: { label: "Aadhaar Number", icon: Fingerprint },
  pan: { label: "PAN Number", icon: CreditCard },
};

const formAFields: (keyof FormValues)[] = ["name", "dob", "gender", "address"];
const formBFields: (keyof FormValues)[] = ["name", "aadhaar", "pan"];

export function FormAssistant() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formType, setFormType] = useState<FormType>("A");
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      dob: "",
      gender: "",
      address: "",
      aadhaar: "",
      pan: "",
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      if (selectedFile.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(selectedFile);
      } else {
        setPreview(null);
      }
    }
  };

  const handleExtractData = async () => {
    if (!file) return;

    setIsLoading(true);
    form.reset();

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const dataUrl = reader.result as string;
      const result = await extractDataAction(dataUrl);

      setIsLoading(false);
      if ("error" in result) {
        toast({
          variant: "destructive",
          title: "Extraction Failed",
          description: result.error,
        });
      } else {
        const formattedResult = {
          ...result,
          dob: result.dob ? result.dob.split('T')[0] : '', // Ensure date is in YYYY-MM-DD
        };
        form.reset(formattedResult);
      }
    };
    reader.onerror = () => {
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "File Read Error",
        description: "Could not read the selected file.",
      });
    };
  };

  const handleDownloadPdf = () => {
    const doc = new jsPDF();
    const data = form.getValues();
    const fieldsToInclude = formType === "A" ? formAFields : formBFields;

    doc.setFontSize(22);
    const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim();
    doc.setTextColor(`hsl(${primaryColor})`);
    doc.text(`Form ${formType} Data`, 20, 20);
    
    doc.setFontSize(12);
    doc.setTextColor(0,0,0);

    let y = 40;
    fieldsToInclude.forEach((key) => {
      if (data[key]) {
        doc.setFont("helvetica", "bold");
        doc.text(`${fieldConfig[key].label}:`, 20, y);
        doc.setFont("helvetica", "normal");
        const textDimensions = doc.getTextDimensions(data[key] as string, { maxWidth: 120 });
        doc.text(data[key] as string, 70, y, { maxWidth: 120 });
        y += textDimensions.h + 6;
      }
    });

    doc.save(`form-data-${formType}.pdf`);
  };

  const clearPreview = () => {
    setFile(null);
    setPreview(null);
  }

  const renderFields = (fields: (keyof FormValues)[]) => {
    return fields.map((fieldName) => {
      const { icon: Icon, label } = fieldConfig[fieldName];
      return (
        <FormField
          key={fieldName}
          control={form.control}
          name={fieldName}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center">
                <Icon className="h-4 w-4 mr-2 text-primary" />
                {label}
              </FormLabel>
              <FormControl>
                <div className="relative flex items-center">
                  <Input
                    placeholder={`Enter ${label.toLowerCase()}`}
                    {...field}
                  />
                  <VoiceInputButton
                    onTranscript={(transcript) => form.setValue(fieldName, transcript, { shouldValidate: true })}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      );
    });
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>1. Upload Document</CardTitle>
          <CardDescription>
            Upload an image of your document to extract information.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <label
              htmlFor="file-upload"
              className={cn(
                "flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 transition-colors",
                { "border-primary": !preview }
              )}
            >
              {preview ? (
                <div className="relative w-full h-full">
                  <Image
                    src={preview}
                    alt="Document Preview"
                    layout="fill"
                    objectFit="contain"
                    className="rounded-lg"
                  />
                   <Button variant="destructive" size="icon" className="absolute top-2 right-2 h-8 w-8 rounded-full z-10" onClick={(e) => {e.preventDefault(); clearPreview();}}>
                    <X className="h-4 w-4" />
                    <span className="sr-only">Clear preview</span>
                  </Button>
                </div>
              ) : file ? (
                <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
                  <FileText className="w-10 h-10 mb-3 text-primary" />
                  <p className="mb-2 text-sm font-semibold">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{ (file.size / 1024).toFixed(2) } KB</p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-10 h-10 mb-3 text-primary" />
                  <p className="mb-2 text-sm text-foreground">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Image files (JPG, PNG, etc.)
                  </p>
                </div>
              )}
              <Input id="file-upload" type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
            </label>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleExtractData}
            disabled={!file || isLoading}
            className="w-full"
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Fingerprint className="mr-2 h-4 w-4" />
            )}
            {isLoading ? "Extracting..." : "Extract Data"}
          </Button>
        </CardFooter>
      </Card>

      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle>2. Fill Form</CardTitle>
          <CardDescription>
            Select a form, then review and edit the extracted data.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-6">
              <Tabs
                value={formType}
                onValueChange={(value) => setFormType(value as FormType)}
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="A">Sample Form A</TabsTrigger>
                  <TabsTrigger value="B">Sample Form B</TabsTrigger>
                </TabsList>
                <TabsContent value="A" className="mt-6 space-y-6">
                  {renderFields(formAFields)}
                </TabsContent>
                <TabsContent value="B" className="mt-6 space-y-6">
                  {renderFields(formBFields)}
                </TabsContent>
              </Tabs>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <Button onClick={handleDownloadPdf} className="w-full">
            <Download className="mr-2 h-4 w-4" />
            Download as PDF
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
