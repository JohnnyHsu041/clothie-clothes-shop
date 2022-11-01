import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App";
import { BrowserRouter } from "react-router-dom";
import store from "./redux/store";
import "./styles/css/global.css";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>
);
