// GroceryList.js
import { getDatabase, ref, update } from "firebase/database";
import firebase from "./firebase";

function GroceryList({ items, handleRemoveItem }) {

    const handleQuantityDecrease = (item) => {
        const database = getDatabase(firebase);
        const dbRef = ref(database, `/${item.key}`);

        const itemObject = {
            name: item.name,
            username: item.username,
            notes: item.notes,
            quantity:
                Number(item.quantity) - 1 < 0 ? 0 : Number(item.quantity) - 1,
        };

        update(dbRef, itemObject);
    }

    const handleQuantityIncrease = (item) => {
        const database = getDatabase(firebase);
        const dbRef = ref(database, `/${item.key}`);

        const itemObject = {
            name: item.name,
            username: item.username,
            notes: item.notes,
            quantity: Number(item.quantity) + 1
        };

        update(dbRef, itemObject);
    };

    return (
        <ul>
            {items.map((item) => {
                return (
                    <li key={item.key}>
                        <p>Item: {item.name}</p>
                        <p>Added by {item.username}</p>
                        <p>Notes: {item.notes}</p>
                        <div>
                            <button onClick={() => handleQuantityDecrease(item)}>
                                -
                            </button>
                            <p>Quantity: {item.quantity}</p>
                            <button onClick={() => handleQuantityIncrease(item)}>
                                +
                            </button>
                        </div>
                        <button onClick={() => handleRemoveItem(item.key)}>
                        x
                        </button>
                    </li>
                );
            })}
        </ul>
    );
}

export default GroceryList;