// GroceryItem.js

function GroceryItem(props) {
    return (
        <div>
            <ul>
                <li>
                    <p>{props.name}</p>
                    <button onClick={props.removeItems}>x</button>
                </li>
            </ul>
        </div>
    );
}

export default GroceryItem;
