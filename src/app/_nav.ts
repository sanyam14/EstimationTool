import { INavData } from '@coreui/angular';


export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer'

  },

  // {
  //   name: 'Admin Dashboard',
  //   url: 'dashboard/adminDashboard',
  //   icon: 'icon-speedometer'

  // },

  {
    name: 'Masters',
    url: '/estimate-item',
    icon: 'icon-puzzle',
    children: [
      {
        name: "Assembly Relationship",
        url: '/estimate-item/AssemblyRelationView',
        icon: 'icon-puzzle'
      },
      {
        name: "Catalogue Master",
        url: '/estimate-item/CategoryView',
        icon: 'icon-puzzle'
      },
      {
        name: "Markup Category",
        url: '/estimate-item/EstiMarketCtgview',
        icon: 'icon-puzzle'
      },
      {
        name: "Overhead Master",
        url: '/estimate-item/OverheadView',
        icon: 'icon-puzzle'
      },
      {
        name: "Customer Vendor Master",
        url: '/estimate-item/CustVenView',
        icon: 'icon-puzzle'
      },
      {
        name: "Contact Master",
        url: '/estimate-item/ContactView',
        icon: 'icon-puzzle'
      },
      {
        name: "Department Master",
        url: '/estimate-item/DepartView',
        icon: 'icon-puzzle'
      },
      {
        name: "Resource Master",
        url: '/estimate-item/ResourceView',
        icon: 'icon-puzzle'
      },
      {
        name: "Estimate Group",
        url: '/estimate-item/EstimateGroupView',
        icon: 'icon-puzzle'
      },

      {
        name: "Item Master",
        url: '/estimate-item/EstiMateItemView',
        icon: 'icon-puzzle'
      },
     {
        name: 'Master Dashboard',
        url: '/estimate-item/MasterDashboard',
        icon: 'icon-puzzle'
      }  ,





      {
        name: 'Estimation Workings',
        url: '/estimate-item/EstimateWorkingAddEdit',
        icon: 'icon-puzzle'
      }
    ]
  },

  {
    name: 'Cost Summary',
    url: '/cost-summary',
    icon: 'icon-cursor',
    children: [
      {
        name: 'Estimation Summary',
        url: '/cost-summary/EstimationCostAddEdit',
        icon: 'icon-cursor'
      }

    ]
  },

  {
    name: 'Communication',
    url: '/buttons',
    icon: 'icon-star',
    children: [
      {
        name: 'Ticket Generate',
        url: '',
        icon: 'icon-star'
      },
      {
        name: 'FeedBack',
        url: '',
        icon: 'icon-star'
      }

    ]
  },

];
