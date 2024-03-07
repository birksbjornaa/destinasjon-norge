import { collection } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
import { doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../config/firebaseConfig";


const usersCollection = collection(db, "Users");
const auth = getAuth();
const user = auth.currentUser;
const token = await user?.getIdToken();


export interface UserData {
  token: string;
  email: string;
  role: string;
  // Her kan man legge inn mer data senere
  // admin 0 eller 1?
}

// Sometimes null is not okay, so this is returned instead
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
    tokens.push(user.token); // må endre uid til token inne i firebase
  });

  return tokens;
}

export async function getUser(uid: string): Promise<UserData> {
  try {
    const docRef = doc(db, "User", uid);
    const snapshot = await getDoc(docRef);

    const snapData = snapshot.data();
    if (snapData) {
      return {
        token: snapData.uid as string,
        email: snapData.email as string,
        role: snapData.role as string
      };
    } else {
      return createMissingData();
    }
  } catch (error) {
    console.error("Error getting users: ", error);
    return createMissingData();
  }
}


if (user !== null) {
  const tokens: string[] = await getAllTokens();

  if(tokens.includes(token)) {
    
  }
  const email = user.email;


  // The user's ID, unique to the Firebase project. Do NOT use
  // this value to authenticate with your backend server, if
  // you have one. Use User.getToken() instead.
}

export async function getUser(currentToken: string) {
  const userSnapshot = await getDocs(usersCollection);
  const users = userSnapshot.docs.map(doc => doc.data());
  const docRef = doc(db, "Users", token);
  const snapshot = await getDoc(docRef);
  const snapData = snapshot.data();


  for (let user of users) {
    if (user.token === currentToken) {
      return {
        token: snapData.uid as string,
        email: snapData.email as string,
        role: snapData.role as string
      };
    }
  }
}