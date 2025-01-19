// app/layout.js
import "./globals.css";
import { NextStepProvider, NextStep } from "nextstepjs";

export const metadata = {
  title: "NextStep",
  description: "Display search results as pins on a Leaflet map",
};

//Define the steps for the NextStep tour!
const steps = [
  {
    tour: "mainTour",
    steps: [
      {
        title: "Welcome to NextStep! ✨",
        content: " NextStep helps you find the best routes based on safety, traffic, fitness, and scenery! Let us guide you through its awesome features. 😊",
        selector: "body", // General welcome message, no specific element
        showControls: true,
        showSkip: true,
      },
      {
        title:"Search Bar 🔍",
        content: "Type your queries here to easily find what you're looking for! 📝,",
        selector: "#search-box", // Highlights the search bar
        side: "bottom",
        showControls: true,
        showSkip: true,
      },
      {
        title: "Categories 📂",
        content: "Explore different categories to discover content that suits your needs!",
        selector: ".mt-4", // Highlights the category buttons section
        side: "top",
        showControls: true,
        showSkip: true,
      },
      {
        title: "Map 🗺️",
        content: "Use the map to navigate and visualize the best routes and options! 🛣️",
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
