import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import App from "./App.js";
import Login from "./Login.js";
import Lobby from "./Lobby.js";
import Game from "./Game.js";
import Register from "./Register.js"
import { makeRouteConfig, createMatchEnhancer, Matcher } from "found";


//ten router vlastne ani nebude potrebny
//toto je cargocult, nechapem na co to vlastne je
// const Router = ( //na bookmarkovanie a historiu
//     <BrowserRouter>
//         <Route path="/" component={App} />
//     </BrowserRouter>
// );

const routeConfig = makeRouteConfig(
    <Route path="/" Component={App}>
        <Route Component={Login} />
        <Route path="register" Component={Register} />
        <Route path="lobby" Component={Lobby} />
        <Route path="game" Component={Game} />
    </Route>
);

//otayka je, ci to chceme davat do historie
export default createMatchEnhancer(new Matcher(routeConfig));
//matcher je na spajanie pathov k veciam som pochopil


// Component or getComponent

// Define the component for a route using either a Component field or a getComponent method. Component should be a component class or function. getComponent should be a function that returns a component class or function, or a promise that resolves to either of those. Routes that specify neither will still match if applicable, but will not have a component associated with them.

// Given the following route configuration:

// const routes = makeRouteConfig(
//   <Route path="/" Component={AppPage}>
//     <Route Component={MainPage}>
//       <Route Component={MainSection} />
//       <Route path="other" Component={OtherSection} />
//     </Route>
//     <Route path="widgets">
//       <Route Component={WidgetsPage} />
//       <Route path=":widgetId" Component={WidgetPage} />
//     </Route>
//   </Route>,
// );

// The router will have routes as follows:

//     /, rendering:

// <AppPage>
//   <MainPage>
//     <MainSection />
//   </MainPage>
// </AppPage>

//     /other, rendering:

// <AppPage>
//   <MainPage>
//     <OtherSection />
//   </MainPage>
// </AppPage>

//     /widgets, rendering:

// <AppPage>
//   <WidgetsPage />
// </AppPage>

//     /widgets/${widgetId} (e.g. /widgets/foo), rendering:

// <AppPage>
//   <WidgetPage />
// </AppPage>