export const useStyles = async () => {
  const { data: styles } = await useAsyncData('styles', () => {
    return queryCollection('styles').first()
  })
  return styles
}
