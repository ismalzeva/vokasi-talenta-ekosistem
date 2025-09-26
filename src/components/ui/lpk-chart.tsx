import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RealizationOfIndependentTraining } from "@/pages/types";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Area,
  AreaChart,
} from "recharts";

interface LpkChartProps {
  data: RealizationOfIndependentTraining[];
  title: string;
  type?: "line" | "bar" | "area";
}

export function LpkChart({ data, title, type = "line" }: LpkChartProps) {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium">{`Tahun ${label}`}</p>
          <p className="text-primary">
            {`Jumlah Peserta: ${payload[0].value.toLocaleString("id-ID")}`}
          </p>
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    const commonProps = {
      data,
      margin: { top: 5, right: 30, left: 20, bottom: 5 },
    };

    switch (type) {
      case "bar":
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis
              dataKey="year"
              className="text-xs text-muted-foreground"
              tick={{ fontSize: 12 }}
            />
            <YAxis
              className="text-xs text-muted-foreground"
              tick={{ fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="count"
              className="fill-primary"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        );

      case "area":
        return (
          <AreaChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis
              dataKey="year"
              className="text-xs text-muted-foreground"
              tick={{ fontSize: 12 }}
            />
            <YAxis
              className="text-xs text-muted-foreground"
              tick={{ fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="count"
              className="fill-primary/20 stroke-primary"
              strokeWidth={2}
            />
          </AreaChart>
        );

      default:
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis
              dataKey="year"
              className="text-xs text-muted-foreground"
              tick={{ fontSize: 12 }}
            />
            <YAxis
              className="text-xs text-muted-foreground"
              tick={{ fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="count"
              className="stroke-primary"
              strokeWidth={3}
              dot={{ className: "fill-primary", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, className: "fill-primary" }}
            />
          </LineChart>
        );
    }
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            {renderChart()}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
