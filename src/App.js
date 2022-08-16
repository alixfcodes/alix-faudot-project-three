import './App.css';
import Header from './Header';
import Form from './Form';
import GroceryList from './GroceryList';
import Footer from './Footer';
import { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, remove } from 'firebase/database';
import firebase from './firebase';

function App() {
	const [items, setItems] = useState([]);

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

			console.log(data);
			// data is an object, so we iterate through it using a for in loop to access each item name

			for (let key in data) {
				// pushing the values from the object into our newState array
				newState.push({ 
					key, 
					isSelected: false,
					name: data[key].name, 
					username: data[key].username,
					notes: data[key].notes, 
					quantity: data[key].quantity 
				});
				console.log(data[key]);
			}	

			// then, we call setItems in order to update our component's state using the local array newState
			setItems(newState);
			// setItemQuantity(newState);
		});
	}, []);

	const handleRemoveItem = (itemId) => {
		// here we create a reference to the database 
		// this time though, instead of pointing at the whole database, we make our dbRef point to the specific node of the item we want to remove
		const database = getDatabase(firebase);
		const dbRef = ref(database, `/${itemId}`);
		
		// using the Firebase method remove(), we remove the node specific to the item ID
		remove(dbRef);
	}

	const handleRemoveAll = () => {
		const database = getDatabase(firebase);
        const dbRef = ref(database);
        remove(dbRef);
	}

	return (
		<div className="body">
			<div className="wrapper">
				<Header />
				<Form />
				<GroceryList items={items} handleRemoveItem={handleRemoveItem} handleRemoveAll={handleRemoveAll} />
				<Footer />
			</div>
		</div>
	);
}

export default App;
