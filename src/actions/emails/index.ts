export * from "./sendVerificationTokenEmail";

// export async function sendForgotPasswordEmail(
//   email: string,
//   userFirstName: string,
//   resetPasswordLink: string,
//   time: number
// ) {
//   try {
//     await resend.emails.send({
//       from: "no-reply@futbetai.gvieiram.tech",
//       to: email,
//       subject: "Password Reset Request",
//       react: ForgotPasswordEmail({
//         userFirstName,
//         resetPasswordLink,
//         time,
//       }),
//     });
//     return {
//       success: true,
//       message: "Password reset email sent successfully.",
//     };
//   } catch (emailError) {
//     console.error("Error sending verification email:", emailError);
//     return { success: false, message: "Failed to send password reset email." };
//   }
// }

// export async function sendAddPasswordEmail(
//   email: string,
//   userFirstName: string,
//   addPasswordLink: string,
//   time: number
// ) {
//   try {
//     await resend.emails.send({
//       from: "no-reply@futbetai.gvieiram.tech",
//       to: email,
//       subject: "Request for adding password",
//       react: AddPasswordEmail({
//         userFirstName,
//         addPasswordLink,
//         time,
//       }),
//     });
//     return {
//       success: true,
//       message: "Add password email sent successfully.",
//     };
//   } catch (emailError) {
//     console.error("Error sending add password email:", emailError);
//     return {
//       success: false,
//       message: "Failed to send password add password email.",
//     };
//   }
// }

// export async function sendAdminInviteEmail(
//   adminName: string,
//   invitedUserEmail: string,
//   inviteLink: string,
//   time: number
// ) {
//   try {
//     await resend.emails.send({
//       from: "no-reply@futbetai.gvieiram.tech",
//       to: invitedUserEmail,
//       subject: "Invite Link for admin",
//       react: InviteAdmin({
//         adminName,
//         inviteLink,
//         time,
//       }),
//     });
//     return {
//       success: true,
//       message: "Invite link sent successfully.",
//     };
//   } catch (emailError) {
//     console.error("Error sending Invite Link:", emailError);
//     return {
//       success: false,
//       message: "Failed to send invite link.",
//     };
//   }
// }

// export async function sendTwoFactorVerificationEmail(
//   email: string,
//   userFirstName: string,
//   OTP: string,
//   time: number
// ) {
//   try {
//     await resend.emails.send({
//       from: "no-reply@futbetai.gvieiram.tech",
//       to: email,
//       subject: "2FA OTP",
//       react: TwoFactorEmail({
//         userFirstName,
//         OTP,
//         time,
//       }),
//     });
//     return {
//       success: true,
//       message: "Email sent successfully.",
//     };
//   } catch (emailError) {
//     console.error("Error sending two factor verification email:", emailError);
//     return { success: false, message: "Failed to send email." };
//   }
// }
