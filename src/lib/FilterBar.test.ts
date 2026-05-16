import { render, screen, fireEvent } from "@testing-library/svelte";
import FilterBar from "./FilterBar.svelte";

const baseProps = {
  categories: ["systems", "supplements"],
  authors: ["Author A", "Author B"],
  genres: ["horror", "fantasy"],
  costs: ["free", "paid"],
  category: "all",
  author: "all",
  genre: "all",
  cost: "all",
  show: true,
};

test("renders nothing when show is false", () => {
  render(FilterBar, { ...baseProps, show: false });
  expect(screen.queryByText("Categories")).not.toBeInTheDocument();
});

test("renders all four filter selects when show is true", () => {
  render(FilterBar, baseProps);
  expect(screen.getByText("Categories")).toBeInTheDocument();
  expect(screen.getByText("Authors")).toBeInTheDocument();
  expect(screen.getByText("Genres")).toBeInTheDocument();
  expect(screen.getByText("All Costs")).toBeInTheDocument();
  expect(screen.queryByLabelText("Sort by")).not.toBeInTheDocument();
});

test("Clear filters button is disabled when nothing is dirty", () => {
  render(FilterBar, baseProps);
  expect(screen.getByRole("button", { name: "Clear filters" })).toBeDisabled();
});

test("Clear filters button is enabled when a filter is non-default", () => {
  render(FilterBar, { ...baseProps, category: "systems" });
  expect(
    screen.getByRole("button", { name: "Clear filters" }),
  ).not.toBeDisabled();
});

test("clicking Clear filters resets selects to default values", async () => {
  render(FilterBar, { ...baseProps, category: "systems" });
  await fireEvent.click(screen.getByRole("button", { name: "Clear filters" }));
  expect(screen.getByRole("button", { name: "Clear filters" })).toBeDisabled();
});
