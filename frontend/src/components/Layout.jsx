import React from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import ChatWidget from "./ChatWidget.jsx";

const Layout = ({ children }) => {
  return (
    <div className="app-root">
      <Header />
      <main>{children}</main>
      <Footer />
      <ChatWidget />
    </div>
  );
};

export default Layout;
