export type Menu = {
  icon?: string
  label: string
  separator: boolean
  to?: { name: string; path?: string }
  children?: Menu[]
}
