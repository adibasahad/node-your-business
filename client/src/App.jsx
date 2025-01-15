import Addtodo from "./Components/Addtodo";
import Headder from "./Components/Headder";
import Todolist from "./Components/Todolist";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


const App = () => {
  return (
    <div>
      <Headder />
      <Addtodo />
      <Todolist />
      <ToastContainer />
    </div>
  );
}

export default App;
