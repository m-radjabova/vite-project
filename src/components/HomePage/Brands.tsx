import useBrands from "../../hooks/useBrands"

function chunkArray<T>(arr: T[], chunkSize: number): T[][] {
  const res = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    res.push(arr.slice(i, i + chunkSize));
  }
  return res;
}

function Brands() {
  const { brands } = useBrands();

  const chunkedBrands = chunkArray(brands, 5);

  return (
    <div className="brands">
      <div className="container">
        <div className="title-brands">
          <h1>Бренды</h1>
        </div>
        <div className="brands-list">
          {chunkedBrands.map((col, idx) => (
            <ul className="brands-col" key={idx}>
              {col.map((brand, i) => (
                <li key={i}>{brand.name}</li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Brands;