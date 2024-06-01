import React from "react";
import ReactDOM from "react-dom/client";
import "@mantine/core/styles.css";
import "react-tooltip/dist/react-tooltip.css";
import { MantineProvider } from "@mantine/core";
import { Tooltip } from "react-tooltip";
import theme from "./configs/theme";

import { RouterProvider } from "react-router-dom";
import routers from "./routers";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <MantineProvider theme={theme} defaultColorScheme='light' classNamesPrefix='lnd'>
            <RouterProvider router={routers} />
            <Tooltip id='app-tooltip' />
        </MantineProvider>
    </React.StrictMode>
);
