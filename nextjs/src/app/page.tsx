"use client";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { postWeConnectMessage } from "@/services/api";
import { ChangeEvent, useState } from "react";
import { z } from "zod";

import Link from "next/link";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    message: "",
  });
  const [formSuccessMessage, setSuccessMessage] = useState("");
  const [formErrorMessage, setErrorsMessage] = useState("");

  const schema = z.object({
    name: z
      .string()
      .min(3, { message: "Name must be at least 3 characters long" }),
    email: z.string().email("Invalid email address"),
    phoneNumber: z
      .string()
      .regex(/^(\+27|0)[6-8][0-9]{8}$/, "Invalid South African phone number"),
    message: z
      .string()
      .min(5, { message: "Message must be at least 5 characters long" }),
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSuccessMessage("");
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    const result = schema.safeParse({ ...formData, [name]: value });
    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      // @ts-ignore
      formErrors({
        ...fieldErrors,
        // @ts-ignore
        [name]: fieldErrors[name] ? fieldErrors[name][0] : "",
      });
    } else {
      // @ts-ignore
      formErrors({ ...errors, [name]: "" });
    }
  };
  // @ts-ignore
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorsMessage("");
    try {
      const validatedData = schema.parse(formData);
      //console.log("Form submitted with data:", validatedData);
      const response = await postWeConnectMessage(formData);
      if (response.success) {
        setSuccessMessage(response.success);
      }
      if (response.error) {
        setErrorsMessage(response.error);
      }
      const resetForm = {
        name: "",
        email: "",
        phoneNumber: "",
        message: "",
      };
      setFormErrors(resetForm);
      setFormData(resetForm);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = {};
        error.errors.forEach((err) => {
          const path = err.path.join(".");
          // @ts-ignore
          fieldErrors[path] = err.message;
        });
        //console.log(fieldErrors);
        // @ts-ignore
        setFormErrors(fieldErrors);
      }
    }
  };

  return (
    <main className="flex min-h-full flex-col items-center justify-between p-24 ">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Send message</CardTitle>
          <CardDescription>Pin your message to the board.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <FormItem className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Your superhero alias"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
                {formErrors.name && (
                  <p className="text-sm text-red-500">{formErrors.name}</p>
                )}
              </FormItem>
              <FormItem className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="Where magic messages go"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {formErrors.email && (
                  <p className="text-sm text-red-500">{formErrors.email}</p>
                )}
              </FormItem>
              <FormItem className="flex flex-col space-y-1.5">
                <Label htmlFor="phoneNumber">Phone</Label>
                <Input
                  type="tel"
                  id="phoneNumber"
                  placeholder="Your bat signal number"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
                {formErrors.phoneNumber && (
                  <p className="text-sm text-red-500">
                    {formErrors.phoneNumber}
                  </p>
                )}
              </FormItem>
              <FormItem className="flex flex-col space-y-1.5">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Tell us your wildest dreams"
                  name="message"
                  value={formData.message}
                  // @ts-ignore
                  onChange={handleChange}
                />
                {formErrors.message && (
                  <p className="text-sm text-red-500">{formErrors.message}</p>
                )}
              </FormItem>
              <FormSuccess message={formSuccessMessage} />
              <FormError message={formErrorMessage} />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href={"/entries"}>
            <Button variant="outline">Entries</Button>
          </Link>
          <Button onClick={handleSubmit}>Submit</Button>
        </CardFooter>
      </Card>
    </main>
  );
}
