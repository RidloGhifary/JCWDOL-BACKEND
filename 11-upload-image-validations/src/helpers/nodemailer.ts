import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ridloghfry@gmail.com",
    pass: "qysuhltkzymzgawe",
  },
});
