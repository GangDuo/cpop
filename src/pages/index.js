import React from "react"
import { StaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import EanImg from "../components/ean-image"
import GoodsImg from "../components/goods-image"
import SEO from "../components/seo"

export default () => (
  <StaticQuery
    query={graphql`
      query AllGoods {
        allGoodsCsv {
          nodes {
            ...GoodsCsvFragment
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
            <div key={`${i}_${j}`} className="vsplit-container">
              <div className="vsplit-left"><GoodsImg code={x.JAN} /></div>
              <div className="vsplit-right">
                {`${x.GoodsName}`}<br/>
                <EanImg code={x.JAN} /><br/>
                {x.JAN}
              </div>
            </div>
          ))}
        </div>
      ))}
    <style jsx>{`
    .row {
      display: flex;
      height: 131px;
    }
    .vsplit-container {
      width: 220px;
      display: flex;
    }
    .vsplit-left {width: 30%;}
    .vsplit-right {width: 70%;}
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