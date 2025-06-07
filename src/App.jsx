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
  const [hoveredIndex, setHoveredIndex] = useState(null)
  


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
    toast.success(`Añadido a lista: ${productoBase.nombre}`, {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: 'light',
    })
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

  const eliminarCompraPorFecha = (fecha) => {
    const nuevoHistorial = historial.filter(compra => compra.fecha !== fecha)
    setHistorial(nuevoHistorial)
    toast.error('Compra eliminada del historial 🗑️', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: 'light',
    })
  }
  
  const obtenerTotalesResumen = () => {
    const ahora = new Date()
    const unaSemanaAntes = new Date(ahora)
    unaSemanaAntes.setDate(ahora.getDate() - 7)
  
    const inicioMes = new Date(ahora.getFullYear(), ahora.getMonth(), 1)
    const inicioAno = new Date(ahora.getFullYear(), 0, 1)
  
    let totalSemana = 0
    let totalMes = 0
    let totalAno = 0
  
    historial.forEach((compra) => {
      const fechaCompra = new Date(compra.fecha)
  
      if (fechaCompra >= unaSemanaAntes) {
        totalSemana += compra.total
      }
  
      if (fechaCompra >= inicioMes) {
        totalMes += compra.total
      }
  
      if (fechaCompra >= inicioAno) {
        totalAno += compra.total
      }
    })
  
    return {
      semana: totalSemana,
      mes: totalMes,
      ano: totalAno
    }
  }
  
  const borrarListaCompleta = () => {
    setLista([])
  }

  // NUEVAS FUNCIONES para el check verde/rojo y quitar de lista desde base
  // Comprueba si producto está en la lista (comparando nombre+precio+categoria+etc)
  const estaEnLista = (productoBase) => {
    return lista.some(item =>
      item.nombre === productoBase.nombre &&
      item.precio === productoBase.precio &&
      item.categoria === productoBase.categoria &&
      item.fecha === productoBase.fecha &&
      item.local === productoBase.local &&
      item.unidades === productoBase.unidades &&
      item.imagen === productoBase.imagen
    )
  }

  // Eliminar producto de la lista por coincidencia total
  const quitarDeLista = (productoBase) => {
    const index = lista.findIndex(item =>
      item.nombre === productoBase.nombre &&
      item.precio === productoBase.precio &&
      item.categoria === productoBase.categoria &&
      item.fecha === productoBase.fecha &&
      item.local === productoBase.local &&
      item.unidades === productoBase.unidades &&
      item.imagen === productoBase.imagen
    )
    if (index !== -1) {
      const nuevaLista = [...lista]
      nuevaLista.splice(index, 1)
      setLista(nuevaLista)
      toast.error(`Eliminado de lista: ${productoBase.nombre}`, {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'light',
      })
    }
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <ToastContainer />
      <div style={{ padding: '1rem' }}>
  <img 
    src="/imagenes/1-logo.png" 
    alt="" 
    style={{ display: 'block', margin: '0 auto', maxWidth: '400px', height: 'auto' }} 
  />
</div>


<div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center', gap: '10rem' }}>
  <img
    src="/imagenes/lista.png"
    alt="Ver Lista"
    onClick={() => setVistaActual('lista')}
    style={{ width: 'auto', height: '203px', cursor: 'pointer' }}
  />
  <img
    src="/imagenes/productos.png"
    alt="Ver productos"
    onClick={() => setVistaActual('base')}
    style={{ width: 'auto', height: '203px', cursor: 'pointer' }}
  />
  <img
    src="/imagenes/historial.png"
    alt="Ver historial"
    onClick={() => setVistaActual('historial')}
    style={{ width: 'auto', height: '203px', cursor: 'pointer' }}
  />
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

                    const enLista = estaEnLista(item)

                    return (
                      <li
                      key={realIndex}
                      onMouseEnter={() => setHoveredIndex(realIndex)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      style={{
                        marginBottom: '0.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        transition: 'transform 0.2s',
                        transform: hoveredIndex === realIndex ? 'scale(1.07)' : 'scale(1)',
                        backgroundColor: '#4a4a4a',
                        padding: '0.5rem',
                        borderRadius: '8px'
                      }}
                    >
                      {item.imagen && (
                        <img
                          src={item.imagen.startsWith('data:image') ? item.imagen : `/imagenes/${item.imagen}`}
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
                    
                      {enLista ? (
                        <>
                          <span title="Ya en la lista" style={{ color: 'green', fontSize: '1.5rem', cursor: 'default' }}>✅</span>
                          <button
                            title="Quitar de la lista"
                            onClick={() => quitarDeLista(item)}
                            style={{
                              marginLeft: '0.5rem',
                              fontSize: '1.5rem',
                              backgroundColor: 'transparent',
                              border: 'none',
                              color: 'red',
                              cursor: 'pointer',
                              lineHeight: '1'
                            }}
                          >
                            ❌
                          </button>
                        </>
                      ) : (
                        <button onClick={() => agregarALista(item)} style={{ marginLeft: '0.5rem' }}>🛒</button>
                      )}
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
          {lista.length === 0 ? (
            <p>No hay productos en la lista.</p>
          ) : (
            <ul>
  {lista.map((item, i) => (
    <li
      key={i}
      onMouseEnter={() => setHoveredIndex(i)}
      onMouseLeave={() => setHoveredIndex(null)}
      style={{
        marginBottom: '0.5rem',
        padding: '0.5rem',
        borderRadius: '8px',
        backgroundColor: '#4a4a4a',
        display: 'flex',
        alignItems: 'center',
        transition: 'transform 0.2s',
        transform: hoveredIndex === i ? 'scale(1.05)' : 'scale(1)'
      }}
    >
      {item.imagen && (
        <img
          src={item.imagen.startsWith('data:image') ? item.imagen : `/imagenes/${item.imagen}`}
          alt="img"
          style={{ width: '40px', height: '40px', marginRight: '1rem', borderRadius: '4px' }}
        />
      )}
      <span style={{ flex: 1 }}>
        {item.nombre} - {item.precio.toFixed(2)} € - {item.unidades} u.
      </span>
      <button
        onClick={() => eliminarProductoLista(i)}
        style={{
          marginLeft: '1rem',
          backgroundColor: 'transparent',
          border: 'none',
          color: 'red',
          cursor: 'pointer'
        }}
      >
        ❌
      </button>
    </li>
  ))}
</ul>

          )}
          <button onClick={compraRealizada} disabled={lista.length === 0}>Comprar 🛍️</button>
          <button onClick={borrarListaCompleta} disabled={lista.length === 0} style={{ marginLeft: '1rem' }}>Borrar lista ❌</button>
        </>
      )}

{vistaActual === 'historial' && (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
    {/* HISTORIAL A LA IZQUIERDA */}
    <div style={{ width: '70%' }}>
      <h2>📜 Historial de compras</h2>
      {historial.length === 0 ? (
        <p>No hay compras registradas.</p>
      ) : (
        <ul>
          {historial.map((compra, i) => (
            <li key={i} style={{ marginBottom: '1rem', borderBottom: '1px solid #ccc', paddingBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong>{compra.fecha}</strong>
                <button
                  onClick={() => eliminarCompraPorFecha(compra.fecha)}
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: 'red',
                    fontSize: '1.2rem',
                    cursor: 'pointer'
                  }}
                  title="Eliminar esta compra"
                >
                  🗑️
                </button>
              </div>

              <ul>
                {compra.productos.map((prod, idx) => (
                  <li key={idx}>
                    {prod.nombre} - {prod.precio.toFixed(2)} € - {prod.unidades} u.
                  </li>
                ))}
              </ul>
              <div
                style={{
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                  textDecoration: 'underline',
                  marginTop: '0.5rem'
                }}
              >
                Total: {compra.total.toFixed(2)} €
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>

    {/* RESUMEN A LA DERECHA */}
    <div style={{ width: '28%', padding: '1rem', borderLeft: '2px solid #eee' }}>
      <h3 style={{ marginBottom: '1rem' }}>🧾 Resumen</h3>
      {(() => {
        const totales = obtenerTotalesResumen()
        return (
          <>
            <p><strong>🗓️ Esta semana:</strong> {totales.semana.toFixed(2)} €</p>
            <p><strong>📅 Este mes:</strong> {totales.mes.toFixed(2)} €</p>
            <p><strong>📆 Este año:</strong> {totales.ano.toFixed(2)} €</p>
          </>
        )
      })()}
    </div>
  </div>
)}

    </div>
  )
}

export default App
