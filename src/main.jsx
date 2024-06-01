import React from "react";
import ReactDOM from "react-dom/client";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import theme from "./configs/theme";

import { RouterProvider } from "react-router-dom";
import routers from "./routers";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <MantineProvider theme={theme} defaultColorScheme='light' classNamesPrefix='lnd'>
            <RouterProvider router={routers} />
        </MantineProvider>
    </React.StrictMode>
);
