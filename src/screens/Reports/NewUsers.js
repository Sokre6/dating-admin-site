import { Center, Container, Group, Paper, Text } from "@mantine/core";
import { DateRangePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserCountByDateRange } from "../../store/slices/adminReport";
import { getDateFormat } from "../../i18n/i18n";

const NewUsers = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { userAccountCount, personCount } = useSelector(
    (state) => state.adminReport
  );

  const form = useForm({
    initialValues: {
      date: [new Date(), new Date()],
    },
  });

  const dateTransform = {
    dateFrom: dayjs(form.values.date[0]).format("YYYY-MM-DD"),
    dateTo: dayjs(form.values.date[1]).format("YYYY-MM-DD"),
  };

  const dispatchFetchUserCountByDateRange = async () => {
    await dispatch(
      fetchUserCountByDateRange({
        dateFrom: dateTransform.dateFrom,
        dateTo: dateTransform.dateTo,
      })
    );
  };

  useEffect(() => {
    if (form.values.date[0] !== null && form.values.date[1] !== null) {
      dispatchFetchUserCountByDateRange();
    }
  }, [form.values.date]);

  return (
    <>
      <div style={{ height: "85vh", backgroundColor: "#F5F5F5" }}>
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
            <form>
              <DateRangePicker
                label={t("NewUsers.selectedDateRange")}
                inputFormat={getDateFormat()}
                {...form.getInputProps("date")}
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
              <Container sx={{ textAlign: "center" }}>
                <Text>
                  {t("NewUsers.userAccountNumber", {
                    userAccountCount: userAccountCount,
                  })}
                </Text>
                <Text>
                  {" "}
                  {t("NewUsers.userProfileNumber", {
                    personCount: personCount,
                  })}
                </Text>
              </Container>
            </form>
          </Paper>
        </Center>
      </div>
    </>
  );
};

export default NewUsers;
