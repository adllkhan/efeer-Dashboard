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
  const page = searchParams.get("page") ?? "1";
  const items = [];
  for (let i = 1; i < Number(props.totalPages) + 1; i++) {
    items.push(
      <PaginationItem>
        <PaginationLink
          href={String(i) === page ? "" : `${pathname}?page=${i}`}
          isActive={String(i) === page ? "true" : "false"}
          aria-disabled={String(i) === page ? "true" : "false"}
          tabIndex={String(i) === page ? -1 : undefined}
          className={
            String(i) === page ? "pointer-events-none opacity-50" : undefined
          }
        >
          {i}
        </PaginationLink>
      </PaginationItem>
    );
  }

  return (
    <div className="p-4">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={"1" === page ? "" : `${pathname}?page=${Number(page) - 1}`}
              aria-disabled={"1" === page ? "true" : "false"}
              tabIndex={"1" === page ? -1 : undefined}
              className={
                "1" === page ? "pointer-events-none opacity-50" : undefined
              }
            />
          </PaginationItem>
          {items}
          <PaginationItem>
            <PaginationNext
              href={
                props.totalPages >= page
                  ? ""
                  : `${pathname}?page=${Number(page) + 1}`
              }
              aria-disabled={props.totalPages >= page ? "true" : "false"}
              tabIndex={props.totalPages >= page ? -1 : undefined}
              className={
                props.totalPages >= page
                  ? "pointer-events-none opacity-50"
                  : undefined
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
