import { collection } from "@firebase/firestore";
import { db } from "../config/firebaseConfig";
import { doc, getDoc, getDocs } from "firebase/firestore";

const destinationCollection = collection(db, "Destination");

export interface DestinationData {
  id: string;
  name: string;
  imageSrc: string;
  region: string;
  description: string;
  price: number;
  tags: string[];
}

// Somethimes null is not okay, so this is returned instead
export function createMissingData(): DestinationData {
  return {
    id: "missing",
    name: "missing",
    imageSrc: "missing",
    region: "missing",
    description: "missing",
    price: 0,
    tags: [""],
  };
}

export async function getAllDestinations(): Promise<DestinationData[]> {
  try {
    const snapshot = await getDocs(destinationCollection);
    return snapshot.docs.map((doc) => ({
      id: doc.id as string,
      name: doc.data().navn as string,
      imageSrc: doc.data().bilde as string,
      region: doc.data().fylke as string,
      description: doc.data().beskrivelse as string,
      price: doc.data().prisnivaa as number,
      tags: doc.data().tags as string[],
    }));
  } catch (error) {
    console.error("Error getting documents: ", error);
    return [createMissingData()];
  }
}

export async function getDestination(id: string): Promise<DestinationData> {
  try {
    const docRef = doc(db, "Destination", id);
    const snapshot = await getDoc(docRef);

    const snapData = snapshot.data();
    if (snapData) {
      return {
        id: snapshot.id as string,
        name: snapData.navn as string,
        imageSrc: snapData.bilde as string,
        region: snapData.fylke as string,
        description: snapData.beskrivelse as string,
        price: snapData.pris as number,
        tags: snapData.tags as string[],
      };
    } else {
      return createMissingData();
    }
  } catch (error) {
    console.error("Error getting documents: ", error);
    return createMissingData();
  }
}
