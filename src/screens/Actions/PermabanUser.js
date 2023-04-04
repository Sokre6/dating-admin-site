import { useForm } from "@mantine/form";
import {
  Button,
  Center,
  Container,
  Group,
  Modal,
  TextInput,
} from "@mantine/core";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { doPermaban } from "../../store/slices/adminReport";
import { showNotification } from "@mantine/notifications";

const PermabanUser = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [openedPermaban, setOpenedPermaban] = useState(false);

  const form = useForm({
    initialValues: {
      id: "",
    },
  });

  const dispatchDoPermaban = async () => {
    try {
      await dispatch(doPermaban(form.values.id)).unwrap();
      showNotification({
        message: t("ReportUser.unmatchSuccess"),
        color: "green",
      });
    } catch (error) {
      showNotification({
        message: t("ReportUser.unexpectedError"),
        color: "red",
      });
    }
  };

  const handleSubmit = () => {
    setOpenedPermaban(true);
  };

  return (
    <>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Center>
          <TextInput
            label={t("ReportUser.userID")}
            placeholder={t("ReportUser.userID")}
            {...form.getInputProps("id")}
            sx={{
              "@media (600px < width)": {
                width: "500px",
              },
              "@media (600px >= width)": {
                width: "450px",
              },
              "@media (550px >= width)": {
                width: "400px",
              },
              "@media (500px >= width)": {
                width: "350px",
              },
              "@media (450px >= width)": {
                width: "300px",
              },
              "@media (365px >= width)": {
                width: "270px",
              },
              "@media (300px >= width)": {
                width: "250px",
              },
              textAlign: "center",
            }}
          />
        </Center>
        <Group grow mb="xs" mt="xs"></Group>
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
            {t("ReportUser.permaban")}
          </Button>
        </Center>
      </form>
      <Modal
        opened={openedPermaban}
        onClose={() => setOpenedPermaban(false)}
        title={t("ReportUser.permabanTitle")}
      >
        <Container>
          <Center>
            <p>{t("ReportUser.permabanMessage")}</p>
          </Center>
          <Center>
            <Button
              onClick={async () => {
                await dispatchDoPermaban();
                setOpenedPermaban(false);
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
    </>
  );
};

export default PermabanUser;
