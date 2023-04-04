import {
  Button,
  Card,
  Center,
  Container,
  Grid,
  Group,
  Modal,
  Paper,
} from "@mantine/core";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import PersonInfo from "./PersonInfo";
import ReportedPersonInfo from "./ReportedPersonInfo";
import ReportInfo from "./ReportInfo";

const ReportUser = ({
  dispatchDoUnmatch,
  dispatchDoBlock,
  setScreenContent,
}) => {
  const { t } = useTranslation();
  const [openedUnmatch, setOpenedUnmatch] = useState(false);
  const [openedBlock, setOpenedBlock] = useState(false);

  return (
    <>
      <Group position="right">
        <Button
          onClick={() => setScreenContent("idInput")}
          styles={(theme) => ({
            root: {
              backgroundColor: "#E40046",

              "&:hover": {
                backgroundColor: theme.fn.darken("#E40046", 0.05),
              },
            },
          })}
        >
          {t("ReportUser.returnButtonTitle")}
        </Button>
      </Group>
      <Group grow mb="sm" mt="sm"></Group>

      <Grid>
        <Grid.Col sm={12} md={12} lg={8}>
          <Card>
            <ReportInfo />
          </Card>
        </Grid.Col>
      </Grid>
      <Grid>
        <Grid.Col sm={6} md={6} lg={4}>
          <Paper>
            <Card>
              <PersonInfo />
            </Card>
          </Paper>
        </Grid.Col>
        <Grid.Col sm={6} md={6} lg={4}>
          <Paper>
            <Card>
              <ReportedPersonInfo />
            </Card>
          </Paper>
        </Grid.Col>
      </Grid>

      <Group grow mb="md" mt="md"></Group>
      <Group position="left">
        <Button
          onClick={() => setOpenedUnmatch(true)}
          styles={(theme) => ({
            root: {
              backgroundColor: "#E40046",

              "&:hover": {
                backgroundColor: theme.fn.darken("#E40046", 0.05),
              },
            },
          })}
        >
          {t("ReportUser.unmatchButtonTitle")}
        </Button>
        <Group grow mb="md" mt="md"></Group>
        <Button
          onClick={() => setOpenedBlock(true)}
          styles={(theme) => ({
            root: {
              backgroundColor: "#E40046",

              "&:hover": {
                backgroundColor: theme.fn.darken("#E40046", 0.05),
              },
            },
          })}
        >
          {t("ReportUser.blockButtonTitle")}
        </Button>
        <Group grow mb="md" mt="md"></Group>
      </Group>
      <Modal
        opened={openedUnmatch}
        onClose={() => setOpenedUnmatch(false)}
        title={t("ReportUser.unmatchTitle")}
      >
        <Container>
          <Center>
            <p>{t("ReportUser.unmatchMessage")}</p>
          </Center>
          <Center>
            <Button
              onClick={() => {
                dispatchDoUnmatch();
                setOpenedUnmatch(false);
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
        opened={openedBlock}
        onClose={() => setOpenedBlock(false)}
        title={t("ReportUser.blockTitle")}
      >
        <Container>
          <Center>
            <p>{t("ReportUser.blockMessage")}</p>
          </Center>
          <Center>
            <Button
              onClick={() => {
                dispatchDoBlock();
                setOpenedBlock(false);
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

export default ReportUser;
