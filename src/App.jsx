import { useState, useEffect } from 'react'

function App() {
  const [producto, setProducto] = useState('')
  const [precio, setPrecio] = useState('')
  const [lista, setLista] = useState([])
  const [cargadoInicial, setCargadoInicial] = useState(false) // 👈 nuevo estado

  // Cargar lista guardada al iniciar
  useEffect(() => {
    const datosGuardados = localStorage.getItem('listaCompra')
    if (datosGuardados) {
      setLista(JSON.parse(datosGuardados))
    }
    setCargadoInicial(true) // ✅ solo guardaremos después de esto
  }, [])

  // Guardar lista cada vez que cambie, solo si ya fue cargada
  useEffect(() => {
    if (cargadoInicial) {
      localStorage.setItem('listaCompra', JSON.stringify(lista))
    }
  }, [lista, cargadoInicial])

  const agregarProducto = () => {
    const precioNumerico = parseFloat(precio)

    if (
      producto.trim() === '' ||
      precio.trim() === '' ||
      isNaN(precioNumerico) ||
      precioNumerico <= 0
    ) {
      return
    }

    const nuevoItem = {
      nombre: producto,
      precio: precioNumerico,
    }

    setLista([...lista, nuevoItem])
    setProducto('')
    setPrecio('')
  }

  const eliminarProducto = (indexAEliminar) => {
    setLista(lista.filter((_, index) => index !== indexAEliminar))
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
          <li key={index} style={{ marginBottom: '0.5rem' }}>
            🛒 {item.nombre} - {item.precio.toFixed(2)} €
            <button
              onClick={() => eliminarProducto(index)}
              style={{ marginLeft: '1rem' }}
            >
              🗑️
            </button>
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
