import './App.css'
import { BaseBackground } from './components/BaseBackground'
import TestComponent from './components/test'

function App() {

  return (

    <BaseBackground ChildComponent={<TestComponent />}></BaseBackground>

  )
}

export default App
