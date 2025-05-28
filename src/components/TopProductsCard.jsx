import React from "react";

const TopProductsCard = ({ topProducts }) => {
  return (
    <div className="bg-white p-6 rounded-[12px] shadow flex flex-col w-[504px] h-fit mb-[24px] mt-0">
      <h3 className="text-lg font-bold mb-4">Top Products</h3>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left border-b">
            <th>Code</th>
            <th>Product</th>
            <th>Popularity</th>
            <th>Sales</th>
          </tr>
        </thead>
        <tbody>
          {topProducts.map(({ code, name, sales }, i) => (
            <tr key={i} className="border-b">
              <td className="pt-[16px] pb-[9px] px-0">{code}</td>
              <td className="pt-[16px] pb-[9px] px-0">{name}</td>
              <td className="pt-[16px] pb-[9px] px-0">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${sales}%` }}
                  ></div>
                </div>
              </td>
              <td className="pt-[16px] pb-[9px] px-0">{sales}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopProductsCard;
