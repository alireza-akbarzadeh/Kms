import Cookies from "js-cookie";
import axios from "axios";
import { Alert } from "helper";
const baseURL = process.env.REACT_APP_BASE_URL;

export const Http = (
  url,
  { params, data, method, headers = {}, token, body, ...res }
) => {
  return axios({
    baseURL,
    url,
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
      ...headers,
    },
    params,
    data,
    body,
    method,
    ...res,
  })
    .then((res) => {
      return res;
    })
    .catch((e) => {
      if (e?.response?.status === 401 && typeof window !== "undefined") {
        Alert.WARNING("شما دسترسی لازم به این بخش  را ندارید");
        Cookies.remove("token");
        return (window.location.href = "/sign-in");
      }
       if (e?.response?.status === 422) {
        Alert.WARNING("داده های ورودی اشتباه می‌باشد");
      }

      if (e?.response?.status === 403 && typeof window !== "undefined") {
        // Cookies.remove("token");
        // return (window.location.href = "/sign-in");
        Alert.WARNING("شما دسترسی لازم به این بخش  را ندارید");
      }
      if (e?.response?.status === 500 && typeof window !== "undefined") {
        // Cookies.remove("token");
        // return (window.location.href = "/sign-in");
        Alert.DEFAULT("مشکلی رخ داده است");
      }
      return e;
    });
};
