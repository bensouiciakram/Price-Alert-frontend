"use client";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { PriceHistory } from "@/lib";
import { formatLabel } from "@/lib/utils";

interface Props {
  data: PriceHistory[] | undefined;
  currencySymbol?: string;
}

export default function PriceHistoryChart({ data, currencySymbol = "$" }: Props) {
  if (!data || data.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-base-content/40">No price history available yet.</p>
      </div>
    );
  }

  const displayedData = data.slice(-30);

  const prices = displayedData.map((d) => Number(d.price));
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const priceRange = maxPrice - minPrice;
  const yMin = minPrice - priceRange * 0.1;
  const yMax = maxPrice + priceRange * 0.1;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-serif text-xl text-base-content">Price History</h2>
        <span className="text-xs text-base-content/40 uppercase tracking-wider">
          Last {displayedData.length} records
        </span>
      </div>

      <div className="h-72 sm:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={displayedData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f0b429" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#f0b429" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis
              dataKey="checked_at"
              tickFormatter={formatLabel}
              tick={{ fill: "rgba(226, 232, 240, 0.4)", fontSize: 11 }}
              angle={-45}
              textAnchor="end"
              interval="preserveStartEnd"
              height={60}
              stroke="rgba(255,255,255,0.1)"
            />
            <YAxis
              domain={[yMin, yMax]}
              tick={{ fill: "rgba(226, 232, 240, 0.4)", fontSize: 11 }}
              stroke="rgba(255,255,255,0.1)"
              tickFormatter={(value) => `${currencySymbol}${value.toFixed(0)}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#12121a",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
                padding: "12px 16px",
                boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
              }}
              labelStyle={{ color: "rgba(226, 232, 240, 0.6)", fontSize: "12px", marginBottom: "4px" }}
              itemStyle={{ color: "#f0b429", fontSize: "14px", fontWeight: 600 }}
              formatter={(value) => [`${currencySymbol}${Number(value).toFixed(2)}`, "Price"]}
              labelFormatter={(value) => `Checked: ${value}`}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#f0b429"
              strokeWidth={2.5}
              fill="url(#priceGradient)"
              dot={{ fill: "#f0b429", strokeWidth: 0, r: 3 }}
              activeDot={{ r: 6, fill: "#f0b429", stroke: "#12121a", strokeWidth: 2 }}
              animationDuration={1500}
              animationEasing="ease-in-out"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
