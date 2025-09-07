import { createFileRoute } from "@tanstack/react-router";
import { CreateStudentForm } from "~/features/students/create/create-student-form";

export const Route = createFileRoute("/students/create")({
  component: RouteComponent,
});

function RouteComponent() {
  return <CreateStudentForm />;
}
