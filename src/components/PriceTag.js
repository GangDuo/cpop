import React from "react"
import EanImg from "./ean-image"
import GoodsImg from "./goods-image"

function PriceTag(props) {
  const {JAN, GoodsName, WithoutTax, WithTax, SupplierCode} = props
  const formatedWithoutTax = Number(WithoutTax).toLocaleString()
  const formatedWithTax = Number(WithTax).toLocaleString()
  const isEmpty = !JAN

  return(
  <>
    <div className={`list-content justify-content-end ${isEmpty ? 'is-empty' : ''}`.trim()}>
      <div className="vsplit-container">
        <div className="vsplit-left"><GoodsImg code={JAN} /></div>
        <div className="vsplit-right list-content justify-content-between">
          <div className="goods-name">{GoodsName}</div>
          <div className="text-right goods-price-wrapper font-weight-bold">
            <span className="goods-price">{`¥${formatedWithoutTax}`}</span>
            <span className="label-tax">+税</span>
          </div>
          <div className="text-right goods-price-with-tax font-weight-bold">{`(税込${formatedWithTax})`}</div>
          <EanImg code={JAN} />
          <div className="text-center barcode-txt">
            <span>{JAN}</span>
            <span>&nbsp;&nbsp;&nbsp;{SupplierCode}</span>
          </div>
        </div>
      </div>
      <div className="text-center">
        <span className="company">HUMPTY DUMPTY</span>
      </div>
    </div>
    <style jsx>{`
    .is-empty { visibility:hidden; }

    .vsplit-container {
      width: 212px;
      display: flex;
      height: 107px;
    }
    .vsplit-left {
      width: 84px;
    }
    .vsplit-right {
      width: 128px;
    }
    .list-content {
      display: flex;
      flex-direction: column;
    }
    .goods-name {
      font-size: 15px;
      height: 30px;
      overflow: hidden;

      word-break: break-all;
      white-space: normal;
      line-height: 100%;
      color: rgb(0, 0, 0);
      font-family: "ＭＳ ゴシック", monospace;

      padding-bottom: 1px;/* これないと'y'の下部分が商品名の下線と重なる */
      border-bottom: dotted 1.3px rgba(184, 165, 139, 1)
    }
    .goods-price-wrapper {
      color: #000;
    }
    .goods-price {
      font-size: 20pt !important;
    }
    .label-tax {
      font-size: 10pt !important;
    }
    .goods-price-with-tax {
      color: #000;
      font-size: 10pt !important;
    }
    .barcode-txt {
      color: #000;
    }
    .company {
      height: 5px;
      white-space: nowrap;
      /*padding-right: 3px;*/
      vertical-align: middle;
      font-size: 10.5pt;
      font-family: 'Arial Black'; 
      color: rgb(191, 25, 32);
    }
    `}</style>
  </>
  );
}

export default PriceTag