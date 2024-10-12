import * as React from "react";
import * as ReactDOM from "react-dom/client";
//import 'bootstrap/dist/css/bootstrap.min.css';

import {
  BrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import App from './App'
import { Container } from "react-bootstrap";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </ BrowserRouter >
);