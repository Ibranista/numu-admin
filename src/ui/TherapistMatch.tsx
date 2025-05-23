import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { getChildren, suggestTherapist } from "../features/children/thunk.api";
import { selectChildren } from "../features/children/selector";
import { getTherapists } from "../features/therapists/thunk.api";
import { selectTherapist } from "../features/therapists/selector";
import type {
  ISuggestTherapistPayload,
  IChild,
} from "../features/children/types";
import Pagination from "../components/Pagination";
import MatchLoadingSkeleton from "../components/MatchLoadingSkeleton";
import {
  ChildInfo,
  TherapistMatchLayout,
  TherapistSuggestion,
} from "../components/ChildDetail";
import { DeleteIcon, InfoIcon, SuccessIcon } from "../assets/icons";

const PAGE_LIMIT = 5;

type SuggestingState = {
  childId: number;
  therapistId: number;
} | null;

const TherapistMatch = () => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [suggestingId, setSuggestingId] = useState<SuggestingState>(null);

  const { loading: childrenLoading, children } =
    useAppSelector(selectChildren) ?? {};
  const { therapists } = useAppSelector(selectTherapist) ?? {};

  useEffect(() => {
    dispatch(getChildren({ page, limit: PAGE_LIMIT }));
    dispatch(getTherapists());
  }, [dispatch, page]);

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

    try {
      await dispatch(suggestTherapist(payload));
      toast.success(`Successfully suggested '${therapistName || "therapist"}'`);
      await dispatch(getChildren({ page, limit: PAGE_LIMIT }));
    } finally {
      setSuggestingId(null);
    }
  };

  const getFilteredTherapists = (child: IChild) => {
    return therapists?.filter(
      (therapist) =>
        !child.acceptedTherapists?.includes(therapist.id) &&
        !child.therapist_matches?.some(
          (match) => match.therapist.id === therapist.id
        )
    );
  };

  if (childrenLoading) {
    return (
      <TherapistMatchLayout
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      >
        <div className="grid grid-cols-2 gap-8">
          {Array.from({ length: PAGE_LIMIT }).map((_, idx) => (
            <div className="col-span-1" key={idx}>
              <MatchLoadingSkeleton />
            </div>
          ))}
        </div>
      </TherapistMatchLayout>
    );
  }

  if (!children?.results?.length) {
    return (
      <TherapistMatchLayout
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      >
        <div className="text-gray-500 col-span-2">No children found.</div>
      </TherapistMatchLayout>
    );
  }

  return (
    <TherapistMatchLayout
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {children.results.map((child) => {
          const filteredTherapists = getFilteredTherapists(child);

          return (
            <section
              key={child.id}
              className="bg-white rounded-xl shadow-md p-4 sm:p-6 flex flex-col gap-6 border border-purple-100 hover:shadow-2xl transition md:grid md:grid-cols-2"
            >
              <ChildInfo child={child} />

              <section>
                <p className="text-base sm:text-lg font-semibold text-purple-900 mb-2 border-b-2 border-purple-200 pb-2">
                  Therapists
                </p>
                <article className="flex-1 flex flex-col gap-4 max-h-80 sm:max-h-96 overflow-auto">
                  {filteredTherapists && filteredTherapists.length > 0 ? (
                    filteredTherapists.map((therapist) => (
                      <TherapistSuggestion
                        key={therapist.id}
                        therapist={therapist}
                        childId={child.id}
                        isSuggesting={
                          suggestingId?.childId === child.id &&
                          suggestingId?.therapistId === therapist.id
                        }
                        onSuggest={(therapistId, therapistName) =>
                          handleSuggest(child.id, therapistId, therapistName)
                        }
                      />
                    ))
                  ) : child.therapist_matches?.some(
                      (match) => match.status === "pending"
                    ) ? (
                    <div className="bg-white border border-yellow-300 rounded-xl p-4 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <InfoIcon />
                        <span className="text-yellow-800 font-semibold">
                          Pending Matches:
                        </span>
                      </div>
                      <p className="text-md text-gray-700">
                        {child.therapist_matches
                          .filter((match) => match.status === "pending")
                          .map((match) => match.therapist?.name)
                          .filter(Boolean)
                          .join(", ")}
                      </p>
                    </div>
                  ) : child.therapist_matches?.some(
                      (match) => match.status === "accepted"
                    ) ? (
                    <div className="bg-white border border-green-300 rounded-xl p-4 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <SuccessIcon />
                        <span className="text-green-800 font-semibold">
                          Accepted Matches:
                        </span>
                      </div>
                      <div className="text-sm text-gray-700">
                        {child.therapist_matches
                          .filter((match) => match.status === "accepted")
                          .map((match) => match.therapist?.name)
                          .filter(Boolean)
                          .join(", ")}
                      </div>
                    </div>
                  ) : child.therapist_matches?.some(
                      (match) => match.status === "declined"
                    ) ? (
                    <div className="bg-white border border-red-300 rounded-xl p-4 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-red-800 hover:text-red-700 transition-colors">
                          <DeleteIcon />
                        </button>
                        <span className="text-red-800 font-semibold">
                          Declined Matches:
                        </span>
                      </div>
                      <div className="text-sm text-gray-700">
                        {child.therapist_matches
                          .filter((match) => match.status === "declined")
                          .map((match) =>
                            match.therapist?.name && match.decline_reason
                              ? `${match.therapist.name} (Reason: ${match.decline_reason})`
                              : match.therapist?.name || null
                          )
                          .filter(Boolean)
                          .join(", ")}
                      </div>
                    </div>
                  ) : (
                    <div className="text-gray-500">No therapist matches</div>
                  )}
                </article>
              </section>
            </section>
          );
        })}
      </div>

      {children && children.total > PAGE_LIMIT && (
        <div className="mt-6">
          <Pagination
            page={page}
            total={children.total}
            limit={PAGE_LIMIT}
            onPageChange={setPage}
          />
        </div>
      )}
    </TherapistMatchLayout>
  );
};

export default TherapistMatch;
