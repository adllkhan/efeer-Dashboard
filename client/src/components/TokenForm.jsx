import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { SheetClose } from "./ui/sheet";
import { createToken, deleteToken } from "@/api/requests";
import TokenButton from "./TokenButton";

export default function TokenForm(props) {
  const handleCreate = async (formdata) => {
    "use server";
    const agentID = formdata.get("agentID");
    await createToken(agentID);
  };

  const handleDelete = async (formdata) => {
    "use server";
    const token = formdata.get("token");
    const agentID = formdata.get("agentID");
    await deleteToken(token, agentID);
  };

  return (
    <div className="flex p-6">
      {props.agent.token ? (
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Token"
            className="w-max"
            readOnly={props.agent.token ? true : false}
            value={props.agent.token}
          />
          <form action={handleDelete}>
            <input name="agentID" className="hidden" value={props.agent._id} />
            <input name="token" className="hidden" value={props.agent.token} />
            <SheetClose>
              <TokenButton text="Delete" />
            </SheetClose>
          </form>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <p>Create Token?</p>
          <form action={handleCreate}>
            <input name="agentID" className="hidden" value={props.agent._id} />
            <SheetClose>
              <TokenButton text="Create" />
            </SheetClose>
          </form>
        </div>
      )}
    </div>
  );
}
