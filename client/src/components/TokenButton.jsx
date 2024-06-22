"use client";

import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function TokenButton(props) {
  const router = useRouter();
  router.refresh()
  return (
    <Button
      type="submit"
      className="bg-black shadow-none dark:bg-gray-200 dark:hover:bg-white hover:bg-gray-800"
    >
      {props.text}
    </Button>
  );
}
