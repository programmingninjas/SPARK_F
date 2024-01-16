import { AreaChart, Area, Tooltip, ResponsiveContainer } from "recharts";

type AreaMetricPropsType = {
  data:{[key: string]: number}[],
  label:string,
  sublabel?:string,
}
export default function AreaMetric(props:AreaMetricPropsType) {
  return (
    <>
      <div className="flex flex-col h-full w-full">
        <h3 className="font-bold">{props.label}</h3>
        <span>{props.sublabel}</span>
        <div className="grow">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={props.data}>
              <defs>
                <linearGradient id="colorview" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="30%" stopColor="#8884d8" stopOpacity={0.4} />
                  <stop offset="75%" stopColor="#ff9bff81" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0.2} />
                </linearGradient>
              </defs>
              <Tooltip />
              {
                Object.keys(props.data[0]).map(key=>{
                  return <Area
                  type="monotone"
                  key={key}
                  dataKey={key}
                  stroke="#8884d8"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorview)"
                />
                })
              }
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}