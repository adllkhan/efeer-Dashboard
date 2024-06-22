import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { getAgents } from "@/api/requests";
import { NotFound } from "./NotFound";
import Paginate from "./Pagination";
import TokenForm from "./TokenForm";

export async function Agents(props) {
  const response = await getAgents(Number(props.page) || 1, 10);
  console.log(response.data);

  return !response ? (
    <NotFound className="pt-3 mt-24" message="Cannot connect to efeer API." />
  ) : response.status > 200 ? (
    <NotFound className="mt-24" message={response.data.details} />
  ) : (
    <div className="flex flex-col gap-1 px-2 pt-3 mt-24">
      {response.data.agents.map((agent, index) => (
        <Sheet key={index} on>
          <SheetTrigger asChild>
            <Button className="justify-between w-full p-6 font-normal bg-white border-0 rounded-lg shadow text-md hover:bg-gray-100 dark:bg-neutral-900 dark:border-b dark:hover:bg-neutral-800 border-neutral-800 group">
              <div className="flex gap-24">
                <p className="text-black dark:text-white">{agent._id}</p>
                <p className="text-black dark:text-white ">{agent.name}</p>
              </div>
              <p className="text-gray-500 group-hover:text-black dark:text-neutral-500 dark:group-hover:text-white group-hover:underline decoration-blue-600 dark:decoration-yellow-500 group-hover:-translate-y-0.5 underline-offset-4">
                {agent.token ? "Connected" : "Click to connect"}
              </p>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="bottom"
            className="border-blue-500 dark:border-t-yellow-500 dark:bg-neutral-900"
          >
            <SheetHeader>
              <SheetTitle className="flex justify-between text-2xl font-thin">
                {agent.name}
              </SheetTitle>
            </SheetHeader>
            <TokenForm agent={agent} />
          </SheetContent>
        </Sheet>
      ))}
      {response.data.info.total > 10 ? (
        <Paginate totalPages={String(response.data.info.pages)} />
      ) : null}
    </div>
  );
}
