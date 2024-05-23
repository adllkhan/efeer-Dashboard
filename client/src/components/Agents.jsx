"use client"

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@radix-ui/react-accordion";
import { useEffect } from "react";
import { getAgents } from "@/api/requests";
import CopyClipboardButton from "./CopyClipboardButton";

export function Agents({ attributes, dispatch }) {
  useEffect(() => {
    getAgents().then(res => {
           dispatch(AttribAction.set(objectToArray(res.data)));
        });
}, [])
  console.log(attributes)

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full mt-3 pointer-events-auto"
    >
      {attributes.agents.map((agent, index) => (
        <AccordionItem
          value={"item-" + index}
          className="mx-2 mb-2 border-0 shadow dark:border-b border-neutral-800 rounded-xl group hover:bg-white dark:hover:bg-neutral-800"
        >
          <AccordionTrigger className="mx-6 pointer-events-auto hover:no-underline ">
            <div className="flex justify-between w-full">
              <div className="flex">
                <p>{agent.id}</p>
                <p className="text-black dark:text-white ml-10 w-80 truncate text-left group-hover:underline group-hover:-translate-y-0.5 underline-offset-4 decoration-blue-600 dark:decoration-yellow-500">
                  {agent.name}
                </p>
                <p className="w-20 ml-10 text-left text-black truncate dark:text-white">
                  {agent.ip}
                </p>
              </div>

              <p className="mr-10 text-left text-black truncate dark:text-white w-72">
                {agent.is_connected === true ? "Connected" : "Not connected"}
              </p>
            </div>
          </AccordionTrigger>
          <AccordionContent className="text-xs">
            <div className="flex mx-20">
              <div className="flex items-start p-4 bg-white rounded-lg shadow dark:bg-neutral-800 dark:group-hover:bg-neutral-900 group-hover:bg-gray-50">
                <div className="flex flex-col text-wrap w-96">
                  {Object.keys(agent).map((key) =>
                    typeof agent[key] === "object" && agent[key] !== null ? (
                      <div>
                        <p className="inline-block text-blue-600 dark:text-yellow-500">
                          {key}
                        </p>
                        <div className="pl-1 ml-3 border-l border-l-neutral-700">
                          {Object.keys(agent[key]).map((j) => (
                            <p className="text-black dark:text-white">
                              {`${j}: ` + agent[key][j]}
                            </p>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="text-black dark:text-white">
                        <p className="inline-block text-blue-600 dark:text-yellow-500">
                          {`${key}:`}&nbsp;&nbsp;
                        </p>
                        {agent[key]}
                      </div>
                    )
                  )}
                </div>
                <CopyClipboardButton data={agent} />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
