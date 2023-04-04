import { Container, Grid, Group } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { IwiImage } from "../../components/IwiImage";
import dayjs from "dayjs";

const ReportedPersonInfo = () => {
  const { t } = useTranslation();

  const {
    reportedPerson_givenName,
    reportedPerson_gender,
    reportedPerson_birthDate,
    reportedPerson_genderPreferences,
    reportedPerson_agePreferenceLow,
    reportedPerson_agePreferenceHigh,
    reportedPerson_maxRadiusPreference,
    reportedPerson_pushNotificationEnabled,
    reportedPerson_emailNotificationEnabled,
    reportedPerson_language,
    reportedPerson_bio,
    reportedPerson_location,
    reportedPerson_education,
    reportedPerson_work,
    reportedPerson_profilePhoto,
    reportedPerson_additionalPhotos,
  } = useSelector((state) => state.adminReport);

  const dateTransform = {
    date: dayjs(reportedPerson_birthDate).format("DD.MM.YYYY"),
  };

  return (
    <>
      <div style={{ alignItems: "left" }}>
        <Container>
          <h2 style={{ color: "#E40046" }}>
            {t("ReportUser.reportedPersonHeader")}
          </h2>
          <div style={{ width: "10vw", alignItems: "left" }}>
            <IwiImage imageId={reportedPerson_profilePhoto}></IwiImage>
          </div>
          <strong>{t("ReportUser.personGivenName")}</strong>
          <span>{reportedPerson_givenName}</span>
          <br />
          <strong>{t("ReportUser.sex")}</strong>
          <span>
            {reportedPerson_gender === "MALE"
              ? t("ReportUser.male")
              : t("ReportUser.female")}
          </span>
          <br />
          <strong>{t("ReportUser.personBirthDate")}</strong>
          <span>{dateTransform.date}</span>
          <br />
          <strong>{t("ReportUser.personGenderPreferences")}</strong>
          <span>
            {reportedPerson_genderPreferences === "MALE"
              ? t("ReportUser.genderPrefrencesM")
              : t("ReportUser.genderPrefrencesF")}
          </span>
          <br />
          <strong>{t("ReportUser.personAgePreference")} </strong>
          <span>
            {reportedPerson_agePreferenceLow} -{" "}
            {reportedPerson_agePreferenceHigh}
          </span>
          <br />
          <strong>{t("ReportUser.personMaxRadiusPreference")} </strong>
          <span>{reportedPerson_maxRadiusPreference}</span>
          <br />
          <strong>{t("ReportUser.personPushNotificationEnabled")} </strong>
          <span>
            {reportedPerson_pushNotificationEnabled === true
              ? t("ReportUser.pushNotifTrue")
              : t("ReportUser.pushNotifFalse")}
          </span>
          <br />
          <strong>{t("ReportUser.personEmailNotificationEnabled")} </strong>
          <span>
            {reportedPerson_emailNotificationEnabled === true
              ? t("ReportUser.emailNotifTrue")
              : t("ReportUser.emailNotifFalse")}
          </span>
          <br />
          <strong>{t("ReportUser.personLanguage")} </strong>
          <span>
            {reportedPerson_language === "" ? "-" : reportedPerson_language}
          </span>
          <br />
          <strong>{t("ReportUser.personBio")} </strong>
          <span>{reportedPerson_bio === "" ? "-" : reportedPerson_bio}</span>
          <br />
          <strong>{t("ReportUser.personLocation")} </strong>
          <span>
            {reportedPerson_location === "" ? "-" : reportedPerson_location}
          </span>
          <br />
          <strong>{t("ReportUser.personEducation")} </strong>
          <span>
            {reportedPerson_education === "" ? "-" : reportedPerson_education}
          </span>
          <br />
          <strong>{t("ReportUser.personWork")} </strong>
          <span>{reportedPerson_work === "" ? "-" : reportedPerson_work}</span>
          <br />
          <strong>{t("ReportUser.personAdditionalPhotos")} </strong>
          <br />
          <div style={{ width: "10vw", alignItems: "left" }}>
            <Group grow mb="md" mt="md"></Group>

            <Grid>
              <IwiImage imageId={reportedPerson_additionalPhotos}></IwiImage>
            </Grid>
          </div>
        </Container>
      </div>
    </>
  );
};
export default ReportedPersonInfo;
