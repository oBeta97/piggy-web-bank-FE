import './App.css'
import { BaseBackground } from './components/BaseBackground'
import MyMainPage from './components/MyMainPage'

function App() {

  return (

    <BaseBackground ChildComponent={<MyMainPage />}></BaseBackground>

  )
}

export default App
