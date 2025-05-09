import { useState } from "react";
import Sidebar from "./Sidebar";
import HamburgerButton from "../components/Humberger";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="lg:hidden bg-gray-900 text-white p-4 flex items-center justify-between">
          <HamburgerButton onClick={() => setSidebarOpen(!sidebarOpen)} />
          <img src="/wecare.png" alt="WeCare Logo" className="h-8" />
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Welcome to Your Dashboard
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Here you can manage your therapy sessions, find new therapists,
                and access helpful tools.
              </p>

              <div className="flex justify-center">
                <img
                  src="/wecare.png"
                  alt="WeCare Logo"
                  className="h-20 opacity-90 hover:opacity-100 transition-opacity"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <div className="bg-purple-50 p-6 rounded-lg border border-purple-100">
                  <h3 className="text-lg font-semibold text-purple-800 mb-2">
                    Upcoming Sessions
                  </h3>
                  <p className="text-3xl font-bold text-purple-600">2</p>
                </div>
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">
                    Therapists
                  </h3>
                  <p className="text-3xl font-bold text-blue-600">3</p>
                </div>
                <div className="bg-green-50 p-6 rounded-lg border border-green-100">
                  <h3 className="text-lg font-semibold text-green-800 mb-2">
                    Resources
                  </h3>
                  <p className="text-3xl font-bold text-green-600">5+</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
