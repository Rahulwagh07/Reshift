import nodemailer from "nodemailer";

export const mailSender = async (email: string, title: string, body: string): Promise<any> => {
    try {
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST as string,
            auth: {
                user: process.env.MAIL_USER as string,
                pass: process.env.MAIL_PASS as string,
            }
        });

        let info = await transporter.sendMail({
            from: 'Reshift',
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`,
        });

        console.log(info);
        return info;
    } catch (error) {
        console.log(error);
    }
};

