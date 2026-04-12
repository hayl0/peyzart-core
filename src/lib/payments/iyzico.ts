import Iyzipay from 'iyzipay';

export const iyzico = new Iyzipay({
    apiKey: process.env.IYZICO_API_KEY || 'sandbox-key',
    secretKey: process.env.IYZICO_SECRET_KEY || 'sandbox-secret',
    uri: process.env.IYZICO_URI || 'https://sandbox-api.iyzipay.com'
});

export const createIyzicoPayment = (data: any) => {
    return new Promise((resolve, reject) => {
        iyzico.payment.create(data, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
};
