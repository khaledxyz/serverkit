import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { useDebounceCallback } from "usehooks-ts";

import { generateScript } from "@/lib/script-generator";
import { useGeneratorStore } from "@/stores/generator-store";

import { DistroSelector } from "./distro-selector";
import { HostnameInput } from "./hostname-input";
import { SshSettings } from "./ssh-settings";
import { SystemUpdatesSettings } from "./system-updates-settings";
import { TimezoneInput } from "./timezone-input";
import { UsersSettings } from "./users-settings";

export function MainForm() {
  const setGeneratedScript = useGeneratorStore(
    (state) => state.setGeneratedScript
  );

  const methods = useForm({
    defaultValues: {
      distro: null,
      hostname: "",
      timezone: "",
      initialSystemUpdate: true,
      automaticSecurityUpdates: true,
    },
  });

  // Debounced function to update the script
  // biome-ignore lint/suspicious/noExplicitAny: <only temporarily>
  const debouncedSetScript = useDebounceCallback((formData: any) => {
    const script = generateScript(formData);
    setGeneratedScript(script);
  }, 300);

  // Watch form and trigger debounced update
  useEffect(() => {
    const subscription = methods.watch((formData) => {
      debouncedSetScript(formData);
    });

    return () => subscription.unsubscribe();
  }, [methods, debouncedSetScript]);

  return (
    <FormProvider {...methods}>
      <form className="space-y-5">
        <DistroSelector />
        <HostnameInput />
        <TimezoneInput />
        <SystemUpdatesSettings />
        <UsersSettings />
        <SshSettings />
      </form>
    </FormProvider>
  );
}
