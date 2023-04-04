import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AdminReportApi } from "../../http";

export const fetchUserCountByDate = createAsyncThunk(
  "adminReport/fetchUserCountByDate",
  async (args) => {
    const { date } = args;
    const response = await AdminReportApi.getUserCountByDate(date);
    return response;
  }
);

export const fetchUserCountByDateRange = createAsyncThunk(
  "adminReport/fetchUserCountByDateRange",
  async (args) => {
    const { dateFrom, dateTo } = args;

    const response = await AdminReportApi.getUserCountByDateRange(
      dateFrom,
      dateTo
    );
    return response;
  }
);

export const fetchReportDetails = createAsyncThunk(
  "adminReport/fetchReportDetails",
  async (id) => {
    try {
      const response = await AdminReportApi.getReportDetails(id);
      return response;
    } catch (error) {
      console.log(error);
      console.log(error.response.status);
      throw error.response.status;
    }
  }
);

export const doUnmatch = createAsyncThunk(
  "adminReport/doUnmatch",
  async (id) => {
    const response = await AdminReportApi.unmatch(id);
    return response;
  }
);

export const doBlock = createAsyncThunk("adminReport/doBlock", async (id) => {
  const response = await AdminReportApi.block(id);
  return response;
});

export const doPermaban = createAsyncThunk(
  "adminReport/doPermaban",
  async (id) => {
    const response = await AdminReportApi.permaban(id);
    return response;
  }
);

const initialState = {
  userAccountCount: null,
  personCount: null,
  person_givenName: null,
  person_gender: null,
  person_birthDate: null,
  person_genderPreferences: [null],
  person_agePreferenceLow: null,
  person_agePreferenceHigh: null,
  person_maxRadiusPreference: null,
  person_pushNotificationEnabled: null,
  person_emailNotificationEnabled: null,
  person_language: null,
  person_bio: null,
  person_location: null,
  person_education: null,
  person_work: null,
  person_profilePhoto: null,
  person_additionalPhotos: null,
  reportedPerson_givenName: null,
  reportedPerson_gender: null,
  reportedPerson_birthDate: null,
  reportedPerson_genderPreferences: [null],
  reportedPerson_agePreferenceLow: null,
  reportedPerson_agePreferenceHigh: null,
  reportedPerson_maxRadiusPreference: null,
  reportedPerson_pushNotificationEnabled: null,
  reportedPerson_emailNotificationEnabled: null,
  reportedPerson_language: null,
  reportedPerson_bio: null,
  reportedPerson_location: null,
  reportedPerson_education: null,
  reportedPerson_work: null,
  reportedPerson_profilePhoto: null,
  reportedPerson_additionalPhotos: null,
  reportId: null,
  reportDescription: null,
  reportLocalizedName: null,
  reportStatus: null,
  reportDate: null,
};

const adminReportSlice = createSlice({
  name: "adminReportSlice",
  initialState,
  reducers: {
    clearAdminReports: () => {
      return { ...initialState };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserCountByDate.fulfilled, (state, action) => {
      return {
        ...state,
        userAccountCount: action.payload?.userAccountCount,
        personCount: action.payload?.personCount,
      };
    });
    builder.addCase(fetchUserCountByDateRange.fulfilled, (state, action) => {
      return {
        ...state,
        userAccountCount: action.payload?.userAccountCount,
        personCount: action.payload?.personCount,
      };
    });
    builder.addCase(fetchReportDetails.fulfilled, (state, action) => {
      return {
        ...state,
        person_givenName: action.payload?.person.givenName,
        person_gender: action.payload?.person.gender,
        person_birthDate: action.payload?.person.birthDate,
        person_genderPreferences: action.payload?.person.genderPreferences,
        person_agePreferenceLow: action.payload?.person.agePreferenceLow,
        person_agePreferenceHigh: action.payload?.person.agePreferenceHigh,
        person_maxRadiusPreference: action.payload?.person.maxRadiusPreference,
        person_pushNotificationEnabled:
          action.payload?.person.pushNotificationEnabled,
        person_emailNotificationEnabled:
          action.payload?.person.emailNotificationEnabled,
        person_language: action.payload?.person.language,
        person_bio: action.payload?.person.bio,
        person_location: action.payload?.person.location,
        person_education: action.payload?.person.education,
        person_work: action.payload?.person.work,
        person_profilePhoto: action.payload?.person.profilePhoto,
        person_additionalPhotos: action.payload?.person.additionalPhotos,
        reportedPerson_givenName: action.payload?.reportedPerson.givenName,
        reportedPerson_gender: action.payload?.reportedPerson.gender,
        reportedPerson_birthDate: action.payload?.reportedPerson.birthDate,
        reportedPerson_genderPreferences:
          action.payload?.reportedPerson.genderPreferences,
        reportedPerson_agePreferenceLow:
          action.payload?.reportedPerson.agePreferenceLow,
        reportedPerson_agePreferenceHigh:
          action.payload?.reportedPerson.agePreferenceHigh,
        reportedPerson_maxRadiusPreference:
          action.payload?.reportedPerson.maxRadiusPreference,
        reportedPerson_pushNotificationEnabled:
          action.payload?.reportedPerson.pushNotificationEnabled,
        reportedPerson_emailNotificationEnabled:
          action.payload?.reportedPerson.emailNotificationEnabled,
        reportedPerson_language: action.payload?.reportedPerson.language,
        reportedPerson_bio: action.payload?.reportedPerson.bio,
        reportedPerson_location: action.payload?.reportedPerson.location,
        reportedPerson_education: action.payload?.reportedPerson.education,
        reportedPerson_work: action.payload?.reportedPerson.work,
        reportedPerson_profilePhoto:
          action.payload?.reportedPerson.profilePhoto,
        reportedPerson_aditionalPhotos:
          action.payload?.reportedPerson.aditionalPhotos,
        reportId: action.payload?.reportReason.id,
        reportDescription: action.payload?.reportReason.description,
        reportLocalizedName: action.payload?.reportReason.localizedName,
        reportStatus: action.payload?.status,
        reportDate: action.payload?.createdAt,
      };
    });
  },
});

const { actions, reducer } = adminReportSlice;
export const { clearAdminReports } = actions;
export { reducer as adminReportReducer };
