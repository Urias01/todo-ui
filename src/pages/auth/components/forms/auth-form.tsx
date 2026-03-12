import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "@/features/auth/api/sign-in";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const authSchema = z.object({
  email: z.email("Invalid email"),
  password: z.string()
});

type AuthSchema = z.infer<typeof authSchema>;

const authDefault: AuthSchema = {
  email: "",
  password: ""
};

export function AuthForm() {
  const navigate = useNavigate();

  const form = useForm<AuthSchema>({
    defaultValues: authDefault,
    resolver: zodResolver(authSchema)
  });

  const { register, handleSubmit } = form;

  const { mutateAsync: signInFn } = useMutation({
    mutationFn: signIn
  });

  async function handleSubmitAuth(data: AuthSchema) {
    try {
      const response = await signInFn(data);

      localStorage.setItem("token", response.token);

      toast.success("Sign in successfully");

      navigate("/", { replace: true });
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Ocorreu um erro desconhecido");
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleSubmitAuth)}
      className="min-w-130 grid grid-cols-1 gap-4"
    >
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="email">E-mail</FieldLabel>

          <Input
            id="email"
            placeholder="john@mail.com"
            {...register("email")}
          />

          {form.formState.errors.email && (
            <FieldError errors={[form.formState.errors.email]} />
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>

          <Input id="password" type="password" {...register("password")} />

          {form.formState.errors.password && (
            <FieldError errors={[form.formState.errors.password]} />
          )}
        </Field>
      </FieldGroup>

      <Button type="submit">Sign in</Button>
    </form>
  );
}
