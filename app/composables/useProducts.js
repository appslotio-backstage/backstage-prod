export const useProducts = async () => {
  const { data: products } = await useAsyncData('products', () => {
    return queryCollection('products').first()
  })
  return products
}
