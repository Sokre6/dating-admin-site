import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import {
  requestOTP,
  setEmail,
  doAuthenticate,
  clearAuthState,
} from "../../store/slices/auth";
import { showNotification } from "@mantine/notifications";
import { useState } from "react";
import EmailInput from "./EmailInput";
import OtpInput from "./OtpInput";

const LoginScreen = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [screenContent, setScreenContent] = useState("EmailInput");

  useEffect(() => {
    if (screenContent === "EmailInput") {
      dispatch(clearAuthState());
    }
  }, [dispatch, screenContent]);

  const dispatchDoAuthenticate = async (data) => {
    try {
      const response = await dispatch(doAuthenticate(data)).unwrap();
      return response;
    } catch (error) {
      if (error.message === "Bad credentials") {
        showNotification({
          message: t("OTPScreen.wrongOTP"),
          color: "red",
        });
      } else if (error.message === "User credentials have expired") {
        showNotification({
          message: t("OTPScreen.expired"),
          color: "red",
        });
      } else {
        showNotification({
          message: t("OTPScreen.unexpectedError"),
          color: "red",
        });
      }
    }
  };

  const dispatchRequestOTP = async (data) => {
    try {
      await dispatch(requestOTP(data)).unwrap();
      dispatch(setEmail(data.email));
      setScreenContent("OtpInput");
    } catch (error) {
      if (error.message === "404") {
        showNotification({
          message: t("loginScreen.wrongEmail"),
          color: "red",
        });
      } else {
        showNotification({
          message: t("loginScreen.unexpectedError"),
          color: "red",
        });
      }
    }
  };

  if (screenContent === "EmailInput") {
    return <EmailInput dispatchRequestOTP={dispatchRequestOTP} />;
  }

  if (screenContent === "OtpInput") {
    return (
      <OtpInput
        dispatchDoAuthenticate={dispatchDoAuthenticate}
        dispatchRequestOTP={dispatchRequestOTP}
      />
    );
  }
};

export default LoginScreen;
