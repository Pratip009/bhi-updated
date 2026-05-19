/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.brighthorizoninstitute.com",
  generateRobotsTxt: true,

  exclude: [
    "/admin/*",
    "/signin",
    "/signup",
    "/dashboard",
    "/profile",
    "/unauthorized",
  ],
};