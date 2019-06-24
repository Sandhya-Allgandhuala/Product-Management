import React, { Component } from "react";
import { Modal, Form } from "semantic-ui-react";

export default class AddeditStore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Info: {
                Name: this.props.record.Name || "",
                Address: this.props.record.Address || ""
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.save = this.save.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    handleChange(event, { name, value }) {
            this.setState(state => {
            const updatedRecord = Object.assign({}, state.Info, { [name]: value });
            return { Info: updatedRecord };
            console.log("handlechange");
            console.log(updatedRecord);
        });

    }

    save() {
        const recordToSave = Object.assign({}, this.props.record, this.state.Info);
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
                            value={this.state.Info.Name}
                            onChange={this.handleChange}
                        />
                        <Form.Input
                            required
                            label="Address"
                            name="Address"
                            value={this.state.Info.Address}
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
