import type { FormSchemaType } from "@/components/main-form/constants";
import { useEffect, useRef } from "react";
import isEqual from "react-fast-compare";
import { useDebounceCallback } from "usehooks-ts";

export function useDebouncedFormWatcher(
  form: any,
  delay: number,
  onChange: (values: FormSchemaType) => void
) {
  const prevValuesRef = useRef<FormSchemaType | null>(null);

  const debouncedOnChange = useDebounceCallback(onChange, delay);

  useEffect(() => {
    const subscription = form.watch((values: FormSchemaType) => {
      if (isEqual(prevValuesRef.current, values)) {
        return;
      }

      prevValuesRef.current = values;
      debouncedOnChange(values);
    });

    return () => subscription.unsubscribe();
  }, [form, debouncedOnChange]);
}
