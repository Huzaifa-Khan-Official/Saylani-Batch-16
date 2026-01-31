function Card({ id, title, description, createdAt, deleteItem }) {
  return (
    <div>
      <h1>{title}</h1>
      <span>{description}</span>
      <span>{createdAt}</span>
      <button onClick={() => deleteItem(id)}>Delete</button>
    </div>
  )
}

export default Card