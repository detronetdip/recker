/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import { Storage, Databases } from "appwrite";
import { client } from "../config/appwrite.config";
const createUserName = (name: string) => {
  const db = new Databases(client);
  return db.createDocument(
    import.meta.env.VITE_APPWRITE_DATABASE,
    import.meta.env.VITE_APPWRITE_USER_COLLECTION,
    `${localStorage.getItem("userId")}`,
    {
      name,
    }
  );
};

const uploadFile = (file: Blob) => {
  const storage = new Storage(client);
  return storage.createFile(
    import.meta.env.VITE_APPWRITE_BUCKET,
    localStorage.getItem("userId"),
    file
  );
};

const getDocuments = (collectionId: string, key: string) => {
  const db = new Databases(client);
  return db.getDocument(
    import.meta.env.VITE_APPWRITE_DATABASE,
    collectionId,
    key
  );
};

const listDocuments = (collectionId: string, query: unknown[]) => {
  const db = new Databases(client);
  return db.listDocuments(
    import.meta.env.VITE_APPWRITE_DATABASE,
    collectionId,
    query
  );
};

const getFile = (key: string) => {
  const storage = new Storage(client);
  return storage.getFilePreview(import.meta.env.VITE_APPWRITE_BUCKET, key);
};

const deleteDocument = (id: string) => {
  const db = new Databases(client);
  return db.deleteDocument(
    import.meta.env.VITE_APPWRITE_DATABASE,
    import.meta.env.VITE_APPWRITE_DATA_COLLECTION,
    id
  );
};

export {
  createUserName,
  uploadFile,
  getDocuments,
  getFile,
  listDocuments,
  deleteDocument,
};
