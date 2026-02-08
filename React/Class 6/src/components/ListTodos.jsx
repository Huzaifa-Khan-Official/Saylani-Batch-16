function ListTodos({ data, loading }) {
  return (
    <div>
      {
        loading && (
          <div class="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        )
      }

      <ul>
        {
          data.map((item, index) => (
            <li key={index}>{item.todo}</li>
          ))
        }
      </ul>
    </div>
  )
}

export default ListTodos