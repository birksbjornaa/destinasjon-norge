import { collection } from "@firebase/firestore";
import { db } from "../config/firebaseConfig";
import { getDocs } from "firebase/firestore";

export const destinationCollection = collection(db, "Destination");

export async function getAllDestinations() {
  try {
    const snapshot = await getDocs(destinationCollection);
    return snapshot.docs.map((doc) => ({
      name: doc.data().name as string,
      imageSrc: doc.data().bilde as string,
    }));
  } catch (error) {
    console.error("Error getting documents: ", error);
    return [];
  }
}
