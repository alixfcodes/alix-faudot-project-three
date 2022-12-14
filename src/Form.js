// Form.js
import { useState } from 'react';
import { getDatabase, ref, push } from "firebase/database";
import firebase from "./firebase";

function Form() {
	// setting states for the different inputs on the form
	const [userInput, setUserInput] = useState("");

	const [userNameInput, setUserNameInput] = useState("");

	const [userNotesInput, setUserNotesInput] = useState("");

	const [userQuantityInput, setUserQuantityInput] = useState("");

	// setting function events will fire every time there is a change in the different inputs they are attached to
	const handleInputChange = (event) => {
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

	// handle submit on form
	const handleSubmit = (event) => {
		event.preventDefault();

		const database = getDatabase(firebase);
		const dbRef = ref(database);

		// create new object that contains the user inputs  
		const itemObject = {
			name: userInput,
			username: userNameInput,
			notes: userNotesInput,
			quantity: userQuantityInput,
			isSelected: false
		};

		// push the value of the different states (in the new object) to the database
		push(dbRef, itemObject);

		// reset the state to an empty string
		setUserInput("");
		setUserNameInput("");
		setUserNotesInput("");
		setUserQuantityInput("");
	};

	return (
		<form action="submit">
			<label htmlFor="itemDescription">Item</label>
			<input
			name="requiredField"
			type="text"
			id="itemDescription"
			onChange={handleInputChange}
			value={userInput}
			placeholder="Item description (required)"
			minLength="1"
			maxLength="25"
			required
			autofocus
			/>
			<label htmlFor="userName">Name</label>
			<input
			type="text"
			id="userName"
			onChange={handleUserNameChange}
			value={userNameInput}
			placeholder="Your name (optional)"
			minLength="1"
			maxLength="20"
			/>
			<label htmlFor="itemNotes">Note</label>
			<input
			type="text"
			id="itemNotes"
			onChange={handleNotesChange}
			value={userNotesInput}
			placeholder="Any note (optional)"
			minLength="1"
			maxLength="50"
			/>
			<label htmlFor="itemQuantity">Quantity</label>
			<input
			type="number"
			id="itemQuantity"
			onChange={handleQuantityInputChange}
			value={userQuantityInput}
			placeholder="Defaults to 1 (optional)"
			min="1"
			max="24"
			/>
			<button
			type="submit"
			onClick={handleSubmit}
			className="button-submit"
			disabled={!userInput}
			>
			Add to List
			</button>
		</form>
	);
}

export default Form;