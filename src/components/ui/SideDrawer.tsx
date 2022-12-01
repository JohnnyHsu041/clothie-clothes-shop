import React from "react";
import ReactDOM from "react-dom";

import s from "../../styles/css/SideDrawer.module.css";

const SideDrawer: React.FC<{
    children: React.ReactNode;
}> = ({ children }) => {
    const hook = document.getElementById("side-drawer-hook")! as HTMLDivElement;

    const content = <aside className={s["side-drawer"]}>{children}</aside>;

    return ReactDOM.createPortal(content, hook);
};

export default SideDrawer;
