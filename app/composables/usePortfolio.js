export const usePortfolio = async () => {
  const { data: portfolio } = await useAsyncData('portfolio', () => {
    return queryCollection('portfolio').first()
  })
  return portfolio
}
