
import { Formik, Field, Form, ErrorMessage } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';



const validationSchema = Yup.object().shape({
  Name: Yup.string()
    .min(4, 'El nombre debe tener al menos 4 caracteres')
    .max(50, 'El nombre no puede tener más de 50 caracteres')
    .required('El nombre es obligatorio')
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s']+$/, 'Ingresa un nombre válido'),
  Ap: Yup.string()
    .min(5, 'El apellido debe tener al menos 10 caracteres')
    .max(50, 'El apellido no puede tener más de 50 caracteres')
    .required('El apellido es obligatorio')
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s']+$/, 'Ingresa un apellido válido'),
  Am: Yup.string()
    .min(5, 'El apellido debe tener al menos 10 caracteres')
    .max(50, 'El apellido no puede tener más de 50 caracteres')
    .required('El apellido es obligatorio')
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s']+$/, 'Ingresa un apellido válido'),
  Email: Yup.string()
    .email('Correo electrónico inválido')
    .required('Email es obligatorio')
    .matches(
      /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
      'Ingresa una dirección de correo electrónico válida'
    ),
  Telephone: Yup.number()
    .typeError('Formato invalido')
    .required('Telefono requerido')
    .min(10, 'El Telefono debe tener al menos 10 digitos'),
  Sexo: Yup.string().required('Seleccione su sexo'),
  Fecha: Yup.string().required('Fecha de nacimiento es obligatoria'),
  Password: Yup.string()
    .min(8, 'La contraseña debe tener al menos 6 caracteres')
    .required('Contraseña es obligatoria')
    .matches(
      /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/,
      'La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula.'
    ),
    Contraseña: Yup.string()
    .required('Este campo es obligatorio')
    .oneOf([Yup.ref('Password'), null], 'Las contraseñas deben coincidir'),

});

const Register = () => {
  const initialValues = {
    Name: '',
    Ap: '',
    Am: '',
    Sexo: '',
    Email: '',
    Telephone: '',
    Fecha: '',
    Password: '',
    passwordConfirm: '',
  };

  const handleSubmit = async (values) => {
    try {
      console.log('Enviando datos al servidor:', values);

      const response = await axios.post(
        'http://localhost/prySiveth/web_services/Registro.php',
        {
          nombre: values.Name,
          apellido_paterno: values.Ap,
          apellido_materno: values.Am,
          sexo: values.Sexo,
          email: values.Email,
          telefono: values.Telephone,
          fecha_nacimiento: values.Fecha,
          password: values.passwordConfirm,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log(response.data);
      window.alert('Usuario registrado con éxito');
    } catch (error) {
      console.error('Error al enviar datos:', error);
      window.alert('Error al intentar registrar el usuario');
    }
  };

  return (
    <>
      <div className="bg-white shadow-lg rounded-md p-5 md:p-10 flex-col w-11/12 mt-10 mb-10 sm:mx-auto max-w-80rem">
        <div className="flex flex-wrap">
          <div className="md:w-1/2 mt-2">
            <img
              src="/src/img/autobus.png"
              className="w-full rounded-start mt-4"
              alt="Chucherias & Regalos"
            />
          </div>
          <div className="md:w-1/2 mt-2">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight pb-2.5 text-gray-900">
              Crear Cuenta
            </h2>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form>
                <div className="flex mb-4">
                  <div className="w-5/12 ml-5">
                    <label htmlFor="Nombre" className="font-bold">
                      Nombre completo
                    </label>

                    <Field
                      type="text"
                      className="w-full rounded border border-gray-300 bg-inherit p-3 shadow shadow-gray-100 mt-2 appearance-none outline-none text-neutral-800"
                      id="Name"
                      name="Name"
                      placeholder="Nombre"
                    />
                    <ErrorMessage
                      name="Name"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  <div className="w-5/12 ml-5">
                    <label htmlFor="ApellidoP" className="font-bold">
                      Apellido Paterno
                    </label>
                    <Field
                      type="text"
                      className="w-full rounded border border-gray-300 bg-inherit p-3 shadow shadow-gray-100 mt-2 appearance-none outline-none text-neutral-800"
                      id="Ap"
                      name="Ap"
                      placeholder="Apellido materno"
                    />
                    <ErrorMessage
                      name="Ap"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                </div>

                <div className="flex mb-4">
                  <div className="w-5/12 ml-5">
                    <label htmlFor="ApellidoM" className="font-bold">
                      Apellido Materno
                    </label>
                    <Field
                      type="text"
                      className="w-full rounded border border-gray-300 bg-inherit p-3 shadow shadow-gray-100 mt-2 appearance-none outline-none text-neutral-800"
                      id="Am"
                      name="Am"
                      placeholder="Apellido materno"
                    />
                    <ErrorMessage
                      name="Am"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  <div className="w-5/12 ml-5">
                    <label htmlFor="Sexo" className="font-bold">
                      Sexo
                    </label>
                    <Field
                      as="select"
                      className="w-full rounded border border-gray-300 bg-inherit p-3 shadow shadow-gray-100 mt-2 appearance-none outline-none text-neutral-800"
                      id="Sexo"
                      name="Sexo"
                    >
                      <option value="" disabled hidden>
                        Selecciona tu sexo
                      </option>
                      <option value="masculino">Masculino</option>
                      <option value="femenino">Femenino</option>
                      <option value="otro">Otro</option>
                    </Field>
                    <ErrorMessage
                      name="Sexo"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                </div>
                <div className="flex mb-4">
                  <div className="w-5/12 ml-5">
                    <label htmlFor="Fecha" className="font-bold">
                      Fecha de nacimiento
                    </label>
                    <Field
                      type="date"
                      className="w-full rounded border border-gray-300 bg-inherit p-3 shadow shadow-gray-100 mt-2 appearance-none outline-none text-neutral-800"
                      id="Fecha"
                      name="Fecha"
                      placeholder="Fecha de nacimiento"
                    />
                    <ErrorMessage
                      name="Fecha"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="w-5/12 ml-5">
                    <label htmlFor="Email" className="font-bold">
                      Email
                    </label>
                    <Field
                      type="text"
                      className="w-full rounded border border-gray-300 bg-inherit p-3 shadow shadow-gray-100 mt-2 appearance-none outline-none text-neutral-800"
                      id="Email"
                      name="Email"
                      placeholder="Email"
                    />
                    <ErrorMessage
                      name="Email"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                </div>

                <div className="flex mb-4">
                  <div className="w-5/12 ml-5">
                    <label htmlFor="Telephone" className="font-bold">
                      Teléfono
                    </label>
                    <Field
                      type="text"
                      className="w-full rounded border border-gray-300 bg-inherit p-3 shadow shadow-gray-100 mt-2 appearance-none outline-none text-neutral-800"
                      id="Telephone"
                      name="Telephone"
                      placeholder="Teléfono"
                      maxLength="10"
                    />
                    <ErrorMessage
                      name="Telephone"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="w-5/12 ml-5">
                    <label htmlFor="Contraseña" className="font-bold">
                      Contraseña
                    </label>
                    <Field
                      type="password"
                      className="w-full rounded border border-gray-300 bg-inherit p-3 shadow shadow-gray-100 mt-2 appearance-none outline-none text-neutral-800"
                      id="Password"
                      name="Password"
                      placeholder="Contraseña"
                    />
                    <ErrorMessage
                      name="Password"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                </div>

                <div className="flex mb-4">
                  <div className="w-5/12 ml-5">
                    <label htmlFor="Contraseña2" className="font-bold">
                      Confirmación de contraseña
                    </label>
                    <Field
                      type="password"
                      className="w-full rounded border border-gray-300 bg-inherit p-3 shadow shadow-gray-100 mt-2 appearance-none outline-none text-neutral-800"
                      id="passwordConfirm"
                      name="passwordConfirm"
                      placeholder="Confirmación de contraseña"
                    />
                    <ErrorMessage
                      name="passwordConfirm"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <button
                    type="submit"
                    className="w-5/12 mx-auto mt-4 bg-indigo-600 text-white font-bold py-2 px-4 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Registrar
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
