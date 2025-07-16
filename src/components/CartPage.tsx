import useLoading from "../hooks/useLoading";
import IsLoading from "./IsLoading";

function CartPage() {
    const {loading} = useLoading();

    if (loading) {
        return <IsLoading />;
    }

  return (
    <div>CartPage</div>
  )
}

export default CartPage