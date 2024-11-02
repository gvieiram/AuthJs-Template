export const publicRoutes = {
  HOME: "/",
  LOGIN: "/auth/sign-in",
  REGISTER: "/auth/sign-up",
  REGISTER_DETAILS: "/auth/sign-up/register",
  FORGOT_PASSWORD: "/auth/forgot-password",
};

export const privateRoutes = {
  DASHBOARD: "/dashboard",
};

export const publicRoutesArray = Object.values(publicRoutes);

export const privateRoutesArray = Object.values(privateRoutes);

export const redirectRules = {
  loggedIn: {
    paths: [publicRoutes.REGISTER],
    to: privateRoutes.DASHBOARD,
  },
  unauthenticated: {
    paths: privateRoutesArray,
    to: publicRoutes.LOGIN,
  },
};
