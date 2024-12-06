/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import { Chip } from "@/components/ui/chip";
import { convertToSlug } from "@/lib/convertToSlug";
import { getCurrentAge } from "@/lib/getCurrentAge";
import { getTimeDifference } from "@/lib/getTimeDifference";
import { PeopleTeamsOccuparionsDTO } from "@/shared/dto/people.dto";
import {
  Input,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { DeleteIcon, SearchIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import { columns } from "./data";
import { DropdownTableSelect } from "./dropdown-table-select";

type Guest = Omit<PeopleTeamsOccuparionsDTO, "appearances"> & {
  appearance: string;
};

interface Props {
  guests: Guest[];
}

export default function PeopleTable({ guests }: Props) {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [selectedTeam, setSelectedTeam] = React.useState("all");
  const [selectedOccupation, setSelectedOccupation] = React.useState("all");
  const [selectedYear, setSelectedYear] = React.useState("all");

  const teams = React.useMemo(() => {
    const uniqueTeams: string[] = [];
    guests.forEach((g) => {
      g.teams.forEach((t) => {
        if (!uniqueTeams.includes(t)) {
          uniqueTeams.push(t);
        }
      });
    });
    return uniqueTeams;
  }, [guests]);

  const occupations = React.useMemo(() => {
    const uniqueOccupations: string[] = [];
    guests.forEach((g) => {
      g.occupations.forEach((o) => {
        if (!uniqueOccupations.includes(o)) {
          uniqueOccupations.push(o);
        }
      });
    });
    return uniqueOccupations;
  }, [guests]);

  const [sortDescriptor, setSortDescriptor] = React.useState<{
    column: keyof Guest;
    direction: "ascending" | "descending";
  }>({
    column: "birthDate",
    direction: "ascending",
  });

  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...guests];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    // Filtrar por equipo
    if (selectedTeam !== "all") {
      filteredUsers = filteredUsers.filter((user) =>
        user.teams.includes(selectedTeam)
      );
    }

    // Filtrar por profesión
    if (selectedOccupation !== "all") {
      filteredUsers = filteredUsers.filter((user) =>
        user.occupations.includes(selectedOccupation)
      );
    }

    if (selectedYear !== "all") {
      filteredUsers = filteredUsers.filter(
        (user) => user.appearance.slice(0, 4) === selectedYear
      );
    }

    return filteredUsers;
  }, [
    guests,
    hasSearchFilter,
    selectedTeam,
    selectedOccupation,
    selectedYear,
    filterValue,
  ]);

  const sortedItems = React.useMemo(() => {
    return [...filteredItems].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [filteredItems, sortDescriptor.column, sortDescriptor.direction]);

  const renderCell = React.useCallback(
    (user: Guest, columnKey: keyof Guest) => {
      const cellValue = user[columnKey];

      switch (columnKey) {
        case "name":
          return <p>{cellValue as string}</p>;
        case "birthDate":
          const age = getCurrentAge(cellValue as string);
          return <span>{String(age) === "NaN" ? "?" : age}</span>;
        case "teams":
          return (
            <div className="flex gap-1 list-none items-center md:m-0">
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
        case "appearance":
          return (
            <div className="flex gap-1 list-none md:m-0 flex-col group">
              <p className="text-sm group-hover:-translate-y-0 translate-y-2 transition">
                {user.appearance}
              </p>
              <p className="hidden sm:block text-xs text-muted-foreground -translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition">
                {getTimeDifference(user.appearance)}
              </p>
            </div>
          );
        default:
          return cellValue;
      }
    },
    []
  );

  const onSearchChange = React.useCallback((value: string) => {
    if (value) {
      setFilterValue(value);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Buscar por nombre..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <DropdownTableSelect
              label="Equipo"
              options={teams}
              onSelectionChange={(e) => {
                if (e.currentKey) {
                  setSelectedTeam(e.currentKey);
                }
              }}
            />
            <DropdownTableSelect
              label="Edición"
              options={["2022", "2023", "2024"]}
              onSelectionChange={(e) => {
                if (e.currentKey) {
                  setSelectedYear(e.currentKey);
                }
              }}
            />
            <DropdownTableSelect
              label="Profesión"
              options={occupations}
              onSelectionChange={(e) => {
                if (e.currentKey) {
                  setSelectedOccupation(e.currentKey);
                }
              }}
            />
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <span className="text-default-400 text-small">
            Total {sortedItems.length} invitados
          </span>
          {selectedTeam !== "all" && (
            <button onClick={() => setSelectedTeam("all")}>
              <Chip>
                {selectedTeam}
                <DeleteIcon className="p-1" />
              </Chip>
            </button>
          )}
          {selectedOccupation !== "all" && (
            <button onClick={() => setSelectedOccupation("all")}>
              <Chip>
                {selectedOccupation}
                <DeleteIcon className="p-1" />
              </Chip>
            </button>
          )}
          {selectedYear !== "all" && (
            <button onClick={() => setSelectedYear("all")}>
              <Chip>
                {selectedYear}
                <DeleteIcon className="p-1" />
              </Chip>
            </button>
          )}
        </div>
      </div>
    );
  }, [
    filterValue,
    onSearchChange,
    teams,
    occupations,
    sortedItems.length,
    selectedTeam,
    selectedOccupation,
    selectedYear,
    onClear,
  ]);

  return (
    <Table
      aria-label="Example table with custom cells, pagination and sorting"
      selectedKeys={selectedKeys}
      isHeaderSticky
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      // @ts-ignore
      onSelectionChange={setSelectedKeys}
      // @ts-ignore
      onSortChange={setSortDescriptor}
      classNames={{
        td: "p-0 xl:p-0 m-0 *:m-2 px-2 !h-6",
        tr: "hover:bg-muted",
      }}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid} allowsSorting={column.sortable}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        emptyContent={"Ningún invitado cumple con los criterios de busqueda"}
        items={sortedItems}
      >
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              // @ts-ignore
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
