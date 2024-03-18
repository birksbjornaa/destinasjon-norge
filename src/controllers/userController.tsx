import { collection } from "@firebase/firestore";
import {
  query,
  where,
  addDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../config/firebaseConfig";

const usersCollection = collection(db, "Users");

export interface UserData {
  id: string;
  email: string;
  role: string;
  tags: string[];
}

export function createMissingData(): UserData {
  return {
    id: "missing",
    email: "missing",
    role: "missing",
    tags: [],
  };
}

export async function getAllUsers(): Promise<UserData[]> {
  try {
    const snapshot = await getDocs(usersCollection);
    return snapshot.docs.map((doc) => ({
      id: doc.id as string,
      email: doc.data().email as string,
      role: doc.data().role as string,
      tags: doc.data().role as string[],
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

export async function getUser(email: string): Promise<UserData | null> {
  const usersCollection = collection(db, "Users");
  const q = query(usersCollection, where("email", "==", email));

  try {
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      return null;
    }

    const doc = snapshot.docs[0];
    return {
      id: doc.id,
      email: doc.data().email,
      role: doc.data().role,
      tags: doc.data().tags,
    };
  } catch (error) {
    console.error("Error getting user by email: ", error);
    return null;
  }
}

export async function createNewUser(email: string) {
  try {
    const newUser = {
      email: email,
      role: "user",
      tags: [],
    };
    await addDoc(usersCollection, newUser);
    return true;
  } catch (e) {
    console.error("Error adding user: ", e);
    return false;
  }
}
// TODO: oppdater AuthProivider sin versjon når oppdaterer database!
export async function updateProfileTags(user: UserData, newTags: string[]) {
  try {
    const updateData = {
      ...user,
    };
    updateData.tags = newTags;
    await updateDoc(doc(db, "Users", user.id), updateData);

    return true; // Updated OK
  } catch (e) {
    console.error("Error editing document (destination): ", e);
    return false; // Somthing wrong
  }
}

// Må lage en funksjon som lagrer tags til profilen
// export default function saveTagsToProfile(token: string,)
