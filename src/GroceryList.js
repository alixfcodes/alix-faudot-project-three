// GroceryList.js
import { getDatabase, ref, update } from "firebase/database";
import firebase from "./firebase";

function GroceryList({ items, handleRemoveItem, handleRemoveAll }) {

	// handle quantity decrease/increase on each specific item listed
	const handleQuantityDecrease = (item) => {
		const database = getDatabase(firebase);
		const dbRef = ref(database, `/${item.key}`);

		const itemObject = {
			isSelected: false,
			name: item.name,
			username: item.username,
			notes: item.notes,
			quantity:
			Number(item.quantity) - 1 < 1 ? 1 : Number(item.quantity) - 1,
		};

		update(dbRef, itemObject);
	}

	const handleQuantityIncrease = (item) => {
		const database = getDatabase(firebase);
		const dbRef = ref(database, `/${item.key}`);

		const itemObject = {
			isSelected: false,
			name: item.name,
			username: item.username,
			notes: item.notes,
			quantity: Number(item.quantity) + 1,
		};

		update(dbRef, itemObject);
	};
	
	// handle toggle on the check button for when action is complete (item purchased)
	const handleToggleComplete = (item) => {

		const database = getDatabase(firebase);
		const dbRef = ref(database, `/${item.key}`);

		const itemObject = {
		isSelected: !item.isSelected,
		name: item.name,
		username: item.username,
		notes: item.notes,
		quantity: item.quantity,
		};

		update(dbRef, itemObject);
	};

	return (
		<section className="list-section">
		<div>
			{items.length === 0 ? (
			<p>Your list is empty. Add a new item to get started.</p>
			) : null}
		</div>
		<ul className="list-container">
			{items.map((item) => {
			return (
				<li key={item.key} className="list-item">
					<div className="item-name-section">
						<div className="item-name">
							<button
							className="item-checkbox"
							onClick={() => handleToggleComplete(item)}
							>
								{item.isSelected ? (
								<i className="fa-solid fa-circle-check"></i>
								) : (
								<i className="fa-solid fa-circle"></i>
								)}
							</button>
							<span className={item.isSelected ? "item-complete" : "item-pending"}>
								{item.name}
							</span>
						</div>
						<div className="item-username">
							{item.username.length >= 1 ? (
							<p>Added by: {item.username}</p> ) : null}
						</div>
					</div>
					<div className="item-notes">
						{item.notes.length >= 1 ? <p>Note: {item.notes}</p> : null}
					</div>
					<div className="item-quantity-delete">
						<div className="item-quantity">
							<button
							onClick={() => handleQuantityDecrease(item)}
							className="chevron"
							>
								<i className="fa-solid fa-chevron-left"></i>
							</button>
							<span> {item.quantity ? item.quantity : 1}</span>
							<button
							onClick={() => handleQuantityIncrease(item)}
							className="chevron"
							>
								<i className="fa-solid fa-chevron-right"></i>
							</button>
						</div>
						<button
						onClick={() => handleRemoveItem(item.key)}
						className="button-delete"
						>
							<i className="fa-solid fa-xmark"></i>
						</button>
					</div>
				</li>
			);
			})}
		</ul>
		{items.length === 0 ? null : (
			<div className="button-clear-container">
			<button onClick={() => handleRemoveAll()} className="button-clear">
				Clear the list
			</button>
			</div>
		)}
		</section>
	);
}


export default GroceryList;