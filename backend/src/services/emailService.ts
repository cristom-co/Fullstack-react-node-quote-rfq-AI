import nodemailer from 'nodemailer';

export const sendEmail = async (quote: any) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'tu-email@gmail.com',
            pass: 'tu-contraseña'
        }
    });

    const mailOptions = {
        from: 'tu-email@gmail.com',
        to: 'cliente@gmail.com',
        subject: 'Cotización',
        text: `Aquí está su cotización: ${JSON.stringify(quote)}`
    };

    await transporter.sendMail(mailOptions);
};
