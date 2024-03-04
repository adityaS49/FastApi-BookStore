import BookForm from "./components/BookForm";
import BookList from "./components/BookList";
import "./App.css"
function App() {
  return (
    <div className="flex flex-col p-4 items-center justify-center ">
   
    <BookForm/>
    <BookList />
  </div>
  );
}

export default App;
