export interface ICardItem {
  title: string
  route: string
  description: string
  shortDescription?: string
  icon: any
}

export interface IGame {
  title: string
  route: string
  shortDescription: string
  description: string
  icon: any
  id: number
  timer?: number
  timerDirection?: 'UP' | 'DOWN'
  shouldShowResultsTable?: boolean
  shouldShowInstansPoints?: boolean
}
