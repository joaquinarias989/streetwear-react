import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Footer from './components/shared/Footer'
import NavBar from './components/shared/NavBar'

const pathsWhitBgBricks = ['Inicio', 'Ingresar', 'Registrarse', '404']

function App () {
  const { pathname } = useLocation()

  const backgroundClass = pathname === '/' ||
  pathsWhitBgBricks.some((path) => pathname.includes(path))
    ? 'bg-bricks'
    : ''

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <>
      <NavBar />
      <main
        className={backgroundClass}
      >
        <Routes>
          <Route index path="/" element={<Home />} />
          {/* <Route path="/Productos" element={<ItemListContainer />} />
          <Route
            path="/Productos/Categorias/:category"
            element={<ItemListContainer />}
          />
          <Route path={"/Productos/:id"} element={<ItemDetailContainer />} />
          <Route path={"/Carrito"} element={<Cart />} />
          <Route path={"/Productos/Categorias"} element={<Categories />} />
          <Route index path="/Ingresar" element={<Login />} />
          <Route index path="/Registrarse" element={<Register />} />
          <Route path={"/404"} element={<NotFound />} replace />
          <Route path={"*"} element={<Navigate to="/404" replace />} /> */}
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
