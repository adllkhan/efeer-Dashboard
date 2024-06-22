"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useSearchParams } from "next/navigation";
import { useParams } from "next/navigation";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";

export default function Paginate(props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || 1;
  return (
    <div className="p-4">
      <Pagination className="flex justify-end">
        <PaginationContent>
          <PaginationItem>
            <PaginationLink
              href={`${pathname}?page=1`}
              aria-disabled={1 == page ? "true" : "false"}
              tabIndex={1 == page ? -1 : undefined}
              className={
                1 == page ? "pointer-events-none opacity-50" : undefined
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
                />
              </svg>
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationPrevious
              href={1 == page ? "" : `${pathname}?page=${Number(page) - 1}`}
              aria-disabled={1 == page ? "true" : "false"}
              tabIndex={"1" === page ? -1 : undefined}
              className={
                1 == page ? "pointer-events-none opacity-50" : undefined
              }
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              href={
                props.totalPages <= page
                  ? ""
                  : `${pathname}?page=${Number(page) + 1}`
              }
              aria-disabled={props.totalPages >= page ? "true" : "false"}
              tabIndex={props.totalPages >= page ? -1 : undefined}
              className={
                props.totalPages <= page
                  ? "pointer-events-none opacity-50"
                  : undefined
              }
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              href={`${pathname}?page=${props.totalPages}`}
              aria-disabled={props.totalPages == Number(page) ? "true" : "false"}
              tabIndex={props.totalPages == Number(page) ? -1 : undefined}
              className={
                props.totalPages == Number(page) ? "pointer-events-none opacity-50" : undefined
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
                />
              </svg>
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
