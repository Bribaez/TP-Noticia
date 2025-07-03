import React from "react";
import { useNoticias } from "../../hooks/useNoticias"; 

export function NoticiaCard() {
  const [noticias = []] = useNoticias();

  if (!noticias.length) {
    return <p>Cargando noticias...</p>;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Últimas Noticias</h2>
      <div className="row">
        {noticias.slice(0, 10).map((noticia) => (
          <div className="col-md-6 mb-4" key={noticia.id}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{noticia.title}</h5>
                <p className="card-text">{noticia.body}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
