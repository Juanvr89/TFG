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

 // NUEVOS ESTADOS PARA LISTAS PREDEFINIDAS
 const [listasPredefinidas, setListasPredefinidas] = useState([])
 const [mostrarModalLista, setMostrarModalLista] = useState(false)
 const [productoParaLista, setProductoParaLista] = useState(null)
 const [nombreNuevaLista, setNombreNuevaLista] = useState('')
 const [listaSeleccionada, setListaSeleccionada] = useState('')
 const [editandoLista, setEditandoLista] = useState(null)

 useEffect(() => {
   const datosLista = localStorage.getItem('listaCompra')
   const datosBase = localStorage.getItem('baseProductos')
   const datosHistorial = localStorage.getItem('historialCompras')
   const categoriasGuardadas = localStorage.getItem('categoriasExtra')
   const listasPredefinidasGuardadas = localStorage.getItem('listasPredefinidas')

   if (datosLista) setLista(JSON.parse(datosLista))
   if (datosBase) setBaseProductos(JSON.parse(datosBase))
   if (datosHistorial) setHistorial(JSON.parse(datosHistorial))
   if (listasPredefinidasGuardadas) setListasPredefinidas(JSON.parse(listasPredefinidasGuardadas))
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
     localStorage.setItem('listasPredefinidas', JSON.stringify(listasPredefinidas))
   }
 }, [lista, baseProductos, historial, listasPredefinidas, cargadoInicial])

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

 // FUNCIONES PARA LISTAS PREDEFINIDAS
 const abrirModalLista = (producto) => {
   setProductoParaLista(producto)
   setMostrarModalLista(true)
   setNombreNuevaLista('')
   setListaSeleccionada('')
 }

 const cerrarModalLista = () => {
   setMostrarModalLista(false)
   setProductoParaLista(null)
   setNombreNuevaLista('')
   setListaSeleccionada('')
 }

 const crearNuevaListaPredefinida = () => {
   if (nombreNuevaLista.trim() === '') {
     toast.error('Introduce un nombre para la lista', {
       position: 'top-center',
       autoClose: 2000,
       hideProgressBar: false,
       closeOnClick: true,
       pauseOnHover: true,
       draggable: true,
       theme: 'light',
     })
     return
   }

   const nuevaLista = {
     id: Date.now(),
     nombre: nombreNuevaLista.trim(),
     productos: [productoParaLista]
   }

   setListasPredefinidas([...listasPredefinidas, nuevaLista])
   toast.success(`Lista "${nombreNuevaLista}" creada con ${productoParaLista.nombre}`, {
     position: 'top-center',
     autoClose: 3000,
     hideProgressBar: false,
     closeOnClick: true,
     pauseOnHover: true,
     draggable: true,
     theme: 'light',
   })
   cerrarModalLista()
 }

 const agregarAListaExistente = () => {
   if (listaSeleccionada === '') {
     toast.error('Selecciona una lista', {
       position: 'top-center',
       autoClose: 2000,
       hideProgressBar: false,
       closeOnClick: true,
       pauseOnHover: true,
       draggable: true,
       theme: 'light',
     })
     return
   }

   const nuevasListas = listasPredefinidas.map(lista => {
     if (lista.id.toString() === listaSeleccionada) {
       // Verificar si el producto ya está en la lista
       const yaExiste = lista.productos.some(prod =>
         prod.nombre === productoParaLista.nombre &&
         prod.precio === productoParaLista.precio &&
         prod.categoria === productoParaLista.categoria
       )

       if (yaExiste) {
         toast.warning(`${productoParaLista.nombre} ya está en "${lista.nombre}"`, {
           position: 'top-center',
           autoClose: 2000,
           hideProgressBar: false,
           closeOnClick: true,
           pauseOnHover: true,
           draggable: true,
           theme: 'light',
         })
         return lista
       }

       return {
         ...lista,
         productos: [...lista.productos, productoParaLista]
       }
     }
     return lista
   })

   setListasPredefinidas(nuevasListas)
   const nombreLista = listasPredefinidas.find(l => l.id.toString() === listaSeleccionada)?.nombre
   toast.success(`${productoParaLista.nombre} añadido a "${nombreLista}"`, {
     position: 'top-center',
     autoClose: 3000,
     hideProgressBar: false,
     closeOnClick: true,
     pauseOnHover: true,
     draggable: true,
     theme: 'light',
   })
   cerrarModalLista()
 }

 const cargarListaPredefinida = (lista) => {
   setLista([...lista, ...lista.productos])
   toast.success(`Lista "${lista.nombre}" cargada con ${lista.productos.length} productos`, {
     position: 'top-center',
     autoClose: 3000,
     hideProgressBar: false,
     closeOnClick: true,
     pauseOnHover: true,
     draggable: true,
     theme: 'light',
   })
 }

 const eliminarListaPredefinida = (id) => {
   const nuevasListas = listasPredefinidas.filter(lista => lista.id !== id)
   setListasPredefinidas(nuevasListas)
   toast.error('Lista eliminada', {
     position: 'top-center',
     autoClose: 2000,
     hideProgressBar: false,
     closeOnClick: true,
     pauseOnHover: true,
     draggable: true,
     theme: 'light',
   })
 }

 const editarListaPredefinida = (lista) => {
   setEditandoLista(lista)
 }

 const actualizarListaPredefinida = (listaEditada) => {
   const nuevasListas = listasPredefinidas.map(lista =>
     lista.id === listaEditada.id ? listaEditada : lista
   )
   setListasPredefinidas(nuevasListas)
   setEditandoLista(null)
   toast.success('Lista actualizada', {
     position: 'top-center',
     autoClose: 2000,
     hideProgressBar: false,
     closeOnClick: true,
     pauseOnHover: true,
     draggable: true,
     theme: 'light',
   })
 }

 const eliminarProductoDeLista = (listaId, productoIndex) => {
   const nuevasListas = listasPredefinidas.map(lista => {
     if (lista.id === listaId) {
       return {
         ...lista,
         productos: lista.productos.filter((_, index) => index !== productoIndex)
       }
     }
     return lista
   })
   setListasPredefinidas(nuevasListas)
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

         {/* LISTAS PREDEFINIDAS */}
         {listasPredefinidas.length > 0 && (
           <div style={{ marginBottom: '2rem' }}>
             <h3>📋 Listas predefinidas</h3>
             <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
               {listasPredefinidas.map((lista) => (
                 <div key={lista.id} style={{
                   backgroundColor: 'rgba(82, 82, 82, 0.74)', //fondo lista favoritos
                   padding: '0.5rem 1rem',
                   borderRadius: '20px',
                   display: 'flex',
                   alignItems: 'center',
                   gap: '0.5rem'
                 }}>
                   <span
                     onClick={() => cargarListaPredefinida(lista)}
                     style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                     title={`Cargar lista (${lista.productos.length} productos)`}
                   >
                     🗒️ {lista.nombre}
                   </span>
                   <button
                     onClick={() => editarListaPredefinida(lista)}
                     style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.8rem' }}
                     title="Editar lista"
                   >
                     ✏️
                   </button>
                   <button
                     onClick={() => eliminarListaPredefinida(lista.id)}
                     style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.8rem' }}
                     title="Eliminar lista"
                   >
                     🗑️
                   </button>
                 </div>
               ))}
             </div>
           </div>
         )}

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
                       <button onClick={() => abrirModalLista(item)} style={{ marginLeft: '0.5rem' }} title="Añadir a lista predefinida">🗒️</button>
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

         {/* LISTAS PREDEFINIDAS EN VISTA LISTA TAMBIÉN */}
         {listasPredefinidas.length > 0 && (
           <div style={{ marginBottom: '2rem' }}>
             <h3>📋 Cargar lista predefinida</h3>
             <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
               {listasPredefinidas.map((lista) => (
                 <div key={lista.id} style={{
                   backgroundColor: '#rgba(0, 255, 136, 0.5)',
                   padding: '0.5rem 1rem',
                   borderRadius: '20px',
                   cursor: 'pointer'
                 }}
                   onClick={() => cargarListaPredefinida(lista)}
                   title={`Cargar lista (${lista.productos.length} productos)`}
                 >
                   🗒️ {lista.nombre}
                 </div>
               ))}
             </div>
           </div>
         )}

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

     {/* MODAL PARA LISTAS PREDEFINIDAS */}
     {mostrarModalLista && (
       <div style={{
         position: 'fixed',
         top: 0,
         left: 0,
         width: '100%',
         height: '100%',
         backgroundColor: 'rgba(0,0,0,0.5)',
         display: 'flex',
         justifyContent: 'center',
         alignItems: 'center',
         zIndex: 1000
       }}>
         <div style={{
           backgroundColor: 'rgba(102, 102, 102, 0.5)',
           padding: '2rem',
           borderRadius: '10px',
           minWidth: '400px',
           maxWidth: '500px'
         }}>
           <h3>🗒️ Añadir "{productoParaLista?.nombre}" a lista</h3>
           
           <div style={{ marginBottom: '1rem' }}>
             <h4>Crear nueva lista:</h4>
             <input
               type="text"
               placeholder="Nombre de la nueva lista"
               value={nombreNuevaLista}
               onChange={e => setNombreNuevaLista(e.target.value)}
               style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
             />
             <button
               onClick={crearNuevaListaPredefinida}
               style={{
                 backgroundColor: '#28a745',
                 color: 'black',
                 border: 'none',
                 padding: '0.5rem 1rem',
                 borderRadius: '5px',
                 cursor: 'pointer'
               }}
             >
               Crear lista
             </button>
           </div>

           {listasPredefinidas.length > 0 && (
             <div style={{ marginBottom: '1rem' }}>
               <h4>O añadir a lista existente:</h4>
               <select
                 value={listaSeleccionada}
                 onChange={e => setListaSeleccionada(e.target.value)}
                 style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
               >
                 <option value="">Selecciona una lista</option>
                 {listasPredefinidas.map(lista => (
                   <option key={lista.id} value={lista.id}>
                     {lista.nombre} ({lista.productos.length} productos)
                   </option>
                 ))}
               </select>
               <button
                 onClick={agregarAListaExistente}
                 style={{
                   backgroundColor: '#007bff',
                   color: 'white',
                   border: 'none',
                   padding: '0.5rem 1rem',
                   borderRadius: '5px',
                   cursor: 'pointer'
                 }}
               >
                 Añadir a lista
               </button>
             </div>
           )}

           <div style={{ textAlign: 'right' }}>
             <button
               onClick={cerrarModalLista}
               style={{
                 backgroundColor: '#6c757d',
                 color: 'white',
                 border: 'none',
                 padding: '0.5rem 1rem',
                 borderRadius: '5px',
                 cursor: 'pointer'
               }}
             >
               Cancelar
             </button>
           </div>
         </div>
       </div>
     )}

     {/* MODAL PARA EDITAR LISTAS PREDEFINIDAS */}
     {editandoLista && (
       <div style={{
         position: 'fixed',
         top: 0,
         left: 0,
         width: '100%',
         height: '100%',
         backgroundColor: 'rgba(0,0,0,0.5)',
         display: 'flex',
         justifyContent: 'center',
         alignItems: 'center',
         zIndex: 1000
       }}>
         <div style={{
           backgroundColor: 'rgba(114, 114, 114, 0.6)',
           padding: '2rem',
           borderRadius: '10px',
           minWidth: '500px',
           maxWidth: '600px',
           maxHeight: '80vh',
           overflow: 'auto'
         }}>
           <h3>✏️ Editar lista "{editandoLista.nombre}"</h3>
           
           <div style={{ marginBottom: '1rem' }}>
             <input
               type="text"
               value={editandoLista.nombre}
               onChange={e => setEditandoLista({...editandoLista, nombre: e.target.value})}
               style={{ width: '100%', padding: '0.5rem', fontSize: '1.1rem' }}
             />
           </div>

           <h4>Productos en la lista:</h4>
           <ul style={{ maxHeight: '300px', overflow: 'auto' }}>
             {editandoLista.productos.map((producto, index) => (
               <li key={index} style={{
                 display: 'flex',
                 justifyContent: 'space-between',
                 alignItems: 'center',
                 padding: '0.5rem',
                 backgroundColor: 'rgba(58, 58, 58, 0.83)', //fondo texto listas
                 marginBottom: '0.5rem',
                 borderRadius: '5px'
               }}>
                 <span>{producto.nombre} - {producto.precio.toFixed(2)} €</span>
                 <button
                   onClick={() => eliminarProductoDeLista(editandoLista.id, index)}
                   style={{
                     backgroundColor: 'transparent',
                     border: 'none',
                     color: 'red',
                     cursor: 'pointer',
                     fontSize: '1.2rem'
                   }}
                 >
                   🗑️
                 </button>
               </li>
             ))}
           </ul>

           <div style={{ textAlign: 'right', marginTop: '1rem' }}>
             <button
               onClick={() => actualizarListaPredefinida(editandoLista)}
               style={{
                 backgroundColor: '#28a745',
                 color: 'white',
                 border: 'none',
                 padding: '0.5rem 1rem',
                 borderRadius: '5px',
                 cursor: 'pointer',
                 marginRight: '0.5rem'
               }}
             >
               Guardar cambios
             </button>
             <button
               onClick={() => setEditandoLista(null)}
               style={{
                 backgroundColor: '#6c757d',
                 color: 'white',
                 border: 'none',
                 padding: '0.5rem 1rem',
                 borderRadius: '5px',
                 cursor: 'pointer'
               }}
             >
               Cancelar
             </button>
           </div>
         </div>
       </div>
     )}

   </div>
 )
}

export default App

