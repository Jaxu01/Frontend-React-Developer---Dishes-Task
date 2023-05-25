import {  } from 'react'
import './App.css'

function App() {

  return (
    <form>
      <h1>Dishes Task</h1>
      <div className="inputBox">Dish Name
          <input type="text" name="" placeholder="what dish?" required={true}/>
      </div>
      <div className="inputBox">Preparation Time
          <input type="time" step="2" required={true}/>
      </div>
      <div className="selectBox">Select a Dish
        <label className="dish-selection">
          <select>
            <option>Pizza</option>
            <option>Soup</option>
            <option>Sandwich</option>
          </select>

        </label>
      </div>
      <div className="inputBox">
          <input type="submit" name="" value="Send"/>
      </div>
    </form>
  )
}

export default App
