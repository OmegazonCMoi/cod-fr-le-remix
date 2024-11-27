'use client';

import Navbar from "@/components/blocks/navbar";
import LoginForm from "@/components/blocks/login";
import React from "react";

const Login = () => {
    return (
        <div id="login">
            <Navbar />
            <LoginForm />
        </div>
    );
};

export default Login;
