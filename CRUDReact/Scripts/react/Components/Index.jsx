import React, { Component } from 'react';
export default class Index extends Component {
    render() {
        return (
            <header>
                <div className='row'>
                    <div className="ui inverted segment">
                        <div className="ui inverted secondary menu">
                            <a href="/Customer/Index" className="item">
                                Customer
                           </a>
                            <a href="/Product/Index" className="item">
                                Products
                        </a>
                            <a href="/Store/Index" className="item">
                                Store
                          </a>
                            <a href="/Sales/Index" className="item">
                                Sales
                          </a>
                        </div>
                    </div>
                </div>
            </header>);
    }
}


