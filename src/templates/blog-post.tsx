import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layouts/blog-post-layout"

export default ({ data }) => {
  const node = data.markdownRemark
  const cover =
    node.frontmatter.cover && node.frontmatter.cover.childImageSharp
      ? node.frontmatter.cover.childImageSharp.fluid
      : null

  return (
    <Layout title={node.frontmatter.title} cover={cover}>
      {
        // tslint:disable:react-no-dangerous-html
        <div dangerouslySetInnerHTML={{ __html: node.html }} />
        // tslint:enable:react-no-dangerous-html
      }
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        cover {
          childImageSharp {
            ... on ImageSharp {
              fluid(maxWidth: 750) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
    }
  }
`
