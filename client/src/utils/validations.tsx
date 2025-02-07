// Comprueba si el email es válido
export function isValidEmail(email: string) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Compreueba si el usuario no está autenticado con contraseña o por otro proveedor
export function isPasswordProvider(user: any): boolean {
  return user?.providerData.some(
    (provider: { providerId: string }) => provider.providerId === 'password'
  );
}
