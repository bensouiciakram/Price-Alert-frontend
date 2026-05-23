import React from "react";
import { PriceHistory } from "@/lib";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

interface Props {
  data: PriceHistory[] | undefined;
  currencySymbol?: string;
}

const LastPricesRecords = ({ data, currencySymbol = "$" }: Props) => {
  if (!data || data.length === 0) {
    return (
      <div className="card bg-base-100 border border-white/5 rounded-2xl">
        <div className="card-body p-6">
          <h3 className="font-serif text-lg text-base-content mb-2">Recent Price Records</h3>
          <p className="text-base-content/40 text-sm">No recent records available.</p>
        </div>
      </div>
    );
  }

  const getChange = (current: string, previous: string | undefined) => {
    if (previous === undefined) return null;
    const curr = Number(current);
    const prev = Number(previous);
    const diff = curr - prev;
    const percent = ((diff / prev) * 100).toFixed(2);
    return { diff, percent, isUp: diff > 0 };
  };

  return (
    <div className="card bg-base-100 border border-white/5 rounded-2xl overflow-hidden">
      <div className="card-body p-6">
        <h3 className="font-serif text-lg text-base-content mb-4">Recent Price Records</h3>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-xs font-semibold text-base-content/40 uppercase tracking-wider py-3">
                  Date
                </th>
                <th className="text-xs font-semibold text-base-content/40 uppercase tracking-wider py-3 text-right">
                  Price
                </th>
                <th className="text-xs font-semibold text-base-content/40 uppercase tracking-wider py-3 text-right">
                  Change
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((record, index) => {
                const previousPrice =
                  index < data.length - 1 ? data[index + 1].price : undefined;
                const change = getChange(record.price, previousPrice);

                return (
                  <tr
                    key={index}
                    className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors duration-200"
                  >
                    <td className="py-3 text-sm text-base-content/70">
                      {record.checked_at}
                    </td>
                    <td className="py-3 text-sm font-mono-price text-base-content text-right">
                      {currencySymbol}{Number(record.price).toFixed(2)}
                    </td>
                    <td className="py-3 text-right">
                      {change ? (
                        <span
                          className={`inline-flex items-center gap-1 text-xs font-medium ${
                            change.isUp ? "text-error" : "text-success"
                          }`}
                        >
                          {change.isUp ? (
                            <FaArrowUp className="w-3 h-3" />
                          ) : (
                            <FaArrowDown className="w-3 h-3" />
                          )}
                          {Math.abs(Number(change.percent))}%
                        </span>
                      ) : (
                        <span className="text-xs text-base-content/30">-</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LastPricesRecords;
