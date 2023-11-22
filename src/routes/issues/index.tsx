import { component$ } from "@builder.io/qwik";
import {
  routeLoader$,
  type DocumentHead,
  Link,
  Form,
  routeAction$,
} from "@builder.io/qwik-city";
import { PrismaClient } from "@prisma/client";

export const useGetIssues = routeLoader$(async () => {
  const prisma = new PrismaClient();
  return await prisma.issue.findMany();
});

export const useDeleteIssue = routeAction$(async (data) => {
  const prisma = new PrismaClient();
  return await prisma.issue.delete({ where: { id: Number(data.id) } });
});

export default component$(() => {
  const issues = useGetIssues();
  const deleteIssue = useDeleteIssue();
  return (
    <>
      <h1>Issues</h1>
      <Link href="/issues/new" class="btn btn-primary btn-sm">
        New issue
      </Link>
      <div class="card p-3 mt-3 table-responsive">
        <table class="table table-hover mb-0 table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Status</th>
              <th scope="col">Description</th>
              <th scope="col">Created At</th>
              <th scope="col">Updated At</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {issues.value.map((issue, index) => (
              <tr key={issue.id}>
                <th scope="row">{index + 1}</th>
                <td>
                  <Link href={"/issues/" + issue.id}>{issue.title}</Link>
                </td>
                <td>
                  <span class="badge bg-danger rounded-pill">
                    {issue.status}
                  </span>
                </td>
                <td>{issue.description}</td>
                <td>{issue.created_at.toLocaleString()}</td>
                <td>{issue.updated_at.toLocaleString()}</td>
                <td>
                  <Form action={deleteIssue}>
                    <input type="hidden" name="id" value={issue.id} />
                    <button type="submit" class="btn btn-sm btn-info">
                      Delete
                    </button>
                  </Form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Issues",
  meta: [
    {
      name: "description",
      content: "Made by Al-Nahian Pulok",
    },
  ],
};
