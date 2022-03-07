import { useEffect } from "react"

function App() {
  useEffect(() => {
    fetch("/data").then((resp) => resp.json()).then((resp) => {
      console.log(resp)
    })
  }, [])

  return (
    <div>
      <></>
      hello
    </div>
  );
}

export default App;
