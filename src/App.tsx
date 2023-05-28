import { useState } from 'react'
import Form from './Form.tsx'
import { FormResponse } from './types.ts'
import './App.css'

const App = () => {
  const [formResponse, setFormResponse] = useState<FormResponse|null>(null)
  console.log(formResponse)
  
  return (
    <>
      <h1>Dishes Task</h1>
      <div className="paper">
        {formResponse ? (
          <div style={{color: 'black'}}>{formResponse.name} Form Sent
            <button onClick={() => setFormResponse(null)}>Send Another</button>
          </div>
          )
          : (
            <Form setFormResponse={setFormResponse}></Form>
          )
        }
      </div>
    </>
  )
}

export default App
