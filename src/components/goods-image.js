import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const GoodsImg = (props) => (
  <StaticQuery
    query={graphql`
      query {
        images: allFile {
          edges {
            node {
              relativePath
              name
              childImageSharp {
                sizes(maxHeight: 120) {
                  ...GatsbyImageSharpSizes
                }
              }
            }
          }
        }
      }
    `}

    render={(data) => {
      const image = data.images.edges.find(n => {
        return n.node.relativePath.includes(`goods/${props.code}.jpg`);
      });
      if (!image) { return null; }

      const imageSizes = image.node.childImageSharp.sizes;
      return (
        <Img
          alt={props.alt}
          sizes={imageSizes}
          objectFit="cover"
          objectPosition="50% 50%"
        />
      );
    }}
  />
)

export default GoodsImg