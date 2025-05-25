import Input from "@/components/input/Input";
import Typography from "@/components/Typography/Typography";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axiosClient from "@/lib/axios";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import Button from "@/components/buttons/Buttons";

type FormValues = {
  email: string;
  password: string;
};

const validationSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .max(100, { message: "Email must be less than 100 characters" })
    .email({ message: "Invalid email address" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(30, { message: "Password must be less than 30 characters" }),
});

export default function Login() {
  const router = useRouter();

  const handleForm = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(validationSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = handleForm;

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await axiosClient.post("/users/login", data);
      console.log("Login response:", response.data);
      
      const { token, name, email } = response.data.data;

      // Cek dulu apakah token ada
      if (!token?.accessToken || !token?.refreshToken) {
        toast.error("Token tidak ditemukan dalam response");
        return;
      }

      localStorage.setItem("access_token", token.accessToken);
      localStorage.setItem("refresh_token", token.refreshToken);
      localStorage.setItem("user", JSON.stringify({ name, email }));

      toast.success("Login successful");
      router.push("/catalog");
    } catch (error: any) {
      toast.error(error.response?.data?.errors || "Login failed");
      console.error("Login error:", error);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-md p-8 rounded-lg shadow-2xl bg-white">
        <FormProvider {...handleForm}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-0 "
          >
            <div className="text-center">
              <div className="inline-block bg-[#e60012] px-6 py-2 rounded">
                <Typography
                  type="Header"
                  size="2xl"
                  className="text-white font-extrabold tracking-widest"
                >
                  PRAMSTORE
                </Typography>
              </div>
              <Typography
                type="Paragraph"
                size="lg"
                className="mt-2 text-gray-800"
              >
                Sign in to your account
              </Typography>
            </div>

            <Input
              id="email"
              type="email"
              label="Email"
              placeholder="Enter your email"
              required
              autoComplete="off"
              {...register("email")}
            />

            <Input
              id="password"
              type="password"
              label="Password"
              placeholder="Enter your password"
              required
              autoComplete="off"
              {...register("password")}
            />

            <Button
              type="submit"
              color="Light"
              onClick={() => { }}
              className="bg-[#e60012] hover:bg-[#cc0010] text-white font-semibold py-2 px-4 rounded transition duration-200 ease-in-out w-full"
            >
              Login
            </Button>
          </form>
        </FormProvider>
      </div>
    </section>
  );
}
