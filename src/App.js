function App() {
  const handleNameChange = () => {
    const names = ['Bob', ' Kevin' , 'Dave', 'James', 'Anna', 'Mary', 'Nicolle'];
    const int = Math.floor(Math.random() * 7);
    return names[int];
  }
  return(
    <div className="App">
      
      <p>
        Hello {handleNameChange()}!
      </p>
      
    </div>
  );
}


export default App;
