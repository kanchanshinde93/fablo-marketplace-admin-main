import { CoreMenu } from '@core/types'

export const menu: CoreMenu[] = [
  {
    id: 'home',
    title: 'Home',
    translate: 'MENU.HOME',
    type: 'item',
    icon: 'home',
    url: '/dashboard/home'
  },
  {
    id: 'users',
    title: 'Users',
    translate: 'MENU.USERS',
    type: 'item',
    icon: 'user',
    url: '/userType/users'
  },
  {
    id: 'outlet',
    title: 'Outlet',
    translate: 'MENU.OUTLET',
    type: 'item',
    icon: 'layout',
    url: '/outletInfo/outlet'
  },
  {
    id: 'orders',
    title: 'Orders',
    translate: 'MENU.ORDERS',
    type: 'item',
    icon: 'shopping-cart',
    url: '/orders/orderList'
  },
  {
    id: 'ticket',
    title: 'Ticket',
    translate: 'MENU.TICKET',
    type: 'item',
    icon: 'list',
    url: '/dashboard/ticket'
  },
  {
    id: 'advertiesment',
    title: 'Advertisement',
    translate: 'MENU.ADVERTIESMENT',
    type: 'item',
    icon: 'volume-2',
    url: '/marketing/advertiesment'
  },
  // {
  //   id: 'promotion',
  //   title: 'Promotion',
  //   translate: 'MENU.PROMOTION',
  //   type: 'item',
  //   icon: 'percent',
  //   url: '/marketing/promotion'
  // },
]
