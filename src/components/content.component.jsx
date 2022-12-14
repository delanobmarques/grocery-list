import ItemList from "./item-list.component";
const Content = ({items, handleCheck, handleDelete}) => {    

  return (
    <>
        { items.length ? (
            <ItemList 
                items={items}
                handleCheck={handleCheck}
                handleDelete={handleDelete}
            />
        ) : (
            <p style={{color:"#aaf", marginTop:"2rem"}}>Your Shopping List is Empty</p>
        )}
        
    </>
  )
}

export default Content;