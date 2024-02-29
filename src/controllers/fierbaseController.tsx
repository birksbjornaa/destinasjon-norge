import { collection } from "@firebase/firestore";
import { db } from "../config/firebaseConfig";
import { getDocs } from "firebase/firestore";

export const destinationCollection = collection(db, "Destination");

export async function getAllDestinations() {
  try {
    const snapshot = await getDocs(destinationCollection);
    return snapshot.docs.map((doc) => ({
      id: doc.data().id as number,
      name: doc.data().navn as string,
      imageSrc: doc.data().bilde as string,
      region: doc.data().fylke as string,
      description: doc.data().beskrivelse as string,
    }));
  } catch (error) {
    console.error("Error getting documents: ", error);
    return [];
  }
}
