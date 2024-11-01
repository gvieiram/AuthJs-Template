export const resendDefault = {
  projectName: "AuthJs Template",
  resendDomain: "@futbetai.gvieiram.tech",
};

const { projectName, resendDomain } = resendDefault;

export const resendEmailFrom = {
  NO_REPLY: `${projectName} <no-reply${resendDomain}>`,
  LEARNING: `${projectName} <learning${resendDomain}>`,
  NEWSLETTER: `${projectName} <newsletter${resendDomain}>`,
};
