import dotenv from 'dotenv';
dotenv.config();
////////////////////////////////////////////////////////////////
import { NoteType, SubscriberType } from 'types/types';
import { Resend } from 'resend';

// Configurar el cliente de Mandrill
const resend = new Resend(process.env.RESEND_API_KEY as string);
const admin = process.env.ADMIN_GMAIL as string;

// Enviar nota de contact us a el administrador
export async function submitNote(note: NoteType) {
  try {
    return await resend.emails.send({
      from: 'no-reply@thefluentspanishhouse.com',
      to: [admin],
      subject: note.subject,
      html: `
    <p>The user <strong>${note.username}</strong> with email ${note.email_user} sent you this message:</p><br /><p>${note.note}</p>`,
      headers: {
        'Reply-To': note.email_user,
      },
    });
  } catch (error) {
    console.error('Error sending email', error);
    throw error;
  }
}

// // Enviar email de nuevo estuidiante a el administrador
export async function submitEmailStudent(newstudent: SubscriberType) {
  try {
    return await resend.emails.send({
      from: 'no-reply@thefluentspanishhouse.com',
      to: [admin],
      subject: `New student on TheFluentSpanishHouse ${newstudent.name} ${newstudent.lastname}`,
      html: `<p>The user <b>${newstudent.name} ${newstudent.lastname}</b> wants to be a new student:</p><br />
    <p>He wants to sign up for <b>${newstudent.class}<b/><p/>`,
    });
  } catch (error) {
    console.error('Error sending email', error);
    throw error;
  }
}

// Enviar email de nuevo comentario a el administrador
export async function submitEmailComment(note: NoteType, originUrl: string) {
  try {
    return await resend.emails.send({
      from: `no-reply@thefluentspanishhouse.com`,
      to: [admin],
      subject: note.subject,
      html: `<p>The user <strong>${note.username} ${note.email_user}</strong> says:</p><br>
      <p>${note.note}</p><br />
      <p>From the post: ${originUrl}</p><br />User: ${note.email_user}`,
    });
  } catch (error) {
    console.error('Error sending email', error);
    throw error;
  }
}
