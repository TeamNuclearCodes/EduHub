import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiBase } from "../constants";
import { Button, AlertCard } from "../components";
import { PiSignInBold } from "react-icons/pi";
import { UserAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = UserAuth();
  const [user, setUser] = useState({ username: "", password: "" });
  const [alertMsg, setAlertMsg] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`${apiBase}/api/auth/login`, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) setAlertMsg({ msg: data.error, type: "error" });
        else if (data.user) {
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
              Login
            </h3>
            {alertMsg?.msg && (
              <AlertCard text={alertMsg.msg} type={alertMsg.type} />
            )}
            <input
              type="username"
              name="username"
              placeholder="Username"
              className="form__input inputdata bg-zinc-900"
              value={user.username}
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              className="form__input inputdata bg-zinc-900"
              value={user.password}
              onChange={handleChange}
            />
            <span className="text-sm">
              New to EduHub?{" "}
              <Link to="/signup">
                <a className="text-fuchsia-600 underline underline-offset-3 hover:text-fuchsia-800">
                  Sign Up
                </a>
              </Link>
            </span>
            <Button
              type="submit"
              text="Login"
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
