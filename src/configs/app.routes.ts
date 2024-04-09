const userManagementRoot = 'user';

const v1 = 'v1';

export const routesV1 = {
  version: v1,
  userManagement: {
    root: userManagementRoot,
    login: `login`,
    post: `/${userManagementRoot}`,
    get: `/${userManagementRoot}`,
    put: `/${userManagementRoot}`,
    delete: `/${userManagementRoot}`,
  },
};
