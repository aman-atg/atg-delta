import { useEffect, useRef, useState } from "react";
import MainLoader from "./components/MainLoader";
import MainTable from "./MainTable";
import mainService from "./services/mainService";

function App() {
  const [products, setProducts] = useState([]);
  const [symbols, setSymbols] = useState([]);
  const [prices, setPrices] = useState({});

  const ws = useRef(null);

  useEffect(() => {
    mainService.getProducts().then((res) => {
      if (res.data.success) {
        setProducts(res.data.result);
        const setOfSymbols = new Set();

        res.data.result.forEach((product) => {
          setOfSymbols.add(product.symbol);
        });
        setSymbols(Array.from(setOfSymbols));
      }
    });
  }, []);

  useEffect(() => {
    let localPrices = {};
    ws.current = new WebSocket("wss://production-esocket.delta.exchange");
    ws.current.onopen = () => {
      console.log("WebSocket connection opened");
      if (symbols.length > 0) {
        console.log("subscribing to products", symbols);
        ws.current.send(
          JSON.stringify({
            type: "subscribe",
            payload: {
              channels: [
                {
                  name: "v2/ticker",
                  symbols,
                },
              ],
            },
          })
        );
      }
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      // console.log({ data, isValue: data.type === "v2/ticker" });
      if (data.type === "v2/ticker") {
        // console.log("mark price", data.mark_price, data.symbol.slice(0, -4));

        localPrices[data.symbol] = parseFloat(data.mark_price).toFixed(4);

        if (data.mark_price === null) {
          console.log("mark price is null", data);
        }

        // console.log(Object.keys(localPrices).length, symbols.length);
        if (Object.keys(localPrices).length === symbols.length) {
          setPrices(localPrices);
          localPrices = {};
        }
      }
    };

    ws.current.onclose = () => console.log("WebSocket connection closed");
    const wsCurrent = ws.current;

    return () => {
      wsCurrent.close();
    };
  }, [symbols]);

  // console.log("inside app", ws);

  return (
    <div className="App">
      {products.length === 0 ? (
        <MainLoader />
      ) : (
        <>
          <MainTable products={products} prices={prices} />
        </>
      )}
    </div>
  );
}

export default App;
