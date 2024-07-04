import { useState } from 'react';

function LoginModal() {
    const [showModal, setShowModal] = useState(false);
    const [formType, setFormType] = useState('login');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const toggleModal = (type: string) => {
        setFormType(type);
        setShowModal(!showModal);
    };

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(`Intento de inicio de sesión con usuario: ${username} y contraseña: ${password}`);
        setUsername('');
        setPassword('');
        setShowModal(false);
    };

    return (
        <>
            <button onClick={() => toggleModal('login')} id="singIn">Sing in</button>
            <button onClick={() => toggleModal('register')}  id="register">Register</button>
            {showModal &&
                <div className="modalAuth">
                    <div className="modal-content">
                    <span className="closeAuth" onClick={() => toggleModal('')}>&times;</span>
                        <h2>{formType === 'login' ? 'Login' : 'Register'}</h2>
                        <form onSubmit={handleLogin}>
                            <label>
                                Username:
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </label>
                            <br />
                            <label>
                                Password:
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </label>
                            <br />
                            <button type="submit">Login</button>
                        </form>
                    </div>
                </div>
            }
        </>
    );
}

export default LoginModal;
