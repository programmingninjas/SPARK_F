import { AreaChart, Area, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  {
    view: 1000,
  },
  {
    view: 1200,
  },
  {
    view: 1500,
  },
  {
    view: 1780,
  },
  {
    view: 1990,
  },
  {
    view: 2190,
  },
  {
    view: 2490,
  },
  {
    view: 2200,
  },
  {
    view: 2300,
  },
  {
    view: 2500,
  },
  {
    view: 2380,
  },
  {
    view: 2290,
  },
  {
    view: 2190,
  },
  {
    view: 1990,
  },
  {
    view: 2200,
  },
  {
    view: 2400,
  },
  {
    view: 2200,
  },
  {
    view: 2580,
  },
  {
    view: 2790,
  },
  {
    view: 3090,
  },
  {
    view: 3290,
  },
  {
    view: 3300,
  },
  {
    view: 3400,
  },
  {
    view: 3500,
  },
  {
    view: 3780,
  },
  {
    view: 3390,
  },
  {
    view: 3190,
  },
  {
    view: 2490,
  },
];

export default function AreaMetric() {
  return (
    <>
      <div className="flex flex-col h-full w-full">
        <h3 className="font-bold">Some Metric</h3>
        <span>September 2021 - October 2021</span>
        <div className="grow">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorview" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="30%" stopColor="#8884d8" stopOpacity={0.4} />
                  <stop offset="75%" stopColor="#ff9bff81" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0.2} />
                </linearGradient>
              </defs>
              <Tooltip />
              <Area
                type="monotone"
                dataKey="view"
                stroke="#8884d8"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorview)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}