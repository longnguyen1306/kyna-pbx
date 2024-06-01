import { NavLink, useMantineTheme } from "@mantine/core";
import { Link, useLocation } from "react-router-dom";
import { useHover } from "@mantine/hooks";

const SidebarItem = ({ icon = null, label = "", to = "" }) => {
    const theme = useMantineTheme();
    const { hovered, ref } = useHover();
    const location = useLocation();

    return (
        <NavLink
            ref={ref}
            to={to}
            label={label}
            leftSection={icon}
            component={Link}
            color='indigo'
            active={to === location.pathname}
            autoContrast
            styles={{
                root: {
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                    alignItems: "center",
                    justifyContent: "center",
                    borderLeftStyle: to === location.pathname ? "solid" : null,
                    borderLeftColor: to === location.pathname ? theme.colors.indigo[5] : null,
                    borderLeftWidth: to === location.pathname ? 4 : 0,
                    color:
                        to === location.pathname
                            ? theme.colors.indigo[5]
                            : hovered
                              ? theme.colors.indigo[5]
                              : theme.colors.gray[5],
                    padding: "10px 0"
                },
                section: {
                    textAlign: "center",
                    margin: 0
                },
                label: {
                    fontSize: 16
                }
            }}
        />
    );
};

export default SidebarItem;
