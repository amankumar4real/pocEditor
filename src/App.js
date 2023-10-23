import "./App.css";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import axios from "axios";

function App() {
  const {
    loginWithPopup,
    loginWithRedirect,
    logout,
    user,
    isAuthenticated,
    getAccessTokenSilently,
  } = useAuth0();

  async function getAuthToken() {
    let token
    try {
      // if (!isAuthenticated) return;
      token = await getAccessTokenSilently();
    } catch (error) {
      console.log(error.message, "this is our get auth token error!");
    }
    return token
  }

  async function callTestApi() {
    try {
      const token = await getAuthToken();
      console.log(token);
      const response = await axios(`http://localhost:8014/test`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      const responseData = response.data;
      console.log(responseData, "responseDataresponseData");
    } catch (error) {
      console.log(error.message, "this is our callTestApi error!");
    }
  }
  return (
    <>
      {!isAuthenticated ? (
        <div style={{ margin: "50px" }}>
          <ButtonGroup aria-label="Basic example">
            <Button onClick={loginWithPopup} variant="primary">
              Login with popup
            </Button>
            <Button onClick={loginWithRedirect} variant="secondary">
              Login with redirect
            </Button>
            <Button onClick={callTestApi} variant="dark">
              Call Test api without Auth
            </Button>
          </ButtonGroup>
        </div>
      ) : (
        <div style={{ margin: "50px" }}>
          <ButtonGroup aria-label="Basic example">
            <Button onClick={logout} variant="danger">
              Logout
            </Button>
            <Button onClick={callTestApi} variant="dark">
              Call Test api with Auth
            </Button>
          </ButtonGroup>
        </div>
      )}
      <h1 style={{ margin: "50px" }}>USER DETAILS</h1>
      {isAuthenticated ? (
        <div>
          <img
            src={user.picture}
            alt="User Picture"
            style={{ margin: "50px" }}
            width="50"
            height="50"
          />
          <div style={{ margin: "50px" }}>
            User Details----- {JSON.stringify(user)}
          </div>
        </div>
      ) : (
        <h2 style={{ margin: "50px" }}>User not is Authenticated</h2>
      )}
    </>
  );
}

export default App;
