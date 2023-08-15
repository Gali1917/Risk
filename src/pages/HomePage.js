import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
      <section>
        <article>
          <ul className="buttons">
            <li>
              <Link to="/signup">Registrarse</Link>
            </li>
            <li>
                <Link to="/signin">Iniciar Sesion</Link>
            </li>
          </ul>
        </article>
      </section>
  );
};

export default HomePage;
