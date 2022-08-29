const enum NAMESPACE_ENV {
  PRODUCTION = 'production',
  STAGING = 'staging',
}

export const isNameSpaceProduction = () => process.env.NAMESPACE_ENV === NAMESPACE_ENV.PRODUCTION;
