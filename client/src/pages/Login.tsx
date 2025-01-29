import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Link } from "react-router-dom";
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
import { useMutation } from "@tanstack/react-query";
import { postLogin } from "@/api/api";
import Hero from "@/components/Hero";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import ResetPasswordPopup from "@/components/ResetPopup";
import { useAuth } from "@/hooks/AuthContext";


const formSchema = z.object({
  email: z.string().email({ message: "Please provide a valid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long." }),
});

const Login = () => {
  const [isResetPasswordPopupVisible, setResetPasswordPopupVisible] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const { setIsAuthenticated } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const mutation = useMutation({
    mutationFn: postLogin,
    onSuccess: (data) => {
      console.log("Login successful:", data);
      setLoginAttempts(0);
      setIsAuthenticated(true);
      navigate("/main");

    },
    onError: (error: Error) => {
      setLoginAttempts((prev) => prev + 1);
      const attemptsLeft = 5 - (loginAttempts + 1);

      switch (error.message) {
        case "INVALID_CREDENTIALS":
          if (attemptsLeft > 0) {
            toast.error(`Login failed: Incorrect email or password. Attempts left: ${attemptsLeft}`);
          } else {
            toast.error("Your account has been locked due to multiple failed login attempts. Please try again later.");
          }
          break;
        case "ACCOUNT_LOCKED":
          toast.error("Your account has been locked due to multiple failed login attempts. Please try again later.");
          break;
        case "ACCOUNT_NOT_CONFIRMED":
          toast.error("Your account has not been confirmed. Please check your email for the activation link.");
          break;
        case "GENERAL_ERROR":
          toast.error("An error occurred during login. Please try again later.");
          break;
        case "UNEXPECTED_ERROR":
          toast.error("An unexpected error occurred. Please try again later.");
          break;
        default:
          toast.error("An unexpected error occurred.");
          break;
      }
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutation.mutate(values);
  };

  const navigate = useNavigate();

  return (
    <section className="h-screen">
      <div className="flex h-full items-center justify-center">
        <Hero />
        <div className="flex h-full w-3/4 lg:w-1/2 flex-col items-center justify-center">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-1/2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Login</FormLabel>
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
              <div className="flex flex-col text-center">
                <Button variant="default" size="sm" type="submit" className="mb-4">
                  Continue
                </Button>
                <p>
                  Don't have an account? 
                  <Link to="/register" className="font-bold"> Sign up</Link> for FFmpeg Commander.
                </p>
                <p className="text-center mt-4">
                  <button
                    type="button"
                    className="text-blue-500 hover:underline"
                    onClick={() => setResetPasswordPopupVisible(true)}
                  >
                    Forgot your password? Reset it here.
                  </button>
                </p>
              </div>
            </form>
          </Form>
        </div>
      </div>
      {isResetPasswordPopupVisible && (
        <ResetPasswordPopup
          isOpen={isResetPasswordPopupVisible}
          onClose={() => setResetPasswordPopupVisible(false)}
        />
      )}
    </section>
  );
};

export default Login;
