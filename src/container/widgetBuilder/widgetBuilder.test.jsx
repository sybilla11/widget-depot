import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { vi, test, expect, beforeEach } from "vitest";
import axios from "axios";
import WidgetBuilder from "./widgetBuilder";

vi.mock("axios");

function renderWidgetBuilder(initialPath = "/") {
  return render(
    <MemoryRouter
      initialEntries={[initialPath]}
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <Routes>
        <Route path="/widgets/:id" element={<WidgetBuilder />}></Route>
        <Route path="/" element={<WidgetBuilder />}></Route>
      </Routes>
    </MemoryRouter>
  );
}

const mockData = {
  widgets: [
    {
      id: 1,
      title: "Alpha Widget",
      price: 100,
      imageURL: "img/alpha.webp",
      description: "Alpha description",
      specifications: {
        dimensions: { length: 1, width: 2, height: 3 },
        weight: { qty: "1lbs" },
        capacity: { qty: "1L" },
      },
    },
    {
      id: 2,
      title: "Beta Widget",
      price: 250,
      imageURL: "img/beta.webp",
      description: "Beta description",
      specifications: {
        dimensions: { length: 4, width: 5, height: 6 },
        weight: { qty: "2lbs" },
        capacity: { qty: "2L" },
      },
    },
  ],
};

beforeEach(() => {
  axios.get.mockResolvedValue({ data: mockData });
  window.localStorage.clear();
});

test("shows the first widget's details by default once loaded", async () => {
  renderWidgetBuilder();
  expect(await screen.findByTestId("widget-detail-title")).toHaveTextContent(
    "Alpha Widget"
  );
});

test("deep-linking directly to a widget's URL shows that widget", async () => {
  renderWidgetBuilder("/widgets/2");
  expect(await screen.findByTestId("widget-detail-title")).toHaveTextContent(
    "Beta Widget"
  );
});

test("an unknown widget id in the URL shows the select-a-widget placeholder instead of crashing", async () => {
  renderWidgetBuilder("/widgets/999");
  await screen.findByRole("button", { name: /Alpha Widget/i });
  expect(screen.queryByTestId("widget-detail-title")).not.toBeInTheDocument();
  expect(screen.getByText(/select a widget to see its details/i)).toBeInTheDocument();
});

test("clicking a widget in the list shows its details", async () => {
  renderWidgetBuilder();
  await screen.findByTestId("widget-detail-title");

  fireEvent.click(screen.getByRole("button", { name: /Beta Widget/i }));

  expect(screen.getByTestId("widget-detail-title")).toHaveTextContent(
    "Beta Widget"
  );
});

test("clicking a widget in the list marks it as selected", async () => {
  renderWidgetBuilder();
  await screen.findByTestId("widget-detail-title");

  const betaButton = screen.getByRole("button", { name: /Beta Widget/i });
  expect(betaButton).toHaveAttribute("aria-pressed", "false");

  fireEvent.click(betaButton);

  expect(betaButton).toHaveAttribute("aria-pressed", "true");
});

test("clicking add-to-cart increments the cart count", async () => {
  renderWidgetBuilder();
  await screen.findByTestId("widget-detail-title");

  const cartCount = screen.getByTestId("cart-count");
  expect(cartCount).toHaveTextContent("0");

  fireEvent.click(screen.getByTestId("add-to-cart-button"));
  fireEvent.click(screen.getByTestId("add-to-cart-button"));

  expect(cartCount).toHaveTextContent("2");
});

test("filters the widget list by search term", async () => {
  renderWidgetBuilder();
  await screen.findByRole("button", { name: /Beta Widget/i });

  fireEvent.change(screen.getByLabelText(/find the widget of your dreams/i), {
    target: { value: "beta" },
  });

  expect(
    screen.queryByRole("button", { name: /Alpha Widget/i })
  ).not.toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: /Beta Widget/i })
  ).toBeInTheDocument();
});

test("shows a message when the search matches nothing", async () => {
  renderWidgetBuilder();
  await screen.findByRole("button", { name: /Alpha Widget/i });

  fireEvent.change(screen.getByLabelText(/find the widget of your dreams/i), {
    target: { value: "nonexistent" },
  });

  expect(await screen.findByTestId("no-results-message")).toHaveTextContent(
    'No widgets match "nonexistent"'
  );
});

test("clears the stale detail pane when the selected widget is filtered out", async () => {
  renderWidgetBuilder();
  await screen.findByTestId("widget-detail-title");

  fireEvent.change(screen.getByLabelText(/find the widget of your dreams/i), {
    target: { value: "nonexistent" },
  });

  await screen.findByTestId("no-results-message");
  expect(screen.queryByTestId("widget-detail-title")).not.toBeInTheDocument();
});

test("shows a line item in the cart drawer with correct quantity and price", async () => {
  renderWidgetBuilder();
  await screen.findByTestId("widget-detail-title");

  fireEvent.click(screen.getByTestId("add-to-cart-button"));
  fireEvent.click(screen.getByTestId("add-to-cart-button"));
  fireEvent.click(screen.getByTestId("cart-toggle"));

  expect(screen.getByTestId("qty-1")).toHaveTextContent("2");
  expect(screen.getByText("$200")).toBeInTheDocument();
});

test("increments an item's quantity from the drawer", async () => {
  renderWidgetBuilder();
  await screen.findByTestId("widget-detail-title");

  fireEvent.click(screen.getByTestId("add-to-cart-button"));
  fireEvent.click(screen.getByTestId("cart-toggle"));
  fireEvent.click(
    screen.getByRole("button", { name: /Increase Alpha Widget quantity/i })
  );

  expect(screen.getByTestId("qty-1")).toHaveTextContent("2");
  expect(screen.getByTestId("cart-count")).toHaveTextContent("2");
});

test("decrementing an item to zero removes it from the cart", async () => {
  renderWidgetBuilder();
  await screen.findByTestId("widget-detail-title");

  fireEvent.click(screen.getByTestId("add-to-cart-button"));
  fireEvent.click(screen.getByTestId("cart-toggle"));
  fireEvent.click(
    screen.getByRole("button", { name: /Decrease Alpha Widget quantity/i })
  );

  expect(screen.getByTestId("cart-drawer")).toHaveTextContent(
    "Your cart is empty"
  );
  expect(screen.getByTestId("cart-count")).toHaveTextContent("0");
});

test("removes an item from the cart via the remove button", async () => {
  renderWidgetBuilder();
  await screen.findByTestId("widget-detail-title");

  fireEvent.click(screen.getByTestId("add-to-cart-button"));
  fireEvent.click(screen.getByTestId("cart-toggle"));
  fireEvent.click(
    screen.getByRole("button", { name: /Remove Alpha Widget from cart/i })
  );

  expect(screen.getByTestId("cart-drawer")).toHaveTextContent(
    "Your cart is empty"
  );
});

test("persists the cart to localStorage across remounts", async () => {
  const { unmount } = renderWidgetBuilder();
  await screen.findByTestId("widget-detail-title");

  fireEvent.click(screen.getByTestId("add-to-cart-button"));
  fireEvent.click(screen.getByTestId("add-to-cart-button"));
  expect(screen.getByTestId("cart-count")).toHaveTextContent("2");

  unmount();
  renderWidgetBuilder();

  expect(await screen.findByTestId("cart-count")).toHaveTextContent("2");
});

test("shows an error message when the widget data fails to load", async () => {
  axios.get.mockRejectedValue(new Error("network error"));
  renderWidgetBuilder();

  expect(
    await screen.findByText(/failed to load widgets/i)
  ).toBeInTheDocument();
});
