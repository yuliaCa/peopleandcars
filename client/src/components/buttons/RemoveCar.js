import { DeleteOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client";
import { filter } from "lodash";
import { GET_CARS, REMOVE_CAR } from "../../queries";

const RemoveCar = (props, { id, model, make, year, price }) => {
  const [removeCar] = useMutation(REMOVE_CAR, {
    update(proxy, { data: { removeCar } }) {
      const { cars } = proxy.readQuery({ query: GET_CARS });

      proxy.writeQuery({
        query: GET_CARS,
        data: {
          cars: filter(cars, (c) => {
            return c.id !== removeCar.id;
          }),
        },
      });
    },
  });

  const handleButtonClick = () => {
    let result = window.confirm("Are you sure you want to delete this car?");
    if (result) {
      removeCar({
        variables: {
          id,
        },
        optimisticResponse: {
          __typename: "Mutation",
          removeCar: {
            __typename: "Car",
            id,
            model,
            make,
            year,
            price,
          },
        },
      });
    }
  };
  return (
    <DeleteOutlined
      key="delete"
      onClick={handleButtonClick}
      style={{ color: "red" }}
    />
  );
};

export default RemoveCar;
