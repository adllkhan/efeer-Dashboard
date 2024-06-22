import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { getEvents, sendEvent } from "@/api/requests";
import { NotFound } from "./NotFound";
import SendTelegramButton from "./SendTelegramButton";
import CopyClipboardButton from "./CopyClipboardButton";
import Paginate from "./Pagination";

export async function Events(props) {
  const response = await getEvents(Number(props.page) || 1, 10);

  const handleSend = async (formdata) => {
    "use server";

    const eventId = formdata.get("eventId");
    const agentId = formdata.get("agentId");
    await sendEvent(eventId, agentId);
  };

  return !response ? (
    <NotFound className="mt-24" message="Cannot connect to efeer API." />
  ) : response.status > 200 ? (
    <NotFound className="mt-24" message={response.data.details} />
  ) : (
    <div className="flex flex-col gap-1 px-2 pt-3 mt-24">
      {response.data.events.map((event, index) => (
        <Sheet key={index}>
          <SheetTrigger asChild>
            <Button className="justify-between w-full p-6 text-sm font-normal bg-white border-0 rounded-lg shadow hover:bg-gray-100 dark:bg-neutral-900 dark:border-b dark:hover:bg-neutral-800 border-neutral-800 group">
              <p
                className={
                  event.rule.level > 10
                    ? "text-red-500"
                    : event.rule.level > 5
                    ? "text-yellow-600 dark:text-yellow-500"
                    : "text-green-500"
                }
              >
                {event.rule.level}
              </p>
              <p className="text-black dark:text-white w-96 truncate text-left group-hover:underline group-hover:-translate-y-0.5 underline-offset-4 decoration-blue-600 dark:decoration-yellow-500">
                {event.rule.description}
              </p>
              <p className="w-24 text-left text-black truncate dark:text-white">
                {event.agent.name}
              </p>

              <p className="text-black truncate w-60 dark:text-white">
                {new Date(event.timestamp).toUTCString()}
              </p>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="bottom"
            className="border-blue-500 dark:border-t-yellow-500 dark:bg-neutral-900"
          >
            <SheetHeader>
              <SheetTitle className="flex justify-between text-2xl font-thin">
                <div className="flex gap-2">
                  {event.rule.description}
                  <SheetClose asChild>
                    <CopyClipboardButton data={event} />
                  </SheetClose>
                </div>
              </SheetTitle>
            </SheetHeader>
            <div className="flex m-5 mt-6">
              <ScrollArea className="p-6 font-mono rounded-lg w-fit h-96 scroll-smooth bg-neutral-950">
                <div className="w-max">
                  <div className="flex flex-col text-wrap w-max">
                    {Object.keys(event).map((key) =>
                      typeof event[key] === "object" && event[key] !== null ? (
                        <div>
                          <p className="inline-block text-blue-600 dark:text-yellow-500">
                            {key}
                          </p>
                          <div className="pl-1 ml-3 border-l border-l-neutral-700">
                            {Object.keys(event[key]).map((j) =>
                              typeof event[key][j] === "object" &&
                              event[key] !== null ? (
                                <div>
                                  <p className="text-blue-600 dark:text-yellow-500">
                                    {`${j}:`}
                                  </p>
                                  {Object.keys(event[key][j]).map((k) => (
                                    <p className="pl-1 ml-3 text-black border-l border-l-neutral-700 dark:text-white">
                                      {event[key][j][k]}
                                    </p>
                                  ))}
                                </div>
                              ) : (
                                <p className="text-black dark:text-white">
                                  {`${j}: ` + event[key][j]}
                                </p>
                              )
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="text-black dark:text-white">
                          <p className="inline-block text-blue-600 dark:text-yellow-500">
                            {`${key}:`}&nbsp;&nbsp;
                          </p>
                          {event[key]}
                        </div>
                      )
                    )}
                  </div>
                </div>
              </ScrollArea>
              <div className="flex flex-col items-start justify-start gap-5 mt-1 ml-5">
                <SheetClose asChild>
                  <form action={handleSend} className="flex items-center gap-3">
                    <input
                      name="eventId"
                      className="hidden"
                      value={event._id}
                    />
                    <input
                      name="agentId"
                      className="hidden"
                      value={event.agent.id}
                    />
                    <SendTelegramButton />
                    <div className="text-sm font-normal">
                      to
                      <p className="inline-block ml-1 text-yellow-500">
                        {event.agent.name}
                      </p>
                    </div>
                  </form>
                </SheetClose>
                <SheetClose asChild>
                  <div className="flex items-center gap-3 ml-7">
                    <a href={`http://localhost:5000/api/report?event_id=${event._id}`} download className="font-normal text-left bg-transparent -ml-7 dark:text-white dark:bg-transparent dark:hover:bg-transparent dark:hover:underline underline-offset-2 dark:decoration-yellow-500">
                    Or download report
                    </a>
                  </div>
                </SheetClose>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      ))}
      {response.data.info.total > 10 ? (
        <Paginate totalPages={String(response.data.info.pages)} />
      ) : null}
    </div>
  );
}
