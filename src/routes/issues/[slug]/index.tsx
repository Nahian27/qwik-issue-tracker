import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { PrismaClient } from "@prisma/client";

export const useGetIssueDetails = routeLoader$(async ({ params }) => {
  const prisma = new PrismaClient();
  return await prisma.issue.findUnique({
    where: { id: Number(params.slug) },
  });
});
export default component$(() => {
  const issue = useGetIssueDetails();
  if (!issue.value) {
    return <h1 class="text-danger">Sorry, no issue found!</h1>;
  }
  return (
    <>
      <h1>Issue Details</h1>
      <h5 class="text-secondary">Title</h5>
      <p>{issue.value.title}</p>
      <h5 class="text-secondary">Description</h5>
      <p>{issue.value.description}</p>
      <h5 class="text-secondary">Status</h5>
      <p class="badge bg-danger rounded-pill ">{issue.value.status}</p>
      <h5 class="text-secondary">Created at</h5>
      <p>{issue.value.created_at.toLocaleString()}</p>
      <h5 class="text-secondary">Last updated at</h5>
      <p>{issue.value.updated_at.toLocaleString()}</p>
    </>
  );
});

export const head: DocumentHead = {
  title: "Issue Details",
  meta: [
    {
      name: "description",
      content: "Made by Al-Nahian Pulok",
    },
  ],
};
