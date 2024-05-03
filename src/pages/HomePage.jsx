import useGetEvent from "../hooks/events/useGetEvent";
import useGetHero from "../hooks/heroes/useGetHero";
import useGetProducts from "../hooks/products/useGetProduct";

const HomePage = () => {
  const { heroes, herosLoading } = useGetHero();
  const { events, eventsLoading } = useGetEvent();
  const { products, productsLoading } = useGetProducts();
  const hero = heroes?.find((hero) => hero?.selected === true);
  const event = events?.find((hero) => hero?.selected === true);
  const product = products?.find((hero) => hero?.selected === true);

  return (
    <div className="">
      <h3 className="py-8 text-4xl text-white">Displayed Content</h3>
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Section</th>
            <th>Title</th>
            <th>Description-1</th>
            <th>Description-2</th>
            <th>Icon</th>
            <th></th>
          </tr>
        </thead>
        {herosLoading ? (
          <h1 className="text-6xl">Please wait...</h1>
        ) : (
          <tbody>
            {/* row 1 */}
            <tr>
              <td>Hero</td>
              <td>
                <div className="flex items-center gap-3">
                  <img
                    className="w-40 h-24 rounded-2xl"
                    src={hero?.image}
                    alt="item Image"
                  />
                  <div>
                    <div className="font-bold">{hero?.title}</div>
                  </div>
                </div>
              </td>
              <td>{hero?.description1}</td>
              <td>{hero?.description2}</td>
            </tr>
            {/* row 2 */}
            <tr>
              <td>Event</td>
              <td>
                <div className="flex items-center gap-3">
                  <img
                    className="w-40 rounded-2xl"
                    src={event?.image}
                    alt="item Image"
                  />
                  <div>
                    <div className="font-bold">{event?.title}</div>
                  </div>
                </div>
              </td>
              <td>{event?.description1}</td>
              <td>{event?.description2}</td>
            </tr>
            {/* row 3 */}
            <tr>
              <td>Product 1</td>
              <td>
                <div className="flex items-center gap-3">
                  <img
                    className="w-40 rounded-2xl"
                    src={product?.image}
                    alt="item Image"
                  />
                  <div>
                    <div className="font-bold">{product?.title}</div>
                  </div>
                </div>
              </td>
              <td>{product?.description1}</td>
              <td>{product?.description2}</td>
              <th className="">
                <div className="avatar bg-white rounded-full w-16 h-16 flex items-center justify-center">
                  <div className="mask mask-squircle w-12 h-12">
                    <img src={product?.icon} alt="Event Image" />
                  </div>
                </div>
              </th>
            </tr>
          </tbody>
        )}
      </table>
    </div>
  );
};

export default HomePage;
