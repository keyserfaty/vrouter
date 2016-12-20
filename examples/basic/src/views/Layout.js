import h from 'vhtml'

const Layout = props => {
  return (
    <span>
      <section class="container">
        This is part of the Layout
        <hr/>
        { props.children[0] }
      </section>
    </span>
  )
}

export default Layout
