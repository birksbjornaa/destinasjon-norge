import { collection } from "@firebase/firestore";
import { addDoc, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

const usersCollection = collection(db, "Users");

export interface UserData {
  email: string;
  role: string;
}

export function createMissingData(): UserData {
  return {
    email: "missing",
    role: "missing",
  };
}

export async function getAllUsers(): Promise<UserData[]> {
  try {
    const snapshot = await getDocs(usersCollection);
    return snapshot.docs.map((doc) => ({
      email: doc.data().email as string,
      role: doc.data().role as string,
    }));
  } catch (error) {
    console.error("Error getting users: ", error);
    return [createMissingData()];
  }
}

export async function hasUser(email: string) {
  const users = await getAllUsers();
  for (let user of users) {
    if (user.email === email) {
      return true;
    }
  }
  return false;
}

export async function getUser(inputEmail: string) {
  const users = await getAllUsers();
  for (let user of users) {
    if (user.email === inputEmail) {
      return {
        email: user.email as string,
        role: user.role as string,
      };
    }
  }
  return createMissingData();
}
export async function createNewUser(email: string) {
  try {
    const newUser = {
      email: email,
      role: "user",
    };
    await addDoc(usersCollection, newUser);
    return true;
  } catch (e) {
    console.error("Error adding user: ", e);
    return false;
  }
}

// Må lage en funksjon som lagrer tags til profilen
// export default function saveTagsToProfile(token: string,)
