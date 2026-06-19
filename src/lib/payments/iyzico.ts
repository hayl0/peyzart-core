import Iyzipay from 'iyzipay';

export const iyzico = new Iyzipay({
    apiKey: process.env.IYZICO_API_KEY || 'sandbox-key',
    secretKey: process.env.IYZICO_SECRET_KEY || 'sandbox-secret',
    uri: process.env.IYZICO_URI || 'https://sandbox-api.iyzipay.com'
});

export const createIyzicoPayment = (data: Record<string, unknown>) => {
    return new Promise<Record<string, unknown>>((resolve, reject) => {
        iyzico.payment.create(data, (err: Error | null, result: Record<string, unknown>) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
};
