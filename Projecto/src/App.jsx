import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Hero } from './componentes/Hero/Hero.jsx';
import { NoticiaCard } from './componentes/Noticias/NoticiaCard.jsx';
import { UsuarioCard } from './componentes/Usuario/UsuarioCard.jsx';
import { Registro } from './componentes/Registro/Registro.jsx';
import { Inicio } from './componentes/Inicio/Inicio.jsx';
import { useAuth } from './contexto/AuthContexto.jsx';
import { InicioAdmin } from './componentes/InicioAdmin/IncioAdmin.jsx';
import { Iniciolog } from './componentes/Iniciolog/Iniciolog.jsx';

function App() {
  const { IsLogged, user, logout } = useAuth();

  return (
    <BrowserRouter>
      <Hero />
      <nav>
        {IsLogged ? (
          <>
            <span>Hola, {user.usuario || user.username} </span>
            <button onClick={logout}>Cerrar sesión</button>
          </>
        ) : (
          <></>
        )}
      </nav>
      <Routes>
        <Route path="/" element={<NoticiaCard />} />

        <Route
          path="/usuarios"
          element={IsLogged ? <UsuarioCard /> : <Navigate to="/login" />}
        />
        <Route path="/registro" element={<Registro />} />
        <Route path="/login" element={<Inicio />} />

        <Route
          path="/iniciolog"
          element={
            IsLogged && user?.rol === "lector" ? (
              <Iniciolog />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/inicioadmin"
          element={
            IsLogged && user?.rol === "admin" ? (
              <InicioAdmin />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route path="*" element={<h1>Página no encontrada</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
