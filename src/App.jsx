import { useState, useEffect } from 'react'

<<<<<<< HEAD
function App() {
  const [producto, setProducto] = useState('')
  const [precio, setPrecio] = useState('')
=======
const categoriasPredefinidas = [
  'bebidas',
  'carnes y pescados',
  'despensa y enlatados',
  'frutas y verduras',
  'higiene personal',
  'lácteos',
  'limpieza y hogar',
  'pan y cereales',
  'snacks y dulces'
]

function App() {
  const [producto, setProducto] = useState('')
  const [precio, setPrecio] = useState('')
  const [imagen, setImagen] = useState('')
  const [local, setLocal] = useState('')
  const [fecha, setFecha] = useState('')
  const [unidades, setUnidades] = useState(1)
  const [categoria, setCategoria] = useState('')
>>>>>>> 8b5da89 (paso 12)
  const [lista, setLista] = useState([])
  const [baseProductos, setBaseProductos] = useState([])
  const [historial, setHistorial] = useState([])
  const [cargadoInicial, setCargadoInicial] = useState(false)

<<<<<<< HEAD
  // Cargar al iniciar
=======
  // Cargar datos del localStorage al iniciar
>>>>>>> 8b5da89 (paso 12)
  useEffect(() => {
    const datosLista = localStorage.getItem('listaCompra')
    const datosBase = localStorage.getItem('baseProductos')
    const datosHistorial = localStorage.getItem('historialCompras')

    if (datosLista) setLista(JSON.parse(datosLista))
    if (datosBase) setBaseProductos(JSON.parse(datosBase))
    if (datosHistorial) setHistorial(JSON.parse(datosHistorial))

    setCargadoInicial(true)
  }, [])

<<<<<<< HEAD
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
=======
  // Guardar automáticamente en localStorage
  useEffect(() => {
    if (cargadoInicial) {
      localStorage.setItem('listaCompra', JSON.stringify(lista))
      localStorage.setItem('baseProductos', JSON.stringify(baseProductos))
      localStorage.setItem('historialCompras', JSON.stringify(historial))
    }
  }, [lista, baseProductos, historial, cargadoInicial])

  const agregarABase = () => {
    const precioNumerico = parseFloat(precio)
    const unidadesNumericas = parseInt(unidades)

    if (
      producto.trim() === '' ||
      isNaN(precioNumerico) || precioNumerico <= 0 ||
      unidadesNumericas <= 0
    ) return
>>>>>>> 8b5da89 (paso 12)

    const nuevoProducto = {
      nombre: producto,
      precio: precioNumerico,
<<<<<<< HEAD
=======
      imagen: imagen.trim(),
      local: local.trim(),
      fecha: fecha.trim(),
      unidades: unidadesNumericas,
      categoria: categoria.trim()
>>>>>>> 8b5da89 (paso 12)
    }

    setBaseProductos([...baseProductos, nuevoProducto])
    setProducto('')
    setPrecio('')
<<<<<<< HEAD
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      agregarABase()
    }
=======
    setImagen('')
    setLocal('')
    setFecha('')
    setUnidades(1)
    setCategoria('')
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') agregarABase()
  }

  const agregarALista = (productoBase) => {
    setLista([...lista, productoBase])
>>>>>>> 8b5da89 (paso 12)
  }

  const eliminarProductoLista = (index) => {
    setLista(lista.filter((_, i) => i !== index))
  }

  const eliminarProductoBase = (index) => {
    setBaseProductos(baseProductos.filter((_, i) => i !== index))
  }

  const compraRealizada = () => {
    if (lista.length === 0) return

<<<<<<< HEAD
    const fecha = new Date().toLocaleString()
    const total = lista.reduce((acc, item) => acc + item.precio, 0)

    const nuevaCompra = {
      fecha,
      productos: lista,
      total,
=======
    const fechaCompra = new Date().toLocaleString()
    const total = lista.reduce((acc, item) => acc + item.precio * (item.unidades || 1), 0)

    const nuevaCompra = {
      fecha: fechaCompra,
      productos: lista,
      total
>>>>>>> 8b5da89 (paso 12)
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

<<<<<<< HEAD
      <div style={{ marginTop: '1rem' }}>
        <p style={{ fontSize: '1rem', color: '#666', marginBottom: '0.5rem' }}>
          Añadir nuevo producto a la base de datos:
        </p>
        <input
          type="text"
          placeholder="Producto"
          value={producto}
          onChange={(e) => setProducto(e.target.value)}
=======
      <h2>➕ Añadir a base de productos</h2>
      <div style={{ marginBottom: '1rem' }}>
        <input
          placeholder="Nombre"
          value={producto}
          onChange={e => setProducto(e.target.value)}
>>>>>>> 8b5da89 (paso 12)
          onKeyPress={handleKeyPress}
        />
        <input
          type="number"
          placeholder="Precio (€)"
          value={precio}
<<<<<<< HEAD
          onChange={(e) => setPrecio(e.target.value)}
          onKeyPress={handleKeyPress}
          style={{ marginLeft: '0.5rem' }}
        />
=======
          onChange={e => setPrecio(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <input
          placeholder="Imagen (ej: manzana.png)"
          value={imagen}
          onChange={e => setImagen(e.target.value)}
        />
        <input
          placeholder="Local de compra"
          value={local}
          onChange={e => setLocal(e.target.value)}
        />
        <input
          type="date"
          value={fecha}
          onChange={e => setFecha(e.target.value)}
        />
        <input
          type="number"
          placeholder="Unidades"
          value={unidades}
          onChange={e => setUnidades(e.target.value)}
        />

        <select
          value={categoria}
          onChange={e => setCategoria(e.target.value)}
          style={{ marginLeft: '0.5rem' }}
        >
          <option value="">Selecciona categoría</option>
          {categoriasPredefinidas.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>

>>>>>>> 8b5da89 (paso 12)
        <button
          onClick={agregarABase}
          style={{
            marginLeft: '0.5rem',
            borderRadius: '30px',
<<<<<<< HEAD
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
=======
            padding: '0.4rem 1rem',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Guardar en base
        </button>
      </div>

      <h2>📦 Productos disponibles</h2>
      <ul>
        {baseProductos.map((item, index) => (
          <li key={index} style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
            {item.imagen && (
              <img
                src={`/imagenes/${item.imagen}`}
                alt="img"
                style={{ width: '40px', height: '40px', marginRight: '1rem' }}
              />
            )}
            <div style={{ flex: 1 }}>
              <strong>{item.nombre}</strong> - {item.precio.toFixed(2)} € - {item.unidades} u. - {item.categoria}
              <div style={{ fontSize: '0.8rem', color: '#666' }}>
                {item.local} - {item.fecha}
              </div>
            </div>
            <button onClick={() => agregarALista(item)} style={{ marginLeft: '0.5rem' }}>🛒</button>
            <button onClick={() => eliminarProductoBase(index)} style={{ marginLeft: '0.5rem' }}>🗑️</button>
          </li>
        ))}
      </ul>

      <h2>🛒 Lista de la compra</h2>
      <ul>
        {lista.map((item, index) => (
          <li key={index}>
            {item.nombre} - {item.precio.toFixed(2)} € x {item.unidades || 1}
            <button onClick={() => eliminarProductoLista(index)} style={{ marginLeft: '0.5rem' }}>🗑️</button>
          </li>
        ))}
      </ul>

      <p style={{ fontWeight: 'bold' }}>
        Total: {lista.reduce((acc, item) => acc + item.precio * (item.unidades || 1), 0).toFixed(2)} €
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
          cursor: 'pointer'
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
          cursor: 'pointer'
        }}
      >
        🗑️ Borrar toda la lista
      </button>
>>>>>>> 8b5da89 (paso 12)
    </div>
  )
}

export default App
