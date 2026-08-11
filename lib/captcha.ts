export interface CaptchaVerificationResult {
  success: boolean;
  score?: number;
  action?: string;
  hostname?: string;
  errorCodes?: string[];
}

export async function verifyCaptcha(
  token: string
): Promise<CaptchaVerificationResult> {
  if (!token) {
    return {
      success: false,
      errorCodes: ["missing-input-response"],
    };
  }

  const secret =
    process.env.RECAPTCHA_SECRET_KEY;

  if (!secret) {
    throw new Error(
      "RECAPTCHA_SECRET_KEY belum diatur."
    );
  }

  try {
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
        cache: "no-store",
      }
    );

    if (!response.ok) {
      console.error(
        "RECAPTCHA HTTP ERROR:",
        response.status,
        response.statusText
      );

      return {
        success: false,
        errorCodes: [
          `http-${response.status}`,
        ],
      };
    }

    const result =
      await response.json();

    console.log(
      "RECAPTCHA VERIFICATION:",
      {
        success: result?.success,
        score: result?.score,
        action: result?.action,
        hostname: result?.hostname,
        errorCodes:
          result?.["error-codes"] ?? [],
      }
    );

    return {
      success:
        result?.success === true,

      score:
        typeof result?.score === "number"
          ? result.score
          : undefined,

      action:
        typeof result?.action === "string"
          ? result.action
          : undefined,

      hostname:
        typeof result?.hostname === "string"
          ? result.hostname
          : undefined,

      errorCodes:
        Array.isArray(
          result?.["error-codes"]
        )
          ? result["error-codes"]
          : [],
    };
  } catch (error) {
    console.error(
      "RECAPTCHA FETCH ERROR:",
      error
    );

    return {
      success: false,
      errorCodes: [
        "recaptcha-fetch-error",
      ],
    };
  }
}