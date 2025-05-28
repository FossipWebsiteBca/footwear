import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
} from "recharts";

const TotalRevenueCard = ({ range, setRange, totalRevenue, revenueData }) => {
  return (
    <div className="bg-white p-6 rounded-[12px] shadow w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">Total Revenue</h3>
        <select
          className="border rounded p-1 text-sm"
          value={range}
          onChange={(e) => setRange(e.target.value)}
        >
          <option value="30">Last 30 Days</option>
          <option value="7">Last 7 Days</option>
        </select>
      </div>

      <p className="text-xl font-semibold mb-2">
        ₹{totalRevenue.toLocaleString()}
      </p>

      {revenueData.length > 0 ? (
        <ResponsiveContainer width="100%" height={100}>
          <BarChart data={revenueData}>
            <XAxis dataKey="name" />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return payload[0].value > 0 ? (
                    <div className="bg-white p-2 shadow rounded text-sm">
                      ₹{payload[0].value}
                    </div>
                  ) : null;
                }
                return null;
              }}
              cursor={false}
            />
            <Bar
              dataKey="revenue"
              fill="#3b82f6"
              radius={[10, 10, 0, 0]}
              isAnimationActive={true}
              animationDuration={1000}
            />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div className="text-sm text-gray-500 text-center py-8">
          No revenue data available for the selected range.
        </div>
      )}
    </div>
  );
};

export default TotalRevenueCard;
