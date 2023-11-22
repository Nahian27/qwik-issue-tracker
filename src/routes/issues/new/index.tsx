import { component$ } from "@builder.io/qwik";
import {
  routeAction$,
  type DocumentHead,
  Form,
  Link,
} from "@builder.io/qwik-city";
import prisma from "~/libs/PrismaClient";

export const useCreateIssue = routeAction$(async (data) => {
  await prisma.issue.create({
    data: {
      title: data.title as string,
      description: data.description as string,
    },
  });
  return { success: true };
});

export default component$(() => {
  const SubmitIssue = useCreateIssue();

  return (
    <>
      <h1>Create a new issue</h1>
      {SubmitIssue.value?.success && (
        <div class="alert alert-success" role="alert">
          A new issue created!
        </div>
      )}
      <Form action={SubmitIssue}>
        <div class="row mb-3">
          <label for="inputEmail3" class="col-sm-2 col-form-label">
            Title
          </label>
          <div class="col-sm-10">
            <input
              name="title"
              type="text"
              class="form-control"
              id="inputEmail3"
              placeholder="Title of an issue"
              minLength={2}
              autoComplete="false"
              required
            />
          </div>
        </div>
        <div class="row mb-3">
          <label for="inputPassword3" class="col-sm-2 col-form-label">
            Description
          </label>
          <div class="col-sm-10">
            <textarea
              name="description"
              class="form-control"
              rows={3}
              id="inputPassword3"
              placeholder="Description of an issue"
              minLength={2}
              autoComplete="false"
              required
            />
          </div>
        </div>
        <fieldset class="row mb-3">
          <legend class="col-form-label col-sm-2 pt-0">Status</legend>
          <div class="col-sm-10">
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="gridRadios"
                id="gridRadios1"
                value="option1"
                checked
              />
              <label
                class="form-check-label badge bg-danger rounded-pill"
                for="gridRadios1"
              >
                Open
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="gridRadios"
                id="gridRadios2"
                value="option2"
              />
              <label
                class="form-check-label badge bg-success rounded-pill"
                for="gridRadios2"
              >
                Closed
              </label>
            </div>
            <div class="form-check disabled">
              <input
                class="form-check-input"
                type="radio"
                name="gridRadios"
                id="gridRadios3"
                value="option3"
              />
              <label
                class="form-check-label badge bg-warning rounded-pill"
                for="gridRadios3"
              >
                In Progress
              </label>
            </div>
          </div>
        </fieldset>
        <div class="row mb-3">
          <div class="col-sm-10 offset-sm-2">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="gridCheck1" />
              <label class="form-check-label" for="gridCheck1">
                Example checkbox
              </label>
            </div>
          </div>
        </div>
        <button type="submit" class="btn btn-primary me-2">
          Submit issue
        </button>
        <Link href="/issues" class="btn btn-outline-primary">
          Back
        </Link>
      </Form>
    </>
  );
});

export const head: DocumentHead = {
  title: "New Issue",
  meta: [
    {
      name: "description",
      content: "Made by Al-Nahian Pulok",
    },
  ],
};
