import { formOptions, useForm } from "@tanstack/react-form";
import { z } from "zod";
import { useAppForm } from "~/hooks/form/use-app-form";
import { FieldInfo } from "~/components/form/field-info";
import { Student } from "./create-student-form.types";

const defaultStudent: Student = {
  firstName: "",
  lastName: "",
};

const studentSchema = z.object({
  firstName: z.string().min(3),
  lastName: z.string().min(3),
});

const formOpts = formOptions({
  defaultValues: defaultStudent,
});

export const CreateStudentForm = () => {
  const form = useAppForm({
    ...formOpts,
    onSubmit: async ({ value }) => {
      //do something with the form data
      console.log(value);
    },
    validators: {
      onChange: studentSchema,
    },
  });
  return (
    <div>
      Hello "/students/create"!
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        className="flex flex-col gap-4 border-white border p-8 rounded-md max-w-xs m-auto shadow-sm"
      >
        Create a new student
        <form.AppField
          name="firstName"
          children={(field) => (
            <>
              <field.TextField label="First Name" />
              <FieldInfo field={field} />
            </>
          )}
        />
        <form.AppField
          name="lastName"
          children={(field) => <field.TextField label="Last Name" />}
        />
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]: [boolean, boolean]) => (
            <>
              <button
                type="submit"
                disabled={!canSubmit}
                className="bg-blue-500 rounded disabled:bg-gray-500"
              >
                {isSubmitting ? "..." : "Submit"}
              </button>
              <button
                type="reset"
                className="underline"
                onClick={(e) => {
                  // Avoid unexpected resets of form elements (especially <select> elements)
                  e.preventDefault();
                  form.reset();
                }}
              >
                Reset
              </button>
            </>
          )}
        />
      </form>
    </div>
  );
};
