const axios = require("axios");

const MENU_NODE_TYPE = "StrapiMenus";

const fetchData = async (url, headers) => await axios.get(url, headers);

exports.sourceNodes = async (
    { actions, createContentDigest, createNodeId },
    { apiURL, accessToken, menusEndpoint, nested = false, menuID = "" }
) => {
    if (!apiURL)
        return reporter.panic(
            "Gatsby-source-menus-strapi-plugin: Please provide your strapi apiURL endpoint"
        );

    const { createNode } = actions;

    const nestedParam = nested
        ? `${menusEndpoint}/${menuID}?nested&populate=*`
        : menusEndpoint;
    const fetch_url = `${apiURL}/api/${nestedParam}`;

    let headers = {};

    if (accessToken) {
        headers.authorization = `Bearer ${accessToken}`;
    }

    const { data: response } = await fetchData(fetch_url, headers).catch((error) => {
        throw new Error(
            `🚫🚫🚫🙅‍♀️🙅‍♀️🙅‍♀️ Error fetching data from ${fetch_url} - ${error} 🚫🚫🚫🙅‍♀️🙅‍♀️🙅‍♀️`
        );
    });

    const arrayOfItems = menuID
        ? response.data.attributes.items.data
        : response.data;

    arrayOfItems.forEach((item) =>
        createNode({
            ...item,
            id: createNodeId(`${MENU_NODE_TYPE}-${item.id}`),
            parent: null,
            children: [],
            internal: {
                type: MENU_NODE_TYPE,
                content: JSON.stringify(item),
                contentDigest: createContentDigest(item),
            },
        })
    );

    return;
};
