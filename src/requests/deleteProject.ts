import FormData from "form-data";
import axios from "axios";
import { readToken } from "../utils/file";
import { BACKEND_ENDPOINT } from "../variables";

export default async function deleteProject(
  classId: string,
) {
  const form = new FormData();

  const authToken = await readToken().catch(() => undefined);

  if (!authToken) {
    throw new Error(
      "You are not logged in. Run 'genezio login' before you deploy your function."
    );
  }

  const response: any = await axios({
    method: "DELETE",
    url: `${BACKEND_ENDPOINT}/projects/${classId}`,
    data: form,
    timeout: 100000,
    headers: { ...form.getHeaders(), Authorization: `Bearer ${authToken}` }
  }).catch((error: Error) => {
    throw error;
  });

  if (response.data?.error?.message) {
    throw new Error(response.data.error.message);
  }

  if (response.data.status !== 'ok') {
    console.log('Unknown error in `delete project` response from server.');
    return false;
  }

  return true;
}
