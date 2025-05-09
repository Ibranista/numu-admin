import { useDispatch, useSelector } from "react-redux";
import { amountAdded } from "./features/counter/counter.slice";
import { selectCount } from "./features/counter/selector";

function App() {
  const dispatch = useDispatch();
  const count = useSelector(selectCount);

  const handleAdd = () => {
    dispatch(amountAdded(1));
  };

  return (
    <>
      <h1>Count: {count}</h1>
      <button onClick={handleAdd}>Add</button>
    </>
  );
}

export default App;
