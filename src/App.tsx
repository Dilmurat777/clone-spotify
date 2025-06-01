import { Button } from "./components/ui/button"


function App() {


  return (
    <>
   <h1 className="text-3xl font-bold underline text-red-500">
    Hello world!
  </h1>
   <div className="flex flex-wrap items-center gap-2 md:flex-row">
      <Button variant={"outline"}>Button</Button>
    </div>
    </>
  )
}

export default App
