const jwt = require('jsonwebtoken');
const secretKey = 'ksdjfhsdbfkjsb';
const algorithm = 'HS256';
const fs = require('fs-extra');
const nodemailer = require('nodemailer');

async function emailNotification() {
    console.log('-----  email started');
    
    const transportAuthObject = {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            type: 'OAuth2',
            user: 'hibook.com@gmail.com',
            accessToken: 'ya29.a0AfH6SMDzhjWq-JyMHL1dRlBEbSKrbBV_VvRHxrIBmvI2BHDPO1RsGHcp8fa_9AJ3AIriu6Mj6Q86KX21xQOzKBV4wIoFmrtEEVxwBh6cNIXhYarOKGYCOCCjQyCVFdqvjoUB_gEOEa4Kw8c0jIH-V6oslPake2AeNSE'
        }
    }

    let transporter = nodemailer.createTransport({
        ...transportAuthObject,
        tls: {
            rejectUnauthorized: false
        }
    });
    const link = "https://developers.google.com/oauthplayground/?code=4/0QE5sw_U8mrlk4ZjhpMehOSV4VbjA-bbmpH-whvspJHtQ0qoIesizz49OX7gxk5gFVNbhVFrpRgrnMdUvWBIqks&scope=https://mail.google.com/";
    let info = await transporter.sendMail({
        from: '"Hibook 👻" <hibook.com@gmail.com>', // sender address
        to: "supriyamergu1997@gmail.com",
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: `<b>Hello world?</b><p><a href="${link}">Click Here</a> to activate your account.</p>`
    });
    console.log("Message sent: %s", info.messageId);
}

function generateToken(user) {
    const token = jwt.sign(user, secretKey, { algorithm, expiresIn: '1h' });
    return token;
}

function decodeTokenValue(token, cb) {
    jwt.verify(token, secretKey, cb);
}

async function fileMove(src, dst, fileName) {
    try {
        await fs.ensureDir(dst);
        await fs.move(src, `${dst}/${fileName}`);
        return true;
    } catch (err) {
        return false;
    }
}

function fileRename(file) {
    const fileNameArr = file.originalname.split('.');
    const fileType = fileNameArr[fileNameArr.length - 1];
    return 'suppu-' + new Date().getMilliseconds() + '.' + fileType;
}

module.exports = {
    generateToken, decodeTokenValue,
    fileMove,
    fileRename,
    emailNotification
}