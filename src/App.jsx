import { useState, useEffect } from 'react'

function App() {
  const [producto, setProducto] = useState('')
  const [precio, setPrecio] = useState('')
  const [lista, setLista] = useState([])
  const [baseProductos, setBaseProductos] = useState([])
  const [historial, setHistorial] = useState([])
  const [cargadoInicial, setCargadoInicial] = useState(false)

  // Cargar al iniciar
  useEffect(() => {
    const datosLista = localStorage.getItem('listaCompra')
    const datosBase = localStorage.getItem('baseProductos')
    const datosHistorial = localStorage.getItem('historialCompras')

    if (datosLista) setLista(JSON.parse(datosLista))
    if (datosBase) setBaseProductos(JSON.parse(datosBase))
    if (datosHistorial) setHistorial(JSON.parse(datosHistorial))

    setCargadoInicial(true)
  }, [])

  // Guardar solo después de cargar
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

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      agregarABase()
    }
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

  const borrarListaCompleta = () => {
    setLista([])
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>🍽️ Come y Calla</h1>

      <div style={{ marginTop: '1rem' }}>
        <p style={{ fontSize: '1rem', color: '#666', marginBottom: '0.5rem' }}>
          Añadir nuevo producto a la base de datos:
        </p>
        <input
          type="text"
          placeholder="Producto"
          value={producto}
          onChange={(e) => setProducto(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <input
          type="number"
          placeholder="Precio (€)"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          onKeyPress={handleKeyPress}
          style={{ marginLeft: '0.5rem' }}
        />
        <button
          onClick={agregarABase}
          style={{
            marginLeft: '0.5rem',
            borderRadius: '30px',
            padding: '0.5rem 1rem',
            backgroundColor: '#1976d2',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Agregar a base de datos
        </button>
      </div>

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
                al carrito ⤵️
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
          style={{
            marginTop: '1rem',
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '0.5rem 1rem',
            border: 'none',
            borderRadius: '30px',
            marginRight: '1rem',
            cursor: 'pointer',
          }}
        >
          ✅ Compra realizada
        </button>

        <button
          onClick={borrarListaCompleta}
          style={{
            marginTop: '1rem',
            backgroundColor: '#f44336',
            color: 'white',
            padding: '0.5rem 1rem',
            border: 'none',
            borderRadius: '30px',
            cursor: 'pointer',
          }}
        >
          🗑️ Borrar toda la lista
        </button>
      </div>
    </div>
  )
}

export default App
