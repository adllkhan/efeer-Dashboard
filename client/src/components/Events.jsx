import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getEvents, sendEvent } from "@/api/requests";
import { NotFound } from "./NotFound";
import SendTelegramButton from "./SendTelegramButton";
import CopyClipboardButton from "./CopyClipboardButton";
import Paginate from "./Pagination";

export async function Events(props) {
  const response = await getEvents((props.page === NaN ? ("0") : props.page), 10);

  const handleSend = async (formdata) => {
    "use server";

    const eventId = formdata.get("eventId");
    const agentId = formdata.get("agentId");
    await sendEvent(eventId, agentId);
  };

  const formatTime = (date) => {
    return Date(date).toString();
  };

  return !response ? (
    <NotFound message="Cannot connect to efeer API." />
  ) : response.status > 200 ? (
    <NotFound message={response.data.details} />
  ) : (
    <div>
      <Accordion
        type="single"
        collapsible
        className="w-full mt-3 pointer-events-auto"
      >
        {response.data.events.map((event, index) => (
          <AccordionItem
            value={"item-" + index}
            className="mx-2 mb-2 border-0 shadow group dark:border-b border-neutral-800 rounded-xl hover:bg-white dark:hover:bg-neutral-800"
          >
            <AccordionTrigger className="mx-6 pointer-events-auto hover:no-underline ">
              <div className="flex justify-between w-full">
                <div className="flex">
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
                  <p className="text-black dark:text-white ml-10 w-80 truncate text-left group-hover:underline group-hover:-translate-y-0.5 underline-offset-4 decoration-blue-600 dark:decoration-yellow-500">
                    {event.rule.description}
                  </p>
                  <p className="w-20 ml-10 text-left text-black truncate dark:text-white">
                    {event.agent.name}
                  </p>
                </div>

                <p className="mr-10 text-left text-black truncate dark:text-white w-72">
                  {formatTime(event.timestamp)}
                </p>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-xs">
              <div className="flex mx-20">
                <div className="flex items-start p-4 bg-white rounded-lg shadow dark:bg-neutral-800 dark:group-hover:bg-neutral-900 group-hover:bg-gray-50">
                  <div className="flex flex-col text-wrap w-96">
                    {Object.keys(event).map((key) =>
                      typeof event[key] === "object" && event[key] !== null ? (
                        <div>
                          <p className="inline-block text-blue-600 dark:text-yellow-500">
                            {key}
                          </p>
                          <div className="pl-1 ml-3 border-l border-l-neutral-700">
                            {Object.keys(event[key]).map((j) => (
                              <p className="text-black dark:text-white">
                                {`${j}: ` + event[key][j]}
                              </p>
                            ))}
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
                  <CopyClipboardButton data={event} />
                </div>
                <table className="ml-10 h-max border-spacing-4">
                  <tr>
                    <td className="p-2 text-left">
                      <div className="text-black dark:text-white">
                        Send event to
                        <p className="inline-block text-blue-600 dark:text-yellow-500">
                          &nbsp;{event.agent.name}&nbsp;
                        </p>
                        via Telegram?
                      </div>
                    </td>
                    <td className="p-2 text-center">
                      <form action={handleSend}>
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
                      </form>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2">
                      <p className="text-black dark:text-white">
                        Or download PDF report
                      </p>
                    </td>
                    <td className="p-2">
                      <button
                        type="button"
                        className="w-20 text-black dark:text-white bg-gray-200 dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:focus:bg-neutral-900 dark:disabled:bg-neutral-900 rounded-lg p-1.5 flex justify-center items-center hover:bg-gray-100 focus:bg-gray-300 disabled:bg-gray-300 transition-all duration-100"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.3}
                          stroke="currentColor"
                          className="w-4 h-4 dark:text-white"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                </table>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <Paginate totalPages={String(response.data.info.pages)} />
    </div>
  );
}
