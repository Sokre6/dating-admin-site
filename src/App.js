import React from "react";
import {
  AppShell,
  Burger,
  Button,
  Header,
  MantineProvider,
  MediaQuery,
  Navbar,
  Text,
  useMantineTheme,
} from "@mantine/core";
import store from "./store";
import LoginScreen from "./screens/LoginScreen";
import "./i18n/i18n";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoutes from "./utils/protectedRoutes";
import { NotificationsProvider } from "@mantine/notifications";
import { ADMIN } from "./utils/constants";
import { useState } from "react";
import UserCountToDate from "./screens/Reports/UserCountToDate";
import PermabanUser from "./screens/Actions/PermabanUser";
import UserAccounts from "./screens/Administration/UserAccounts";
import NewUsers from "./screens/Reports/NewUsers";
import NavbarItems from "./components/Navbar";
import PageNotFound from "./screens/404";
import { useTranslation } from "react-i18next";
import Actions from "./screens/Actions";
import { clearAuthState } from "./store/slices/auth";
import { useDispatch } from "react-redux";

function App() {
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();
  const dispatch = useDispatch();

  const shouldRedirect = true;
  const { t } = useTranslation();
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
      <NotificationsProvider>
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <ProtectedRoutes
                  authorizedFor={[ADMIN]}
                  redirectPath={"login"}
                />
              }
            >
              <Route
                path="/*"
                element={
                  <AppShell
                    styles={{
                      main: {
                        background:
                          theme.colorScheme === "dark"
                            ? theme.colors.dark[8]
                            : theme.colors.gray[0],
                      },
                    }}
                    navbarOffsetBreakpoint="sm"
                    asideOffsetBreakpoint="sm"
                    navbar={
                      <Navbar
                        p="md"
                        hiddenBreakpoint="sm"
                        hidden={!opened}
                        width={{ sm: 200, lg: 300 }}
                      >
                        <NavbarItems setOpened={setOpened} />
                      </Navbar>
                    }
                    header={
                      <Header
                        height={{ base: 60, md: 70 }}
                        p="md"
                        sx={() => ({
                          display: "flex",
                          justifyContent: "space-between",
                        })}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            height: "100%",
                          }}
                        >
                          <MediaQuery
                            largerThan="sm"
                            styles={{ display: "none" }}
                          >
                            <Burger
                              opened={opened}
                              onClick={() => setOpened((o) => !o)}
                              size="sm"
                              color={theme.colors.gray[6]}
                              mr="xl"
                            />
                          </MediaQuery>

                          <Text sx={{ color: "#E40046" }}>
                            {t("App.headerTitle")}
                          </Text>
                        </div>

                        <Button
                          onClick={() => {
                            dispatch(clearAuthState());
                            console.log("click");
                          }}
                          styles={(theme) => ({
                            root: {
                              backgroundColor: "#E40046",

                              "&:hover": {
                                backgroundColor: theme.fn.darken(
                                  "#E40046",
                                  0.05
                                ),
                              },
                              height: "2rem",
                            },
                          })}
                        >
                          {t("App.logoutTitle")}
                        </Button>
                      </Header>
                    }
                  >
                    <Routes>
                      <Route
                        path=""
                        element={
                          shouldRedirect ? (
                            <Navigate replace to="/userCount" />
                          ) : (
                            <UserCountToDate />
                          )
                        }
                      />
                      <Route path="permabanUser" element={<PermabanUser />} />
                      <Route path="reportUser" element={<Actions />} />
                      <Route path="userAccounts" element={<UserAccounts />} />
                      <Route path="newUsers" element={<NewUsers />} />
                      <Route path="userCount" element={<UserCountToDate />} />
                      <Route path="*" element={<PageNotFound />} />
                    </Routes>
                  </AppShell>
                }
              />
            </Route>
            <Route path="login" element={<LoginScreen />} />
          </Routes>
        </BrowserRouter>
      </NotificationsProvider>
    </MantineProvider>
  );
}

export default App;
