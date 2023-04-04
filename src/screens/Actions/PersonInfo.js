import { Container, Grid, Group } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { IwiImage } from "../../components/IwiImage";
import dayjs from "dayjs";

const PersonInfo = () => {
  const { t } = useTranslation();

  const {
    person_givenName,
    person_gender,
    person_birthDate,
    person_genderPreferences,
    person_agePreferenceLow,
    person_agePreferenceHigh,
    person_maxRadiusPreference,
    person_pushNotificationEnabled,
    person_emailNotificationEnabled,
    person_language,
    person_bio,
    person_location,
    person_education,
    person_work,
    person_profilePhoto,
    person_additionalPhotos,
  } = useSelector((state) => state.adminReport);

  const dateTransform = {
    date: dayjs(person_birthDate).format("DD.MM.YYYY"),
  };

  return (
    <>
      <div style={{ alignItems: "left" }}>
        <Container>
          <h2 style={{ color: "#E40046" }}>
            {t("ReportUser.personInfoHeader")}
          </h2>
          <div style={{ width: "10vw", alignItems: "left" }}>
            <IwiImage imageId={person_profilePhoto}></IwiImage>
          </div>
          <strong>{t("ReportUser.personGivenName")}</strong>
          <span>{person_givenName}</span>
          <br />
          <strong>{t("ReportUser.sex")}</strong>
          <span>
            {person_gender === "MALE"
              ? t("ReportUser.male")
              : t("ReportUser.female")}
          </span>
          <br />
          <strong>{t("ReportUser.personBirthDate")}</strong>
          <span>{dateTransform.date}</span>
          <br />
          <strong>{t("ReportUser.personGenderPreferences")}</strong>
          <span>
            {person_genderPreferences === "MALE"
              ? t("ReportUser.genderPrefrencesM")
              : t("ReportUser.genderPrefrencesF")}
          </span>
          <br />
          <strong>{t("ReportUser.personAgePreference")} </strong>
          <span>
            {person_agePreferenceLow} - {person_agePreferenceHigh}
          </span>
          <br />
          <strong>{t("ReportUser.personMaxRadiusPreference")} </strong>
          <span>{person_maxRadiusPreference}</span>
          <br />
          <strong>{t("ReportUser.personPushNotificationEnabled")} </strong>
          <span>
            {person_pushNotificationEnabled === true
              ? t("ReportUser.pushNotifTrue")
              : t("ReportUser.pushNotifFalse")}
          </span>
          <br />
          <strong>{t("ReportUser.personEmailNotificationEnabled")} </strong>
          <span>
            {person_emailNotificationEnabled === true
              ? t("ReportUser.emailNotifTrue")
              : t("ReportUser.emailNotifFalse")}
          </span>
          <br />
          <strong>{t("ReportUser.personLanguage")} </strong>
          <span>{person_language === "" ? "-" : person_language}</span>
          <br />
          <strong>{t("ReportUser.personBio")} </strong>
          <span>{person_bio === "" ? "-" : person_bio}</span>
          <br />
          <strong>{t("ReportUser.personLocation")} </strong>
          <span>{person_location === "" ? "-" : person_location}</span>
          <br />
          <strong>{t("ReportUser.personEducation")} </strong>
          <span>{person_education === "" ? "-" : person_education}</span>
          <br />
          <strong>{t("ReportUser.personWork")} </strong>
          <span>{person_work === "" ? "-" : person_work}</span>
          <br />
          <strong>{t("ReportUser.personAdditionalPhotos")} </strong>
          <br />
          <div style={{ width: "10vw", alignItems: "left" }}>
            <Group grow mb="md" mt="md"></Group>

            <Grid>
              <IwiImage imageId={person_additionalPhotos} />
            </Grid>
          </div>
        </Container>
      </div>
    </>
  );
};
export default PersonInfo;
