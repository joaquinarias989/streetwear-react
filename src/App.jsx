import { useEffect } from 'react'
import { CartContextProvider } from './context/cartContext'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Footer from './components/shared/Footer'
import NavBar from './components/shared/NavBar'
import Products from './pages/Products'
import Product from './pages/Product'
import Cart from './pages/Cart'
import NotFound from './pages/NotFound'
import Login from './pages/Login'
import Register from './pages/Register'

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
      <CartContextProvider>
        <NavBar />
        <main className={backgroundClass}>
          <Routes>
            <Route index path="/" element={<Home />} />
            <Route path="/Productos" element={<Products />} />
            <Route
              path="/Productos/Categorias/:category"
              element={<Products />}
            />
            <Route path={'/Productos/:id'} element={<Product />} />
            <Route path={'/Carrito'} element={<Cart />} />
            <Route path={'/404'} element={<NotFound />} replace />
            <Route index path="/Ingresar" element={<Login />} />
            <Route index path="/Registrarse" element={<Register />} />
            <Route path={'*'} element={<Navigate to="/404" replace />} />
            {/* <Route path={"/Productos/Categorias"} element={<Categories />} /> */}
          </Routes>
        </main>
        <Footer />
      </CartContextProvider>
    </>
  )
}

export default App
