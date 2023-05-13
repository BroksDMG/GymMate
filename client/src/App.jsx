import {Routes,Route} from 'react-router-dom'
import LoginPage from './pages/LoginPage.jsx'
import IndexPage from './pages/IndexPAge.jsx'
import Layout from './components/Layout.jsx'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Layout/>}>
        
        <Route index element={<IndexPage/>}></Route>
        <Route path='/login' element={<LoginPage/>}></Route>
      </Route>
    </Routes>
    
  )
}

export default App
