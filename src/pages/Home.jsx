import { Link } from 'react-router-dom'
import Help from '../components/home/Help'
import About from '../components/home/About'
import Contact from '../components/home/Contact'
import Categories from '../components/home/Categories'

const Home = () => {
  return (
    <>
      <section id='welcome' className='welcome'>
        <Link type='button' className='btn-principal' to={'/Productos'}>
          <i className='fas fa-shopping-bag me-2'></i> Comprar ahora
        </Link>
      </section>
      <Categories />
      <Help />
      <About />
      <Contact />
    </>
  )
}

export default Home
