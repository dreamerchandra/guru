import Chapter from '../Pages/Chapter'
import Home from '../Pages/Home'
import Landing from '../Pages/Landing'
import Teacher from '../Pages/Teacher'

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
  {
    path: '/teacher',
    component: Teacher,
    linkName: 'Teacher-Home Page',
  },
  {
    path: '/chapter/:chapterId',
    component: Chapter,
    linkName: 'Chapter',
  },
]

export default config