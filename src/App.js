import './App.css';
import Header from './Header';
import Form from './Form';
import GroceryList from './GroceryList';
import Footer from './Footer';
import { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, remove } from 'firebase/database';
import firebase from './firebase';

function App() {
	// setting state for items in our database
	const [items, setItems] = useState([]);

	useEffect(() => {
		// variable holding our database details
		const database = getDatabase(firebase);

		// variable making reference to our database
		const dbRef = ref(database);

		// event listener to that variable that will fire from the database, and call that data 'response'
		onValue(dbRef, (response) => {
			// variable storing the new state we want to introduce to our app
			const newState = [];

			// variable storing the response from our query to Firebase with .val() method
			const data = response.val();

			// data is an object, so we iterate through it using a for in loop to access each item name
			for (let key in data) {
				// pushing the values from the object into our newState array
				newState.push({ 
					key, 
					isSelected: data[key].isSelected,
					name: data[key].name, 
					username: data[key].username,
					notes: data[key].notes, 
					quantity: data[key].quantity 
				});
			}	

			// calling setItems in order to update our component's state using the local array newState
			setItems(newState);
		});
	}, []);

	// handle removal of each individual item from the database
	const handleRemoveItem = (itemId) => {
		// create a reference to the database
		const database = getDatabase(firebase);
		const dbRef = ref(database, `/${itemId}`);

		// removing the node specific to the item ID, using the Firebase method remove()
		remove(dbRef);
	}

	// handle removal of all items in the database
	const handleRemoveAll = () => {
		const database = getDatabase(firebase);
        const dbRef = ref(database);
        remove(dbRef);
	}

	return (
		<div className="wrapper">
			<Header />
			<Form />
			<GroceryList items={items} handleRemoveItem={handleRemoveItem} handleRemoveAll={handleRemoveAll} />
			<Footer />
		</div>
	);
}

export default App;
