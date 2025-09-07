import { useFieldContext } from "~/hooks/form/form-context";

export function TextField({ label }: { label: string }) {
  const field = useFieldContext<string>();
  return (
    <label>
      <span>{label}</span>
      <input
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
      />
    </label>
  );
}
