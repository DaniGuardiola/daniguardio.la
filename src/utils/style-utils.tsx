export const FANCY_SCROLLBAR = {
  '&::-webkit-scrollbar': {
    width: 10,
    height: 6,
    backgroundColor: '#F5F5F5'
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: '#e8e8e8',
    borderRadius: 8
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#8c8c8c',
    borderRadius: 8
  }
}

export const SHADOW_ON_HOVER = {
  transition: 'box-shadow .3s',
  '&:hover': {
    boxShadow:
      '0 6px 10px 0 rgba(0,0,0,0.14), 0 1px 18px 0 rgba(0,0,0,0.12), 0 3px 5px -1px rgba(0,0,0,0.20)'
  }
}
