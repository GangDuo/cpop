import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image/withIEPolyfill"

const wrapperStyle = {
  height: "100%",
  margin: '0 5px'
}

const GoodsImg = (props) => (
  <StaticQuery
    query={graphql`
      query {
        placeholderImage: file(relativePath: { eq: "now-printing.jpg" }) {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        },
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
      if (!image) {
        return (
          <Img 
            fluid={data.placeholderImage.childImageSharp.fluid}
            objectFit="contain"
            style={wrapperStyle}/>
        )
      }

      const imageSizes = image.node.childImageSharp.sizes;
      return (
        <Img
          alt={props.alt}
          sizes={imageSizes}
          objectFit="contain"
          style={wrapperStyle}
        />
      );
    }}
  />
)

export default GoodsImg