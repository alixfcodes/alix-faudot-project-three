import './App.css';
import Header from './Header';
// import Form from './Form';
// import GroceryList from './GroceryList';
import GroceryItem from './GroceryItem';
import Footer from './Footer';
import { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, push } from 'firebase/database';
import firebase from './firebase';

function App() {
	const [items, setItems] = useState([]);
	const [userInput, setUserInput] = useState('');

	useEffect(() => {
		// create a variable that holds our database details
		const database = getDatabase(firebase);

		// we then create a variable that makes reference to our database
		const dbRef = ref(database);

		// add an event listener to that variable that will fire from the database, and call that data 'response'.
		onValue(dbRef, (response) => {
			// here we're creating a variable to store the new state we want to introduce to our app
			const newState = [];

			// here we store the response from our query to Firebase inside of a variable called data.
			// .val() is a Firebase method that gets us the information we want
			const data = response.val();
			// data is an object, so we iterate through it using a for in loop to access each item name

			for (let key in data) {
				// inside the loop, we push each item name to an array we already created inside the onValue() function called newState
				newState.push(data[key]);
			}

			// then, we call setBooks in order to update our component's state using the local array newState
			setItems(newState);
			});
		}, []);

	// this event will fire every time there is a change in the input it is attached to
	const handleInputChange = (event) => {
		// we're telling React to update the state of our `App` component to be equal to whatever is currently the value of the input field
		setUserInput(event.target.value);
	};

	const handleSubmit = (event) => {
		// event.preventDefault prevents the default action (form submission and page refresh)
		event.preventDefault();

		// create a reference to our database
		const database = getDatabase(firebase);
		const dbRef = ref(database);

		// push the value of the `userInput` state to the database
		push(dbRef, userInput);

		// reset the state to an empty string
		setUserInput("");
	}

	const removeItems = (item) => {
		// create a new array from the items in state
		const previousItems = [...items];

		const updatedItems = previousItems.filter(
		(filteredItem) => filteredItem !== item
		);
		/* compare each filteredItem value against the value of item passed as an argument to this function

			if the two items DO NOT match, add the item to the updatedItems array
			if the two items DO match, exclude it from the updatedItems array

			"bananas" !== "black beans" - "bananas" is added to the array
			"bananas" !== "bananas" - "bananas" is not added to the array */

		// filter returns a new array, so we can use the return from the filter method to update our app's state
		setItems(updatedItems);
	};

	return (
		<div className="App">
			<Header />
			<form action="submit">
				<label htmlFor="newItem">Add a new item to your grocery list</label>
				<input 
					type="text" 
					id="newItem" 
					onChange={handleInputChange}
					value={userInput} />
				<button onClick={handleSubmit}>Add new item</button>
			</form>
			{/* <Form /> */}
			{items.map((itemName) => {
				return (
				<GroceryItem
					name={itemName}
					removeItems={() => removeItems(itemName)}
				/>
				);
			})}
			{/* <GroceryList  /> */}
			<Footer />
		</div>
	);
	}

export default App;
