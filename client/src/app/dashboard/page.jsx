import { Header } from "@/components/Header";
import { Events } from "@/components/Events"
import { Sidebar } from "@/components/Sidebar";

export default function Dashboard() {
  return (
    <div className="h-full w-full">
      <Sidebar page="dashboard" />
      <div className="sm:ml-20">
        <Header />
        <Events />
      </div>
    </div>
  );
}
