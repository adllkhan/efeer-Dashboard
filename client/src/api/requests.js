import axios from "axios";
import { AxiosError } from "axios";

export async function getAgents() {
  let agents = await axios.get("http://127.0.0.1:5000/api/v1/agents");
  return agents;
}

export async function getEvents() {
  try {
    let events = await axios.get(
      "http://127.0.0.1:5000/api/v1/events/ "
    );
    return events;
  } catch (AxiosError) {
    return false;
  }
}

export async function sendEvent(event_id, agent_id) {
  let params = { params: { event_id: event_id, agent_id: agent_id } };
  let events = await axios.get(
    "http://127.0.0.1:5000/api/v1/events/send",
    params
  );
  return events;
}
