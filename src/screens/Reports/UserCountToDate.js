import { Center, Container, Group, Paper, Text } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserCountByDate } from "../../store/slices/adminReport";
import { useEffect } from "react";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { getDateFormat } from "../../i18n/i18n";

const UserCountToDate = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { userAccountCount, personCount } = useSelector(
    (state) => state.adminReport
  );

  const form = useForm({
    initialValues: {
      date: new Date(),
    },
  });

  const dateTransform = dayjs(form.values.date).format("YYYY-MM-DD");

  const dispatchFetchUserCountByDate = async () => {
    await dispatch(fetchUserCountByDate({ date: dateTransform })).unwrap();
  };

  useEffect(() => {
    dispatchFetchUserCountByDate();
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
              <DatePicker
                label={t("UserCount.selectedDate")}
                inputFormat={getDateFormat()}
                defaultValue={new Date()}
                {...form.getInputProps("date")}
                color="red"
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
                  {t("UserCount.userAccountNumber", {
                    userAccountCount: userAccountCount,
                  })}
                </Text>
                <Text>
                  {t("UserCount.userProfileNumber", {
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

export default UserCountToDate;
