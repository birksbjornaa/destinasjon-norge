import { collection } from "@firebase/firestore";
import { addDoc, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

const usersCollection = collection(db, "Users");

export interface UserData {
  token: string;
  email: string;
  role: string;
}

export function createMissingData(): UserData {
  return {
    token: "missing",
    email: "missing",
    role: "missing",
  };
}

export async function getAllUsers(): Promise<UserData[]> {
  try {
    const snapshot = await getDocs(usersCollection);
    return snapshot.docs.map((doc) => ({
      token: doc.data().token as string,
      email: doc.data().email as string,
      role: doc.data().role as string,
    }));
  } catch (error) {
    console.error("Error getting users: ", error);
    return [createMissingData()];
  }
}

export async function getAllTokens(): Promise<string[]> {
  const allUsers: Array<UserData> = await getAllUsers();
  const tokens: string[] = [];

  allUsers.forEach((user) => {
    tokens.push(user.token);
  });

  return tokens;
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
      const docRef = doc(db, "Users", user.token);
      const snapshot = await getDoc(docRef);
      const snapData = snapshot.data();
      if (snapData) {
        return {
          token: snapData.token as string,
          email: snapData.email as string,
          role: snapData.role as string,
        };
      }
    }
  }
  new Error("User not found");
}
export async function createNewUser(token: string, email: string) {
  try {
    const newUser = {
      email: email,
      role: "user",
      token: token,
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
