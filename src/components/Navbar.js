import { Navbar, NavLink } from "@mantine/core";
import { IconBan, IconReport, IconUserExclamation } from "@tabler/icons";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

const NavbarItems = ({ setOpened }) => {
  const { t } = useTranslation();
  let location = useLocation();

  return (
    <>
      <Navbar.Section>
        <NavLink
          label={t("Navbar.reports")}
          icon={<IconReport />}
          defaultOpened
          active={location?.pathname?.includes("/userCount" || "/newUsers")}
          color="pink"
          childrenOffset={28}
        >
          <NavLink
            onClick={() => setOpened((o) => !o)}
            component={Link}
            to="userCount"
            label={t("Navbar.userCount")}
            active={location?.pathname?.includes("/userCount")}
            color="pink"
          />
          <NavLink
            onClick={() => setOpened((o) => !o)}
            label={t("Navbar.newUsers")}
            component={Link}
            to="newUsers"
            active={location?.pathname?.includes("/newUsers")}
            color="pink"
          />
        </NavLink>
      </Navbar.Section>

      <Navbar.Section>
        <NavLink
          label={t("Navbar.actions")}
          icon={<IconBan />}
          childrenOffset={28}
          active={location?.pathname?.includes(
            "/reportUser" || "/permabanUser"
          )}
          color="pink"
        >
          <NavLink
            onClick={() => setOpened((o) => !o)}
            label={t("Navbar.reportUser")}
            component={Link}
            to="reportUser"
            active={location?.pathname?.includes("/reportUser")}
            color="pink"
          />
          <NavLink
            onClick={() => setOpened((o) => !o)}
            label={t("Navbar.permabanUser")}
            component={Link}
            to="permabanUser"
            active={location?.pathname?.includes("/permabanUser")}
            color="pink"
          />
        </NavLink>
      </Navbar.Section>
      <Navbar.Section>
        <NavLink
          label={t("Navbar.administration")}
          icon={<IconUserExclamation />}
          childrenOffset={28}
          active={location?.pathname?.includes("/userAccounts")}
          color="pink"
        >
          <NavLink
            onClick={() => setOpened((o) => !o)}
            label={t("Navbar.userAccounts")}
            component={Link}
            to="userAccounts"
            active={location?.pathname?.includes("/userAccounts")}
            color="pink"
          />
        </NavLink>
      </Navbar.Section>
    </>
  );
};

export default NavbarItems;
