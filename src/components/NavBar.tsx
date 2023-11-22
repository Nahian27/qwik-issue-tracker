import { component$ } from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";

const tabs = [
  { label: "Dashboard", route: "/" },
  { label: "Issues", route: "/issues" },
];

export default component$(() => {
  const pathname = useLocation().url.pathname;

  return (
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container">
        <Link class="navbar-brand" href="/">
          TELESCOPE🔭
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon" />
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            {tabs.map((tab) => (
              <li key={tab.route} class="nav-item">
                <Link
                  prefetch={false}
                  class={`nav-link ${pathname === tab.route && "active"}`}
                  aria-current="page"
                  href={tab.route}
                >
                  {tab.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
});
