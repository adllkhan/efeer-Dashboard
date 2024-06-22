import { Header } from "@/components/Header";
import { Events } from "@/components/Events";
import { Sidebar } from "@/components/Sidebar";

export default function Dashboard(searchParams) {
  return (
    <div className="w-full h-full">
      <Sidebar page="dashboard" />
      <div className="sm:ml-20">
        <Header header="Events Dashboard"/>
        <Events page={searchParams.searchParams.page}/>
      </div>
    </div>
  );
}
