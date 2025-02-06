export const convertRoutes = (route: string): string => {
  if (route === '/contract') {
    return 'contrato';
  }
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

export const convertContract = (contract: string) => {
  if (contract === 'bidding') {
    return 'LICITAÇÃO';
  }
  if (contract === 'publicinterest') {
    return 'INTERESSE PÚBLICO';
  }
  return 'SERVIÇO';
};
