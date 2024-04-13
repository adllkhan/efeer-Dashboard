import { getAgents } from "@/api/requests";

export async function Header(props) {
  const agents = Object.keys((await getAgents()).data).length;
  return (
    <div className="w-full h-16 border-b border-neutral-300 dark:border-neutral-700 flex justify-between items-center">
      <div></div>
      <div className="mr-4">
        <div className="text-xs">
          Agents:           
          {agents ? (
            agents
          ) : (
            <div className="mr-4 bg-neutral-800 rounded w-2 h-2" />
          )}
        </div>
      </div>
    </div>
  );
}
