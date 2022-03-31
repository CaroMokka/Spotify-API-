import React from "react";
import "../../styles/footer.css";

export const Footer = () => (
  <footer className="footer-container">
    <div className="footer-info fw-bold text-secondary mx-5">
      <span className="footer-title pb-5">Compañía</span>
      <div className="list text-white d-flex flex-column mt-5">
      <p>Acerca de</p>
      <p>Empleo</p>
      <p>For the Record</p>

      </div>
      
    </div>
    <div className="footer-info fw-bold text-secondary mx-5">
      <span className="footer-title pb-5">Compañía</span>
      <div className="list text-white d-flex flex-column mt-5">
      <p>Servicios para Artistas</p>
      <p>Desarrolladores</p>
      <p>Publicidad</p>
      <p>Invercionistas</p>
      <p>Proveedores</p>

      </div>
      
    </div>
    <div className="footer-info fw-bold text-secondary mx-5">
      <span className="footer-title pb-5">Compañía</span>
      <div className="list text-white d-flex flex-column mt-5">
      <p>Ayuda</p>
      <p>Reproductor web</p>
      <p>App móvil gratis</p>

      </div>
      
    </div>
    
    
   
  </footer>
);
