import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const categoriasPredefinidasIniciales = [
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
  const [nuevaCategoria, setNuevaCategoria] = useState('')
  const [categoriasPredefinidas, setCategoriasPredefinidas] = useState(categoriasPredefinidasIniciales)
  const [lista, setLista] = useState([])
  const [baseProductos, setBaseProductos] = useState([])
  const [historial, setHistorial] = useState([])
  const [cargadoInicial, setCargadoInicial] = useState(false)
  const [vistaActual, setVistaActual] = useState('lista')
  const [editarIndex, setEditarIndex] = useState(null)
  const [busqueda, setBusqueda] = useState('')

  useEffect(() => {
    const datosLista = localStorage.getItem('listaCompra')
    const datosBase = localStorage.getItem('baseProductos')
    const datosHistorial = localStorage.getItem('historialCompras')
    const categoriasGuardadas = localStorage.getItem('categoriasExtra')

    if (datosLista) setLista(JSON.parse(datosLista))
    if (datosBase) setBaseProductos(JSON.parse(datosBase))
    if (datosHistorial) setHistorial(JSON.parse(datosHistorial))
    if (categoriasGuardadas) {
      const extras = JSON.parse(categoriasGuardadas)
      setCategoriasPredefinidas([...categoriasPredefinidasIniciales, ...extras])
    }

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

    const categoriaFinal = nuevaCategoria.trim() !== '' ? nuevaCategoria.trim() : categoria.trim()

    if (
      producto.trim() === '' ||
      isNaN(precioNumerico) || precioNumerico <= 0 ||
      unidadesNumericas <= 0
    ) return

    if (nuevaCategoria.trim() !== '' && !categoriasPredefinidas.includes(nuevaCategoria.trim())) {
      const nuevas = [...categoriasPredefinidas, nuevaCategoria.trim()]
      setCategoriasPredefinidas(nuevas)
      localStorage.setItem('categoriasExtra', JSON.stringify(nuevas.filter(cat => !categoriasPredefinidasIniciales.includes(cat))))
    }

    const nuevoProducto = {
      nombre: producto,
      precio: precioNumerico,
      imagen: imagen,
      local: local.trim(),
      fecha: fecha.trim(),
      unidades: unidadesNumericas,
      categoria: categoriaFinal
    }

    if (editarIndex !== null) {
      const copia = [...baseProductos]
      copia[editarIndex] = nuevoProducto
      setBaseProductos(copia)
      setEditarIndex(null)

      toast.info('Producto modificado ✏️', {
        position: 'top-center',
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'light',
      })
    } else {
      setBaseProductos([...baseProductos, nuevoProducto])

      toast.success('Producto añadido! ☺️', {
        position: 'top-center',
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'light',
      })
    }

    setProducto('')
    setPrecio('')
    setImagen('')
    setLocal('')
    setFecha('')
    setUnidades(1)
    setCategoria('')
    setNuevaCategoria('')
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') agregarABase()
  }

  const handleImagenArchivo = (e) => {
    const archivo = e.target.files[0]
    if (!archivo) return

    const reader = new FileReader()
    reader.onloadend = () => {
      setImagen(reader.result)
    }
    reader.readAsDataURL(archivo)
  }

  const agregarALista = (productoBase) => {
    setLista([...lista, productoBase])
  }

  const eliminarProductoLista = (index) => {
    setLista(lista.filter((_, i) => i !== index))
  }

  const eliminarProductoBase = (index) => {
    setBaseProductos(baseProductos.filter((_, i) => i !== index))

    toast.error('Chao pescao! 🗑️', {
      position: 'top-center',
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: 'light',
    })
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
    setEditarIndex(index)
    setVistaActual('base')
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
      <ToastContainer />
      <h1>🍽️ Come y Calla</h1>

      <div style={{ marginBottom: '1rem' }}>
        <button onClick={() => setVistaActual('lista')}>🛒 Ver Lista</button>
        <button onClick={() => setVistaActual('base')}>📦 Ver productos disponibles</button>
        <button onClick={() => setVistaActual('historial')}>📜 Historial de compras</button>
      </div>

      <h2>{editarIndex !== null ? '✏️ Editar producto' : '➕ Añadir a base de productos'}</h2>
      <div style={{ marginBottom: '1rem' }}>
        <input placeholder="Nombre" value={producto} onChange={e => setProducto(e.target.value)} onKeyPress={handleKeyPress} />
        <input type="number" placeholder="Precio (€)" value={precio} onChange={e => setPrecio(e.target.value)} onKeyPress={handleKeyPress} />
        <input placeholder="URL de imagen (opcional)" value={imagen} onChange={e => setImagen(e.target.value)} />
        <input type="file" accept="image/*" onChange={handleImagenArchivo} />
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
        <input
          placeholder="...o escribe una nueva categoría"
          value={nuevaCategoria}
          onChange={e => setNuevaCategoria(e.target.value)}
        />

        <button onClick={agregarABase} style={{
          marginLeft: '0.5rem',
          borderRadius: '30px',
          padding: '0.4rem 1rem',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          cursor: 'pointer'
        }}>
          {editarIndex !== null ? 'Actualizar' : 'Guardar en base'}
        </button>
      </div>

      {vistaActual === 'base' && (
        <>
          <h2>📦 Productos disponibles</h2>
          <input
            type="text"
            placeholder="🔍 Buscar producto"
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
            style={{ marginBottom: '1rem', padding: '0.5rem', width: '100%' }}
          />
          {categoriasPredefinidas.map((cat, idx) => {
            const productosFiltrados = baseProductos.filter(
              p =>
                (p.categoria || 'Sin categoría').toLowerCase() === cat.toLowerCase() &&
                p.nombre.toLowerCase().includes(busqueda.toLowerCase())
            )

            if (productosFiltrados.length === 0) return null

            return (
              <div key={idx}>
                <h3>{cat.charAt(0).toUpperCase() + cat.slice(1)}</h3>
                <ul>
                  {productosFiltrados.map((item) => {
                    const realIndex = baseProductos.findIndex(p =>
                      p.nombre === item.nombre &&
                      p.precio === item.precio &&
                      p.categoria === item.categoria &&
                      p.fecha === item.fecha &&
                      p.local === item.local &&
                      p.unidades === item.unidades &&
                      p.imagen === item.imagen
                    )

                    return (
                      <li key={realIndex} style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
                        {item.imagen && (
                          <img src={item.imagen.startsWith('data:image') ? item.imagen : `/imagenes/${item.imagen}`} alt="img" style={{ width: '40px', height: '40px', marginRight: '1rem' }} />
                        )}
                        <div style={{ flex: 1 }}>
                          <strong>{item.nombre}</strong> - {item.precio.toFixed(2)} € - {item.unidades} u. - {item.categoria}
                          <div style={{ fontSize: '0.8rem', color: '#666' }}>
                            {item.local} - {item.fecha}
                          </div>
                        </div>
                        <button onClick={() => agregarALista(item)} style={{ marginLeft: '0.5rem' }}>🛒</button>
                        <button onClick={() => editarProductoBase(realIndex)} style={{ marginLeft: '0.5rem' }}>✏️</button>
                        <button onClick={() => eliminarProductoBase(realIndex)} style={{ marginLeft: '0.5rem' }}>🗑️</button>
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

      {vistaActual === 'historial' && (
        <>
          <h2>📜 Historial de compras</h2>
          {historial.map((compra, index) => (
            <div key={index} style={{ marginBottom: '1rem', borderBottom: '1px solid #ccc', paddingBottom: '0.5rem' }}>
              <strong>{compra.fecha}</strong>
              <ul>
                {compra.productos.map((p, i) => (
                  <li key={i}>{p.nombre} - {p.precio.toFixed(2)} € x {p.unidades}</li>
                ))}
              </ul>
              <p>Total: {compra.total.toFixed(2)} €</p>
            </div>
          ))}
        </>
      )}
    </div>
  )
}

export default App
