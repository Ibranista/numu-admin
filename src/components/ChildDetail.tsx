import type { IChild } from "../features/children/types";
import type { ITherapist } from "../features/therapists/types";
import Sidebar from "../ui/Sidebar";
import HamburgerButton from "./Humberger";

export const ChildDetail = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
  <article className="text-gray-600 mb-1">
    <span className="font-medium">{label}:</span> {value}
  </article>
);

export const ChildList = ({
  label,
  items,
  emptyText = "No items",
}: {
  label: string;
  items: string[];
  emptyText?: string;
}) => (
  <article className="mt-2">
    <span className="font-medium text-green-700">{label}:</span>
    <ul className="list-disc ml-6 text-gray-700">
      {items.length > 0 ? (
        items.map((item) => <li key={item}>{item}</li>)
      ) : (
        <li className="text-gray-400">{emptyText}</li>
      )}
    </ul>
  </article>
);

export const ChildTextBlock = ({
  label,
  text,
}: {
  label: string;
  text?: string;
}) => (
  <article className="mt-2">
    <span className="font-medium text-green-700">{label}</span>
    <p className="text-gray-700">{text || "Not provided"}</p>
  </article>
);

export const TherapistSuggestion = ({
  therapist,
  isSuggesting,
  onSuggest,
}: {
  therapist: ITherapist;
  childId: number;
  isSuggesting: boolean;
  onSuggest: (therapistId: number, therapistName?: string) => void;
}) => (
  <div className="bg-blue-50 rounded-lg p-4 flex flex-col md:flex-row md:items-center gap-3 border border-blue-100 shadow-sm">
    <div className="flex-1 cursor-pointer">
      <div className="font-medium text-blue-800">{therapist.name}</div>
      <div className="text-sm text-gray-600">
        {therapist.expertise.map((exp) => exp.expertise).join(", ")}
      </div>
    </div>
    <button
      className={`cursor-pointer px-4 py-2 rounded-md text-white font-semibold bg-gradient-to-r from-purple-500 to-blue-500 hover:from-primary hover:to-blue-600 ${
        isSuggesting ? "opacity-60 cursor-not-allowed" : ""
      }`}
      disabled={isSuggesting}
      onClick={() => onSuggest(therapist.id, therapist.name)}
    >
      {isSuggesting ? "Suggesting..." : "Suggest"}
    </button>
  </div>
);

export const TherapistMatchLayout = ({
  children,
  sidebarOpen,
  setSidebarOpen,
}: {
  children: React.ReactNode;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}) => (
  <section className="flex h-screen bg-gray-100">
    <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
    <article className="flex-1 flex flex-col overflow-hidden">
      <header className="lg:hidden bg-purple-800/95 text-white p-4 flex items-center justify-between">
        <HamburgerButton onClick={() => setSidebarOpen(!sidebarOpen)} />
        <img src="/wecare.png" alt="WeCare Logo" className="h-8" />
      </header>
      <main className="flex-1 overflow-y-auto p-8">
        <h1 className="text-3xl font-bold mb-8 text-primary">
          Children & Therapist Matches
        </h1>
        {children}
      </main>
    </article>
  </section>
);

export const ChildInfo = ({ child }: { child: IChild }) => (
  <section className="flex-1">
    <h2 className="text-lg font-semibold text-purple-900 mb-2 border-b-2 border-purple-200 pb-2">
      {child.name}
    </h2>
    <ChildDetail label="Birthdate" value={child.birthDate} />
    <ChildDetail label="Gender" value={child.gender} />
    <ChildDetail
      label="Parent"
      value={`${child.parent.first_name} ${child.parent.last_name} (${child.parent.email})`}
    />
    <ChildDetail
      label="Emotional Distress"
      value={child.has_emotional_distress_signs ? "Yes" : "No"}
    />
    <ChildDetail
      label="Behavioral Issues"
      value={child.is_behavior_challenging ? "Yes" : "No"}
    />
    <ChildDetail
      label="Social Struggles"
      value={child.struggle_with_social ? "Yes" : "No"}
    />
    <ChildDetail
      label="Activeness"
      value={child.child_activeness ? "Yes" : "No"}
    />
    <ChildDetail
      label="Movement Issues"
      value={child.has_difficulty_movement ? "Yes" : "No"}
    />
    <ChildDetail
      label="Learning Issues"
      value={child.has_learning_problems ? "Yes" : "No"}
    />
    <ChildDetail
      label="Communication Issues"
      value={child.has_communication_problems ? "Yes" : "No"}
    />
    <ChildDetail
      label="Meal Issues"
      value={child.has_meal_problems ? "Yes" : "No"}
    />
    <ChildDetail
      label="Sleep Issues"
      value={child.has_difficulty_with_sleep ? "Yes" : "No"}
    />

    <ChildList label="Languages" items={child.languages} />
    <ChildTextBlock
      label="Additional Information"
      text={child.did_we_miss_anything}
    />
    <ChildList
      label="Concerns"
      items={
        child.concerns.length
          ? child.concerns.map((c) => c.title)
          : ["No concerns"]
      }
      emptyText="No concerns"
    />
  </section>
);
