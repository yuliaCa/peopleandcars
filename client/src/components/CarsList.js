import { useQuery } from "@apollo/client";
import { List } from "antd";
import { GET_CARS } from "../queries";
import CarCard from "./CarCard";

const getStyles = () => ({
  list: {
    display: "flex",
    justifyContent: "center",
  },
});

const CarsList = (props) => {
  const styles = getStyles();

  const { loading, error, data } = useQuery(GET_CARS);

  if (loading) return "Loading...";
  if (error) return `Error ${error.message}`;

  const personIndex = data.people.findIndex(
    (person) => person.id === props.personID
  );

  return (
    <List grid={{ gutter: 20, column: 1 }} style={styles.list}>
      {data.people[personIndex].cars.map(({ id, make, model, year, price }) => (
        <List.Item key={id}>
          <CarCard
            key={id}
            id={id}
            model={model}
            make={make}
            year={year}
            price={price}
          />
        </List.Item>
      ))}
    </List>
  );
};

export default CarsList;
