import { collection } from "@firebase/firestore";
import { db } from "../config/firebaseConfig";
import { getDocs } from "firebase/firestore";

export const destinationCollection = collection(db, "Destination");

export async function getAllDestinations() {
  try {
    const snapshot = await getDocs(destinationCollection);
    return snapshot.docs.map((doc) => ({
      name: doc.data().navn as string,
      imageSrc: doc.data().bilde as string,
      price: doc.data().prisnivå as number,
      tags: (doc.data().tags as string).split(";").map(tag => tag.trim())
    }));
  } catch (error) {
    console.error("Error getting documents: ", error);
    return [];
  }
}
