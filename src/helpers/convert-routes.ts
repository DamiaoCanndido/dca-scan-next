export const convertRoutes = (route: string): string => {
  if (route === '/decree') {
    return 'decreto';
  }
  if (route === '/law') {
    return 'lei';
  }
  if (route === '/ordinance') {
    return 'portaria';
  }
  return 'ofício';
};
