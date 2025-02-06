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
      from: 'TheFluentSpanishHosue <noreply@thefluentspanishhouse.com>',
      to: [admin],
      subject: note.subject,
      html: `
      <html>
      <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; color: #333; margin: 0; padding: 20px;">
        <div style="background-color: #fff; padding: 20px; max-width: 1000px; margin: 20px auto; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
          <h1 style="text-align: center; color: #2a8cff;">The Fuent Spanish House</h1>
          <h3 style="text-align: center; color: #2a8cff;">New Message from ${note.username}</h2>
          <p style="font-size: 16px; line-height: 1.6;">The user <strong style="color: #2a8cff;">${note.username}</strong> with email <strong style="color: #2a8cff;">${note.email_user}</strong> sent you the following message:</p>
          <p style="font-size: 16px; line-height: 1.6; background-color: #f9f9f9; padding: 10px; border-left: 4px solid #2a8cff; margin-top: 10px;">${note.note}</p>
          <p style="font-size: 14px; color: #777; text-align: center; margin-top: 30px;">Thank you for your attention.</p>
        </div>
      </body>
      </html>
      `,
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
      from: 'TheFluentSpanishHosue <noreply@thefluentspanishhouse.com>',
      to: [admin],
      subject: `The Fluent Spanish House: New Student ${newstudent.name} ${newstudent.lastname}`,
      html: `<html>
        <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; color: #333; margin: 0; padding: 20px;">
          <div style="background-color: #fff; padding: 20px; max-width: 1000px; margin: 20px auto; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
            <h1 style="text-align: center; color: #2a8cff;">The Fluent Spanish House</h1>
            <h3 style="text-align: center; color: #2a8cff;">New Student Request</h3>
            <p style="font-size: 16px; line-height: 1.6;">The user <b style="color: #2a8cff;">${newstudent.name} ${newstudent.lastname}</b> with email <b style="color: #2a8cff;">${newstudent.email}</b> wants to be a new student:</p>
            <p style="font-size: 16px; line-height: 1.6;">They would like to sign up for <b style="color: #2a8cff;">${newstudent.class}</b>.</p>
            <p style="font-size: 14px; color: #777; text-align: center; margin-top: 30px;">Thank you for your attention.</p>
          </div>
        </body>
      </html>`,
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
      from: `TheFluentSpanishHosue <noreply@thefluentspanishhouse.com>`,
      to: [admin],
      subject: note.subject,
      html: `
        <html>
          <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; color: #333; margin: 0; padding: 20px;">
            <div style="background-color: #fff; padding: 20px; max-width: 1000px; margin: 20px auto; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
              <h1 style="text-align: center; color: #2a8cff;">The Fluent Spanish House</h1>
              <h3 style="text-align: center; color: #2a8cff;">New Like from ${note.username}</h3>
              <p style="font-size: 16px; line-height: 1.6;">The user <strong style="color: #2a8cff;">${note.username} (${note.email_user})</strong> says:</p>
              <p style="font-size: 16px; line-height: 1.6; background-color: #f9f9f9; padding: 10px; border-left: 4px solid #2a8cff; margin-top: 10px;">${note.note}</p>
              <p style="font-size: 16px; line-height: 1.6; margin-top: 20px;">From the post: <a href="${originUrl}" style="color: #2a8cff;" target="_blank">${originUrl}</a></p>
              <p style="font-size: 14px; color: #777; text-align: center; margin-top: 30px;">User: <strong style="color: #2a8cff;">${note.email_user}</strong></p>
              <p style="font-size: 14px; color: #777; text-align: center;">Thank you for your attention.</p>
            </div>
          </body>
        </html>
      `,
    });
  } catch (error) {
    console.error('Error sending email', error);
    throw error;
  }
}

export async function submitLikeComment(
  note: NoteType,
  originUrl: string,
  like_from: string
) {
  try {
    return await resend.emails.send({
      from: `TheFluentSpanishHosue <noreply@thefluentspanishhouse.com>`,
      to: [admin],
      subject: note.subject,
      html: `
        <html>
          <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; color: #333; margin: 0; padding: 20px;">
            <div style="background-color: #fff; padding: 20px; max-width: 1000px; margin: 20px auto; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
              <h1 style="text-align: center; color: #2a8cff;">The Fluent Spanish House</h1>
              <h3 style="text-align: center; color: #2a8cff;">New Like from ${note.username} ❤️</h3>
              <p style="font-size: 16px; line-height: 1.6; margin-top: 20px;">
                From post: <br />
                <a href="${originUrl}" style="color: #2a8cff;" target="_blank">${originUrl}</a>
              </p>
              <p style="font-size: 14px; color: #777; text-align: center; margin-top: 30px;">To: <strong style="color: #2a8cff;">${note.email_user}</strong></p>
              <p style="font-size: 14px; color: #777; text-align: center;">From: <strong style="color: #2a8cff;">${like_from}</strong></p>
              <p style="font-size: 14px; color: #777; text-align: center;">Thank you for your attention.</p>
            </div>
          </body>
        </html>
              `,
    });
  } catch (error) {
    console.error('Error sending email', error);
    throw error;
  }
}
