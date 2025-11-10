import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = () => (
  <div className="p-4 border-t border-gray-200 flex items-center justify-between">
    <div className="text-sm text-gray-600">Showing 10-19 of 1,234 transactions</div>
    <div className="flex items-center gap-2">
      <button className="px-3 py-2 rounded hover:bg-gray-50 flex items-center gap-1">
        <ChevronLeft size={16} />
        <span>Previous</span>
      </button>
      <button className="px-4 py-2 border border-gray-300 rounded">1</button>
      <button className="px-4 py-2 rounded hover:bg-gray-50">2</button>
      <button className="px-4 py-2 rounded hover:bg-gray-50">3</button>
      <span className="px-4 py-2">...</span>
      <button className="px-3 py-2 rounded hover:bg-gray-50 flex items-center gap-1">
        <span>Next</span>
        <ChevronRight size={16} />
      </button>
    </div>
  </div>
);

export default Pagination;