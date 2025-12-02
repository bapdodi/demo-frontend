import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import PostDetail from './components/PostDetail';
import PostForm from './components/PostForm';
import PostList from './components/PostList';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
            <div className="container">
                <a className="navbar-brand" href="/">My Board</a>
            </div>
        </nav>
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/create" element={<PostForm />} />
          <Route path="/edit/:id" element={<PostForm />} />
          <Route path="/posts/:id" element={<PostDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
