import { useState, FormEvent } from 'react'

const Form = ({setFormResponse}) => {
  const [dish, setDish] = useState<string>("")

  const postData = async(data: object) => {
    const url = "https://umzzcc503l.execute-api.us-west-2.amazonaws.com/dishes/"
    
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
        data[property] = valueNumber
      } else if (isNumber) {
        data[property] = valueNumber
      }
    }
    return data
  }

  const sendData = async(event: FormEvent) => {
    if (event.target instanceof HTMLFormElement) {
      const formElement:HTMLFormElement = event.target
      event.preventDefault()
      const formData = new FormData(formElement)
      const formObject = Object.fromEntries(formData)
      const formatedData = formatNumbers(formObject)
      const response = await postData(formatedData)
      setFormResponse(response)
    }
  }
  return (
    <form onSubmit={sendData}>
      <label className="select-label">Select a Dish</label>
      <div className="dish-selection">
        <select className="input-class" name="type" onChange={({target}) => setDish(target.value)}>
          <option hidden> -- Select an Option -- </option>
          <option>pizza</option>
          <option>soup</option>
          <option>sandwich</option>
        </select>
        </div>
        <div className="wrapper">
        <fieldset>
          <label className="input-label">Dish Name</label>
          <input className="dish-name input-class" type="text" name="name" placeholder="what dish?" required={true}/>
        </fieldset>
        <fieldset>
          <label className="input-label">Preparation Time</label>
          <input className="prep-time input-class" name="preparation_time" type="time" step="1" required={true}/>
        </fieldset>
        {dish === "pizza" && (
          <>
            <fieldset className="pizza-choices">
              <label className="input-label">How many slices?</label>
              <input className="slices input-class" name="no_of_slices" placeholder="number of slices" type="number" required={true}/>
            </fieldset>
            <fieldset className="pizza-choices">
              <label className="input-label">What is the diameter?</label>
              <input className="diameter input-class" name="diameter" onBlur={({target}) => target.value = Number(target.value).toFixed(1)} min="0" placeholder="diameter of the pizza" step="0.1" type="number" required={true}/>
            </fieldset>
          </>
        )}
        {dish === "soup" && (
          <div className="soup-choices">
            <label className="input-label">How spicy is it?</label>
            <input className="spice-scale input-class" name="spiciness_scale" placeholder="spiciness scale" min="1" max="10" type="number" required={true}/>
          </div>
        )}
        {dish === "sandwich" && (
          <div className="sandwich-choices">
            <label className="input-label">How many slices?</label>
            <input className="bread-slices input-class" name="slices_of_bread" placeholder="slices of bread" type="number" required={true}/>
          </div>
        )}
        <div className="button">
          <input type="submit" name="" value="Send"/>
        </div>
      </div>
    </form>
  )
}

export default Form