import Card from "./components/Card"
import Footer from "./components/Footer"
import Header from "./components/Header"

// 1) Props passing to the component

const data = [
  {
    id: "1",
    title: "Title 1",
    description: "Description 1",
    createdAt: "31/01/2026"
  },
  {
    id: "2",
    title: "Title 2",
    description: "Description 2",
    createdAt: "31/01/2026"
  },
  {
    id: "3",
    title: "Title 3",
    description: "Description 3",
    createdAt: "31/01/2026"
  },
  {
    id: "4",
    title: "Title 4",
    description: "Description 4",
    createdAt: "31/01/2026"
  },
]

function App() {
  const deleteItem = (id) => {
    console.log("deleteItem clicked ==>", id);
  }
  return (
    <div>
      <Header />
      <p>App</p>
      {/* <Card /> */}
      {/* {
        data.map((item, index) => (
          <div key={index}>
            <Card item={item} />
            <Card id={item.id} title={item.title} description={item.description} createdAt={item.createdAt} deleteItem={deleteItem} />
          </div>
        ))
      } */}

      {
        data.map((item, index) => {
          return (
            <Card key={index} id={item.id} title={item.title} description={item.description} createdAt={item.createdAt} deleteItem={deleteItem} />
          )
        })
      }
      <Footer />
    </div>
  )
}

export default App