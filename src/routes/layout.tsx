import { component$, Slot } from "@builder.io/qwik";
import { type RequestHandler } from "@builder.io/qwik-city";
import NavBar from "~/components/NavBar";

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.builder.io/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    // staleWhileRevalidate: 60 * 60 * 24 * 7,
    staleWhileRevalidate: 0,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    // maxAge: 5,
    maxAge: 0,
  });
};

export default component$(() => {
  return (
    <>
      <NavBar />
      <main class="container">
        <Slot />
      </main>
    </>
  );
});
