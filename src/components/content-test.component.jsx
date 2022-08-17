import { useState } from "react";

const Content = () => {

    const [name, setName] = useState('Delano');
    const [count, setCount] = useState(0);
    
    const handleNameChange = () => {
        const names = ['Bob', ' Kevin' , 'Dave', 'James', 'Anna', 'Mary', 'Nicolle', 'Rachel'];
        const int = Math.floor(Math.random() * names.length);
        setName( names[int]);
    }

    const handleClick = () => {
        setCount(count+1);
        console.log(count);
    }

    const handleClick2 = (name) => {
        console.log(`${name} was clicked`);
    }

    const handleClick3 = (e) => {
        console.log(e.target.innerText);
    }

  return (
    <main>
        <p onDoubleClick={handleClick}>
            Hello { name }!
        </p>
        <button onClick={handleNameChange}>Change name</button>
        <button onClick={handleClick}>Click me</button>
        <button onClick={(e) => {handleClick3(e)}}>Click me</button>
    </main>
  )
}

export default Content