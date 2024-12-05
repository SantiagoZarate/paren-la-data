"use client";

import { GroupMiniIcon } from "@/components/icon/GroupMiniIcon";
import { Chip } from "@/components/ui/chip";
import { convertToSlug } from "@/lib/convertToSlug";
import { getCurrentAge } from "@/lib/getCurrentAge";
import { PeopleTeamsOccuparionsDTO } from "@/shared/dto/people.dto";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { columns } from "./data";

interface Props {
  guests: PeopleTeamsOccuparionsDTO[];
}

export default function LatestGuestsTable({ guests }: Props) {
  const renderCell = React.useCallback(
    (
      user: PeopleTeamsOccuparionsDTO,
      columnKey: keyof PeopleTeamsOccuparionsDTO
    ) => {
      const cellValue = user[columnKey];

      switch (columnKey) {
        case "name":
          return <p>{cellValue}</p>;
        case "birthDate":
          const age = getCurrentAge(cellValue as string);
          return <p>{String(age) === "NaN" ? "?" : age}</p>;
        case "teams":
          return (
            <div className="flex gap-1 items-center md:m-0">
              {user.teams.map((team) => (
                <Chip key={team}>
                  {team !== "?" && (
                    <Image
                      alt="team logo"
                      src={`/images/${convertToSlug(team)}.png`}
                      width={8}
                      height={8}
                      className="w-4 m-0 xl:m-0"
                    />
                  )}
                  {team}
                </Chip>
              ))}
            </div>
          );
        case "occupations":
          return (
            <div className="flex gap-1 list-none items-center md:m-0">
              {user.occupations.map((occ) => (
                <Chip key={occ}>{occ}</Chip>
              ))}
            </div>
          );
        default:
          return cellValue;
      }
    },
    []
  );

  return (
    <Table
      aria-label="Example table with custom cells, pagination and sorting"
      bottomContentPlacement="outside"
      topContentPlacement="outside"
      topContent={
        <header className="flex gap-2 items-center">
          <GroupMiniIcon />
          <p>Ultimos 5 invitados</p>
        </header>
      }
      bottomContent={
        <Link href="/invitados" className="text-center">
          Ver lista con todos los invitados
        </Link>
      }
      classNames={{
        table: "m-0",
        thead: "border-none",
        wrapper: "p-0 shadow-none bg-transparent",
        td: "p-0 xl:p-0 m-0 *:m-2 px-2 !h-6",
      }}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid} allowsSorting={column.sortable}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No users found"} items={guests}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>
                {renderCell(item, columnKey as keyof PeopleTeamsOccuparionsDTO)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
