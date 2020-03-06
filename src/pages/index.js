import React from "react"
import { StaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

export default () => (
  <StaticQuery
    query={graphql`
      query AllGoods {
        allGoodsCsv {
          nodes {
            GoodsName
            JAN
            SupplierCode
            WithTax
            WithoutTax
          }
        }
      }
    `}
    render={data => <IndexPage data={data} />}
  />
)

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" />

    {data.allGoodsCsv.nodes.length > 0 &&
      nTuple(data.allGoodsCsv.nodes, 3).map((xs, i) => (
        <div key={i} className="row">
          {xs.map((x, j) => (
            <span key={`${i}_${j}`}>{`${x.GoodsName}　　　　`}</span>
          ))}
        </div>
      ))}
    <style>{`
    .row {
      display: flex;
      height: 131px;
    }
    `}</style>
  </Layout>
)

function nTuple(array, n) {
  return array.reduce((ax, x, i) => {
    const quotient = Math.trunc(i/n)
    ax[quotient] = ax[quotient] || []
    ax[quotient].push(x)
    return ax
  }, [])
}