export interface INavItemChild {
  id: string
  title: string
  caption?: string
  type?: string
  url?: string
  icon?: any
  breadcrumbs?: boolean
  target?: boolean
  external?: boolean
  disabled?: boolean
  children?: INavItemChild[]
}

export interface INavItem {
  id: string
  title: string
  caption?: string
  type?: string
  icon?: any
  url?: string
  target?: boolean
  external?: boolean
  disabled?: boolean
  children?: INavItemChild[]
}

const dashboardMenu: INavItem = {
  id: "001",
  title: "Dashboard",
  type: "group",
  children: [
    {
      id: "001.001",
      title: "Dashboard",
      type: "item",
      url: "/app",
      icon: "dashboard",
      breadcrumbs: false,
    },
  ],
}
const masterMenu: INavItem = {
  id: "002",
  title: "Master",
  type: "group",
  children: [
    {
      id: "002.001",
      title: "Divisi",
      //   type: "collapse",
      url: "/app/karyawan/divisi",
      icon: "groups",
      breadcrumbs: false,
    },
    {
      id: "002.002",
      title: "Karyawan",
      type: "item",
      url: "/app/karyawan",
      icon: "person",
      breadcrumbs: false,
    },
    {
      id: "002.003",
      title: "Citra Wajah",
      type: "item",
      url: "/app/facerecog/citrawajah",
      icon: "face",
      breadcrumbs: false,
    },
  ],
}

const adminMenu: INavItem = {
  id: "003",
  title: "Admin",
  type: "group",
  url: "/app/admin",
  icon: "admin_panel_settings",
  children: [
    {
      id: "003.001",
      title: "Pengguna",
      url: "/app/admin/user",
      icon: "people_alt",
    },
  ],
}

const menuItems = {
  items: [dashboardMenu, masterMenu, adminMenu],
}

export default menuItems
