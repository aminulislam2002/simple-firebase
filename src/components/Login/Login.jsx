import React, { useState } from "react";
import { GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import app from "../../firebase/firebase.init";

const Login = () => {
  const [user, setUser] = useState(null);

  const auth = getAuth(app);
  // console.log(app);

  const googleProvider = new GoogleAuthProvider();

  const githubProvider = new GithubAuthProvider();

  const handleGoogleSingIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const loggedInUser = result.user;
        console.log(loggedInUser);
        setUser(loggedInUser);
      })
      .catch((error) => {
        console.log("error", error.message);
      });
  };

  const handleGithubSingIn = () => {
    signInWithPopup(auth, githubProvider)
      .then((result) => {
        const loggedInUser = result.user;
        console.log(loggedInUser);
        setUser(loggedInUser);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleGoogleSingOut = () => {
    signOut(auth)
      .then((result) => {
        console.log(result);
        setUser(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      {/* user? logout: sing in */}

      {user ? (
        <button onClick={handleGoogleSingOut}>Sing Out</button>
      ) : (
        <>
          <button onClick={handleGoogleSingIn}>Google Login</button>
          <button onClick={handleGithubSingIn}>Github Login</button>
        </>
      )}

      {user && (
        <div>
          <h1>User Details</h1>
          <h2>User Name: {user?.displayName}</h2>
          <p>User Email: {user?.email}</p>
        </div>
      )}
    </div>
  );
};

export default Login;
