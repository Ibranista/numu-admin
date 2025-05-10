import { useState } from "react";
import Sidebar from "./Sidebar";
import { useAppSelector } from "../hooks/hooks";
import { selectTherapist } from "../features/therapists/selector";
import { selectChildren } from "../features/children/selector";
import HamburgerButton from "../components/Humberger";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const therapistData = useAppSelector(selectTherapist);
  const childrenData = useAppSelector(selectChildren);
  const therapistCount = therapistData?.therapists?.length || 0;
  const childrenCount = childrenData?.children?.total || 0;

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <article className="flex-1 flex flex-col overflow-hidden">
        <header className="lg:hidden bg-gray-900 text-white p-4 flex items-center justify-between">
          <HamburgerButton onClick={() => setSidebarOpen(!sidebarOpen)} />
          <img src="/wecare.png" alt="WeCare Logo" className="h-8" />
        </header>
        <article className="flex-1 flex flex-col items-center justify-center min-h-screen">
          <main
            className="w-full max-w-full bg-white rounded-xl shadow-md overflow-hidden p-8"
            style={{ minHeight: "80vh", width: "80%" }}
          >
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Welcome to Numu Dashboard
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Numu is your platform to manage therapy sessions, connect with
                therapists, and support children's well-being. Easily track your
                therapists, children, and resources all in one place.
              </p>
              <div className="flex justify-center">
                <img
                  src="/wecare.png"
                  alt="WeCare Logo"
                  className="h-20 opacity-90 hover:opacity-100 transition-opacity"
                />
              </div>
              <div className="grid grid-cols-2 gap-6 mt-12">
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">
                    Therapists
                  </h3>
                  <p className="text-3xl font-bold text-blue-600">
                    {therapistCount}
                  </p>
                </div>
                <div className="bg-green-50 p-6 rounded-lg border border-green-100">
                  <h3 className="text-lg font-semibold text-green-800 mb-2">
                    Children
                  </h3>
                  <p className="text-3xl font-bold text-green-600">
                    {childrenCount}
                  </p>
                </div>
              </div>
            </div>
          </main>
        </article>
      </article>
    </div>
  );
};

export default Dashboard;
