// Type Imports
import type { VerticalMenuDataType } from '@/types/menuTypes'
import type { getDictionary } from '@/utils/getDictionary'

const verticalMenuData = (dictionary: Awaited<ReturnType<typeof getDictionary>>): VerticalMenuDataType[] => [
  // This is how you will normally render submenu
  {
    label: dictionary['navigation'].dashboards,
    suffix: {
      label: '5',
      color: 'error'
    },
    icon: 'tabler-smart-home',
    children: [
      // This is how you will normally render menu item
      {
        label: dictionary['navigation'].crm,
        icon: 'tabler-circle',
        href: '/dashboards/crm'
      },
      {
        label: dictionary['navigation'].analytics,
        icon: 'tabler-circle',
        href: '/dashboards/analytics'
      },
      {
        label: dictionary['navigation'].eCommerce,
        icon: 'tabler-circle',
        href: '/dashboards/ecommerce'
      },
      {
        label: dictionary['navigation'].academy,
        icon: 'tabler-circle',
        href: '/dashboards/academy'
      },
      {
        label: dictionary['navigation'].logistics,
        icon: 'tabler-circle',
        href: '/dashboards/logistics'
      }
    ]
  },
  {
    label: "Master",
    icon: 'tabler-files',
    children: [
      {
        label: "Quiz",
        href: '/master/quiz',
        target: '_blank',
        excludeLang: true
      },
      {
        label: "Question Bank",
        href: '/master/questions',
        target: '_blank',
        excludeLang: true
      },
    ]
  },
  {
    label: dictionary['navigation'].frontPages,
    icon: 'tabler-files',
    children: [
      {
        label: dictionary['navigation'].landing,
        href: '/front-pages/landing-page',
        target: '_blank',
        excludeLang: true
      },
      {
        label: dictionary['navigation'].pricing,
        href: '/front-pages/pricing',
        target: '_blank',
        excludeLang: true
      },
      {
        label: dictionary['navigation'].payment,
        href: '/front-pages/payment',
        target: '_blank',
        excludeLang: true
      },
      {
        label: dictionary['navigation'].checkout,
        href: '/front-pages/checkout',
        target: '_blank',
        excludeLang: true
      },
      {
        label: dictionary['navigation'].helpCenter,
        href: '/front-pages/help-center',
        target: '_blank',
        excludeLang: true
      }
    ]
  },


  {
    label: dictionary['navigation'].formsAndTables,
    isSection: true,
    children: [
      {
        label: dictionary['navigation'].formLayouts,
        icon: 'tabler-layout',
        href: '/forms/form-layouts'
      },
      {
        label: dictionary['navigation'].formValidation,
        icon: 'tabler-checkup-list',
        href: '/forms/form-validation'
      },
      {
        label: dictionary['navigation'].formWizard,
        icon: 'tabler-git-merge',
        href: '/forms/form-wizard'
      },
      {
        label: dictionary['navigation'].reactTable,
        icon: 'tabler-table',
        href: '/react-table'
      },
      {
        label: dictionary['navigation'].formELements,
        icon: 'tabler-checkbox',
        suffix: <i className='tabler-external-link text-xl' />,
        href: `${process.env.NEXT_PUBLIC_DOCS_URL}/docs/user-interface/form-elements`,
        target: '_blank'
      },
      {
        label: dictionary['navigation'].muiTables,
        icon: 'tabler-layout-board-split',
        href: `${process.env.NEXT_PUBLIC_DOCS_URL}/docs/user-interface/mui-table`,
        suffix: <i className='tabler-external-link text-xl' />,
        target: '_blank'
      }
    ]
  },
  {
    label: dictionary['navigation'].chartsMisc,
    isSection: true,
    children: [
      {
        label: dictionary['navigation'].charts,
        icon: 'tabler-chart-donut-2',
        children: [
          {
            label: dictionary['navigation'].apex,
            icon: 'tabler-circle',
            href: '/charts/apex-charts'
          },
          {
            label: dictionary['navigation'].recharts,
            icon: 'tabler-circle',
            href: '/charts/recharts'
          }
        ]
      },

      {
        label: dictionary['navigation'].foundation,
        icon: 'tabler-cards',
        href: `${process.env.NEXT_PUBLIC_DOCS_URL}/docs/user-interface/foundation`,
        suffix: <i className='tabler-external-link text-xl' />,
        target: '_blank'
      },
      {
        label: dictionary['navigation'].components,
        icon: 'tabler-atom',
        href: `${process.env.NEXT_PUBLIC_DOCS_URL}/docs/user-interface/components`,
        suffix: <i className='tabler-external-link text-xl' />,
        target: '_blank'
      },
      {
        label: dictionary['navigation'].menuExamples,
        icon: 'tabler-list-search',
        href: `${process.env.NEXT_PUBLIC_DOCS_URL}/docs/menu-examples/overview`,
        suffix: <i className='tabler-external-link text-xl' />,
        target: '_blank'
      },
      {
        label: dictionary['navigation'].raiseSupport,
        icon: 'tabler-lifebuoy',
        suffix: <i className='tabler-external-link text-xl' />,
        target: '_blank',
        href: 'https://pixinvent.ticksy.com'
      },
      {
        label: dictionary['navigation'].documentation,
        icon: 'tabler-book-2',
        suffix: <i className='tabler-external-link text-xl' />,
        target: '_blank',
        href: `${process.env.NEXT_PUBLIC_DOCS_URL}`
      },
      {
        label: dictionary['navigation'].others,
        icon: 'tabler-menu-2',
        children: [
          {
            suffix: {
              label: 'New',
              color: 'info'
            },
            label: dictionary['navigation'].itemWithBadge,
            icon: 'tabler-circle'
          },
          {
            label: dictionary['navigation'].externalLink,
            icon: 'tabler-circle',
            href: 'https://pixinvent.com',
            target: '_blank',
            suffix: <i className='tabler-external-link text-xl' />
          },
          {
            label: dictionary['navigation'].menuLevels,
            icon: 'tabler-circle',
            children: [
              {
                label: dictionary['navigation'].menuLevel2,
                icon: 'tabler-circle'
              },
              {
                label: dictionary['navigation'].menuLevel2,
                icon: 'tabler-circle',
                children: [
                  {
                    label: dictionary['navigation'].menuLevel3,
                    icon: 'tabler-circle'
                  },
                  {
                    label: dictionary['navigation'].menuLevel3,
                    icon: 'tabler-circle'
                  }
                ]
              }
            ]
          },
          {
            label: dictionary['navigation'].disabledMenu,
            disabled: true
          }
        ]
      }
    ]
  }
]

export default verticalMenuData
