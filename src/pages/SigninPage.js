import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/providers/userContext";
import { loginUserRequest } from "../api/userApi";
import { toast } from "react-hot-toast";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";


const SigninPage = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { loginUser, isLoading, errorMessage } = useUser();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userResponse = await loginUser(user);
      if (userResponse) {
        toast.success(`Hola de nuevo ${user.name}`, {
          position: "bottom-right",
        });
        navigate("/account");
      } else {
        toast.error("Credenciales invalidas. Intente nuevamente.", {
          position: "bottom-right",
        });
      }
    } catch (error) {
      toast.error(`${error}`, {
        position: "bottom-right",
      });
    }
  };

  return (
    <section>
      <article>
        {isLoading ? (
          <p>Cargando...</p>
        ) : (
          <div className="form">
            <Formik
              initialValues={user}
              validationSchema={Yup.object({
                email: Yup.string()
                  .required("*")
                  .email("Debe ser un email valido.")
                  .matches(/^[^@]+@[^@]+\..+$/, "Debe ser un email valido."),
                password: Yup.string()
                  .required("*")
                  .min(6, "La contraseña debe tener minimo 6 caracteres."),
              })}
              onSubmit={handleSubmit}
              enableReinitialize={true}
              className="form"
            >
              <Form onSubmit={handleSubmit}>
                <ErrorMessage
                  className="error-message"
                  component="p"
                  name="email"
                />
                <div className="input-label-signup">
                  <Field
                    className="input-signup"
                    name="email"
                    type="text"
                    required
                    autoComplete="username"
                    onChange={handleChange}
                  />
                  <label className="label-signup" htmlFor="email">
                    Email
                  </label>
                </div>
                <ErrorMessage
                  className="error-message"
                  component="p"
                  name="password"
                />
                <div className="input-label-signup">
                  <Field
                    className="input-signup"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    onChange={handleChange}
                  />
                  <label className="label-signup" htmlFor="password">
                    Contraseña
                  </label>
                </div>

                <button
                  className="button-enter-signup"
                  type="submit"
                  disabled={
                    !user.email || !user.password || isLoading
                  }
                >
                  {isLoading ? "Cargando..." : "Entrar"}
                </button>
              </Form>
            </Formik>
                <Link to="/signup">Registrase...</Link>
          </div>
        )}
      </article>
    </section>
  );
};

export default SigninPage;
