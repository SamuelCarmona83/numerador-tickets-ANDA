import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar }  from "./navbar";

export const WithNavbar = () => {
    return (
        <>
            <Navbar />
            <div className="content">
                <Outlet /> 
            </div>
        </>
    );
};