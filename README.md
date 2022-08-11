# Gatsby source menus strapi plugin

The package helps you to fetch data from [strapi plugin menus](https://github.com/mattmilburn/strapi-plugin-menus) into [GatsbyJs](https://www.gatsbyjs.com/) as graphql nodes.

# Install

```
yarn add gatsby-source-menus-strapi-plugin
```

# How to use

`gatsby-config.js`

```
module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-menus-strapi-plugin`,
      options: {
        apiURL: `http://localhost:1337`,
        menusEndpoint: `menus`,
        nested: true, // default to false
        menuID: '', // leave it empty string for all menu population ,otherwise add your menu id number
      },
    },
  ],
}
```

# Strapi plugin menus example

### Top level menus

![strapi plugin menus - menu manager](/assets/images/menu%20manager.png)

### Nested menus

![strapi plugin menus - nested menus](/assets/images/edit%20menu.png)

# Gatsby GraphiQl example

![strapi plugin menus - nested menus](/assets/images/gatsbyJs%20-%20graphiQL.png)
