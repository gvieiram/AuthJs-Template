export const resendDefault = {
	projectName: "AuthJs Template",
	resendDomain: "@futbetai.gvieiram.tech",
};

const { projectName, resendDomain } = resendDefault;

export const resendEmailFrom = {
	NO_REPLY: `${projectName} <no-reply${resendDomain}>`,
	ONBOARDING: `${projectName} <onboarding${resendDomain}>`,
	LEARNING: `${projectName} <learning${resendDomain}>`,
	NEWSLETTER: `${projectName} <newsletter${resendDomain}>`,
};
