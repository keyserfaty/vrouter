import h from 'vhtml'

import router from 'vrouter'

import Layout from './views/Layout'
import PostContainer from './views/Post/PostContainer'
import PostsListsContainer from './views/PostsList/PostsListsContainer'

router(
  {
    indexRedirect: 'posts',
    'posts': () => (
      <Layout>
        <PostsListsContainer />
      </Layout>
    ),
    'post': () => <PostContainer />
  },
  document.querySelector('.root')
)
