"use client";

import * as React from "react";
import { Label, LabelList, Pie, PieChart } from "recharts";

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
import { createChartConfigColors } from "@/lib/createChartConfigColors";

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  1: {
    label: "Uruguay",
    color: "hsl(var(--chart-1))",
  },
  2: {
    label: "2",
    color: "hsl(var(--chart-2))",
  },
  3: {
    label: "3",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export type ChartData = {
  key: string;
  guestsCount: number;
};

interface Props {
  data: ChartData[];
  title: string;
}

export function GuestPieChart({ data, title }: Props) {
  const totalVisitors = React.useMemo(() => {
    return data.reduce((acc, curr) => acc + curr.guestsCount, 0);
  }, [data]);

  const chartData = data.map((d) => ({
    ...d,
    fill: `var(--color-${d.key})`,
  }));

  const colorsConfig = createChartConfigColors(data);

  console.log({ colorsConfig });

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription>2022 - 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={colorsConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
            <Pie
              data={chartData}
              dataKey="guestsCount"
              nameKey="key"
              innerRadius={60}
              strokeWidth={5}
              labelLine={false}
              label={({ payload, ...props }) => {
                return (
                  <text
                    cx={props.cx}
                    cy={props.cy}
                    x={props.x}
                    y={props.y}
                    textAnchor={props.textAnchor}
                    dominantBaseline={props.dominantBaseline}
                    fill="hsla(var(--foreground))"
                  >
                    {payload.guestsCount}
                  </text>
                );
              }}
            >
              <LabelList
                dataKey="key"
                className="fill-background"
                stroke="none"
                fontSize={12}
                formatter={(value: keyof typeof chartConfig) =>
                  chartConfig[value]?.label
                }
              />
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Invitados
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
