const defaultTitle = document.title

export const useTitle = () => {
  const setTitle = (title) => { document.title = title ? `${title} / ${defaultTitle}` : defaultTitle }
  const resetTitle = () => { document.title = defaultTitle }

  return {
    setTitle,
    resetTitle,
  }
}
