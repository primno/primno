// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/vsLight');
const darkCodeTheme = require('prism-react-renderer/themes/vsDark');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Primno',
  tagline: 'Typescript framework for Model Driven Apps of Power Apps / Dynamics 365',
  url: 'https://primno.io',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',
  favicon: 'img/favicon.svg',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'primno', // Usually your GitHub org/user name.
  projectName: 'primno', // Usually your repo name.
  deploymentBranch: 'gh-pages', // Branch that GitHub pages will deploy from.
  trailingSlash: false, // Recommended for GitHub pages.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  plugins: [
    [
      'docusaurus-plugin-typedoc',
      // {
      //   entryPoints: ['../packages/core/'],
      //   entryPointStrategy: 'packages',
      //   out: 'reference',
      //   sidebar: {
      //     categoryLabel: 'Reference',
      //     position: 100,
      //     fullNames: true,
      //   }
      // },
      {
        entryPoints: ['../packages/core/src/primno-api.ts'],
        out: 'api-reference',
        sidebar: {
          categoryLabel: 'API Reference',
          position: 5,
          fullNames: true,
        },
        tsconfig: '../packages/core/tsconfig.json',
        watch: process.env.TYPEDOC_WATCH ?? false,
      },
    ],
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/primno/primno/tree/website/',
        },
        theme: {
          customCss: [
            require.resolve('./src/css/custom.css'),
            require.resolve('./src/css/fonts.css'),
          ],
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: 'dark',
        respectPrefersColorScheme: true,
        disableSwitch: false
      },

      metadata: [{name: 'keywords', content: 'primno, framework, power-apps, model driven, typescript, javascript'}],

      announcementBar: {
        id: 'beta',
        content: 'Primno is in beta. Please send us your <a target="_blank" href="https://github.com/primno/primno/issues/new/choose">feedback and issues</a>.'
      },

      navbar: {
        title: 'Primno',
        logo: {
          alt: 'Primno Logo',
          src: 'img/logo.svg'
        },
        items: [
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: 'Docs',
          },
          {
            to: '/docs/api-reference',
            position: 'left',
            label: 'API',
          },
          {
            href: 'https://github.com/primno/primno',
            className: 'header-github-link',
            ariaLabel: 'GitHub repository',
            position: 'right',
          },
        ],
      },

      docs: {
        sidebar: {
          // autoCollapseCategories: true,
          hideable: true
        }
      },

      // algolia: {
        // The application ID provided by Algolia
        // appId: 'YOUR_APP_ID',
  
        // // Public API key: it is safe to commit it
        // apiKey: 'YOUR_SEARCH_API_KEY',
  
        // indexName: 'YOUR_INDEX_NAME',
  
        // // Optional: see doc section below
        // contextualSearch: true,
  
        // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
        // externalUrlRegex: 'external\\.com|domain\\.com',
  
        // Optional: Algolia search parameters
        // searchParameters: {},
  
        // Optional: path for search page that enabled by default (`false` to disable it)
        // searchPagePath: 'search',
      // },

      footer: {
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Getting Started',
                to: '/docs/getting-started',
              },
              {
                label: 'Guides',
                to: '/docs/guides',
              },
              {
                label: 'API Reference',
                to: '/docs/api-reference',
              }
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/primno/primno',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Primno.`,
      },

      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
