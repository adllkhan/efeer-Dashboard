import Link from "next/link";
import { useCallback, useState } from "react";
import { getEvents, sendEvent } from "@/api/requests";

export async function Events() {
  const { isSending, setIsSending } = useState(false);
  let events = Array((await getEvents()).data);
  console.log(events);

  const send = async (eventId, agentId) => {
    setIsSending(true);
    await sendEvent(eventId, agentId);
    setIsSending(false);
  };

  return (
    <div>
      {events ? (
        <table class="mt-10 w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-b-neutral-700 text-xs text-neutral-600 dark:text-neutral-400">
              <th className="font-normal">Severity</th>
              <th className="font-normal">Agent ID</th>
              <th className="font-normal border-b-neutral-500">Agent name</th>
              <th className="font-normal text-left">Description</th>
              <th className="font-normal">Timestamp</th>
            </tr>
          </thead>
          <tbody className="bg-neutral-200 dark:bg-neutral-950/50">
            {events.map((event, index) => (
              <tr
                key={index}
                className="h-12 text-center border-b border-neutral-700"
              >
                <td
                  className={
                    event.rule.level > 10
                      ? "text-red-500"
                      : event.rule.level > 5
                      ? "text-yellow-600 dark:text-yellow-500"
                      : "text-green-500"
                  }
                >
                  {event.rule.level}
                </td>
                <td>
                  <Link href={`/agents/${event.agent.id}`}>
                    {event.agent.id}
                  </Link>
                </td>
                <td>
                  <Link href={`/agents/${event.agent.id}`}>
                    {event.agent.name}
                  </Link>
                </td>
                <td className="text-left">{event.rule.description}</td>
                <td>{event.timestamp}</td>
                <td className="flex h-12 items-center justify-center gap-2">
                  {isSending === true ? "sending" : true}
                  <button
                    type="button"
                    onClick={send(event.id, event.agent.id)}
                    className="h-6 w-14 bg-sky-800 rounded-md text-center text-white text-xs flex items-center justify-center gap-1 hover:bg-sky-700 transition-colors duration-100"
                  >
                    <svg
                      className="w-4 h-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-telegram"
                      viewBox="0 0 16 16"
                    >
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.287 5.906q-1.168.486-4.666 2.01-.567.225-.595.442c-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294q.39.01.868-.32 3.269-2.206 3.374-2.23c.05-.012.12-.026.166.016s.042.12.037.141c-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8 8 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629q.14.092.27.187c.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.4 1.4 0 0 0-.013-.315.34.34 0 0 0-.114-.217.53.53 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09" />
                    </svg>
                    Send
                  </button>
                  <button type="button">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1}
                      stroke="currentColor"
                      className="w-4 h-4 text-neutral-800 dark:text-neutral-400"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
                      />
                    </svg>
                  </button>
                  <button type="button">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1}
                      stroke="currentColor"
                      className="w-4 h-4 text-neutral-800 dark:text-neutral-400"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                      />
                    </svg>
                  </button>
                </td>
                <td className="align-baseline">
                  <button type="button">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1}
                      stroke="currentColor"
                      className="w-4 h-4 text-neutral-800 dark:text-neutral-400"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 19.5 8.25 12l7.5-7.5"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        "loading........."
      )}
    </div>
  );
}
