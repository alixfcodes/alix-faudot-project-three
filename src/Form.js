// Form.js
import { useState } from 'react';
import { getDatabase, ref, push } from "firebase/database";
// import { useForm } from "react-hook-form";
import firebase from "./firebase";

function Form() {
    const [userInput, setUserInput] = useState("");

    const [userNameInput, setUserNameInput] = useState("");

    const [userNotesInput, setUserNotesInput] = useState("");

    const [userQuantityInput, setUserQuantityInput] = useState("");

    // those events will fire every time there is a change in the different inputs they are attached to
    const handleInputChange = (event) => {
        // we're telling React to update the state of our `App` component to be equal to whatever is currently the value of the input field
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

    const handleSubmit = (event) => {
        // event.preventDefault prevents the default action (form submission and page refresh)
        event.preventDefault();

        // 	create a reference to our database
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

        // push the value of the `userInput` state to the database
        push(dbRef, itemObject);

        // reset the state to an empty string
        setUserInput("");
        setUserNameInput("");
        setUserNotesInput("");
        setUserQuantityInput("");
    };

    // const validate = () => {
    //     let inputError = "";

    //     if (
    //       userInput.length === 0
    //     ) {
    //       inputError = "Input fields cannot be blank.";
    //     }

    //     if (inputError) {
    //       this.setState({ inputError });
    //       return false;
    //     }

    //     return true;
    //   };


    // const { register, errors } = useForm();

    return (
      <>
      <form action="submit">
        <p>Add a new item below.</p>
          <label htmlFor="itemDescription">Item</label>
          <input
            name="requiredField"
            // ref={register({ required: true })}
            type="text"
            id="itemDescription"
            onChange={handleInputChange}
            value={userInput}
            placeholder="Item description (required)"
            minLength="1"
            maxLength="25"
            required
          />
          {/* <br />
          {errors.requiredField && <span>This field is required</span>}
          <br /> */}
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
            value={userQuantityInput ? userQuantityInput : 1}
            placeholder="Defaults to 1 (optional)"
            default="1"
            min="1"
            max="24"
          />
        {/* <p className="errorMessage">{inputError}</p> */}

        <button type="submit" onClick={handleSubmit} className="button-submit" disabled={!userInput}>
          Add to List
        </button>
      </form>
      </>
    );
}

export default Form;