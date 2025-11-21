import { SuspenseDataFetching } from "./SuspenseDataFetching";
import { UseEffectDataFetching } from "./UseEffectDataFetching";

function App() {
  return (
    <>
      <UseEffectDataFetching />
      <SuspenseDataFetching />
    </>
  );
}

export default App;
