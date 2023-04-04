import {
  Button,
  Table,
  Modal,
  Group,
  Center,
  Paper,
  TextInput,
  Container,
} from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { IconAt, IconEdit, IconTrash } from "@tabler/icons";
import { useEffect } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import {
  doUpdateAdmin,
  fetchAdminInfoByID,
  fetchAllAdminAccounts,
  doDeleteAdmin,
  doCreateAdmin,
} from "../../store/slices/adminAccounts";

const UserAccounts = (props) => {
  const [openedAddUser, setOpenedAddUser] = useState(false);
  const [openedEditActive, setOpenedEditActive] = useState(false);
  const [openedEditInactive, setOpenedEditInactive] = useState(false);
  const [openedDelete, setOpenedDelete] = useState(false);
  const [rowData, setRowData] = useState(null);

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { tableData } = useSelector((state) => state.adminAccount);

  const dispatchFetchAllAdminAccounts = async () =>
    await dispatch(fetchAllAdminAccounts()).unwrap();

  const dispatchFetchAdminInfoByID = async () =>
    await dispatch(fetchAdminInfoByID()).unwrap();

  const dispatchUpdateAdmin = async (rowData) => {
    try {
      const activity = {
        ...rowData,
        status: rowData.status === "ACTIVE" ? "INACTIVE" : "ACTIVE",
      };
      await dispatch(doUpdateAdmin(activity)).unwrap();
      showNotification({
        message: t("UserAccounts.editStatusSuccess"),
        color: "green",
      });
      await dispatchFetchAllAdminAccounts();
      if (activity.status === "ACTIVE") {
        setOpenedEditInactive(false);
      } else setOpenedEditActive(false);
    } catch (error) {
      showNotification({
        message: t("UserAccounts.unexpectedError"),
        color: "red",
      });
    }
  };

  const dispatchCreateAdmin = async (data) => {
    try {
      await dispatch(doCreateAdmin(data)).unwrap();
      showNotification({
        message: t("UserAccounts.addAccountSuccess"),
        color: "green",
      });
      await dispatchFetchAllAdminAccounts();
      setOpenedAddUser(false);
    } catch (error) {
      if (error.message === "Data integrity violation") {
        showNotification({
          message: t("UserAccounts.existingUser"),
          color: "red",
        });
      } else {
        showNotification({
          message: t("UserAccounts.unexpectedError"),
          color: "red",
        });
      }
    }
  };
  const dispatchDeleteAdmin = async (data) => {
    try {
      await dispatch(doDeleteAdmin(data)).unwrap();
      showNotification({
        message: t("UserAccounts.deleteAccountSuccess"),
        color: "green",
      });
      await dispatchFetchAllAdminAccounts();
      setOpenedDelete(false);
    } catch (error) {
      showNotification({
        message: t("UserAccounts.unexpectedError"),
        color: "red",
      });
    }
  };

  const rows = tableData.map((items) => {
    return (
      <tr key={items.id}>
        <td>{items.id}</td>
        <td>{items.username}</td>
        <td>
          {items.status === "ACTIVE"
            ? t("UserAccounts.active")
            : t("UserAccounts.inactive")}
        </td>

        <td>
          <Group position="right">
            <Button
              onClick={() => {
                setRowData(items);
                if (items.status === "ACTIVE") {
                  setOpenedEditActive(true);
                } else setOpenedEditInactive(true);
              }}
              styles={(theme) => ({
                root: {
                  backgroundColor: "#E40046",

                  "&:hover": {
                    backgroundColor: theme.fn.darken("#E40046", 0.05),
                  },
                },
              })}
            >
              <IconEdit />
            </Button>
            <Button
              onClick={() => {
                setRowData(items);
                setOpenedDelete(true);
              }}
              styles={(theme) => ({
                root: {
                  backgroundColor: "#E40046",

                  "&:hover": {
                    backgroundColor: theme.fn.darken("#E40046", 0.05),
                  },
                },
              })}
            >
              <IconTrash />
            </Button>
          </Group>
        </td>
      </tr>
    );
  });

  const schema = Yup.object().shape({
    email: Yup.string().email().required(t("UserAccounts.requiredEmail")),
  });

  const form = useForm({
    initialValues: {
      email: "",
    },
    validate: yupResolver(schema),
  });

  const handleSubmit = async (data) => {
    await dispatchCreateAdmin(data);
    form.reset();
  };

  useEffect(() => {
    dispatchFetchAllAdminAccounts();
  }, []);

  return (
    <>
      <Modal
        opened={openedAddUser}
        onClose={() => setOpenedAddUser(false)}
        title={t("UserAccounts.addUserTitle")}
      >
        <Center>
          <Paper radius="md" p="xl" shadow="sm" withBorder>
            <form onSubmit={form.onSubmit(handleSubmit)}>
              <TextInput
                label={t("UserAccounts.username")}
                placeholder={t("UserAccounts.emailPlaceholder")}
                {...form.getInputProps("email")}
                icon={<IconAt size={14} />}
                sx={{
                  "@media (600px < width)": {
                    width: "350px",
                  },

                  "@media (600px >= width)": {
                    width: "350px",
                  },
                  "@media (450px >= width)": {
                    width: "300px",
                  },
                  "@media (400px >= width)": {
                    width: "250px",
                  },
                  "@media (350px >= width)": {
                    width: "200px",
                  },
                  textAlign: "center",
                }}
              />

              <Group grow mb="md" mt="md"></Group>

              <Center>
                <Button
                  type="submit"
                  size="md"
                  styles={(theme) => ({
                    root: {
                      backgroundColor: "#E40046",

                      "&:hover": {
                        backgroundColor: theme.fn.darken("#E40046", 0.05),
                      },
                    },
                  })}
                >
                  {t("common.save")}
                </Button>
              </Center>
            </form>
          </Paper>
        </Center>
      </Modal>

      <Modal
        opened={openedEditActive}
        onClose={() => setOpenedEditActive(false)}
        title={t("UserAccounts.deactivateUserTitle")}
      >
        <Container>
          <Center>
            <p>{t("UserAccounts.deactivateUserMessage")}</p>
          </Center>
          <Center>
            <Button
              onClick={() => {
                dispatchUpdateAdmin(rowData);
              }}
              styles={(theme) => ({
                root: {
                  backgroundColor: "#E40046",

                  "&:hover": {
                    backgroundColor: theme.fn.darken("#E40046", 0.05),
                  },
                },
              })}
            >
              {t("common.ok")}
            </Button>
          </Center>
        </Container>
      </Modal>

      <Modal
        opened={openedEditInactive}
        onClose={() => setOpenedEditInactive(false)}
        title={t("UserAccounts.activateUserTitle")}
      >
        <Container>
          <Center>
            <p>{t("UserAccounts.activateUserMessage")}</p>
          </Center>
          <Center>
            <Button
              onClick={() => {
                dispatchUpdateAdmin(rowData);
              }}
              styles={(theme) => ({
                root: {
                  backgroundColor: "#E40046",

                  "&:hover": {
                    backgroundColor: theme.fn.darken("#E40046", 0.05),
                  },
                },
              })}
            >
              {t("common.ok")}
            </Button>
          </Center>
        </Container>
      </Modal>

      <Modal
        opened={openedDelete}
        onClose={() => setOpenedDelete(false)}
        title={t("UserAccounts.deleteUserTitle")}
      >
        <Container>
          <Center>
            <p>{t("UserAccounts.deleteUserMessage")}</p>
          </Center>
          <Center>
            <Button
              onClick={() => {
                dispatchDeleteAdmin(rowData.id);
              }}
              styles={(theme) => ({
                root: {
                  backgroundColor: "#E40046",

                  "&:hover": {
                    backgroundColor: theme.fn.darken("#E40046", 0.05),
                  },
                },
              })}
            >
              {t("common.ok")}
            </Button>
          </Center>
        </Container>
      </Modal>

      <Group position="right">
        <Button
          onClick={() => setOpenedAddUser(true)}
          type="submit"
          styles={(theme) => ({
            root: {
              backgroundColor: "#E40046",

              "&:hover": {
                backgroundColor: theme.fn.darken("#E40046", 0.05),
              },
            },
          })}
        >
          {t("UserAccounts.addUserButtonTitle")}
        </Button>
      </Group>
      <Table highlightOnHover>
        <thead>
          <tr>
            <th>{t("UserAccounts.headerId")}</th>
            <th>{t("UserAccounts.headerUsername")}</th>
            <th>{t("UserAccounts.headerStatus")}</th>

            <th></th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </>
  );
};

export default UserAccounts;
