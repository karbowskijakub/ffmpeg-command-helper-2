import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "@/api/api";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

const formSchema = z.object({
  email: z.string().email({ message: "Please provide a valid email address." }),
  oldPassword: z.string().min(6, { message: "Password must be at least 6 characters long." }),
  newPassword: z.string().min(6, { message: "New password must be at least 6 characters long." }),
  confirmNewPassword: z.string().min(6, { message: "Please confirm your new password." }),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: "Passwords must match.",
  path: ["confirmNewPassword"],
});

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get('userId') ?? '';
  const resetCode = searchParams.get('code') ?? '';

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      toast.success("Password has been successfully changed!");
      navigate("/login");
    },
    onError: () => {
      toast.error("An error occurred while changing the password. Please try again.");
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { email, newPassword } = values;
    if (userId && resetCode) {
      mutation.mutate({ email, resetCode, newPassword });
    } else {
      toast.error("Missing parameters in URL.");
    }
  }

  return (
    <section className="h-screen">
      <div className="flex h-full items-center justify-center">
        <div className="flex h-full w-3/4 lg:w-1/2 flex-col items-center justify-center">
          <div className="bg-white p-12 rounded-lg shadow-lg w-full max-w-lg mt-24">
            <h1 className="text-2xl font-bold mb-6 text-center text-black">Change Password</h1>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your email address" className="w-full py-3 px-4" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="oldPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Old Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Enter old password" className="w-full py-3 px-4" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Enter new password" className="w-full py-3 px-4" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmNewPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm New Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Confirm new password" className="w-full py-3 px-4" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex flex-col text-center">
                  <Button type="submit" className="w-full py-3 rounded-md">
                    Change Password
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
