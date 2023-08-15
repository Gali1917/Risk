import React, { useState } from "react";

import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import {useUser} from "../context/providers/userContext";

const SignupPages = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    number: "",
    document: "",
  });

  const { registerUser, isLoading, errorMessage } = useUser();

  const handleChange = (e) => {
      setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userResponse = await registerUser(user);
      if (userResponse) {
        toast.success(`Hola ${user.name}, te damos la bienvenida.`, {
          position: "bottom-right",
        });
        navigate("/account");
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
        <div className="form">
          <Formik
            initialValues={user}
            validationSchema={Yup.object({
              name: Yup.string().required("*"),
              email: Yup.string()
                .required("*")
                .email("Debe ser un email valido.")
                .matches(/^[^@]+@[^@]+\..+$/, "Debe ser un email valido."),
              password: Yup.string()
                .required("*")
                .min(6, "La contraseña debe tener minimo 6 caracteres."),
              number: Yup.string().required("*"),
              document: Yup.string().required("*"),
            })}
            onSubmit={handleSubmit}
            enableReinitialize={true}
            className="form"
          >
            <Form onSubmit={handleSubmit}>
              <ErrorMessage
                className="error-message"
                component="p"
                name="name"
              />
              <div className="input-label-signup">
                <Field
                  className="input-signup"
                  name="name"
                  id="name"
                  required
                  onChange={handleChange}
                />
                <label className="label-signup" htmlFor="name">
                  Nombre
                </label>
              </div>
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
                name="number"
              />
              <div className="input-label-signup">
                <Field
                  className="input-signup"
                  name="number"
                  type="number"
                  required
                  onChange={handleChange}
                />
                <label className="label-signup" htmlFor="number">
                  Numero
                </label>
              </div>
              <ErrorMessage
                className="error-message"
                component="p"
                name="document"
              />
              <div className="input-label-signup">
                <Field
                  className="input-signup"
                  name="document"
                  type="number"
                  required
                  onChange={handleChange}
                />
                <label className="label-signup" htmlFor="document">
                  Documento
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
                //   disabled={
                //     !user.email ||
                //     !user.password ||
                //     !user.document ||
                //     isLoading
                //   }
              >
                {/* {isLoading ? "Cargando..." : "SUMATE A LA ACCION"} */}
                Enviar
              </button>
            </Form>
          </Formik>
        </div>
      </article>
    </section>
  );
};

export default SignupPages;
