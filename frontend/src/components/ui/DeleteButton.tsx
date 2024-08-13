import { FC } from "react";
import { Button, ButtonProps } from "./button";
import { Cross1Icon } from "@radix-ui/react-icons";

const DeleteButton: FC<ButtonProps> = (props) => {
  return (
    <Button variant="ghost" className="flex h-8 w-8 p-0" {...props}>
      <Cross1Icon className="h-4 w-4" />
    </Button>
  );
};

export default DeleteButton;
