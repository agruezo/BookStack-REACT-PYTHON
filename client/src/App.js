import { BrowserRouter, Routes, Route} from 'react-router-dom';
import AllBooks from './components/AllBooks';
import NewBook from './components/NewBook';
import EditBook from './components/EditBook';
import OneBook from './components/OneBook';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<AllBooks />} path="/" />
          <Route element={<AllBooks />} path="/books" />
          <Route element={<NewBook />} path="/book/new" />
          <Route element={<EditBook />} path="/book/edit/:id" />
          <Route element={<OneBook />} path="/book/:id" />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
