import React, { useEffect, useState } from "react";
import Header from "./Header";

const Homepage = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch does not send cookies. So you should add credentials: 'include'
    fetch("http://localhost:8000/", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "Application/json",
        "content-type": "Application/json",
        "Access-Control-Allow-Credentials": true,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        throw new Error("failed to authenticate user");
      })
      .then((responsejson) => {
        setAuthenticated(true);
        setUser(responsejson.user);
      })
      .catch((err) => {
        console.log("Error : ", err);
        setAuthenticated(false);
        const errorObj = {
          message: "Failed to Authenticate user",
          error: err,
        };
        setError(errorObj);
      });
  }, []);

  const _handleNotAuthenticated = () => {
    this.setState({ authenticated: false });
  };

  return (
    <div>
      <Header
        authenticated={authenticated}
        handleNotAuthenticated={_handleNotAuthenticated}
      />
      <div>
        {!authenticated ? (
          <h1>Welcome!</h1>
        ) : (
          <div>
            <h1>You have login succcessfully!</h1>
            <h2>Welcome {user.name}!</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Homepage;
