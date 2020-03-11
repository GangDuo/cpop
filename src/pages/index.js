import React from "react"
import { StaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import PriceTag from "../components/PriceTag"
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

const IndexPage = ({ data }) => {
  const goodsBySubcategory = data.allGoodsCsv.nodes
    .reduce((ax, x) => {
      ax[x.SubcategoryCode] = ax[x.SubcategoryCode] || []
      ax[x.SubcategoryCode].push(x)
      return ax
    }, {})

  const chapters = Object.keys(goodsBySubcategory).map(subcategory => {
    const goods = goodsBySubcategory[subcategory]
    const sample = goods[0]
    const code = sample.SubcategoryCode
    const name = sample.SubcategoryName

    return {
      title: `${code} ${name}`,
      pages: nTuple(nTuple(goods, 3), 7)
    }
  })

  return (
  <Layout>
    <SEO title="Home" />

    {chapters.length > 0 && chapters.map((chapter, c) => (
      <div key={c} className="chapter">{chapter.pages.map((page, p) => (
        <div key={p} className="sheet">
          <div className="sheet-title">{chapter.title}</div>
          {page.map((rows, i) => (
            <div key={i} className="row">
              {rows.map(columns => (<PriceTag key={columns.id} {...columns} />))}
            </div>
          ))}
        </div>
        ))}
      </div>)
    )}

    <style jsx>{`
    .chapter {
      width: 638px;
    }
    .row {
      display: flex;
      height: 131px;
    }
    `}</style>
  </Layout>
)}

function nTuple(array, n) {
  return array.reduce((ax, x, i) => {
    const quotient = Math.trunc(i/n)
    ax[quotient] = ax[quotient] || []
    ax[quotient].push(x)
    return ax
  }, [])
}