import React, { useState } from "react";
import logoSun from "./images/icon-sun.svg";
import logoMoon from "./images/icon-moon.svg";
import logoCross from "./images/icon-cross.svg";
import logoCheck from "./images/icon-check.svg";

const beforeItems = [
    { name: "Jog", checked: false },
    { name: "10 mins meditation", checked: false },
    { name: "Read for 1 hour", checked: false },
    { name: "Pick up groceries", checked: false },
];

export default function App() {
    const [items, setItems] = useState(beforeItems);

    return (
        <>
            <Header />
            <InputBox setItems={setItems} />
            <Box items={items} setItems={setItems} />
            <Footer items={items} setItems={setItems} />
        </>
    );
}

function Header() {
	const [lightTheme, setLightTheme] = useState(false);
	
	function onChangeTheme(){
		setLightTheme(lightTheme => !lightTheme);
	}

	if (lightTheme){
		document.documentElement.classList.add("light");
	}else{
		document.documentElement.classList = "";
	}

    return (
        <div className="header">
            <h1>TODO</h1>
            <span style={{cursor:"pointer"}}>
                <img src={lightTheme ? logoMoon:logoSun} alt="theme-logo" onClick={onChangeTheme} />
            </span>
        </div>
    );
}

function InputBox({ setItems }) {
    const [todo, setTodo] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        console.log(todo);
        setItems((items) => [...items, { name: todo, checked: false }]);
        setTodo("");
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="input-box">
                <div className="circle"></div>
                <input
                    placeholder="Create a new todo..."
                    value={todo}
                    onChange={(e) => setTodo(e.target.value)}
                />
            </div>
        </form>
    );
}

function Box({ items, setItems }) {
    return (
        <div className="box">
            <ul className="items-list">
                {items.map((x) => (
                    <Item item={x} key={x.name} setItems={setItems} />
                ))}
            </ul>
        </div>
    );
}

function Item({ item, setItems }) {
    const [checked, setChecked] = useState(false);

    function deleteItem() {
        setItems((items) => items.filter((each) => each.name !== item.name));
    };

    function onCheck() {
        setItems((items) =>
            items.map((x) =>
                x.name === item.name ? 
					{ name: item.name, checked: !checked } : x
            )
        );
        setChecked(!checked);
    };

    return (
        <li className="item">
            <div
                className={checked ? "checked" : "gradient-border-button"}
                onClick={onCheck}
            >
                {checked ? <img src={logoCheck} alt="logo" /> : null}
            </div>
            <p className={checked ? "p-checked" : "name-text"}>{item.name}</p>
            <img
                src={logoCross}
                className="cross"
                alt="cross"
                onClick={deleteItem}
            />
        </li>
    );
}

function Footer({ items, setItems, setSortedItems }) {
	const [sortBy, setSortyBy] = useState("All");
	if (sortBy === "All"){

	}
	if (sortBy === "Complete"){
		let sorted = items.slice().sort((a,b) => Number(a.checked)-Number(b.checked))
		console.log(sorted);
		
	}

    function clearComplete() {
        setItems((items) => items.filter((item) => item.checked === false));
    }
    return (
        <div className="footer-box">
            <p>{items.length} items left</p>
            <div className="footer-list">
                <p className={`footer-option${sortBy==="All" ? " active-option": ""}`} onClick={() =>setSortyBy("All")}>All</p>
                <p className={`footer-option${sortBy==="Active" ? " active-option": ""}`} onClick={() =>setSortyBy("Active")}>Active</p>
                <p className={`footer-option${sortBy==="Complete" ? " active-option": ""}`} onClick={() =>setSortyBy("Complete")}>Complete</p>
            </div>
            <p className="footer-option" onClick={clearComplete}>
                Clear completed
            </p>
        </div>
    );
}
