import React from "react";
import { useUsuarios } from "../../hooks/usuarios";

export function UsuarioCard() {
  const [usuarios = []] = useUsuarios(); // Por si es undefined, asignamos un array vacío

  if (!usuarios.length) {
    return <p>Cargando usuarios...</p>;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Usuarios</h2>
      <div className="row">
        {usuarios.map((usuario) => (
          <div className="col-md-4 mb-4" key={usuario.id}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{usuario.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  {usuario.username}
                </h6>
                <p className="card-text">
                  <strong>Email:</strong> {usuario.email} <br />
                  <strong>Tel:</strong> {usuario.phone} <br />
                  <strong>Website:</strong> {usuario.website}
                </p>
              </div>
              <div className="card-footer text-end">
                <small className="text-muted">{usuario.company.name}</small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
