import { useContext, useState } from 'react';
import Profile from '@/components/header-components/Profile';
import Edit from '@/components/svg-component/Edit';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { UserContext } from '@/App';
import Button from '@/components/reusable/Button';
import { getProvider } from '@/utils/utilities';
import '@/styles/main-account.css';
import { Helmet } from 'react-helmet-async';
import { forgotPasword, handleInputChange } from '@/utils/utilities';
import { changeOptionsUser } from '@/services/firebase-options-users';
import { sendEmailVerificationFirebase } from '@/services/firebase-auth-users';
import { isPasswordProvider } from '@/utils/validations';

const Account = () => {
  // Navegación de React Router
  const navigate = useNavigate();
  // Contexto de usuario
  const user = useContext(UserContext);
  // Configuración de usuario
  const [configUser, setConfigUser] = useState<Record<string, string>>({
    user: user?.uid || '',
    displayName: user?.displayName || '',
    email: user?.email || '',
    password: '',
    phone: user?.phoneNumber || '',
  });
  // Estados de los inputs
  const [svgState, setSvgState] = useState([false, false, false]);

  // Manejar el evento de los SVG
  const handleSVG = (index: number) => {
    // Si el usuario no está autenticado con contraseña, no puede cambiar la configuración de la cuenta
    if (user && !isPasswordProvider(user)) {
      toast.error(
        `The user authenticated with ${getProvider(user)} cannot change the account settings of some options.`,
        {
          duration: 10000,
        }
      );
      return;
    }

    // Si alguno de los estados anteriores es true y no es el mismo comentamos que no puede editar otra opción sin guardar los cambios
    if (svgState.some((state, i) => state && i !== index)) {
      toast.error('Save the changes before editing another option');
      return;
    }

    // Cambiamos el estado del SVG actual
    setSvgState((prevState) =>
      prevState.map((state, i) => (i === index ? !state : state))
    );

    // LLamamos a la funcion manejadora de los cambios de las opciones
    handleClickSaveUser();
  };

  // Función para eliminar el usuario
  const handleDelateUser = () => {
    const email = user?.email;
    const del = true;
    navigate('/verify', { state: { email, del } });
  };

  // Función para guardar los cambios del usuario
  const handleClickSaveUser = async () => {
    if (!user) return;

    // Manejador de eventos
    let succes;
    // Si se ha cmabiado el email, cambiamos la configuración del usuario si no es posible cambiamos el estado del email al incial del usuario actual
    if (user?.email !== configUser.email) {
      succes = await changeOptionsUser(configUser.email, navigate, user);
      if (!succes)
        setConfigUser({
          user: user?.uid || '',
          displayName: user?.displayName || '',
          email: user?.email || '',
          password: '',
          phone: user?.phoneNumber || '',
        });
      // Si se ha cambiado el nombre de usuario, cambiamos la configuración del usuario si no es posible cambiamos el estado del nombre de usuario al incial del usuario actual
    } else if (user?.displayName !== configUser.displayName) {
      succes = await changeOptionsUser(configUser.displayName, navigate, user);
      if (!succes)
        setConfigUser({
          user: user?.uid || '',
          displayName: user?.displayName || '',
          email: user?.email || '',
          password: '',
          phone: user?.phoneNumber || '',
        });
    }
  };

  // Si el usuario existe, mostramos la interfaz de usuario, si no redirigimos al usuario a la página de errores
  if (!user) navigate('/404');
  else {
    return (
      <>
        <Helmet>
          <title>Account</title>
          <meta
            name="description"
            content="Change your account settings on The Fluent Spanish House, verify your account, and get help from the website owner or your teacher."
          />
        </Helmet>
        <main className="main-account">
          <div className="ac-backdrop-img"></div>
          <div className="ac-content">
            <Profile />
            <section className="ac-info">
              <h3>Information</h3>
              <ul>
                <li>
                  User
                  <input
                    type="text"
                    name="displayName"
                    value={configUser.displayName}
                    onChange={(e) => handleInputChange(e, setConfigUser)}
                    disabled={!svgState[0]}
                    style={{
                      backgroundColor: svgState[0]
                        ? 'transparent'
                        : 'rgba(128, 128, 128, 0.5)',
                    }}
                  />
                  <Edit
                    commentText={configUser.displayName}
                    event={handleSVG}
                    index={0}
                    state={svgState[0]}
                  />
                </li>
                <li>
                  Email
                  <input
                    type="text"
                    name="email"
                    value={configUser.email}
                    onChange={(e) => handleInputChange(e, setConfigUser)}
                    disabled={!svgState[1]}
                    style={{
                      backgroundColor: svgState[1]
                        ? 'transparent'
                        : 'rgba(128, 128, 128, 0.5)',
                    }}
                  />
                  <Edit
                    commentText={configUser.email}
                    event={handleSVG}
                    index={1}
                    state={svgState[1]}
                  />
                </li>
              </ul>
              <div className="action-btn">
                <Button
                  className={`save-user ${
                    user.email === configUser.email &&
                    user.displayName === configUser.displayName
                      ? ''
                      : 'active'
                  }`}
                  event={handleClickSaveUser}
                >
                  Save data
                </Button>
                <Button id="delate-user" event={handleDelateUser}>
                  Delate User
                </Button>
              </div>
            </section>
            <section className="help-center">
              <h2>Help Center</h2>
              <ul>
                <li>
                  If you need to verify your account,{' '}
                  <a
                    href="#"
                    onClick={() => sendEmailVerificationFirebase(user)}
                  >
                    Click here
                  </a>
                </li>
                <li>
                  I have lost my{' '}
                  <a href="#" onClick={() => forgotPasword(user, navigate)}>
                    password
                  </a>
                </li>
                <li>
                  I want to contact the website{' '}
                  <a
                    href="https://github.com/karlosvas/thefluentspanishhouse"
                    target="_blank"
                  >
                    owner
                  </a>
                </li>
                <li>
                  I want to contact{' '}
                  <a href="/contact" target="_blank">
                    my teacher
                  </a>
                </li>

                <li>
                  Read our{' '}
                  <a href="/info" target="_blank">
                    terms and conditions
                  </a>{' '}
                  and our{' '}
                  <a href="info" target="_blank">
                    privacy policy
                  </a>
                </li>
              </ul>
            </section>
          </div>
        </main>
      </>
    );
  }
};

export default Account;
