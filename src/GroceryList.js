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
        <ul className="list-container">
          { items.map((item) => {
            return (
              <li key={item.key} className="list-item">
                <div className="flex-container">
                <div
                  className="item-name"
                  onClick={() => handleToggleComplete(item)}
                >
                  {item.isSelected === true ? (
                    <i className="fa-solid fa-circle-check"></i>
                  ) : (
                    <i className="fa-solid fa-circle"></i>
                  )}
                  <span className={item.isSelected === true ? "complete" : "pending"}>
                    {item.name}
                  </span>
                </div>
                <div className="item-username">
                  {item.username.length >= 1 ? (
                    <p>Added by: {item.username}</p>
                  ) : null}
                </div>
                </div>
                <div className="item-notes">
                  {item.notes.length >= 1 ? <p>Note: {item.notes}</p> : null}
                </div>
                <div className="flex-container">
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
                  <button onClick={() => handleRemoveItem(item.key)} className="button-delete">
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
        <button onClick={() => handleRemoveAll()} className="button-clear">Clear the list</button>
      </>
    );
}


export default GroceryList;