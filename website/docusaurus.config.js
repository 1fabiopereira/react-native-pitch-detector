// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'React Native Picth Detector',
  staticDirectories: ['static'],
  tagline: 'High performance real time pitch detection.',
  url: 'https://1fabiopereira.github.io/',
  baseUrl: '/react-native-pitch-detector/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: '1fabiopereira', // Usually your GitHub org/user name.
  projectName: 'react-native-pitch-detector', // Usually your repo name.
  trailingSlash: false,

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editCurrentVersion: true,
          editUrl:
            'https://github.com/1fabiopereira/react-native-pitch-detector/edit/master/website',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'React Native Picth Detector',
        logo: {
          alt: 'React Native Picth Detector',
          src: 'img/react-native-pitch-detector.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'before-you-start',
            position: 'left',
            label: 'Docs',
          },
          {
            href: 'https://github.com/1fabiopereira/react-native-pitch-detector',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Docs',
                to: '/docs/before-you-start',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Fábio Pereira.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
