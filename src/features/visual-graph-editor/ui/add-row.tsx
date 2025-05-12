import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React from "react";
import { AddGraphVertex } from "../types";
import { Input } from "@/components/ui/input";
import { addVertexName } from "../hooks/use-adjacency-list";

export const AddRow = ({
  onAdd,
  disabled,
  length,
}: {
  disabled?: boolean;
  onAdd: AddGraphVertex;
  length: number;
}) => {
  const [name, setName] = React.useState<string>(() =>
    addVertexName(length)
  );

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name) {
      onAdd(name);
      setName(addVertexName(length + 1));
    }
  };

  return (
    <tr>
      <td className="w-full p-2 bg-muted " colSpan={100}>
        <form
          className="flex items-center justify-between gap-2"
          onSubmit={handleAdd}
        >
          <Input
            value={name.toUpperCase()}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter vertex name"
            maxLength={2}
            disabled={disabled}
          />

          <Button className="flex-1" disabled={disabled} type="submit">
            <Plus />
            Add
          </Button>
        </form>
      </td>
    </tr>
  );
};
