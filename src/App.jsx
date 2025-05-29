import { useState, useEffect } from 'react'

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
  const [lista, setLista] = useState([])
  const [baseProductos, setBaseProductos] = useState([])
  const [historial, setHistorial] = useState([])
  const [cargadoInicial, setCargadoInicial] = useState(false)
  const [vistaActual, setVistaActual] = useState('lista')
  const [editandoIndex, setEditandoIndex] = useState(null) // 👈 NUEVO

  useEffect(() => {
    const datosLista = localStorage.getItem('listaCompra')
    const datosBase = localStorage.getItem('baseProductos')
    const datosHistorial = localStorage.getItem('historialCompras')

    if (datosLista) setLista(JSON.parse(datosLista))
    if (datosBase) setBaseProductos(JSON.parse(datosBase))
    if (datosHistorial) setHistorial(JSON.parse(datosHistorial))

    setCargadoInicial(true)
  }, [])

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

    const nuevoProducto = {
      nombre: producto,
      precio: precioNumerico,
      imagen: imagen.trim(),
      local: local.trim(),
      fecha: fecha.trim(),
      unidades: unidadesNumericas,
      categoria: categoria.trim()
    }

    if (editandoIndex !== null) {
      const nuevaBase = [...baseProductos]
      nuevaBase[editandoIndex] = nuevoProducto
      setBaseProductos(nuevaBase)
      setEditandoIndex(null)
    } else {
      setBaseProductos([...baseProductos, nuevoProducto])
    }

    setProducto('')
    setPrecio('')
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
  }

  const eliminarProductoLista = (index) => {
    setLista(lista.filter((_, i) => i !== index))
  }

  const eliminarProductoBase = (index) => {
    setBaseProductos(baseProductos.filter((_, i) => i !== index))
  }

  const editarProductoBase = (index) => {
    const prod = baseProductos[index]
    setProducto(prod.nombre)
    setPrecio(prod.precio)
    setImagen(prod.imagen)
    setLocal(prod.local)
    setFecha(prod.fecha)
    setUnidades(prod.unidades)
    setCategoria(prod.categoria)
    setEditandoIndex(index)
    setVistaActual('base') // por si estaba en la lista
  }

  const compraRealizada = () => {
    if (lista.length === 0) return

    const fechaCompra = new Date().toLocaleString()
    const total = lista.reduce((acc, item) => acc + item.precio * (item.unidades || 1), 0)

    const nuevaCompra = {
      fecha: fechaCompra,
      productos: lista,
      total
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

      <div style={{ marginBottom: '1rem' }}>
        <button onClick={() => setVistaActual('lista')}>🛒 Ver Lista</button>
        <button onClick={() => setVistaActual('base')}>📦 Ver productos disponibles</button>
      </div>

      <h2>{editandoIndex !== null ? '✏️ Editar producto' : '➕ Añadir a base de productos'}</h2>
      <div style={{ marginBottom: '1rem' }}>
        <input placeholder="Nombre" value={producto} onChange={e => setProducto(e.target.value)} onKeyPress={handleKeyPress} />
        <input type="number" placeholder="Precio (€)" value={precio} onChange={e => setPrecio(e.target.value)} onKeyPress={handleKeyPress} />
        <input placeholder="Imagen (ej: manzana.png)" value={imagen} onChange={e => setImagen(e.target.value)} />
        <input placeholder="Local de compra" value={local} onChange={e => setLocal(e.target.value)} />
        <input type="date" value={fecha} onChange={e => setFecha(e.target.value)} />
        <input type="number" placeholder="Unidades" value={unidades} onChange={e => setUnidades(e.target.value)} />
        <select value={categoria} onChange={e => setCategoria(e.target.value)}>
          <option value="">Selecciona categoría</option>
          {categoriasPredefinidas.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
        <button onClick={agregarABase} style={{
          marginLeft: '0.5rem',
          borderRadius: '30px',
          padding: '0.4rem 1rem',
          backgroundColor: editandoIndex !== null ? '#ffa500' : '#007bff',
          color: 'white',
          border: 'none',
          cursor: 'pointer'
        }}>
          {editandoIndex !== null ? 'Actualizar producto' : 'Guardar en base'}
        </button>
      </div>

      {vistaActual === 'base' && (
        <>
          <h2>📦 Productos disponibles</h2>
          {categoriasPredefinidas.concat('Sin categoría').sort().map((cat, i) => {
            const productosFiltrados = baseProductos.filter(
              p => (p.categoria || 'Sin categoría').toLowerCase() === cat.toLowerCase()
            )
            if (productosFiltrados.length === 0) return null

            return (
              <div key={i}>
                <h3 style={{ marginTop: '1rem', color: '#333' }}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </h3>
                <ul>
                  {productosFiltrados.map((item, indexGlobal) => {
                    const indexReal = baseProductos.findIndex(p =>
                      p.nombre === item.nombre &&
                      p.precio === item.precio &&
                      p.imagen === item.imagen &&
                      p.local === item.local &&
                      p.fecha === item.fecha &&
                      p.unidades === item.unidades &&
                      p.categoria === item.categoria
                    )

                    return (
                      <li key={indexReal} style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
                        {item.imagen && (
                          <img src={`/imagenes/${item.imagen}`} alt="img" style={{ width: '40px', height: '40px', marginRight: '1rem' }} />
                        )}
                        <div style={{ flex: 1 }}>
                          <strong>{item.nombre}</strong> - {item.precio.toFixed(2)} € - {item.unidades} u. - {item.categoria || 'Sin categoría'}
                          <div style={{ fontSize: '0.8rem', color: '#666' }}>
                            {item.local} - {item.fecha}
                          </div>
                        </div>
                        <button onClick={() => agregarALista(item)} style={{ marginLeft: '0.5rem' }}>🛒</button>
                        <button onClick={() => editarProductoBase(indexReal)} style={{ marginLeft: '0.5rem' }}>✏️</button>
                        <button onClick={() => eliminarProductoBase(indexReal)} style={{ marginLeft: '0.5rem' }}>🗑️</button>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })}
        </>
      )}

      {vistaActual === 'lista' && (
        <>
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

          <button onClick={compraRealizada} style={{
            marginTop: '1rem',
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '0.5rem 1rem',
            border: 'none',
            borderRadius: '30px',
            marginRight: '1rem',
            cursor: 'pointer'
          }}>
            ✅ Compra realizada
          </button>

          <button onClick={borrarListaCompleta} style={{
            marginTop: '1rem',
            backgroundColor: '#f44336',
            color: 'white',
            padding: '0.5rem 1rem',
            border: 'none',
            borderRadius: '30px',
            cursor: 'pointer'
          }}>
            🗑️ Borrar toda la lista
          </button>
        </>
      )}
    </div>
  )
}

export default App
