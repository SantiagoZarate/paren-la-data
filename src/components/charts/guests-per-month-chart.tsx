"use client";

import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts";

import { CalendarMiniIcon } from "@/components/icon/CalendarMiniIcon";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { MotionCard } from "../motion/motion-card";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

interface Props {
  data: {
    key: string;
    guestsCount: number;
  }[];
  title: string;
  description: string;
  shortLabel?: boolean;
  footer: string;
}

export function GuestsPerMonthChart({
  data,
  title,
  description,
  footer,
  shortLabel = true,
}: Props) {
  return (
    <MotionCard>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarMiniIcon /> {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="key"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => {
                if (!shortLabel) return value;
                return value.slice(0, 3);
              }}
            />
            <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
            <Line
              dataKey="guestsCount"
              type="monotone"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-desktop)",
              }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">{footer}</div>
      </CardFooter>
    </MotionCard>
  );
}
