import { createFormHook } from "@tanstack/react-form";
import { fieldContext, formContext } from "./form-context";
import { TextField } from "~/components/form/text-field";
import { FieldInfo } from "~/components/form/field-info";

export const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    TextField,
    FieldInfo,
  },
  formComponents: {},
});
