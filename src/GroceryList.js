// GroceryList.js
import { getDatabase, ref, update } from "firebase/database";
import firebase from "./firebase";

function GroceryList({ items, handleRemoveItem, handleRemoveAll }) {

    const handleQuantityDecrease = (item) => {
        const database = getDatabase(firebase);
        const dbRef = ref(database, `/${item.key}`);

        const itemObject = {
            name: item.name,
            isSelected: false,
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
            name: item.name,
            isSelected: false,
            username: item.username,
            notes: item.notes,
            quantity: Number(item.quantity) + 1
        };

        update(dbRef, itemObject);
    };
    
    const handleToggleComplete = (item) => {

              const database = getDatabase(firebase);
              const dbRef = ref(database, `/${item.key}`);

              const itemObject = {
                name: item.name,
                isSelected: !item.isSelected,
                username: item.username,
                notes: item.notes,
                quantity: item.quantity,
              };

              update(dbRef, itemObject);
            };

    return (
      <>
        <ul className="item-list">
          { items.map((item) => {
            return (
              <li key={item.key} className="list-container">
                <div
                  className="item-name"
                  onClick={() => handleToggleComplete(item)}
                >
                  {item.isSelected ? (
                      <i
                        className="fa-solid fa-circle-check"
                      ></i>
                  ) : (
                    <i
                      className="fa-solid fa-circle"
                    ></i>
                  )}
                  <span className={item.isSelected ? "complete" : "pending"}>
                    {item.name}
                  </span>
                </div>
                <p>Added by: {item.username}</p>
                <p>Note: {item.notes}</p>
                <div className="quantity-item">
                  <button
                    onClick={() => handleQuantityDecrease(item)}
                    className="chevron"
                  >
                    <i className="fa-solid fa-chevron-left"></i>
                  </button>
                  <span> {item.quantity}</span>
                  <button
                    onClick={() => handleQuantityIncrease(item)}
                    className="chevron"
                  >
                    <i className="fa-solid fa-chevron-right"></i>
                  </button>
                </div>
                <button onClick={() => handleRemoveItem(item.key)}>
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </li>
            );
          })}
        </ul>
        <button onClick={() => handleRemoveAll()}>Clear the list</button>
      </>
    );
}


export default GroceryList;