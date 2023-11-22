import { component$, useVisibleTask$ } from "@builder.io/qwik";

export default component$(() => {
  useVisibleTask$(() => {
    import('bootstrap')
  })
  return null
});