import axios from "./axios.js";

export const getUserCountByDate = async (date) => {
  const response = await axios.get(
    `/admin/api/v1/reports/user-count-by-date?date=${date}`
  );
  return response.data;
};

export const getUserCountByDateRange = async (dateFrom, dateTo) => {
  const response = await axios.get(
    `/admin/api/v1/reports/user-count-by-date-range?dateFrom=${dateFrom}&dateTo=${dateTo}`
  );
  return response.data;
};

export const getReportDetails = async (id) => {
  const response = await axios.get(`/admin/api/v1/reports/${id}`);
  return response.data;
};

export const unmatch = async (id) => {
  const response = await axios.post(`/admin/api/v1/reports/${id}/unmatch`);
  return response.data;
};

export const block = async (id) => {
  const response = await axios.post(`/admin/api/v1/reports/${id}/block`);
  return response.data;
};

export const permaban = async (id) => {
  const response = await axios.post(
    `/admin/api/v1/user-account/${id}/permanently-ban`
  );
  return response.data;
};
