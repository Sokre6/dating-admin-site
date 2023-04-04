import { Container, Group } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

const ReportInfo = () => {
  const { t } = useTranslation();

  const {
    reportId,
    reportDescription,
    reportLocalizedName,
    reportStatus,
    reportDate,
  } = useSelector((state) => state.adminReport);

  const date = new Date(reportDate);

  const date1 = date.getTime();

  const dateTransform = {
    date2: dayjs(date1).format("DD.MM.YYYY HH:MM"),
  };

  return (
    <>
      <Group position="center">
        <Container>
          <h2 style={{ color: "#E40046" }}>
            {t("ReportUser.reportInfoHeader")}
          </h2>
          <strong>{t("ReportUser.reportId")}</strong>
          <span>{reportId}</span>
          <br />
          <strong>{t("ReportUser.reportDescription")}</strong>
          <span>{reportDescription === null ? "-" : reportDescription}</span>

          <br />
          <strong>{t("ReportUser.reportLocalizedName")}</strong>
          <span>{reportLocalizedName === "" ? "-" : reportLocalizedName}</span>

          <br />
          <strong>{t("ReportUser.reportStatus")}</strong>
          <span>{t(`ReportUser.reportStatus${reportStatus}`)}</span>

          <br />
          <strong>{t("ReportUser.reportDate")} </strong>
          <span>{dateTransform.date2}</span>
          <br />
        </Container>
      </Group>
    </>
  );
};

export default ReportInfo;
