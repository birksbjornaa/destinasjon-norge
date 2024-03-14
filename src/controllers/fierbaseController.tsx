import { collection } from "@firebase/firestore";
import { db } from "../config/firebaseConfig";
import { doc, getDoc, getDocs, addDoc, updateDoc } from "firebase/firestore";

const destinationCollection = collection(db, "Destination");

export interface DestinationData {
  id: string;
  name: string;
  imageSrc: string;
  region: string;
  description: string;
  price: number;
  tags: string[];
  yrid: string;
}

// null is not okay to be returned, so this is used to generate a DestinatinData that is not null
export function createMissingData(): DestinationData {
  return {
    id: "missing",
    name: "missing",
    imageSrc: "missing",
    region: "missing",
    description: "missing",
    price: 0,
    tags: [""],
    yrid: "",
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
      yrid: doc.data().yrid as string,
    }));
  } catch (error) {
    console.error("Error getting documents (destinaton): ", error);
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
        price: snapData.prisnivaa as number,
        tags: snapData.tags as string[],
        yrid: snapData.yrid as string,
      };
    } else {
      return createMissingData();
    }
  } catch (error) {
    console.error("Error getting documents (destination): ", error);
    return createMissingData();
  }
}

export async function postNewDestination(newDestination: DestinationData) {
  try {
    const newDestinationFormated = {
      navn: newDestination.name as string,
      bilde: newDestination.imageSrc as string,
      fylke: newDestination.region as string,
      beskrivelse: newDestination.description as string,
      prisnivaa: newDestination.price as number,
      tags: newDestination.tags as string[],
      yrid: newDestination.yrid as string,
    };

    const docRef = await addDoc(
      collection(db, "Destination"),
      newDestinationFormated
    );
    return docRef.id;
  } catch (e) {
    console.error("Error adding document (destination): ", e);
  }
}

// TODO: Rename fierbase fierstore attributes to english (to match the rest of project)
export async function updateExsistingDestination(destination: DestinationData) {
  try {
    const updateData = {
      navn: destination.name as string,
      bilde: destination.imageSrc as string,
      fylke: destination.region as string,
      beskrivelse: destination.description as string,
      prisnivaa: destination.price as number,
      tags: destination.tags as string[],
      yrid: destination.yrid as string,
    };
    await updateDoc(doc(db, "Destination", destination.id), updateData);
  } catch (e) {
    console.error("Error editing document (destination): ", e);
  }
}
