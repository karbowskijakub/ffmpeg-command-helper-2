import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useMutation } from "@tanstack/react-query";
import { postRegister, checkEmail } from "@/api/api";
import Hero from "../components/Hero";
import { toast } from "react-toastify";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { privacyPolicy } from "../data/privacy-policy";
const passwordValidation = z
  .string()
  .min(6, { message: "Password must be at least 6 characters long." })
  .refine((value) => /[A-Z]/.test(value), {
    message: "Password must contain at least one uppercase letter ('A'-'Z').",
  })
  .refine((value) => /[0-9]/.test(value), {
    message: "Password must contain at least one number ('0'-'9').",
  })
  .refine((value) => /[^a-zA-Z0-9]/.test(value), {
    message: "Password must contain at least one special character.",
  });

const formSchema = z
  .object({
    firstName: z
      .string()
      .min(2, { message: "First name must be at least 2 characters long." })
      .max(50, {
        message: "First name cannot be longer than 50 characters.",
      }),
    lastName: z
      .string()
      .min(2, { message: "Last name must be at least 2 characters long." })
      .max(50, {
        message: "Last name cannot be longer than 50 characters.",
      }),
    email: z
      .string()
      .email({ message: "Please provide a valid email address." }),
    password: passwordValidation,
    confirmPassword: z.string(),
    terms: z.boolean().refine((value) => value === true, {
      message: "You must accept the privacy policy.",
    }),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "Passwords must match.",
      });
    }
  });

const Register = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  const mutation = useMutation({
    mutationFn: postRegister,
    onSuccess: async () => {
      try {
        form.reset();
        toast.success(
          "Registration successful! A confirmation email has been sent to activate your account."
        );
        navigate("/login");
      } catch (error) {
        console.error("Error during additional registration steps:", error);
      }
    },
    onError: (error) => {
      console.error("Registration failed:", error);
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const email = await checkEmail(values.email);

      if (email) {
        toast.error("The provided email is already registered.");
        return;
      }

      mutation.mutate(values);
    } catch (error) {
      toast.error("An error occurred during email validation.");
    }
  };
  const navigate = useNavigate();

  return (
    <section className="h-screen">
      <div className="flex h-full items-center justify-center">
        <Hero />
        <div className="flex h-full w-3/4 lg:w-1/2 flex-col items-center justify-center">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 w-1/2"
            >
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Register</FormLabel>
                    <FormControl>
                      <Input placeholder="First Name" {...field} />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Last Name" {...field} />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={"password"}
                          placeholder="Password"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div>
                        <Input
                          className="relative"
                          type={"password"}
                          placeholder="Confirm Password"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-center my-5">
                <ReCAPTCHA
                  sitekey={"6LeHjVkqAAAAAMzyyr__uhqNJg25su2DGWKQKv9T"}
                  onChange={(val) => setRecaptchaToken(val)}
                />
              </div>
              <div className="flex flex-col text-center">
                <Button
                  disabled={!recaptchaToken}
                  className="mb-3"
                  size="lg"
                  type="submit"
                >
                  Register
                </Button>
              </div>
              <FormField
                control={form.control}
                name="terms"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex justify-center">
                        <div className="items-top flex space-x-2">
                          <Checkbox
                            id="terms"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                          <div className="grid gap-1.5 leading-none">
                            <label
                              htmlFor="terms"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              By registering, you confirm the{" "}
                              <Dialog
                                open={dialogOpen}
                                onOpenChange={setDialogOpen}
                              >
                                <DialogTrigger asChild>
                                  <strong className="cursor-pointer">
                                    privacy policy.
                                  </strong>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                  <DialogHeader>
                                    <DialogTitle>Privacy Policy</DialogTitle>
                                    <DialogDescription>
                                      Read privacy policy before you create an
                                      account.
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div
                                    className="text-sm text-gray-600 mb-4"
                                    dangerouslySetInnerHTML={{
                                      __html: privacyPolicy,
                                    }}
                                  ></div>
                                  <div className="w-full">
                                    <div className="flex justify-center">
                                      <Button
                                        type="button"
                                        onClick={() => setDialogOpen(false)}
                                      >
                                        Close policy
                                      </Button>
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </label>
                            <span className="text-center text-sm font-medium">
                              Already have an account?{" "}
                              <Link to="/login">Log in</Link>
                            </span>
                          </div>
                        </div>
                      </div>
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage className="flex justify-center" />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default Register;
