import React from "react";
import "../../src/asset/styles/login.css";
// import background from "../../src/asset/images/bus.svg";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function LoginComponent() {


  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    // const form = event.target;
    // const formData = new FormData(form);
    // const formJson = Object.fromEntries(formData.entries());
    console.log(name, password);


    fetch("http://192.168.1.7:3000/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        
        // 'Content-Type': 'application/x-www-form-urlencoded',
        
      },
      body: JSON.stringify({
        name: name,
        password: password,
      }),
      mode:'cors',
      credentials:'same-origin'
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        document.cookie = `user=${name}`;
        console.log(response);
        return response;
      })
      .then((res) => {
        console.log(res.status);
        if (res.status === 200) {
          console.log("go");
          return navigate('/');
        } else if (res.status === 401) {
          setName("");
          setPassword("");
          setError(res.message);
          setIsError(true);
        } else {
          setError("Some error occured");
        }
      });
  };

  return (
    <div className="login">
      <div className="form_login">
        <form action="post" onSubmit={handleSubmit}>
          <h2>ĐĂNG NHẬP</h2>
          {/* Error */}
          <div className="form-froup">
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              onChange={(e)=>setName(e.target.value)}
            />
          </div>
          <div className="form-froup">
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>

          {isError && (
            <div className="errors">
              <span>
                <i class="fa-regular fa-circle-xmark"></i>
                {error}
              </span>
            </div>
          )}

          <button type="submit" className="submitbtn">
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
}
