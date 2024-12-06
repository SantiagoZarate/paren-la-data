"use client";

import { Chip } from "@/components/ui/chip";
import { convertToSlug } from "@/lib/convertToSlug";
import { getCurrentAge } from "@/lib/getCurrentAge";
import { getTimeDifference } from "@/lib/getTimeDifference";
import { PeopleTeamsOccuparionsDTO } from "@/shared/dto/people.dto";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { ChevronDownIcon, SearchIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import { columns } from "./data";

type Guest = Omit<PeopleTeamsOccuparionsDTO, "appearances"> & {
  appearance: {
    date: string;
    year: string;
  };
};

interface Props {
  guests: Guest[];
}

export default function PeopleTable({ guests }: Props) {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [selectedTeam, setSelectedTeam] = React.useState("all");
  const [selectedOccupation, setSelectedOccupation] = React.useState("all");

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

  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "age",
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

    return filteredUsers;
  }, [guests, hasSearchFilter, selectedTeam, filterValue, selectedOccupation]);

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
          return <p>{String(age) === "NaN" ? "?" : age}</p>;
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
            <div className="flex gap-1 list-none md:m-0 flex-col">
              <p className="text-sm">{user.appearance.date}</p>
              <p className="hidden sm:block text-xs text-muted-foreground">
                {getTimeDifference(user.appearance.date)}
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
            placeholder="Search by name..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Equipo
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection={true}
                aria-label="Table Columns"
                closeOnSelect={false}
                classNames={{
                  base: "overflow-y-auto",
                  list: "overflow-y-auto max-h-[400px]",
                }}
                selectionMode="single"
                onSelectionChange={(value) => {
                  console.log({ value });
                  if (value.currentKey) {
                    setSelectedTeam(value.currentKey);
                  }
                }}
              >
                <>
                  <DropdownItem value={"all"}>-</DropdownItem>
                  {teams.map((team) => (
                    <DropdownItem key={team} className="capitalize">
                      {team}
                    </DropdownItem>
                  ))}
                </>
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Profesión
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection={true}
                aria-label="Table Columns"
                closeOnSelect={false}
                classNames={{
                  base: "overflow-y-auto",
                  list: "overflow-y-auto max-h-[400px]",
                }}
                selectionMode="single"
                onSelectionChange={(value) => {
                  console.log({ value });
                  if (value.currentKey) {
                    setSelectedOccupation(value.currentKey);
                  }
                }}
              >
                <>
                  <DropdownItem value={"all"}>-</DropdownItem>
                  {occupations.map((occ) => (
                    <DropdownItem key={occ} className="capitalize">
                      {occ}
                    </DropdownItem>
                  ))}
                </>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <span className="text-default-400 text-small">
            Total {guests.length} users
          </span>
          {selectedTeam !== "all" && (
            <button onClick={() => setSelectedTeam("all")}>
              <Chip>{selectedTeam}</Chip>
            </button>
          )}
          {selectedOccupation !== "all" && (
            <button onClick={() => setSelectedOccupation("all")}>
              <Chip>{selectedOccupation}</Chip>
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
    guests.length,
    selectedTeam,
    selectedOccupation,
    onClear,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <div className="hidden sm:flex w-[30%] justify-end gap-2"></div>
      </div>
    );
  }, []);

  return (
    <Table
      aria-label="Example table with custom cells, pagination and sorting"
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      selectedKeys={selectedKeys}
      isHeaderSticky
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
      classNames={{
        // table: "m-0",
        // thead: "border-none",
        // wrapper: "p-0 shadow-none bg-transparent",
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
      <TableBody emptyContent={"No users found"} items={sortedItems}>
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
