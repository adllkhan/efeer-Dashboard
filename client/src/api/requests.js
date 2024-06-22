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

export async function getAgents(page, limit) {
  const params = { page: page, limit: limit };
  const response = await axios
    .get("http://localhost:5000/api/agents", { params: params })
    .catch((error) => {
      console.error(error);
    });
  return response;
}

export async function createToken(agentID) {
  const response = await axios
    .post("http://localhost:5000/api/agents/token", { _id: agentID })
    .catch((error) => {
      console.error(error);
    });
  return response;
}

export async function deleteToken(token, agentID) {
  const response = await axios
    .delete("http://localhost:5000/api/agents/token", {
      data: { token: token, agent_id: agentID },
    })
    .catch((error) => {
      console.error(error);
    });
  console.log(response);
  return response;
}
