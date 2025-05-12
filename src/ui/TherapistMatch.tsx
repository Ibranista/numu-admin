import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { getChildren, suggestTherapist } from "../features/children/thunk.api";
import { selectChildren } from "../features/children/selector";
import { getTherapists } from "../features/therapists/thunk.api";
import { selectTherapist } from "../features/therapists/selector";
import type { ISuggestTherapistPayload } from "../features/children/types";
import Pagination from "../components/Pagination";
import MatchLoadingSkeleton from "../components/MatchLoadingSkeleton";
import toast from "react-hot-toast";

const TherapistMatch = () => {
  const dispatch = useAppDispatch();

  const [page, setPage] = useState(1);
  const [limit] = useState(5);

  // state setup to prevent all suggest buttons to show loading state
  const [suggestingId, setSuggestingId] = useState<{
    childId: number;
    therapistId: number;
  } | null>(null);

  const childrenData = useAppSelector(selectChildren);
  const { loading: childrenLoading, children } = childrenData ?? {};

  const therapistsData = useAppSelector(selectTherapist);

  const { therapists } = therapistsData ?? {};
  const [sidebarOpen, setSidebarOpen] = useState(false);

  console.log("therapists data-->", therapistsData);
  useEffect(() => {
    dispatch(getChildren({ page, limit }));
    dispatch(getTherapists());
  }, [dispatch, page, limit]);

  const handleSuggest = async (
    childId: number,
    therapistId: number,
    therapistName?: string
  ) => {
    setSuggestingId({ childId, therapistId });
    const payload: ISuggestTherapistPayload = {
      child: childId,
      therapist: therapistId,
      decline_reason: "",
      status: "pending",
    };
    await dispatch(suggestTherapist(payload));
    toast.success(`Successfully suggested '${therapistName || "therapist"}'`);
    await dispatch(getChildren({ page, limit }));
    setSuggestingId(null);
  };

  return (
    <section className="flex h-screen bg-gray-100">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <main className="flex-1 overflow-y-auto p-8">
        <h1 className="text-3xl font-bold mb-8 text-primary">
          Children & Therapist Matches
        </h1>
        <section className="grid grid-cols-2 gap-8">
          {childrenLoading ? (
            Array.from({ length: limit }).map((_, idx) => (
              <div className="col-span-1" key={idx}>
                <MatchLoadingSkeleton />
              </div>
            ))
          ) : children?.results?.length ? (
            children?.results?.map((child) => (
              <section
                key={child.id}
                className="bg-white rounded-xl shadow-lg p-6 flex flex-col md:grid md:grid-cols-2 gap-6 border border-purple-100 hover:shadow-2xl transition"
              >
                <section className="flex-1">
                  <h2 className="text-lg font-semibold text-purple-900 mb-2 border-b-2 border-purple-200 pb-2">
                    {child.name}
                  </h2>
                  <article className="text-gray-600 mb-1">
                    <span className="font-medium">Birthdate:</span>{" "}
                    {child.birthDate}
                  </article>
                  <article className="text-gray-600 mb-1">
                    <span className="font-medium">Gender:</span> {child.gender}
                  </article>
                  <article className="text-gray-600 mb-1">
                    <span className="font-medium">Parent:</span>{" "}
                    {child.parent.first_name} {child.parent.last_name} (
                    {child.parent.email})
                  </article>
                  <article className="mt-2">
                    <span className="font-medium text-green-700">
                      Concerns:
                    </span>
                    <ul className="list-disc ml-6 text-gray-700">
                      {child.concerns.length ? (
                        child.concerns.map((c) => <li key={c.id}>{c.title}</li>)
                      ) : (
                        <li className="text-gray-400">No concerns</li>
                      )}
                    </ul>
                  </article>
                </section>
                <section>
                  <p
                    className="
                    text-lg font-semibold text-purple-900 mb-2 border-b-2 border-purple-200 pb-2
                  "
                  >
                    Therapists
                  </p>
                  <article className="flex-1 flex flex-col gap-4 max-h-96 overflow-auto">
                    {(() => {
                      const filteredTherapists = therapists?.filter(
                        (therapist) =>
                          !child.acceptedTherapists?.includes(therapist.id) &&
                          !child.therapist_matches?.some(
                            (match) => match.therapist.id === therapist.id
                          )
                      );

                      return filteredTherapists &&
                        filteredTherapists.length > 0 ? (
                        filteredTherapists.map((therapist) => (
                          <div
                            key={therapist.id}
                            className="bg-blue-50 rounded-lg p-4 flex flex-col md:flex-row md:items-center gap-3 border border-blue-100 shadow-sm"
                          >
                            <div className="flex-1 cursor-pointer">
                              <div className="font-medium text-blue-800">
                                {therapist.name}
                              </div>
                              <div className="text-sm text-gray-600">
                                {therapist.expertise
                                  .map((exp) => exp.expertise)
                                  .join(", ")}
                              </div>
                            </div>
                            <button
                              className={`cursor-pointer px-4 py-2 rounded-md text-white font-semibold bg-gradient-to-r from-purple-500 to-blue-500 hover:from-primary hover:to-blue-600 ${
                                suggestingId?.childId === child.id &&
                                suggestingId?.therapistId === therapist.id
                                  ? "opacity-60 cursor-not-allowed"
                                  : ""
                              }`}
                              disabled={
                                suggestingId?.childId === child.id &&
                                suggestingId?.therapistId === therapist.id
                              }
                              onClick={() =>
                                handleSuggest(
                                  child.id,
                                  therapist.id,
                                  therapist.name
                                )
                              }
                            >
                              {suggestingId?.childId === child.id &&
                              suggestingId?.therapistId === therapist.id
                                ? "Suggesting..."
                                : "Suggest"}
                            </button>
                          </div>
                        ))
                      ) : (
                        <div className="text-gray-500">
                          No therapist matches
                        </div>
                      );
                    })()}
                  </article>
                </section>
              </section>
            ))
          ) : (
            <div className="text-gray-500 col-span-2">No children found.</div>
          )}
        </section>
        {children &&
          Array.isArray(children?.results) &&
          children?.total > limit && (
            <Pagination
              page={page}
              total={children.total}
              limit={limit}
              onPageChange={setPage}
            />
          )}
      </main>
    </section>
  );
};

export default TherapistMatch;
