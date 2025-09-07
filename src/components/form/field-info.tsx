import type { AnyFieldApi, FieldApi } from "@tanstack/react-form";

export function FieldInfo({ field }: { field: AnyFieldApi }) {
  console.log(field.state.meta.errors);
  return (
    <>
      {field.state.meta.isTouched && !field.state.meta.isValid ? (
        <em className="text-red-400 font-mono text-xs italic">
          {field.state.meta.errors.map((e) => e.message).join(",")}
        </em>
      ) : null}
      {field.state.meta.isValidating ? "Validating..." : null}
    </>
  );
}
