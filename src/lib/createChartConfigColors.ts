import { ChartData } from "@/app/TotalGuestsChart";
import { ChartConfig } from "@/components/ui/chart";

export function createChartConfigColors(data: ChartData[]): ChartConfig {
  const chartMap: { [key: string]: { label: string; color: string } } = {};

  for (let index = 0; index < data.length; index++) {
    chartMap[data[index].key] = {
      color: `hsl(var(--chart-${index + 1}))`,
      label: data[index].key,
    };
  }

  return { key: { label: "Visitors" }, ...chartMap };
}
