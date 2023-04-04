import { Button, Center, Group, Paper, Text } from "@mantine/core";
import OTPInput from "otp-input-react";
import { useTranslation } from "react-i18next";
import { otpInputStyle } from "../../styles/otpInputStyles";
import { useSelector } from "react-redux";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const OtpInput = ({ dispatchDoAuthenticate, dispatchRequestOTP }) => {
  const { t } = useTranslation();
  const { email } = useSelector((state) => state.auth);
  const [OTP, setOTP] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (otp) => {
    setOTP(otp);

    if (otp.length === 6) {
      const response = await dispatchDoAuthenticate({
        username: email,
        password: otp,
      });
      response ? navigate("/") : setOTP("");
    }
  };

  return (
    <div
      style={{ height: "100vh", width: "100vw", backgroundColor: "#F5F5F5" }}
    >
      <Group
        size="xs"
        px="xs"
        sx={(theme) => ({
          background: theme.colors.white,
          padding: theme.spacing.md,
          height: "25vh",
        })}
      />

      <Center>
        <Paper
          radius="md"
          p="xl"
          shadow="sm"
          withBorder
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text fz="md" ta="center">
            {t("OTPScreen.title")}
          </Text>
          <OTPInput
            value={OTP}
            onChange={handleSubmit}
            autoFocus
            OTPLength={6}
            otpType="number"
            disabled={false}
            inputStyles={otpInputStyle}
          />
          <Button
            onClick={() => dispatchRequestOTP({ email })}
            styles={(theme) => ({
              root: {
                backgroundColor: "#E40046",
                marginTop: "10px",
                "&:hover": {
                  backgroundColor: theme.fn.darken("#E40046", 0.05),
                },
              },
            })}
          >
            {t("OTPScreen.resend")}
          </Button>
        </Paper>
      </Center>
    </div>
  );
};

export default OtpInput;
