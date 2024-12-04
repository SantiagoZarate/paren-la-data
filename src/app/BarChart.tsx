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
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { InfoIcon } from "lucide-react";
import { useState } from "react";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

type InvitadoTeam = {
  equipo: string;
  invitados: string[];
  cantidad: number;
};

interface Props {
  chartData: InvitadoTeam[];
}

export function BarChart({ chartData }: Props) {
  const modalState = useDisclosure();
  const [team, setTeam] = useState<InvitadoTeam | null>(null);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Cantidad de invitados por equipo | Top 10</CardTitle>
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
              <XAxis type="number" dataKey="cantidad" hide />
              <YAxis
                dataKey="equipo"
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
                onClick={(data) => {
                  modalState.onOpen();
                  setTeam({
                    // @ts-ignore
                    cantidad: data.cantidad,
                    // @ts-ignore
                    equipo: data.equipo,
                    // @ts-ignore
                    invitados: data.invitados,
                  });
                }}
                className="cursor-pointer"
                dataKey="cantidad"
                layout="vertical"
                fill="var(--color-desktop)"
                radius={4}
              >
                <LabelList
                  dataKey="cantidad"
                  position="right"
                  offset={8}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Bar>
            </RechartBarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="leading-none text-muted-foreground flex items-center gap-2">
            <InfoIcon className="w-4" />
            Hacer click en la barra de cada equipo para abrir el listado de
            invitados
          </div>
        </CardFooter>
      </Card>
      <Modal {...modalState}>
        <ModalContent>
          <>
            <ModalHeader>Hinchas de {team?.equipo}</ModalHeader>
            <ModalBody>
              <ul className="flex flex-col divide-y">
                {team?.invitados.map((invitado) => (
                  <li className="text-sm py-2" key={invitado}>
                    {invitado}
                  </li>
                ))}
              </ul>
            </ModalBody>
          </>
        </ModalContent>
      </Modal>
    </>
  );
}
