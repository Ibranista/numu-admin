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
      <div className="grid grid-cols-2 gap-8">
        {children.results.map((child) => {
          const filteredTherapists = getFilteredTherapists(child);

          return (
            <section
              key={child.id}
              className="bg-white rounded-xl shadow-lg p-6 flex flex-col md:grid md:grid-cols-2 gap-6 border border-purple-100 hover:shadow-2xl transition"
            >
              <ChildInfo child={child} />

              <section>
                <p className="text-lg font-semibold text-purple-900 mb-2 border-b-2 border-purple-200 pb-2">
                  Therapists
                </p>
                <article className="flex-1 flex flex-col gap-4 max-h-96 overflow-auto">
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
                    <div className="text-yellow-600 font-medium">Pending</div>
                  ) : child.therapist_matches?.some(
                      (match) => match.status === "accepted"
                    ) ? (
                    <div className="text-green-600 font-medium">Accepted</div>
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
        <Pagination
          page={page}
          total={children.total}
          limit={PAGE_LIMIT}
          onPageChange={setPage}
        />
      )}
    </TherapistMatchLayout>
  );
};

export default TherapistMatch;
