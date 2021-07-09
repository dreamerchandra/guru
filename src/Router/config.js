import Home from '../Pages/Home'
import Landing from '../Pages/Landing'

const config = [
  {
    path: '/',
    component: Home,
    linkName: 'Home',
    protected: false,
    exact: true,
  },
  {
    path: '/landing',
    component: Landing,
    linkName: 'Landing',
  },
]

export default config