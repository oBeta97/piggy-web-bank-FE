import { ThemeProvider } from '@mui/material'
import './App.css'
import { BaseBackground } from './components/BaseComponents/BaseBackground'
import MyMainPage from './components/MyMainPage'
import myTheme from './modules/Theme'

function App() {

  return (
    <ThemeProvider theme={myTheme}>
      <BaseBackground ChildComponent={<MyMainPage />}></BaseBackground>
    </ThemeProvider>

  )
}

export default App
