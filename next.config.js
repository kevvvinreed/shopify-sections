/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

const isDev = true;

const env = {
  IS_DEV: isDev ? "true" : "false",
  GA_TAG: "",
  CHAIN_ID: isDev ? "11155111" : "1",
  CONTRACT_ADDRESS: isDev ? "0xbB552F012aFDE2267119c96ea46C2Da25Db9D45e" : "0xbB552F012aFDE2267119c96ea46C2Da25Db9D45e"
};

module.exports = {
  nextConfig,
  env,
};
