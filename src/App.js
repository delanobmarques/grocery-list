import { useState } from "react";
import Content from "./components/content.component";
import Footer from "./components/footer.component";
import Header from "./components/header.component";

function App() {  

  const [items, setItems] = useState([
    {
        id: 1,
        checked: false,
        item: "Eggs",
    },
    {
        id: 2,
        checked: false,
        item: "Apples",
    },
    {
        id: 3,
        checked: false,
        item: "Milk",
    },
  ]);

  const handleCheck = (id) => {
    const listItems = items.map((item) => item.id === id ? { ...item, checked: !item.checked } : item);
    setItems(listItems);
    localStorage.setItem('shoppinglist', JSON.stringify(listItems));
  }

  const handleDelete = (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);
    localStorage.setItem('shoppinglist', JSON.stringify(listItems));
  }

  return(
    <div className="App">
      <Header title="Shopping List"/>     
      <Content 
        items={ items }
        handleCheck = { handleCheck }
        handleDelete = { handleDelete } 
      />
      <Footer length={ items.length }/>
    </div>
  );

}


export default App;
