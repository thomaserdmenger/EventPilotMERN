import HeaderNav from "../components/HeaderNav";
import CustomInput from "../components/CustomInput";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import TextField from "@mui/material/TextField";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";

const UserProfilePageEdit = () => {
  const { user } = useContext(UserContext);
  const [firstname, setFirstname] = useState(user?.user?.firstname || "Firstname");
  const [lastname, setLastname] = useState(user?.user?.lastname || "Lastname");
  const [username, setUsername] = useState(user?.user?.username || "Username");
  const [bio, setBio] = useState(user?.user?.bio || "About me");

  return (
    <>
      <HeaderNav />
      <section>
        <div className=" flex justify-center mb-[40px] mt-6">
          <p>UserImage</p>
        </div>
        <form className="flex flex-col gap-6 px-8">
          <CustomInput
            type={"text"}
            label={"Firstname"}
            icon={<AccountCircleIcon sx={{ color: "#00ECAA" }} />}
            onChange={(e) => setFirstname(e.target.value)}
            value={firstname}
          />
          <CustomInput
            type={"text"}
            label={"Lastname"}
            icon={<AccountCircleIcon sx={{ color: "#00ECAA" }} />}
            onChange={(e) => setLastname(e.target.value)}
            value={lastname}
          />
          <CustomInput
            type={"text"}
            label={"Username"}
            icon={<AccountCircleOutlinedIcon sx={{ color: "#00ECAA" }} />}
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />

          <TextField
            id="outlined-multiline-static"
            // label="Multiline"
            multiline
            rows={6}
            onChange={(e) => setUsername(e.target.value)}
            value={bio}
          />
        </form>
      </section>
    </>
  );
};

export default UserProfilePageEdit;
