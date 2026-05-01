export interface FilterDimension {
  cloud: boolean
  menu: boolean
}

export interface CustomField {
  key: string
  label: string
  type: 'text' | 'date' | 'url'
  multiple: boolean
}

export interface CatalogConfig {
  title: string
  description?: string
  theme?: string
  postsPerPage?: number
  showSubmitForm?: boolean
  submitUrl?: string
  showTagCloud?: boolean
  showFilterBar?: boolean
  filters?: Partial<Record<'category' | 'author' | 'genre' | 'cost' | 'tags', FilterDimension>>
  customFields?: CustomField[]
  basePath?: string
  showCost?: boolean
  siteUrl?: string
  customCss?: string
}
