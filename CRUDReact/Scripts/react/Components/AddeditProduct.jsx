import React, { Component } from "react";
import { Modal, Form } from "semantic-ui-react";

export default class AddeditCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ProductInfo: {
                Name: this.props.record.Name || "",
                Price: this.props.record.Price || ""
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.save = this.save.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    handleChange(event, { name, value }) {
        // this.setState(state => ({ record: { ...state.record, [name]: value } }));

        this.setState(state => {
            const updatedRecord = Object.assign({}, state.ProductInfo, { [name]: value });
            return { ProductInfo: updatedRecord };
        });

    }

    save() {
        const recordToSave = Object.assign({}, this.props.record, this.state.ProductInfo);
        this.props.save(recordToSave);

    }

    cancel() {
        this.props.cancel();
    }

    render() {
        return (

            <Modal open={this.props.isOpen}>
                <Modal.Header>{this.props.header}</Modal.Header>
                <br />
                <br />
                <Modal.Content>
                    <Form onSubmit={this.save}>
                        <Form.Input
                            required
                            label="Name"
                            name="Name"
                            value={this.state.ProductInfo.Name}
                            onChange={this.handleChange}
                        />
                        <Form.Input
                            required
                            label="Price"
                            name="Price"
                            value={this.state.ProductInfo.Price}
                            onChange={this.handleChange}
                        />
                        <Form.Group>
                            <Form.Button type="submit" positive>
                                Save
              </Form.Button>
                            <Form.Button type="button" onClick={this.cancel}>
                                Cancel
              </Form.Button>
                        </Form.Group>
                    </Form>
                </Modal.Content>
            </Modal>
        );
    }
}
