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
    <section className="flex h-screen bg-gray-100">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <main className="flex-1 overflow-y-auto p-8">
        {loading ? (
          <article className="flex justify-center items-center h-64">
            <span className="text-lg text-primary-gray">Loading...</span>
          </article>
        ) : therapists?.length ? (
          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {therapists.map((therapist) => (
              <article
                key={therapist.id}
                className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center border border-purple-50 hover:shadow-xl transition-all duration-300 group hover:border-purple-100"
              >
                <img
                  src={therapist.image as string}
                  alt={therapist.name}
                  className="w-28 h-28 object-cover rounded-full border-4 border-primary/20 mb-4 group-hover:border-primary/40 transition-all duration-300"
                />
                <h2 className="text-xl font-semibold text-purple-900 mb-1 text-center">
                  {therapist.name}
                </h2>

                {/* Expertise section */}
                <article className="flex flex-wrap justify-center gap-2 mb-3">
                  {therapist.expertise.map((exp) => (
                    <span
                      key={exp.expertise}
                      className="px-2 py-1 bg-purple-50 text-purple-700 text-xs font-medium rounded-full"
                    >
                      {exp.expertise}
                    </span>
                  ))}
                </article>

                {/* Experience section */}
                <section className="flex items-center mb-3">
                  <article className="flex items-center bg-purple-100/30 px-3 py-1 rounded-full">
                    <svg
                      className="w-4 h-4 text-purple-700 mr-1"
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
                    <span className="text-xs font-medium text-purple-800">
                      {therapist.experience_years} years experience
                    </span>
                  </article>
                </section>

                <p className="text-gray-600 text-sm text-center mb-4 line-clamp-3">
                  {therapist.bio}
                </p>

                <p className="text-xs text-gray-400 text-center mt-auto">
                  Joined {new Date(therapist.createdDate).toLocaleDateString()}
                </p>
              </article>
            ))}
          </section>
        ) : (
          <div className="text-gray-500 text-center">No therapists found.</div>
        )}
      </main>
    </section>
  );
};

export default Therapists;
