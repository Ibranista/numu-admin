import React from "react";

interface PaginationProps {
  page: number;
  total: number;
  limit: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ page, total, limit, onPageChange }) => {
  const totalPages = Math.ceil(total / limit);
  return (
    <div className="flex items-center justify-center gap-4 mt-8">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className={`cursor-pointer px-4 py-2 rounded-lg font-medium transition ${
          page === 1
            ? "bg-gray-300 text-primary-gray cursor-not-allowed"
            : "bg-primary text-white hover:bg-primary-hover"
        }`}
      >
        Previous
      </button>
      <span className="text-sm text-gray-700">
        Page <span className="font-semibold text-purple-800">{page}</span> of {" "}
        <span className="font-semibold text-purple-800">{totalPages}</span>
      </span>
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        className={`cursor-pointer px-4 py-2 rounded-lg font-medium transition ${
          page >= totalPages
            ? "bg-gray-300 text-primary-gray cursor-not-allowed"
            : "bg-primary text-white hover:bg-primary-hover"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
