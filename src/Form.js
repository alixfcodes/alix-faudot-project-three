// Form.js
import { useState } from 'react';
import { getDatabase, ref, push } from "firebase/database";
import firebase from "./firebase";

function Form() {
    const [userInput, setUserInput] = useState("");

    const [userNameInput, setUserNameInput] = useState("");

    const [userNotesInput, setUserNotesInput] = useState("");

    const [userQuantityInput, setUserQuantityInput] = useState("");

    // those events will fire every time there is a change in the different inputs they are attached to
    const handleInputChange = (event) => {
        // we're telling React to update the state of our `App` component to be equal to whatever is currently the value of the input field
        setUserInput(event.target.value);
    };

    const handleUserNameChange = (event) => {
        setUserNameInput(event.target.value);
    };

    const handleNotesChange = (event) => {
        setUserNotesInput(event.target.value);
    };

    const handleQuantityInputChange = (event) => {
        setUserQuantityInput(event.target.value);
    };

    const handleSubmit = (event) => {
        // event.preventDefault prevents the default action (form submission and page refresh)
        event.preventDefault();

        // 	create a reference to our database
        const database = getDatabase(firebase);
        const dbRef = ref(database);

        // create new object that contains the user inputs  
        const itemObject = {
        name: userInput,
        username: userNameInput,
        notes: userNotesInput,
        quantity: userQuantityInput,
        };

        // push the value of the `userInput` state to the database
        push(dbRef, itemObject);

        // reset the state to an empty string
        setUserInput("");
        setUserNameInput("");
        setUserNotesInput("");
        setUserQuantityInput("");
    };

    return (
        <form action="submit">
            <label htmlFor="itemDescription">
                Add a new item to your grocery list:
            </label>
            <input
                type="text"
                id="itemDescription"
                onChange={handleInputChange}
                value={userInput}
            />
            <label htmlFor="userName">
                Your name:
            </label>
            <input
                type="text"
                id="userName"
                onChange={handleUserNameChange}
                value={userNameInput}
            />
            <label htmlFor="itemNotes">Add notes (optional):</label>
            <input
                type="text"
                id="itemNotes"
                onChange={handleNotesChange}
                value={userNotesInput}
            />
            <label htmlFor="itemQuantity">Choose the quantity:</label>
            <input
                type="text"
                id="itemQuantity"
                onChange={handleQuantityInputChange}
                value={userQuantityInput}
            />
            <button onClick={handleSubmit}>Add new item</button>
        </form>
    );
}

export default Form;