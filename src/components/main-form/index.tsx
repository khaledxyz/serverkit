import { generateSetupScript } from "@/lib/generate-script";
import { useErrorStore } from "@/stores/errors-store";
import { useScriptStore } from "@/stores/script-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form } from "../ui/form";
import {
  defaultFormValues,
  FormSchema,
  type FormSchemaType,
} from "./constants";
import { DistroSelector } from "./distro-selector";
import { FailToBan } from "./fail-to-ban";
import { General } from "./general";

export function MainForm() {
  const { setScript } = useScriptStore();
  const { clearErrors, addError } = useErrorStore();

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: defaultFormValues,
    mode: "onChange",
  });

  form.watch((values) => {
    try {
      const generated = generateSetupScript(values as FormSchemaType);
      setScript(generated);
    } catch (err) {
      console.log(err);
    }
  });

  useEffect(() => {
    const errors = form.formState.errors;
    clearErrors();

    // extract error messages from nested error object
    Object.values(errors).forEach((error) => {
      if (error?.message) {
        addError(error.message);
      }
    });
  }, [form.formState.errors, clearErrors, addError]);

  return (
    <Form {...form}>
      <form className="space-y-4 p-3">
        <DistroSelector />
        <General />
        <FailToBan />
      </form>
    </Form>
  );
}
