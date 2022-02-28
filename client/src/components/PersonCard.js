import { useState } from "react";
import { Card } from "antd";

import { EditOutlined } from "@ant-design/icons";
import UpdatePerson from "./forms/UpdatePerson";
import RemovePerson from "./buttons/RemovePerson";
import CarsList from "./CarsList";
import AddCar from "./forms/AddCar";

const getStyles = (props) => ({
  card: {
    width: "800px",
  },
});

const Person = (props) => {
  const [id] = useState(props.id);
  const [firstName, setFirstName] = useState(props.firstName);
  const [lastName, setLastName] = useState(props.lastName);
  const [editMode, setEditMode] = useState(false);

  const styles = getStyles();

  const handleButtonClick = () => {
    setEditMode(!editMode);
  };

  const updateStateVariable = (variable, value) => {
    switch (variable) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      {editMode ? (
        <UpdatePerson
          id={props.id}
          firstName={props.firstName}
          lastName={props.lastName}
          onButtonClick={handleButtonClick}
          updateStateVariable={updateStateVariable}
        />
      ) : (
        <Card
          actions={[
            <EditOutlined key="edit" onClick={handleButtonClick} />,
            <RemovePerson id={id} firstName={firstName} lastName={lastName} />,
          ]}
          style={styles.card}
        >
          <h2>
            {firstName} {lastName}
          </h2>
          <AddCar />
          <CarsList personID={props.id} firstName={props.firstName} />
        </Card>
      )}
    </div>
  );
};

export default Person;
