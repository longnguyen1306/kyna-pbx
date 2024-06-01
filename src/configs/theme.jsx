import { createTheme } from "@mantine/core";

const theme = createTheme({
    fontFamily: "Verdana, sans-serif",
    fontFamilyMonospace: "Monaco, Courier, monospace",
    headings: { fontFamily: "Greycliff CF, sans-serif" },

    primaryColor: "indigo",
    // focusRing: 'auto' | 'always' | 'never';
    focusRing: "never",
    autoContrast: true
    // fontSmoothing: boolean;
});

export default theme;
