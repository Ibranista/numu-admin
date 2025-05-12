import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { selectTherapist } from "../features/therapists/selector";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { getTherapists } from "../features/therapists/thunk.api";

const Therapists = () => {
  const dispatch = useAppDispatch();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const therapistData = useAppSelector(selectTherapist);
  const { therapists, loading } = therapistData ?? {};

  useEffect(() => {
    dispatch(getTherapists());
  }, [dispatch]);

  return (
    <section className="flex h-screen bg-gray-50">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <main className="flex-1 overflow-y-auto p-8">
        {loading ? (
          <article className="flex justify-center items-center h-64">
            <span className="text-lg text-gray-500">Loading therapists...</span>
          </article>
        ) : therapists?.length ? (
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {therapists.map((therapist) => (
              <article
                key={therapist.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden border border-gray-100"
              >
                <div className="p-5">
                  <div className="flex items-center space-x-4 mb-4">
                    <img
                      src={therapist.image as string}
                      alt={therapist.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-white shadow"
                    />
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800">
                        {therapist.name}
                      </h2>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span>
                          {therapist.experience_years} years experience
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {therapist.bio}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {therapist.expertise.map((exp) => (
                      <span
                        key={exp.expertise}
                        className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full"
                      >
                        {exp.expertise}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="px-5 py-3 bg-gray-50 border-t border-gray-100">
                  <p className="text-xs text-gray-500">
                    Joined{" "}
                    {therapist?.createdDate &&
                      new Date(therapist?.createdDate).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                        }
                      )}
                  </p>
                </div>
              </article>
            ))}
          </section>
        ) : (
          <div className="text-gray-500 text-center py-10">
            No therapists available at this time.
          </div>
        )}
      </main>
    </section>
  );
};

export default Therapists;
