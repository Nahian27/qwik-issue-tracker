import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { PrismaClient } from "@prisma/client";

export const useGetIssues = routeLoader$(async () => {
  const prisma = new PrismaClient();
  return await prisma.issue.findMany();
});

export default component$(() => {
  const issues = useGetIssues();
  return (
    <>
      <h1>Dashboard</h1>
      {issues.value.map((issue) => (
        <p key={issue.id}>{issue.title}</p>
      ))}
    </>
  );
});

export const head: DocumentHead = {
  title: "Issue Tracker",
  meta: [
    {
      name: "description",
      content: "Made by Al-Nahian Pulok",
    },
  ],
};
