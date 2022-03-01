import { useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import { useMutation } from "@apollo/client";

import { UPDATE_CAR } from "../../queries";

const UpdateCar = (props) => {
  const [id, setId] = useState(props.id);
  const [model, setModel] = useState(props.model);
  const [make, setMake] = useState(props.make);
  const [price, setPrice] = useState(props.price);
  const [year, setYear] = useState(props.year);
  const [personId, setPersonId] = useState(props.personId);
  const [updateCar] = useMutation(UPDATE_CAR);

  const [form] = Form.useForm();
  const [, forceUpdate] = useState();

  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = (values) => {
    const { id, model, make, price, year, personId } = values;

    updateCar({
      variables: {
        // id,
        model,
        make,
        year,
        price,
        // personId,
      },
      optimisticResponse: {
        __typename: "Mutation",
        updateCar: {
          __typename: "Car",
          //   id,
          model,
          make,
          year,
          price,
          //   personId,
        },
      },
    });
    props.onButtonClick();
  };

  const updateStateVariable = (variable, value) => {
    props.updateStateVariable(variable, value);
    switch (variable) {
      //   case "id":
      //     setId(value);
      //     break;
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
      //   case "personId":
      //     setPersonId(value);
      //     break;
      default:
        break;
    }
  };

  return (
    <Form
      form={form}
      name="update-contact-form"
      layout="inline"
      onFinish={onFinish}
      initialValues={{
        // id: id,
        model: model,
        make: make,
        year: year,
        price: price,
        // personId: personId,
      }}
      size="medium"
    >
      <Form.Item
        name="model"
        rules={[{ required: true, message: "Please input the model name" }]}
      >
        <Input
          placeholder="i.e. Mazda"
          onChange={(e) => updateStateVariable("model", e.target.value)}
        />
      </Form.Item>
      <Form.Item
        name="make"
        rules={[{ required: true, message: "Please input the make" }]}
      >
        <Input
          placeholder="i.e. CX-5"
          onChange={(e) => updateStateVariable("make", e.target.value)}
        />
      </Form.Item>
      <Form.Item
        name="year"
        rules={[{ required: true, message: "Please input the year" }]}
      >
        <Input
          placeholder="i.e. 2020"
          onChange={(e) => updateStateVariable("year", e.target.value)}
        />
      </Form.Item>
      <Form.Item
        name="price"
        rules={[{ required: true, message: "Please input the price" }]}
      >
        <Input
          placeholder="$30,560"
          onChange={(e) => updateStateVariable("price", e.target.value)}
        />
      </Form.Item>
      <Form.Item shouldUpdate={true}>
        {() => (
          <Button
            type="primary"
            htmlType="submit"
            disabled={
              (!form.isFieldTouched("model") &&
                !form.isFieldTouched("year") &&
                !form.isFieldTouched("price")) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Update Car
          </Button>
        )}
      </Form.Item>
      <Button onClick={props.onButtonClick}>Cancel</Button>
    </Form>
  );
};

export default UpdateCar;
