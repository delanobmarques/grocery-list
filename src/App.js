import { useEffect, useState } from "react";
import AddItem from "./components/add-item";
import Content from "./components/content.component";
import Footer from "./components/footer.component";
import Header from "./components/header.component";
import SearchItem from "./components/search-item";
import apiRequest from "./components/apiRequest";

function App() {  
  
  const apiURL = 'http://localhost:3500/items';

  //if it's the first time the app is used it should be able to start with an empty array since there's a shoppinglist in LocalStorage yet
  const [items, setItems] = useState([]); 
  const [newItem, setNewItem] = useState('');
  const [search, setSearch] = useState('');
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    const fetchItems = async () => {
      try {
        const response = await fetch(apiURL);
        if (!response.ok) throw Error('Sorry, something went wrong...Did not receive expected data');
        const listItems = await response.json();
        setItems(listItems);
        setFetchError(null);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    //simulate call from api
    setTimeout(() => fetchItems(), 2000);
    
  },[])

  const addItem = async (item) => {
    const id = items.length ? items[items.length-1].id + 1 : 1;
    const myNewItem = { id, checked:false, item };
    const listItems = [...items, myNewItem];
    setItems(listItems);

    const postOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(myNewItem)
    }

    const errorMessage = await apiRequest(apiURL, postOptions);
    if (errorMessage) setFetchError(errorMessage);
  }

  const handleCheck = async (id) => {
    const listItems = items.map((item) => item.id === id ? { ...item, checked: !item.checked } : item);
    setItems(listItems);

    const myItem = listItems.filter((item) => item.id === id);
    const updateOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ checked: myItem[0].checked })
    };
    const requestUrl = `${apiURL}/${id}`;
    const errorMessage = await apiRequest(requestUrl, updateOptions);
    if (errorMessage) setFetchError(errorMessage);

  }

  const handleDelete = async (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);

    const deleteOptions = { method: 'DELETE' };
    const reqUrl = `${apiURL}/${id}`;
    const errorMessage = await apiRequest(reqUrl, deleteOptions);
    if (errorMessage) setFetchError(errorMessage);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    addItem(newItem);
    setNewItem('');
  }

  return(
    <div className="App">
      <Header title="Shopping List"/>           
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem 
        search={search} 
        setSearch={setSearch} 
      />
      <main>
        { isLoading && <p>Loading Items...</p>}
        { fetchError && <p style={{color:"red"}}>{`Error: ${fetchError}`}</p> }
        { !fetchError && !isLoading && <Content 
            items={ items.filter(item => ((item.item).toLowerCase().includes(search.toLowerCase()))) }
            handleCheck = { handleCheck }
            handleDelete = { handleDelete } 
          />
        }
      </main>
      <Footer length={ items.length }/>
    </div>
  );

}


export default App;
