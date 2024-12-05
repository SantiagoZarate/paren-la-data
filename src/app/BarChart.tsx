/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import {
  Bar,
  CartesianGrid,
  LabelList,
  BarChart as RechartBarChart,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

type ChartData = {
  field: string;
  guestsCount: number;
};

interface Props {
  chartData: ChartData[];
  title: string;
  icon: JSX.Element;
}

export function BarChart({ chartData, title, icon }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex gap-2 items-center">
          {icon}
          {title}
        </CardTitle>
        <CardDescription>2022 - 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <RechartBarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 30,
            }}
            barSize={10}
          >
            <CartesianGrid horizontal={false} />
            <XAxis type="number" dataKey="guestsCount" hide />
            <YAxis
              dataKey="field"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="guestsCount"
              layout="vertical"
              fill="var(--color-desktop)"
              radius={4}
            >
              <LabelList
                dataKey="guestsCount"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </RechartBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
