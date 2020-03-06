import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const EanImg = (props) => (
  <StaticQuery
    query={graphql`
      query {
        images: allFile {
          edges {
            node {
              relativePath
              name
              childImageSharp {
                fixed(width: 95, height: 20) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
        }
      }
    `}

    render={(data) => {
      const image = data.images.edges.find(n => {
        return n.node.relativePath.includes(`jan/${props.code}.png`);
      });
      if (!image) { return null; }
      
      const imageSizes = image.node.childImageSharp.sizes;
      return (
        <>
        <Img
          alt={props.alt}
          sizes={imageSizes}
          fixed={image.node.childImageSharp.fixed}
        />
        </>
      );
    }}
  />
)

export default EanImg