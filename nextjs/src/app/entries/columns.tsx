"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Message = {
  id: number;
  name: string;
  phoneNumber: string;
  email: string;
  message: string;
};

export const columns: ColumnDef<Message>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "message",
    header: "Message",
  },
];
