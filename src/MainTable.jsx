import React from "react";
import usePrevious from "./hooks/usePrev";

const PriceItem = React.memo(({ price, currency }) => {
  const prevPrice = usePrevious(price);
  const priceChange = prevPrice ? price - prevPrice : 0;

  return (
    <td
      className={`price ${priceChange > 0 ? "inc" : ""} ${
        priceChange < 0 ? "dec" : ""
      } ${!price ? "center" : ""}`}
    >
      {price ? `${price} ${currency}` : "-"}
    </td>
  );
});

const MainTable = ({ products, prices }) => {
  return (
    <div className="MainTable">
      <table>
        <thead className="main-header">
          <tr>
            <th scope="col">Symbol</th>
            <th scope="col">Description</th>
            <th scope="col">Underlying Asset</th>
            <th
              scope="col"
              className={`price ${
                Object.keys(prices).length === 0 ? "center" : ""
              }`}
            >
              Mark Price
            </th>
          </tr>
        </thead>

        <tbody>
          {products?.map((product, i) => (
            <tr key={i}>
              <td>{product.symbol}</td>
              <td>{product.description}</td>
              <td>{product.underlying_asset.symbol}</td>
              <PriceItem
                price={prices[product.symbol]}
                currency={product.quoting_asset.symbol}
              />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MainTable;
