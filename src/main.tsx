import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { FrequensyTest } from "./components/FrequensyTest.tsx";
import { MainContextProvider } from "./context/MainContext.tsx";
import { SequenceTest } from "./components/SequenceTest.tsx";
import { ExtraTest } from "./components/ExtraTest.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "frequensy",
        element: <FrequensyTest />,
      },
      {
        path: "sequence",
        element: <SequenceTest />,
      },
      {
        path: "extra",
        element: <ExtraTest />
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MainContextProvider>
      <RouterProvider router={router} />
    </MainContextProvider>
  </React.StrictMode>
);
