// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import { Client } from "appwrite";

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT);

export { client };
