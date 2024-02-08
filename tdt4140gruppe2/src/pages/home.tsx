import { addDoc, collection } from "@firebase/firestore";
import { SyntheticEvent, useRef } from 'react';
import { firestore } from "../components/firebaseConfig";

export default function Home() {
  const messageRef = useRef<HTMLInputElement>(null);
  const ref = collection(firestore,"messages");

  const handleSave = async (e: SyntheticEvent) => {
    e.preventDefault();
    console.log(messageRef.current?.value);

    let data = {
      message: messageRef.current?.value,
    };

    try {
      addDoc(ref, data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <form onSubmit={handleSave}>
        <label>Enter Message</label>
        <input type="text" ref={messageRef} />
        <button type="submit" >Save</button>
      </form>
    </div>
  );
}