import React, { useContext, useEffect, useState } from "react";
import cart from "../img/cart1.jpg";
import { onValue, push, ref, remove } from "firebase/database";
import { auth, database } from "../config/firebase";
import { signOut } from "firebase/auth";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

const Home = () => {
    const { currentUser } = useContext(AuthContext);

    const shoppingListInDB = ref(database, `shoppingList/${currentUser.uid}`);

    const [text, setText] = useState("");
    const [items, setItems] = useState([]);

    const handleChange = (event) => {
        setText(event.target.value.trimStart());
    };

    const handleEnter = (event) => {
        if (event.code === "Enter") {
            handleClick();
        }
    };

    const handleClick = () => {
        if (text !== "") {
            push(shoppingListInDB, text);
            setText("");
        } else {
            alert("Input is Empty!");
        }
    };

    const handleDoubleClick = (id, name) => {
        if (
            window.confirm(
                `Are you sure you want to delete ${name} from the List?`
            )
        ) {
            let exactLocationOfItemInDB = ref(
                database,
                `shoppingList/${currentUser.uid}/${id}`
            );

            remove(exactLocationOfItemInDB);
        }
    };

    useEffect(() => {
        return onValue(shoppingListInDB, function (snapshot) {
            if (snapshot.exists()) {
                setItems(Object.entries(snapshot.val()));
            } else {
                setItems([]);
            }
        });
    });

    return (
        <div>
            {currentUser.emailVerified ? (
                <>
                    <h1>Shopping Cart</h1>
                    <h2>Welcome, {currentUser.displayName}</h2>
                    <div className="container">
                        <img
                            src={cart}
                            height="416"
                            width="416"
                            title="Shopping Cart"
                            alt="Shopping Cart"
                        />
                        <input
                            type="text"
                            placeholder="eg. Milk"
                            autoFocus
                            autoComplete="off"
                            onChange={(e) => handleChange(e)}
                            onKeyDown={handleEnter}
                            value={text}
                        />
                        <button onClick={handleClick}>Add to cart</button>
                        <ul id="shopping-list">
                            {items.length
                                ? items.map((item) => (
                                      <li
                                          key={item[0]}
                                          onDoubleClick={() =>
                                              handleDoubleClick(
                                                  item[0],
                                                  item[1]
                                              )
                                          }>
                                          {item[1]}
                                      </li>
                                  ))
                                : "Nothing here yet!"}
                        </ul>
                        {items.length ? (
                            <footer>
                                <p>*Double Click on an item to remove. </p>
                            </footer>
                        ) : (
                            ""
                        )}
                        <button onClick={() => signOut(auth)}>Sign Out</button>
                    </div>
                    <footer>
                        <small>
                            Made by{" "}
                            <a
                                href="https://github.com/anand-patel-91"
                                target="_blank"
                                rel="noreferrer"
                                title="Visit my Github">
                                Anand Patel
                            </a>
                        </small>
                    </footer>
                </>
            ) : (
                <div
                    className="container"
                    style={{
                        textAlign: "center",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                    Click on the link received in email "{currentUser.email}" to
                    verify and then refresh the page
                    <Link to="/register">
                        <button>Go Back to Register</button>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Home;
