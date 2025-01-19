// app/layout.js
import "./globals.css";
import { NextStepProvider, NextStep } from "nextstepjs";

export const metadata = {
  title: "Pins Demo",
  description: "Display search results as pins on a Leaflet map",
};

const steps = [
  {
    tour: "mainTour",
    steps: [
      {
        title: "Welcome to NextStep!",
        content: "Let us guide you through the features of this application.",
        selector: "body", // General welcome message, no specific element
        showControls: true,
        showSkip: true,
      },
      {
        title: "Search Bar",
        content: "This is the search bar where you can type your queries.",
        selector: "#search-box", // Highlights the search bar
        side: "bottom",
        showControls: true,
        showSkip: true,
      },
      {
        title: "Categories",
        content: "Click on a category to quickly find what you're looking for.",
        selector: ".mt-4", // Highlights the category buttons section
        side: "top",
        showControls: true,
        showSkip: true,
      },
      {
        title: "Map",
        content: "To nagivate",
        selector: "#map", // Highlights the sidebar
        side: "body",
        showControls: true,
        pointerPadding: -20,
        showSkip: true,
      },
    ],
  },
];

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NextStepProvider>
          <NextStep steps={steps}>{children}</NextStep>
        </NextStepProvider>
      </body>
    </html>
  );
}
