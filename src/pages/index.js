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
    const radix = 21
    const padding = radix - Math.floor(goodsBySubcategory[subcategory].length % radix)
    const goods = [...goodsBySubcategory[subcategory],
                   ...[...Array(padding).keys()].map(i => ({id: ++i}))]
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
      <section key={c} className="chapter">{chapter.pages.map((page, p) => (
        <article key={p} className="sheet">
          <div className="sheet-title">{chapter.title}</div>
          {page.map((rows, i) => (
            <div key={i} className="row">
              {rows.map(columns => (<PriceTag key={columns.id} {...columns} />))}
            </div>
          ))}
        </article>
        ))}
      </section>)
    )}

    <style jsx>{`
    .chapter {
      
    }
    .sheet {
      /* 上下中央 */
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .row {
      display: flex;
      height: 131px;
      /* 左右中央揃え */
      width: 638px;
      margin: 0 auto;
    }
    .sheet-title {
      position: absolute;
      top: 25px;
      left: 25px;
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