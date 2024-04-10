import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { profileSemesters, profileColleges, apiBase } from "../constants";
import { Button, AlertCard } from "../components";
import { PiSignInBold } from "react-icons/pi";
import { UserAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = UserAuth();
  const [user, setUser] = useState({
    username: "",
    password: "",
    name: "",
    college: "",
    semester: "",
  });
  const [alertMsg, setAlertMsg] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`${apiBase}/api/auth/signup`, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setAlertMsg({ msg: data.error, type: "error" });
        } else if (data.user) {
          localStorage.setItem("auth", JSON.stringify(data.user));
          var frnds = data.user.frnds.map((frnd) => {
            frnd = JSON.parse(frnd);
            frnd = Object.values(frnd)[0];
            return frnd.replace(data.user.username, "");
          });
          localStorage.setItem("frnds", JSON.stringify(frnds));
          setAuth(data.user);
          navigate("/dashboard");
        }
      });
  };

  useEffect(() => {
    if (auth._id) {
      navigate("/dashboard");
    }
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="container p-4">
      <div className="flex justify-center items-center">
        <div className="w-4/12 max-md:w-full bg-gradient p-[1px] rounded-md">
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="flex justify-center items-center bg-zinc-950 rounded-md p-4 w-full flex-col gap-3"
          >
            <h3 className="text-3xl max-md:text-xl bg-gradient bg-clip-text text-transparent">
              Sign Up
            </h3>
            {alertMsg?.msg && (
              <AlertCard text={alertMsg.msg} type={alertMsg.type} />
            )}
            <input
              type="username"
              name="username"
              placeholder="Username"
              className="form__input inputdata bg-zinc-900"
              required
              value={user?.username}
              onChange={handleChange}
            />
            <input
              type="text"
              name="name"
              autoComplete="off"
              placeholder="Your Name"
              required
              className="form__input inputdata bg-zinc-900"
              value={user?.name}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              className="form__input inputdata bg-zinc-900"
              placeholder="Password"
              required
              value={user?.password}
              onChange={handleChange}
            />
            <select
              type="text"
              name="college"
              autoComplete="off"
              required
              placeholder="College"
              className="form__input inputdata bg-zinc-900"
              defaultValue={user?.college}
              onChange={handleChange}
            >
              <option value="">--- Select A College ---</option>
              {profileColleges.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <select
              type="text"
              name="semester"
              autoComplete="off"
              placeholder="Semester"
              required
              className="form__input inputdata bg-zinc-900"
              defaultValue={user?.semester}
              onChange={handleChange}
            >
              <option value="">--- Select A Semester ---</option>
              {profileSemesters.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <span className="text-sm">
              Already have an account?{" "}
              <Link to="/login">
                <a className="text-fuchsia-600 underline underline-offset-3 hover:text-fuchsia-800">
                  Login
                </a>
              </Link>
            </span>
            <Button
              type="submit"
              text="Sign Up"
              variant="gradient"
              leftIcon={<PiSignInBold />}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
