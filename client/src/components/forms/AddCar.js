import { useMutation } from "@apollo/client";
import { Button, Form, Input } from "antd";
import { useEffect, useState } from "react";

import { v4 as uuidv4 } from "uuid";
import { ADD_CAR, GET_CARS } from "../../queries";

const getStyles = () => ({
  list: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
  },
});

const AddPerson = () => {
  const [id] = useState(uuidv4());
  const [addCar] = useMutation(ADD_CAR);
  const [form] = Form.useForm();
  const [, forcedUpdate] = useState();
  const styles = getStyles();

  useEffect(() => {
    forcedUpdate({});
  }, []);

  const onFinish = (values) => {
    const { model, make, price, year } = values;

    addCar({
      variables: {
        id,
        model,
        make,
        price,
        year,
      },
      optimisticResponse: {
        __typename: "Mutation",
        addCar: {
          __type: "Car",
          id,
          model,
          make,
          price,
          year,
        },
      },
      update: (proxy, { data: { addCar } }) => {
        const data = proxy.readQuery({ query: GET_CARS });
        proxy.writeQuery({
          query: GET_CARS,
          data: {
            ...data,
            cars: [...data.cars, addCar],
          },
        });
      },
    });
  };

  return (
    <Form
      form={form}
      name="add-contact-form"
      onFinish={onFinish}
      layout="inline"
      size="medium"
      style={styles.list}
    >
      <Form.Item
        name="make"
        rules={[{ required: true, message: "Please input make" }]}
      >
        <Input placeholder="i.e. Mazda" />
      </Form.Item>
      <Form.Item
        name="model"
        rules={[{ required: true, message: "Please input model" }]}
      >
        <Input placeholder="i.e. CX-30" />
      </Form.Item>
      <Form.Item
        name="year"
        rules={[{ required: true, message: "Please input the year" }]}
      >
        <Input placeholder="i.e. 2020" />
      </Form.Item>
      <Form.Item
        name="price"
        rules={[{ required: true, message: "Please input the price" }]}
      >
        <Input placeholder="$30,000" />
      </Form.Item>
      <Form.Item shouldUpdate={true}>
        {() => (
          <Button
            type="primary"
            htmlType="submit"
            disabled={
              !form.isFieldsTouched(true) ||
              form.getFieldError().filter(({ errors }) => errors.length).length
            }
          >
            Add Car
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};

export default AddPerson;
