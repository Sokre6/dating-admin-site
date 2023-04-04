import { Button, Center, Group, NumberInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import {
  doBlock,
  doUnmatch,
  fetchReportDetails,
} from "../../store/slices/adminReport";
import ReportUser from "./ReportUser";

const Actions = () => {
  const [screenContent, setScreenContent] = useState("idInput");
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const form = useForm({
    initialValues: {
      id: "",
    },
  });

  const resetValue = () => {
    form.values.id = "";
  };

  const dispatchFetchReportDetails = async () => {
    try {
      await dispatch(fetchReportDetails(form.values.id)).unwrap();
    } catch (error) {
      setScreenContent("idInput");
      showNotification({
        message: t("ReportUser.invalidReportID"),
        color: "red",
      });
    }
  };

  const dispatchDoUnmatch = async () => {
    try {
      await dispatch(doUnmatch(form.values.id)).unwrap();
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

  const dispatchDoBlock = async () => {
    try {
      await dispatch(doBlock(form.values.id)).unwrap();
      showNotification({
        message: t("ReportUser.blockSuccess"),
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
    dispatchFetchReportDetails();
    resetValue();
    setScreenContent("Report");
  };

  if (screenContent === "Report") {
    return (
      <ReportUser
        dispatchDoUnmatch={dispatchDoUnmatch}
        dispatchDoBlock={dispatchDoBlock}
        setScreenContent={setScreenContent}
      />
    );
  }

  return (
    <>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Center>
          <NumberInput
            hideControls
            label="ID reporta"
            placeholder="ID reporta"
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
            {t("ReportUser.fetch")}
          </Button>
        </Center>
      </form>
    </>
  );
};
export default Actions;
