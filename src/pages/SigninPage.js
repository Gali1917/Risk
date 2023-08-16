import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/providers/userContext";
import { loginUserRequest } from "../api/userApi";
import { toast } from "react-hot-toast";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Loading } from "../components/Loading";
import "../styles/login.css";

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
        <h4 className="title-login">SISTEMA DE CONSULTA DE RESULTADOS</h4>
        {isLoading ? (
          <Loading />
        ) : (
          <div className="form">
            <div>
              <div className="home-login">
                <h5>Home</h5>
              </div>
            </div>
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
                <div className="input-label-signin">
                  <label className="label-signin" htmlFor="email">
                    Email
                  </label>
                  <Field
                    className="input-signin"
                    name="email"
                    type="text"
                    required
                    autoComplete="username"
                    onChange={handleChange}
                  />
                </div>
                <ErrorMessage
                  className="error-message"
                  component="p"
                  name="password"
                />
                <div className="input-label-signin">
                  <label className="label-signin" htmlFor="password">
                    Contraseña
                  </label>
                  <Field
                    className="input-signin"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    onChange={handleChange}
                  />
                </div>

                <button
                  className="button-enter-signin"
                  type="submit"
                  disabled={!user.email || !user.password || isLoading}
                >
                  {isLoading ? "Cargando..." : "Entrar"}
                </button>
              </Form>
            </Formik>
            <button className="button-register" to="/signup">Registrase...</button>
          </div>
        )}
      </article>
    </section>
  );
};

export default SigninPage;
