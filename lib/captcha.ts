export async function verifyCaptcha(token: string) {
  if (!token) {
    return false;
  }

  const secret = process.env.RECAPTCHA_SECRET_KEY;

  if (!secret) {
    throw new Error("RECAPTCHA_SECRET_KEY belum diatur.");
  }

  const response = await fetch(
    "https://www.google.com/recaptcha/api/siteverify",
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        secret,
        response: token,
      }),
    }
  );

  const result = await response.json();

  return result.success === true;
}