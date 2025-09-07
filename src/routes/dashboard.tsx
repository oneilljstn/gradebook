import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard"!

    <div>List of Classes</div>
    <div>List of Students</div>
    <div>List of Assessments</div>

  </div>
}
