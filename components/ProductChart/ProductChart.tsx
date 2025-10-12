"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { PriceHistory } from "@/lib";

interface Props {
  data: PriceHistory[] | undefined;
}

export default function PriceHistoryChart({ data }: Props) {
  if (!data || data.length === 0) return null;

  const displayedData = data.slice(-30);

  const formatLabel = (value: string) => {
    const [date, time] = value.split(" ");
    return `${date}\n${time.slice(0, 5)}`;
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Price History
      </h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={displayedData}>
            <XAxis
              dataKey="checked_at"
              tickFormatter={formatLabel}
              tick={{ fontSize: 11 }}
              angle={-45}
              textAnchor="end"
              interval="preserveStartEnd"
              height={60}
            />
            <YAxis />
            <Tooltip
              labelFormatter={(value) => `Checked at: ${value}`}
              formatter={(value: number) => [`$${value}`, "Price"]}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#4f46e5"
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
