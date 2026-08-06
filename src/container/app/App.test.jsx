import React from "react";
import { render, screen } from "@testing-library/react";
import { vi, test, expect } from "vitest";
import axios from "axios";
import App from "./App";

vi.mock("axios");

const mockWidgets = {
  widgets: [
    {
      id: 1,
      title: "Test Widget",
      price: 100,
      imageURL: "img/test.webp",
      description: "A test widget",
      specifications: {
        dimensions: { length: 1, width: 2, height: 3 },
        weight: { qty: "1lbs" },
        capacity: { qty: "1L" },
      },
    },
  ],
};

test("renders the app header", () => {
  axios.get.mockResolvedValue({ data: mockWidgets });
  render(<App />);
  expect(screen.getByText("Widget Depot")).toBeInTheDocument();
});

test("renders widgets once the data has loaded", async () => {
  axios.get.mockResolvedValue({ data: mockWidgets });
  render(<App />);
  expect(await screen.findByText("$100")).toBeInTheDocument();
});

test("shows an error message when the widget data fails to load", async () => {
  axios.get.mockRejectedValue(new Error("network error"));
  render(<App />);
  expect(
    await screen.findByText(/failed to load widgets/i)
  ).toBeInTheDocument();
});
