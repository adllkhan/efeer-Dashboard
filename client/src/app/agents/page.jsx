import { Sidebar } from "@/components/Sidebar";
import { Agents } from "@/components/Agents";
import { Header } from "@/components/Header";


export default function AgentsPage(searchParams) {
  return (
    <div className="w-full h-full">
      <Sidebar page="agents" />
      <div className="sm:ml-20">
        <Header header="Agents" />
        <Agents page={searchParams.searchParams.page}/>
      </div>
    </div>
  );
}
