import { ThemeProvider } from '@mui/material/styles'
import { useRoutes } from 'react-router-dom'
import { useState, useEffect } from 'react'
import routes from './route/index'
import theme from './theme'
import _ from 'lodash'
import Cookies from 'js-cookie'
import { Toaster } from 'react-hot-toast'
const App = () => {
  const [auth, setAuth] = useState(false)
  useEffect(() => {
    async function request() {
      const cookie = await Cookies.get('_q')
      setAuth(_.isUndefined(cookie) || _.isEmpty(cookie))
    }
    request()
  }, [auth])
  const routing = useRoutes(routes(auth))
  return (
    <ThemeProvider theme={theme}>
      <Toaster position='top-right' />
      {routing}
    </ThemeProvider>
  )
}

export default App
