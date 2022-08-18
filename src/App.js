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
		const database = getDatabase(firebase);

		const dbRef = ref(database);

		onValue(dbRef, (response) => {
			const newState = [];

			const data = response.val();

			for (let key in data) {
				newState.push({ 
					key, 
					isSelected: data[key].isSelected,
					name: data[key].name, 
					username: data[key].username,
					notes: data[key].notes, 
					quantity: data[key].quantity 
				});
			}	

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
