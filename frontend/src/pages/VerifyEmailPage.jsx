import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import { useNavigate } from "react-router-dom";
import LockIcon from "@mui/icons-material/Lock";
import { useContext, useState } from "react";
import LogoCanvas from "../components/LogoCanvas";
import { backendUrl } from "../api/api";
import { UserContext } from "../context/UserContext";

const VerifyEmailPage = () => {
  const [sixDigitCode, setSixDigitCode] = useState("");
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();

    if (!sixDigitCode) {
      return;
    }

    const res = await fetch(`${backendUrl}/api/v1/users/verify-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: user.email,
        verificationCode: sixDigitCode,
      }),
    });

    const data = await res.json();
    setUser(data.user);

    navigate("/signin");

    setSixDigitCode("");
  };

  return (
    <div className="min-h-svh flex flex-col justify-between px-5 pb-12  pt-4">
      <div className="flex flex-col">
        <LogoCanvas scale={0.3} />
        <h1 className="text-center mb-6 text-purple-1 self-center font-roboto-bold text-xl border-b-2 border-green-1">
          Verify Email
        </h1>
        <form className="flex flex-col gap-6">
          <CustomInput
            type="text"
            label="Code"
            icon={<LockIcon sx={{ color: "#00ECAA" }} />}
            onChange={(e) => setSixDigitCode(e.target.value)}
            value={sixDigitCode}
          />
          <p className="text-sm text-green-1">
            Don’t have a code?{" "}
            <button className="font-roboto-bold text-purple-2 hover:text-purple-1 underline underline-offset-4">
              Resend code
            </button>
          </p>
        </form>
      </div>
      <div className="flex flex-col gap-4 items-center pt-6">
        <CustomButton
          fontSize="16px"
          width="100%"
          borderRadius="16px"
          bgcolor="#7254EE"
          bgcolorHover="#5D3EDE"
          padding="15px"
          text="Verify"
          endIcon={<VerifiedUserIcon />}
          onClick={handleVerify}
        />
      </div>
    </div>
  );
};

export default VerifyEmailPage;
