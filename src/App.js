import "App.css";
import { jwtDecode } from "jwt-decode";
import { useContext, useEffect } from "react";

// components
import Routes from "Routes/PublicRoutes";
import useQuery from "Utils/QueryParams";
import moment from "moment";

import { UserProfilContext } from "Context";

function App() {
  const query = useQuery();

  const { userById, getUserProfilById, getUserLoginById } =
    useContext(UserProfilContext);

  const accessToken = query.get("accessToken");
  const refreshToken = query.get("refreshToken");

  useEffect(() => {
    const setToken = () => {
      if (accessToken && refreshToken) {
        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("refresh_token", refreshToken);
      }
    };

    // if (!isAlreadyHaveToken) {
    //   console.log("running token");
    // }
    setToken();
    // return () => {};
  }, [accessToken, refreshToken]);

  useEffect(() => {
    if (accessToken) {
      const decodedToken = jwtDecode(accessToken);
      const id = decodedToken.id;
      // console.log('data user', id);

      getUserLoginById(id);
      getUserProfilById(id, { date: moment().format("YYYY-MM-DD") });

      // getUserProfilById(id);
    }
  }, []);

  console.log("user by id", userById);
  if (userById) {
    return <Routes />;
  }
}

export default App;

// export default function App() {

//   return (
//     <HashRouter>
//       <Switch>
//         <Route
//           exact
//           path="/"
//           render={() => <Redirect to="/app/operational" />}
//         />
//         <PublicRoute path="/app/operational" component={Routes} />
//       </Switch>
//     </HashRouter>
//   );

//   function PublicRoute({ component, ...rest }) {
//     return (
//       <Route
//         {...rest}
//         exact
//         render={props => React.createElement(component, props)}
//       />
//     );
//   }
// }
