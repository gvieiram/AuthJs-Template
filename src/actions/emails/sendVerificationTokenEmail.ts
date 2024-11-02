import {
	BASE_URL,
	errorCode,
	resendDefault,
	resendEmailFrom,
} from "@/constants";
import { VerificationTokenEmail, resend } from "@/emails";
import { publicRoutes } from "@/routes";

export async function sendVerificationTokenEmail(
	email: string,
	token: string,
	expiresIn: Date,
) {
	try {
		const tokenExpirationMinutes = Math.ceil(
			(expiresIn.getTime() - new Date().getTime()) / 60000,
		);

		const redirectUrl = `${BASE_URL}${publicRoutes.REGISTER_DETAILS}?code=${token}`;

		await resend.emails.send({
			from: resendEmailFrom.ONBOARDING,
			to: email,
			subject: "Código de verificação para criar uma nova conta",
			react: VerificationTokenEmail({
				redirectUrl,
				tokenExpirationTime: tokenExpirationMinutes,
				websiteName: resendDefault.projectName,
				websiteUrl: BASE_URL,
			}),
		});
		return { success: true, message: "Verification email sent successfully." };
	} catch (emailError) {
		console.error("Error sending verification email:", emailError);
		throw new Error(errorCode.VERIFICATION_TOKEN_FAILED_TO_SEND_EMAIL);
	}
}
