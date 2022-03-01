import { useState } from "react";
import { Card } from "antd";

import { EditOutlined } from "@ant-design/icons";
import UpdateCar from "./forms/UpdateCar";
import RemoveCar from "./buttons/RemoveCar";

const getStyles = (props) => ({
  card: {
    width: "300px",
  },
});

const CarCard = (props) => {
  const [id] = useState(props.id);
  const [model, setModel] = useState(props.model);
  const [make, setMake] = useState(props.make);
  const [year, setYear] = useState(props.year);
  const [price, setPrice] = useState(props.price);
  const [personId, setPersonId] = useState(props.personId);
  const [editMode, setEditMode] = useState(false);

  const styles = getStyles();

  const handleButtonClick = () => {
    setEditMode(!editMode);
  };

  const updateStateVariable = (variable, value) => {
    switch (variable) {
      case "model":
        setModel(value);
        break;
      case "make":
        setModel(value);
        break;
      case "year":
        setYear(value);
        break;
      case "price":
        setPrice(value);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      {editMode ? (
        <UpdateCar
          id={props.id}
          model={props.model}
          make={props.make}
          year={props.year}
          price={props.price}
          onButtonClick={handleButtonClick}
          updateStateVariable={updateStateVariable}
        />
      ) : (
        <Card
          actions={[
            <EditOutlined key="edit" onClick={handleButtonClick} />,
            <RemoveCar
              id={id}
              model={model}
              make={make}
              year={year}
              price={price}
              personId={props.id}
            />,
          ]}
          style={styles.card}
        >
          {model} {make} {price} {year}
        </Card>
      )}
    </div>
  );
};

export default CarCard;
