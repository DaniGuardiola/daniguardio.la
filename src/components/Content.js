import React from 'react'
import { Route, Switch } from 'react-router-dom'
import List from './List'
import Article from './Article'

const Projects = props => <List type='projects' articlePrefix='projects' {...props} />
const Blog = props => <List type='blog' articlePrefix='blog' {...props} />
// const About = () => <ArticleComponent data='about' />
const NotFound = () => <Article article='404' />

function ProjectsArticle ({ match }) {
  const { project } = match.params
  return <Article article={`projects/${project}`} />
}

function BlogArticle ({ match }) {
  const { post } = match.params
  return <Article article={`posts/${post}`} />
}

const About = () => (<>
  <Article article='about-me' />
</>)

export default function Content () {
  return (
    <div className='content'>
      <Switch>
        <Route exact path='/' component={Projects} />
        <Route exact path='/projects/:project' component={ProjectsArticle} />
        <Route exact path='/blog' component={Blog} />
        <Route exact path='/blog/:post' component={BlogArticle} />
        <Route exact path='/about' component={About} />
        <Route component={NotFound} />
      </Switch>
    </div>
  )
}
