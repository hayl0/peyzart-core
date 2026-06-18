export const GET = async () => {
  return Response.json({
    bypass: process.env.BYPASS_AUTH,
    node: process.version,
    dbUrl: process.env.DATABASE_URL ? 'set' : 'not set',
    fbase: process.env.FIREBASE_SERVICE_ACCOUNT_KEY ? 'set' : 'not set',
  });
};
