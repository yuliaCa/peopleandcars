import { DeleteOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client";
import { filter } from "lodash";
import { GET_CARS, REMOVE_CAR } from "../../queries";

const RemoveCar = ({ id, model, make, year, price, personId }) => {
  const [removeCar] = useMutation(REMOVE_CAR, {
    update(proxy, { data: { removeCar } }) {
      const { people } = proxy.readQuery({ query: GET_CARS });

      const newArr = people.map((p) => {
        if (p.id === personId) {
          const newcars = p.cars.filter((c) => c.id !== id);
          return {
            id: p.id,
            firstName: p.firstName,
            cars: newcars,
          };
        }
        return p;
      });

      proxy.writeQuery({
        query: GET_CARS,
        data: {
          people: [...newArr],
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
