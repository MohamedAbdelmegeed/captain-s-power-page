import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Captain Fouad El Agamy — Gym & Nutrition Coach" },
      {
        name: "description",
        content:
          "Personal training and nutrition coaching with Captain Fouad El Agamy. Bilingual AR/EN landing page.",
      },
    ],
  }),
});

function Index() {
  useEffect(() => {
    window.location.replace("/coach/index.html");
  }, []);
  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: "#111", color: "#fff", fontFamily: "sans-serif" }}>
      <a href="/coach/index.html" style={{ color: "#FF4500" }}>Open landing page →</a>
    </div>
  );
}
