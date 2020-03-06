import { graphql } from "gatsby"
export const GoodsCsvFragment = graphql`
  fragment GoodsCsvFragment on GoodsCsv {
    GoodsName
    JAN
    SupplierCode
    WithTax
    WithoutTax
  }
`