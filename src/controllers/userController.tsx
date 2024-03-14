import { collection } from "@firebase/firestore";
import { doc, getDoc, getDocs, setDoc } from "firebase/firestore";
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
      role: doc.data().role as string
    }));
  } catch (error) {
    console.error("Error getting users: ", error);
    return [createMissingData()];
  }
}

export async function getAllTokens(): Promise<string[]> {
  const allUsers: Array<UserData> = await getAllUsers();
  const tokens: string[] = [];

  allUsers.forEach(user => {
    tokens.push(user.token);
  });

  return tokens;
}

export async function checkIfUserIsAdmin(currentToken: String) {
  const userSnapshot = await getDocs(usersCollection);
  const users = userSnapshot.docs.map(doc => doc.data());

  for (let user of users) {
    if (user.token === currentToken) {
      const docRef = doc(db, "Users", user.token);
      const snapshot = await getDoc(docRef);
      const snapData = snapshot.data();
      if (snapData && snapData.role === "admin") {
        return true;
      } else {
        return false;
      }
    }
  }
  return false;
}

export async function checkIfUserInDatabase(currentToken: string) {
  const userSnapshot = await getDocs(usersCollection);
  const users = userSnapshot.docs.map(doc => doc.data());

  for (let user of users) {
    if (user.token === currentToken) {
      return true;
    }
  }
  return false;
}

export async function getUser(currentToken: string, currentEmail: string) {
  const userSnapshot = await getDocs(usersCollection);
  const users = userSnapshot.docs.map(doc => doc.data());

  if(await checkIfUserInDatabase(currentToken)){
    for (let user of users) {
      if (user.token === currentToken) {
        const docRef = doc(db, "Users", user.token);
        const snapshot = await getDoc(docRef);
        const snapData = snapshot.data();
        if (snapData) {
          return(
            {
              token: snapData.token as string,
              email: snapData.email as string,
              role: snapData.role as string
            }
          )
        }
      }
    }
  } else {
    const newUser = {
      token: currentToken,
      email: currentEmail,
      role: "user"
    };
    await setDoc(doc(db, "Users", currentToken), newUser);
    
  }
}

// Må lage en funksjon som lagrer tags til profilen
// export default function saveTagsToProfile(token: string,)