import { useState, useEffect } from 'react'

function App() {
  const [producto, setProducto] = useState('')
  const [precio, setPrecio] = useState('')
  const [lista, setLista] = useState([])
  const [baseProductos, setBaseProductos] = useState([])
  const [historial, setHistorial] = useState([]) // 🆕
  const [cargadoInicial, setCargadoInicial] = useState(false)

  // Cargar datos guardados al iniciar
  useEffect(() => {
    const datosLista = localStorage.getItem('listaCompra')
    const datosBase = localStorage.getItem('baseProductos')
    const datosHistorial = localStorage.getItem('historialCompras')

    if (datosLista) setLista(JSON.parse(datosLista))
    if (datosBase) setBaseProductos(JSON.parse(datosBase))
    if (datosHistorial) setHistorial(JSON.parse(datosHistorial))

    setCargadoInicial(true)
  }, [])

  // Guardar cambios
  useEffect(() => {
    if (cargadoInicial) {
      localStorage.setItem('listaCompra', JSON.stringify(lista))
    }
  }, [lista, cargadoInicial])

  useEffect(() => {
    if (cargadoInicial) {
      localStorage.setItem('baseProductos', JSON.stringify(baseProductos))
    }
  }, [baseProductos, cargadoInicial])

  useEffect(() => {
    if (cargadoInicial) {
      localStorage.setItem('historialCompras', JSON.stringify(historial))
    }
  }, [historial, cargadoInicial])

  const agregarALista = (productoBase) => {
    setLista([...lista, productoBase])
  }

  const agregarABase = () => {
    const precioNumerico = parseFloat(precio)

    if (
      producto.trim() === '' ||
      precio.trim() === '' ||
      isNaN(precioNumerico) ||
      precioNumerico <= 0
    ) {
      return
    }

    const nuevoProducto = {
      nombre: producto,
      precio: precioNumerico,
    }

    setBaseProductos([...baseProductos, nuevoProducto])
    setProducto('')
    setPrecio('')
  }

  const eliminarProductoLista = (index) => {
    setLista(lista.filter((_, i) => i !== index))
  }

  const eliminarProductoBase = (index) => {
    setBaseProductos(baseProductos.filter((_, i) => i !== index))
  }

  const compraRealizada = () => {
    if (lista.length === 0) return

    const fecha = new Date().toLocaleString()
    const total = lista.reduce((acc, item) => acc + item.precio, 0)

    const nuevaCompra = {
      fecha,
      productos: lista,
      total,
    }

    setHistorial([...historial, nuevaCompra])
    setLista([])
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>🍽️ Come y Calla</h1>

      {/* Sección: Añadir nuevo producto a la base */}
      <div style={{ marginTop: '1rem' }}>
        <h2>➕ Añadir a base de productos</h2>
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
        <button onClick={agregarABase} style={{ marginLeft: '0.5rem' }}>
          Agregar a base
        </button>
      </div>

      {/* Sección: Base de productos */}
      <div style={{ marginTop: '2rem' }}>
        <h2>📦 Productos disponibles</h2>
        <ul>
          {baseProductos.map((item, index) => (
            <li key={index} style={{ marginBottom: '0.5rem' }}>
              {item.nombre} - {item.precio.toFixed(2)} €
              <button
                onClick={() => agregarALista(item)}
                style={{ marginLeft: '1rem' }}
              >
                ➕ a lista
              </button>
              <button
                onClick={() => eliminarProductoBase(index)}
                style={{ marginLeft: '0.5rem' }}
              >
                🗑️
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Sección: Lista de la compra */}
      <div style={{ marginTop: '2rem' }}>
        <h2>🛒 Lista de la compra</h2>
        <ul>
          {lista.map((item, index) => (
            <li key={index} style={{ marginBottom: '0.5rem' }}>
              {item.nombre} - {item.precio.toFixed(2)} €
              <button
                onClick={() => eliminarProductoLista(index)}
                style={{ marginLeft: '1rem' }}
              >
                🗑️
              </button>
            </li>
          ))}
        </ul>

        <p style={{ fontWeight: 'bold', marginTop: '1rem' }}>
          Total: {lista.reduce((acc, item) => acc + item.precio, 0).toFixed(2)} €
        </p>

        <button
          onClick={compraRealizada}
          style={{ marginTop: '1rem', backgroundColor: '#4CAF50', color: 'white', padding: '0.5rem 1rem', border: 'none', borderRadius: '5px' }}
        >
          ✅ Compra realizada
        </button>
      </div>
    </div>
  )
}

export default App
