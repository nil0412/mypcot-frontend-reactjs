import { Button, Card } from "@blueprintjs/core";
import React, { useCallback, useContext, useEffect } from "react";
import Loader from "./Loader";
import { UserContext } from "./Context/UserContext";

const Welcome = () => {
  const [userContext, setUserContext] = useContext(UserContext);

  const fetchUserDetails = useCallback(() => {
    fetch(process.env.REACT_APP_API_ENDPOINT + "api/user/currentUser", {
      method: "GET",
      credentials: "include",
      // Pass authentication token as bearer token in header
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userContext.token}`,
      },
    }).then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        console.log("Data 1::: " , data);
        setUserContext((oldValues) => {
          return { ...oldValues, details: data };
        });
      } else {
        if (response.status === 401) {
            console.log("Data 2::: " );
          // Edge case: when the token has expired.
          // This could happen if the refreshToken calls have failed due to network error or
          // User has had the tab open from previous day and tries to click on the Fetch button
          window.location.reload();
        } else {
            console.log("Data 3::: " );
          setUserContext((oldValues) => {
            return { ...oldValues, details: null };
          });
        }
      }
    });
  }, [setUserContext, userContext.token]);

  useEffect(() => {
    // fetch only when user details are not present
    if (!userContext.details) {
      fetchUserDetails();
    }
  }, [userContext.details, fetchUserDetails]);

  const refetchHandler = () => {
    // set details to undefined so that spinner will be displayed and
    // fetchUserDetails will be invoked from useEffect
    setUserContext((oldValues) => {
      return { ...oldValues, details: undefined };
    });
  };

  const logoutHandler = () => {
    fetch(process.env.REACT_APP_API_ENDPOINT + "api/user/logout", {
      credentials: "include",
      // Pass authentication token as bearer token in header
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userContext.token}`,
      },
    }).then(async (response) => {
      setUserContext((oldValues) => {
        return { ...oldValues, details: undefined, token: null };
      });
      window.localStorage.setItem("logout", Date.now());
    });
  };

  return userContext.details === null ? (
    "Error Loading User details"
  ) : !userContext.details ? (
    <Loader />
  ) : (
    <Card elevation="1">
      <div className="user-details">
        <div>
          <p>
            Welcome&nbsp;
            <strong>
              {userContext.details.name}
            </strong>
          </p>
        </div>
        <div className="user-actions">
          {/* <Button text="Refetch" intent="primary" onClick={refetchHandler} /> */}
          <Button
            text="Logout"
            onClick={logoutHandler}
            minimal
            intent="primary"
          />
        </div>
      </div>
    </Card>
  );
};

export default Welcome;
