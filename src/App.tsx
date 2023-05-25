import { useState } from 'react'
import './App.css'

function App() {
  const [dish, setDish] = useState<string>("")
  const [formResponse, setFormResponse] = useState({})
  console.log(dish)

  async function postData(data) {
    const url = "https://umzzcc503l.execute-api.us-west-2.amazonaws.com/dishes/"
    
    const response = await fetch(url, {
      method: "POST"
      headers: {
        "Content-Type": "application/json"
      }
      body: JSON.stringify(data)
    })
    
    return response.json()
  }

  const sendData = (event) => {
    const formElement = event.target
    event.preventDefault()
    const formData = new FormData(formElement)
    const formObject = Object.fromEntries(formData)
    const response = await postData(formObject)
    setFormResponse(response)
  }
  
  return (
    <form onSubmit={sendData}>
      <h1>Dishes Task</h1>
      <fieldset>
        <label className="inputBox">Dish Name
          <input type="text" name="name" placeholder="what dish?" required={true}/>
        </label>
      </fieldset>
      <fieldset>
        <label className="inputBox">Preparation Time</label>
          <input name="preparation_time" type="time" step="2" required={true}/>
      </fieldset>
      <label className="selectBox">Select a Dish
        <div className="dish-selection">
          <select onChange={({target}) => setDish(target.value)}>
            <option hidden> -- Select an Option -- </option>
            <option>Pizza</option>
            <option>Soup</option>
            <option>Sandwich</option>
          </select>
        </div>
        {dish === "Pizza" && (
          <div className="pizza-choices">
            <input className="no-of-slices" placeholder="number of slices" type="number"/>
            <input className="diameter" placeholder="diameter of the pizza" step="0.01" type="number"/>
          </div>
        )}
        {dish === "Soup" && (
        <div className="soup-choices">
          <input className="spiciness-scale" placeholder="spiciness scale" min="1" max="10" type="number"/>
        </div>
        )}
        {dish === "Sandwich" && (
        <div className="sandwich-choices">
          <input className="slices-of-bread" placeholder="slices of bread" type="number"/>
        </div>
        )}
      </label>
      <div className="inputBox">
        <input type="submit" name="" value="Send"/>
      </div>
    </form>
  )
}

export default App
