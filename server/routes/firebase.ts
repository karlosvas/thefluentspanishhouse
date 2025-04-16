import { Router } from 'express';
import { log, verifyIdToken } from '../middelware/token-logs.js';
import { getUidByEmail } from '../lib/firebase/firebase-db.js';

const router = Router();

router.get(
  '/user/:email',
  log,
  verifyIdToken,
  async (req, res): Promise<void> => {
    // Obtener el UID de un usuario por su correo electrónico
    const { email } = req.params;

    if (!email) {
      res.status(400).json({ message: 'Missing required fields' });
      return;
    }

    getUidByEmail(email)
      .then((uid) => {
        // Devolbemos el UID del usuario si existe
        if (uid) res.status(200).json({ uid });
        else res.status(404).json({ message: 'User not found' });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ message: 'Unexpected error' });
      });
  }
);

export { router };
