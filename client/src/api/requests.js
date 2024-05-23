import axios from "axios";

export async function getEvents(page, limit) {
  const params = { page: page, limit: limit };
  const response = await axios
    .get("http://localhost:5000/api/events", { params: params })
    .catch((error) => {
      console.error(error);
    });
  return response;
}

export async function sendEvent(eventId, agentId) {
  const payload = {
    event_id: eventId,
    agent_id: agentId,
  };

  const response = await axios
    .post("http://localhost:5000/api/events/send", payload)
    .catch((error) => {
      console.error(error);
    });
  return response;
}

export async function getAgents() {
  const response = await axios
    .get("http://localhost:5000/api/agents")
    .catch((error) => {
      console.error(error);
    });
  return response;
}
