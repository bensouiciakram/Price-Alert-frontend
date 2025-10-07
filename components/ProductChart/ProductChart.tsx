"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { PriceHistory } from '@/lib';

const data = [
  { date: "Sep 25", price: 510 },
  { date: "Sep 26", price: 505 },
  { date: "Sep 27", price: 499 },
  { date: "Sep 28", price: 480 },
  { date: "Sep 29", price: 470 },
];

interface Props {
  data:PriceHistory[]|undefined;
}

export default function PriceHistoryChart({data}:Props) {
  return (
    <div className="bg-white shadow-md rounded-xl p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Price History
      </h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="checked_at" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#4f46e5"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
