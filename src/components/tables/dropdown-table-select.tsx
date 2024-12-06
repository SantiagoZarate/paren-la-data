import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  SharedSelection,
} from "@nextui-org/react";
import { ChevronDownIcon } from "lucide-react";

interface Props {
  label: string;
  options: string[];
  onSelectionChange: (e: SharedSelection) => void;
}

export function DropdownTableSelect({ label, options, ...args }: Props) {
  return (
    <Dropdown>
      <DropdownTrigger className="flex">
        <Button
          endContent={<ChevronDownIcon className="text-small" />}
          variant="flat"
        >
          {label}
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
        {...args}
      >
        <>
          {options.map((option) => (
            <DropdownItem key={option} className="capitalize">
              {option}
            </DropdownItem>
          ))}
        </>
      </DropdownMenu>
    </Dropdown>
  );
}
