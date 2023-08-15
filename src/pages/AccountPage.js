import React from "react";

import { useUser } from "../context/providers/userContext";

const AccountPage = () => {
  const { user, isLoading } = useUser();

  return (
    <section>
      <article className="perfil">
        {isLoading ? (
          <p>Cargando...</p>
        ) : (
          <div className="perfil-title">
            <h1>{user.name}</h1>
            <ul>
              <li>{user.email}</li>
              <li>{user.document}</li>
              <li>{user.number}</li>
            </ul>
          </div>
        )}
      </article>
    </section>
  );
};

export default AccountPage;
