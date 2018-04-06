import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom"
import App from "./App.js"

const Router = ( //na bookmarkovanie a historiu
    <BrowserRouter>
        <Route path="/" component={App} />
    </BrowserRouter>
);

export default Router;