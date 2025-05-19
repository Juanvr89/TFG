import { useState } from 'react'

function App() {
  const [producto, setProducto] = useState('')
  const [precio, setPrecio] = useState('')
  const [lista, setLista] = useState([])

  const agregarProducto = () => {
    if (producto.trim() === '' || precio.trim() === '') return

    const nuevoItem = {
      nombre: producto,
      precio: parseFloat(precio),
    }

    setLista([...lista, nuevoItem])
    setProducto('')
    setPrecio('')
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>🍽️ Come y Calla</h1>

      <div style={{ marginTop: '1rem' }}>
        <input
          type="text"
          placeholder="Producto"
          value={producto}
          onChange={(e) => setProducto(e.target.value)}
        />
        <input
          type="number"
          placeholder="Precio (€)"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          style={{ marginLeft: '0.5rem' }}
        />
        <button onClick={agregarProducto} style={{ marginLeft: '0.5rem' }}>
          Agregar
        </button>
      </div>

      <ul style={{ marginTop: '1rem' }}>
        {lista.map((item, index) => (
          <li key={index}>
            🛒 {item.nombre} - {item.precio.toFixed(2)} €
          </li>
        ))}
      </ul>

      <p style={{ marginTop: '1rem', fontWeight: 'bold' }}>
        Total: {lista.reduce((acc, item) => acc + item.precio, 0).toFixed(2)} €
      </p>
    </div>
  )
}

export default App
