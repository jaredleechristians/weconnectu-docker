"use client";
import { getWeConnectMessages } from "@/services/api";
import { Message, columns } from "./columns";
import { DataTable } from "./data-table";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Entries() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  const getData = async () => {
    try {
      const result = await getWeConnectMessages(page, pageSize);
      //console.log(result);
      setData(result.data);
      setTotalPages(result.pagination.total_pages);
      setPage(result.pagination.current_page);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [page, pageSize]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-end space-x-2 py-4">
        <Link href="/">
          <Button>New Message</Button>
        </Link>
      </div>
      <DataTable
        columns={columns}
        data={data}
        pageSize={pageSize}
        currentPage={page}
        pageCount={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
