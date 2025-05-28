import React from "react";

const RecentInvoices = ({
  searchTerm,
  setSearchTerm,
  showDateFilter,
  setShowDateFilter,
  tempFromDate,
  setTempFromDate,
  tempToDate,
  setTempToDate,
  setFromDate,
  setToDate,
  invoices,
  filteredInvoices,
  setFilteredInvoices,
  applyDateFilter,
  handleExport,
}) => {
  return (
    <div className="bg-white rounded-[12px] shadow flex flex-col w-full max-w-[504px] h-fit mb-[24px] mt-0">
      <div className="flex items-center justify-between px-3 pt-[14px] pb-2">
        <h3 className="text-[24px] font-semibold ml-[12px]">Recent Invoices</h3>
        <div className="relative">
          <input
            type="text"
            placeholder="Search Email..."
            className="w-[180px] h-[40px] pl-10 pr-3 rounded-[8px] border border-[#EDE9E9] text-[14px] font-normal placeholder:text-[#9CA3AF]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-y-auto max-h-[745px]">
        {showDateFilter && (
          <div className="flex gap-2 px-3 pb-2">
            <input
              type="date"
              value={tempFromDate}
              onChange={(e) => setTempFromDate(e.target.value)}
              className="border rounded px-2 py-1 text-sm"
            />
            <input
              type="date"
              value={tempToDate}
              onChange={(e) => setTempToDate(e.target.value)}
              className="border rounded px-2 py-1 text-sm"
            />
          </div>
        )}

        <table className="w-full text-left text-[12px] font-normal">
          <thead>
            <tr className="bg-[#E5FDFF99] h-[43px] text-[#9CA3AF]">
              <th className="px-3">Code</th>
              <th>Customer</th>
              <th>Email</th>
              <th>₹Amt</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredInvoices.map((invoice) => (
              <tr
                key={invoice.id}
                className="h-[43px] text-[#111827] hover:bg-black/20 transition"
              >
                <td className="px-3">{invoice.code}</td>
                <td>{invoice.customer}</td>
                <td>{invoice.email}</td>
                <td>{invoice.amount}</td>
                <td>{invoice.date.toDate().toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="w-full h-[82px] bg-white rounded-b-[12px] flex justify-center items-center gap-[40px]">
        {showDateFilter ? (
          <>
            <button
              onClick={applyDateFilter}
              className="w-[120px] h-[40px] border border-[#E5E7EB] rounded-[8px] text-[#111827] text-[14px] font-normal"
            >
              Apply Filter
            </button>
            <button
              onClick={() => {
                setTempFromDate("");
                setTempToDate("");
                setFromDate("");
                setToDate("");
                setFilteredInvoices(invoices); // reset
                setShowDateFilter(false);
              }}
              className="w-[120px] h-[40px] border border-[#E5E7EB] rounded-[8px] text-[#111827] text-[14px] font-normal"
            >
              Clear
            </button>
          </>
        ) : (
          <button
            onClick={() => setShowDateFilter(true)}
            className="w-[120px] h-[40px] border border-[#E5E7EB] rounded-[8px] text-[#111827] text-[14px] font-normal"
          >
            Filter
          </button>
        )}
        <button
          onClick={handleExport}
          className="w-[120px] h-[40px] border border-[#E5E7EB] rounded-[8px] text-[#111827] text-[14px] font-normal"
        >
          Export
        </button>
      </div>
    </div>
  );
};

export default RecentInvoices;
