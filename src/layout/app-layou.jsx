import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React from "react";
import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <div>
      {/* <div className='grid-background'></div> */}

      <Header />

      <main className='max-w-7xl mx-auto px-8 py-8 min-h-screen'>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default AppLayout;
