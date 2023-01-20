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
        console.log('responsejson : ',responsejson);
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
            console.log();
            <h1>You have login succcessfully!</h1>
            <h2>Welcome {user.name}!</h2>
            <img src={user.profileImageUrl} alt="Profile"  />
            <h3>{user?.screenName}</h3>
            <div>Followers : {user.followers_count}</div>
            <div>Friends : {user.friends_count}</div>
            <div>statuses_count: {user.statuses_count}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Homepage;
