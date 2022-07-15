import axios from "axios";

const baseUrl = "http://127.0.0.1:8080";

export const getShifts = async () => {
  const path = "shifts";
  const res = await axios.get(`${baseUrl}/${path}`);
  return res && res.data ? res.data : null;
};

export const postBookShifts = async (id) => {
  const path = `shifts/${id}/book`;
  const res = await axios.post(`${baseUrl}/${path}`);
  return res && res.data ? res.data : null;
};
