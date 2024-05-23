import { getAgents } from "@/api/requests";
import { NotFound } from "./NotFound";

export async function Header(props) {
  const response = await getAgents();
  console.log(response.data);

  return (
    <div className="flex items-center justify-between w-full shadow max-h-min drop-shadow dark:border-b border-b-neutral-800">
      <div></div>
      {!response ? (
        <div className="w-fit">
          <NotFound message="Cannot connect to efeer API." />
        </div>
      ) : response.status > 200 ? (
        <div className="w-60">
          <NotFound message={response.data.details} />
        </div>
      ) : (
        <div className="flex my-4 mr-6 text-black dark:text-white">
          <div className="flex flex-col items-center justify-center p-3 mr-2 rounded-lg bg-gray-50 dark:bg-neutral-800">
            <p className="text-xs">Agents</p>
            <p className="text-base dark:text-white/50 text-black/70">{response.data.agents.length} </p>
          </div>
          <div className="flex flex-col items-center justify-center p-3 text-black bg-blue-200 rounded-lg dark:text-white dark:bg-yellow-500/30">
            <p className="text-xs">Connected</p>
            <p className="text-base dark:text-white/70 text-black/70">{response.data.agents.length}</p>
          </div>
        </div>
      )}
    </div>
  );
}
