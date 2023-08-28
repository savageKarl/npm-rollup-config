export const commonExternal = (pkg, deps) => {
  return {
    external: [...Object.keys(pkg.dependencies || {}), ...deps],
  };
};
