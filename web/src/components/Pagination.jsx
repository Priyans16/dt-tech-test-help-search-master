import React from 'react';
import { useState, useEffect } from 'react';

/** 
 * 
 * Developed without taking support of browser/internet
 * anywhere as suggested
 * 
 * Found that functional component doesn't update state 
 * variable well in this scenario with personal experience
 * 
 * Therefore, continued with class component as I need to use 
 * both componentDidMount and componentDidUpdate separately unlike
 * useEffect Hook in functional component 
 * 
 * !!Correct me if I'm wrong and is much appreciated!!
 * 
 * */
export class Pagination extends React.Component {
    state = {
        page: 0,
        sortedData: [],
        maxPages: 0
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.setState({ maxPages: Math.ceil(this.props.data.length / this.props.pageSize) });
    }

    componentDidUpdate(prevProp, prevState) {
        /* called when there is only change in data */
        if (JSON.stringify(this.props.data) !== JSON.stringify(prevProp.data)) {
            this.setState({ maxPages: Math.ceil(this.props.data.length / this.props.pageSize) });
        }
        if (JSON.stringify(this.state.maxPages) !== JSON.stringify(prevState.maxPages) || (JSON.stringify(this.state.sortedData) !== JSON.stringify(prevState.sortedData))) {
            this.setSortedData();
        }

        if (!this.props.api) /* when not from api */
            this.props.setCurrentData(this.state.sortedData[this.state.page]);
    }

    /**
     * This method assigns value of page number provided
     * 
     * @param {*} pageNo - selected page number
     */
    setPageNumber = (pageNo) => {
        this.setState({ page: pageNo });
    }

    /**
     * This method segregates the resultant data into array of arrays
     * w.r.t maximum number of pages and page size
     * whenever searched data array gets updated
     */
    setSortedData = () => {
        let data = [...this.props.data];
        let result = [];
        if (data.length > 0)
            for (let i = 0; i < this.state.maxPages; i++) {
                let array = [];
                if (i === this.state.maxPages - 1)
                    array = data.slice(i * 10);
                else
                    array = data.slice(i * 10, (i + 1) * this.props.pageSize);
                result.push(array);
            }
        this.setState({ sortedData: result });
    }

    /**
     * This method sends provided page number to the 
     * parent Search component
     * 
     * @param {*} pageNo - data specific with page number
     */
     setDataWithPageNumber = (pageNo) => {
        this.props.setPageNumber(pageNo);
    }

    render = () => (
        <>
            {this.props.api
                ? <>
                    <p>Pagination through API:</p>
                    {
                        Array(this.state.maxPages).fill(null).map((e, index) => {
                            return <>
                                <p onClick={() => this.setDataWithPageNumber(index)} key={'pageNo-' + this.props.api + (index + 1)} style={{ display: 'inline-block', cursor: 'pointer' }}>{(index == 0 ? "|" : "") + (index + 1) + '|'}</p>
                            </>
                        })
                    }
                </>
                : <>
                    <p>Internal pagination:</p>
                    {
                        Array(this.state.maxPages).fill(null).map((e, index) => {
                            return <>
                                <p onClick={() => this.setPageNumber(index)} key={'page-' + (index + 1)} style={{ display: 'inline-block', cursor: 'pointer' }}>{(index == 0 ? "|" : "") + (index + 1) + '|'}</p>
                            </>
                        })
                    }
                </>

            }
        </>
    )
}