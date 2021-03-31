export const INIT = '[INIT]';
export const INIT_APPLICATION = `${INIT} Set Initial values for the application`;

export const initializeApplication = () => ({
  type: INIT_APPLICATION,
  payload: {},
});
