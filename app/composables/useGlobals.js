export const useGlobals = async () => {
  const { data } = await useAsyncData('globals', () => {
    return queryCollection('globals').first()
  })
  return data
}
