export const usePricing = async () => {
  const { data: pricing } = await useAsyncData('pricing', () => {
    return queryCollection('pricing').first()
  })
  return pricing
}
