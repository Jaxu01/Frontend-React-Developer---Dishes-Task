import { useState } from 'react'
import './App.css'

function App() {
  const [dish, setDish] = useState<string>("")
  const [formResponse, setFormResponse] = useState({})
  console.log(dish)

  const postData = async(data) => {
    const url = "https://umzzcc503l.execute-api.us-west-2.amazonaws.com/dishes/"
    console.log(JSON.stringify(data))
    
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    
    return response.json()
  }

  const formatNumbers = (data: object) => {
    for (const property in data) {
      const value = data[property]
      const valueNumber = Number(value)
      const isNumber = !!valueNumber
      const isFloat = isNumber && value.includes(".")
      if (isFloat) {
        console.log(valueNumber)
        data[property] = valueNumber
        console.log(data, property)
      } else if (isNumber) {
        data[property] = valueNumber
      }
      console.log(isNumber, property, value, isFloat)
    }
    return data
  }

  const sendData = async(event: Event) => {
    const formElement = event.target
    event.preventDefault()
    const formData = new FormData(formElement)
    const formObject = Object.fromEntries(formData)
    const formatedData = formatNumbers(formObject)
    const response = await postData(formatedData)
    setFormResponse(response)
  }
  
  return (
    <>
      <form onSubmit={sendData}>
        <h1>Dishes Task</h1>
        <fieldset>
          <label className="inputBox">Dish Name</label>
            <input className="dish-name" type="text" name="name" placeholder="what dish?" required={true}/>
        </fieldset>
        <fieldset>
          <label className="inputBox">Preparation Time</label>
            <input className="prep-time" name="preparation_time" type="time" step="1" required={true}/>
        </fieldset>
        <label className="selectBox">Select a Dish
          <div className="dish-selection">
            <select name="type" onChange={({target}) => setDish(target.value)}>
              <option hidden> -- Select an Option -- </option>
              <option>pizza</option>
              <option>soup</option>
              <option>sandwich</option>
            </select>
          </div>
          {dish === "pizza" && (
            <div className="pizza-choices">
              <input className="slices" name="no-of-slices" placeholder="number of slices" type="number"/>
              <input className="diameter" name="diameter" onBlur={({target}) => target.value = Number(target.value).toFixed(1)} min="0" placeholder="diameter of the pizza" step="0.1" type="number"/>
            </div>
          )}
          {dish === "soup" && (
          <div className="soup-choices">
            <input className="spice-scale" name="spiciness-scale" placeholder="spiciness scale" min="1" max="10" type="number"/>
          </div>
          )}
          {dish === "sandwich" && (
          <div className="sandwich-choices">
            <input className="bread-slices" name="slices-of-bread" placeholder="slices of bread" type="number"/>
          </div>
          )}
        </label>
        <div className="button">
          <input type="submit" name="" value="Send"/>
        </div>
      </form>
      {formResponse && (
        <div></div>
      )}
    </>
  )
}

export default App
