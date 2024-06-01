import { createTheme } from "@mantine/core";

const theme = createTheme({
    fontFamily: "Verdana, sans-serif",
    fontFamilyMonospace: "Monaco, Courier, monospace",
    headings: { fontFamily: "Greycliff CF, sans-serif" },

    // primaryColor: "#4C6EF5",
    // focusRing: 'auto' | 'always' | 'never';
    primary: "#4C6EF5",
    focusRing: "never",
    autoContrast: true
    // fontSmoothing: boolean;
});

export default theme;
