import React, { Component } from "react";
import { Modal, Form } from "semantic-ui-react";

export default class AddeditSales extends Component {
    constructor(props) {
        super(props);
        this.state = {
            CustomerData: [],
            ProductData: [],
            StoreData: [],
            Info: {
                ID: this.props.record.ID||"",
                CustomerId: "",
                ProductId:  "",
                StoreId: "",
                DateSold: this.props.record.DateSold || ""
            }
            
        };
        this.handleChange = this.handleChange.bind(this);
        this.save = this.save.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    componentDidMount() {
        this.fetchcustomer();
        this.fetchproduct();
        this.fetchstore();
    }

    fetchcustomer() {
        fetch('/Customer/GetCustomerData/')
            .then(response => response.json())
            .then(CustomerData => this.setState({
                CustomerData,
                isLoading: true,
            }))
            .catch(error => console.log('parsing failed', error))
    }

    fetchproduct() {
        fetch('/Product/GetProductData/')
            .then(response => response.json())
            .then(ProductData => this.setState({
                ProductData,
                isLoading: true,
            }))
            .catch(error => console.log('parsing failed', error))
    }

    fetchstore() {
        fetch('/store/GetStoreData/')
            .then(response => response.json())
            .then(StoreData => this.setState({
                StoreData,
                isLoading: true,

            }))
            .catch(error => console.log('parsing failed', error))
    }

    handleChange(event, { name, value }) {
        this.setState(state => {
            const updatedRecord = Object.assign({}, state.Info, { [name]: value });
            return { Info: updatedRecord };
            console.log("handlechange");

        });
    }

    
    save() {
        const recordToSave = Object.assign({}, this.state.Info);
        this.props.save(recordToSave);
        

    }

    cancel() {
        this.props.cancel();
    }


    render() {
        return (

            <Modal open={this.props.isOpen}>
                <Modal.Header>{this.props.header}</Modal.Header>
                
                
                <Modal.Content>
                    <Form onSubmit={this.save}>
                        
                        <Form.Input
                            required
                            label="DateSold"
                            name="DateSold"
                            value={this.state.Info.DateSold}
                            onChange={this.handleChange}
                        />
                        
                        <Form.Select
                            required
                            label="Customer"
                            name="CustomerId"
                            placeholder="Select Customer"
                            onChange={this.handleChange}
                            compact
                            options={this.state.CustomerData.map(CustomerRecord => ({                                
                                name: CustomerRecord.ID,//CustomerRecord.ID
                                key: CustomerRecord.ID,//CustomerRecord.ID
                                value: CustomerRecord.ID, // This is the value that gets passed to 'handlechange' as event.target.value//CustomerRecord.ID
                                text: CustomerRecord.Name
                            }))}
                                
                               />
                        <Form.Select
                            required
                            label="Product"
                            name="ProductId"                          
                            placeholder="Select Product"
                            onChange={this.handleChange}
                            compact
                            options={this.state.ProductData.map(ProductRecord => ({                                
                                name: ProductRecord.Id,//ProductRecord.Id
                                key: ProductRecord.Id,//ProductRecord.Id
                                value: ProductRecord.Id, // This is the value that gets passed to 'handlechange' as event.target.value//ProductRecord.Id
                                text: ProductRecord.Name
                            }))}
                        />
                        <Form.Select
                            required
                            label="Product"
                            name="StoreId"
                            placeholder="Select Store"
                            onChange={this.handleChange}
                            compact
                            options={this.state.StoreData.map(StoreRecord => ({                                
                                name: StoreRecord.Id,//StoreRecord.Id
                                key: StoreRecord.Id,//StoreRecord.Id
                                value: StoreRecord.Id, // This is the value that gets passed to 'handlechange' as event.target.value,//StoreRecord.Id
                                text: StoreRecord.Name
                            }))}

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
