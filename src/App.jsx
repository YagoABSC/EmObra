import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Header from './assets/componentes/Header'
import Banner from './assets/componentes/Banner'
import Sobre from './assets/componentes/Sobre'
import Footer from './assets/componentes/Footer'
import Lojas from './assets/componentes/Lojas'
import Premium from './assets/componentes/Premium'
import Instituicao from './assets/componentes/Instituicao'
import Buscas from './assets/componentes/Buscas'
import CadastroContratante from './assets/componentes/cadastro'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <CadastroContratante />
      <main>
        <Banner />
        <Buscas/>
        <Sobre />
        <Premium/>
        <Lojas />
        <Instituicao />
      </main>
      <Footer />
    </>
  )
}

export default App
