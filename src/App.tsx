import './App.css'
import { BaseBackground } from './components/BaseBackground'
import TestComponent from './components/test'
import './style/arc.css'

function App() {

  return (

    <BaseBackground ChildComponent={<TestComponent />}></BaseBackground>

  )
}

export default App
