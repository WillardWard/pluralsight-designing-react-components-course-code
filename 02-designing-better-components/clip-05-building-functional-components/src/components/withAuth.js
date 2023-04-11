import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContexts";

function withAuth(Component) {
  return function (props) {
    const { loggedInUser, setLoggedInUser } = useContext(AuthContext);
    return (
      <Component
        loggedInUser={loggedInUser}
        setLoggedInUser={setLoggedInUser}
        {...props}
      ></Component>
    );
  };
}

export default withAuth;
