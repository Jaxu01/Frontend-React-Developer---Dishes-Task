import { useState } from 'react'
import Form from './Form.tsx'
import { FormResponse } from './types.ts'

const App = () => {
  const [formResponse, setFormResponse] = useState<FormResponse|null>(null)
  console.log(formResponse)
  
  return (
    <>
      <h1>Dishes Task</h1>
      <div className="paper">
        {formResponse ? (
          <div className="text-confirmation">{formResponse.name} Form Sent
          <div className="checkmark-wrapper">
             <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"> <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/> <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/></svg>
          </div>
            <button className="send-another" onClick={() => setFormResponse(null)}>Send Another</button>
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
