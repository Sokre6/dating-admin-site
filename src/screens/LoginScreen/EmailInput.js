import React from "react";
import { Button, Group, Text, TextInput, Center, Paper } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { IconAt } from "@tabler/icons";

const EmailInput = ({ dispatchRequestOTP }) => {
  const { t } = useTranslation();

  const schema = Yup.object().shape({
    email: Yup.string().email().required(t("loginScreen.requiredEmail")),
  });

  const form = useForm({
    initialValues: {
      email: "",
    },
    validate: yupResolver(schema),
  });

  const handleSubmit = async (data) => {
    await dispatchRequestOTP(data);
    form.reset();
  };

  return (
    <>
      <div style={{ height: "100vh", backgroundColor: "#F5F5F5" }}>
        <Group
          size="xs"
          px="xs"
          sx={(theme) => ({
            background: theme.colors.white,
            padding: theme.spacing.md,
            height: "10vh",
          })}
        />

        <Center>
          <Paper
            radius="md"
            p="xl"
            shadow="sm"
            withBorder
            sx={{
              "@media (441px > width)": {
                marginLeft: "10vw",
                marginRight: "10vw",
              },
            }}
          >
            <form onSubmit={form.onSubmit(handleSubmit)}>
              <Center>
                <Text size="lg" weight={500} color="#E40046">
                  {t("loginScreen.title")}
                </Text>
              </Center>
              <Group grow mb="md" mt="md"></Group>

              <TextInput
                label={t("loginScreen.username")}
                placeholder={t("loginScreen.emailPlaceholder")}
                {...form.getInputProps("email")}
                icon={<IconAt size={14} />}
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
                  {t("common.login")}
                </Button>
              </Center>
            </form>
          </Paper>
        </Center>
      </div>
    </>
  );
};

export default EmailInput;
